import React from 'react';
import {View, Text, Platform} from 'react-native';
import tw from '../../../styles/twrnc.global';
import StepperCP from '../../General/StepperCP';
import TextInputCP from '../../General/TextInputCP';
import CustomSelectCP from '../../General/CustomSelectCP';
import DateSelect from '../../General/DateSelect';
import RadioGroupCP from '../../General/RadioGroupCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import moment from 'moment';
import {fList} from '../../../utils/array.utils';
import {
  CREATE_CONFIG_NEW_POWER,
  GET_LIST_GPON,
  UPDATE_CONFIG_NEW_POWER,
} from '../../../services/tools';
import {useColorThemeTools} from './config';
import TimeSelect from '../../General/TimeSelect';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';

const LIST_LABELS = ['Thông tin khai báo', 'Chọn thiết bị'];

const DATA_RADIO_MODEL_DEVICE = [
  {
    label: 'ENATEL-1U',
    value: 'EN1U',
  },
  {
    label: 'ENATEL-3U',
    value: 'EN3U',
  },
  {
    label: 'ENATEL-4U',
    value: 'EN4U',
  },
  {
    label: 'ENATEL-6U',
    value: 'EN6U',
  },
  {
    label: 'DELTA-1U',
    value: 'DE1U',
  },
];

