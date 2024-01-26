import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import tw from '../../styles/twrnc.global';
import {useColorThemeGeneral} from './config';

export default function RadioGroupCP({
  dataOptions,
  valueSelect,
  setValSelect,
  style,
  styleLabel,
  activeBy,
  noLabel = false,
}) {
  const {colors} = useColorThemeGeneral();
  return (
    <>
      {dataOptions.map((item, _idx) => {
        const isCheckedList = dataOptions.filter(item => {
          return item?.value === valueSelect?.value;
        });
        const isActiveBy = item?.active
          ? activeBy === item?.active
            ? true
            : false
          : false;
        return (
          <TouchableOpacity
            key={_idx}
            onPress={() => {
              if (isCheckedList[0]?.value === item?.value) {
                setValSelect(null);
              } else {
                setValSelect(item);
              }
            }}
            activeOpacity={0.9}>
            <View
              style={tw.style(
                `px-3 py-1 border rounded-lg flex-row justify-center items-center`,
                {
                  borderColor: isActiveBy
                    ? colors.ACTIVE_COLOR
                    : isCheckedList[0]?.value !== item?.value
                    ? item?.color || colors.BLACK_COLOR
                    : item?.color || colors.STEPPER_STEP_COLOR,
                  ...style,
                },
              )}>
              {isCheckedList[0]?.value === item?.value && (
                <View
                  style={tw.style(
                    `w-[15px] h-[15px] rounded-full justify-center items-center`,
                    {
                      backgroundColor: item?.color || colors.STEPPER_STEP_COLOR,
                      marginRight: noLabel ? 0 : 4,
                    },
                  )}>
                  <Image
                    source={require('../../assets/images/tick_ok.png')}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              )}
              {isCheckedList[0]?.value !== item?.value && (
                <View
                  style={tw.style(
                    `w-[15px] h-[15px] rounded-full mr-1 border`,
                    {
                      borderColor: item?.color || colors.BLACK_COLOR,
                      marginRight: noLabel ? 0 : 4,
                    },
                  )}
                />
              )}

              {!noLabel && (
                <Text
                  style={tw.style({
                    color:
                      isCheckedList[0]?.value !== item?.value
                        ? colors.BLACK_COLOR
                        : item?.color || colors.STEPPER_STEP_COLOR,
                    fontSize: 14.5,
                    alignSelf: 'center',
                    ...styleLabel,
                  })}>
                  {item?.label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
}
