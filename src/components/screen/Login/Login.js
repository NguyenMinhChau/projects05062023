import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import TextInputCP from '../../General/TextInputCP';
import {emailPerm} from '../../../utils/checkPerm/email';
import {ActivityIndicator} from 'react-native-paper';
import LoadingScreen from '../../General/LoadingScreen';
import {
  AUTH_SEND_OTP_CODE,
  AUTH_VERIFY_OTP_CODE,
} from '../../../services/auth.js';
import useAppContext from '../../../utils/hooks/useAppContext.js';
import {isValidToken} from '../../../services/jwt.js';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config.js';
import LoaderSliderCP from '../../LoaderApp/LoaderSlider.js';
import {
  getAsyncCacheBiometric,
  getAsyncCacheLoaderSliderUsed,
  setAsyncCacheLoaderSliderUsed,
} from '../../../utils/cache.services.js';
import Footer from '../../General/Footer.js';
import DialogCP from '../../General/Dialog/DialogCP.js';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils.js';
import ButtonCP from '../../General/ButtonCP.js';
import {SafeAreaWrap} from '../../General/SafeAreaWrap.js';
import {TextInput} from 'react-native-paper';
import {BLACK_COLOR, DISABLED_COLOR} from '../../../styles/colors.global.js';
import {useNotificationToast} from '../../../utils/notification_toast.utils.js';
import {TYPE_NOTIFICATION} from '../../General/NotificationToast.js';
import FastImageCP from '../../General/FastImageCP.js';
import {useAppBiometrics} from '../../../utils/biometrics.utils.js';
import OTPInput from '../../General/OtpInput.js';
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';

