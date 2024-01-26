import React from 'react';
import {View, Image} from 'react-native';
import tw from '../../styles/twrnc.global';

export default function Footer({style, styleLogo}) {
  return (
    <>
      <View
        style={tw.style(`items-center w-full justify-center mt-auto `, {
          ...style,
        })}>
        <Image
          source={require('../../assets/images/foot_image.png')}
          style={tw.style(`w-[130px] h-[100px]`, {
            ...styleLogo,
          })}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
