import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import NavigateService from '../components/routersConfig/NavigateService';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {Platform} from 'react-native';
import {FIREBASE_SERVER_KEY} from '@env';

export const requestUserPermissionNotification = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Permission Notification Authorization Status:', authStatus);
  }
};

export const RedirectNotification = async (props = {}) => {
  const {remoteMessage, delay} = {...props};
  const timeout = delay ? delay : 1000;
  if (
    !!remoteMessage.data &&
    remoteMessage.data?.redirect_to &&
    Object.values(SCREEN_NAVIGATE).includes(remoteMessage.data?.redirect_to)
  ) {
    setTimeout(() => {
      NavigateService?.navigate(remoteMessage.data?.redirect_to, {
        _id: remoteMessage.data?._id,
        value: remoteMessage.data?.value,
        tab_active: remoteMessage.data?.tab_active,
      });
    }, timeout);
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // redirect when click notification
    RedirectNotification({
      remoteMessage,
    });
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        RedirectNotification({
          remoteMessage,
          delay: Platform?.OS === 'ios' ? 12000 : 8000,
        });
      }
    });
};

export const getTokenDevice = async () => {
  if (Platform.OS === 'android') {
    await messaging().registerDeviceForRemoteMessages();
  }
  const token = await messaging().getToken();
  return token;
};

export const sendNotification = async token => {
  const message = {
    registration_ids: [token],
    notification: {
      title: 'ICDP Mobile',
      body:
        Platform.OS == 'ios'
          ? 'Gửi thông báo từ iOS'
          : 'Gửi thông báo từ Android',
      vibrate: 1,
      sound: 1,
      priority: 'high',
      show_in_foreground: true,
      // content_available: true,
    },
    data: {
      _id: '',
      value: '',
      tab_active: '',
      redirect_to: 'Lịch sử xử lý ảnh',
    },
  };

  let headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'key=' + FIREBASE_SERVER_KEY,
  });

  let response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers,
    body: JSON.stringify(message),
  });
  response = await response.json();
};

export const onDisplayNotification = async (props = {}) => {
  const {
    title = 'Thông báo',
    subTitle = '',
    body = 'Không có nội dung',
    idChannel = 'mac_dinh',
    nameChannel = 'Mặc định',
    data = {},
  } = {...props};
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: idChannel,
    name: nameChannel,
    sound: 'bell_notification',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.SECRET,
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    subtitle: subTitle,
    body: body,
    data: data,
    ios: {},
    sound: 'bell_notification',
    android: {
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.SECRET,
      sound: 'bell_notification',
      showTimestamp: true,
      channelId,
      pressAction: {
        id: idChannel,
      },
    },
  });
};
