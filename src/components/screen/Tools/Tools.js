import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';

import tw from '../../../styles/twrnc.global';
import DialogCP from '../../General/Dialog/DialogCP';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import AccordionCP from '../../General/AccordionCP';
import LoadingScreen from '../../General/LoadingScreen';
import {
  dd_mm_yy_hh_mm_ss_sub7,
  dd_mm_yyyy,
  yyyy_mm,
} from '../../../utils/TimerFormat';
import moment from 'moment';
import {
  MAP_GROUP,
  TASK_TYPE,
  TYPE_JOB,
  useHandleColor,
  useColorThemeTools,
} from './config';
import {ColorsStatusHandle} from '../../../utils/ColorsHandle';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import RebootPOP from './RebootPOP';
import {useToolsConfigHooks} from './hooks';
import ConfigNewCE from './ConfigNewCE';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import Banner from '../Banner/Banner';
import ReplaceSwitchCE from './ReplaceSwitchCE';
import {BLACK_COLOR, WHITE_COLOR} from '../../../styles/colors.global';
import {STEP_CODE_VIE_CONFIG} from '../ToolsConfigDetail/config';
import ConfigNewPOP from './ConfigNewPop';
import UpSwitchFTI from './UpSwitchFTI';
import ReplaceDevFacility from './ReplaceDevFacility';
import RelocationMetroPop from './RelocationMetroPop';
import RelocationPop from './RelocationPop';
import RelocationPopPlus from './RelocationPopPlus';
import {fList} from '../../../utils/array.utils';
import ConfigOLT from './ConfigOLT';
import {IconCP} from '../../../utils/icon.utils';
import ButtonCP from '../../General/ButtonCP';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import ScreenDevelopment from '../../General/ScreenDevelopment';
import ConfigNewPower from './ConfigNewPower';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ActionSheetCP from '../../General/ActionSheetCP';
import FastImageCP from '../../General/FastImageCP';
import {useLayoutAnimation} from '../../../utils/LayoutAnimation';

const Tools = ({navigation}) => {
  const [stopLoading, setStopLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setStopLoading(true);
    }, 5000);
  }, []);

  LocaleConfig.locales['vi'] = {
    monthNames: [
      'Tháng 01',
      'Tháng 02',
      'Tháng 03',
      'Tháng 04',
      'Tháng 05',
      'Tháng 06',
      'Tháng 07',
      'Tháng 08',
      'Tháng 09',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th.1',
      'Th.2',
      'Th.3',
      'Th.4',
      'Th.5',
      'Th.6',
      'Th.7',
      'Th.8',
      'Th.9',
      'Th.10',
      'Th.11',
      'Th.12',
    ],
    dayNames: [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm Nay',
  };

  LocaleConfig.defaultLocale = 'vi';

  const {
    isLoading,
    markedDates,
    day_list_job,
    formattedDate,
    eventFilter,
    refreshing,
    modal_new_plan_options,
    modal_add_new_plan,
    type_job,
    dataPopInfo,
    dataPopFilter,
    dataPopAutoComplete,
    modal_detail_plan,
    dataByObjId,
    appearance_display,
    visibleCalendar,

    setVisibleCalendar,
    handleTimePress,
    handleTimeConfirm,
    handleDatePress,
    handleDateConfirm,
    handleToggleModal,
    onRefresh,
    handleCreateEvent,
    RenderEvent,
    renderHeader,
    renderArrow,
    handleDayPress,
    handleChangeForm,
    handleClickEditPlan,
  } = useToolsConfigHooks();

  const {colors: colorsTools} = useColorThemeTools();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colorsTools.MAIN_COLOR}
        backgroundColorBottom={colorsTools.WHITE_COLOR}>
        <Banner navigation={navigation} />
        <View style={{flex: 1, backgroundColor: colorsTools.WHITE_COLOR}}>
          {/* {visibleCalendar && (
            <Animated.View style={[CalendarStyle]}>
              <CalendarView
                markedDates={markedDates}
                day_list_job={day_list_job}
                renderHeader={renderHeader}
                renderArrow={renderArrow}
                handleDayPress={handleDayPress}
                handleChangeForm={handleChangeForm}
                appearance_display={appearance_display}
              />
            </Animated.View>
          )} */}

          <ListEvent
            formattedDate={formattedDate}
            eventFilter={eventFilter}
            refreshing={refreshing}
            day_list_job={day_list_job}
            onRefresh={onRefresh}
            handleCreateEvent={handleCreateEvent}
            RenderEvent={RenderEvent}
            visibleCalendar={visibleCalendar}
            setVisibleCalendar={setVisibleCalendar}
            markedDates={markedDates}
            renderHeader={renderHeader}
            renderArrow={renderArrow}
            handleDayPress={handleDayPress}
            handleChangeForm={handleChangeForm}
            appearance_display={appearance_display}
          />

          <AddNewPlanOptions
            modal_new_plan_options={modal_new_plan_options}
            handleChangeForm={handleChangeForm}
            handleToggleModal={handleToggleModal}
          />

          <AddNewPlanInfo
            modal_add_new_plan={modal_add_new_plan}
            type_job={type_job}
            dataPopInfo={dataPopInfo}
            dataPopFilter={dataPopFilter}
            dataPopAutoComplete={dataPopAutoComplete}
            handleToggleModal={handleToggleModal}
            handleTimePress={handleTimePress}
            handleTimeConfirm={handleTimeConfirm}
            handleDatePress={handleDatePress}
            handleDateConfirm={handleDateConfirm}
          />

          <PlanDetail
            isLoading={isLoading}
            navigation={navigation}
            modal_detail_plan={modal_detail_plan}
            handleToggleModal={handleToggleModal}
            dataByObjId={dataByObjId}
            handleClickEditPlan={handleClickEditPlan}
          />
        </View>
      </SafeAreaWrap>
    </>
  );
};

