import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import tw from '../../../../../styles/twrnc.global';
import {fList} from '../../../../../utils/array.utils';
import {
  BGC_CRITICAL_COLOR,
  BGC_SUCCESS_COLOR,
  CRITICAL_COLOR,
  SUCCESS_COLOR,
} from '../../../../../styles/colors.global';
import {MESSAGE_STATUS_VIE_CONFIG} from '../config';
import {EMPTY_CHAR} from '../../../../../helpers/_empty';
import FastImage from 'react-native-fast-image';

export default function ResultItem({
  item,
  index,
  dataContent = [],
  handleCardPress,
}) {
  const [loadImage, setLoadImage] = React.useState(false);
  const screenWidth = Dimensions.get('window').width;
  const widthEventUsed = screenWidth / 2 - 8 * 2;
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={tw.style('flex-col rounded-lg overflow-hidden', {
          backgroundColor:
            item?.class === 'ok' ? BGC_SUCCESS_COLOR : BGC_CRITICAL_COLOR,
          borderWidth: 2,
          borderColor: item?.class === 'ok' ? SUCCESS_COLOR : CRITICAL_COLOR,
          borderStyle: 'solid',
          width: widthEventUsed,
          marginLeft: index % 2 === 0 ? 0 : 8,
        })}
        onPress={() => handleCardPress(item?._id, item?.original)}>
        <View style={tw.style('w-full h-[150px] items-center justify-center')}>
          <FastImage
            source={{uri: item?.original}}
            style={tw.style('w-full h-full')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={tw.style('p-2 pt-1 flex-col gap-1 items-start')}>
          {fList(dataContent).map((content, index) => {
            const valVieByMessage = MESSAGE_STATUS_VIE_CONFIG.find(
              i => i.label === item[content?.key]?.toString()?.toLowerCase(),
            );
            return (
              <Text
                key={index}
                style={tw.style('text-black text-[14px] leading-5')}>
                {content?.label}:{' '}
                {valVieByMessage
                  ? valVieByMessage?.description
                  : item[content?.key]?.toString() || EMPTY_CHAR}
              </Text>
            );
          })}
        </View>
      </TouchableOpacity>
    </>
  );
}
