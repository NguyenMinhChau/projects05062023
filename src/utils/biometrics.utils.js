import React from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import useAppContext from './hooks/useAppContext';
import {useNotificationToast} from './notification_toast.utils';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';
import {
  AUTH_VERIFY_OTP_CODE,
  SEND_PUBLIC_KEY_TO_SERVER,
} from '../services/auth';
import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
import {emailPerm} from './checkPerm/email';

// {allowDeviceCredentials: true}
const rnBiometrics = new ReactNativeBiometrics();

export const useAppBiometrics = navigation => {
  const {state, dispatch} = useAppContext();
  const {biometric_app} = state.set_data;

  const {emailValue: emailInputLogin, isShowLoginEmail} =
    state.set_data.login_state;

  const [isBiometrics, setIsBiometrics] = React.useState(false);
  const [isBiometricsTouchID, setIsBiometricsTouchID] = React.useState(false);
  const [isBiometricsFaceID, setIsBiometricsFaceID] = React.useState(false);
  const {openNotificationToast} = useNotificationToast();

  const {state: isBiometricsCache, data: dataBiometricCache} = {
    ...biometric_app,
  };
  const {
    emailUser: emailUserBiometricCache,
    tokenAccess: tokenAccessBiometric,
    securityToken: securityTokenBiometric,
  } = {...dataBiometricCache};

  const compareEmail = emailInputLogin
    ? emailInputLogin?.replace('.vn', '') ===
      emailUserBiometricCache?.replace('.vn', '')
    : true;

  React.useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setIsBiometricsTouchID(true);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setIsBiometricsFaceID(true);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setIsBiometrics(true);
      } else {
        setIsBiometrics(false);
        setIsBiometricsTouchID(false);
        setIsBiometricsFaceID(false);
      }
    });
  }, []);

  const createKeysBiometries = async () => {
    const resultObjectDelete = await rnBiometrics.deleteKeys();
    const {keysDeleted} = resultObjectDelete;
    const resultObjectExits = await rnBiometrics.biometricKeysExist();
    const {keysExist} = resultObjectExits;
    if (!keysExist) {
      const resultObject = await rnBiometrics.createKeys();
      const {publicKey} = resultObject;
      const payload = {
        email: emailUserBiometricCache,
        publicKey: publicKey,
        token: securityTokenBiometric,
        tokenAPI: tokenAccessBiometric,
      };
      if (payload?.email) {
        SEND_PUBLIC_KEY_TO_SERVER({
          state,
          dispatch,
          openNotificationToast,
          payload,
        });
      }
    }
  };

  const createSignatureBiometrics = async (promptMessage, payload) => {
    if (isBiometricsCache) {
      const emailCheck = payload || emailUserBiometricCache || '';
      const checkEmail = emailPerm(emailCheck);
      if (!checkEmail) {
        openNotificationToast({
          title: 'Thông báo',
          message:
            'Email không hợp lệ vui lòng đăng nhập bằng OTP và bật lại đăng nhập sinh trắc học tại Cài đặt -> Quản lý truy cập!',
          type: TYPE_NOTIFICATION.ERROR,
        });
      } else if (compareEmail) {
        await createKeysBiometries();
        const resultObject = await rnBiometrics.createSignature({
          promptMessage: promptMessage || 'Đăng nhập ICDP Mobile',
          payload: emailCheck,
          cancelButtonText: 'Đăng nhập bằng OTP',
        });

        const {success, error, signature} = resultObject;
        if (success) {
          openNotificationToast({
            title: 'Thông báo',
            message: 'Vui lòng đợi, chúng tôi đang kiểm tra...',
            type: TYPE_NOTIFICATION.INFO,
          });
          dispatch(
            SET_DATA_PAYLOAD({
              key: 'login_state',
              value: {
                isLoad: true,
              },
            }),
          );
          AUTH_VERIFY_OTP_CODE({
            dispatch,
            state,
            signature: signature,
            email: emailCheck,
            navigation,
            openNotificationToast,
            isBiometric: true,
            isShowLoginEmail,
          });
        }
      } else {
        openNotificationToast({
          title: 'Thông báo',
          message: `Tài khoản ${emailInputLogin} chưa đăng ký sinh trắc học trên thiết bị này, vui lòng đăng nhập bằng mã OTP!`,
          type: TYPE_NOTIFICATION.INFO,
        });
      }
    } else {
      openNotificationToast({
        title: 'Thông báo',
        message:
          'Vui lòng đăng nhập lần đầu để bật tính năng đăng nhập sinh trắc học trong lần đăng nhập sau tại Cài đặt -> Quản lý truy cập',
        type: TYPE_NOTIFICATION.INFO,
      });
    }
  };

  return {
    isBiometrics,
    isBiometricsTouchID,
    isBiometricsFaceID,
    createKeysBiometries,
    createSignatureBiometrics,
  };
};
