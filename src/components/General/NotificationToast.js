import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import FastImageCP from './FastImageCP';
import tw from '../../styles/twrnc.global';
import {fList} from '../../utils/array.utils';
import {IconCP} from '../../utils/icon.utils';
import {useNotificationToast} from '../../utils/notification_toast.utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const TYPE_NOTIFICATION = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
};

export default function NotificationToast({
  type = TYPE_NOTIFICATION.INFO,
  title = 'Thông báo',
  message = 'Thông báo mới',
  buttons = [],
  isVisible = false,
  duration = 10000,
  MessageCustom = null,
}) {
  const {closeNotificationToast} = useNotificationToast();
  const {colors} = useGetColorThemeDisplay();
  const [visible, setVisible] = React.useState(false);
  const [timeLoading, setTimeLoading] = React.useState(duration / 1000);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const image =
    type === TYPE_NOTIFICATION.SUCCESS
      ? require('../../assets/images/notification_success.png')
      : type === TYPE_NOTIFICATION.ERROR
      ? require('../../assets/images/notification_error.png')
      : type === TYPE_NOTIFICATION.WARNING
      ? require('../../assets/images/notification_warning.png')
      : require('../../assets/images/notification_info.png');
  const color =
    type === TYPE_NOTIFICATION.SUCCESS
      ? '#3ab952'
      : type === TYPE_NOTIFICATION.ERROR
      ? '#e85450'
      : type === TYPE_NOTIFICATION.WARNING
      ? '#e3b432'
      : '#1e90ff';

  React.useEffect(() => {
    if (isVisible) {
      setVisible(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeLoading(duration / 1000);
      const timerLoading = setInterval(() => {
        setTimeLoading(prev => prev - 1);
      }, 1000);
      const timer = setTimeout(() => {
        setVisible(false);
        closeNotificationToast();
      }, duration);
      return () => {
        clearTimeout(timer);
        clearInterval(timerLoading);
      };
    } else {
      setTimeLoading(duration / 1000);
      setVisible(false);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && visible && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            onTouchEnd={closeNotificationToast}
            style={tw.style(
              'absolute z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center p-2',
              {
                backgroundColor: colors.BGC_LOADING,
              },
            )}>
            <Animated.View
              style={tw.style(
                'w-[300px] rounded-2xl shadow-lg absolute overflow-hidden bg-transparent',
                {
                  transform: [{scale: scaleValue}],
                },
              )}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={tw.style('flex-1')}>
                <View
                  style={tw.style('absolute w-full h-full z-10', {
                    backgroundColor: colors.BACKGROUND_CARD,
                  })}></View>
                <View style={tw.style('p-[2px] rounded-2xl z-50')}>
                  <View
                    style={tw.style(
                      'w-full h-full flex-col items-center justify-center gap-3 rounded-[14px] px-2 py-5 pt-7 pb-3 ',
                      {
                        backgroundColor: colors.BACKGROUND_CARD,
                      },
                    )}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={tw.style('absolute top-3 right-3')}
                      onPress={() => {
                        setVisible(false);
                        closeNotificationToast();
                      }}>
                      <IconCP name="close-outline" size={23} color="#9bafb8" />
                    </TouchableOpacity>
                    <FastImageCP
                      uriLocal={image}
                      uriError={image}
                      resizeMode="contain"
                      style={tw.style('w-[70px] h-[70px] min-h-[50px]')}
                    />
                    <Text
                      style={tw.style(
                        'font-bold text-[15px] text-center leading-5',
                        {
                          color: color,
                        },
                      )}>
                      {title}
                    </Text>
                    {MessageCustom ? (
                      <MessageCustom />
                    ) : (
                      <Text
                        style={tw.style(`text-[14px] leading-6 text-center`, {
                          color: colors.BLACK_COLOR,
                        })}>
                        {message}
                      </Text>
                    )}
                    <View style={tw`flex-row gap-2 justify-center w-full`}>
                      {fList(buttons || [])?.map((item, index) => {
                        const {onPress, styleBtn, styleText, textBtn} = {
                          ...item,
                        };
                        return (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            key={index}
                            onPress={() => {
                              onPress && onPress();
                            }}
                            style={tw.style(
                              `bg-blue-500 rounded-lg py-[6px] px-1 min-w-[80px] items-center justify-center`,
                              {
                                ...styleBtn,
                              },
                            )}>
                            <Text
                              style={tw.style(
                                `text-white text-[13px] font-bold`,
                                {
                                  ...styleText,
                                },
                              )}>
                              {textBtn || 'OK'}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Text
                      style={tw.style('font-bold italic text-[12px] mb-1', {
                        color: colors.BLACK_COLOR,
                      })}>
                      Thông báo sẽ tự đóng sau:{' '}
                      <Text
                        style={{
                          color: color,
                        }}>
                        {timeLoading < 10 ? '0' + timeLoading : timeLoading}s
                      </Text>
                    </Text>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}
