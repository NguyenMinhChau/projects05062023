import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {
  axios101GetNoToken,
  axios101PostNoToken,
  axios101PutNoToken,
} from '../utils/axios/axiosInstance';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheBiometric,
  getAsyncCacheCurrentUser,
  getAsyncCacheTokenSecurity,
  removeAsyncCache,
  setAsyncCacheAccessToken,
  setAsyncCacheBiometric,
  setAsyncCacheCurrentUser,
  setAsyncCacheTokenSecurity,
} from '../utils/cache.services';
import {
  errorMessage,
  getTokenMobileAppService,
  getTokenMobileAppServiceKEY,
} from './jwt';

// ?! AUTH LOGIN - ASSIGN API MOBILE
export const AUTH_SEND_OTP_CODE = async (props = {}) => {
  const {email, state, dispatch, openNotificationToast, isShowLoginEmail} =
    props;
  try {
    await axios101GetNoToken(`role/user/send-code/${email}`);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'login_state',
        value: {
          isLoad: false,
          isShowLoginEmail: false,
          showOtpInput: true,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Đã gửi OTP về email, vui lòng kiểm tra email của bạn!',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'login_state',
        value: {
          isLoad: false,
          showOtpInput: false,
          isShowLoginEmail: true,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
// ?! AUTH VERIFY OTP CODE - ASSIGN API MOBILE
export const AUTH_VERIFY_OTP_CODE = async (props = {}) => {
  const {
    dispatch,
    state,
    otpCode,
    signature,
    email,
    navigation,
    openNotificationToast,
    isBiometric = false,
    isShowLoginEmail,
  } = props;

  try {
    const resPost = await axios101PostNoToken(`role/user/login-ver2`, {
      email: email,
      signature: signature ? signature : null,
      code: otpCode ? otpCode : null,
    });

    const tokenSecurity = await getTokenMobileAppServiceKEY(
      resPost.payload._id,
    );

    await setAsyncCacheCurrentUser(resPost.payload);
    await setAsyncCacheAccessToken({
      accessToken: resPost.payload.token || resPost.payload.refreshToken,
      refreshToken: resPost.payload.refreshToken,
    });
    await setAsyncCacheBiometric({
      state: state?.set_data?.biometric_app?.state,
      data: {
        emailUser: resPost?.payload?.email,
        tokenAccess: resPost.payload.token || resPost.payload.refreshToken,
        securityToken: tokenSecurity,
      },
    });

    await getTokenMobileAppService(resPost.payload._id, dispatch);
    await getAsyncCacheBiometric(dispatch);
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
    setTimeout(() => {
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'login_state',
          value: {
            isLoad: false,
            showOtpInput: false,
            isShowLoginEmail: false,
            emailValue: '',
            otpValue: '',
          },
        }),
      );
      dispatch(SET_TOGGLE_PAYLOAD({key: 'isVisible_menu', value: false}));
      openNotificationToast({
        title: 'Thông báo',
        message: 'Đăng nhập thành công',
        type: TYPE_NOTIFICATION.SUCCESS,
      });
      navigation.navigate(SCREEN_NAVIGATE.Main_Screen);
    }, 2000);
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'login_state',
        value: {
          isLoad: false,
          showOtpInput: true,
          isShowLoginEmail: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
// ?! AUTH LOGOUT - OK
export const AUTH_LOGOUT = async (props = {}) => {
  const {dispatch, navigation, openNotificationToast} = props;
  try {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'login_state',
        value: {
          isLoad: false,
          showOtpInput: false,
          isShowLoginEmail: false,
          emailValue: '',
          otpValue: '',
        },
      }),
    );
    await removeAsyncCache();
    await setAsyncCacheCurrentUser(null);
    await setAsyncCacheAccessToken({accessToken: null, refreshToken: null});
    await setAsyncCacheTokenSecurity({tokenSecurity: null});
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
    await getAsyncCacheTokenSecurity(dispatch);
  } catch (err) {
    openNotificationToast({
      title: 'Thông báo',
      message: 'Đã xảy ra lỗi. Vui lòng liên hệ admin',
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
// ?! AUTH RETRIEVE - OK
export const AUTH_RETRIEVE = async (props = {}) => {
  const {
    dispatch,
    state,
    data,
    accessToken,
    refreshToken,
    tokenSecurity,
    openNotificationToast,
  } = props;
  try {
    await setAsyncCacheCurrentUser(data);
    await setAsyncCacheAccessToken({accessToken, refreshToken});
    await setAsyncCacheTokenSecurity({tokenSecurity});
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
    await getAsyncCacheTokenSecurity(dispatch);
  } catch (err) {
    openNotificationToast &&
      openNotificationToast({
        title: 'Thông báo',
        message: 'Đã xảy ra lỗi. Vui lòng liên hệ admin',
        type: TYPE_NOTIFICATION.ERROR,
      });
  }
};

export const SEND_PUBLIC_KEY_TO_SERVER = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = {...props};
  try {
    const resPut = await axios101PutNoToken(`role/user/add-biometric`, payload);
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