export default Tools;

const CalendarView = ({
  markedDates,
  day_list_job,
  renderHeader,
  renderArrow,
  handleDayPress,
  handleChangeForm,
  appearance_display,
}) => {
  const {colors: colorsDisplay} = useGetColorThemeDisplay();

  const themeCalendar = {
    textSectionTitleColor: '#b6c1cd',
    // todayBackgroundColor: '#dfe6e9',
    // todayTextColor: BLACK_COLOR,
    todayBackgroundColor: colorsDisplay.PRIMARY_COLOR,
    todayTextColor: colorsDisplay.WHITE_COLOR,
    calendarBackground: 'transparent',
    selectedDayBackgroundColor: colorsDisplay.PRIMARY_COLOR,
    selectedDayTextColor: colorsDisplay.WHITE_COLOR,
    dayTextColor: colorsDisplay.DATE_TEXT_COLOR,
    textDisabledColor: colorsDisplay.DATE_TEXT_DISABLED_COLOR,
  };

  return (
    <Calendar
      key={appearance_display?.value || 'light'}
      theme={themeCalendar}
      renderHeader={renderHeader}
      renderArrow={renderArrow}
      onDayPress={handleDayPress}
      onMonthChange={date => {
        handleChangeForm('month_list_job', yyyy_mm(date.dateString));
      }}
      markingType={'multi-dot'}
      markedDates={{
        ...markedDates,
        [day_list_job]: {
          // ?! HIDDEN DOTS WHEN SELECTED DATE
          // ...markedDates[day_list_job],
          // ?!
          selected: true,
        },
      }}
    />
  );
};