export default function ConfigNewPower({
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
    tools_config: {
      isEdit,
      form_data: {
        job_name,
        nhan_su_th,
        pop_name,
        date,
        time,
        date_end,
        time_end,
        model_dev,
        gpon_power,
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

  const [targetDateTime, setTargetDateTime] = React.useState('date_time');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [dataListDevice, setDataListDevice] = React.useState(null);

  // ?! NHÂN SỰ THỰC HIỆN: user_list_by_role
  const listExe = fList(user_list_by_role).map(i => ({
    label: i?.email,
    value: i?.email,
    name: i?.fullName,
  }));

  const gponSuggestion = FAKE_DATA?.result?.gpon_suggestion?.ipDev;

  let selectedGpon = [
    ...fList(FAKE_DATA?.result?.gpons).filter(x => x.ipDev === gponSuggestion),
  ];

  const GPON_LIST = fList(FAKE_DATA?.result?.gpons).map(i => {
    return {
      label: `${i?.branch} - ${i?.ipDev} - ${i?.modelDev} - ${i?.nameDev}`,
      value: i,
      active: i?.ipDev,
    };
  });

  //  DISABLED STEPPER ADD PLAN
  const isDisabledStepOne =
    currentPage === 0 && (!nhan_su_th || !date || !date_end) ? true : false;
  const isDisabledStepTwo = currentPage === 1 && !model_dev ? true : false;

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
      if (currentPage === 0) {
        const newDate = moment(date).format('YYYY-MM-DD');
        const newTime = moment(time).format('HH:mm:ss');
        const newDateEnd = moment(date_end).format('YYYY-MM-DD');
        const newTimeEnd = moment(time_end).format('HH:mm:ss');
        const formattedDateTime = moment(`${newDate}T${newTime}`)
          .add(7, 'hours')
          .toISOString();
        const formattedDateTimeEnd = moment(`${newDateEnd}T${newTimeEnd}`)
          .add(7, 'hours')
          .toISOString();
        const payload = {
          typeJob: 'CONFIG_NEW_POWER',
          popName: pop_name,
          modelDev: model_dev?.value,
          taskRunner: nhan_su_th,
          scheduleRunTime: moment(formattedDateTime).format('YYYY-MM-DD'),
          // scheduleFinishTime: moment(formattedDateTimeEnd).format('YYYY-MM-DD'),
        };
        GET_LIST_GPON({
          state,
          dispatch,
          popName: pop_name,
          modelDev: model_dev?.value,
          setDataListDevice,
          payload,
          openNotificationToast,
        });
      }
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
    const {form, list} = {...dataListDevice};
    const {
      typeJob,
      popName,
      modelDev,
      taskRunner,
      scheduleRunTime,
      // scheduleFinishTime,
    } = {
      ...form,
    };
    const {ipDev} = {...(gpon_power?.value || selectedGpon?.[0])};

    const payload = {
      typeJob: typeJob,
      popName: popName,
      modelDev: modelDev,
      ipOLT: ipDev,
      taskRunner: taskRunner,
      expectTimeStart: moment(scheduleRunTime).format('YYYY-MM-DD'),
      //expectTimeFinish: moment(scheduleFinishTime).format('YYYY-MM-DD'),
    };

    openNotifyNotYetCallAPI();
    CREATE_CONFIG_NEW_POWER({
      payload,
      dispatch,
      openNotificationToast,
    });
  };

  const handleUpdatePlan = () => {
    const {form, list} = {...dataListDevice};

    const {
      typeJob,
      popName,
      modelDev,
      taskRunner,
      scheduleRunTime,
      // scheduleFinishTime,
    } = {
      ...form,
    };

    const {ipDev} = {...(gpon_power?.value || selectedGpon?.[0])};

    const payload = {
      typeJob: typeJob,
      popName: popName,
      modelDev: modelDev,
      ipOLT: ipDev,
      taskRunner: taskRunner,
      expectTimeStart: moment(scheduleRunTime).format('YYYY-MM-DD'),
      // expectTimeFinish: moment(scheduleFinishTime).format('YYYY-MM-DD'),
    };

    openNotifyNotYetCallAPI();
    UPDATE_CONFIG_NEW_POWER({
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
            isDisabledStepOne || isDisabledStepTwo ? () => {} : onStepPress
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
              {_idUpdate && (
                <TextInputCP
                  labelOutside="Tên công việc"
                  value={job_name}
                  outlinedStyle={tw`border border-[#ccc]`}
                  onChange={val => {
                    handleChangeForm('job_name', val);
                  }}
                  disabled
                />
              )}
              <DateSelect
                visible={date_picker_visible && targetDateTime === 'date_time'}
                onPressDate={() => {
                  handleDatePress();
                  setTargetDateTime('date_time');
                }}
                value={date}
                name="date"
                onChange={handleDateConfirm}
                label="Ngày bắt đầu"
              />
              <TimeSelect
                visible={time_picker_visible && targetDateTime === 'date_time'}
                onPressTime={() => {
                  handleTimePress();
                  setTargetDateTime('date_time');
                }}
                value={time}
                onChange={handleTimeConfirm}
                label="Thời gian bắt đầu"
                name="time"
              />

              {/* <DateSelect
                visible={
                  date_picker_visible && targetDateTime === 'date_time_end'
                }
                onPressDate={() => {
                  handleDatePress();
                  setTargetDateTime('date_time_end');
                }}
                value={date_end}
                name="date_end"
                onChange={handleDateConfirm}
                label="Ngày kết thúc"
              />
              <TimeSelect
                visible={
                  time_picker_visible && targetDateTime === 'date_time_end'
                }
                onPressTime={() => {
                  handleTimePress();
                  setTargetDateTime('date_time_end');
                }}
                value={time_end}
                name="time_end"
                onChange={handleTimeConfirm}
                label="Thời gian kết thúc"
              /> */}
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
                label="Tên POP"
                placeholder="Chọn tên POP"
                selectList={[pop_name]}
                onSelectValue={val => handleChangeForm('pop_name', val)}
                isQuantityInitData
                quantityDataInit={10}
                idActive="pop_name"
                isActiveDropDown={activeDropDown === 'pop_name'}
                onSetActiveDropDown={val => setActiveDropdown(val)}
              />
              <View style={tw`flex-col gap-2`}>
                <Text
                  style={tw.style('font-bold', {
                    color: colors.BLACK_COLOR,
                  })}>
                  Chọn model thiết bị
                </Text>
                <View style={tw`flex-row gap-2 flex-wrap mb-2`}>
                  <RadioGroupCP
                    dataOptions={DATA_RADIO_MODEL_DEVICE}
                    valueSelect={model_dev}
                    setValSelect={val => handleChangeForm('model_dev', val)}
                  />
                </View>
              </View>
            </>
          )}
          {currentPage === 1 && (
            <>
              <View style={tw`flex-col gap-3`}>
                <View style={tw`flex-col gap-2 mb-2`}>
                  <Text
                    style={tw.style('font-bold', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Chọn thiết bị GPON
                  </Text>
                  <View style={tw`flex-row gap-3 flex-wrap`}>
                    <RadioGroupCP
                      dataOptions={GPON_LIST}
                      valueSelect={gpon_power}
                      setValSelect={val => handleChangeForm('gpon_power', val)}
                      activeBy={gponSuggestion}
                      styleLabel={tw.style('text-[13px]')}
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

const FAKE_DATA = {
  error: null,
  message: 'OK',
  result: {
    area: 'MN',
    branch: 'BTHT1',
    commStr: 'FPTHCM',
    function: 'POWER',
    gateway: '11.51.142.1',
    gpon_suggestion: {
      PortStatus: {
        'e1/1': 'DOWN',
        'e1/2': 'DOWN',
        'e1/3': 'DOWN',
        'e1/4': 'DOWN',
      },
      branch: 'BTHT1',
      ipDev: '11.51.122.162',
      modelDev: 'GC16',
      nameDev: 'HCMP50402GC16',
      portConfig: [
        'ena',
        'conf ter',
        'vlan 44',
        'description MGNT-PWR',
        'int range ethernet 1/1 to ethernet 2/2',
        'switchport trunk allowed vlan 44',
        'exit',
        'int ethernet 1/4',
        'switchport mode access',
        'switchport default vlan 44',
        'dlf-forward unicast',
        'exit',
        'dlf-forward unicast',
      ],
      powerPort: 'e1/4',
    },
    gpons: [
      {
        PortStatus: {
          'e1/1': 'DOWN',
          'e1/2': 'DOWN',
        },
        branch: 'BTHT1',
        ipDev: '11.51.122.161',
        modelDev: 'GC57',
        nameDev: 'HCMP50401GC57',
        portConfig: [
          'ena',
          'conf ter',
          'vlan 44',
          'description MGNT-PWR',
          'int range ethernet 1/1 to ethernet 2/2',
          'switchport trunk allowed vlan 44',
          'exit',
          'int ethernet 1/4',
          'switchport mode access',
          'switchport default vlan 44',
          'dlf-forward unicast',
          'exit',
          'dlf-forward unicast',
        ],
        powerPort: 'e1/2',
      },
      {
        PortStatus: {
          'e1/1': 'DOWN',
          'e1/2': 'DOWN',
        },
        branch: 'BTHT1',
        ipDev: '11.51.122.164',
        modelDev: 'GC57',
        nameDev: 'HCMP50404GC57',
        portConfig: [
          'ena',
          'conf ter',
          'vlan 44',
          'description MGNT-PWR',
          'int range ethernet 1/1 to ethernet 2/2',
          'switchport trunk allowed vlan 44',
          'exit',
          'int ethernet 1/4',
          'switchport mode access',
          'switchport default vlan 44',
          'dlf-forward unicast',
          'exit',
          'dlf-forward unicast',
        ],
        powerPort: 'e1/2',
      },
      {
        PortStatus: {
          'e1/1': 'DOWN',
          'e1/2': 'DOWN',
          'e1/3': 'DOWN',
          'e1/4': 'DOWN',
        },
        branch: 'BTHT1',
        ipDev: '11.51.122.162',
        modelDev: 'GC16',
        nameDev: 'HCMP50402GC16',
        portConfig: [
          'ena',
          'conf ter',
          'vlan 44',
          'description MGNT-PWR',
          'int range ethernet 1/1 to ethernet 2/2',
          'switchport trunk allowed vlan 44',
          'exit',
          'int ethernet 1/4',
          'switchport mode access',
          'switchport default vlan 44',
          'dlf-forward unicast',
          'exit',
          'dlf-forward unicast',
        ],
        powerPort: 'e1/4',
      },
      {
        PortStatus: {
          'e1/1': 'DOWN',
          'e1/2': 'DOWN',
        },
        branch: 'BTHT1',
        ipDev: '11.51.122.165',
        modelDev: 'GC57',
        nameDev: 'HCMP50405GC57',
        portConfig: [
          'ena',
          'conf ter',
          'vlan 44',
          'description MGNT-PWR',
          'int range ethernet 1/1 to ethernet 2/2',
          'switchport trunk allowed vlan 44',
          'exit',
          'int ethernet 1/4',
          'switchport mode access',
          'switchport default vlan 44',
          'dlf-forward unicast',
          'exit',
          'dlf-forward unicast',
        ],
        powerPort: 'e1/2',
      },
    ],
    group: 'ACCESS',
    ipDev: '11.51.142.162',
    modelDev: 'DE1U',
    nameDev: 'HCMP50402PWDE1U',
    nameOps: 'BTHT1-HCMP50402PWDE1U-11.51.142.162',
    pop: 'P504',
    posInPop: '02',
    province: 'HCM',
    subnetMask: '255.255.255.0',
    typeDev: 'POWER',
    vlanPower: '44',
    zone: 'V5',
  },
  status: 'success',
};
