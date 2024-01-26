import React from 'react';
import {View, ImageBackground} from 'react-native';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';

export default function LoaderBgcCP() {
  const {colors} = useGetColorThemeDisplay();
  const uri = [
    require('../../assets/images/background_loader_vector.png'),
    require('../../assets/images/background_loader_vector_02.png'),
  ];
  const urlImage = uri[Math.floor(Math.random() * uri.length)];
  return (
    <>
      <View
        style={tw.style('flex-1 items-center justify-center', {
          backgroundColor: colors.WHITE_COLOR,
        })}>
        <ImageBackground
          source={urlImage}
          resizeMode="stretch"
          style={tw.style('w-full h-full')}
        />
      </View>
    </>
  );
}
