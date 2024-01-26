import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import tw from '../../styles/twrnc.global';
import FastImageCP from './FastImageCP';

export default function ScreenNoData({
  refreshing,
  onRefresh,
  uriLocal = require('../../assets/images/no_data.png'),
  styleContainer,
  styleFastImage,
}) {
  return (
    <>
      <ScrollView
        refreshControl={
          refreshing &&
          onRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
        nestedScrollEnabled
        contentContainerStyle={tw.style(
          'flex-1 items-center justify-center p-2',
          {
            ...styleContainer,
          },
        )}>
        <FastImageCP
          uriLocal={uriLocal}
          style={tw.style('w-full h-full', {...styleFastImage})}
          resizeMode="contain"
        />
      </ScrollView>
    </>
  );
}
