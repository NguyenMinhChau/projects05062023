import React from 'react';
import {View} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {useColorThemeExperiment} from './config';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import MapViewCP from './MapView';
import { SafeAreaWrap } from '../../General/SafeAreaWrap';
export default function ExperimentScreen({navigation}) {
  const {colors} = useColorThemeExperiment();

  return (
    <>
    <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
          <BannerNestedScreen navigation={navigation} title="Experiment" />
          <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
            <MapViewCP />
          </View>
        </SafeAreaWrap>
    </>
  );
}
