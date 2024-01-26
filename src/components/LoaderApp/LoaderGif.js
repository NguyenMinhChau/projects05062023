import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import useAppContext from '../../utils/hooks/useAppContext';

export default function LoaderGifCP() {
  const {dispatch, state} = useAppContext();
  const {appearance_display} = state.set_data;
  const {colors} = useGetColorThemeDisplay();
  const sourceImage =
    appearance_display?.value === 'dark' ||
    appearance_display?.value === 'dark-no-system'
      ? require('../../assets/images/ICDP_APP_DARK.gif')
      : require('../../assets/images/ICDP_APP.gif');
  return (
    <>
      <View
        style={tw.style('flex-1 items-center justify-center', {
          backgroundColor: colors.WHITE_COLOR,
        })}>
        <FastImage
          style={tw.style('w-full h-full self-center')}
          source={sourceImage}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
