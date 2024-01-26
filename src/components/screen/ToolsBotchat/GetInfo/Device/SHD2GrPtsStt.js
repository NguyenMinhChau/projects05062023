import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import tw from '../../../../../styles/twrnc.global';
import {MAIN_COLOR, WHITE_COLOR} from '../../../../../styles/colors.global';
import {IconCP} from '../../../../../utils/icon.utils';

export default function ConfigSHD2GrPtsSttScreen({navigation}) {
  return (
    <>
      <View style={tw`flex-1 flex-col bg-white`}>
        <View
          style={tw`flex-row items-center justify-between z-20 p-2 bg-[${MAIN_COLOR}]`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <IconCP name="arrow-back-outline" size={25} color={WHITE_COLOR} />
          </TouchableOpacity>
          <View style={tw`w-[60px] h-[40px]`}>
            <Image
              source={require('../../../../../assets/images/ICDP_mobile_logo_2.png')}
              style={tw`w-full h-full`}
              resizeMode="contain"
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw.style(
            'p-3 flex-grow bg-white',
          )}></ScrollView>
      </View>
    </>
  );
}