const ListEvent = ({
  formattedDate,
  eventFilter,
  refreshing,
  day_list_job,
  onRefresh,
  handleCreateEvent,
  RenderEvent,
  visibleCalendar,
  setVisibleCalendar,
  markedDates,
  renderHeader,
  renderArrow,
  handleDayPress,
  handleChangeForm,
  appearance_display,
}) => {
  const {colors: colorsTools} = useColorThemeTools();

  const {colors} = useGetColorThemeDisplay();

  const calendarHeight = useSharedValue(0);
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();

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
  return (
    <View style={tw`flex-1 px-[10px]`}>
      <View
        style={tw.style('flex-row items-center justify-between w-full mt-1')}>
        <Text
          style={tw.style(`text-[16px] font-medium capitalize`, {
            color: colorsTools.BLACK_COLOR,
          })}>
          {formattedDate || moment(new Date()).format('dddd, DD/MM/YYYY')}
        </Text>
        <View style={tw.style('flex-row gap-1 pb-2')}>
          <ButtonCP
            noneBorder
            colorBG={'#00BFFF'}
            colorIcon={'#fff'}
            iconName={visibleCalendar ? 'close-outline' : 'calendar-outline'}
            onPress={() => {
              setVisibleCalendar(!visibleCalendar);
              LayoutAnimationConfig(
                300,
                ANIMATION_TYPE.LINEAR,
                ANIMATION_PROPERTY.OPACITY,
              );
            }}
            styleContainer={tw.style('py-[5px] px-[8px]')}
          />
          <ButtonCP
            iconName="add-outline"
            sizeIcon={16}
            titleIcon="Thêm KH"
            colorIcon={WHITE_COLOR}
            colorBG={colorsTools.PRIMARY_COLOR}
            colorBorder={colorsTools.PRIMARY_COLOR}
            styleText={tw.style('text-[13px]')}
            styleContainer={tw.style('py-1 px-2 rounded-md')}
            onPress={handleCreateEvent}
          />
        </View>
      </View>
      {visibleCalendar && (
        // <Animated.View style={[CalendarStyle]}>
        <CalendarView
          markedDates={markedDates}
          day_list_job={day_list_job}
          renderHeader={renderHeader}
          renderArrow={renderArrow}
          handleDayPress={handleDayPress}
          handleChangeForm={handleChangeForm}
          appearance_display={appearance_display}
        />
        // </Animated.View>
      )}
      {eventFilter.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={eventFilter?.sort((a, b) => {
            moment(b?.scheduleRunTime)?.unix() -
              moment(a?.scheduleRunTime)?.unix();
          })}
          contentContainerStyle={{
            paddingVertical: 8,
            gap: 8,
          }}
          renderItem={RenderEvent}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled
        />
      ) : eventFilter.length === 0 ? (
        <View style={tw`flex-1 flex-col`}>
          <Image
            source={require('../../../assets/images/tools_relax.png')}
            resizeMode="contain"
            style={tw.style('w-full h-[200px] rounded-lg my-2')}
          />
          <Text
            style={tw.style('text-gray-400 text-center text-[13px] leading-5')}>
            Hôm nay không có kế hoạch nào. Hãy thêm kế hoạch ngay bây giờ!
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const AddNewPlanOptions = ({
  modal_new_plan_options,
  handleChangeForm,
  handleToggleModal,
}) => {
  const {state, dispatch} = useAppContext();
  const [isBaotriOpen, setBaoTriOpen] = useState(false);
  const [isTKOpen, setTKOpen] = useState(false);
  const [isDDOpen, setDDOpen] = useState(false);
  const [isThayTheOpen, setThayTheOpen] = useState(false);

  const toggleBaoTriDropdown = () => {
    setBaoTriOpen(!isBaotriOpen);
  };

  const toggleTKDropdown = () => {
    setTKOpen(!isTKOpen);
  };

  const toggleDDDropdown = () => {
    setDDOpen(!isDDOpen);
  };

  const toggleThayTheDropdown = () => {
    setThayTheOpen(!isThayTheOpen);
  };

  const addPlanModal = eventName => {
    const eventVi = eventName
      ? TASK_TYPE.filter(x => x.value === eventName)?.[0]?.description ||
        eventName
      : 'Chưa định nghĩa tên KH';
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_data.tools_config,
          form_data: {
            ...state.set_data.tools_config.form_data,
            type_job_vi: eventVi,
            type_job: eventName,
          },
        },
      }),
    );
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_toggle.tools_config,
          modal_new_plan_options: false,
          modal_add_new_plan: true,
        },
      }),
    );
  };

  return (
    <ActionSheetCP
      title="Thêm mới kế hoạch"
      isVisible={modal_new_plan_options}
      onClose={() => handleToggleModal('modal_new_plan_options', false)}
      onOpen={() => handleToggleModal('modal_new_plan_options', true)}>
      <AccordionCP
        toggleDropDown={toggleBaoTriDropdown}
        open={isBaotriOpen}
        title="Bảo trì"
        dataList={[{value: TYPE_JOB.REBOOT_POP, label: 'Reboot POP'}]}
        onClickItem={addPlanModal}
        sourceImage={require('../../../assets/images/baotri_icon.png')}
      />
      <AccordionCP
        toggleDropDown={toggleTKDropdown}
        open={isTKOpen}
        title="Triển khai mới"
        dataList={[
          {value: TYPE_JOB.AUTO_CONFIG_OLT, label: 'Cấu hình OLT mới'},
          {
            value: TYPE_JOB.CONFIG_NEW_CE_SWITCH,
            label: 'Cấu hình Switch CE',
          },
          {
            value: TYPE_JOB.CONFIG_NEW_POWER,
            label: 'Cấp phát thiết bị nguồn',
          },
          {
            value: TYPE_JOB.NEW_POP_CONFIGUARATION,
            label: 'Cấu Hình POP Mới',
          },
          {value: TYPE_JOB.UP_SWITCH_FTI, label: 'UP SWITCH FTI'},
          {
            value: TYPE_JOB.AUTO_CONFIG_HW,
            label: 'Cấu Hình Auto Huawei',
            disabled: true,
          },
        ]}
        onClickItem={addPlanModal}
        sourceImage={require('../../../assets/images/tk_icon.png')}
      />
      <AccordionCP
        toggleDropDown={toggleDDDropdown}
        open={isDDOpen}
        title="Di dời"
        dataList={[
          {
            value: TYPE_JOB.POP_RELOCATION_PLAN_MPOP,
            label: 'Di Dời Metro POP',
          },
          {
            value: TYPE_JOB.POP_RELOCATION_PLAN_POP,
            label: 'Di Dời POP',
          },
          {
            value: TYPE_JOB.POP_RELOCATION_PLAN_POP_PLUS,
            label: 'Di Dời POP+',
          },
        ]}
        onClickItem={addPlanModal}
        sourceImage={require('../../../assets/images/tk_icon.png')}
      />
      <AccordionCP
        toggleDropDown={toggleThayTheDropdown}
        open={isThayTheOpen}
        title="Thay thế"
        dataList={[
          {
            value: TYPE_JOB.REPLACE_DEVICE,
            label: 'Thay Thế Thiết Bị Facility',
          },
          {
            value: TYPE_JOB.CONFIG_REPLACE_CE_SWITCH,
            label: 'Thay thế Switch CE',
          },
          {
            value: TYPE_JOB.CONFIG_REPLACE_OLT,
            label: 'Thay thế OLT (Soon)',
            disabled: true,
          },
        ]}
        onClickItem={addPlanModal}
        sourceImage={require('../../../assets/images/thaythe_icon.png')}
      />
    </ActionSheetCP>
  );
};

