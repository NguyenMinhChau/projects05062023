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
      key: 'merry_christmas_inf',
      value: {
        isLoading: true,
      },
    }),
  );
};
const endFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'merry_christmas_inf',
      value: {
        isLoading: false,
      },
    }),
  );
};

export const SET_PRIZE_MERRY_CHRISTMAS = async (props = {}) => {
  const {
    state,
    dispatch,
    emailUser,
    openNotificationToast,
    setIsShowGif,
    setIsReTry,
  } = {
    ...props,
  };
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  startFunc(dispatch);
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/generate-code-merry-christmar/6596a21059e63edd82dd6b93/${emailUser}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    const resGetUser = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-status-is-prize-by-email/6596a21059e63edd82dd6b93/${emailUser}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    const {status, code} = {...resGetUser?.data?.payload};
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'merry_christmas_inf',
        value: {
          isLoading: false,
          user_info_program: resGet?.data?.payload,
          data_code:
            status === 'NO_CHECKIN' || typeof status !== 'string'
              ? null
              : {
                  status: status === 'PRIZED' ? true : false,
                  message:
                    status === 'PRIZED'
                      ? `Chúc mừng bạn đã trúng hộp quà số ${code} (Vui lòng liên hệ workchat tanch2@fpt.com hoặc zalo 0767076709 để nhận quà nhé) 🎉`
                      : 'Chúc bạn Giáng sinh an lành. Merry Christmas and Happy New Year 🎄',
                },
        },
      }),
    );
    setIsShowGif(false);
    setIsReTry(false);
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
    setIsShowGif(false);
    setIsReTry(true);
  }
};

export const GET_INFO_USER_MERRY_CHRISTMAS = async (props = {}) => {
  const {state, dispatch, emailUser, openNotificationToast} = {
    ...props,
  };
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  startFunc(dispatch);
  try {
    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ct-tat-nien/get-status-is-prize-by-email/6596a21059e63edd82dd6b93/${emailUser}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    const {status, code} = {...resGet?.data?.payload};
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'merry_christmas_inf',
        value: {
          isLoading: false,
          user_info_program: resGet?.data?.payload,
          data_code:
            status === 'NO_CHECKIN' || typeof status !== 'string'
              ? null
              : {
                  status: status === 'PRIZED' ? true : false,
                  message:
                    status === 'PRIZED'
                      ? `Chúc mừng bạn đã trúng hộp quà số ${code} (Vui lòng liên hệ workchat tanch2@fpt.com hoặc zalo 0767076709 để nhận quà nhé) 🎉`
                      : 'Chúc bạn Giáng sinh an lành. Merry Christmas and Happy New Year 🎄',
                },
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
