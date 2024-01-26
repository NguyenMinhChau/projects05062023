import {SET_DATA_PAYLOAD} from '../../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../components/General/NotificationToast';
import {axios101Post} from '../../../../utils/axios/axiosInstance';
import {errorMessage} from '../../../jwt';

export const GET_FILTER_MOI_HAN = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = props;
  try {
    const resPost = await axios101Post('ql-ccdc/machine/filter', payload);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          data_filter: resPost?.payload?.[0],
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_MOI_HAN = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, page, limit} = props;
  try {
    const resPost = await axios101Post(
      `ql-ccdc/machine?page=${page}&limit=${limit}`,
      payload,
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          isLoading: false,
          data_moi_han: resPost,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
