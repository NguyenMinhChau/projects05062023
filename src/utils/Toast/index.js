import {Dimensions, Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';

export const ToastShow = (propsToast = {}) => {
  const heightDevice = Dimensions.get('window').height;
  const {
    type,
    props,
    duration,
    autoHide = true,
    onShow = () => {},
    onHide = () => {},
    onPress = () => {},
  } = {...propsToast};
  Toast.show(
    {
      type: type,
      props: props,
      duration: duration || 3000,
      autoHide: autoHide,
      onShow: onShow,
      onHide: onHide,
      onPress: onPress,
    },
    ToastAndroid.SHORT,
  );
};
