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
import {IconCP} from '../../utils/icon.utils';
import ButtonCP from './ButtonCP';
import {useDialogConfirmToast} from '../../utils/dialog_confirm_toast.utils';
import useAppContext from '../../utils/hooks/useAppContext';
import KeyboardAwareWrap from './KeyboardAwareWrap';

export default function DialogConfirmToast({
  title = 'Thông báo',
  message = 'Thông báo mới',
  isVisible = false,
  MessageCustom = null,
  funcHandle = () => {},
  imageLink = null,
  imageLocal = null,
}) {
  const {closeDialogConfirmToast} = useDialogConfirmToast();
  const {colors} = useGetColorThemeDisplay();
  const [visible, setVisible] = React.useState(false);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const {state} = useAppContext();
  const {propsData} = state.set_data.dialog_confirm_toast;

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={tw.style(
              'absolute z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center p-2',
              {
                backgroundColor: colors.BGC_LOADING,
              },
            )}>
            <KeyboardAwareWrap
              styleContainer={tw.style('items-center justify-center')}
              style={tw.style('w-full h-full bg-transparent')}>
              <Animated.View
                style={tw.style(
                  'w-[300px] rounded-2xl shadow-lg absolute overflow-hidden bg-transparent',
                  {
                    transform: [{scale: scaleValue}],
                  },
                )}>
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
                        closeDialogConfirmToast();
                      }}>
                      <IconCP name="close-outline" size={23} color="#9bafb8" />
                    </TouchableOpacity>
                    <FastImageCP
                      uri={imageLink ? imageLink : null}
                      uriLocal={
                        imageLocal
                          ? imageLocal
                          : require('../../assets/images/question-image.png')
                      }
                      uriError={require('../../assets/images/question-image.png')}
                      resizeMode="contain"
                      style={tw.style('w-[70px] h-[70px] min-h-[50px]')}
                    />
                    <Text
                      style={tw.style(
                        'font-bold text-[15px] text-center leading-5',
                        {
                          color: colors.BLACK_COLOR,
                        },
                      )}>
                      {title}
                    </Text>
                    {MessageCustom ? (
                      <MessageCustom {...propsData} />
                    ) : (
                      <Text
                        style={tw.style(`text-[14px] leading-6 text-center`, {
                          color: colors.BLACK_COLOR,
                        })}>
                        {message}
                      </Text>
                    )}
                    <View style={tw`flex-row gap-2 justify-center w-full`}>
                      <ButtonCP
                        iconName="close-outline"
                        colorIcon="#ffff"
                        sizeIcon={16}
                        styleText={tw.style('text-[12px]')}
                        titleIcon="Hủy bỏ"
                        colorBorder="#dc2626"
                        colorBG="#dc2626"
                        onPress={() => {
                          closeDialogConfirmToast();
                        }}
                        styleContainer={tw.style('p-1')}
                      />
                      <ButtonCP
                        iconName="checkmark-done-circle-outline"
                        colorIcon="#ffff"
                        sizeIcon={16}
                        styleText={tw.style('text-[12px]')}
                        titleIcon="Xác nhận"
                        colorBorder="#2f994e"
                        colorBG="#2f994e"
                        onPress={async () => {
                          const res = await funcHandle(propsData);
                          if (Object?.keys(propsData || {}).length > 0) {
                            if (res) {
                              closeDialogConfirmToast();
                            }
                          } else {
                            closeDialogConfirmToast();
                          }
                        }}
                        styleContainer={tw.style('p-1')}
                      />
                    </View>
                  </View>
                </View>
              </Animated.View>
            </KeyboardAwareWrap>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}
