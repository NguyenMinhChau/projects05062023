import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import tw from '../../styles/twrnc.global';
import {Platform} from 'react-native';

export default function KeyboardAwareWrap({styleContainer, style, children}) {
  const {colors} = useGetColorThemeDisplay();
  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tw.style('flex-grow', {...styleContainer})}
      extraScrollHeight={Platform.OS === 'ios' ? -35 : -600}
      style={tw.style({
        backgroundColor: colors.WHITE_COLOR,
        ...style,
      })}>
      {children}
    </KeyboardAwareScrollView>
  );
}
