import React from 'react';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import {ScrollView, View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {DATA_CCDC_CONFIG, DATA_SWAP_IP_CONFIG} from './config';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {IconCP} from '../../../../utils/icon.utils';
import {useCssApp} from '../../../../utils/css.utils';

export default function SwapIPScreen({navigation}) {
  const {colors} = useGetColorThemeDisplay();
  const {shadowCss} = useCssApp();
  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title="Swap IPv6" />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('p-3 flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style('rounded-lg p-2', {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              {DATA_SWAP_IP_CONFIG.map((item, index) => {
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
                    onClickAccord={() =>
                      navigation.navigate({
                        name: item?.router,
                        params: {
                          value: item?.value || 'phan_hoi_khg',
                        },
                      })
                    }
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
