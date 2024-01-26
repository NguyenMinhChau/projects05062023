import React, {useEffect} from 'react';
import {
  useColorScheme,
  Linking,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {NativeBaseProvider} from 'native-base';
import VersionCheck from 'react-native-version-check';
import {
  getAsyncCacheAccess,
  getAsyncCacheAccessToken,
  getAsyncCacheBiometric,
  getAsyncCacheCurrentUser,
  getAsyncCacheLoaderSliderUsed,
  getAsyncCacheSettingAppearance,
  getAsyncCacheSettingAppearanceKEY,
  setAsyncCacheBiometric,
  setAsyncCacheLoaderSliderUsed,
  setAsyncCacheSettingAppearance,
} from '../utils/cache.services';
import useAppContext from '../utils/hooks/useAppContext';
import TabHomeStackCP from './routersRender/TabHomeStackCP';
import {URL_APP_PLAY_STORE, URL_APP_STORE, PACKAGE_NAME_APP} from '@env';
import DialogCP from './General/Dialog/DialogCP';
import tw from '../styles/twrnc.global';
import {Iconify} from 'react-native-iconify';
import RowDialogCP from './General/Dialog/RowDialogCP';
import ButtonCP from './General/ButtonCP';
import {CRITICAL_COLOR} from '../styles/colors.global';
import LoaderGifCP from './LoaderApp/LoaderGif';
import LoaderBgcCP from './LoaderApp/LoaderBgc';
import LoadingScreen from './General/LoadingScreen';
import {useGetColorThemeDisplay} from '../utils/appearance.utils';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../utils/toast.config';
import useAppPermission from '../utils/MgnAccess/config';
import {SET_TOGGLE_PAYLOAD} from './Context/AppContext.reducer';
import NotificationToast from './General/NotificationToast';
import DialogConfirmToast from './General/DialogConfirm';
import ScreenDevelopment from './General/ScreenDevelopment';
import {SafeAreaWrap} from './General/SafeAreaWrap';
import {getTokenMobileAppService} from '../services/jwt';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RESULTS} from 'react-native-permissions';
import {AxiosInterceptorResponse} from '../utils/axios/axiosInstance';

