import {SET_DATA_PAYLOAD} from '../../../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../../components/General/NotificationToast';
import {axios101PostFormData} from '../../../../../utils/axios/axiosInstance';
import {
  getAsyncCacheAccessTokenKEY,
  getAsyncCacheTokenSecurityKEY,
} from '../../../../../utils/cache.services';
import {errorMessage} from '../../../../jwt';
import axios from 'axios';
import {HOST_101_FIX_HEADER} from '@env';

const startFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'mgn_moi_han',
      value: {
        isEdit: false,
        isCreate: false,
      },
    }),
  );
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'mgn_moi_han_action_one',
      value: {
        isLoading: true,
      },
    }),
  );
};
const endFunc = dispatch => {
  // dispatch(
  //   SET_DATA_PAYLOAD({
  //     key: 'mgn_moi_han',
  //     value: {
  //       isEdit: false,
  //       isCreate: false,
  //     },
  //   }),
  // );
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'mgn_moi_han_action_one',
      value: {
        isLoading: false,
      },
    }),
  );
};

export const IMPORT_IMAGE_MAY_HAN_AI_DETECTED = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, isEdit} = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101PostFormData(
      'ql-ccdc/upload/machine-image',
      payload,
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_one',
        value: {
          isLoading: false,
          data_image: {
            ...resPost?.payload,
            dataImg: `${HOST_101_FIX_HEADER}/ql-ccdc/get-image/${resPost?.payload?.dataImg}`,
          },
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          isEdit: isEdit ? true : false,
          isCreate: isEdit ? false : true,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Thao tác thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
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

export const GET_MAY_HAN_BY_ID = async (props = {}) => {
  const {state, dispatch, openNotificationToast, id} = {...props};
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  startFunc(dispatch);
  try {
    // const resGet = await axios101Get(`ql-ccdc/machine/detail?id=${id}`);

    const resGet = await axios.get(
      `${HOST_101_FIX_HEADER}/ql-ccdc/machine/detail?id=${id}`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_one',
        value: {
          isLoading: false,
          item_by_id: resGet?.data?.payload,
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

export const CREATE_MAY_HAN_DINH_KI_SERVICE = async (props = {}) => {
  const {
    state,
    dispatch,
    openNotificationToast,
    payload,
    handleReset,
    navigation,
  } = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101PostFormData(
      'ql-ccdc/upload/log-img',
      payload,
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Tạo mới mối hàn định kì thành công!',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
    handleReset();
    navigation.goBack();
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
export const UPDATE_MAY_HAN_DINH_KI_SERVICE = async (props = {}) => {
  const {
    state,
    dispatch,
    openNotificationToast,
    payload,
    handleReset,
    navigation,
  } = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101PostFormData(
      'ql-ccdc/upload/log-img',
      payload,
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Cập nhật mối hàn định kì thành công!',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
    handleReset();
    navigation.goBack();
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
