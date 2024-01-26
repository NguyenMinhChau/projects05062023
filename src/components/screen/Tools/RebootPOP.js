import React from 'react';
import {View, Text, Platform} from 'react-native';
import tw from '../../../styles/twrnc.global';
import StepperCP from '../../General/StepperCP';
import TextInputCP from '../../General/TextInputCP';
import CustomSelectCP from '../../General/CustomSelectCP';
import TimeSelect from '../../General/TimeSelect';
import DateSelect from '../../General/DateSelect';
import RadioGroupCP from '../../General/RadioGroupCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import moment from 'moment';
import {fList} from '../../../utils/array.utils';
import {CREATE_REBOOT_POP, UPDATE_REBOOT_POP} from '../../../services/tools';
import {useColorThemeTools} from './config';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';

const LIST_LABELS = [
  'Thông tin khai báo',
  'Danh sách thiết bị',
  'Chọn thiết bị',
];

const DATA_RADIO_MODEL_SW_CE = [
  {label: 'HW63', value: 'HW63'},
  {label: 'HW64', value: 'HW64'},
  {label: 'HW67', value: 'HW67'},
];
const DATA_RADIO_MODEL_LINK_DN = [
  {label: '2', value: 2},
  {label: '4', value: 4},
  {label: '6', value: 6},
];
const DATA_RADIO_TYPE_LINK_DN = [
  {label: '10GB', value: 10},
  {label: '40GB', value: 40},
  {label: '100GB', value: 100},
];
const TYPE_REBOOT_POP = [
  {label: 'Song Song (Giống BotChat)', value: 'SYNCHRONOUS'},
  {label: 'Tuần tự', value: 'ASYNCHRONOUS'},
];
const TYPE_RUN_POP = [
  {label: 'Thực thi thủ công', value: 'MANUAL'},
  {label: 'Thực thi tự động', value: 'AUTO'},
];

