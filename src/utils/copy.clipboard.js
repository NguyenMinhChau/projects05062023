import Clipboard from '@react-native-clipboard/clipboard';
import {useNotificationToast} from './notification_toast.utils';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';

export const useCopyToClipboard = () => {
  const {openNotificationToast} = useNotificationToast();
  const onCopyToClipboard = text => {
    Clipboard.setString(text);
    openNotificationToast({
      title: 'Thông báo',
      message: 'Đã copy vào clipboard',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  };
  return {
    onCopyToClipboard,
  };
};
