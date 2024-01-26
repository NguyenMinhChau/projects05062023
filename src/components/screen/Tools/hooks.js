import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {
  GET_JOB_BY_ID,
  GET_LIST_ALL_DEVICE_TABLE,
  GET_LIST_JOB_DEVICE_TOOL_SYSTEM,
} from '../../../services/tools';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import {useRefreshList} from '../../../utils/refreshList.utils';
import {
  TASK_TYPE,
  TYPE_JOB,
  useColorThemeTools,
  useHandleColor,
} from './config';
import tw from '../../../styles/twrnc.global';
import {fList} from '../../../utils/array.utils';
import {GET_USER_LIST_BY_ROLE} from '../../../services/user';
import moment from 'moment';
import 'moment/locale/vi';
import {getProvincFromPop} from '../../../utils/string.utils';
import {IconCP} from '../../../utils/icon.utils';
import {useColorThemeToolsDetail} from '../ToolsConfigDetail/config';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import FastImageCP from '../../General/FastImageCP';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {yyyy_mm, yyyy_mm_dd} from '../../../utils/TimerFormat';
import RenderTagCP from '../../General/RenderTag';

export const useToolsConfigHooks = () => {
  const {state, dispatch} = useAppContext();
  const {refreshing, onRefresh} = useRefreshList();
  const {colors} = useColorThemeToolsDetail();
  const {colors: colorsTools} = useColorThemeTools();
  const {openNotificationToast} = useNotificationToast();

  const [visibleCalendar, setVisibleCalendar] = React.useState(false);

  const {
    currentUser,
    tools_config: {
      list_job,
      isLoading,
      form_data: {type_job, month_list_job, day_list_job, pop_name_list},
    },
    pop_info: {table_pop_info, pop_auto_complete, pop_with_filter},
    dataByObjId,
    appearance_display,
  } = state.set_data;
  const {
    tools_config: {
      modal_new_plan_options,
      modal_add_new_plan,
      modal_detail_plan,
    },
  } = state.set_toggle;

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
  // ?! FETCH API
  useEffect(() => {
    GET_LIST_JOB_DEVICE_TOOL_SYSTEM({
      month: month_list_job,
      date: moment(
        day_list_job.includes('Thg') ? new Date() : day_list_job,
      ).format('YYYY-MM-DD'),
      dispatch,
      state,
      openNotificationToast,
    });
  }, [month_list_job, day_list_job]);
  useEffect(() => {
    if (pop_name_list.length > 0) {
      GET_LIST_ALL_DEVICE_TABLE({
        list_pop_name: pop_name_list,
        dispatch,
        state,
      });
    }
  }, [pop_name_list]);
  useEffect(() => {
    GET_USER_LIST_BY_ROLE({
      taskType: 'REBOOT_POP',
      dispatch,
      state,
      openNotificationToast,
    });
    // GET_TABLE_POP_INFO({dispatch, state, page: 1, limit: 99999999999, openNotificationToast});
    // GET_POP_AUTO_COMPLETE({dispatch, state, openNotificationToast});
  }, [type_job]);
  useEffect(() => {
    // GET_TABLE_POP_WITH_FILTER({dispatch, state, page: 1, limit: 9999, openNotificationToast});
  }, []);
  // ?!

  // ?! HANDLE DATA FROM API
  // ? GET POP INFO
  const dataPopInfo = table_pop_info
    .sort((a, b) => `${a?._pop_name}`.localeCompare(`${b?._pop_name}`))
    .map(({_pop_name, ...others}) => ({
      value: _pop_name,
      label: _pop_name,
    }));
  // ? GET POP WITH FILTER
  const dataPopFilter = fList(pop_with_filter)
    .map(i => ({
      label: i?.pop_name,
      value: i?.pop_name,
      group_pop: i?.group_pop || 'POP',
    }))
    .sort((a, b) => `${a.value}`.localeCompare(`${b.value}`));
  // ? GET POP BY ROLE USER (provinceOptions)
  const dataPopAutoComplete = pop_auto_complete
    .sort((a, b) => `${a}`.localeCompare(`${b}`))
    .filter(i => {
      const pCode = getProvincFromPop(i);

      return currentUser?.provinceOptions?.includes(pCode);
    })
    .map(_pop_name => {
      return {
        value: _pop_name,
        label: `${_pop_name}`,
      };
    });
  // ?!

  // ?! HANDLE DATE/TIME
  const handleDateConfirm = (date, name) => {
    if (date) {
      handleChangeForm(name, date);
    }
    handleToggleModal('date_picker_visible', false);
  };

  const handleTimeConfirm = (time, name) => {
    if (time) {
      handleChangeForm(name, time);
    }
    handleToggleModal('time_picker_visible', false);
  };

  const handleDatePress = () => {
    handleToggleModal('date_picker_visible', true);
  };

  const handleTimePress = () => {
    handleToggleModal('time_picker_visible', true);
  };

  const handleDayPress = day => {
    handleChangeForm('day_list_job', day.dateString);
  };
  // ?!

  // ?! CALENDAR
  // Custom calendar header
  const renderHeader = date => {
    // Extract the month and year from the date object
    const month = date.toString('MMMM');
    const year = date.getFullYear().toString();

    // Customize the header as desired
    return (
      <View style={tw.style('items-center justify-center flex-col')}>
        <Text
          style={tw.style('text-[22px] font-bold', {
            color: colors.BLACK_COLOR,
          })}>
          {month}
        </Text>
        <Text style={tw.style('text-[15px] text-[#8F9BB3]')}>{year}</Text>
      </View>
    );
  };

  // Custom calendar arrow
  const renderArrow = direction => {
    // Customize arrow icon here
    const iconName =
      direction === 'left' ? 'chevron-back-outline' : 'chevron-forward-outline';
    return <IconCP name={iconName} color={colors.BLACK_COLOR} size={20} />;
  };
  // Format day_list_job date string
  const formattedDate = moment(
    day_list_job.includes('Thg') ? new Date() : day_list_job,
  )
    .locale('vi')
    .format('dddd, DD/MM/YYYY');
  //Loop through events and create marked dates with dots
  const markedDates = list_job.reduce((result, event) => {
    // Get the event date
    var {_id: date, listJob} = event;

    // If no event for this date, create one
    if (!result[date]) {
      result[date] = {
        dots: [],
        marked: true,
        selected: false,
        selectedColor: '#4b6ef3',
      };
    }

    listJob.map(item => {
      const {typeJob} = item;
      // Set color for dot base on event type
      let dotColor = useHandleColor(typeJob, colorsTools);

      // if (date === moment().format('YYYY-MM-DD')) {
      //   dotColor = 'transparent';
      // }

      // Add dot to current event date
      result[date].dots.push({
        key: result[date].dots.length,
        color: dotColor,
      });
    });

    return result;
  }, {});
  // ?!

  const handleCreateEvent = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          isEdit: false,
          form_data: {
            month_list_job: yyyy_mm(new Date()),
            day_list_job: yyyy_mm_dd(new Date()),
            type_job: '',
            type_job_vi: '',
            job_name: '',
            nhan_su_th: '',
            pop_name: '',
            pop_name_other: '',
            pop_name_list: [],
            name_switch_di_list: [],
            pop_curr_list: [],
            model_name: '',
            model_dev: '',
            name_switch_di: '',
            pop_new_curr: '',
            pop_new_curr_val: '',
            config_pop_other: '',
            date: new Date(),
            time: new Date(),
            date_end: new Date(),
            time_end: new Date(),
            model_sw_ce: '',
            number_link_dn: '',
            type_link_dn: '',
            status_exc: {label: 'Chưa thực thi', value: 'WAITING'},
            type_reboot_pop: {
              label: 'Song Song (Giống BotChat)',
              value: 'SYNCHRONOUS',
            },
            type_run_pop: {label: 'Thực thi thủ công', value: 'MANUAL'},
            gpon_power: null,
            _idUpdate: '',
          },
        },
      }),
    );
    handleToggleModal('modal_new_plan_options', true);
  };

  const handleClickEditPlan = dataByObjId => {
    const {deviceInfo, jobInfo} = {...dataByObjId};

    const {
      typeJob,
      jobName,
      taskRunner,
      scheduleRunTime,
      typeRebootPOP,
      typeRun,
      _id,
      expectTimeStart,
      expectTimeFinish,
    } = {
      ...jobInfo,
    };

    const {info} = {...(deviceInfo?.[0] || deviceInfo)};

    const {popName, nameDev, pop, modelDev, links} = {...info};

    const listPOP = fList(deviceInfo).map(item => {
      const {_id} = {...item};
      const {popName} = {..._id};
      return popName;
    });

    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_toggle.tools_config,
          modal_add_new_plan: true,
          modal_detail_plan: false,
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_data.tools_config,
          isEdit: true,
          form_data: {
            ...state.set_data.tools_config.form_data,
            type_job: typeJob,
            type_job_vi: typeJob
              ? TASK_TYPE.filter(x => x.value === typeJob)?.[0]?.description ||
                typeJob
              : 'Chưa định nghĩa tên kế hoạch',
            job_name: jobName,
            nhan_su_th: taskRunner,
            pop_name_list: listPOP,
            time: new Date(scheduleRunTime || expectTimeStart),
            date: new Date(scheduleRunTime || expectTimeStart),
            date_end: new Date(expectTimeFinish),
            time_end: new Date(expectTimeFinish),
            type_reboot_pop:
              typeRebootPOP === 'SYNCHRONOUS'
                ? {label: 'Song Song (Giống BotChat)', value: 'SYNCHRONOUS'}
                : {label: 'Tuần tự', value: 'ASYNCHRONOUS'},
            type_run_pop:
              typeRun === 'MANUAL'
                ? {label: 'Thực thi thủ công', value: 'MANUAL'}
                : {label: 'Thực thi tự động', value: 'AUTO'},
            pop_name: popName,
            name_switch_di: nameDev,
            pop_new_curr_val: pop,
            model_sw_ce: {label: modelDev, value: modelDev},
            model_dev: {label: modelDev, value: modelDev},
            number_link_dn: {label: links?.toString(), value: links},
            // config_pop_other: {label: popName, value: popName},
            // pop_name_other: ''
            _idUpdate: _id,
          },
        },
      }),
    );
  };

  const eventFilter =
    list_job?.filter(
      event =>
        event._id ===
        moment(day_list_job.includes('Thg') ? new Date() : day_list_job).format(
          'YYYY-MM-DD',
        ),
    )[0]?.listJob || [];

  const widthDevice = useWindowDimensions().width;

  const RenderEvent = ({item, index}) => {
    if (
      item?.date ===
      moment(day_list_job.includes('Thg') ? new Date() : day_list_job).format(
        'YYYY-MM-DD',
      )
    ) {
      const {typeJob, timeStart, jobName, taskRunner, status} = item;

      const eventVi = typeJob
        ? TASK_TYPE.filter(x => x?.value === typeJob)?.[0]?.description ||
          typeJob
        : 'Chưa định nghĩa tên KH';

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
        <TouchableOpacity
          activeOpacity={0.8}
          style={tw.style(
            'flex-1 rounded-lg overflow-hidden border-[1px] relative',
            {
              backgroundColor: colors.BACKGROUND_CARD,
              borderColor: useHandleColor(typeJob, colorsTools),
              // width: widthDevice
            },
          )}
          onPress={() => {
            GET_JOB_BY_ID({id_job: item?._id, dispatch, openNotificationToast});
            handleToggleModal('modal_detail_plan', true);
          }}
          key={index}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              GET_JOB_BY_ID({
                id_job: item?._id,
                dispatch,
                openNotificationToast,
              });
              handleToggleModal('modal_detail_plan', true);
            }}
            style={tw.style(
              'w-full absolute z-50 h-full bg-transparent',
            )}></TouchableOpacity>
          <View style={tw.style('flex-1 flex-col')}>
            <View style={tw.style('flex-1 flex-row relative')}>
              <View
                style={tw.style('w-[30%] p-1 items-center justify-center', {
                  borderColor: useHandleColor(typeJob, colorsTools),
                  backgroundColor: useHandleColor(typeJob, colorsTools) + '8a',
                })}>
                <View
                  style={tw.style(
                    'w-[70px] h-[70px] items-center justify-center p-[8px] bg-white rounded-full',
                  )}>
                  <FastImageCP
                    uriLocal={uriImage}
                    resizeMode="cover"
                    onTouchStart={() => {}}
                    style={tw.style('w-full h-full min-h-0')}
                  />
                </View>
              </View>
              <View
                style={tw.style(
                  'flex-1 flex-col justify-start items-start p-1',
                )}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    GET_JOB_BY_ID({
                      id_job: item?._id,
                      dispatch,
                      openNotificationToast,
                    });
                    handleToggleModal('modal_detail_plan', true);
                  }}
                  style={tw.style('w-full flex-col pl-1')}>
                  <RowDialogCP
                    leftNameIcon="receipt-outline"
                    sizeLeftIcon={15}
                    label="Loại kế hoạch"
                    value={eventVi}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                  <RowDialogCP
                    leftNameIcon="person-outline"
                    sizeLeftIcon={15}
                    label="Người thực hiện"
                    value={taskRunner}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                  <RowDialogCP
                    leftNameIcon="reader-outline"
                    sizeLeftIcon={15}
                    label="Tên kế hoạch"
                    value={jobName}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                  {status && (
                    <RowDialogCP
                      leftNameIcon="chatbubbles-outline"
                      sizeLeftIcon={15}
                      label="Trạng thái"
                      ValueCP={() => {
                        return (
                          <RenderTagCP
                            tag={status}
                            textReplace={
                              status === 'WAITING'
                                ? 'Chưa thực hiện'
                                : status === 'RUNNING'
                                ? 'Đang chạy KH'
                                : status === 'EXECUTING'
                                ? 'Đang thực thi'
                                : status === 'TIMEOUT'
                                ? 'Đã hết thời gian'
                                : status === 'CLOSE'
                                ? 'Đã đóng KH'
                                : status === 'ERROR'
                                ? 'KH bị lỗi'
                                : status === 'PENDING'
                                ? 'Đang chờ do có thiết bị lỗi'
                                : status === 'DELETE'
                                ? 'Đã xóa KH'
                                : status === 'CONFIG_OK'
                                ? 'Đã cấu hình xong'
                                : status === 'CHECK_SERVICE_OK'
                                ? 'Đã kiểm tra DV xong'
                                : status === 'CHECK_SERVICE_NOK'
                                ? 'Kiểm tra DV chưa thành công'
                                : status === 'DONE'
                                ? 'Đã hoàn thành'
                                : 'Không có trạng thái'
                            }
                            styleContainer={tw.style('p-1')}
                            styleText={tw.style('text-[10px] text-white')}
                          />
                        );
                      }}
                      styleRow={tw.style('py-1 px-0 mt-0')}
                      styleLabel={tw.style('text-[10px]')}
                      styleVal={tw.style('text-[10px]')}
                      noBullet
                      noneBorderBottom
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return {
    modal_new_plan_options,
    modal_add_new_plan,
    modal_detail_plan,
    type_job,
    dataPopInfo,
    dataPopFilter,
    dataPopAutoComplete,
    day_list_job,
    list_job,
    isLoading,
    dataByObjId,
    month_list_job,
    formattedDate,
    eventFilter,
    refreshing,
    markedDates,
    appearance_display,
    visibleCalendar,

    setVisibleCalendar,
    handleChangeForm,
    handleToggleModal,
    handleTimePress,
    handleTimeConfirm,
    handleDayPress,
    handleDatePress,
    handleDateConfirm,
    onRefresh,
    handleCreateEvent,
    RenderEvent,
    renderHeader,
    renderArrow,
    handleClickEditPlan,
  };
};
