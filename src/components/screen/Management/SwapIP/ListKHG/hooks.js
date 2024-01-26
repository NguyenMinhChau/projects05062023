import React from 'react';
import useAppContext from '../../../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../../../utils/notification_toast.utils';
import {useColorThemeSwapIP} from '../config';
import useDebounce from '../../../../../utils/hooks/useDebounce';
import {fList} from '../../../../../utils/array.utils';
import {SET_DATA_PAYLOAD} from '../../../../Context/AppContext.reducer';
import {
  GET_FILTER_KHG_SWAP_IP,
  GET_FILTER_SWAP_IP,
  GET_LIST_KHG_SWAP_IP,
  GET_LIST_PROGRAM_ID,
  UPDATE_PLUGIN_STATUS_KHG_SWAP_IP,
} from '../../../../../services/management/Swapip';
import moment from 'moment';
import tw from '../../../../../styles/twrnc.global';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IconCP, TYPE_ICON} from '../../../../../utils/icon.utils';
import RenderTagCP from '../../../../General/RenderTag';
import {EMPTY_CHAR} from '../../../../../helpers/_empty';
import {
  CRITICAL_COLOR,
  SUCCESS_COLOR,
} from '../../../../../styles/colors.global';
import {useDialogConfirmToast} from '../../../../../utils/dialog_confirm_toast.utils';

