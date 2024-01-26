import {SET_DATA_PAYLOAD} from '../../../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../../components/General/NotificationToast';
import {
  axios101Post,
  axios101PostFormData,
  axios101PutFormData,
} from '../../../../../utils/axios/axiosInstance';
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
      key: 'mgn_moi_han_action_three',
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
      key: 'mgn_moi_han_action_three',
      value: {
        isLoading: false,
      },
    }),
  );
};
export const SC_WELD_IMAGE_SERVICE = async (props = {}) => {
  const {
    state,
    dispatch,
    openNotificationToast,
    payload,
    handleReset,
    navigation,
    CallApiGetList,
  } = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101PostFormData(
      'ql-ccdc/upload/sc-weld-img',
      payload,
    );
    handleReset();
    navigation.goBack();
    CallApiGetList();
    openNotificationToast({
      title: 'Thông báo',
      message: 'Gửi lịch sử hàn nối cho xử lý sự cố thành công!',
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
export const SC_WELD_IMAGE_SERVICE_UPDATE = async (props = {}) => {
  const {
    state,
    dispatch,
    openNotificationToast,
    payload,
    handleReset,
    navigation,
    CallApiGetList,
  } = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101PutFormData(
      'ql-ccdc/upload/sc-weld-img',
      payload,
    );
    handleReset();
    navigation.goBack();
    CallApiGetList();
    openNotificationToast({
      title: 'Thông báo',
      message: 'Cập nhật lịch sử hàn nối cho xử lý sự cố thành công!',
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

export const GET_LIST_MACHINE_DEFECT_BY_ID_THREE = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101Post(
      'ql-ccdc/get-images-by-machine',
      payload,
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_three',
        value: {
          isLoading: false,
          data_image_machine: resPost?.payload,
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

export const GET_LIST_IMAGE_MACHINE_DEFECT_BY_ID_THREE = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, setDataImage} = {
    ...props,
  };
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('ql-ccdc/get-detail-image', payload);
    setDataImage && setDataImage(resPost?.payload?.payload);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_three',
        value: {
          isLoading: false,
          data_image_machine_uploaded: resPost?.payload?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    setDataImage && setDataImage([]);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_SC = async (props = {}) => {
  const {state, dispatch, openNotificationToast, page, limit, payload} = {
    ...props,
  };
  startFunc(dispatch);
  try {
    // ?page=${page}&limit=${limit}
    const resPost = await axios101Post(`ql-ccdc/list-sc`, payload);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_three',
        value: {
          isLoading: false,
          data_sc: resPost?.payload,
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

export const CONFIRM_UPLOAD_IMAGE_SERVICE_THREE = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('ql-ccdc/upload/confirm', payload);
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: 'Thao tác thành công!',
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

export const GET_LIST_FILTER_SC = async (props = {}) => {
  const {state, dispatch, openNotificationToast} = {...props};
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  startFunc(dispatch);
  try {
    const resGetBranch = await axios.get(
      `${HOST_101_FIX_HEADER}/ql-ccdc/list-sc/filter/branch`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    const resGetLocation = await axios.get(
      `${HOST_101_FIX_HEADER}/ql-ccdc/list-sc/filter/zone`,
      {
        headers: {
          token: tokenSecurity?.tokenSecurity,
          tokenAPI: accessToken?.accessToken,
        },
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_three',
        value: {
          isLoading: false,
          data_filter: {
            branch: resGetBranch?.data?.payload,
            location: resGetLocation?.data?.payload,
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
