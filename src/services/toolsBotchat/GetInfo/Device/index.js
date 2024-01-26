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

// THÔNG TIN TẬP ĐIỂM
export const GET_INFO_GROUP_POINT = async (props = {}) => {
  const {state, dispatch, group_point, openNotificationToast} = props;
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('tool-system/botchat/group-points', {
      groupPoint: group_point,
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
        message: `Lấy thông tin tập điểm thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: `Lấy thông tin tập điểm thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
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