export default function RebootPOP({
  dataPop = [],
  type_job_vi = '',
  handleTimePress,
  handleTimeConfirm,
  handleDatePress,
  handleDateConfirm,
}) {
  const {state, dispatch} = useAppContext();
  const {openNotifyNotYetCallAPI, openNotificationToast} =
    useNotificationToast();
  const [activeDropDown, setActiveDropdown] = React.useState(null);

  const {
    currentUser,
    tools_config: {
      list_all_device_table,
      isEdit,
      form_data: {
        type_job,
        job_name,
        nhan_su_th,
        pop_name_list,
        date,
        time,
        model_sw_ce,
        number_link_dn,
        type_link_dn,
        type_reboot_pop,
        type_run_pop,
        _idUpdate,
      },
    },
    user_role: {user_list_by_role},
  } = state.set_data;

  const {
    tools_config: {
      time_picker_visible,
      date_picker_visible,
      modal_add_new_plan,
    },
  } = state.set_toggle;

  const {colors} = useColorThemeTools();

  const {email} = {...currentUser};

  const [currentPage, setCurrentPage] = React.useState(0);
  const dataListDeviceSelect = fList(list_all_device_table).map(item => {
    return {
      label: `${item.ipDev} - ${item.popName} - ${item.typeDev}`,
      value: item.ipDev,
    };
  });
  const [dataListDevice, setDataListDevice] = React.useState(
    fList(dataListDeviceSelect).map(item => item.value),
  );

  // ?! NHÂN SỰ THỰC HIỆN: user_list_by_role
  const listExe = fList(user_list_by_role).map(i => ({
    label: i?.email,
    value: i?.email,
    name: i?.fullName,
  }));

  //  DISABLED STEPPER ADD PLAN
  const isDisabledStepOne =
    currentPage === 0 &&
    (!nhan_su_th || pop_name_list.length === 0 || !job_name)
      ? true
      : false;
  const isDisabledStepTwo = currentPage === 1 && !pop_name_list ? true : false;
  const isDisabledStepThree =
    currentPage === 2 && (!model_sw_ce || !number_link_dn || !type_link_dn)
      ? true
      : false;

  //?! STEPPER
  const onStepPress = position => {
    setCurrentPage(position);
  };
  const onPrevStep = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onNextStep = () => {
    if (currentPage < LIST_LABELS.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const configIconify = {
      color:
        stepStatus === 'finished'
          ? '#ffffff'
          : stepStatus !== 'current'
          ? '#ccc'
          : '#4b6ef3',
      width: 20,
      height: 20,
    };
    switch (position) {
      case 0: {
        return (
          <Text style={tw`font-bold text-[${configIconify.color}]`}>1</Text>
        );
      }
      case 1: {
        return (
          <Text style={tw`font-bold text-[${configIconify.color}]`}>2</Text>
        );
      }
      case 2: {
        return (
          <Text style={tw`font-bold text-[${configIconify.color}]`}>3</Text>
        );
      }
      default: {
        return (
          <Text style={tw`font-bold text-[${configIconify.color}]`}>1</Text>
        );
      }
    }
  };
  //?!

  // ? HANDLE CHANGE FORM
  const handleChangeForm = (name, val) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_data.tools_config,
          form_data: {
            ...state.set_data.tools_config.form_data,
            [name]: val,
          },
        },
      }),
    );
  };
  // ?
  // ? HANDLE TOGGLE MODAL
  const handleToggleModal = (name, val) => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_toggle.tools_config,
          [name]: val,
        },
      }),
    );
  };
  // ?

  const handleFormSubmit = () => {
    const newDate = moment(date).format('YYYY-MM-DD');
    const newTime = moment(time).format('HH:mm:ss');
    const formattedDateTime = moment(`${newDate}T${newTime}`)
      .add(7, 'hours')
      .toISOString();

    const payload = {
      ipDev:
        dataListDevice.length > 0
          ? dataListDevice
          : dataListDeviceSelect.map(item => item.value),
      jobName: job_name,
      taskMaker: email,
      taskRunner: nhan_su_th || 'icdpMobile@fpt.com',
      typeJob: type_job,
      typeRun: type_run_pop.value,
      typeRebootPOP: type_reboot_pop.value,
      scheduleRunTime: formattedDateTime,
    };

    openNotifyNotYetCallAPI();
    CREATE_REBOOT_POP({payload, dispatch, openNotificationToast});
  };

  const handleUpdatePlan = () => {
    const newDate = moment(date).format('YYYY-MM-DD');
    const newTime = moment(time).format('HH:mm:ss');
    const formattedDateTime = moment(`${newDate}T${newTime}`)
      .add(7, 'hours')
      .toISOString();

    const payload = {
      ipDev:
        dataListDevice.length > 0
          ? dataListDevice
          : dataListDeviceSelect.map(item => item.value),
      jobName: job_name,
      taskMaker: email,
      taskRunner: nhan_su_th || 'icdpMobile@fpt.com',
      typeJob: type_job,
      typeRun: type_run_pop.value,
      typeRebootPOP: type_reboot_pop.value,
      scheduleRunTime: formattedDateTime,
    };

    openNotifyNotYetCallAPI();
    UPDATE_REBOOT_POP({
      payload,
      id_task: _idUpdate,
      dispatch,
      openNotificationToast,
    });
  };

  const ButtonActions = () => {
    return (
      <View
        style={tw.style(
          `w-full flex-row gap-2 ${
            Platform.OS === 'ios' ? 'py-2 pb-5' : 'py-2'
          } items-center justify-between`,
        )}>
        <ButtonCP
          iconName="close-outline"
          titleIcon="Hủy"
          colorIcon="#fff"
          colorBG="#ff0000"
          colorBorder="#ff0000"
          onPress={() => {
            handleToggleModal('modal_add_new_plan', false);
          }}
          styleContainer={tw.style('flex-1 rounded-lg p-[6px]')}
        />
        <ButtonCP
          iconName="arrow-back-circle-outline"
          titleIcon="Quay lại"
          colorIcon="#fff"
          colorBG={colors.PRIMARY_COLOR}
          colorBorder={colors.PRIMARY_COLOR}
          disabled={currentPage === 0}
          onPress={onPrevStep}
          styleContainer={tw.style('flex-1 rounded-lg p-[6px]')}
        />
        <ButtonCP
          iconName={
            currentPage === LIST_LABELS.length - 1
              ? isEdit
                ? 'save-outline'
                : 'add-outline'
              : 'arrow-forward-circle-outline'
          }
          titleIcon={
            currentPage === LIST_LABELS.length - 1
              ? isEdit
                ? 'Cập nhật'
                : 'Thêm KH'
              : 'Tiếp tục'
          }
          positionIcon={
            currentPage === LIST_LABELS.length - 1
              ? isEdit
                ? 'left'
                : 'left'
              : 'right'
          }
          colorIcon="#fff"
          colorBG={colors.PRIMARY_COLOR}
          colorBorder={colors.PRIMARY_COLOR}
          disabled={isDisabledStepOne || isDisabledStepTwo}
          onPress={
            currentPage === LIST_LABELS.length - 1
              ? isEdit
                ? handleUpdatePlan
                : handleFormSubmit
              : onNextStep
          }
          styleContainer={tw.style('flex-1 rounded-lg p-[6px]')}
        />
      </View>
    );
  };

  const HeaderCustomSticky = () => {
    return (
      <View style={tw`my-0`}>
        <StepperCP
          currentPage={currentPage}
          onStepPress={
            isDisabledStepOne || isDisabledStepTwo || isDisabledStepThree
              ? () => {}
              : onStepPress
          }
          listLabels={LIST_LABELS}
          getStepIndicatorIconConfig={getStepIndicatorIconConfig}
          stepCount={LIST_LABELS.length}
          isIcon
        />
      </View>
    );
  };

  return (
    <>
      <ActionSheetCP
        isVisible={modal_add_new_plan}
        onClose={() => handleToggleModal('modal_add_new_plan', false)}
        onOpen={() => handleToggleModal('modal_add_new_plan', true)}
        ButtonActions={ButtonActions}
        HeaderCustomSticky={HeaderCustomSticky}>
        <View style={tw`p-2 mt-3`}>
          {currentPage === 0 && (
            <>
              <TextInputCP
                labelOutside="Loại công việc"
                value={type_job_vi}
                editable={false}
              />
              <TextInputCP
                labelOutside="Tên công việc"
                placeholder="Nhập tên công việc"
                value={job_name}
                outlinedStyle={tw`border border-[#ccc]`}
                onChange={val => {
                  handleChangeForm('job_name', val);
                }}
              />
              <CustomSelectCP
                dataList={listExe}
                label="Nhân sự thực hiện"
                placeholder="Chọn nhân sự thực hiện"
                selectList={[nhan_su_th]}
                onSelectValue={val => handleChangeForm('nhan_su_th', val)}
                isQuantityInitData
                quantityDataInit={10}
                idActive="nhan_su_th"
                isActiveDropDown={activeDropDown === 'nhan_su_th'}
                onSetActiveDropDown={val => setActiveDropdown(val)}
              />
              <CustomSelectCP
                dataList={dataPop}
                label="POP Name"
                placeholder="Chọn POP Name"
                selectList={pop_name_list}
                onSelectValue={val => handleChangeForm('pop_name_list', val)}
                multiple
                isCheckAll
                isCheckAllMultiple
                isQuantityInitData
                quantityDataInit={10}
                idActive="pop_name_list"
                isActiveDropDown={activeDropDown === 'pop_name_list'}
                onSetActiveDropDown={val => setActiveDropdown(val)}
              />
              <DateSelect
                visible={date_picker_visible}
                onPressDate={handleDatePress}
                value={date}
                onChange={handleDateConfirm}
                label="Ngày thực hiện"
              />
              <TimeSelect
                visible={time_picker_visible}
                onPressTime={handleTimePress}
                value={time}
                onChange={handleTimeConfirm}
                label="Thời gian thực hiện"
              />
              <View style={tw`flex-row gap-2 flex-wrap my-2`}>
                <RadioGroupCP
                  dataOptions={TYPE_RUN_POP}
                  valueSelect={type_run_pop}
                  setValSelect={val => handleChangeForm('type_run_pop', val)}
                />
              </View>
              <View style={tw`flex-row gap-2 flex-wrap mb-2`}>
                <RadioGroupCP
                  dataOptions={TYPE_REBOOT_POP}
                  valueSelect={type_reboot_pop}
                  setValSelect={val => handleChangeForm('type_reboot_pop', val)}
                />
              </View>
            </>
          )}
          {currentPage === 1 && (
            <View style={tw`flex-col gap-2`}>
              <Text
                style={tw.style(`font-bold text-[15px]`, {
                  color: colors.BLACK_COLOR,
                })}>
                Danh sách các thiết bị
              </Text>
              <View style={tw`flex-col gap-1`}>
                {dataListDeviceSelect.length > 0 ? (
                  <CustomSelectCP
                    dataList={dataListDeviceSelect}
                    label="Danh sách thiết bị"
                    placeholder="Chọn danh sách thiết bị"
                    selectList={
                      dataListDevice.length > 0
                        ? dataListDevice
                        : dataListDeviceSelect.map(item => item.value)
                    }
                    onSelectValue={val => setDataListDevice(val)}
                    multiple
                    isCheckAll
                    isCheckAllMultiple
                    isQuantityInitData
                    quantityDataInit={10}
                    NUMBER_SPLICE={5}
                    idActive="device"
                    isActiveDropDown={activeDropDown === 'device'}
                    onSetActiveDropDown={val => setActiveDropdown(val)}
                  />
                ) : (
                  <View style={tw`items-center justify-center`}>
                    <Text
                      style={tw.style(`italic my-2`, {
                        color: colors.BLACK_COLOR,
                      })}>
                      Không có dữ liệu
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          {currentPage === 2 && (
            <>
              <View style={tw`flex-col gap-3`}>
                <View style={tw`flex-col gap-2`}>
                  <Text
                    style={tw.style('font-bold', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Chọn Model SW CE
                  </Text>
                  <View style={tw`flex-row gap-2 flex-wrap`}>
                    <RadioGroupCP
                      dataOptions={DATA_RADIO_MODEL_SW_CE}
                      valueSelect={model_sw_ce}
                      setValSelect={val => handleChangeForm('model_sw_ce', val)}
                    />
                  </View>
                </View>
                <View style={tw`flex-col gap-2`}>
                  <Text
                    style={tw.style('font-bold', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Chọn số link đầu nối
                  </Text>
                  <View style={tw`flex-row gap-2 flex-wrap`}>
                    <RadioGroupCP
                      dataOptions={DATA_RADIO_MODEL_LINK_DN}
                      valueSelect={number_link_dn}
                      setValSelect={val =>
                        handleChangeForm('number_link_dn', val)
                      }
                    />
                  </View>
                </View>
                <View style={tw`flex-col gap-2`}>
                  <Text
                    style={tw.style('font-bold', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Chọn loại link đầu nối
                  </Text>
                  <View style={tw`flex-row gap-2 flex-wrap mb-2`}>
                    <RadioGroupCP
                      dataOptions={DATA_RADIO_TYPE_LINK_DN}
                      valueSelect={type_link_dn}
                      setValSelect={val =>
                        handleChangeForm('type_link_dn', val)
                      }
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ActionSheetCP>
    </>
  );
}
