import React from 'react';
import {useColorThemeCCDC} from '../../config';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import tw from '../../../../../../styles/twrnc.global';
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
} from '../../../../../../styles/colors.global';
import {TextInput} from 'react-native-paper';
import {useMgnMoiHanActionThree} from './hooks';
import TextInputCP from '../../../../../General/TextInputCP';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ButtonCP from '../../../../../General/ButtonCP';
import ScreenNoData from '../../../../../General/ScreenNoData';
import {useRefreshList} from '../../../../../../utils/refreshList.utils';
import PaginationCP from '../../../../../General/PaginationCP';
import {useLayoutAnimation} from '../../../../../../utils/LayoutAnimation';
import DateSelect from '../../../../../General/DateSelect';
import LoadingScreen from '../../../../../General/LoadingScreen';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import moment from 'moment';
import TimeSelect from '../../../../../General/TimeSelect';
import ActionSheetCP from '../../../../../General/ActionSheetCP';
import { TYPE_ICON } from '../../../../../../utils/icon.utils';

export default function ListSCScreen({navigation}) {
  const {
    isLoading,
    isFilter,
    search,
    from_date,
    from_time,
    to_date,
    to_time,
    branch_sc,
    formattedDateTimeFrom,
    formattedDateTimeTo,
    location_sc,
    date_picker,
    DATA_SC,
    LENGTH_SC,
    sc_selected_fake,
    targetDateTime,

    dateConfirm,
    handleChangeValue,
    RenderItemSC,
    checkAllSC,
    handleSelectAllSC,
    CallApiGetListSC,
    handleReset,
  } = useMgnMoiHanActionThree([]);
  const {colors} = useColorThemeCCDC();
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();
  const {refreshing, onRefresh} = useRefreshList(CallApiGetListSC);
  const {openNotificationToast} = useNotificationToast();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Danh sách SC"
          styleText={tw.style('text-[15px]')}
          handleBack={() => {
            handleChangeValue('sc_selected_fake', []);
          }}
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
                  borderColor: colors.BORDER_INPUT_COLOR,
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
              colorBorder="#43a047"
              colorBG="#43a047"
              colorIcon="#fff"
              sizeIcon={18}
              styleText={tw.style('text-[13px]')}
              titleIcon="Xác nhận SC"
              iconName="checkmark-done-circle-outline"
              onPress={() => {
                handleChangeValue('selected_sc', sc_selected_fake);
                handleChangeValue('search', '');
                navigation.goBack();
              }}
              styleContainer={tw.style('px-2 py-[4px]')}
            />
            <ButtonCP
              colorBorder={colors.PRIMARY_COLOR}
              colorBG={colors.PRIMARY_COLOR}
              colorIcon={'#fff'}
              iconName={isFilter ? 'filter-variant-remove' : 'filter-variant'}
              typeIcon={TYPE_ICON.iconMaterial}
              sizeIcon={20}
              onPress={() => {
                handleChangeValue('isFilter', true);
              }}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
          </View>
          <View style={tw.style('gap-1 flex-row p-2 pt-0 justify-end')}>
            {DATA_SC?.length > 0 && (
              <ButtonCP
                titleIcon={checkAllSC() ? 'Bỏ chọn tất cả SC' : `Chọn hết SC`}
                colorBorder={colors.PRIMARY_COLOR}
                colorBG={colors.PRIMARY_COLOR}
                colorIcon={'#fff'}
                sizeIcon={18}
                iconName={checkAllSC() ? 'checkbox-outline' : 'square-outline'}
                onPress={() => handleSelectAllSC()}
                styleContainer={tw.style('p-[6px]')}
                positionIcon="right"
              />
            )}
          </View>
          <View
            style={tw.style('flex-1 px-2')}
            onTouchEnd={() => handleChangeValue('isFilter', false)}>
            {DATA_SC?.length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={
                    DATA_SC?.sort(
                      (a, b) =>
                        new Date(b?.CreatedDate) - new Date(a?.CreatedDate),
                    ) || []
                  }
                  contentContainerStyle={{
                    paddingVertical: 8,
                    gap: 8,
                  }}
                  keyExtractor={(item, index) => item?.TicketCode.toString()}
                  renderItem={RenderItemSC}
                  nestedScrollEnabled
                />
                <PaginationCP totalPages={LENGTH_SC} />
              </>
            ) : (
              <View style={tw.style('flex-col items-center justify-center')}>
                {branch_sc?.length === 0 && location_sc?.length === 0 && (
                  <Text
                    style={tw.style('text-[15px] italic text-center mx-2', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Vui lòng chọn bộ lọc để xem kết quả
                  </Text>
                )}
                <ScreenNoData
                  styleContainer={tw.style('w-[250px] h-[250px]')}
                />
              </View>
            )}
          </View>
        </View>
        <ActionSheetCP
          title="Chọn thời gian tạo ticket"
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
                    const dayDifference = moment(formattedDateTimeTo).diff(
                      moment(formattedDateTimeFrom),
                      'days',
                    );
                    if (moment(formattedDateTimeTo).isAfter(moment())) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message:
                          'Ngày giờ bộ lọc không được lớn hơn ngày giờ hiện tại',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      handleChangeValue('isFilter', false);
                    } else if (dayDifference > 6) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message:
                          'Ngày bộ lọc phải nằm trong khoảng thời gian nhỏ hơn hoặc bằng 5 ngày',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      handleChangeValue('isFilter', false);
                    } else {
                      CallApiGetListSC();
                      handleChangeValue('isFilter', false);
                    }
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            );
          }}>
          <View style={tw.style('flex-row gap-1 items-start')}>
            <View style={tw.style('flex-col gap-1 flex-1')}>
              <Text
                style={tw.style('text-[15px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Từ ngày <Text style={tw.style('text-red-500')}>*</Text>
              </Text>
              <DateSelect
                visible={date_picker && targetDateTime === 'from_date'}
                value={from_date}
                name="from_date"
                onChange={val => dateConfirm('from_date', val)}
                onPressDate={() => {
                  handleChangeValue('targetDateTime', 'from_date');
                  handleChangeValue('date_picker', true);
                }}
                styleInput={tw.style(`justify-center h-[45px] mt-1`)}
              />
            </View>
            <View style={tw.style('flex-col gap-1 flex-1')}>
              <Text
                style={tw.style('text-[15px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Giờ <Text style={tw.style('text-red-500')}>*</Text>
              </Text>
              <TimeSelect
                visible={date_picker && targetDateTime === 'from_time'}
                value={from_time}
                name="from_time"
                onChange={val => dateConfirm('from_time', val)}
                onPressTime={() => {
                  handleChangeValue('targetDateTime', 'from_time');
                  handleChangeValue('date_picker', true);
                }}
                styleInput={tw.style(`justify-center h-[45px] mt-1`)}
              />
            </View>
          </View>
          <View style={tw.style('flex-row gap-1 items-start mb-1')}>
            <View style={tw.style('flex-col gap-1 flex-1')}>
              <Text
                style={tw.style('text-[15px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Đến ngày <Text style={tw.style('text-red-500')}>*</Text>
              </Text>
              <DateSelect
                visible={date_picker && targetDateTime === 'to_date'}
                value={to_date}
                name="to_date"
                onChange={val => dateConfirm('to_date', val)}
                onPressDate={() => {
                  handleChangeValue('targetDateTime', 'to_date');
                  handleChangeValue('date_picker', true);
                }}
                styleInput={tw.style(`justify-center h-[45px] mt-1`)}
              />
            </View>
            <View style={tw.style('flex-col gap-1 flex-1')}>
              <Text
                style={tw.style('text-[15px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Giờ <Text style={tw.style('text-red-500')}>*</Text>
              </Text>
              <TimeSelect
                visible={date_picker && targetDateTime === 'to_time'}
                value={to_time}
                name="to_time"
                onChange={val => dateConfirm('to_time', val)}
                onPressTime={() => {
                  handleChangeValue('targetDateTime', 'to_time');
                  handleChangeValue('date_picker', true);
                }}
                styleInput={tw.style(`justify-center h-[45px] mt-1`)}
              />
            </View>
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
