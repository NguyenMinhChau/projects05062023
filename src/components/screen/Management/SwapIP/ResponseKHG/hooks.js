import {Text, TouchableOpacity, View} from 'react-native';
import useAppContext from '../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../Context/AppContext.reducer';
import tw from '../../../../../styles/twrnc.global';
import {useColorThemeSwapIP} from '../config';
import {
  GET_CHART_DATA,
  GET_FILTER_SWAP_IP,
  GET_LIST_PROGRAM_ID,
  GET_LIST_SWAP_IP,
} from '../../../../../services/management/Swapip';
import React from 'react';
import moment from 'moment';
import RowDialogCP from '../../../../General/Dialog/RowDialogCP';
import {fList} from '../../../../../utils/array.utils';
import {useNotificationToast} from '../../../../../utils/notification_toast.utils';
import RenderTagCP from '../../../../General/RenderTag';
import {IconCP, TYPE_ICON} from '../../../../../utils/icon.utils';
import {EMPTY_CHAR} from '../../../../../helpers/_empty';
import useDebounce from '../../../../../utils/hooks/useDebounce';
import ScreenNoData from '../../../../General/ScreenNoData';

export const useSwapIPResponseKhg = () => {
  const {state, dispatch} = useAppContext();
  const {colors} = useColorThemeSwapIP();
  const {openNotificationToast} = useNotificationToast();
  const [indexTarget, setIndexTarget] = React.useState(null);
  const {
    isLoading,
    isFilter,
    fromDate,
    toDate,
    actions,
    keyword,
    modem,
    dataChart,
    plugin_status,
    date_time_picker,
    list_swap_ip,
    visible_modal,
    visible_modal_plugin,
    selected_item,
    data_filter,
    data_program_id,
    program_id,
  } = state.set_data.swap_ip;
  const {page, limit} = state.set_data.pagination;
  const keywordDebounce = useDebounce(keyword, 1000);

  const DATA_PROGRAM_ID = fList(data_program_id).map(item => {
    return {
      label: `${item?.nameProgram} - ${
        item?.active ? 'Active' : 'Not Active'
      } (${item?.timeStart} - ${item?.timeFinish})`,
      value: item?.nameProgram,
    };
  });
  const idProgram = data_program_id?.filter(
    x => x.nameProgram === program_id,
  )?.[0]?._id;

  const CallApiGetProgramId = () => {
    GET_LIST_PROGRAM_ID({
      state,
      dispatch,
      openNotificationToast,
    });
  };

  const CallApiGetDataChart = () => {
    GET_CHART_DATA({
      state,
      dispatch,
      openNotificationToast,
      programId: idProgram,
      fromDate: moment(fromDate).format('YYYY-MM-DD'),
      toDate: moment(toDate).format('YYYY-MM-DD'),
    });
  };

  const CallAPI = () => {
    const payload = {
      keyword: keywordDebounce,
      action: actions,
      modem: modem,
      pluginStatus: plugin_status,
    };
    GET_LIST_SWAP_IP({
      state,
      dispatch,
      payload,
      page,
      limit,
      programId: idProgram,
      fromDate: moment(fromDate).format('YYYY-MM-DD'),
      toDate: moment(toDate).format('YYYY-MM-DD'),
      openNotificationToast,
    });
  };

  React.useEffect(() => {
    CallApiGetProgramId();
  }, []);

  React.useEffect(() => {
    CallApiGetDataChart();
  }, []);

  React.useEffect(() => {
    CallAPI();
    CallApiGetDataChart();
  }, [page, limit, keywordDebounce, program_id]);

  React.useEffect(() => {
    GET_FILTER_SWAP_IP({
      state,
      dispatch,
      fromDate: moment(fromDate).format('YYYY-MM-DD'),
      toDate: moment(toDate).format('YYYY-MM-DD'),
      programId: idProgram,
      payload: {
        keyword,
        action: actions,
        modem: modem,
        pluginStatus: plugin_status,
      },
      openNotificationToast,
    });
  }, [
    actions,
    modem,
    plugin_status,
    keywordDebounce,
    fromDate,
    toDate,
    program_id,
  ]);

  const handleChange = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'swap_ip',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleBack = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'pagination',
        value: {
          page: 1,
          limit: 10,
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'swap_ip',
        value: {
          isLoading: true,
          isFilter: false,
          list_swap_ip: null,
          list_khg_swap_ip: null,
          dataChart: null,
          fromDate: new Date(new Date().setDate(new Date().getDate() - 7)),
          toDate: new Date(),
          data_filter: null,
          data_program_id: [],
          program_id: null,
          actions: [],
          province: [],
          modem: [],
          plugin_status: [],
          keyword: '',
          date_time_picker: false,
          visible_modal: false,
          visible_modal_plugin: false,
          selected_item: null,
        },
      }),
    );
  };

  const handleDateConfirm = (date, name) => {
    if (date) {
      handleChange(name, date);
    }
    handleChange('date_time_picker', false);
  };

  const handleDatePress = () => {
    handleChange('date_time_picker', true);
  };

  const RenderItem = ({item, index}) => {
    const {
      soHD,
      action,
      time,
      fullName,
      mac_client,
      mac_ont,
      phone,
      disablePlugin,
      sendChecklist,
    } = {
      ...item,
    };
    const {status} = {...disablePlugin};
    const {status: statusChecklist} = {...sendChecklist};
    const borderColor =
      action === 'OK' ? '#10B981' : action === 'EXIT' ? '#EF4444' : '#f39c12';
    return (
      <View
        key={index}
        style={tw.style('rounded-xl p-3 pt-2 border', {
          backgroundColor: colors.BACKGROUND_CARD,
          borderColor: borderColor,
        })}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleChange('visible_modal', true);
            handleChange('selected_item', item);
          }}
          style={tw.style('flex-col')}>
          <View style={tw.style('flex-row items-center justify-between gap-1')}>
            <Text
              style={tw.style('text-[16px] font-bold', {
                color: colors.SUCCESS_COLOR,
              })}>
              {soHD}
            </Text>
            <View
              style={tw.style('flex-row items-center justify-between gap-2')}>
              <View style={tw.style('flex-row items-center gap-[2px]')}>
                <IconCP
                  name="time-outline"
                  size={15}
                  color={colors.BLACK_COLOR}
                />
                <Text
                  style={tw.style('text-[12px]', {
                    color: colors.BLACK_COLOR,
                  })}>
                  {time}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw.style('flex-row items-center gap-[4px]')}>
            <Text
              style={tw.style('text-[15px]', {
                color: colors.BLACK_COLOR,
              })}>
              {fullName || EMPTY_CHAR}
            </Text>
            {phone && (
              <View style={tw.style('flex-row items-center gap-[4px]')}>
                <Text
                  style={tw.style('text-[13px]', {
                    color: colors.BLACK_COLOR,
                  })}>
                  -
                </Text>
                <Text
                  style={tw.style('text-[13px]', {
                    color: colors.BLACK_COLOR,
                  })}>
                  {
                    <Text
                      style={tw.style('text-[13px]', {
                        color: colors.BLACK_COLOR,
                      })}>
                      {indexTarget === index ? phone : '***'}
                    </Text>
                  }
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (indexTarget === index) {
                      setIndexTarget(null);
                      return;
                    }
                    setIndexTarget(index);
                  }}>
                  <IconCP
                    name={
                      indexTarget === index ? 'eye-outline' : 'eye-off-outline'
                    }
                    size={15}
                    color={colors.BLACK_COLOR}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={tw.style('flex-row flex-wrap items-center gap-1 my-2')}>
            <View
              style={tw.style(
                'rounded-xl px-[5px] py-[3px] shadow-md bg-white',
              )}>
              <Text style={tw.style('text-[12px] text-black')}>
                <Text style={tw.style('font-bold')}>Mac Client:</Text>{' '}
                <Text>{mac_client}</Text>
              </Text>
            </View>
            <View
              style={tw.style(
                'rounded-xl px-[5px] py-[3px] shadow-md bg-white',
              )}>
              <Text style={tw.style('text-[12px] text-black')}>
                <Text style={tw.style('font-bold')}>MacONT:</Text>{' '}
                <Text>{mac_ont}</Text>
              </Text>
            </View>
          </View>
          <View
            style={tw.style('w-full border-t border-dashed my-2', {
              borderColor: colors.BLACK_COLOR,
            })}></View>
          <View style={tw.style('flex-row items-center justify-between')}>
            <View
              // activeOpacity={0.8}
              // onPress={() => {
              //   handleChange('visible_modal_plugin', true);
              //   handleChange('selected_item', item);
              // }}
              style={tw.style('flex-row items-center gap-1')}>
              <IconCP
                name="tools"
                size={16}
                color={colors.BLACK_COLOR}
                typeIcon={TYPE_ICON.iconMaterial}
              />
              <Text style={tw.style({color: colors.BLACK_COLOR})}>Plugin </Text>
              <RenderTagCP
                tag={status ? 'DISABLE' : 'ENABLE'}
                textReplace={status ? 'DISABLE' : 'ENABLE'}
                styleText={tw.style('text-[10px] text-white')}
              />
            </View>
            <View style={tw.style('flex-row items-center gap-1')}>
              <IconCP
                name="gesture-tap"
                size={16}
                color={colors.BLACK_COLOR}
                typeIcon={TYPE_ICON.iconMaterial}
              />
              <Text style={tw.style({color: colors.BLACK_COLOR})}>Action </Text>
              <RenderTagCP
                tag={action}
                styleText={tw.style('text-[10px] text-white')}
              />
            </View>
          </View>
          <View style={tw.style('flex-row items-center justify-between mt-2')}>
            <View style={tw.style('flex-row items-center gap-1')}>
              <IconCP
                name="gesture-tap"
                size={16}
                color={colors.BLACK_COLOR}
                typeIcon={TYPE_ICON.iconMaterial}
              />
              <Text style={tw.style({color: colors.BLACK_COLOR})}>
                Checklist{' '}
              </Text>
              <RenderTagCP
                tag={statusChecklist ? 'Đã có checklist' : 'Chưa có checklist'}
                textReplace={
                  statusChecklist ? 'Đã có checklist' : 'Chưa có checklist'
                }
                styleText={tw.style('text-[10px] uppercase text-white')}
                styleContainer={tw.style('rounded-md', {
                  backgroundColor: statusChecklist ? '#42a046' : '#EF4444',
                  borderColor: statusChecklist ? '#42a046' : '#EF4444',
                })}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderDetail = () => {
    const {
      soHD,
      action,
      time,
      fullNameSoHD,
      mac_client,
      mac_ont,
      modem,
      userAgent,
      disablePlugin,
      sendChecklist,
    } = {
      ...selected_item,
    };
    const {status} = {...disablePlugin};
    const {status: statusChecklist} = {...sendChecklist};
    return (
      <>
        <View style={tw`px-2`}>
          <Text
            style={tw`text-center font-bold text-[15px] text-blue-500 px-1 leading-5`}>
            {fullNameSoHD}
          </Text>
        </View>
        <RowDialogCP
          noBullet
          label="Số HĐ"
          value={soHD}
          styleRow={tw`px-3 py-2`}
        />
        <RowDialogCP
          noBullet
          label="Mac Client"
          value={mac_client}
          styleRow={tw`px-3 py-2`}
        />
        <RowDialogCP
          noBullet
          label="Mac Ont"
          value={mac_ont}
          styleRow={tw`px-3 py-2`}
        />
        <RowDialogCP
          noBullet
          label="Action"
          ValueCP={() => {
            return (
              <RenderTagCP
                tag={action}
                styleText={tw.style('text-[10px] text-white')}
              />
            );
          }}
          styleRow={tw`px-3 py-2`}
        />

        <RowDialogCP
          noBullet
          label="Modem"
          value={modem}
          styleRow={tw`px-3 py-2`}
        />
        <RowDialogCP
          noBullet
          label="TG"
          value={time}
          styleRow={tw`px-3 py-2`}
        />
        <RowDialogCP
          noBullet
          label="User agent"
          value={userAgent}
          styleRow={tw`px-3 py-2`}
        />
        <RowDialogCP
          noBullet
          label="Plugin"
          ValueCP={() => {
            return (
              <RenderTagCP
                tag={status ? 'DISABLE' : 'ENABLE'}
                styleText={tw.style('text-[10px] h-[16px] text-white')}
              />
            );
          }}
          styleRow={tw`px-3 py-3`}
          noneBorderBottom
        />
        <RenderStatusPlugin />
        <RowDialogCP
          noBullet
          label="Checklist"
          ValueCP={() => {
            return (
              <RenderTagCP
                tag={statusChecklist ? 'Đã có checklist' : 'Chưa có checklist'}
                styleText={tw.style('text-[10px] uppercase text-white')}
                styleContainer={tw.style('rounded-md', {
                  backgroundColor: statusChecklist ? '#42a046' : '#EF4444',
                  borderColor: statusChecklist ? '#42a046' : '#EF4444',
                })}
              />
            );
          }}
          styleRow={tw`px-3 py-3`}
          noneBorderBottom
        />
        <RenderStatusChecklist />
      </>
    );
  };

  const {
    action: actionsFilter,
    modem: modemFilter,
    pluginStatus,
  } = {...data_filter};

  const DATA_MODEM = fList(modemFilter?.[0]?.data).map(item => {
    return {
      label: item?.replace(/(\r\n|\n|\r)/gm, ''),
      value: item,
    };
  });

  const DATA_ACTIONS = fList(actionsFilter?.[0]?.data).map(item => {
    return {
      label: item,
      value: item,
    };
  });

  const DATA_PLUGIN_STATUS = fList(pluginStatus?.[0]?.data).map(item => {
    return {
      label: item ? 'DISABLE' : 'ENABLE',
      value: item,
    };
  });

  const IconSuccess = (
    <IconCP
      name="checkmark-circle-outline"
      size={22}
      color={tw.color('green-500')}
    />
  );
  const IconError = (
    <IconCP name="close-circle-outline" size={22} color={tw.color('red-500')} />
  );

  const RenderIconCheckStatus = ({status}) => {
    return status ? IconSuccess : IconError;
  };

  const RenderStatusPlugin = () => {
    const {history = []} = {...selected_item?.disablePlugin};
    return (
      <>
        {fList(history).length > 0 ? (
          <View
            style={tw.style(
              'flex-col w-full bg-gray-100 rounded-lg overflow-hidden',
            )}>
            {/* THEAD */}
            <View
              style={tw.style('flex-row items-center justify-between w-full')}>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  STT
                </Text>
              </View>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  Message
                </Text>
              </View>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  Time
                </Text>
              </View>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  Result
                </Text>
              </View>
            </View>
            {/* TBODY */}
            {fList(history).map((item, _idx) => {
              const {message, result, time} = {...item};
              return (
                <View
                  key={_idx}
                  style={tw.style(
                    'flex-row items-center justify-between w-full',
                  )}>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    <Text style={tw.style('text-[13px] capitalize text-black')}>
                      {_idx + 1 < 10 ? `0${_idx + 1}` : _idx + 1}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    <Text style={tw.style('text-[13px] text-black')}>
                      {message}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    <Text
                      style={tw.style('text-[13px] text-black text-center')}>
                      {time}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    {/* <RenderIconCheckStatus status={result} /> */}
                    <RenderTagCP
                      tag={result ? 'DISABLE' : 'ENABLE'}
                      styleText={tw.style('text-[10px] h-[16px] text-white')}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <ScreenNoData styleContainer={tw.style('w-full h-[80px] flex-0')} />
        )}
      </>
    );
  };

  const RenderStatusChecklist = () => {
    const {history = []} = {...selected_item?.sendChecklist};
    return (
      <>
        {fList(history).length > 0 ? (
          <View
            style={tw.style(
              'flex-col w-full bg-gray-100 rounded-lg overflow-hidden',
            )}>
            {/* THEAD */}
            <View
              style={tw.style('flex-row items-center justify-between w-full')}>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  STT
                </Text>
              </View>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  Message
                </Text>
              </View>
              <View
                style={tw.style(
                  'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                )}>
                <Text style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                  Time
                </Text>
              </View>
            </View>
            {/* TBODY */}
            {fList(history).map((item, _idx) => {
              const {message, result, time} = {...item};
              return (
                <View
                  key={_idx}
                  style={tw.style(
                    'flex-row items-center justify-between w-full',
                  )}>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    <Text style={tw.style('text-[13px] capitalize text-black')}>
                      {_idx + 1 < 10 ? `0${_idx + 1}` : _idx + 1}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    <Text style={tw.style('text-[13px] text-black')}>
                      {message}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                    )}>
                    <Text
                      style={tw.style('text-[13px] text-black text-center')}>
                      {time}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <ScreenNoData styleContainer={tw.style('w-full h-[80px] flex-0')} />
        )}
      </>
    );
  };

  // CHART
  const {dataBarChart} = {...dataChart};

  const DATA_BAR_CHART = Object.entries(dataBarChart || {}).map(
    ([key, value], _idx1) => {
      return Object?.entries(value || {}).map(([key2, value2], _idx2) => {
        return {
          label: moment(key).format('DD/MM/YYYY'),
          value: value2,
          spacing: 50,
          labelWidth: 50,
          action: key2,
          barWidth: 30,
          topLabelComponent: () => (
            <Text
              style={{
                color:
                  key2 === 'OK'
                    ? '#10B981'
                    : key2 === 'EXIT'
                    ? '#EF4444'
                    : '#f39c12',
                fontSize: 8,
                marginBottom: 6,
              }}>
              {value2?.toLocaleString()}
            </Text>
          ),
          frontColor:
            key2 === 'OK' ? '#10B981' : key2 === 'EXIT' ? '#EF4444' : '#f39c12',
        };
      });
    },
  );

  const DATA_BAR_CHART_SPACING = fList(DATA_BAR_CHART).map((item1, _idx1) => {
    return fList(item1)?.map((item2, _idx2) => {
      return {
        ...item2,
        label: _idx2 === 0 ? item2?.label : '',
        labelWidth: _idx2 === 0 ? 80 : 0,
        spacing: _idx2 < item1.length - 1 ? 0 : 30,
      };
    });
  });

  const DATA_BAR_CHART_SPREAD = DATA_BAR_CHART_SPACING.reduce((acc, cur) => {
    return [...acc, ...cur];
  }, []);

  const DATA_TITLE_CHART = [
    {
      title: 'NO RESPONSE',
      color: '#f39c12',
    },
    {
      title: 'EXIT',
      color: '#EF4444',
    },
    {
      title: 'OK',
      color: '#10B981',
    },
  ];

  return {
    isLoading,
    isFilter,
    fromDate,
    toDate,
    actions,
    keyword,
    modem,
    plugin_status,
    date_time_picker,
    list_swap_ip,
    visible_modal,
    program_id,
    visible_modal_plugin,
    DATA_MODEM,
    DATA_ACTIONS,
    DATA_PLUGIN_STATUS,
    DATA_PROGRAM_ID,
    DATA_BAR_CHART_SPREAD,
    DATA_TITLE_CHART,

    handleBack,
    CallAPI,
    RenderItem,
    RenderDetail,
    handleChange,
    handleDateConfirm,
    handleDatePress,
    RenderStatusPlugin,
    RenderStatusChecklist,
    CallApiGetDataChart,
  };
};
