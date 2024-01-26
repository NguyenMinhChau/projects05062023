import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';
import {axios101Post} from '../utils/axios/axiosInstance';
import {errorMessage} from './jwt';

const startFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'user_role',
      value: {
        isLoading: true,
      },
    }),
  );
};

const endFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'user_role',
      value: {
        isLoading: false,
      },
    }),
  );
};
//?! GET USER LIST BY ROLE - ASSIGN API MOBILE
export const GET_USER_LIST_BY_ROLE = async (props = {}) => {
  const {dispatch, state, taskType, openNotificationToast} = props;
  const {accessToken} = state?.set_data;
  const {accessToken: tokenAccess} = {...accessToken};
  try {
    const resPost = await axios101Post('role/user/get-user-list-by-role');
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'user_role',
        value: {
          isLoading: false,
          user_list_by_role: resPost.payload,
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
    endFunc(dispatch);
  }
};
