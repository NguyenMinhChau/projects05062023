import * as React from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Main from './src/components/Main';
import {ProviderContext} from './src/components/Context';
import {
  getTokenDevice,
  notificationListener,
  onDisplayNotification,
  requestUserPermissionNotification,
} from './src/utils/notifications.utils';
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();
const App = () => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {notification, data} = {...remoteMessage};
      const {title, body} = {...notification};
      onDisplayNotification({title, body, data});
      notifee.setBadgeCount(0).then(() => {});
    });
    requestUserPermissionNotification();
    getTokenDevice();
    notificationListener();
    return unsubscribe;
  }, []);
  return (
    <ProviderContext>
      <Main />
    </ProviderContext>
  );
};

export default App;
