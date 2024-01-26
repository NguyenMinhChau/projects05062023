import React from 'react';
import {useSwapIPResponseKhg} from './hooks';
import LoadingScreen from '../../../../General/LoadingScreen';
import {useColorThemeSwapIP} from '../config';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import tw from '../../../../../styles/twrnc.global';
import {
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useLayoutAnimation} from '../../../../../utils/LayoutAnimation';
import {IconCP, TYPE_ICON} from '../../../../../utils/icon.utils';
import CustomSelectCP from '../../../../General/CustomSelectCP';
import TextInputCP from '../../../../General/TextInputCP';
import DateSelect from '../../../../General/DateSelect';
import PaginationCP from '../../../../General/PaginationCP';
import DialogCP from '../../../../General/Dialog/DialogCP';
import ButtonCP from '../../../../General/ButtonCP';
import {TextInput} from 'react-native-paper';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../../styles/colors.global';
import ScreenNoData from '../../../../General/ScreenNoData';
import {fList} from '../../../../../utils/array.utils';
import {useRefreshList} from '../../../../../utils/refreshList.utils';
import BarChartGifted from '../../../../General/Chart/BarChart';
import ActionSheetCP from '../../../../General/ActionSheetCP';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function ResponseKHGScreen({navigation}) {
  const {colors} = useColorThemeSwapIP();
  const [activeDropDown, setActiveDropdown] = React.useState(null);
  const [visibleChart, setVisibleChart] = React.useState(false);
  const [targetDateTime, setTargetDateTime] = React.useState('date_time');
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();
  const {
    isLoading,
    isFilter,
    fromDate,
    toDate,
    actions,
    keyword,
    modem,
    plugin_status,
    date_time_picker,
    list_swap_ip,
    visible_modal,
    visible_modal_plugin,
    program_id,
    DATA_MODEM,
    DATA_ACTIONS,
    DATA_PLUGIN_STATUS,
    DATA_PROGRAM_ID,
    DATA_BAR_CHART_SPREAD,
    DATA_TITLE_CHART,

    handleBack,
    CallAPI,
    CallApiGetDataChart,
    RenderItem,
    RenderDetail,
    handleChange,
    handleDateConfirm,
    handleDatePress,
    RenderStatusPlugin,
  } = useSwapIPResponseKhg();

  const recallAPI = () => {
    CallAPI();
    CallApiGetDataChart();
  }

  const {payload, total_page} = {...list_swap_ip};
  const {refreshing, onRefresh} = useRefreshList(recallAPI);
  const chartHeight = useSharedValue(0);

  const heightDevice = Dimensions.get('window').height;

  const ChartStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(chartHeight.value, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(chartHeight.value === 0 ? 0 : 1, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  React.useEffect(() => {
    chartHeight.value = visibleChart ? 300 : 0;
  }, [visibleChart]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Swap IPv6 - ${program_id}`}
          styleText={tw.style('text-[15px]')}
          handleBack={handleBack}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style('w-full flex-row justify-between p-2', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <Text
              style={tw.style('text-[20px] font-bold', {
                color: colors.ACTIVE_COLOR,
              })}>
              Danh sách phản hồi KHG Swap Wifi 6
            </Text>
          </View>

          <View style={tw.style('flex-row pb-2 px-2 gap-1')}>
            <View style={tw.style('flex-1')}>
              <TextInputCP
                placeholder="Tìm nhanh số hợp đồng?"
                placeholderTextColor={'#677483'}
                textColor={BLACK_COLOR}
                cursorColor={PRIMARY_COLOR}
                name="keyword"
                value={keyword}
                onChange={val => handleChange('keyword', val)}
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
                    onTouchStart={() => handleChange('keyword', '')}
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
                handleChange('isFilter', true);
                if (isFilter) {
                  handleChange('actions', []);
                  handleChange('modem', []);
                  handleChange('keyword', '');
                }
              }}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
            <ButtonCP
              noneBorder
              colorBG={'#00BFFF'}
              colorIcon={'#fff'}
              iconName={visibleChart ? 'close-outline' : 'bar-chart-outline'}
              onPress={() => setVisibleChart(!visibleChart)}
              styleContainer={tw.style('py-[5px] px-[8px]')}
            />
          </View>
          {visibleChart && (
            <Animated.View style={[ChartStyle]}>
              <BarChartGifted
                titleChart="Biểu đồ thống kê"
                dataBarChart={DATA_BAR_CHART_SPREAD}
                dataTitle={DATA_TITLE_CHART}
              />
            </Animated.View>
          )}
          <View
            style={tw.style('flex-1', {
              backgroundColor: colors.WHITE_COLOR,
            })}
            onTouchEnd={() => handleChange('isFilter', false)}>
            {fList(payload).length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={payload}
                  contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    gap: 8,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItem}
                  nestedScrollEnabled
                />
                <PaginationCP totalPages={total_page} />
              </>
            ) : (
              <ScreenNoData />
            )}
          </View>
        </View>
        <DialogCP
          visible={visible_modal}
          setVisible={val => handleChange('visible_modal', val)}>
          <View
            style={tw.style(
              'w-full items-center justify-between flex-row p-2',
            )}>
            <Text
              style={tw.style('text-[17px] font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Thông tin hợp đồng
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw.style(``, {
                backgroundColor: colors.BACKGROUND_CARD,
              })}
              onPress={() => {
                handleChange('visible_modal', false);
                handleChange('selected_item', null);
              }}>
              <IconCP
                name="close-outline"
                color={tw.color('gray-400')}
                size={30}
                style={tw`justify-end mr-2`}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={tw`h-auto pb-3`}
            showsVerticalScrollIndicator={false}>
            <RenderDetail />
          </ScrollView>
        </DialogCP>

        <ActionSheetCP
          title="Chi tiết trạng thái Plugin"
          isVisible={visible_modal_plugin}
          onClose={() => handleChange('visible_modal_plugin', false)}
          onOpen={() => handleChange('visible_modal_plugin', true)}>
          <View style={tw`mt-3 min-h-[150px] justify-start items-center`}>
            <RenderStatusPlugin />
          </View>
        </ActionSheetCP>

        <ActionSheetCP
          title="Bộ lọc"
          isVisible={isFilter}
          onClose={() => handleChange('isFilter', false)}
          onOpen={() => handleChange('isFilter', true)}
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
                  onPress={() => {
                    handleChange('actions', []);
                    handleChange('modem', []);
                    handleChange('plugin_status', []);
                    handleChange('keyword', '');
                    handleChange(
                      'program_id',
                      DATA_PROGRAM_ID?.[0].value || null,
                    );
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
                <ButtonCP
                  iconName="navigate-outline"
                  sizeIcon={17}
                  colorIcon="#ffffff"
                  titleIcon="Xác nhận"
                  colorBG={colors.PRIMARY_COLOR}
                  colorBorder={colors.PRIMARY_COLOR}
                  onPress={() => {
                    CallAPI();
                    CallApiGetDataChart();
                    handleChange('isFilter', false);
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            );
          }}>
          <CustomSelectCP
            dataList={DATA_PROGRAM_ID}
            label="Tên chương trình"
            placeholder="Chọn tên chương trình"
            selectList={program_id}
            onSelectValue={val => {
              handleChange('program_id', val);
            }}
            isQuantityInitData
            quantityDataInit={20}
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            styleInput={tw.style('p-1')}
            idActive="program_id"
            isActiveDropDown={activeDropDown === 'program_id'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <DateSelect
            visible={date_time_picker && targetDateTime === 'date_time'}
            onPressDate={() => {
              handleDatePress();
              setTargetDateTime('date_time');
            }}
            value={fromDate}
            name="fromDate"
            onChange={handleDateConfirm}
            label="Từ ngày"
            styleInput={tw.style('min-h-[40px] h-[40px] mt-1')}
          />
          <DateSelect
            visible={date_time_picker && targetDateTime === 'date_end'}
            onPressDate={() => {
              handleDatePress();
              setTargetDateTime('date_end');
            }}
            value={toDate}
            name="toDate"
            onChange={handleDateConfirm}
            label="Đến ngày"
            styleInput={tw.style('min-h-[40px] h-[40px] mt-1')}
          />
          <CustomSelectCP
            dataList={DATA_MODEM}
            label="Modem"
            placeholder="Chọn modem"
            selectList={modem}
            onSelectValue={val => handleChange('modem', val)}
            isQuantityInitData
            quantityDataInit={20}
            multiple
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            idActive="modem"
            isActiveDropDown={activeDropDown === 'modem'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={DATA_ACTIONS}
            label="Actions"
            placeholder="Chọn actions"
            selectList={actions}
            onSelectValue={val => handleChange('actions', val)}
            isQuantityInitData
            quantityDataInit={20}
            multiple
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            idActive="actions"
            isActiveDropDown={activeDropDown === 'actions'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={DATA_PLUGIN_STATUS}
            label="Plugin Status"
            placeholder="Chọn plugin status"
            selectList={plugin_status}
            onSelectValue={val => handleChange('plugin_status', val)}
            isQuantityInitData
            quantityDataInit={20}
            multiple
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            idActive="plugin_status"
            isActiveDropDown={activeDropDown === 'plugin_status'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
