import React from 'react';
import {Text, View} from 'react-native';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {fList} from '../../../../../../utils/array.utils';
import tw from '../../../../../../styles/twrnc.global';
import {downloadFileLocal} from '../../../../../../utils/file.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {
  GET_FILTER_PORT_TRANS_AND_CUS_OF_PON,
  GET_INFO_TRANSCEIVER,
} from '../../../../../../services/toolsBotchat/GetInfo/Port';
import {useGetColorThemeDisplay} from '../../../../../../utils/appearance.utils';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';

export const useTransceiverHooks = () => {
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    data_chat_history,
    pop_name,
    name_dev,
    port,
    port_crc,
    transceiver,
    result_botChat,
    area,
    zone,
    province,
    branch,
    dataFilter,
  } = state.set_data.tools_chat;
  const {currentUser} = state.set_data;
  const viewShotRef = React.useRef(null);
  const {colors} = useGetColorThemeDisplay();
  const {openNotificationToast} = useNotificationToast();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isProcessSend, setIsProcessSend] = React.useState(false);
  //   CONFIG VIEW
  const [isVisibleOption, setIsVisibleOption] = React.useState(true);

  React.useEffect(() => {
    CallApiFilter();
  }, [branch, pop_name, name_dev]);

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
          pop_name: [],
          name_dev: [],
          port: [],
        },
      }),
    );
  };

  const onCapture = React.useCallback(
    uri => {
      downloadFileLocal(
        uri,
        `Thong_tin_module_quang_${pop_name}`,
        'png',
        () => startFuncLoading(dispatch),
        () => endFuncLoading(dispatch),
      );
    },
    [pop_name],
  );

  //   CONFIG VIEW
  const {zone: zoneUser, codeProvince: codeProvinceUser} = {...currentUser};

  const CallApiFilter = () => {
    const payload = {
      area: [],
      zone: [],
      province: [],
      branch: typeof branch === 'string' ? [branch] : branch,
      popName: typeof pop_name === 'string' ? [pop_name] : pop_name,
      nameDev: typeof name_dev === 'string' ? [name_dev] : name_dev,
      type: [],
      model: [],
      func: [],
      status: [],
      group: [],
      keyword: '',
    };
    GET_FILTER_PORT_TRANS_AND_CUS_OF_PON({
      state,
      dispatch,
      payload,
      openNotificationToast,
      setIsVisibleOption,
    });
  };

  const CallApiFilterPop = () => {
    const payload = {
      area: [],
      zone: [],
      province: [],
      branch: typeof branch === 'string' ? [branch] : branch,
      popName: [],
      nameDev: [],
      type: [],
      model: [],
      func: [],
      status: [],
      group: [],
      keyword: '',
    };
    GET_FILTER_PORT_TRANS_AND_CUS_OF_PON({
      state,
      dispatch,
      payload,
      openNotificationToast,
      setIsVisibleOption,
    });
  };

  const CallApiFilterNameDev = () => {
    const payload = {
      area: [],
      zone: [],
      province: [],
      branch: typeof branch === 'string' ? [branch] : branch,
      popName: typeof pop_name === 'string' ? [pop_name] : pop_name,
      nameDev: [],
      type: [],
      model: [],
      func: [],
      status: [],
      group: [],
      keyword: '',
    };
    GET_FILTER_PORT_TRANS_AND_CUS_OF_PON({
      state,
      dispatch,
      payload,
      openNotificationToast,
      setIsVisibleOption,
    });
  };

  const {pop_name_filter, name_dev_filter, port_filter} = {...dataFilter};

  const DATA_POP_NAME_FILTER = fList(pop_name_filter)?.map(item => {
    return {
      label: item,
      value: item,
    };
  });
  const DATA_NAME_DEV_FILTER = fList(name_dev_filter)?.map(item => {
    return {
      label: item,
      value: item,
    };
  });
  const DATA_PORT_FILTER = fList(port_filter)?.map(item => {
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
          pop_name: [],
          name_dev: [],
          port: [],
        },
      }),
    );
  };

  const handleGetInfoModuleQuang = () => {
    GET_INFO_TRANSCEIVER({
      state,
      dispatch,
      pop_name: pop_name,
      name_dev: name_dev,
      port: port,
      port_crc: 'false',
      transceiver: 'true',
      openNotificationToast,
    });
  };

  const RenderItem = ({item, index}) => {
    const {
      device_name,
      ip_device,
      port_name,
      operation_status,
      serial_number,
      part_number,
      vendor_name,
      manu_date,
      speed,
      wave_length,
      connector_type,
      rx,
      rxH,
      rxHw,
      rxL,
      rxLw,
      tx,
      txH,
      txHw,
      txL,
      txLw,
      temperature,
      transceiver_type,
    } = {...item};
    return (
      <>
        <View
          style={tw.style(
            'flex-col gap-1 p-2 rounded-lg border border-[#007aff]',
          )}>
          <View
            style={tw.style('flex-row flex-wrap justify-between items-center')}>
            <RowDialogCP
              label=""
              leftNameIcon="bookmark-outline"
              sizeLeftIcon={16}
              colorLeftIcon="#007aff"
              value={pop_name}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style(
                'text-left text-[15px] font-bold text-[#007aff]',
              )}
            />
            <RowDialogCP
              label=""
              value={device_name}
              styleRow={tw.style('flex-2 py-0 mt-0 gap-0')}
              styleVal={tw.style(' font-medium ')}
              noneBorderBottom
              noBullet
            />
          </View>
          <View
            style={tw.style('flex-row flex-wrap justify-between items-center')}>
            <RowDialogCP
              label=""
              value={ip_device}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style('text-left text-[15px] font-medium ')}
            />
            <RowDialogCP
              label=""
              value={port_name}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              styleVal={tw.style(' font-medium ')}
              noneBorderBottom
              noBullet
            />
          </View>
        </View>
        <View
          style={tw.style(
            'flex-col gap-2 p-2 mt-2 rounded-lg border border-[#e67e22]',
            {},
          )}>
          {item?.transceiver !== 'UNINSTALLED' ? (
            <>
              <RowDialogCP
                label="Port Status"
                value={operation_status}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Serial"
                value={serial_number}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Part Number"
                value={part_number}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Vendor"
                value={vendor_name}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Manu Date"
                value={manu_date}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Speed"
                value={speed}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Wave Length"
                value={wave_length}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Connector"
                value={connector_type}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Distance"
                ValueCP={() => {
                  return (
                    <View style={tw.style('flex-col items-end gap-1')}>
                      {item?.transfer_distance?.split(',').map((x, _idx) => {
                        return (
                          <Text
                            key={_idx}
                            style={tw.style('text-[#e67e22] font-bold')}>
                            {x}
                          </Text>
                        );
                      })}
                    </View>
                  );
                }}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="RX Power"
                value={rx + ' dBM'}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="RX High"
                value={rxH + ' dBM (Warning: ' + rxHw + ' dBM)'}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="RX Low"
                value={rxL + ' dBM (Warning: ' + rxLw + ' dBM)'}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="TX Power"
                value={tx + ' dBM'}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="TX High"
                value={txH + ' dBM (Warning: ' + txHw + ' dBM)'}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="TX Low"
                value={txL + ' dBM (Warning: ' + txLw + ' dBM)'}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Temperature"
                value={temperature}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
              <RowDialogCP
                label="Transceiver type"
                value={transceiver_type}
                styleRow={tw.style('flex-1 py-0')}
                noneBorderBottom
                noBullet
                // styleVal={tw.style('text-[#e67e22]')}
                // styleLabel={tw.style('text-[#10ac84]')}
              />
            </>
          ) : (
            <Text
              style={tw.style('text-center my-1', {
                color: colors.BLACK_COLOR,
              })}>
              Port không gắn module
            </Text>
          )}
        </View>
      </>
    );
  };

  const checkSubmit =
    branch?.length > 0 &&
    pop_name?.length > 0 &&
    name_dev?.length > 0 &&
    port?.length > 0;

  return {
    isLoading,
    currentUser,
    data_chat_history,
    pop_name,
    name_dev,
    port,
    port_crc,
    transceiver,
    result_botChat,
    area,
    zone,
    province,
    branch,
    dataFilter,
    viewShotRef,
    currentPage,
    isProcessSend,
    isVisibleOption,
    DATA_NAME_DEV_FILTER,
    DATA_POP_NAME_FILTER,
    DATA_PORT_FILTER,
    checkSubmit,

    setIsVisibleOption,
    setCurrentPage,
    setIsProcessSend,
    handleChange,
    handleBackNavigate,
    onCapture,
    CallApiFilter,
    handleReset,
    handleGetInfoModuleQuang,
    RenderItem,
    CallApiFilterPop,
    CallApiFilterNameDev,
  };
};
