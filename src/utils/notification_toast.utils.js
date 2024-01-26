import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';
import useAppContext from './hooks/useAppContext';

export const useNotificationToast = () => {
  const {dispatch} = useAppContext();
  //   mở modal
  const openNotificationToast = ({
    title = '',
    type = '',
    message = '',
    buttons = [],
    duration = 10000,
    MessageCustom = null,
  }) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'notification_toast',
        value: {
          visible_toast: true,
          title: title,
          type,
          message,
          buttons,
          duration,
          MessageCustom,
        },
      }),
    );
  };
  //   đóng modal
  const closeNotificationToast = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'notification_toast',
        value: {
          visible_toast: false,
          title: '',
          type: '',
          message: '',
          buttons: [],
          duration: null,
          MessageCustom: null,
        },
      }),
    );
  };
  // modal development
  const openNotifyDevelopment = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'notification_toast',
        value: {
          visible_toast: true,
          title: 'Thông báo',
          type: TYPE_NOTIFICATION.INFO,
          message: 'Chức năng đang phát triển',
          duration: 10000,
        },
      }),
    );
    return;
  };
  // modal NotYetAPI
  const openNotifyNotYetAPI = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'notification_toast',
        value: {
          visible_toast: true,
          title: 'Thông báo',
          type: TYPE_NOTIFICATION.INFO,
          message: 'Chức năng chưa gắn API',
          duration: 10000,
        },
      }),
    );
    return;
  };
  // modal NotYetCallAPI
  const openNotifyNotYetCallAPI = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'notification_toast',
        value: {
          visible_toast: true,
          title: 'Thông báo',
          type: TYPE_NOTIFICATION.INFO,
          message: 'Chức năng chưa gọi API',
          duration: 10000,
        },
      }),
    );
    return;
  };
  return {
    openNotificationToast,
    closeNotificationToast,
    openNotifyDevelopment,
    openNotifyNotYetAPI,
    openNotifyNotYetCallAPI,
  };
};
