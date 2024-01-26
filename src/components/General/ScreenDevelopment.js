import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../styles/twrnc.global';
import FastImageCP from './FastImageCP';
import {IconCP} from '../../utils/icon.utils';

export default function ScreenDevelopment({
  title = 'ICDP thông báo',
  iconName = 'megaphone-outline',
  message = 'Giao diện đang được phát triển, vui lòng quay lại sau!',
  MessageCustom,
  uriLocal = require('../../assets/images/in_progress.png'),
  styleContainer,
  styleToastContainer,
  styleTitle,
  styleMessage,
  styleFastImage,
}) {
  return (
    <>
      <View
        style={tw.style('flex-1 items-center justify-center p-2', {
          ...styleContainer,
        })}>
        {MessageCustom ? (
          <MessageCustom />
        ) : (
          <View
            style={tw.style(
              'w-full rounded-lg p-2 items-start flex-col bg-blue-50',
              {...styleToastContainer},
            )}>
            <View style={tw.style('flex-row items-center gap-1')}>
              <IconCP name={iconName} size={18} color={tw.color('blue-500')} />
              <Text
                style={tw.style(`text-blue-500 text-center font-bold`, {
                  ...styleTitle,
                })}>
                {title}
              </Text>
            </View>
            <View style={tw.style('items-center justify-center w-full')}>
              <Text
                style={tw.style(`text-blue-500 text-center leading-6`, {
                  ...styleMessage,
                })}>
                {message}
              </Text>
            </View>
          </View>
        )}
        <FastImageCP
          uriLocal={uriLocal}
          style={tw.style('w-full h-[200px] flex-1', {...styleFastImage})}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
