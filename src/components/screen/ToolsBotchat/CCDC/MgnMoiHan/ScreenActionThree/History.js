import React from 'react';
import {useMgnMoiHanActionThree} from './hooks';
import {useColorThemeCCDC} from '../../config';
import LoadingScreen from '../../../../../General/LoadingScreen';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import tw from '../../../../../../styles/twrnc.global';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
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
import {useLayoutAnimation} from '../../../../../../utils/LayoutAnimation';
import MonthSelect from '../../../../../General/MonthSelect';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import ActionSheetCP from '../../../../../General/ActionSheetCP';
import { TYPE_ICON } from '../../../../../../utils/icon.utils';

export default function HistoryActionThreeScreen({navigation, route}) {
  const {dispatch} = useAppContext();
  const {data} = {...route.params};
  const {
    isLoading,
    isFilter,
    search,
    DATA_SEARCH,
    date_picker,
    month_filter,

    RenderItemHistory,
    CallApiGetList,
    dateFilterConfirm,
    handleReset,
    handleChangeValue,
  } = useMgnMoiHanActionThree(data, data?._id);
  const {colors} = useColorThemeCCDC();
  const [targetDate, setTargetDate] = React.useState('from_date_filter');

  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();

  const {refreshing, onRefresh} = useRefreshList(CallApiGetList);
  const {nameDevice} = {...data};
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Danh sách báo cáo lịch sử hàn nối cho xử lý sự cố ${nameDevice}`}
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
            <ButtonCP
              colorBorder={colors.PRIMARY_COLOR}
              colorBG={colors.PRIMARY_COLOR}
              colorIcon={'#fff'}
              iconName={isFilter ? 'filter-variant-remove' : 'filter-variant'}
              typeIcon={TYPE_ICON.iconMaterial}
              onPress={() => {
                handleChangeValue('isFilter', true);
              }}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
            <ButtonCP
              colorBorder="#2f994e"
              colorBG="#2f994e"
              colorIcon={'#fff'}
              iconName="add-outline"
              onPress={() => {
                navigation.navigate({
                  name: SCREEN_NAVIGATE.Mgn_Moi_Han_Action_Three_Screen,
                  params: {
                    data: data,
                    _idMayHan: data?._id,
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
          </View>

          <View
            style={tw.style('flex-1')}
            onTouchEnd={() => handleChangeValue('isFilter', false)}>
            {DATA_SEARCH.length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={DATA_SEARCH}
                  contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    gap: 8,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItemHistory}
                  nestedScrollEnabled
                />
                {/* <PaginationCP totalPages={1} /> */}
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
        <ActionSheetCP
          title="Bộ lọc"
          isVisible={isFilter}
          onClose={() => handleChangeValue('isFilter', false)}
          onOpen={() => handleChangeValue('isFilter', true)}
          ButtonActions={() => {
            return (
              <View
                style={tw.style(
                  `w-full flex-row gap-2 justify-end p-2 mt-2 ${
                    Platform.OS === 'ios' ? 'mb-5' : 'mb-0'
                  }`,
                )}>
                <ButtonCP
                  iconName="trash-bin-outline"
                  titleIcon="Xóa filter"
                  colorIcon="#ffffff"
                  sizeIcon={17}
                  colorBG="#ff0000"
                  colorBorder="#ff0000"
                  variant="contained"
                  onPress={handleReset}
                  styleContainer={tw.style('p-1 flex-1')}
                />
                <ButtonCP
                  iconName="navigate-outline"
                  sizeIcon={17}
                  colorIcon="#ffffff"
                  titleIcon="Xác nhận"
                  colorBorder={PRIMARY_COLOR}
                  colorBG={PRIMARY_COLOR}
                  onPress={() => {
                    CallApiGetList();
                    handleChangeValue('isFilter', false);
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            );
          }}>
          <View
            style={tw.style({
              minHeight:
                Platform.OS === 'ios'
                  ? date_picker && targetDate === 'month_filter'
                    ? 300
                    : 0
                  : 0,
              marginBottom:
                Platform.OS === 'ios'
                  ? date_picker && targetDate === 'month_filter'
                    ? 8
                    : 0
                  : 0,
            })}>
            <MonthSelect
              label="Tháng"
              visible={date_picker && targetDate === 'month_filter'}
              value={month_filter}
              name="month_filter"
              onChange={val => dateFilterConfirm('month_filter', val)}
              onPressDate={() => {
                setTargetDate('month_filter');
                handleChangeValue('date_picker', true);
              }}
              styleInput={tw.style(`justify-center h-[45px] mt-1`)}
            />
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
