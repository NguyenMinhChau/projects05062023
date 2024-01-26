import React from 'react';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {
  ADD_SCHEDULE_OPERATOR,
  EDIT_SCHEDULE_OPERATOR,
  GET_LIST_EMPLOYEE__SCHEDULE_OPERATOR,
  GET_LIST_SCHEDULE_OPERATOR_BY_FILTER,
} from '../../../../services/management/scheduleOperator';
import moment from 'moment';
import 'moment/locale/vi';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../../Context/AppContext.reducer';
import {
  useColorThemeScheduleOperator,
  useHandleColorScheduleOperator,
} from './config';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {IconCP} from '../../../../utils/icon.utils';
import {useColorThemeManagement} from '../config';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import ButtonCP from '../../../General/ButtonCP';
import {fList} from '../../../../utils/array.utils';
import {EMPTY_CHAR} from '../../../../helpers/_empty';
import {PRIMARY_COLOR} from '../../../../styles/colors.global';
import CustomSelectCP from '../../../General/CustomSelectCP';
import RadioGroupCP from '../../../General/RadioGroupCP';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {useCssApp} from '../../../../utils/css.utils';

export const useScheduleOperator = tabActive => {
  const {state, dispatch} = useAppContext();
  const {day, month, fromDate} = state.set_data.calendar;

  const [activeDropDown, setActiveDropdown] = React.useState(null);

  const {
    isLoading,
    isFilter,
    list_schedule_operator,
    employee_list,
    date_filter,
    email_filter,
    radio_schedule,
    employee_email,
    employee_full_name,
    employee_phone,
    employee_code,
    employee_department,
    employee_province,
    employee_zone,
    note,
    idUpdate,
    status_employee,
    visibleCalendar,
  } = state.set_data.schedule_operator;

  const {modal_schedule, modal_schedule_detail} =
    state.set_toggle.schedule_operator;
  const {colors} = useColorThemeManagement();
  const {shadowCss} = useCssApp();
  const {colors: colorsSchedule} = useColorThemeScheduleOperator();

  const {openNotificationToast} = useNotificationToast();

  const handleToggleModal = (name, val) => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'schedule_operator',
        value: {
          ...state.set_toggle.schedule_operator,
          [name]: val,
        },
      }),
    );
  };

  const handleChangeForm = (name, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          [name]: value,
        },
      }),
    );
  };

  React.useEffect(() => {
    GET_LIST_EMPLOYEE__SCHEDULE_OPERATOR({
      state,
      dispatch,
      openNotificationToast,
    });
  }, []);
  React.useEffect(() => {
    GET_LIST_SCHEDULE_OPERATOR_BY_FILTER({
      state,
      dispatch,
      emp_email: email_filter || '',
      date: (tabActive === 'view_1' ? month : fromDate) || new Date(),
      openNotificationToast,
    });
  }, [month, fromDate]);

  const DATA_RADIO_SCHEDULE = [
    {label: 'Ca sáng', value: 'CA_SANG', color: colorsSchedule.CA_SANG},
    {label: 'Ca tối', value: 'CA_TOI', color: colorsSchedule.CA_TOI},
  ];
  const DATA_STATUS = [{label: 'Status', value: 'true'}];
  const DATA_NHAN_SU = fList(employee_list)?.map(item => {
    return {
      label: `${item.email} - ${item.fullName}`,
      value: item?.email,
      payload: item,
    };
  });

  const data_filter_form = fList(employee_list)?.filter(x => {
    return x.email === employee_email;
  });

  const {refreshing, onRefresh} = useRefreshList();

  const formattedDate = moment(day || new Date()).locale('vi').format('dddd, DD/MM/YYYY');
  const formattedDateNoName = moment(day || new Date()).locale('vi').format('DD/MM/YYYY');

  const handleCreateSchedule = () => {
    handleToggleModal('modal_schedule', true);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          employee_email: '',
          employee_full_name: '',
          employee_phone: '',
          employee_code: '',
          employee_department: '',
          employee_province: '',
          employee_zone: '',
          note: '',
          status_employee: null,
          idUpdate: '',
        },
      }),
    );
  };

  const scheduleFilter =
    list_schedule_operator?.filter(
      event => event.date === moment(day || new Date()).format('YYYY-MM-DD'),
    ) || [];

  const ScheduleContent = ({dayNightData, title, onEdit, color,iconName}) => {
    const {empId} = {...dayNightData};
    const {email, fullName, phone} = {...empId};
    return (
      <View
        style={tw.style(`flex-col gap-2 rounded-xl p-3`, {
          backgroundColor:
            useHandleColorScheduleOperator(title, colorsSchedule) + '1a',
        })}>
        <View style={tw.style('flex-row items-center justify-between')}>
          <TouchableOpacity activeOpacity={1} style={tw.style('flex-row gap-1 items-center flex-1')}>
            <IconCP
            name={iconName}
            size={20}
            color={color ? color : useHandleColorScheduleOperator(title, colorsSchedule)}
            />
          <Text
            style={tw.style('text-[20px] font-bold', {
              color: color ? color : useHandleColorScheduleOperator(title, colorsSchedule),
            })}>
            {title}
          </Text>

          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={onEdit}>
            <IconCP
              name="create-outline"
              size={25}
              color={color ? color :useHandleColorScheduleOperator(title, colorsSchedule)}
            />
          </TouchableOpacity>
        </View>
        <View style={tw.style('flex-col w-full gap-2')}>
          <RowDialogCP
            label="Nguời trực"
            value={email}
            noBullet
            styleRow={tw`px-0 pt-0`}
          />
          <RowDialogCP
            label="Họ và tên"
            value={fullName}
            noBullet
            styleRow={tw`px-0 pt-0`}
          />
          <RowDialogCP
            label="Số điện thoại"
            value={phone}
            noBullet
            styleRow={tw`px-0 pt-0`}
            onCopy
            noneBorderBottom
          />
        </View>
      </View>
    );
  };


  const handleClickEdit = (_idSchedule, dayNightData) => {
    const {note, empId} = {...dayNightData};
    const {
      email,
      fullName,
      maNV,
      phone,
      phong_ban,
      province,
      status,
      zone,
      _id: idEmp,
    } = {...empId};
    handleToggleModal('modal_schedule', true);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          employee_email: email,
          employee_full_name: fullName,
          employee_phone: phone,
          employee_code: maNV,
          employee_department: phong_ban,
          employee_province: province,
          employee_zone: zone,
          note: note,
          status_employee: {
            label: 'Status',
            value: status.toString(),
          },
          idUpdate: idEmp,
        },
      }),
    );
  };

  const RenderScheduleItem = ({item, index}) => {
    if (item?.date === moment(day || new Date()).format('YYYY-MM-DD')) {
      const {dayShift, nightShift, dayOff, _id} = {...item};
      const {
        empAssignment,
        dateAssignment,
        empId: empIdDayOff,
        note,
      } = {...dayOff};

      return (
        <View style={tw.style('flex-col gap-3 w-full py-5')}>
          {!radio_schedule?.value ? (
            <>
              <ScheduleContent
                dayNightData={dayShift}
                title="Ca Sáng"
                onEdit={() => handleClickEdit(_id, dayShift)}
                iconName='sunny-outline'
              />
              <ScheduleContent
                dayNightData={nightShift}
                title="Ca Tối"
                onEdit={() => handleClickEdit(_id, nightShift)}
                color={colors.BLACK_COLOR}
                iconName='moon-outline'
              />
            </>
          ) : radio_schedule?.value === 'CA_SANG' ? (
            <ScheduleContent
              dayNightData={dayShift}
              title="Ca Sáng"
              onEdit={() => handleClickEdit(_id, dayShift)}
            />
          ) : (
            <ScheduleContent
              dayNightData={nightShift}
              title="Ca Tối"
              onEdit={() => handleClickEdit(_id, nightShift)}
            />
          )}
          {fList(empIdDayOff)?.length > 0 ? (
            <View
              style={tw.style(`flex-col gap-2 rounded-xl p-3`, {
                backgroundColor: colorsSchedule.DAY_OFF,
                ...shadowCss(),
              })}>
                <TouchableOpacity activeOpacity={1} style={tw.style('w-full flex-row gap-1 items-center')}>
                <IconCP
          name='cloud-offline-outline'
          size={20}
          color='#ffffff'
          />
                <Text
            style={tw.style('text-[20px] font-bold', {
              color: '#ffffff',
            })}>
            Nghỉ bù trực vận hành
          </Text>
                </TouchableOpacity>
              <View style={tw.style('flex-col w-full gap-2')}>
                {empAssignment && (
                  <RowDialogCP
                    label="Người tạo"
                    value={empAssignment}
                    noBullet
                    styleRow={tw`px-0 pt-0 border-white`}
                    styleLabel={tw.style('text-white')}
                    styleVal={tw.style('text-white')}
                  
                  />
                )}
                {dateAssignment && (
                  <RowDialogCP
                    label="Thời gian tạo"
                    value={moment(dateAssignment)
                      .subtract(7, 'hours')
                      .format('DD/MM/YYYY HH:mm:ss')}
                    noBullet
                    styleRow={tw`px-0 pt-0 border-white`}
                    styleLabel={tw.style('text-white')}
                    styleVal={tw.style('text-white')}
                  />
                )}
                {note && (
                  <RowDialogCP
                    label="Ghi chú"
                    value={note}
                    noBullet
                    styleRow={tw`px-0 pt-0 border-white`}
                    styleLabel={tw.style('text-white')}
                    styleVal={tw.style('text-white')}
                  />
                )}
                <TouchableOpacity activeOpacity={1} style={tw.style('w-full')}>

                <Text
                  style={tw.style('font-bold text-[18px]', {
                    color: '#ffffff',
                  })}>
                  Danh sách nhân sự
                </Text>
                </TouchableOpacity>
                <View
                  style={tw.style(
                    'w-full bg-gray-100 rounded-lg overflow-hidden relative',
                  )}>
                    <TouchableOpacity activeOpacity={1} style={tw.style('absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-transparent z-50')}></TouchableOpacity>
                  {/* THEAD */}
                  <View
                    style={tw.style(
                      'flex-row items-center justify-between w-full border-b-[2px] border-white',
                    )}>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1 py-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[13px] text-[#243c7c] font-bold',
                        )}>
                        Họ và tên
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1 py-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[13px] text-[#243c7c] font-bold',
                        )}>
                        Email
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1 py-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[13px] text-[#243c7c] font-bold',
                        )}>
                        SĐT
                      </Text>
                    </View>
                  </View>
                  {/* TBODY */}
                  {fList(empIdDayOff).map((empItem, _idx) => {
                    const {fullName, email, phone} = {...empItem};
                    return (
                      <View
                        key={_idx}
                        style={tw.style(
                          `flex-row items-center justify-between w-full border-b-[2px] border-white`,
                        )}>
                        <View
                          style={tw.style(
                            'flex-col items-center justify-center flex-1 py-1',
                          )}>
                          <Text
                            style={tw.style(
                              'text-[13px] text-black text-center',
                            )}>
                            {fullName}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            'flex-col items-center justify-center flex-1 py-1',
                          )}>
                          <Text
                            style={tw.style(
                              'text-[13px] text-black text-center',
                            )}>
                            {email}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            'flex-col items-center justify-center flex-1 py-1',
                          )}>
                          <Text
                            style={tw.style(
                              'text-[13px] text-black text-center',
                            )}>
                            {phone}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          ) : (
            <Text
              style={tw.style('text-center text-[15px]', {
                color: colors.BLACK_COLOR,
              })}>
              Không có dữ liệu
            </Text>
          )}
        </View>
      );
    }
  };

  const {fullName, phone, maNV, phong_ban, province, zone} = {
    ...fList(data_filter_form)?.[0],
  };

  const handleSubmitCreateSchedule = () => {
    const payload = {
      fullName: employee_full_name || fullName,
      phone: employee_phone || phone,
      email: employee_email,
      maNV: employee_code || maNV,
      phong_ban: employee_department || phong_ban,
      province: employee_province || province,
      zone: employee_zone || zone,
      note: note,
      status: status_employee?.value === 'true' ? true : false,
    };
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: true,
        },
      }),
    );
    ADD_SCHEDULE_OPERATOR({
      state,
      dispatch,
      payload,
      emp_email: '',
      date: new Date(),
      openNotificationToast,
    });
    handleToggleModal('modal_schedule', false);
  };

  const handleSubmitUpdateSchedule = () => {
    const payload = {
      empId: idUpdate,
      fullName: employee_full_name,
      phone: employee_phone,
      email: employee_email,
      maNV: employee_code,
      phong_ban: employee_department,
      province: employee_province,
      zone: employee_zone,
      status: status_employee?.value === 'true' ? true : false,
    };
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'schedule_operator',
        value: {
          isLoading: true,
        },
      }),
    );
    EDIT_SCHEDULE_OPERATOR({
      state,
      dispatch,
      payload,
      emp_email: '',
      date: new Date(),
      openNotificationToast,
    });
    handleToggleModal('modal_schedule', false);
  };

  const markedDates = fList(list_schedule_operator).reduce((result, event) => {
    var {date} = {...event};
    if (!result[date]) {
      result[date] = {
        dots: [
          {
            key: 1,
            color: colorsSchedule.CA_SANG,
          },
        ],
        marked: true,
        selected: false,
        selectedColor: colorsSchedule.PRIMARY_COLOR,
      };
    }
    result[date].dots.push({
      key: 2,
      color: colorsSchedule.CA_TOI,
    });
    return result;
  }, {});

  // ?! FOR CALENDAR KIT
  let eventsCalendarKit = [];
  fList(list_schedule_operator)?.map(item => {
    const {_id, date, dayShift, nightShift} = {...item};
    const data_emp = !radio_schedule?.value
      ? [dayShift, nightShift]
      : radio_schedule?.value === 'CA_SANG'
      ? [dayShift]
      : [nightShift];
    const result = fList(data_emp)?.map((job, _idx) => {
      const {empId} = {...job};
      const {email} = {...empId};
      return {
        ...job,
        _id: _id, // _id schedule
        title: email,
        shiftData: _idx === 0 ? dayShift : nightShift,
        start: !radio_schedule?.value
          ? _idx === 0
            ? moment(date).add(8, 'hours').format('YYYY-MM-DDTHH:mm:ss')
            : moment(date)
                .add(17, 'hours')
                .add(30, 'minutes')
                .format('YYYY-MM-DDTHH:mm:ss')
          : radio_schedule?.value === 'CA_SANG'
          ? moment(date).add(8, 'hours').format('YYYY-MM-DDTHH:mm:ss')
          : moment(date)
              .add(17, 'hours')
              .add(30, 'minutes')
              .format('YYYY-MM-DDTHH:mm:ss'),
        end: !radio_schedule?.value
          ? _idx === 0
            ? moment(date)
                .add(17, 'hours')
                .add(30, 'minutes')
                .format('YYYY-MM-DDTHH:mm:ss')
            : moment(date)
                .add(8, 'hours')
                .add(1, 'days')
                .format('YYYY-MM-DDTHH:mm:ss')
          : radio_schedule?.value === 'CA_SANG'
          ? moment(date)
              .add(17, 'hours')
              .add(30, 'minutes')
              .format('YYYY-MM-DDTHH:mm:ss')
          : moment(date)
              .add(8, 'hours')
              .add(1, 'days')
              .format('YYYY-MM-DDTHH:mm:ss'),
        color: _idx === 1 ? '#3A5CCC' : useHandleColorScheduleOperator(
          !radio_schedule?.value
            ? _idx === 0
              ? 'Ca Sáng'
              : 'Ca Tối'
            : radio_schedule?.value === 'CA_SANG'
            ? 'Ca Sáng'
            : 'Ca Tối',
          colorsSchedule,
        ),
      };
    });
    eventsCalendarKit.push(...result);
  });
  const RenderEventContentCalendarKit = ({event}) => {
    const {empId, title, start, end, _id, shiftData} = {...event};
    const {fullName, maNV, phone, phong_ban, province, zone} = {...empId};
    const startDate = moment(start).format('HH:mm DD.MM.YYYY');
    const endDate = moment(end).format('HH:mm DD.MM.YYYY');
    return (
      <View style={tw.style('flex-col gap-1 flex-1 p-1 py-3')} key={_id}>
        <TouchableOpacity
          style={tw.style('flex items-end justify-end w-full')}
          activeOpacity={0.8}
          onPress={() => handleClickEdit(_id, shiftData)}>
          <IconCP name="create-outline" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={tw.style('text-[10px] text-black')}>
          <IconCP name="person-outline" size={12} color="#000" />{' '}
          {title || EMPTY_CHAR}
        </Text>
        <Text style={tw.style('text-[10px] text-black')}>
          <IconCP name="document-text-outline" size={12} color="#000" />{' '}
          {fullName || EMPTY_CHAR}
        </Text>
        <Text style={tw.style('text-[10px] text-black')}>
          <IconCP name="call-outline" size={12} color="#000" />{' '}
          {phone || EMPTY_CHAR}
        </Text>
        <Text style={tw.style('text-[10px] text-black')}>
          <IconCP name="timer-outline" size={12} color="#000" />{' '}
          {startDate || EMPTY_CHAR} đến {endDate || EMPTY_CHAR}
        </Text>
      </View>
    );
  };
  // ?!

  const RenderChildrenFilter = () => {
    return (
      <>
        <ScrollView
          contentContainerStyle={tw.style('')}
          nestedScrollEnabled
          style={tw.style('flex-grow')}>
          <CustomSelectCP
            dataList={DATA_NHAN_SU}
            label="Nhân sự trực"
            placeholder="Chọn email nhân sự"
            selectList={email_filter}
            onSelectValue={val => handleChangeForm('email_filter', val)}
            isQuantityInitData
            quantityDataInit={20}
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            styleInput={tw.style('p-1')}
            idActive="email_filter"
            isActiveDropDown={activeDropDown === 'email_filter'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw.style('font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Chọn Ca Trực
            </Text>
            <View style={tw`flex-row gap-2 flex-wrap`}>
              <RadioGroupCP
                dataOptions={DATA_RADIO_SCHEDULE}
                valueSelect={radio_schedule}
                style={tw`p-1`}
                setValSelect={val => handleChangeForm('radio_schedule', val)}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={tw.style(
            `flex-row items-center justify-end gap-2 py-2 mt-2 ${
              Platform.OS === 'ios' ? 'mb-5' : 'mb-0'
            }`,
            // {
            //   paddingBottom: Platform.OS === 'ios' ? 200 : 0,
            // },
          )}>
          <ButtonCP
            iconName="trash-bin-outline"
            titleIcon="Xóa filter"
            colorIcon="#ffffff"
            sizeIcon={17}
            colorBG="#ff0000"
            colorBorder="#ff0000"
            variant="contained"
            onPress={() => {
              dispatch(
                SET_DATA_PAYLOAD({
                  key: 'schedule_operator',
                  value: {
                    date_filter: '',
                    email_filter: null,
                  },
                }),
              );
            }}
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
              handleChangeForm('isLoading', true);
              GET_LIST_SCHEDULE_OPERATOR_BY_FILTER({
                state,
                dispatch,
                emp_email: email_filter || '',
                date: (tabActive === 'view_1' ? month : fromDate) || new Date(),
                openNotificationToast,
              });
              handleChangeForm('isFilter', false);
            }}
            styleContainer={tw.style('p-1 flex-1')}
          />
        </View>
      </>
    );
  };

  return {
    isLoading,
    isFilter,
    formattedDate,
    refreshing,
    list_schedule_operator,
    modal_schedule,
    modal_schedule_detail,
    scheduleFilter,
    DATA_NHAN_SU,
    DATA_RADIO_SCHEDULE,
    DATA_STATUS,
    data_filter_form,
    markedDates,
    eventsCalendarKit,
    date_filter,
    radio_schedule,
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
  };
};
