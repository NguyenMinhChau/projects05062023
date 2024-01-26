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
import {CREATE_CONFIG_OLT, UPDATE_CONFIG_OLT} from '../../../services/tools';
import {useColorThemeTools} from './config';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';

const LIST_LABELS = ['Thông tin khai báo', 'Chọn thiết bị'];

const DATA_RADIO_MODEL_DEVICE = [
  {
    label: 'GL5610-08P',
    value: 'GC08',
  },
  {
    label: 'GL5610-16P',
    value: 'GC16',
  },
];
const DATA_RADIO_MODEL_LINK_DN = [
  {label: '2', value: 2},
  {label: '4', value: 4},
];
const DATA_RADIO_CONFIG_POP_OTHER = [
  {label: 'Cấu hình khác POP', value: 'pop_other'},
];

export default function ConfigOLT({
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
      isEdit,
      form_data: {
        job_name,
        nhan_su_th,
        pop_name,
        pop_name_other,
        time,
        date,
        model_dev,
        number_link_dn,
        config_pop_other,
        _idUpdate,
      },
    },
    user_role: {user_list_by_role},
  } = state.set_data;

  const {
    tools_config: {date_picker_visible, modal_add_new_plan},
  } = state.set_toggle;

  const {colors} = useColorThemeTools();

  const {email} = {...currentUser};

  const [currentPage, setCurrentPage] = React.useState(0);
  const [dataListDevice, setDataListDevice] = React.useState(null);

  // ?! NHÂN SỰ THỰC HIỆN: user_list_by_role
  const listExe = fList(user_list_by_role).map(i => ({
    label: i?.email,
    value: i?.email,
    name: i?.fullName,
  }));

  //  DISABLED STEPPER ADD PLAN
  const isDisabledStepOne =
    currentPage === 0 && (!nhan_su_th || !pop_name === 0 || !job_name || !date)
      ? true
      : false;
  const isDisabledStepTwo =
    currentPage === 1 && (!model_dev || !number_link_dn) ? true : false;

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
    const newTime = moment().format('HH:mm:ss');
    const formattedDateTime = moment(`${newDate}T${newTime}`)
      .add(7, 'hours')
      .toISOString();

    const payload = {
      scheduleRunTime: formattedDateTime,
      jobName: job_name,
      taskRunner: nhan_su_th,
      modelDev: model_dev?.value,
      popName: pop_name,
      links: number_link_dn?.value,
      typeJob: 'AUTO_CONFIG_OLT',
      huaweiPop: pop_name_other || pop_name,
    };

    openNotifyNotYetCallAPI();
    CREATE_CONFIG_OLT({
      payload,
      setDataListDevice,
      pop_name,
      huawei_pop: pop_name_other || pop_name,
      model_dev: model_dev?.value,
      number_link_dn: number_link_dn?.value,
      dispatch,
      openNotificationToast,
    });
  };

  const handleUpdatePlan = () => {
    const newDate = moment(date).format('YYYY-MM-DD');
    const newTime = moment(time).format('HH:mm:ss');
    const formattedDateTime = moment(`${newDate}T${newTime}`)
      .add(7, 'hours')
      .toISOString();

    const payload = {
      scheduleRunTime: formattedDateTime,
      jobName: job_name,
      taskRunner: nhan_su_th,
      modelDev: model_dev?.value,
      popName: pop_name,
      links: number_link_dn?.value,
      typeJob: 'AUTO_CONFIG_OLT',
      huaweiPop: pop_name_other || pop_name,
    };

    openNotifyNotYetCallAPI();
    UPDATE_CONFIG_OLT({
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
              <TextInputCP
                labelOutside="Tên công việc"
                placeholder="Nhập tên công việc"
                value={job_name}
                outlinedStyle={tw`border border-[#ccc]`}
                onChange={val => {
                  handleChangeForm('job_name', val);
                }}
              />
              <DateSelect
                visible={date_picker_visible}
                onPressDate={handleDatePress}
                value={date}
                onChange={handleDateConfirm}
                label="Ngày bắt đầu"
              />
              <CustomSelectCP
                dataList={listExe}
                label="Nhân sự thực hiện"
                placeholder="Chọn nhân sự thực hiện"
                selectList={[nhan_su_th]}
                onSelectValue={val => handleChangeForm('nhan_su_th', val)}
                isQuantityInitData
                quantityDataInit={10}
                styleContainer={tw.style('mt-1')}
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
              <View style={tw`flex-col gap-2 mb-2`}>
                <View style={tw`flex-row gap-2 flex-wrap mb-2`}>
                  <RadioGroupCP
                    dataOptions={DATA_RADIO_CONFIG_POP_OTHER}
                    valueSelect={config_pop_other}
                    setValSelect={val =>
                      handleChangeForm(
                        'config_pop_other',
                        config_pop_other ? '' : val,
                      )
                    }
                  />
                </View>
              </View>
              {config_pop_other && (
                <CustomSelectCP
                  dataList={dataPop}
                  label="Tên POP cấu hình khác"
                  placeholder="Chọn POP cấu hình khác"
                  selectList={[pop_name_other]}
                  onSelectValue={val => handleChangeForm('pop_name_other', val)}
                  isQuantityInitData
                  quantityDataInit={10}
                  idActive="pop_name_other"
                  isActiveDropDown={activeDropDown === 'pop_name_other'}
                  onSetActiveDropDown={val => setActiveDropdown(val)}
                />
              )}
            </>
          )}
          {currentPage === 1 && (
            <>
              <View style={tw`flex-col gap-3`}>
                <View style={tw`flex-col gap-2`}>
                  <Text
                    style={tw.style('font-bold', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Chọn số link
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
              </View>
            </>
          )}
        </View>
      </ActionSheetCP>
    </>
  );
}
