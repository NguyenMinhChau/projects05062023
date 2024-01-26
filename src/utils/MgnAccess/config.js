import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import useAppContext from '../hooks/useAppContext';
import {getAsyncCacheAccess, setAsyncCacheAccess} from '../cache.services';
import React from 'react';
import {useNotificationToast} from '../notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../components/General/NotificationToast';

function useAppPermission() {
  const {state, dispatch} = useAppContext();
  const {access_app} = state.set_data;
  const {openNotificationToast} = useNotificationToast();

  React.useEffect(() => {
    checkPermissionsReload();
  }, []);

  const TYPE_ACCESS = {
    LOCATION:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_ALWAYS,
    CAMERA:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    STORAGE:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
    CONTACTS:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS,
  };

  const DATA_MGN_ACCESS_CONFIG = [
    {
      id: 1,
      label: 'Vị trí',
      text: 'sử dụng vị trí',
      iconName: 'navigate-circle-outline',
      type_access: TYPE_ACCESS.LOCATION,
    },
    {
      id: 2,
      label: 'Máy ảnh',
      text: 'sử dụng máy ảnh',
      iconName: 'camera-outline',
      type_access: TYPE_ACCESS.CAMERA,
    },
  ];

  function overrideObjects(arr) {
    const idMap = {};

    for (let i = 0; i < arr.length; i++) {
      const currentObject = arr[i];
      // Luôn cập nhật idMap với object hiện tại, nếu gặp trùng ID, object cuối cùng sẽ được giữ lại
      idMap[currentObject.id] = currentObject;
    }

    // Chuyển idMap thành mảng và trả về kết quả
    return Object.values(idMap || {});
  }

  const checkPermissionsReload = async target => {
    const updatedConfig = await Promise.all(
      DATA_MGN_ACCESS_CONFIG.map(async item => {
        try {
          const result = await check(item.type_access);
          item.checked = result;
          return item;
        } catch (error) {
          return item;
        }
      }),
    );
    await setAsyncCacheAccess(updatedConfig);
    await getAsyncCacheAccess(dispatch);
  };

  const openSetting = message => {
    openNotificationToast({
      title: 'Thông báo',
      message: message,
      type: TYPE_NOTIFICATION.INFO,
      buttons: [
        {
          textBtn: 'Đi đến cài đặt',
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
    });
    return true;
  };

  const handleUnavailable = () => {
    openNotificationToast({
      title: 'Thông báo',
      message: 'Quyền truy cập không khả dụng trên thiết bị này!',
      type: TYPE_NOTIFICATION.WARNING,
    });
    return false;
  };

  const checkPermission = async (type, isOpenSetting = true) => {
    if (!type) {
      return null;
    }
    try {
      const result = await check(type);
      if (result) {
        if (result === RESULTS.GRANTED && isOpenSetting) {
          openSetting(
            `Vì lý do chính sách và quyền riêng tư trên thiết bị, vui lòng đến cài đặt để tắt quyền truy cập ${
              DATA_MGN_ACCESS_CONFIG.find(item => item?.type_access === type)
                ?.text || 'này'
            }!`,
          );
        }
        if (result === RESULTS.UNAVAILABLE) {
          handleUnavailable();
        } else {
          return requestPermission(type, isOpenSetting);
        }
      }
    } catch (error) {
      return false;
    }
  };

  const requestPermission = async (type, isOpenSetting) => {
    try {
      const result = await request(type);
      if (result === RESULTS.BLOCKED && isOpenSetting) {
        openSetting(
          `Bạn đã khóa quyền ${
            DATA_MGN_ACCESS_CONFIG.find(item => item?.type_access === type)
              ?.text || 'này'
          } trước đó, vui lòng đến cài đặt để bật lại quyền truy cập!`,
        );
        return;
      }
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };

  const requestMultiplePermission = async types => {
    const results = [];
    for (const type of types) {
      if (type) {
        const result = await requestPermission(type);
        results.push(result);
      }
    }
    for (const result of results) {
      if (!result) {
        return false;
      }
    }
    return true;
  };

  const requestNotifyPermission = async () => {
    if (Platform.OS === 'android') {
      return true;
    }
    const {status, setting} = await requestNotifications([
      'alert',
      'sound',
      'badge',
    ]);
    return status === RESULTS.GRANTED;
  };

  return {
    TYPE_ACCESS,
    DATA_MGN_ACCESS_CONFIG,
    checkPermission,
    requestPermission,
    requestMultiplePermission,
    requestNotifyPermission,
    checkPermissionsReload,
  };
}

export default useAppPermission;
