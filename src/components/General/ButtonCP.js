import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from '../../styles/twrnc.global';
import {IconCP} from '../../utils/icon.utils';

export default function ButtonCP({
  colorBorder = '#7635DC',
  colorBG = '#7635DC',
  bgTransparent = false,
  colorText = '#fff',
  text = 'Xác nhận',
  onPress,
  titleIcon,
  sizeIcon = 22,
  iconName,
  typeIcon,
  colorIcon = '#7635DC',
  disabled = false,
  styleContainer = {},
  styleText = {},
  variant = 'contained',
  positionIcon = 'left',
  noneBorder = false,
  imageLocal,
  styleImageLocal,
}) {
  const bgBtn = bgTransparent
    ? 'bg-transparent'
    : variant === 'contained'
    ? disabled
      ? `bg-gray-300 border-gray-300`
      : `bg-[${colorBG}] border-[${colorBorder}]`
    : disabled
    ? `bg-transparent border-gray-300`
    : `bg-transparent border-[${colorBorder}]`;
  const clText =
    variant === 'contained'
      ? disabled
        ? `text-gray-400`
        : `text-[${colorText}]`
      : disabled
      ? `text-gray-400`
      : `text-[${colorBorder}]`;
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      style={tw.style(
        `${
          noneBorder ? 'border-0' : 'border'
        } rounded-md p-2 justify-center items-center `,
        bgBtn,
        {...styleContainer},
      )}>
      {iconName ? (
        <View style={tw.style('flex-row gap-1 items-center')}>
          {positionIcon === 'left' && (
            <IconCP
              name={iconName}
              size={sizeIcon}
              color={disabled ? '#fafafa' : colorIcon}
              typeIcon={typeIcon}
            />
          )}
          {titleIcon && (
            <Text
              style={tw.style(
                `font-medium text-[14px] mb-[2px] text-[${
                  disabled ? '#fafafa' : colorIcon
                }]`,
                {
                  ...styleText,
                },
              )}>
              {titleIcon}
            </Text>
          )}
          {positionIcon === 'right' && (
            <IconCP
              name={iconName}
              size={sizeIcon}
              color={disabled ? '#fafafa' : colorIcon}
              typeIcon={typeIcon}
            />
          )}
        </View>
      ) : imageLocal ? (
        <View style={tw.style('flex-row gap-1 items-center')}>
          <Image
            source={imageLocal}
            style={tw.style('w-5 h-5', {...styleImageLocal})}
          />
        </View>
      ) : (
        <Text
          style={tw.style(`font-bold text-[12px]`, clText, {
            ...styleText,
          })}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
