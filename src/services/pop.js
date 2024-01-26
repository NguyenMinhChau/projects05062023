// import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
// import {axios101Post} from '../utils/axios/axiosInstance';
// import {errorMessage} from './jwt';

import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';

const startFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'pop_info',
      value: {
        isLoading: true,
      },
    }),
  );
};

const endFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'pop_info',
      value: {
        isLoading: false,
      },
    }),
  );
};

//?! GET TABLE POP INFO (PAGE & LIMIT)
export const GET_TABLE_POP_INFO = async (props = {}) => {
  const {dispatch, state, page, limit, openNotificationToast} = props;
  // try {
  //   const resPost = await axios101Post(
  //     `pop-info/get-table-pop-info?page=${page}&limit=${limit}`,
  //     {},
  //   );
  //   dispatch(
  //     SET_DATA_PAYLOAD({
  //       key: 'pop_info',
  //       value: {
  //         isLoading: false,
  //         table_pop_info: resPost.payload,
  //       },
  //     }),
  //   );
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // });
  // endFunc(dispatch);
  // }
};

// ?! GET TABLE POP WITH FILTER - ASSIGN API MOBILE
export const GET_TABLE_POP_WITH_FILTER = async (props = {}) => {
  const {dispatch, state, page, limit, openNotificationToast} = props;
  // try {
  //   const resPost = await axios101Post(
  //     `infrastructure/pop/get-table-pop-with-filter/all?page=${page}&limit=${limit}`,
  //     {},
  //   );
  //   dispatch(
  //     SET_DATA_PAYLOAD({
  //       key: 'pop_info',
  //       value: {
  //         isLoading: false,
  //         pop_with_filter: resPost.payload,
  //       },
  //     }),
  //   );
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // endFunc(dispatch);
  // }
};

//?! GET POP AUTO COMPLETE
export const GET_POP_AUTO_COMPLETE = async (props = {}) => {
  const {dispatch, state, openNotificationToast} = props;
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/cap-phat-tai-nguyen/show-pop-auto-complete`,
  //     {},
  //   );
  //   dispatch(
  //     SET_DATA_PAYLOAD({
  //       key: 'pop_info',
  //       value: {
  //         isLoading: false,
  //         pop_auto_complete: resPost.payload,
  //       },
  //     }),
  //   );
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // endFunc(dispatch);
  // }
};
