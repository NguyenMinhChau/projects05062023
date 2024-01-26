import {
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import tw from '../../styles/twrnc.global';

export const SafeAreaWrap = ({
  backgroundColorTop = 'transparent',
  backgroundColorMiddle = 'transparent',
  backgroundColorBottom = 'transparent',
  style,
  children,
  scrollView = false,
  noSafeAreaBottom = false,
  keyboardVerticalOffset,
}) => {
  return (
    <>
      <SafeAreaView
        style={tw.style('flex-0', {
          backgroundColor: backgroundColorTop,
        })}
      />
      <SafeAreaView
        style={tw.style('flex-1 relative', {
          backgroundColor: backgroundColorMiddle,
        })}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {Platform.OS === 'ios' ?
                <KeyboardAvoidingView style={tw.style('flex-1')} behavior='padding' keyboardVerticalOffset={60}>
                  {children}
                </KeyboardAvoidingView>
            : 
            <>
            {children}
            </>}
          </TouchableWithoutFeedback>
      </SafeAreaView>
      {!noSafeAreaBottom && (
        <SafeAreaView
        style={tw.style('flex-0', {
          backgroundColor: backgroundColorBottom,
        })}
        />
        )}
    </>
  );
};
