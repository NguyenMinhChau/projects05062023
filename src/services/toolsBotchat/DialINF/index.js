import axios from 'axios';
import {TYPE_NOTIFICATION} from '../../../components/General/NotificationToast';
import {
  getAsyncCacheAccessTokenKEY,
  getAsyncCacheTokenSecurityKEY,
} from '../../../utils/cache.services';
import {errorMessage} from '../../jwt';
import {SET_DATA_PAYLOAD} from '../../../components/Context/AppContext.reducer';
import {HOST_101_FIX_HEADER} from '@env';

const startFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'dial_inf',
      value: {
        isLoading: true,
      },
    }),
  );
};
const endFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'dial_inf',
      value: {
        isLoading: false,
      },
    }),
  );
};

export const SCAN_QR_CODE_SERVICE = async (props = {}) => {
  const {
    state,
    dispatch,
    openNotificationToast,
    endpoint,
    emailUser,
    lat,
    long,
  } = {
    ...props,
  };
  startFunc(dispatch);
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const resGet = await axios.get(
      `${endpoint}?email=${emailUser}&lat=${lat}&long=${long}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    const resGetUserInfo = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-users?email=${emailUser}&prize=''`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: false,
          user_info_program: resGetUserInfo?.data?.payload,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Check in thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
    endFunc(dispatch);
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg + '. Check in thất bại, vui lòng thử lại.',
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_PRIZE = async (props = {}) => {
  const {state, dispatch, openNotificationToast} = {
    ...props,
  };
  startFunc(dispatch);
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-prizes`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: false,
          list_prize: resGet?.data?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_USER_JOIN = async (props = {}) => {
  const {state, dispatch, openNotificationToast, isPrize, emailUser} = {
    ...props,
  };
  startFunc(dispatch);
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-users?email=${emailUser}&prize=${isPrize}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: false,
          list_user_join: resGet?.data?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_USER_INFO_PROGRAM = async (props = {}) => {
  const {state, dispatch, openNotificationToast, isPrize, emailUser} = {
    ...props,
  };
  startFunc(dispatch);
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-users?email=${emailUser}&prize=${isPrize}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: false,
          user_info_program: resGet?.data?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_USER_PRIZE = async (props = {}) => {
  const {state, dispatch, openNotificationToast, isPrize, emailUser} = {
    ...props,
  };
  startFunc(dispatch);
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-users?email=${emailUser}&prize=${isPrize}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: false,
          list_user_prize: resGet?.data?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
export const GET_LIST_USER_NO_PRIZE = async (props = {}) => {
  const {state, dispatch, openNotificationToast, isPrize, emailUser} = {
    ...props,
  };
  startFunc(dispatch);
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-users?email=${emailUser}&prize=${isPrize}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: false,
          list_user_no_prize: resGet?.data?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
