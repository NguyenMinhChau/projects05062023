import React from 'react';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {View} from 'react-native';
import {downloadFileLocal} from '../../../../../../utils/file.utils';
import {GET_INFO_GROUP_POINT} from '../../../../../../services/toolsBotchat/GetInfo/Device';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import tw from '../../../../../../styles/twrnc.global';
import {fList} from '../../../../../../utils/array.utils';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import {GET_FILTER_PORT_TRANS_AND_CUS_OF_PON} from '../../../../../../services/toolsBotchat/GetInfo/Port';
import {useGetColorThemeDisplay} from '../../../../../../utils/appearance.utils';

export const useGroupPointHooks = () => {
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    branch,
    pop_name,
    name_dev,
    data_chat_history,
    group_point,
    result_botChat,
    dataFilter,
  } = state.set_data.tools_chat;
  const {currentUser} = state.set_data;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isProcessSend, setIsProcessSend] = React.useState(false);
  const [isVisibleOption, setIsVisibleOption] = React.useState(true);

  const viewShotRef = React.useRef(null);

  const {openNotificationToast} = useNotificationToast();
  const {colors} = useGetColorThemeDisplay();

  React.useEffect(() => {
    if (pop_name?.length) {
      handleChange('group_point', pop_name + '.');
    }
    CallApiFilter();
  }, [branch, pop_name]);

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
          group_point: [],
          area: [],
          zone: [],
          province: [],
          branch: [],
          pop_name: [],
          name_dev: [],
        },
      }),
    );
  };

  const onCapture = React.useCallback(
    uri => {
      const nameFile = `Thong_tin_tap_diem_${group_point}`;
      downloadFileLocal(
        uri,
        nameFile,
        'png',
        () => startFuncLoading(dispatch),
        () => endFuncLoading(dispatch),
      );
    },
    [group_point],
  );

  //   CONFIG VIEW
  const {
    area: areaUser,
    zone: zoneUser,
    codeProvince: codeProvinceUser,
    branchBotChat: branchBotChatUser,
  } = {...currentUser};

  const {pop_name_filter, name_dev_filter} = {...dataFilter};

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

  const DATA_BRANCH_FILTER = branchBotChatUser?.map(item => {
    return {
      label: item,
      value: item,
    };
  });

  const CallApiFilter = () => {
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

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          ...state?.set_data.tools_chat,
          dataFilter: null,
          group_point: [],
          area: [],
          zone: [],
          province: [],
          branch: [],
          pop_name: [],
          name_dev: [],
        },
      }),
    );
  };

  const handleGetInfoGroupPoint = () => {
    GET_INFO_GROUP_POINT({
      state,
      dispatch,
      group_point: group_point,
      openNotificationToast,
    });
  };

  const RenderItem = ({item, index}) => {
    const itemMap = item?.split(' - ');
    return (
      <View style={tw.style('flex-col rounded-lg border border-[#007aff]', {})}>
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
            styleVal={tw.style('text-[12px]', {
              color: colors.BLACK_COLOR,
            })}
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
            styleVal={tw.style('text-left  text-[12px]', {
              color: colors.BLACK_COLOR,
            })}
          />
          <RowDialogCP
            label=""
            value={itemMap[3]}
            styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
            styleVal={tw.style(' text-[12px]', {
              color: colors.BLACK_COLOR,
            })}
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
            styleVal={tw.style('text-left  text-[12px]', {
              color: colors.BLACK_COLOR,
            })}
          />
          <RowDialogCP
            label=""
            value={itemMap[5]}
            styleRow={tw.style('flex-1 py-0 mt-0 gap-0')}
            styleVal={tw.style(' text-[12px]', {
              color: colors.BLACK_COLOR,
            })}
            noneBorderBottom
            noBullet
          />
        </View>
      </View>
    );
  };

  const checkGroupPointFormat = groupPoint => {
    if (groupPoint?.length > 0) {
      const regex = /^[a-zA-Z0-9]{7}\.[0-9]{3}$/;
      const result = regex.test(groupPoint);
      return result;
    }
    return true;
  };

  const checkSubmit =
    branch?.length > 0 &&
    pop_name?.length > 0 &&
    group_point?.length > 0 &&
    checkGroupPointFormat(group_point);

  return {
    isLoading,
    currentUser,
    data_chat_history,
    group_point,
    branch,
    pop_name,
    name_dev,
    result_botChat,
    currentPage,
    isProcessSend,
    viewShotRef,
    isVisibleOption,
    checkSubmit,
    DATA_POP_NAME_FILTER,
    DATA_NAME_DEV_FILTER,
    DATA_BRANCH_FILTER,

    setIsVisibleOption,
    setCurrentPage,
    setIsProcessSend,
    handleChange,
    handleBackNavigate,
    onCapture,
    // CONFIG VIEW
    handleReset,
    handleGetInfoGroupPoint,
    RenderItem,
    CallApiFilter,
    CallApiFilterPop,
    checkGroupPointFormat,
  };
};
