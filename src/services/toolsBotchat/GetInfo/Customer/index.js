import {SET_DATA_PAYLOAD} from '../../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../components/General/NotificationToast';
import {ToastShow} from '../../../../utils/Toast';
import {axios101Post} from '../../../../utils/axios/axiosInstance';
import {TYPE_TOAST} from '../../../../utils/toast.config';
import {errorMessage} from '../../../jwt';

const startFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'tools_chat',
      value: {
        isLoading: true,
      },
    }),
  );
};
const endFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'tools_chat',
      value: {
        isLoading: false,
      },
    }),
  );
};

// THÔNG TIN CUSTOMER SERVICE
export const GET_INFO_CUS_SERVICE = async (props = {}) => {
  const {state, dispatch, ipDev, typeDev, openNotificationToast} = props;
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('tool-system/botchat/service-device', {
      ipDev,
      typeDev,
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          isLoading: false,
          result_botChat: resPost?.payload,
        },
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      duration: 10000,
      props: {
        message: `Lấy thông tin dịch vụ KHG thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: `Lấy thông tin dịch vụ KHG thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
    //   type: TYPE_NOTIFICATION.SUCCESS,
    // });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    ToastShow({
      type: TYPE_TOAST.ERROR,
      duration: 10000,
      props: {
        message: msg,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: msg,
    //   type: TYPE_NOTIFICATION.ERROR,
    // });
    endFunc(dispatch);
  }
};
// THÔNG TIN MODEM KHG
export const GET_INFO_MODEM_KHG = async (props = {}) => {
  const {state, dispatch, contract, openNotificationToast} = props;
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('tool-system/botchat/customer-info', {
      contract,
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          isLoading: false,
          result_botChat: resPost?.payload,
        },
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      duration: 10000,
      props: {
        message: `Lấy thông tin modem KHG thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: `Lấy thông tin modem KHG thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
    //   type: TYPE_NOTIFICATION.SUCCESS,
    // });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    ToastShow({
      type: TYPE_TOAST.ERROR,
      duration: 10000,
      props: {
        message: msg,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: msg,
    //   type: TYPE_NOTIFICATION.ERROR,
    // });
    endFunc(dispatch);
  }
};

export const GET_FILTER_CUSTOMER_SERVICE = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = {...props};
  try {
    const endPoint = 'tool-system/botchat/service-device/filter';
    const resPostIpDev = await axios101Post(`${endPoint}/ipDev`, payload);
    const resPostTypeDev = await axios101Post(`${endPoint}/typeDev`, payload);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          ...state?.set_data.tools_chat,
          dataFilter: {
            ipDev_filter: resPostIpDev?.payload,
            typeDev_filter: resPostTypeDev?.payload,
          },
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
