import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Actionsheet, KeyboardAvoidingView} from 'native-base';
import ButtonCP from './ButtonCP';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import LoadingScreen from './LoadingScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';

export default function ActionSheetCP({
  isLoading = false,
  isVisible = false,
  onClose,
  onOpen,
  children,
  HeaderCustomSticky,
  ButtonActions,
  title,
  styleTitle,
  styleActionSheet,
  styleActionSheetContent,
  styleActionSheetContentChild,
}) {
  const [isShowKeyboard, setIsShowKeyboard] = React.useState(false);
  const [isKeyboardHeight, setIsKeyboardHeight] = React.useState(0);
  const {colors} = useGetColorThemeDisplay();
  const heightDevice = Dimensions.get('window').height;

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setIsShowKeyboard(true);
        setIsKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsShowKeyboard(false);
        setIsKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Actionsheet
      zIndex={1000}
      style={tw.style('', {
        backgroundColor: 'rgba(0,0,0,0.3)',
        ...styleActionSheet,
      })}
      isOpen={isVisible}
      onClose={onClose}>
      <Actionsheet.Content
        zIndex={1000}
        style={tw.style('w-full', {
          backgroundColor: colors.WHITE_COLOR,
          paddingBottom: isShowKeyboard
            ? isKeyboardHeight
            : Platform.OS === 'ios'
            ? 20
            : 0,
          ...styleActionSheetContent,
        })}>
        {isLoading && <LoadingScreen hideLogo />}
        {title && (
          <Text
            style={tw.style('text-center text-[20px] font-bold my-1', {
              color: colors.BLACK_COLOR,
              ...styleTitle,
            })}>
            {title}
          </Text>
        )}
        {HeaderCustomSticky && (
          <View style={tw.style('w-full')}>
            <HeaderCustomSticky />
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          style={tw.style('w-full', {
            ...styleActionSheetContentChild,
          })}
          contentContainerStyle={tw.style('flex-grow', {
            backgroundColor: colors.WHITE_COLOR,
            ...styleActionSheetContentChild,
          })}>
          {children}
        </ScrollView>
        {ButtonActions && (
          <View style={tw.style('w-full')}>
            <ButtonActions />
          </View>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
}