export default function Login({navigation}) {
  const {dispatch, state} = useAppContext();
  const {
    currentUser,
    accessToken,
    loader_slider_used,
    biometric_app,
    tokenSecurity,
  } = state.set_data;
  const {isLoad, showOtpInput, emailValue, otpValue, isShowLoginEmail} =
    state.set_data.login_state;

  const {colors} = useGetColorThemeDisplay();
  const {openNotificationToast} = useNotificationToast();

  const {state: isBiometricsCache, data: dataBiometricCache} = {
    ...biometric_app,
  };

  const {emailUser: emailUserBiometricCache} = {...dataBiometricCache};

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'login_state',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const [visible, setIsVisible] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [isErrorEmail, setIsErrorEmail] = React.useState(false);
  const [timeOtp, setTimeOtp] = React.useState(180);

  const refEmail = React.useRef(null);
  const {
    isBiometrics,
    isBiometricsTouchID,
    isBiometricsFaceID,
    createKeysBiometries,
    createSignatureBiometrics,
  } = useAppBiometrics(navigation);
  // ?! CHECK CURRENT USER
  React.useEffect(() => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'login_state',
        value: {
          isLoad: false,
          emailValue: '',
          showOtpInput: false,
          otpValue: '',
        },
      }),
    );
    const {accessToken: tokenAccess} = {...accessToken};
    if (currentUser?.email && tokenAccess && isValidToken(tokenAccess)) {
      navigation.navigate(SCREEN_NAVIGATE.Main_Screen);
    } else {
      navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
    }
  }, []);
  // ?!

  React.useEffect(() => {
    const checkEmail = emailPerm(emailValue);
    if (emailValue) {
      if (!checkEmail) {
        setIsErrorEmail(true);
      } else {
        setIsErrorEmail(false);
      }
    } else {
      setIsErrorEmail(false);
    }
  }, [emailValue]);

  const handleChangeEmail = value => {
    handleChangeValue('emailValue', value);
  };

  const onPressLogin = () => {
    handleChangeValue('isLoad', true);
    AUTH_SEND_OTP_CODE({
      state,
      dispatch,
      email: emailValue,
      isShowLoginEmail,
      openNotificationToast,
    });
  };

  const onSendingOTP = otp => {
    if (otp.length === 6) {
      openNotificationToast({
        title: 'Thông báo',
        message: 'Vui lòng đợi, chúng tôi đang kiểm tra...',
        type: TYPE_NOTIFICATION.INFO,
      });
      handleChangeValue('isLoad', true);
      AUTH_VERIFY_OTP_CODE({
        dispatch,
        state,
        otpCode: otp,
        email: emailValue,
        navigation,
        isShowLoginEmail,
        openNotificationToast,
      });
    } else {
      openNotificationToast({
        title: 'Thông báo',
        message: 'Mã OTP không hợp lệ!',
        type: TYPE_NOTIFICATION.ERROR,
      });
    }
  };

  const onConfirmDeleteAccount = () => {
    const checkEmail = emailPerm(emailValue);
    if (!checkEmail) {
      openNotificationToast({
        title: 'Thông báo',
        message: 'Email không hợp lệ!',
        type: TYPE_NOTIFICATION.ERROR,
      });
    } else {
      setIsVisible(true);
    }
  };

  const onDeleteAccount = () => {
    handleChangeValue('isLoad', true);
    setIsVisible(false);
    setTimeout(() => {
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'login_state',
          value: {
            isLoad: false,
            emailValue: '',
          },
        }),
      );
      openNotificationToast({
        title: 'Thông báo',
        message: 'Xóa tài khoản thành công!',
        type: TYPE_NOTIFICATION.SUCCESS,
      });
    }, 3000);
  };

  const uriImageBiometric = isBiometrics
    ? require('../../../assets/images/faceID_touchID_icon.png')
    : isBiometricsTouchID
    ? require('../../../assets/images/touch_id.png')
    : require('../../../assets/images/face_id.png');

  return (
    <>
      {isLoad && <LoadingScreen />}
      {loader_slider_used?.state ? (
        <LoaderSliderCP
          redirect={navigation}
          onClick={async () => {
            await setAsyncCacheLoaderSliderUsed({state: false});
            await getAsyncCacheLoaderSliderUsed(dispatch);
          }}
        />
      ) : (
        <LinearGradient
          style={tw`w-full h-full flex-1`}
          colors={['rgba(44, 11, 245, 1)', 'rgba(255, 253, 253, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <SafeAreaWrap>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              contentContainerStyle={tw.style('flex-grow')}>
              <View
                style={tw.style(
                  `items-center justify-center my-${
                    Platform.OS === 'ios' ? 15 : 10
                  }`,
                )}>
                <Text style={tw`font-bold text-[18px] text-white uppercase`}>
                  FTEL - KTHT - INFMN
                </Text>
              </View>
              <View style={tw`items-center justify-center w-full h-[130px]`}>
                <Image
                  style={tw`w-full h-full`}
                  source={require('../../../assets/images/ICDP_mobile_logo.png')}
                  resizeMode="contain"
                />
              </View>
              <View style={tw`w-full justify-center items-center flex-1 mt-5`}>
                <View
                  style={tw`w-[80%] p-2 bg-white h-full rounded-xl justify-start items-center`}>
                  <Text
                    style={tw`text-[21px] items-center pt-5 pb-2 text-[#163892] font-bold`}>
                    {isRegister ? 'Đăng ký' : 'Đăng nhập'} ICDP Mobile
                  </Text>
                  <Text
                    style={tw`font-bold w-[80%] text-[10px] text-center text-gray-400 leading-4`}>
                    Hướng dẫn {isRegister ? 'đăng ký' : 'đăng nhập'} hệ thống{' '}
                    <Text
                      style={tw`text-green-400`}
                      onPress={() => {
                        navigation.navigate({
                          name: SCREEN_NAVIGATE.WebView_Review_Screen,
                          params: {
                            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                            title: `Hướng dẫn ${
                              isRegister ? 'đăng ký' : 'đăng nhập'
                            } hệ thống`,
                            name_file: `Huong_dan_${
                              isRegister ? 'dang_ki' : 'dang_nhap'
                            }_he_thong_ICDP_APP.pdf`,
                          },
                        });
                      }}>
                      Tại đây
                    </Text>
                  </Text>

                  {/* HANDLE: isShowLoginEmail || !emailUserBiometricCache */}
                  {(isShowLoginEmail ||
                    !emailUserBiometricCache ||
                    isRegister) &&
                    !showOtpInput && (
                      <View style={tw`w-[80%] flex-row items-center mt-4`}>
                        <View style={tw.style('w-full flex-col')}>
                          <TextInputCP
                            placeholder={`Email đăng ${
                              isRegister ? 'ký' : 'nhập'
                            }`}
                            cursorColor="#ee0050"
                            // textColor={showOtpInput ? '#ccc' : BLACK_COLOR}
                            textColor={BLACK_COLOR}
                            placeholderTextColor={DISABLED_COLOR}
                            contentStyle={tw.style(
                              'p-2 pl-0',
                              showOtpInput && 'text-gray-400',
                            )}
                            style={tw.style(
                              `bg-white min-h-[25px] h-[40px] flex-1 mb-0 w-full`,
                            )}
                            outlinedStyle={tw.style(
                              'border-[1px] border-gray-200 rounded-md',
                              {
                                borderColor: emailValue
                                  ? isErrorEmail
                                    ? '#ff0000'
                                    : '#2cae6b'
                                  : '#ccc',
                              },
                            )}
                            onChange={val =>
                              handleChangeEmail(val.toLowerCase())
                            }
                            keyboardType="email-address"
                            returnKeyType="next"
                            autoCorrect={false}
                            // disabled={showOtpInput}
                            value={emailValue}
                            ref={refEmail}
                            leftContent={
                              <TextInput.Icon
                                icon="card-account-mail"
                                size={22}
                                style={tw.style('ml-0 mr-0')}
                                color="#cac4d0"
                              />
                            }
                            error={isErrorEmail}
                            helperText={emailValue ? `Email không hợp lệ!` : ''}
                            styleHelperText={tw.style('text-red-500 mb-1')}
                          />
                        </View>
                      </View>
                    )}

                  {/* HANDLE: !isShowLoginEmail && showOtpInput && !isRegister */}
                  {showOtpInput && !isShowLoginEmail ? (
                    <View style={tw`mt-4 w-[80%]`}>
                      <OTPInput
                        setOtpValue={val => handleChangeValue('otpValue', val)}
                        otpValue={otpValue}
                        onComplete={val => onSendingOTP(val)}
                        noLabel
                      />
                    </View>
                  ) : null}

                  {/* HANDLE: isShowLoginEmail*/}
                  {(isShowLoginEmail ||
                    !emailUserBiometricCache ||
                    isRegister) && (
                    <TouchableOpacity
                      onPress={
                        isErrorEmail || !emailValue ? () => {} : onPressLogin
                      }
                      activeOpacity={0.9}
                      style={tw`w-[80%] h-[40px] ${
                        isErrorEmail || !emailValue
                          ? 'bg-gray-300'
                          : 'bg-blue-500'
                      } rounded-md mt-2 py-1 justify-center items-center`}>
                      <Text
                        style={tw`${
                          isErrorEmail || !emailValue
                            ? 'text-gray-500'
                            : 'text-white'
                        } font-bold`}>
                        {showOtpInput ? 'GỬI LẠI MÃ OTP' : 'LẤY MÃ OTP'}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* HANDLE */}
                  {!isRegister &&
                    (isBiometrics ||
                      isBiometricsTouchID ||
                      isBiometricsFaceID) && (
                      <TouchableOpacity
                        onPress={() => {
                          if (isErrorEmail) {
                            return;
                          }
                          createSignatureBiometrics(
                            'Đăng nhập ICDP Mobile',
                            emailUserBiometricCache,
                          );
                        }}
                        activeOpacity={0.9}
                        style={tw`w-[80%] border border-gray-400 rounded-md mt-2 justify-center items-center flex-row flex-wrap gap-1 py-1`}>
                        <Text
                          style={tw`text-black font-medium uppercase text-center text-[11px]`}>
                          {isBiometrics
                            ? 'Đăng nhập sinh trắc học'
                            : isBiometricsTouchID
                            ? 'Đăng nhập với Touch ID'
                            : 'Đăng nhập với Face ID'}
                        </Text>
                        <FastImageCP
                          onTouchStart={() => {
                            if (isErrorEmail) {
                              return;
                            }
                            createSignatureBiometrics(
                              'Đăng nhập ICDP Mobile',
                              emailUserBiometricCache,
                            );
                          }}
                          uriLocal={uriImageBiometric}
                          resizeMode="contain"
                          style={tw`min-h-0 w-[50px] h-[30px]`}
                        />
                      </TouchableOpacity>
                    )}

                  {/* HANDLE */}
                  {isShowLoginEmail ||
                  showOtpInput ||
                  !emailUserBiometricCache ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        handleChangeValue('isShowLoginEmail', true);
                      }}
                      activeOpacity={0.9}
                      style={tw`w-[80%] h-[40px] bg-blue-500 rounded-md mt-2 py-1 justify-center items-center`}>
                      <Text style={tw`text-white font-bold`}>
                        ĐĂNG NHẬP BẰNG OTP
                      </Text>
                    </TouchableOpacity>
                  )}

                  <View style={tw.style('items-center mt-2 z-50 w-full', {})}>
                    {/* HANDLE */}
                    {showOtpInput && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={tw.style('px-5')}
                        onPress={() => {
                          handleChangeValue('isShowLoginEmail', true);
                          handleChangeValue('showOtpInput', false);
                        }}>
                        <Text
                          style={tw`font-bold text-[11px] text-gray-500 my-2`}>
                          ĐĂNG NHẬP TÀI KHOẢN EMAIL KHÁC
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={tw.style('px-5')}
                      onPress={() => {
                        setIsRegister(!isRegister);
                        handleChangeValue('isShowLoginEmail', true);
                      }}>
                      <Text
                        style={tw`font-bold text-[11px] text-center text-gray-500 my-2`}>
                        {isRegister ? 'ĐĂNG NHẬP?' : 'ĐĂNG KÝ TÀI KHOẢN?'}
                      </Text>
                    </TouchableOpacity>
                    {!isRegister && (
                      <TouchableOpacity
                        style={tw.style('px-5')}
                        activeOpacity={0.8}
                        onPress={onConfirmDeleteAccount}>
                        <Text
                          style={tw`font-bold text-[11px] text-gray-500 my-2`}>
                          XÓA TÀI KHOẢN
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Footer />
                </View>
              </View>
              <DialogCP
                visible={visible}
                setVisible={setIsVisible}
                styleDialog={tw`mx-10`}
                title="Xác nhận xóa">
                <View
                  style={tw.style(`p-4 rounded-md w-full`, {
                    backgroundColor: colors.BACKGROUND_CARD,
                  })}>
                  <Text
                    style={tw.style('text-[14px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Bạn có chắc chắn muốn xóa tài khoản {emailValue}?
                  </Text>
                  <View style={tw`flex flex-row justify-end gap-2 mt-3`}>
                    <ButtonCP
                      iconName="close-outline"
                      sizeIcon={17}
                      titleIcon="Thoát"
                      colorIcon="#fff"
                      colorBorder="#05c46b"
                      colorBG="#05c46b"
                      onPress={() => setIsVisible(false)}
                      styleContainer={tw`min-w-[80px] p-1`}
                    />
                    <ButtonCP
                      iconName="trash-outline"
                      sizeIcon={17}
                      titleIcon="Xóa"
                      colorIcon="#fff"
                      colorBorder="#dc2626"
                      colorBG="#dc2626"
                      onPress={onDeleteAccount}
                      styleContainer={tw`min-w-[80px] p-1`}
                    />
                  </View>
                </View>
              </DialogCP>
            </ScrollView>
          </SafeAreaWrap>
        </LinearGradient>
      )}
    </>
  );
}
