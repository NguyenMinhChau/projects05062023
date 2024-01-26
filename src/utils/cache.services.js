import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
const KEY_CURRENT_USER = 'ICDP_CACHE_CURRENT_USER';
const KEY_SETTING_APPEARANCE = 'ICDP_CACHE_SETTING_APPEARANCE';
const KEY_ACCESS_TOKEN = 'ICDP_CACHE_ACCESS_TOKEN';
const KEY_TOKEN_SECURITY = 'ICDP_CACHE_TOKEN_SECURITY';
const KEY_LOADER_SLIDER_USED = 'ICDP_CACHE_LOADER_SLIDER_USED';
const KEY_ACCESS = 'ICDP_CACHE_ACCESS';
const BIOMETRIC_APP = 'ICDP_CACHE_BIOMETRIC';

// !GET STORAGE
export const getAsyncCacheCurrentUser = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_CURRENT_USER}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'currentUser',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheSettingAppearance = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_SETTING_APPEARANCE}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'appearance_display',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheSettingAppearanceKEY = async () => {
  try {
    const settingAppearance = await AsyncStorage.getItem(
      `@${KEY_SETTING_APPEARANCE}`,
    )
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return settingAppearance;
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheAccessToken = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_ACCESS_TOKEN}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'accessToken',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheAccessTokenKEY = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(`@${KEY_ACCESS_TOKEN}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheTokenSecurity = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_TOKEN_SECURITY}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'tokenSecurity',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheTokenSecurityKEY = async () => {
  try {
    const tokenSecurity = await AsyncStorage.getItem(`@${KEY_TOKEN_SECURITY}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return tokenSecurity;
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheLoaderSliderUsed = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_LOADER_SLIDER_USED}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'loader_slider_used',
            value: res || {state: true},
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheLoaderSliderUsedKEY = async () => {
  try {
    const loaderState = await AsyncStorage.getItem(`@${KEY_LOADER_SLIDER_USED}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return loaderState;
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheAccess = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_ACCESS}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'access_app',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheBiometric = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${BIOMETRIC_APP}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'biometric_app',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheAccessKEY = async () => {
  try {
    const accessState = await AsyncStorage.getItem(`@${KEY_ACCESS}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return accessState;
  } catch (err) {
    console.log(err);
  }
};
export const getAsyncCacheBiometricKEY = async () => {
  try {
    const biometricState = await AsyncStorage.getItem(`@${BIOMETRIC_APP}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return biometricState;
  } catch (err) {
    console.log(err);
  }
};

// !SET STORAGE
export const setAsyncCacheCurrentUser = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_CURRENT_USER}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheSettingAppearance = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_SETTING_APPEARANCE}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheAccessToken = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_ACCESS_TOKEN}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheTokenSecurity = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_TOKEN_SECURITY}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheLoaderSliderUsed = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_LOADER_SLIDER_USED}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheAccess = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_ACCESS}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheBiometric = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${BIOMETRIC_APP}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};

// !REMOVE STORAGE
const LIST_KEY_NO_REMOVE = [KEY_LOADER_SLIDER_USED, KEY_ACCESS, BIOMETRIC_APP];
export const removeAsyncCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keysRemove = await keys.filter(
      key => !LIST_KEY_NO_REMOVE.includes(key.replace('@', '')),
    );
    await AsyncStorage.multiRemove(keysRemove);
    return true;
    // await AsyncStorage.clear();
    // return true;
  } catch (exception) {
    return false;
  }
};
export const removeAsyncCacheAccess = async () => {
  try {
    await AsyncStorage.removeItem(`@${KEY_ACCESS}`);
    return true;
  } catch (exception) {
    return false;
  }
};
