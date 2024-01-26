import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {IconCP} from '../../../../utils/icon.utils';
import {BLACK_COLOR} from '../../../../styles/colors.global';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import 'moment/locale/vi';
import {
  DATA_GET_INFO_CUSTOMER_CONFIG,
  DATA_GET_INFO_DEVICE_CONFIG,
  DATA_GET_INFO_PORT_CONFIG,
} from './config';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import {useColorThemeToolsBotChat} from '../config';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import {useCssApp} from '../../../../utils/css.utils';

export default function GetInfoScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {colors} = useColorThemeToolsBotChat();
  const {shadowCss} = useCssApp();

  const {refreshing, onRefresh} = useRefreshList();

  return (
    <SafeAreaWrap
      backgroundColorTop={colors.MAIN_COLOR}
      backgroundColorBottom={colors.WHITE_COLOR}>
      <BannerNestedScreen
        navigation={navigation}
        title="Tools kiểm tra hạ tầng"
      />
      <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw.style(' p-3 flex-grow', {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <View
            style={tw.style('rounded-xl p-2', {
              backgroundColor: colors.BACKGROUND_CARD,
              ...shadowCss(),
            })}>
            <Text style={tw.style('text-[20px] font-bold text-blue-500')}>
              DEVICE
            </Text>
            {DATA_GET_INFO_DEVICE_CONFIG.map((item, index) => {
              return (
                <RowDialogCP
                  key={index}
                  label={item?.label}
                  leftNameIcon={item?.iconName}
                  typeIcon={item?.typeIcon || ''}
                  styleLabel={tw`font-medium`}
                  ValueCP={() => {
                    return (
                      <IconCP
                        size={15}
                        color={colors.BLACK_COLOR}
                        name="chevron-forward-outline"
                      />
                    );
                  }}
                  styleRow={tw`py-5 ${
                    item?.noneBorderBottom && 'border-b-[0px]'
                  }`}
                  onClickAccord={() => navigation.navigate(item?.router)}
                  noBullet
                  disabled={item?.disabled}
                />
              );
            })}
          </View>
          <View
            style={tw.style('rounded-xl p-2 my-3', {
              backgroundColor: colors.BACKGROUND_CARD,
              ...shadowCss(),
            })}>
            <Text style={tw.style('text-[20px] font-bold text-blue-500')}>
              PORT
            </Text>
            {DATA_GET_INFO_PORT_CONFIG.map((item, index) => {
              return (
                <RowDialogCP
                  key={index}
                  label={item?.label}
                  leftNameIcon={item?.iconName}
                  typeIcon={item?.typeIcon || ''}
                  styleLabel={tw`font-medium`}
                  ValueCP={() => {
                    return (
                      <IconCP
                        size={15}
                        color={colors.BLACK_COLOR}
                        name="chevron-forward-outline"
                      />
                    );
                  }}
                  styleRow={tw`py-5 ${
                    item?.noneBorderBottom && 'border-b-[0px]'
                  }`}
                  onClickAccord={() => navigation.navigate(item?.router)}
                  noBullet
                  disabled={item?.disabled}
                />
              );
            })}
          </View>
          <View
            style={tw.style('rounded-xl p-2', {
              backgroundColor: colors.BACKGROUND_CARD,
              ...shadowCss(),
            })}>
            <Text style={tw.style('text-[20px] font-bold text-blue-500')}>
              CUSTOMER
            </Text>
            {DATA_GET_INFO_CUSTOMER_CONFIG.map((item, index) => {
              return (
                <RowDialogCP
                  key={index}
                  label={item?.label}
                  leftNameIcon={item?.iconName}
                  typeIcon={item?.typeIcon || ''}
                  styleLabel={tw`font-medium`}
                  ValueCP={() => {
                    return (
                      <IconCP
                        size={15}
                        color={colors.BLACK_COLOR}
                        name="chevron-forward-outline"
                      />
                    );
                  }}
                  styleRow={tw`py-5 ${
                    item?.noneBorderBottom && 'border-b-[0px]'
                  }`}
                  onClickAccord={() => navigation.navigate(item?.router)}
                  noBullet
                  disabled={item?.disabled}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrap>
  );
}
