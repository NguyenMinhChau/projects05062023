import moment from 'moment';
import {SET_DATA_PAYLOAD} from '../../components/Context/AppContext.reducer';
import {axios101Post, axios101Put} from '../../utils/axios/axiosInstance';
import {errorMessage} from '../jwt';
import {TYPE_NOTIFICATION} from '../../components/General/NotificationToast';

export const GET_LIST_EMPLOYEE__SCHEDULE_OPERATOR = async (props = {}) => {
  const {state, dispatch, openNotificationToast} = {...props};
  try {
    const resPost = await axios101Post('schedule/emp/get-list');
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          employee_list: resPost?.payload,
        },
      }),
    );
  } catch (error) {
    const msg = error?.errors?.message || error?.message || errorMessage(error);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_SCHEDULE_OPERATOR_BY_FILTER = async (props = {}) => {
  const {state, dispatch, emp_email, date, openNotificationToast} = {...props};
  try {
    const fromDate = moment(date).startOf('month').format('YYYY-MM-DD');
    const toDate = moment(date).endOf('month').format('YYYY-MM-DD');
    const resPost = await axios101Post(
      `schedule?email=${emp_email}&fromDate=${fromDate}&toDate=${toDate}`,
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          list_schedule_operator: resPost?.payload,
          isLoading: false,
        },
      }),
    );
  } catch (error) {
    const msg = error?.errors?.message || error?.message || errorMessage(error);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const ADD_SCHEDULE_OPERATOR = async (props = {}) => {
  const {state, dispatch, payload, emp_email, date, openNotificationToast} = {
    ...props,
  };
  try {
    const resPost = await axios101Post(`schedule/emp`, payload);
    GET_LIST_SCHEDULE_OPERATOR_BY_FILTER({
      state,
      dispatch,
      emp_email,
      date,
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Thêm mới lịch trực thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.errors?.message || error?.message || errorMessage(error);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const EDIT_SCHEDULE_OPERATOR = async (props = {}) => {
  const {state, dispatch, payload, emp_email, date, openNotificationToast} = {
    ...props,
  };
  try {
    const resPut = await axios101Put(`schedule/emp`, payload);
    GET_LIST_SCHEDULE_OPERATOR_BY_FILTER({
      state,
      dispatch,
      emp_email,
      date,
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Cập nhật lịch trực thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.errors?.message || error?.message || errorMessage(error);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const EDIT_MULTIPLE__SCHEDULE_OPERATOR = async (props = {}) => {
  const {
    state,
    dispatch,
    payload,
    emp_email,
    fromDate,
    toDate,
    openNotificationToast,
  } = {
    ...props,
  };
  try {
    const resPut = await axios101Put(`schedule/shift`, payload);
    GET_LIST_SCHEDULE_OPERATOR_BY_FILTER({
      state,
      dispatch,
      emp_email,
      fromDate,
      toDate,
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Cập nhật lịch trực thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.errors?.message || error?.message || errorMessage(error);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
