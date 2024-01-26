import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useColorScheme} from 'react-native';
import tw from '../../../styles/twrnc.global';
import RadioGroupCP from '../../General/RadioGroupCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  getAsyncCacheSettingAppearance,
  setAsyncCacheSettingAppearance,
} from '../../../utils/cache.services';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import {useColorThemeSetting} from './config';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import {useCssApp} from '../../../utils/css.utils';

export default function AppearanceScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {appearance_display} = state.set_data;
  const {colors} = useColorThemeSetting();
  const displaySystem = useColorScheme();
  const {shadowCss} = useCssApp();

  const handleChange = async value => {
    await setAsyncCacheSettingAppearance(value);
    await getAsyncCacheSettingAppearance(dispatch);
  };
  const DATA_RADIO_APPEARANCE = [
    {label: 'Hệ thống', value: displaySystem || 'light'},
    {label: 'Tối', value: 'dark-no-system'},
    {label: 'Sáng', value: 'light-no-system'},
  ];
  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Giao diện hiển thị"
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('p-3 flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style(`flex-col rounded-xl p-2 gap-2`, {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              <View style={tw`flex-col gap-2`}>
                <RadioGroupCP
                  dataOptions={DATA_RADIO_APPEARANCE}
                  valueSelect={appearance_display}
                  setValSelect={val => handleChange(val)}
                  style={tw.style(
                    `border-r-transparent items-center justify-start px-0 py-2`,
                    {
                      borderWidth: 0,
                    },
                  )}
                  styleLabel={tw.style(`font-medium ml-2`, {
                    color: colors.BLACK_COLOR,
                  })}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}
