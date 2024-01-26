import React from 'react';
import {useMgnMoiHanActionOne} from './hooks';
import {useColorThemeCCDC} from '../../config';
import LoadingScreen from '../../../../../General/LoadingScreen';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import tw from '../../../../../../styles/twrnc.global';
import {FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';
import ButtonCP from '../../../../../General/ButtonCP';
import TextInputCP from '../../../../../General/TextInputCP';
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
} from '../../../../../../styles/colors.global';
import {TextInput} from 'react-native-paper';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import ScreenNoData from '../../../../../General/ScreenNoData';
import {useRefreshList} from '../../../../../../utils/refreshList.utils';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import useAppContext from '../../../../../../utils/hooks/useAppContext';

export default function HistoryActionOneScreen({navigation, route}) {
  const {dispatch} = useAppContext();
  const {data} = {...route?.params};
  const {
    isLoading,
    search,
    DATA_IMAGES,

    RenderItemHistory,
    handleChangeValue,
    CallApiGetById,
    checkMonthCurrentInList,
  } = useMgnMoiHanActionOne(data, data?._id);
  const {colors} = useColorThemeCCDC();

  const {refreshing, onRefresh} = useRefreshList(CallApiGetById);

  const {nameDevice} = {...data};

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Danh sách quản lí mối hàn định kì ${nameDevice}`}
          styleText={tw.style('text-[12px]')}
        />
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
                contentStyle={tw.style('mr-[40px] ml-[45px]')}
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
            {!checkMonthCurrentInList(DATA_IMAGES) && (
              <ButtonCP
                colorBorder="#2f994e"
                colorBG="#2f994e"
                colorIcon={'#fff'}
                iconName="add-outline"
                onPress={() => {
                  navigation.navigate({
                    name: SCREEN_NAVIGATE.Mgn_Moi_Han_Action_One_Screen,
                    params: {
                      data: data,
                    },
                  });
                  dispatch(
                    SET_DATA_PAYLOAD({
                      key: 'mgn_moi_han',
                      value: {
                        isCreate: true,
                        isEdit: false,
                      },
                    }),
                  );
                }}
                styleContainer={tw.style('px-2 py-[5px]')}
              />
            )}
          </View>

          <View style={tw.style('flex-1')}>
            {DATA_IMAGES?.length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={DATA_IMAGES}
                  contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    gap: 8,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItemHistory}
                  nestedScrollEnabled
                />
              </>
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={tw.style('flex-1')}>
                <ScreenNoData />
              </ScrollView>
            )}
          </View>
        </View>
      </SafeAreaWrap>
    </>
  );
}
