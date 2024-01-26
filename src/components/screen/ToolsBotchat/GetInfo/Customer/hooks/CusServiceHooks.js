import React from 'react';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import moment from 'moment';
import {Text, TouchableOpacity, View} from 'react-native';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {fList} from '../../../../../../utils/array.utils';
import tw from '../../../../../../styles/twrnc.global';
import {downloadFileLocal} from '../../../../../../utils/file.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {
  GET_FILTER_CUSTOMER_SERVICE,
  GET_INFO_CUS_SERVICE,
} from '../../../../../../services/toolsBotchat/GetInfo/Customer';
import {useGetColorThemeDisplay} from '../../../../../../utils/appearance.utils';
import AccordionCP from '../../../../../General/AccordionCP';
import {IconCP} from '../../../../../../utils/icon.utils';
import DialogCP from '../../../../../General/Dialog/DialogCP';

export const useCusServiceHooks = () => {
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    data_chat_history,
    ip_dev,
    type_dev,
    result_botChat,
    area,
    zone,
    province,
    branch,
    dataFilter,
  } = state.set_data.tools_chat;
  const {currentUser} = state.set_data;
  const viewShotRef = React.useRef(null);
  const {openNotificationToast} = useNotificationToast();
  const {colors} = useGetColorThemeDisplay();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isProcessSend, setIsProcessSend] = React.useState(false);

  const [dropDownBranch, setDropDownBranch] = React.useState(false);
  const [dropDownIpDev, setDropDownIpDev] = React.useState(false);
  const [dropDownTypeDev, setDropDownTypeDev] = React.useState(false);
  const [isVisibleOption, setIsVisibleOption] = React.useState(true);
  const [isShowGpon, setIsShowGpon] = React.useState(true);
  const [isShowMacIPwan, setIsShowMacIPwan] = React.useState(false);
  const [isDataMacIPwan, setIsDataMacIPwan] = React.useState(null);

  // React.useEffect(() => {
  //     CallApiFilter();
  // }, [branch, ip_dev, type_dev]);

  const startFuncLoading = dispatch => {
    return dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          isLoading: true,
        },
      }),
    );
  };
  const endFuncLoading = dispatch => {
    return dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          isLoading: false,
        },
      }),
    );
  };

  const handleChange = (key, val) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          ...state.set_data.tools_chat,
          [key]: val,
        },
      }),
    );
  };

  const handleBackNavigate = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          ...state.set_data.tools_chat,
          result_botChat: null,
          dataFilter: null,
          area: [],
          zone: [],
          province: [],
          branch: [],
          ip_dev: [],
          type_dev: [],
        },
      }),
    );
  };

  const onCapture = React.useCallback(
    uri => {
      downloadFileLocal(
        uri,
        `Thong_tin_kiem_tra_DV_KHG_${ip_dev} - ${type_dev}`,
        'png',
        () => startFuncLoading(dispatch),
        () => endFuncLoading(dispatch),
      );
    },
    [ip_dev, type_dev],
  );

  //   CONFIG VIEW
  const CallApiFilter = () => {
    const payload = {
      area,
      zone,
      province,
      branch,
      ipDev: [ip_dev],
      typeDev: [type_dev],
    };
    GET_FILTER_CUSTOMER_SERVICE({
      state,
      dispatch,
      payload,
      openNotificationToast,
    });
  };

  const {ipDev_filter, typeDev_filter} = {...dataFilter};

  const DATA_IP_DEV_FILTER = fList(ipDev_filter)?.map(item => {
    return {
      label: item,
      value: item,
    };
  });

  const DATA_TYPE_DEV_FILTER = fList(typeDev_filter)?.map(item => {
    return {
      label: item,
      value: item,
    };
  });

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          ...state?.set_data.tools_chat,
          dataFilter: null,
          area: [],
          zone: [],
          province: [],
          branch: [],
          ip_dev: [],
          type_dev: [],
        },
      }),
    );
  };

  const handleGetInfoCusService = () => {
    GET_INFO_CUS_SERVICE({
      state,
      dispatch,
      ipDev: ip_dev,
      typeDev: type_dev,
      openNotificationToast,
    });
  };

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

  const RenderItem = ({item, index}) => {
    return (
      <>
        {Object.entries(item || {})?.map(([key, value], _idx) => {
          const {
            ipDev,
            access_to_customer,
            customer_to_access,
            mac_online_pon,
          } = {
            ...value,
          };
          const isCheckMacOnline = Object.entries(mac_online_pon || {}).every(
            ([key_mac, val_mac], _idx_mac) => {
              const {result_port} = {...val_mac};
              return result_port;
            },
          );
          return (
            <>
              <AccordionCP
                key={_idx}
                toggleDropDown={() => {
                  setIsShowGpon(!isShowGpon);
                }}
                open={isShowGpon}
                defaultOpen={isShowGpon}
                TitleCustom={() => {
                  return (
                    <View
                      style={tw.style(
                        'flex-row w-full items-center justify-between py-2',
                      )}>
                      <Text
                        style={tw.style('text-[14px] p-0 font-bold', {
                          color: colors.BLACK_COLOR,
                        })}>
                        {key + ' - ' + ipDev}
                      </Text>
                      <RenderIconCheckStatus
                        status={
                          isCheckMacOnline &&
                          access_to_customer &&
                          customer_to_access
                        }
                      />
                    </View>
                  );
                }}
                styleRow={tw.style('p-0 pl-1 m-0')}
                styleTitle={tw.style(
                  'text-[#243c7c] text-[14px] p-0 font-bold',
                )}
                RenderItemCustom={() => {
                  return (
                    <>
                      <View
                        style={tw.style(
                          'flex-col w-full bg-gray-100 rounded-lg overflow-hidden',
                        )}>
                        {/* LUỒNG ACCESS/IPTV */}
                        <View style={tw.style('flex-row w-full')}>
                          <View
                            style={tw.style(
                              `flex-2 p-2 items-center justify-center font-medium border-b-[1px] border-r-[0.5px] border-white ${
                                access_to_customer
                                  ? 'bg-green-200'
                                  : 'bg-red-200'
                              }`,
                            )}>
                            <Text style={tw.style('text-black text-[13px]')}>
                              Luồng Access xuống KHG
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              `flex-2 p-2 items-center justify-center font-medium border-b-[1px] border-l-[0.5px] border-white ${
                                customer_to_access
                                  ? 'bg-green-200'
                                  : 'bg-red-200'
                              }`,
                            )}>
                            <Text style={tw.style('text-black text-[13px]')}>
                              Luồng IPTV lên Access
                            </Text>
                          </View>
                        </View>
                        {/* THEAD */}
                        <View
                          style={tw.style(
                            'flex-row items-center justify-between w-full',
                          )}>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Port
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Port Status
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Total Mac
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Mac Online
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Result
                            </Text>
                          </View>
                        </View>
                        {/* TBODY */}
                        {Object.entries(mac_online_pon || {})
                          .sort((a, b) => {
                            return (
                              Number(a?.[0]?.split('/')?.[1] || 0) -
                              Number(b?.[0]?.split('/')?.[1] || 0)
                            );
                          })
                          .map(([key_mac, val_mac], _idx_mac) => {
                            const {
                              online_mac,
                              total_mac,
                              mac_ipwan,
                              status,
                              result_port,
                            } = {
                              ...val_mac,
                            };
                            return (
                              <View
                                key={_idx_mac}
                                style={tw.style(
                                  'flex-row items-center justify-between w-full',
                                )}>
                                <View
                                  style={tw.style(
                                    'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                  )}>
                                  <Text
                                    style={tw.style(
                                      'text-[13px] capitalize text-black',
                                    )}>
                                    {key_mac}
                                  </Text>
                                </View>
                                <View
                                  style={tw.style(
                                    'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                  )}>
                                  <Text
                                    style={tw.style('text-[13px] text-black')}>
                                    {status}
                                  </Text>
                                </View>
                                <View
                                  style={tw.style(
                                    'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                  )}>
                                  <Text
                                    style={tw.style('text-[13px] text-black')}>
                                    {total_mac}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    setIsShowMacIPwan(true);
                                    setIsDataMacIPwan({
                                      key: key_mac,
                                      val: mac_ipwan,
                                    });
                                  }}
                                  style={tw.style(
                                    `flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white relative ${
                                      status === 'DOWN'
                                        ? ''
                                        : result_port
                                        ? 'bg-green-200'
                                        : 'bg-red-200'
                                    }`,
                                  )}>
                                  <Text
                                    style={tw.style('text-[13px] text-black')}>
                                    {online_mac}
                                  </Text>
                                  <View
                                    style={tw.style(
                                      'absolute bottom-0 right-0',
                                    )}>
                                    <IconCP
                                      name="expand-outline"
                                      size={10}
                                      color="#ebb619"
                                    />
                                  </View>
                                </TouchableOpacity>
                                <View
                                  style={tw.style(
                                    'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                  )}>
                                  <RenderIconCheckStatus status={result_port} />
                                </View>
                              </View>
                            );
                          })}
                      </View>
                    </>
                  );
                }}
              />
              <DialogCP
                visible={isShowMacIPwan}
                setVisible={setIsShowMacIPwan}
                styleDialog={tw`mx-10`}
                TitleCustom={() => {
                  return (
                    <Text
                      style={tw.style(
                        'ml-4 mt-3 font-bold capitalize text-[18px]',
                        {
                          color: colors.BLACK_COLOR,
                        },
                      )}>
                      {isDataMacIPwan?.key}
                    </Text>
                  );
                }}>
                <View
                  style={tw.style(`p-4 rounded-md w-full mt-3`, {
                    backgroundColor: colors.BACKGROUND_CARD,
                  })}>
                  {fList(isDataMacIPwan?.val).length > 0 ? (
                    fList(isDataMacIPwan?.val).map((val_ip, _idx_ip) => {
                      const [ip, ip_val] = Object.entries(val_ip || {})?.[0];
                      return (
                        <View
                          key={_idx_ip}
                          style={tw.style(
                            'flex-row w-full justify-between items-center mb-1 gap-2 text-[13px]',
                          )}>
                          <Text style={tw.style({color: colors.BLACK_COLOR})}>
                            {ip}
                          </Text>
                          <Text style={tw.style('text-[#0984e3]')}>
                            {ip_val === 'None' ? '-' : ip_val}
                          </Text>
                        </View>
                      );
                    })
                  ) : (
                    <Text
                      style={tw.style(
                        'text-black text-[14px] italic text-center mt-3',
                      )}>
                      Không có dữ liệu
                    </Text>
                  )}
                </View>
              </DialogCP>
            </>
          );
        })}
      </>
    );
  };

  const checkSubmit = ip_dev?.length > 0 && type_dev?.length > 0;

  return {
    isLoading,
    currentUser,
    data_chat_history,
    ip_dev,
    type_dev,
    result_botChat,
    area,
    zone,
    province,
    branch,
    dataFilter,
    viewShotRef,
    currentPage,
    isProcessSend,
    dropDownBranch,
    dropDownIpDev,
    dropDownTypeDev,
    isVisibleOption,
    DATA_IP_DEV_FILTER,
    DATA_TYPE_DEV_FILTER,
    checkSubmit,

    setDropDownBranch,
    setDropDownIpDev,
    setDropDownTypeDev,
    setIsVisibleOption,
    setCurrentPage,
    setIsProcessSend,
    handleChange,
    handleBackNavigate,
    onCapture,
    CallApiFilter,
    handleReset,
    handleGetInfoCusService,
    RenderItem,
  };
};
