import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {fList} from '../../../../utils/array.utils';
import {parsePortName} from '../../../../utils/parse.namePort';
import {useColorThemeToolsDetail} from '../config';
import ScreenDevelopment from '../../../General/ScreenDevelopment';
import ActionSheetCP from '../../../General/ActionSheetCP';

export default function TTCHConfigNewOLT({dataByObjId, props = {}}) {
  const [isShow, setIsShow] = React.useState(false);
  const {colors} = useColorThemeToolsDetail();
  const {deviceInfo} = {...dataByObjId};

  const {initialConfigInfo} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {result} = {...initialConfigInfo?.[0]};

  const {portRemote = [], portLocal = []} = {...(result?.[0] || result)};
  return (
    <>
      <View
        style={tw.style(`p-3 my-5 rounded-lg min-h-[100px]`, {
          backgroundColor: colors.BACKGROUND_CARD,
        })}>
        <Text
          style={tw.style(`text-center font-bold text-[18px] mb-2`, {
            color: colors.BLACK_COLOR,
          })}>
          Cách kết nối
        </Text>
        <View style={tw`flex-row w-full px-1 justify-between items-center`}>
          <View style={tw`flex-col items-center justify-center`}>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              ETH
            </Text>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              (HW)
            </Text>
          </View>
          <View style={tw`flex-1`}>
            <View style={tw`border-[0.5px] border-gray-300`}></View>
          </View>
          <View style={tw`flex-col items-center justify-center`}>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              Dây
            </Text>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              LAN
            </Text>
          </View>
          <View style={tw`flex-1`}>
            <View style={tw`border-[0.5px] border-gray-300`}></View>
          </View>
          <View style={tw`flex-col items-center justify-center`}>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              AUX
            </Text>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              (OLT)
            </Text>
          </View>
        </View>
        <View style={tw`flex-col gap-3 mt-3`}>
          {fList(portRemote).map((item, _idx) => {
            return (
              <View key={_idx} style={tw`flex-row items-center gap-x-2`}>
                <Text
                  style={tw.style(`text-[13px] font-bold`, {
                    color: colors.BLACK_COLOR,
                  })}>
                  {parsePortName(item)}
                </Text>
                <View style={tw`flex-1`}>
                  <View style={tw`border-[0.5px] border-gray-300`}></View>
                </View>
                <Text
                  style={tw.style(`text-[13px] font-bold`, {
                    color: colors.BLACK_COLOR,
                  })}>
                  {parsePortName(portLocal[_idx])}
                </Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={
            portRemote.length <= 0
              ? () => {}
              : () => {
                  setIsShow(true);
                }
          }
          activeOpacity={0.9}
          style={tw`mt-3 items-center justify-center`}>
          <Text
            style={tw.style(`underline font-medium text-[14px]`, {
              color: colors.PRIMARY_COLOR,
            })}>
            {portRemote.length <= 0 ? 'Không có kết nối nào' : 'Xem chi tiết'}
          </Text>
        </TouchableOpacity>
      </View>
      <ActionSheetCP
        title="Cách kết nối"
        isVisible={isShow}
        onClose={() => setIsShow(false)}
        onOpen={() => setIsShow(true)}>
        <View>
          <View style={tw`min-h-[300px] mt-3`}>
            <ScreenDevelopment styleContainer={tw.style('px-0')} />
          </View>
        </View>
      </ActionSheetCP>
    </>
  );
}
