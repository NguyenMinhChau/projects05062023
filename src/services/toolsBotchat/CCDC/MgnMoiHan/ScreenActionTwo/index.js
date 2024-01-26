import {SET_DATA_PAYLOAD} from '../../../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../../components/General/NotificationToast';
import {
  axios101Post,
  axios101PostFormData,
  axios101PutFormData,
} from '../../../../../utils/axios/axiosInstance';
import {errorMessage} from '../../../../jwt';

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
      key: 'mgn_moi_han_action_two',
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
      key: 'mgn_moi_han_action_two',
      value: {
        isLoading: false,
      },
    }),
  );
};
export const MACHINE_DEFECT_SERVICE_UPDATE = async (props = {}) => {
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
      'ql-ccdc/upload/machine-defect',
      payload,
    );
    handleReset();
    navigation.goBack();
    CallApiGetList();
    openNotificationToast({
      title: 'Thông báo',
      message: 'Cập nhật bảo hành/sửa chữa thành công!',
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
export const GET_LIST_MACHINE_DEFECT_BY_ID_TWO = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = {...props};
  startFunc(dispatch);
  try {
    const resPost = await axios101Post(
      'ql-ccdc/get-images-by-machine',
      payload,
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_two',
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
export const GET_LIST_IMAGE_MACHINE_DEFECT_BY_ID_TWO = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, setDataImage} = {
    ...props,
  };
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('ql-ccdc/get-detail-image', payload);
    setDataImage && setDataImage(resPost?.payload?.payload);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_two',
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
export const MACHINE_DEFECT_SERVICE = async (props = {}) => {
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
      'ql-ccdc/upload/machine-defect',
      payload,
    );
    handleReset();
    navigation.goBack();
    CallApiGetList();
    openNotificationToast({
      title: 'Thông báo',
      message: 'Gửi bảo hành/sửa chữa thành công!',
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
export const CONFIRM_UPLOAD_IMAGE_SERVICE_TWO = async (props = {}) => {
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
