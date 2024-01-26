import React, {useEffect} from 'react';
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
import {
  CREATE_REPLACE_SWITCH_CE,
  GET_LIST_FILTER_SWITCH_DI_BY_POP_SWITCH_DI,
  UPDATE_REPLACE_SWITCH_CE,
} from '../../../services/tools';
import {useColorThemeTools} from './config';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';

const LIST_LABELS = ['Thông tin khai báo', 'Chọn thiết bị'];

const DATA_RADIO_MODEL_SW_CE = [
  {label: 'HW63', value: 'HW63'},
  {label: 'HW64', value: 'HW64'},
  {label: 'HW67', value: 'HW67'},
];

export default function ReplaceSwitchCE({
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
        type_job,
        nhan_su_th,
        name_switch_di_list,
        name_switch_di,
        pop_name,
        time,
        date,
        model_sw_ce,
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

  // ?! NHÂN SỰ THỰC HIỆN: user_list_by_role
  const listExe = fList(user_list_by_role).map(i => ({
    label: i?.email,
    value: i?.email,
    name: i?.fullName,
  }));
  // ?! POP SWITCH DI: dataPop
  // ?! NAME SWITCH DI: name_switch_di_list
  useEffect(() => {
    GET_LIST_FILTER_SWITCH_DI_BY_POP_SWITCH_DI({
      dispatch,
      state,
      pop_switch_di: pop_name,
      page: 1,
      limit: 100,
    });
  }, [pop_name]);
  const dataNameSwDiFormat = fList(name_switch_di_list).map(i => ({
    label: i?.nameDev,
    value: i?.nameDev,
  }));

  //  DISABLED STEPPER ADD PLAN
  const isDisabledStepOne =
    currentPage === 0 && (!nhan_su_th || !pop_name) ? true : false;
  const isDisabledStepTwo = currentPage === 1 && !model_sw_ce ? true : false;

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
    const newTime = moment(time).format('HH:mm:ss');
    const formattedDateTime = moment(`${newDate}T${newTime}`)
      .add(7, 'hours')
      .toISOString();

    const payload = {
      ceModelName: model_sw_ce?.value,
      ceNameDev: name_switch_di,
      scheduleRunTime: formattedDateTime,
      taskRunner: nhan_su_th,
      typeJob: type_job,
    };

    openNotifyNotYetCallAPI();
    CREATE_REPLACE_SWITCH_CE({
      payload,
      typeJob: type_job,
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
      ceModelName: model_sw_ce?.value,
      ceNameDev: name_switch_di,
      scheduleRunTime: formattedDateTime,
      taskRunner: nhan_su_th,
      typeJob: type_job,
    };

    openNotifyNotYetCallAPI();
    UPDATE_REPLACE_SWITCH_CE({
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
                label="POP switch DI"
                placeholder="Chọn POP switch DI"
                selectList={[pop_name]}
                onSelectValue={val => handleChangeForm('pop_name', val)}
                isQuantityInitData
                quantityDataInit={10}
                idActive="pop_name"
                isActiveDropDown={activeDropDown === 'pop_name'}
                onSetActiveDropDown={val => setActiveDropdown(val)}
              />
              <CustomSelectCP
                dataList={dataNameSwDiFormat}
                label="Tên switch DI"
                placeholder="Chọn tên switch DI"
                selectList={name_switch_di}
                onSelectValue={val => handleChangeForm('name_switch_di', val)}
                isQuantityInitData
                quantityDataInit={10}
                idActive="name_switch_di"
                isActiveDropDown={activeDropDown === 'name_switch_di'}
                onSetActiveDropDown={val => setActiveDropdown(val)}
              />
              <DateSelect
                visible={date_picker_visible}
                onPressDate={handleDatePress}
                value={date}
                onChange={handleDateConfirm}
                label="Ngày bắt đầu"
              />
              <TimeSelect
                visible={time_picker_visible}
                onPressTime={handleTimePress}
                value={time}
                onChange={handleTimeConfirm}
                label="Thời gian bắt đầu"
              />
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
                    Chọn Model SW CE
                  </Text>
                  <View style={tw`flex-row gap-2 flex-wrap mb-2`}>
                    <RadioGroupCP
                      dataOptions={DATA_RADIO_MODEL_SW_CE}
                      valueSelect={model_sw_ce}
                      setValSelect={val => handleChangeForm('model_sw_ce', val)}
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
