import jwtDecode from 'jwt-decode';
import CryptoJS from 'react-native-crypto-js';
import {sign} from 'react-native-pure-jwt';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheTokenSecurity,
  removeAsyncCache,
  setAsyncCacheAccessToken,
  setAsyncCacheTokenSecurity,
} from '../utils/cache.services';
import {URL_101, axios101Post} from '../utils/axios/axiosInstance';
import axios from 'axios';
import {
  CRYPTO_KEY_MOBILE_APP,
  CRYPTO_IV_MOBILE_APP,
  ICDP_SECRET_MOBILE_APP,
} from '@env';
import NavigateService from '../components/routersConfig/NavigateService';

const {ToastShow} = require('../utils/Toast');
const {TYPE_TOAST} = require('../utils/toast.config');

// !USE
const isValidToken = accessToken => {
  if (!accessToken) {
    NavigateService.navigate(SCREEN_NAVIGATE.Login_Screen);

    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// !USE
export const errorMessage = error => {
  const errRaw = error?.response?.data?.errors || [];

  const errList = Array.isArray(errRaw) ? errRaw : [errRaw];

  const fMessage = item => {
    return (
      item?.msg ||
      item?.param ||
      item?.message ||
      item?.message?.[0]?.message ||
      item?.param?.[0]?.param
    );
  };
  const msg = errList?.map(i => {
    return fMessage(i);
  });

  return (
    msg?.[0]?.message ||
    msg?.[0]?.param ||
    msg?.[0]?.[0]?.message ||
    msg?.[0]?.[0]?.param ||
    msg?.[0] ||
    'Đã xảy ra lỗi. Vui lòng liên hệ admin để được hỗ trợ!'
  );
};

// !USE
async function getTokenMobileAppService(idUser, dispatch) {
  try {
    const keyText = CryptoJS.enc.Utf8.parse(CRYPTO_KEY_MOBILE_APP);
    const iv = CryptoJS.enc.Hex.parse(CRYPTO_IV_MOBILE_APP);
    const secretEnc = CryptoJS.AES.encrypt(ICDP_SECRET_MOBILE_APP, keyText, {
      mode: CryptoJS.mode.CBC,
      iv,
    }).toString();
    const token = sign(
      {
        userName: 'icdp_ktht_infmn',
        pwd: 'sad*(YIBC%NIioOMOIBUIVUTC',
        email: 'colt2@fpt.com',
        fullName: 'LE TANG CO',
        _id: idUser,
        exp: new Date().getTime() + 3600 * 1000 * 7 * 24, // 7 days
        keyid: secretEnc,
      },
      ICDP_SECRET_MOBILE_APP,
      {
        alg: 'HS256',
      },
    );

    token.then(async res => {
      await setAsyncCacheTokenSecurity({tokenSecurity: res});
      await getAsyncCacheTokenSecurity(dispatch);
    });
  } catch (error) {
    console.log('error get TokenSecurity: ', error);
  }
}

async function getTokenMobileAppServiceKEY(idUser) {
  try {
    const keyText = CryptoJS.enc.Utf8.parse(CRYPTO_KEY_MOBILE_APP);
    const iv = CryptoJS.enc.Hex.parse(CRYPTO_IV_MOBILE_APP);
    const secretEnc = CryptoJS.AES.encrypt(ICDP_SECRET_MOBILE_APP, keyText, {
      mode: CryptoJS.mode.CBC,
      iv,
    }).toString();
    const token = sign(
      {
        userName: 'icdp_ktht_infmn',
        pwd: 'sad*(YIBC%NIioOMOIBUIVUTC',
        email: 'colt2@fpt.com',
        fullName: 'LE TANG CO',
        _id: idUser,
        exp: new Date().getTime() + 3600 * 1000 * 7 * 24, // 7 days
        keyid: secretEnc,
      },
      ICDP_SECRET_MOBILE_APP,
      {
        alg: 'HS256',
      },
    );

    const tokenSecurity = token.then(async res => {
      return res;
    });
    return tokenSecurity;
  } catch (error) {
    console.log('error get TokenSecurity: ', error);
  }
}

export {isValidToken, getTokenMobileAppService, getTokenMobileAppServiceKEY};
