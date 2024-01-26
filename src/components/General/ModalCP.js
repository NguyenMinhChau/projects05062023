import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Platform,
  PanResponder,
  Animated,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import tw from '../../styles/twrnc.global';
import {useColorThemeGeneral} from './config';
import {SafeAreaWrap} from './SafeAreaWrap';
import KeyboardAwareWrap from './KeyboardAwareWrap';
import LoadingScreen from './LoadingScreen';

export default function ModalCP({
  open,
  close,
  title,
  TitleCustom,
  children,
  ButtonActions,
  HeaderCustomSticky,
  styleTitle,
  backgroundColorModal,
  isLoading = false,
}) {
  const {colors} = useColorThemeGeneral();
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Update the position of the modal based on the gesture
        Animated.event([null, {dy: translateY.current}])(_, gestureState);
      },
      onPanResponderRelease: (_, gestureState) => {
        // If the modal is dragged down by a certain distance, close it
        if (gestureState.dy > 50) {
          onClose();
        } else {
          // Animate the modal back to its original position
          Animated.spring(translateY.current, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const translateY = React.useRef(new Animated.Value(0));

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={close}>
      <TouchableWithoutFeedback
        onPress={() => {
          // Keyboard.dismiss();
          close();
        }}>
        <View
          style={tw.style(`flex-1 justify-end`, {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          })}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              // {...panResponder?.panHandlers}
              style={tw.style(
                `p-[10px] pt-0 rounded-tl-[20px] rounded-tr-[20px] max-h-[90%] overflow-hidden shadow-2xl`,
                {
                  backgroundColor: backgroundColorModal
                    ? backgroundColorModal
                    : colors.BACKGROUND_CARD,
                  transform: [{translateY: translateY.current}],
                },
              )}>
              {isLoading && <LoadingScreen />}
              <View style={tw`items-center`}>
                <View
                  style={tw.style('w-full items-center justify-center pt-2')}
                  onTouchStart={close}>
                  <View
                    style={tw`bg-gray-300 w-[50px] h-[5px] rounded-full mb-2`}></View>
                </View>
                {title && (
                  <Text
                    style={tw.style(`font-bold text-[20px] mb-2`, {
                      color: colors.BLACK_COLOR,
                      ...styleTitle,
                    })}>
                    {title}
                  </Text>
                )}
                {TitleCustom && <TitleCustom />}
              </View>
              {HeaderCustomSticky && <HeaderCustomSticky />}
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                {Platform.OS === 'ios' ? (
                  <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
                ) : (
                  <>{children}</>
                )}
              </ScrollView>
              {ButtonActions && <ButtonActions />}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