export default function Main() {
  const {dispatch, state} = useAppContext();
  const {
    appearance_display,
    currentUser,
    access_app,
    loader_slider_used,
    accessToken,
    tokenSecurity,
    biometric_app,
  } = state.set_data;
  const {
    visible_toast,
    type,
    title,
    message,
    buttons,
    duration,
    MessageCustom,
  } = state.set_data.notification_toast;
  const {
    visible_toast: visible_toast_dialog,
    title: title_dialog,
    message: message_dialog,
    MessageCustom: MessageCustomDialog,
    funcHandle: funcHandleDialog,
    imageLink: imageLinkDialog,
    imageLocal: imageLocalDialog,
  } = state.set_data.dialog_confirm_toast;
  const {submitting} = state.set_toggle;
  const {loaderBgc, loaderGif} = state.set_toggle.loader;
  const displaySystem = useColorScheme();
  const [isUpdateApp, setIsUpdateApp] = React.useState(false);
  const [versionNewApp, setVersionNewApp] = React.useState(null);
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [connectionType, setConnectionType] = React.useState(null);
  const {colors} = useGetColorThemeDisplay();
  const {checkPermissionsReload, checkPermission, TYPE_ACCESS} =
    useAppPermission();

  const isPermissionCamera = Object.entries(access_app || {}).find(x => {
    return x?.[1].type_access === TYPE_ACCESS.CAMERA;
  })?.[1];
  const isPermissionLocation = Object.entries(access_app || {}).find(x => {
    return x?.[1].type_access === TYPE_ACCESS.LOCATION;
  })?.[1];

  const isPermissionCameraEnable =
    isPermissionCamera?.checked === RESULTS.GRANTED;
  const isPermissionLocationEnable =
    isPermissionLocation?.checked === RESULTS.GRANTED;

  const handleChangeLoader = (key, val) => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'loader',
        value: {
          ...state.set_toggle.loader,
          [key]: val,
        },
      }),
    );
  };

  useEffect(() => {
    const requestPermissions = async () => {
      await checkPermission(TYPE_ACCESS.CAMERA, false);
      await checkPermission(TYPE_ACCESS.LOCATION, false);
    };
    requestPermissions();

    getTokenMobileAppService(currentUser?._id || currentUser?.email, dispatch);
    getAsyncCacheCurrentUser(dispatch);
    getAsyncCacheAccessToken(dispatch);
    getAsyncCacheBiometric(dispatch);
    getAsyncCacheLoaderSliderUsed(dispatch);

    const checkSettingAppearance = async () => {
      const settingAppearance = await getAsyncCacheSettingAppearanceKEY();
      if (
        settingAppearance ||
        Object.values(settingAppearance || {}).length > 0
      ) {
        await getAsyncCacheSettingAppearance(dispatch);
      } else {
        await setAsyncCacheSettingAppearance({
          label: 'Hệ thống',
          value: displaySystem || 'light',
        });
        await getAsyncCacheSettingAppearance(dispatch);
      }
    };
    checkSettingAppearance();

    const initCheckApp = async () => {
      VersionCheck.needUpdate({
        packageName: PACKAGE_NAME_APP,
      }).then(async res => {
        if (res?.isNeeded) {
          setIsUpdateApp(true);
          setVersionNewApp(res?.latestVersion);
        } else {
          setIsUpdateApp(false);
          setVersionNewApp(null);
        }
      });
      handleChangeLoader('loaderGif', true);
      setTimeout(() => {
        handleChangeLoader('loaderGif', false);
        handleChangeLoader('loaderBgc', true);
        setTimeout(() => {
          handleChangeLoader('loaderBgc', false);
        }, 1000);
      }, 1000);
    };

    initCheckApp();

    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setConnectionStatus(state?.isConnected);
      setConnectionType(state?.type);
    });

    return () => {
      unsubscribeNetInfo && unsubscribeNetInfo();
    };
  }, []);

  const toggleUpdateApp = () => {
    setIsUpdateApp(!isUpdateApp);
  };
  const handleRedirectPlayStore = () => {
    Linking.openURL(
      Platform.OS === 'android' ? `${URL_APP_PLAY_STORE}` : `${URL_APP_STORE}`,
    );
  };

  const theme =
    appearance_display?.value === 'dark' ||
    appearance_display?.value === 'dark-no-system'
      ? MD3DarkTheme
      : MD3LightTheme;

  return (
    <>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NativeBaseProvider>
            {loaderGif ? (
              <LoaderGifCP />
            ) : loaderBgc ? (
              <LoaderBgcCP />
            ) : (
              <>
                {submitting && <LoadingScreen />}
                {connectionStatus ? (
                  <AxiosInterceptorResponse>
                    <TabHomeStackCP />
                  </AxiosInterceptorResponse>
                ) : (
                  <SafeAreaWrap
                    backgroundColorTop={colors.BACKGROUND_CARD}
                    backgroundColorBottom={colors.BACKGROUND_CARD}>
                    <View
                      style={tw.style('flex-1 items-center justify-center ', {
                        backgroundColor: colors.BACKGROUND_CARD,
                      })}>
                      <ScreenDevelopment
                        message="Vui lòng kiểm tra kết nối mạng của bạn!"
                        uriLocal={require('../assets/images/no_internet.png')}
                        styleContainer={tw`w-full h-full`}
                        iconName="wifi-outline"
                      />
                    </View>
                  </SafeAreaWrap>
                )}
                <DialogCP
                  visible={isUpdateApp && versionNewApp}
                  setVisible={val => setIsUpdateApp(val)}>
                  <View
                    style={tw.style(
                      `w-full flex-row items-center justify-between`,
                      {
                        backgroundColor: colors.WHITE_COLOR,
                      },
                    )}
                    onTouchStart={() => {
                      setIsUpdateApp(!isUpdateApp);
                    }}>
                    <View
                      style={tw`h-[40px] w-[80px] items-start justify-start`}>
                      <Image
                        source={require('../assets/images/ICDP_mobile_logo_2.png')}
                        style={tw`w-full h-full`}
                        resizeMode="contain"
                      />
                    </View>
                    <Iconify
                      icon="iconamoon:close"
                      color={tw.color('gray-400')}
                      width={30}
                      height={30}
                      style={tw`justify-end`}
                    />
                  </View>
                  <ScrollView
                    style={tw`h-auto py-2`}
                    showsVerticalScrollIndicator={false}>
                    <View style={tw`px-2`}>
                      <Text
                        style={tw.style(
                          `text-center font-bold text-[16px] px-1 leading-5`,
                          {
                            color: colors.BLACK_COLOR,
                          },
                        )}>
                        Thông báo cập nhật ứng dụng
                      </Text>
                    </View>
                    <RowDialogCP
                      header="Thông tin chung"
                      label="Phiên bản"
                      value={`v${versionNewApp}`}
                      noBullet
                    />
                    <View style={tw.style('items-center justify-center')}>
                      <Text
                        style={tw.style(
                          `text-[14px] text-[${colors.PRIMARY_COLOR}] text-center leading-5 italic font-bold mt-2`,
                        )}>
                        Vui lòng cập nhật để có trải nghiệm tốt nhất. Cảm ơn!
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'w-full flex-row justify-end items-end gap-2 mt-3 px-2',
                      )}>
                      <ButtonCP
                        iconName="close-circle-outline"
                        colorIcon={CRITICAL_COLOR}
                        titleIcon="Để sau"
                        sizeIcon={18}
                        onPress={toggleUpdateApp}
                        style={tw.style('w-[150px] p-1')}
                        variant="outlined"
                        colorBG="transparent"
                        colorBorder={CRITICAL_COLOR}
                      />
                      <ButtonCP
                        iconName="refresh-outline"
                        colorIcon="#fff"
                        titleIcon="Cập nhật"
                        sizeIcon={18}
                        onPress={handleRedirectPlayStore}
                        style={tw.style('w-[150px] p-1')}
                        colorBG={colors.PRIMARY_COLOR}
                        colorBorder={colors.PRIMARY_COLOR}
                      />
                    </View>
                  </ScrollView>
                </DialogCP>
                <NotificationToast
                  isVisible={visible_toast}
                  type={type}
                  title={title}
                  message={message}
                  buttons={buttons}
                  duration={duration}
                  MessageCustom={MessageCustom}
                />
                <DialogConfirmToast
                  isVisible={visible_toast_dialog}
                  title={title_dialog}
                  message={message_dialog}
                  MessageCustom={MessageCustomDialog}
                  funcHandle={funcHandleDialog}
                  imageLink={imageLinkDialog}
                  imageLocal={imageLocalDialog}
                />
              </>
            )}
          </NativeBaseProvider>
        </GestureHandlerRootView>
      </PaperProvider>
      <Toast config={toastConfig(colors)} />
    </>
  );
}
