import React from 'react';
import {View, Text, Platform} from 'react-native';
import tw from '../../../styles/twrnc.global';
import StepperCP from '../../General/StepperCP';
import TextInputCP from '../../General/TextInputCP';
import CustomSelectCP from '../../General/CustomSelectCP';
import TimeSelect from '../../General/TimeSelect';
import DateSelect from '../../General/DateSelect';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import moment from 'moment';
import {fList} from '../../../utils/array.utils';
import {
  CREATE_RELOCATION_POP_PLUS,
  UPDATE_RELOCATION_POP_PLUS,
} from '../../../services/tools';
import RadioGroupCP from '../../General/RadioGroupCP';
import {useColorThemeTools} from './config';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';

const LIST_LABELS = ['Thông tin khai báo'];
const DATA_RADIO_STATUS = [
  {label: 'Chưa thực thi', value: 'WAITING'},
  {label: 'Đang thực thi', value: 'RUNNING'},
  {label: 'Đã thực thi', value: 'DONE'},
];

export default function RelocationPopPlus({
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
        nhan_su_th,
        job_name,
        pop_name,
        date,
        time,
        date_end,
        time_end,
        status_exc,
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

  const [targetDateTime, setTargetDateTime] = React.useState('date_time');

  // ?! NHÂN SỰ THỰC HIỆN: user_list_by_role
  const listExe = fList(user_list_by_role).map(i => ({
    label: i?.email,
    value: i?.email,
    name: i?.fullName,
  }));
  // ?! POP WITH FILTER: dataPop

  const isDisabledBtn = !nhan_su_th || !pop_name || !job_name ? true : false;

  //?! STEPPER
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
    const newDateEnd = moment(date_end).format('YYYY-MM-DD');
    const newTimeEnd = moment(time_end).format('HH:mm:ss');
    const formattedDateTime = moment(`${newDate}T${newTime}`)
      .add(7, 'hours')
      .toISOString();
    const formattedDateTimeEnd = moment(`${newDateEnd}T${newTimeEnd}`)
      .add(7, 'hours')
      .toISOString();

    const payload = {
      popName: pop_name,
      jobName: job_name,
      taskMaker: email,
      taskRunner: nhan_su_th,
      typeJob: 'POP_RELOCATION_PLAN',
      status: status_exc?.value,
      expectTimeStart: formattedDateTime,
      expectTimeFinish: formattedDateTimeEnd,
    };

    openNotifyNotYetCallAPI();
    CREATE_RELOCATION_POP_PLUS({payload, dispatch, openNotificationToast});
  };

  const handleUpdatePlan = () => {
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
      popName: pop_name,
      jobName: job_name,
      taskMaker: email,
      taskRunner: nhan_su_th,
      typeJob: 'POP_RELOCATION_PLAN',
      status: status_exc?.value,
      expectTimeStart: formattedDateTime,
      expectTimeFinish: formattedDateTimeEnd,
    };

    openNotifyNotYetCallAPI();
    UPDATE_RELOCATION_POP_PLUS({
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
          iconName={isEdit ? 'save-outline' : 'add-outline'}
          titleIcon={isEdit ? 'Cập nhật' : 'Thêm KH'}
          colorIcon="#fff"
          colorBG={colors.PRIMARY_COLOR}
          colorBorder={colors.PRIMARY_COLOR}
          disabled={isDisabledBtn}
          onPress={isEdit ? handleUpdatePlan : handleFormSubmit}
          styleContainer={tw.style('flex-1 rounded-lg p-[6px]')}
        />
      </View>
    );
  };

  const HeaderCustomSticky = () => {
    return (
      <View style={tw`my-0`}>
        <StepperCP
          currentPage={0}
          onStepPress={() => {}}
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

          <DateSelect
            visible={date_picker_visible && targetDateTime === 'date_time_end'}
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
            visible={time_picker_visible && targetDateTime === 'date_time_end'}
            onPressTime={() => {
              handleTimePress();
              setTargetDateTime('date_time_end');
            }}
            value={time_end}
            name="time_end"
            onChange={handleTimeConfirm}
            label="Thời gian kết thúc"
          />
          <View style={tw`flex-col gap-2 my-2`}>
            <Text
              style={tw.style('font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Trạng thái
            </Text>
            <View style={tw`flex-row gap-2 flex-wrap mb-2`}>
              <RadioGroupCP
                dataOptions={DATA_RADIO_STATUS}
                valueSelect={status_exc}
                setValSelect={val => handleChangeForm('status_exc', val)}
              />
            </View>
          </View>
        </View>
      </ActionSheetCP>
    </>
  );
}
