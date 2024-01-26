import React from 'react';
import {View, ScrollView} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {IconCP} from '../../../../utils/icon.utils';
import {DATA_TOOLS_CONFIG} from './config';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import useAppContext from '../../../../utils/hooks/useAppContext';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';

export default function ConfigToolsScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {colors} = useGetColorThemeDisplay();

  const {refreshing, onRefresh} = useRefreshList();

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title="Tools cấu hình" />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('p-3 flex-grow')}>
            <View
              style={tw.style('rounded-lg p-2 shadow-md', {
                backgroundColor: colors.BACKGROUND_CARD,
              })}>
              {DATA_TOOLS_CONFIG.map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    leftNameIcon={item?.iconName}
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
    </>
  );
}