const AddNewPlanInfo = ({
  modal_add_new_plan,
  type_job,
  dataPopInfo,
  dataPopFilter,
  dataPopAutoComplete,
  handleToggleModal,
  handleTimePress,
  handleTimeConfirm,
  handleDatePress,
  handleDateConfirm,
}) => {
  const {state} = useAppContext();
  const {
    form_data: {type_job_vi},
  } = state.set_data.tools_config;
  const group_pop = MAP_GROUP[type_job];
  const dataPopWithGroup = group_pop
    ? fList(dataPopFilter).filter(i => i.group_pop === group_pop)
    : fList(dataPopFilter);
  return (
    <>
      {type_job === TYPE_JOB.REBOOT_POP ? (
        <RebootPOP
          dataPop={dataPopInfo}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.AUTO_CONFIG_OLT ? (
        <ConfigOLT
          dataPop={dataPopAutoComplete}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.CONFIG_NEW_CE_SWITCH ? (
        <ConfigNewCE
          dataPop={dataPopAutoComplete}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.CONFIG_REPLACE_CE_SWITCH ? (
        <ReplaceSwitchCE
          dataPop={dataPopAutoComplete}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.NEW_POP_CONFIGUARATION ? (
        <ConfigNewPOP
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.UP_SWITCH_FTI ? (
        <UpSwitchFTI
          dataPop={dataPopAutoComplete}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.REPLACE_DEVICE ? (
        <ReplaceDevFacility
          dataPop={dataPopAutoComplete}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.POP_RELOCATION_PLAN_MPOP ? (
        <RelocationMetroPop
          dataPop={dataPopWithGroup}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.POP_RELOCATION_PLAN_POP ? (
        <RelocationPop
          dataPop={dataPopWithGroup}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.POP_RELOCATION_PLAN_POP_PLUS ? (
        <RelocationPopPlus
          dataPop={dataPopWithGroup}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : type_job === TYPE_JOB.CONFIG_NEW_POWER ? (
        <ConfigNewPower
          dataPop={dataPopAutoComplete}
          type_job_vi={type_job_vi}
          handleTimePress={handleTimePress}
          handleTimeConfirm={handleTimeConfirm}
          handleDatePress={handleDatePress}
          handleDateConfirm={handleDateConfirm}
        />
      ) : (
        <ActionSheetCP
          isVisible={modal_add_new_plan}
          onClose={() => handleToggleModal('modal_add_new_plan', false)}
          onOpen={() => handleToggleModal('modal_add_new_plan', true)}>
          <View style={tw`min-h-[300px] mt-3`}>
            <ScreenDevelopment />
          </View>
        </ActionSheetCP>
      )}
    </>
  );
};

const PlanDetail = ({
  isLoading,
  navigation,
  modal_detail_plan,
  handleToggleModal,
  dataByObjId,
  handleClickEditPlan,
}) => {
  const {colors: colorsTools} = useColorThemeTools();
  const {deviceInfo, jobInfo, links, linkType} = {...dataByObjId};
  const {
    jobName,
    typeJob,
    expectTimeStart,
    planDuration,
    taskMaker,
    taskRunner,
    status,
    createdAt,
    lastUpdate,
  } = {...jobInfo};

  const {info, message, resultStatus, timeFinish, timeStart} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {modelDev, popName, links: linksInfoDev} = {...info};

  const eventVi = typeJob
    ? TASK_TYPE.filter(x => x.value === typeJob)?.[0]?.description || typeJob
    : 'Chưa định nghĩa tên KH';
  const statusVi =
    status && STEP_CODE_VIE_CONFIG.filter(x => x.label === status)?.[0]?.value;

  const uriImage =
    typeJob === TYPE_JOB.AUTO_CONFIG_OLT
      ? require('../../../assets/images/olt_image.png')
      : typeJob === TYPE_JOB.CONFIG_NEW_POWER
      ? require('../../../assets/images/power_image.png')
      : typeJob === TYPE_JOB.CONFIG_NEW_CE_SWITCH ||
        typeJob === TYPE_JOB.CONFIG_REPLACE_CE_SWITCH
      ? require('../../../assets/images/switch_ce_image.png')
      : typeJob === TYPE_JOB.POP_RELOCATION_PLAN_MPOP ||
        typeJob === TYPE_JOB.POP_RELOCATION_PLAN_POP ||
        typeJob === TYPE_JOB.POP_RELOCATION_PLAN_POP_PLUS ||
        typeJob === TYPE_JOB.REBOOT_POP
      ? require('../../../assets/images/pop_cabinet_image.png')
      : require('../../../assets/images/sw_hw_logo.png');
  return (
    <DialogCP
      visible={modal_detail_plan}
      setVisible={val => handleToggleModal('modal_detail_plan', val)}>
      <View
        style={tw.style(`w-full flex-row items-start py-2 justify-between`, {
          backgroundColor: colorsTools.BACKGROUND_CARD,
        })}
        onTouchStart={() => {
          handleToggleModal('modal_detail_plan', false);
        }}>
        <View style={tw`h-[50px] flex-1 pl-9 items-center justify-center`}>
          <View
            style={tw.style(
              'p-1 px-2 bg-white border-[2px] w-[50px] h-full rounded-full overflow-hidden',
              {
                borderColor: colorsTools.PRIMARY_COLOR,
              },
            )}>
            <FastImageCP
              uriLocal={uriImage}
              resizeMode="cover"
              onTouchStart={() => {}}
              style={tw.style('w-full h-full min-h-0')}
            />
          </View>
        </View>
        <IconCP
          name="close-outline"
          color={tw.color('gray-400')}
          size={30}
          style={tw`justify-end mr-2`}
        />
      </View>
      <ScrollView
        style={tw`h-auto relative`}
        showsVerticalScrollIndicator={false}>
        {isLoading && <LoadingScreen />}
        <View style={tw`px-2`}>
          <Text
            style={tw`text-center font-bold text-[15px] text-blue-500 px-1 leading-5`}>
            {jobName}
          </Text>
        </View>
        <RowDialogCP
          noBullet
          header="Thông tin chung"
          label="Loại KH"
          value={eventVi}
          colorVal={useHandleColor(typeJob, colorsTools)}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="TG dự tính thực thi"
          value={dd_mm_yyyy(expectTimeStart)}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Tên KH"
          value={jobName}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Thời lượng KH"
          value={planDuration}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="TG tạo"
          value={dd_mm_yyyy(createdAt)}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Cập nhật cuối"
          value={dd_mm_yyyy(lastUpdate)}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="TG bắt đầu thực thi"
          value={dd_mm_yy_hh_mm_ss_sub7(timeStart)}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="TG kết thúc thực thi"
          value={dd_mm_yy_hh_mm_ss_sub7(timeFinish)}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Người tạo KH"
          value={taskMaker}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Người thực thi KH"
          value={taskRunner}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Trạng thái"
          value={statusVi}
          colorVal={ColorsStatusHandle(status)}
          styleRow={tw`px-3`}
          noneBorderBottom
        />
        <RowDialogCP
          noBullet
          header="Cấu hình"
          label="POP"
          value={popName}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Loại thiết bị"
          value={modelDev}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Số link"
          value={links || linksInfoDev}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Loại link"
          value={linkType}
          styleRow={tw`px-3`}
        />
        <RowDialogCP
          noBullet
          label="Kết quả"
          value={message}
          colorVal={ColorsStatusHandle(resultStatus)}
          noneBorderBottom
          styleRow={tw`px-3`}
        />
        <View
          style={tw`flex-row gap-1 w-full items-center justify-between px-2 mb-[80px]`}>
          <ButtonCP
            iconName="reader-outline"
            titleIcon="Xem chi tiết"
            colorIcon="#fff"
            colorBG={colorsTools.PRIMARY_COLOR}
            colorBorder={colorsTools.PRIMARY_COLOR}
            styleContainer={tw.style('p-[6px] rounded-lg flex-1')}
            onPress={() => {
              navigation.navigate({
                name: SCREEN_NAVIGATE.Tools_Config_Detail_Screen,
                params: {
                  dataByObjId,
                },
              });
              handleToggleModal('modal_detail_plan', false);
            }}
          />
          <ButtonCP
            iconName="create-outline"
            titleIcon="Chỉnh sửa"
            colorIcon="#fff"
            colorBG={colorsTools.REBOOT_POP}
            colorBorder={colorsTools.REBOOT_POP}
            styleContainer={tw.style('p-[6px] rounded-lg flex-1')}
            onPress={() => {
              handleClickEditPlan(dataByObjId);
            }}
          />
        </View>
      </ScrollView>
    </DialogCP>
  );
};