export const useSwapIPListKhg = () => {
  const {state, dispatch} = useAppContext();
  const {currentUser} = state.set_data;
  const {colors} = useColorThemeSwapIP();
  const {openNotificationToast} = useNotificationToast();
  const [indexTarget, setIndexTarget] = React.useState(null);
  const {
    isLoading,
    isFilter,
    fromDate,
    updateMany,
    selected_list,
    toDate,
    typeHandle,
    actions,
    keyword,
    single_click,
    modem,
    province,
    dataChart,
    plugin_status,
    date_time_picker,
    list_khg_swap_ip,
    selected_item,
    data_filter,
    data_program_id,
    program_id,
  } = state.set_data.swap_ip;
  const {page, limit} = state.set_data.pagination;
  const keywordDebounce = useDebounce(keyword, 1000);
  const {openDialogConfirmToast, updatePropsData} = useDialogConfirmToast();
  const {codeGroup, codeRole} = {...currentUser};

  const isAdmin =
    codeGroup?.codeGroup?.toLowerCase() === 'admin' ||
    codeRole?.toLowerCase() === 'admin';

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

  const CallApiGetFilter = () => {
    const payload = {
      modem: modem,
      pluginStatus: plugin_status,
      active: actions,
      province: province,
    };
    GET_FILTER_KHG_SWAP_IP({
      state,
      dispatch,
      payload,
      openNotificationToast,
      programId: idProgram,
    });
  };

  const CallAPI = () => {
    const payload = {
      keyword: keywordDebounce,
      modem: modem,
      pluginStatus: plugin_status,
      active: actions,
      province: province,
    };
    GET_LIST_KHG_SWAP_IP({
      state,
      dispatch,
      payload,
      page,
      limit,
      programId: idProgram,
      openNotificationToast,
    });
  };

  const handleUpdatePlugin = (typeHandle, _listIds = []) => {
    const listIds = selected_list?.map(item => {
      return item?.macONT;
    });
    const payload = {
      macONT: _listIds?.length > 0 ? _listIds : listIds,
    };

    UPDATE_PLUGIN_STATUS_KHG_SWAP_IP({
      state,
      dispatch,
      payload: payload,
      payloadUser: {
        keyword: keywordDebounce,
        modem: modem,
        pluginStatus: plugin_status,
        active: actions,
        province: province,
      },
      page,
      limit,
      openNotificationToast,
      programId: idProgram,
      typeHandle,
    });
    handleChange('updateMany', false);
    handleChange('selected_list', []);
  };

  React.useEffect(() => {
    CallApiGetProgramId();
  }, []);

  React.useEffect(() => {
    CallAPI();
  }, [page, limit, keywordDebounce, program_id]);

  React.useEffect(() => {
    CallApiGetFilter();
  }, [actions, modem, plugin_status, program_id, province]);

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
          selected_item: [],
          typeHandle: null,
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
          single_click: null,
        },
      }),
    );
  };

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

  const handleDateConfirm = (date, name) => {
    if (date) {
      handleChange(name, date);
    }
    handleChange('date_time_picker', false);
  };

  const handleDatePress = () => {
    handleChange('date_time_picker', true);
  };

  const handleSelectKHG = khg => {
    if (khg) {
      let selected = [...selected_list];
      const index = fList(selected)?.findIndex(
        item => item?.macONT === khg?.macONT,
      );
      if (index === -1) {
        selected?.push(khg);
      } else {
        selected?.splice(index, 1);
      }
      handleChange('selected_list', selected);
    }
  };

  const checkSelectedKHG = khg => {
    const index = fList(selected_list).findIndex(
      item => item?.macONT === khg?.macONT,
    );
    return index !== -1;
  };

  const checkAllKHG = () => {
    return selected_list.length === list_khg_swap_ip?.payload?.length;
  };

  const handleSelectedAllKHG = () => {
    if (checkAllKHG()) {
      handleChange('selected_list', []);
    } else {
      handleChange('selected_list', list_khg_swap_ip?.payload);
    }
  };

  const RenderItem = ({item, index}) => {
    const {
      active,
      contract,
      fullName,
      macONT,
      modem,
      pluginInit,
      province: provinceUser,
      updatedAt,
      _id,
    } = {...item};

    const {status} = {...pluginInit};
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          style={tw.style('rounded-xl p-3 pt-2 border', {
            backgroundColor:
              checkSelectedKHG(item) && !updateMany
                ? colors.PRIMARY_COLOR + '1a'
                : colors.BACKGROUND_CARD,
            borderColor: colors.PRIMARY_COLOR,
          })}
          onPress={!updateMany ? () => handleSelectKHG(item) : () => {}}>
          <View style={tw.style('flex-col')}>
            <View
              style={tw.style('flex-row items-center justify-between gap-1')}>
              <View style={tw.style('flex-row items-center gap-[4px]')}>
                <IconCP
                  name="wifi-outline"
                  size={17}
                  color={colors.PRIMARY_COLOR}
                />
                <Text
                  style={tw.style('text-[16px] font-bold', {
                    color: colors.PRIMARY_COLOR,
                  })}>
                  {contract}
                </Text>
              </View>
              <View
                style={tw.style('flex-row items-center justify-between gap-2')}>
                <View style={tw.style('flex-row items-center gap-[2px]')}>
                  <IconCP
                    name="timer-outline"
                    size={15}
                    color={colors.BLACK_COLOR}
                  />
                  <Text
                    style={tw.style('text-[12px]', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {moment(updatedAt)
                      .subtract(7, 'hours')
                      .format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                </View>
                {!updateMany && (
                  <IconCP
                    name={
                      checkSelectedKHG(item)
                        ? 'checkbox-outline'
                        : 'square-outline'
                    }
                    size={15}
                    color={
                      checkSelectedKHG(item)
                        ? colors.PRIMARY_COLOR
                        : colors.BLACK_COLOR
                    }
                  />
                )}
              </View>
            </View>
            <View style={tw.style('flex-row items-center gap-[4px]')}>
              <IconCP
                name="person-outline"
                size={15}
                color={colors.BLACK_COLOR}
              />
              <Text
                style={tw.style('text-[15px]', {
                  color: colors.BLACK_COLOR,
                })}>
                {fullName || EMPTY_CHAR}
              </Text>
            </View>
            <View
              style={tw.style('flex-row flex-wrap items-center gap-1 my-2')}>
              <View
                style={tw.style(
                  'rounded-xl px-[5px] py-[3px] shadow-md bg-white',
                )}>
                <Text style={tw.style('text-[12px] text-black')}>
                  <Text style={tw.style('font-bold')}>Tỉnh:</Text>{' '}
                  <Text>{provinceUser}</Text>
                </Text>
              </View>
              <View
                style={tw.style(
                  'rounded-xl px-[5px] py-[3px] shadow-md bg-white',
                )}>
                <Text style={tw.style('text-[12px] text-black')}>
                  <Text style={tw.style('font-bold')}>MacONT:</Text>{' '}
                  <Text>{macONT}</Text>
                </Text>
              </View>
              <View
                style={tw.style(
                  'rounded-xl px-[5px] py-[3px] shadow-md bg-white',
                )}>
                <Text style={tw.style('text-[12px] text-black')}>
                  <Text style={tw.style('font-bold')}>Modem:</Text>{' '}
                  <Text>{modem?.replace(/(\r\n|\n|\r)/gm, '')}</Text>
                </Text>
              </View>
            </View>
            <View
              style={tw.style('w-full border-t border-dashed my-2', {
                borderColor: colors.BLACK_COLOR,
              })}></View>
            <View style={tw.style('flex-row items-center justify-between')}>
              <View style={tw.style('flex-row items-center gap-1')}>
                <IconCP
                  name="tools"
                  size={16}
                  color={colors.BLACK_COLOR}
                  typeIcon={TYPE_ICON.iconMaterial}
                />
                <Text style={tw.style({color: colors.BLACK_COLOR})}>
                  Plugin{' '}
                </Text>
                <RenderTagCP tag={status ? 'ENABLE' : 'DISABLE'} />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={tw.style('rounded-md px-2 py-1', {
                  backgroundColor: status ? CRITICAL_COLOR : SUCCESS_COLOR,
                })}
                onPress={() => {
                  openDialogConfirmToast({
                    title: 'Thông báo xác nhận điều chỉnh plugin',
                    funcHandle: propsData => {
                      handleUpdatePlugin(status ? 'disable' : 'enable', [
                        macONT,
                      ]);
                      return true;
                    },
                    propsData: {
                      typeHandle: '',
                    },
                    imageLocal: require('../../../../../assets/images/modem_vector.png'),
                    MessageCustom: () => {
                      const [type, setType] = React.useState(null);
                      return (
                        <>
                          <View style={tw.style('max-h-[350px] w-full')}>
                            <ScrollView>
                              <View style={tw.style('flex-col mb-2')}>
                                <Text
                                  style={tw.style('text-[14px] mb-2', {
                                    color: colors.PRIMARY_COLOR,
                                  })}>
                                  Danh sách địa chỉ MAC
                                </Text>
                                <View
                                  style={tw.style('flex-row gap-2 flex-wrap')}>
                                  {[item]?.length > 0 ? (
                                    [item]?.map((item, index) => {
                                      return (
                                        <RenderTagCP
                                          key={index}
                                          tag={item?.macONT}
                                        />
                                      );
                                    })
                                  ) : (
                                    <Text
                                      style={tw.style('text-[16px] leading-6', {
                                        color: colors.BLACK_COLOR,
                                      })}>
                                      Không có dữ liệu
                                    </Text>
                                  )}
                                </View>
                                <Text
                                  style={tw.style('text-[14px] my-2', {
                                    color: colors.PRIMARY_COLOR,
                                  })}>
                                  Trạng thái Plugin:{' '}
                                  <Text
                                    style={tw.style(
                                      'font-bold text-[15px] uppercase',
                                      {
                                        color: status
                                          ? CRITICAL_COLOR
                                          : SUCCESS_COLOR,
                                      },
                                    )}>
                                    {status ? 'DISABLE' : 'ENABLE'}
                                  </Text>
                                </Text>
                              </View>
                            </ScrollView>
                          </View>
                        </>
                      );
                    },
                  });
                }}>
                  <View style={tw.style('flex-row items-center justify-center gap-1 py-[2px')}>
<IconCP
name='settings-outline'
size={16}
color='#fff'
/>
                <Text style={tw.style('text-white font-bold text-[12px]')}>
                  {status ? 'DISABLE' : 'ENABLE'}
                </Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const {
    active: actionsFilter,
    modem: modemFilter,
    pluginStatus,
    province: provinceFilter,
  } = {...data_filter};

  const DATA_MODEM = fList(modemFilter).map(item => {
    return {
      label: item?.replace(/(\r\n|\n|\r)/gm, ''),
      value: item,
    };
  });

  const DATA_ACTIONS = fList(actionsFilter).map(item => {
    return {
      label: item ? 'ACTIVE' : 'NOT ACTIVE',
      value: item,
    };
  });

  const DATA_PLUGIN_STATUS = fList(pluginStatus).map(item => {
    return {
      label: item ? 'ENABLE' : 'DISABLE',
      value: item,
    };
  });

  const DATA_PROVINCE = fList(provinceFilter).map(item => {
    return {
      label: item,
      value: item,
    };
  });

  return {
    isLoading,
    isAdmin,
    isFilter,
    fromDate,
    toDate,
    updateMany,
    selected_list,
    province,
    actions,
    keyword,
    modem,
    plugin_status,
    date_time_picker,
    program_id,
    typeHandle,
    list_khg_swap_ip,
    DATA_MODEM,
    DATA_ACTIONS,
    DATA_PLUGIN_STATUS,
    DATA_PROGRAM_ID,
    DATA_PROVINCE,

    CallAPI,
    handleBack,
    handleChange,
    RenderItem,
    handleDateConfirm,
    handleDatePress,
    checkAllKHG,
    handleSelectedAllKHG,
    handleUpdatePlugin,
  };
};
