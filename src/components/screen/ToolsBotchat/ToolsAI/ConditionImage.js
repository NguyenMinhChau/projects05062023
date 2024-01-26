import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {IconCP, TYPE_ICON} from '../../../../utils/icon.utils';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import {SUCCESS_COLOR} from '../../../../styles/colors.global';

export default function ConditionImage() {
  const {colors} = useGetColorThemeDisplay();
  return (
    <>
      <View style={tw`flex-row items-center gap-1 mt-2`}>
        <IconCP name="filter-variant" typeIcon={TYPE_ICON.iconMaterial} size={20} color={colors.PRIMARY_COLOR} />
        <Text style={tw`text-[${colors.PRIMARY_COLOR}] text-[15px] font-bold`}>
          Điều kiện hình ảnh
        </Text>
      </View>
      <View style={tw`flex-col items-start mx-3`}>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh không quá mờ.
          </Text>
        </View>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh không bị chói sáng hoặc quá tối.
          </Text>
        </View>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh chụp màn hình máy đo đủ khoảng cách, không quá xa hoặc quá gần.
          </Text>
        </View>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh chụp có góc nghiêng không quá 30 độ.
          </Text>
        </View>
      </View>
    </>
  );
}
