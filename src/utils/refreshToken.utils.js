import axios from 'axios';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import NavigateService from '../components/routersConfig/NavigateService';
import {isValidToken} from '../services/jwt';
import {URL_101} from './axios/axiosInstance';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheAccessTokenKEY,
  getAsyncCacheBiometric,
  getAsyncCacheBiometricKEY,
  getAsyncCacheCurrentUser,
  getAsyncCacheTokenSecurity,
  getAsyncCacheTokenSecurityKEY,
  setAsyncCacheAccessToken,
  setAsyncCacheBiometric,
  setAsyncCacheCurrentUser,
  setAsyncCacheTokenSecurity,
} from './cache.services';
import {useNotificationToast} from './notification_toast.utils';

let count = 0;

export const getVerifiedKeys = async (keys, dispatch) => {
  console.log('Loading keys from storage');
  if (keys?.accessToken) {
    console.log('checking access');
    if (isValidToken(keys?.accessToken)) {
      console.log('returning keys (accessToken not valid)');
      return keys;
    } else {
      console.log('access expired');
      console.log('checking refresh expiry');
      count = 0;
      if (isValidToken(keys?.refreshToken)) {
        if (count <= 0) {
          count++;
          console.log('fetching access using refresh');

          const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
          const accessToken = await getAsyncCacheAccessTokenKEY();

          const {tokenSecurity: securityToken} = {...tokenSecurity};
          const {refreshToken: refreshTokenOldCache} = {...accessToken};

          const responseAPI = await axios.post(
            `${URL_101}/role/user/get-info-user-by-token`,
            {
              token: securityToken,
              tokenAPI: refreshTokenOldCache,
            },
          );

          const user = responseAPI?.data?.payload;

          await setAsyncCacheCurrentUser(user);
          await setAsyncCacheAccessToken({
            accessToken: refreshTokenOldCache,
            refreshToken: user?.refreshToken,
          });

          await setAsyncCacheTokenSecurity({tokenSecurity: securityToken});

          await getAsyncCacheCurrentUser(dispatch);
          await getAsyncCacheAccessToken(dispatch);
          await getAsyncCacheTokenSecurity(dispatch);

          console.log('UPDATED ONE');
          return responseAPI?.data?.payload;
        } else {
          return;
        }
      } else {
        console.log('refresh expired, please login');
        NavigateService.navigate(SCREEN_NAVIGATE.Login_Screen);
        openNotificationToast({
          title: 'Thông báo',
          message: 'Hết phiên đăng nhập, vui lòng đăng nhập lại!',
          type: TYPE_NOTIFICATION.WARNING,
        });
        return null;
      }
    }
  } else {
    console.log('access token not available, please login');
    const biometric_app = await getAsyncCacheBiometricKEY();
    await setAsyncCacheBiometric({
      state: biometric_app?.state,
      data: {emailUser: null, tokenAccess: null, securityToken: null},
    });
    await getAsyncCacheBiometric(dispatch);
    await setAsyncCacheCurrentUser(null);
    await setAsyncCacheAccessToken({
      accessToken: null,
      refreshToken: null,
    });
    await setAsyncCacheTokenSecurity({tokenSecurity: null});

    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
    await getAsyncCacheTokenSecurity(dispatch);
    NavigateService.navigate(SCREEN_NAVIGATE.Login_Screen);
    return null;
  }
};
