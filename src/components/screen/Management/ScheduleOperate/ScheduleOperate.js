import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useColorThemeManagement} from '../config';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import CalendarCP from '../../../General/Calendar';
import {
  TAB_OPTIONS,
  useColorThemeScheduleOperator,
  useHandleColorScheduleOperator,
} from './config';
import tw from '../../../../styles/twrnc.global';
import {useScheduleOperator} from './hooks';
import LoadingScreen from '../../../General/LoadingScreen';
import {fList} from '../../../../utils/array.utils';
import ButtonCP from '../../../General/ButtonCP';
import {WHITE_COLOR} from '../../../../styles/colors.global';
import moment from 'moment';
import useAppContext from '../../../../utils/hooks/useAppContext';
import TextInputCP from '../../../General/TextInputCP';
import CustomSelectCP from '../../../General/CustomSelectCP';
import RadioGroupCP from '../../../General/RadioGroupCP';
import CalendarKit from '../../Experiment/CalendarKit';
import {useLayoutAnimation} from '../../../../utils/LayoutAnimation';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import ActionSheetCP from '../../../General/ActionSheetCP';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { TYPE_ICON } from '../../../../utils/icon.utils';

export default function ScheduleOperateScreen({navigation, route}) {
  const {colors} = useColorThemeManagement();
  const {colors: colorsSchedule} = useColorThemeScheduleOperator();
  const [tabActive, setTabActive] = React.useState('view_1');
  const {LayoutAnimationConfig, ANIMATION_TYPE, ANIMATION_PROPERTY} =
    useLayoutAnimation();
    const calendarHeight = useSharedValue(0);

  const heightDevice = Dimensions.get('window').height;

  const CalendarStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(calendarHeight.value, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(calendarHeight.value === 0 ? 0 : 1, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  React.useEffect(() => {
    calendarHeight.value = visibleCalendar ? 370 : 0;
  }, [visibleCalendar]);

  const {
    isLoading,
    isFilter,
    formattedDate,
    refreshing,
    modal_schedule,
    scheduleFilter,
    DATA_NHAN_SU,
    DATA_STATUS,
    data_filter_form,
    markedDates,
    eventsCalendarKit,
    visibleCalendar,

    onRefresh,
    handleCreateSchedule,
    RenderScheduleItem,
    RenderEventContentCalendarKit,
    RenderChildrenFilter,
    handleToggleModal,
    handleChangeForm,
    handleSubmitCreateSchedule,
    handleSubmitUpdateSchedule,
  } = useScheduleOperator(tabActive);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Lịch trực vận hành"
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style('w-full flex-row', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            {TAB_OPTIONS.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={tw.style(
                  `flex-1 items-center justify-center py-2 border-b-[1px] border-[${colors.PRIMARY_COLOR}]`,
                  {
                    borderBottomWidth: tabActive === tab?.value ? 1 : 0,
                  },
                )}
                onPress={() => setTabActive(tab?.value)}>
                <Text
                  style={tw.style(`font-bold text-[14px] capitalize`, {
                    color:
                      tabActive === tab?.value
                        ? colors.PRIMARY_COLOR
                        : colors.BLACK_COLOR,
                  })}>
                  {tab?.label}
                </Text>
              </TouchableOpacity>
            ))}
            
          </View>

          <View style={tw.style('flex-row items-center justify-between w-full p-2 px-4')}>
        <Text
          style={tw.style(`text-[16px] font-medium capitalize`, {
            color: colors.BLACK_COLOR,
          })}>
          {tabActive==='view_1' ? formattedDate || moment(new Date()).format('dddd, DD/MM/YYYY') : ''}
        </Text>
        <View style={tw.style('flex-row gap-1')}>
        {tabActive === 'view_1' && <ButtonCP
            noneBorder
            colorBG={'#00BFFF'}
            colorIcon={'#fff'}
            iconName={visibleCalendar ? 'close-outline' : 'calendar-outline'}
            onPress={() => {
              handleChangeForm('visibleCalendar',!visibleCalendar);
              LayoutAnimationConfig(300,ANIMATION_TYPE.LINEAR,ANIMATION_PROPERTY.OPACITY)
            }}
            styleContainer={tw.style('py-[5px] px-[8px]')}
          />}
          <ButtonCP
              colorBorder={colors.PRIMARY_COLOR}
              colorBG={colors.PRIMARY_COLOR}
              colorIcon={'#fff'}
              iconName={isFilter ? 'filter-variant-remove' : 'filter-variant'}
              typeIcon={TYPE_ICON.iconMaterial}
              onPress={() => {
                handleChangeForm('isFilter', true);
              }}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
        {tabActive === 'view_1' && <ButtonCP
          iconName="add-outline"
          sizeIcon={16}
          titleIcon="Thêm mới"
          colorIcon={WHITE_COLOR}
          colorBG={colors.PRIMARY_COLOR}
          colorBorder={colors.PRIMARY_COLOR}
          styleText={tw.style('text-[13px]')}
          styleContainer={tw.style('py-1 px-2 rounded-md')}
          onPress={handleCreateSchedule}
        />}
        
        </View>
      </View>

          <View
            style={tw.style('flex-1', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            {tabActive === 'view_1' ? (
              <>
              {visibleCalendar && 
                <CalendarCP
                  markedDates={markedDates}
                  colorsDarkMode={colorsSchedule}
                  useHandleColorDots={useHandleColorScheduleOperator}
                  isReloadCalendar={false}
                />}

                <ListScheduleOperator
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  list_schedule_operator={scheduleFilter}
                  RenderScheduleItem={RenderScheduleItem}
                />
              </>
            ) : (
              <>
                <CalendarKit
                  data={eventsCalendarKit}
                  RenderEventContent={RenderEventContentCalendarKit}
                  initialTimeIntervalHeight={25}
                />
              </>
            )}

            <AddNewScheduleOperator
              modal_schedule={modal_schedule}
              handleToggleModal={handleToggleModal}
              formattedDate={formattedDate}
              handleChangeForm={handleChangeForm}
              DATA_NHAN_SU={DATA_NHAN_SU}
              DATA_STATUS={DATA_STATUS}
              data_filter_form={data_filter_form}
              handleSubmitCreateSchedule={handleSubmitCreateSchedule}
              handleSubmitUpdateSchedule={handleSubmitUpdateSchedule}
            />
          </View>
        </View>
        <ActionSheetCP
          title="Bộ lọc"
          isVisible={isFilter}
          onClose={() => handleChangeForm('isFilter', false)}
          onOpen={() => handleChangeForm('isFilter', true)}>
          <RenderChildrenFilter />
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}

const ListScheduleOperator = ({
  refreshing,
  onRefresh,
  list_schedule_operator,
  RenderScheduleItem,
}) => {
  const {colors} = useColorThemeScheduleOperator();
  const {state} = useAppContext();
  const {radio_schedule} = state.set_data.schedule_operator;

  return (
    <View style={tw`flex-1 px-[10px]`}>
      
      {fList(list_schedule_operator).length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={tw`flex-grow gap-2 p-1 flex-col`}
          data={fList(list_schedule_operator)?.sort((a, b) => {
            moment(b)?.unix() - moment(a)?.unix();
          })}
          renderItem={RenderScheduleItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : fList(list_schedule_operator).length === 0 ? (
        <View style={tw`flex-1 flex-col`}>
          <Image
            source={require('../../../../assets/images/tools_relax.png')}
            resizeMode="contain"
            style={tw.style('w-full h-[200px] rounded-lg my-2')}
          />
          <Text
            style={tw.style('text-gray-400 text-center text-[13px] leading-5')}>
            Hôm nay không có lịch trực nào. Hãy thêm mới ngay bây giờ!
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const AddNewScheduleOperator = ({
  modal_schedule,
  handleToggleModal,
  formattedDate,
  DATA_NHAN_SU,
  DATA_STATUS,
  data_filter_form,
  handleChangeForm,
  handleSubmitCreateSchedule,
  handleSubmitUpdateSchedule,
}) => {
  const {state, dispatch} = useAppContext();
  const {
    employee_list,
    employee_email,
    employee_full_name,
    employee_phone,
    employee,
    employee_code,
    employee_department,
    employee_province,
    employee_zone,
    note,
    status_employee,
    idUpdate,
  } = state.set_data.schedule_operator;
  const {colors} = useColorThemeManagement();

  const [activeDropDown, setActiveDropdown] = React.useState(null);

  const {fullName, phone, maNV, phong_ban, province, zone} = {
    ...fList(data_filter_form)?.[0],
  };

  const ButtonActions = () => {
    return (
      <View
        style={tw.style(
          `w-full flex-row gap-2 ${
            Platform.OS === 'ios' ? 'py-2 pb-5' : 'py-2'
          }`,
        )}>
        <ButtonCP
          iconName="close-outline"
          titleIcon="Hủy bỏ"
          colorIcon="#fff"
          colorBG="#ff0000"
          colorBorder="#ff0000"
          styleText={tw.style('text-[15px]')}
          styleContainer={tw.style('rounded-lg p-[6px] flex-1')}
          onPress={() => handleToggleModal('modal_schedule', false)}
        />
        <ButtonCP
          iconName={idUpdate ? 'save-outline' : 'add-outline'}
          titleIcon={`${idUpdate ? 'Cập nhật' : 'Thêm mới'}`}
          colorIcon="#fff"
          colorBG={colors.PRIMARY_COLOR}
          colorBorder={colors.PRIMARY_COLOR}
          styleText={tw.style('text-[15px]')}
          styleContainer={tw.style('rounded-lg p-[6px] flex-1')}
          onPress={
            idUpdate ? handleSubmitUpdateSchedule : handleSubmitCreateSchedule
          }
        />
      </View>
    );
  };

  return (
    <>
      <ActionSheetCP
        HeaderCustomSticky={() => {
          return (
            <>
              <Text
                style={tw.style('text-[20px] font-bold text-center mt-2', {
                  color: colors.BLACK_COLOR,
                })}>
                {idUpdate ? 'Cập nhật' : 'Thêm mới'} lịch trực
              </Text>
              <Text
                style={tw.style(
                  'font-medium text-[13px] capitalize text-center mb-2 italic',
                  {
                    color: colors.BLACK_COLOR,
                  },
                )}>
                {formattedDate}
              </Text>
            </>
          );
        }}
        isVisible={modal_schedule}
        onClose={() => handleToggleModal('modal_schedule', false)}
        onOpen={() => handleToggleModal('modal_schedule', true)}
        ButtonActions={ButtonActions}>
        <View style={tw.style('flex-1 min-h-[300px]')}>
          <CustomSelectCP
            label="Nhân sự trực"
            dataList={DATA_NHAN_SU}
            placeholder="Chọn email nhân sự"
            selectList={employee_email}
            onSelectValue={val => handleChangeForm('employee_email', val)}
            isQuantityInitData
            quantityDataInit={20}
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            styleInput={tw.style('p-1')}
            placeholderText={colors.DISABLED_COLOR}
            idActive="employee_email"
            isActiveDropDown={activeDropDown === 'employee_email'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <TextInputCP
            labelOutside="Họ và tên"
            value={employee_full_name || fullName}
            onChange={val => {
              handleChangeForm('employee_full_name', val);
            }}
            placeholder={'Nhập họ và tên'}
            placeholderTextColor={colors.DISABLED_COLOR}
            outlinedStyle={tw`border border-[#ccc]`}
            style={tw.style('h-[40px]')}
            contentStyle={tw.style('px-3 py-1')}
          />
          <TextInputCP
            labelOutside="Số điện thoại"
            value={employee_phone || phone}
            onChange={val => {
              handleChangeForm('employee_phone', val);
            }}
            placeholder={'Nhập số điện thoại'}
            placeholderTextColor={colors.DISABLED_COLOR}
            outlinedStyle={tw`border border-[#ccc]`}
            style={tw.style('h-[40px]')}
            contentStyle={tw.style('px-3 py-1')}
          />
          <TextInputCP
            labelOutside="Mã nhân viên"
            value={employee_code || maNV}
            onChange={val => {
              handleChangeForm('employee_code', val);
            }}
            placeholder={'Nhập mã nhân viên'}
            placeholderTextColor={colors.DISABLED_COLOR}
            outlinedStyle={tw`border border-[#ccc]`}
            style={tw.style('h-[40px]')}
            contentStyle={tw.style('px-3 py-1')}
          />
          <TextInputCP
            labelOutside="Vùng"
            value={employee_zone || zone}
            onChange={val => {
              handleChangeForm('employee_zone', val);
            }}
            placeholder={'Nhập vùng'}
            placeholderTextColor={colors.DISABLED_COLOR}
            outlinedStyle={tw`border border-[#ccc]`}
            style={tw.style('h-[40px]')}
            contentStyle={tw.style('px-3 py-1')}
          />
          <TextInputCP
            labelOutside="Tỉnh/Thành phố"
            value={employee_province || province}
            onChange={val => {
              handleChangeForm('employee_province', val);
            }}
            placeholder={'Nhập Tỉnh/Thành phố'}
            placeholderTextColor={colors.DISABLED_COLOR}
            outlinedStyle={tw`border border-[#ccc]`}
            style={tw.style('h-[40px]')}
            contentStyle={tw.style('px-3 py-1')}
          />
          <TextInputCP
            labelOutside="Phòng ban"
            value={employee_department || phong_ban}
            onChange={val => {
              handleChangeForm('employee_department', val);
            }}
            placeholder={'Nhập tên phòng ban'}
            placeholderTextColor={colors.DISABLED_COLOR}
            outlinedStyle={tw`border border-[#ccc]`}
            style={tw.style('h-[40px]')}
            contentStyle={tw.style('px-3 py-1')}
          />
          <TextInputCP
            labelOutside="Ghi chú"
            multiline={true}
            value={note}
            onChange={val => {
              handleChangeForm('note', val);
            }}
            style={tw`h-[100px]`}
            outlinedStyle={tw`border border-gray-400`}
            placeholder={'Nhập ghi chú'}
            contentStyle={tw.style('px-3 py-2')}
          />
          <View style={tw`flex-row gap-2 flex-wrap my-1`}>
            <RadioGroupCP
              dataOptions={DATA_STATUS}
              valueSelect={status_employee}
              setValSelect={val => handleChangeForm('status_employee', val)}
            />
          </View>
        </View>
      </ActionSheetCP>
    </>
  );
};
