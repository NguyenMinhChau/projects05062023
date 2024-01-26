import React from 'react';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {fList} from '../../../../../../utils/array.utils';
import {View} from 'react-native';
import {downloadFileLocal} from '../../../../../../utils/file.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {
  GET_FILTER_PORT_TRANS_AND_CUS_OF_PON_OLT,
  GET_INFO_KHG_PORT_PON,
} from '../../../../../../services/toolsBotchat/GetInfo/Port';
import tw from '../../../../../../styles/twrnc.global';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import {useGetColorThemeDisplay} from '../../../../../../utils/appearance.utils';

export const useCusOfPonHooks = () => {
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    data_chat_history,
    name_dev,
    port,
    pop_name,
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
        `Thong_tin_KHG_port_pon_${name_dev} - ${port}`,
        'png',
        () => startFuncLoading(dispatch),
        () => endFuncLoading(dispatch),
      );
    },
    [name_dev, port],
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
    GET_FILTER_PORT_TRANS_AND_CUS_OF_PON_OLT({
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
    GET_FILTER_PORT_TRANS_AND_CUS_OF_PON_OLT({
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
    GET_FILTER_PORT_TRANS_AND_CUS_OF_PON_OLT({
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

  const handleGetInfoCusOfPon = () => {
    GET_INFO_KHG_PORT_PON({
      state,
      dispatch,
      name_dev: name_dev,
      port: port?.replace('P0/', '').replace('G0/', ''),
      openNotificationToast,
    });
  };

  const RenderItem = ({item, index}) => {
    const itemMap = item?.split(' - ');
    return (
      <>
        <View
          key={index}
          style={tw.style('flex-col rounded-lg border border-[#007aff]', {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <View
            style={tw.style(
              'flex-row flex-wrap justify-between items-center p-1',
            )}>
            <RowDialogCP
              label=""
              leftNameIcon="bookmark-outline"
              sizeLeftIcon={16}
              colorLeftIcon="#007aff"
              value={itemMap[0].replace('/', '')}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style(
                'text-left text-[15px] font-bold text-[#007aff]',
              )}
            />
            <RowDialogCP
              label=""
              value={itemMap[1]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              styleVal={tw.style('text-[#10ac84] text-[12px]')}
              noneBorderBottom
              noBullet
            />
          </View>
          <View
            style={tw.style(
              'flex-row flex-wrap justify-between items-center p-1',
            )}>
            <RowDialogCP
              label=""
              value={itemMap[2]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style('text-left text-[#10ac84] text-[12px]')}
            />
            <RowDialogCP
              label=""
              value={itemMap[3]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              styleVal={tw.style('text-[#10ac84] text-[12px]')}
              noneBorderBottom
              noBullet
            />
          </View>
          <View
            style={tw.style(
              'flex-row flex-wrap justify-between items-center p-1',
            )}>
            <RowDialogCP
              label=""
              value={itemMap[4]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style('text-left text-[#10ac84] text-[12px]')}
            />
            <RowDialogCP
              label=""
              value={itemMap[5]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              styleVal={tw.style('text-[#10ac84] text-[12px]')}
              noneBorderBottom
              noBullet
            />
          </View>
          <View
            style={tw.style(
              'flex-row flex-wrap justify-between items-center p-1',
            )}>
            <RowDialogCP
              label=""
              value={itemMap[6]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style('text-left text-[#10ac84] text-[12px]')}
            />
            <RowDialogCP
              label=""
              value={itemMap[7]}
              styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
              styleVal={tw.style('text-[#10ac84] text-[12px]')}
              noneBorderBottom
              noBullet
            />
          </View>
          <View
            style={tw.style(
              'flex-row flex-wrap justify-between items-center p-1',
            )}>
            <RowDialogCP
              label=""
              value={itemMap[8]}
              styleRow={tw.style('flex-1 py-0 mt-0')}
              noneBorderBottom
              noBullet
              styleVal={tw.style('text-left text-[#10ac84] text-[12px]')}
            />
            <RowDialogCP
              label=""
              value={itemMap[9]}
              styleRow={tw.style('flex-2 py-0 mt-0')}
              styleVal={tw.style('text-[#10ac84] text-[12px]')}
              noneBorderBottom
              noBullet
            />
          </View>
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
    name_dev,
    port,
    pop_name,
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
    DATA_POP_NAME_FILTER,
    DATA_NAME_DEV_FILTER,
    DATA_PORT_FILTER,
    checkSubmit,

    setIsVisibleOption,
    setCurrentPage,
    setIsProcessSend,
    handleChange,
    handleBackNavigate,
    onCapture,
    handleReset,
    handleGetInfoCusOfPon,
    RenderItem,
    CallApiFilterPop,
    CallApiFilterNameDev,
  };
};
