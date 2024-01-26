import {AppRegistry, LogBox, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  RedirectNotification,
  onDisplayNotification,
} from './src/utils/notifications.utils';

if (__DEV__) {
  const ignoreWarns = [
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  const {notification, data} = {...remoteMessage};
  const {title, body} = {...notification};
  onDisplayNotification({title, body, data});
  await notifee.incrementBadgeCount();
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  // Check if the user pressed the "Mark as read" action: pressAction.id === 'mark-as-read'
  if (type === EventType.ACTION_PRESS) {
    await notifee.decrementBadgeCount();
    await notifee.cancelNotification(notification?.id);
  }
});

// click notification in app
notifee.onForegroundEvent(({type, detail}) => {
  const {notification, pressAction} = detail;
  switch (type) {
    case EventType.DISMISSED:
      notifee.cancelNotification(notification?.id);
      break;
    case EventType.PRESS:
      RedirectNotification({
        remoteMessage: notification,
      });
      notifee.decrementBadgeCount();
      notifee.cancelNotification(notification?.id);
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs(['Remote debugger']);
