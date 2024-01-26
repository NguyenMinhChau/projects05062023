import React from 'react';
import {useMaintanceCCDC} from './hooks';
import LoadingScreen from '../../../../General/LoadingScreen';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import {useColorThemeCCDC} from '../config';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import tw from '../../../../../styles/twrnc.global';
import ButtonCP from '../../../../General/ButtonCP';
import {TextInput} from 'react-native-paper';
import TextInputCP from '../../../../General/TextInputCP';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../../styles/colors.global';
import PaginationCP from '../../../../General/PaginationCP';
import ScreenDevelopment from '../../../../General/ScreenDevelopment';
import {View} from 'react-native';
import { TYPE_ICON } from '../../../../../utils/icon.utils';
export default function MaintanceScreen({navigation}) {
  const {isLoading, search, handleChangeValue} = useMaintanceCCDC();
  const {colors} = useColorThemeCCDC();

  return (
    <>
      {!isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title="Bảo trì bảo dưỡng" />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View style={tw.style('gap-1 flex-row p-2')}>
            <View style={tw.style('flex-1')}>
              <TextInputCP
                placeholder="Bạn muốn tìm gì?"
                placeholderTextColor={'#677483'}
                textColor={BLACK_COLOR}
                cursorColor={PRIMARY_COLOR}
                name="search"
                value={search}
                onChange={val => handleChangeValue('search', val)}
                style={tw.style(`bg-white justify-center h-[35px] mb-0`)}
                contentStyle={tw.style('pr-[40px] w-full')}
                outlinedStyle={tw.style('rounded-lg border', {
                  borderColor: colors.PRIMARY_COLOR,
                })}
                rightContent={
                  <TextInput.Icon
                    icon="close-circle-outline"
                    size={23}
                    color={colors.PRIMARY_COLOR}
                    style={tw.style('mr-[-8px]')}
                    onTouchStart={() => handleChangeValue('search', '')}
                  />
                }
                leftContent={
                  <TextInput.Icon
                    icon="magnify"
                    size={23}
                    color={colors.PRIMARY_COLOR}
                  />
                }
              />
            </View>
            <ButtonCP
              colorBG={colors.PRIMARY_COLOR}
              colorBorder={colors.PRIMARY_COLOR}
              colorIcon={'#fff'}
              iconName={'filter-variant'}
              typeIcon={TYPE_ICON.iconMaterial}
              onPress={() => {}}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
          </View>
          <View style={tw.style('flex-1')}>
            <ScreenDevelopment />
          </View>
          {/* <PaginationCP totalPages={1} /> */}
        </View>
      </SafeAreaWrap>
    </>
  );
}
