import React from 'react';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import moment from 'moment';
import {Text, TouchableOpacity, View} from 'react-native';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import tw from '../../../../../../styles/twrnc.global';
import {downloadFileLocal} from '../../../../../../utils/file.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {GET_INFO_MODEM_KHG} from '../../../../../../services/toolsBotchat/GetInfo/Customer';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import {useGetColorThemeDisplay} from '../../../../../../utils/appearance.utils';

export const useCusModemHooks = () => {
  const {state, dispatch} = useAppContext();
  const {data_chat_history, contract, result_botChat, isLoading} =
    state.set_data.tools_chat;
  const {currentUser} = state.set_data;
  const viewShotRef = React.useRef(null);
  const {openNotificationToast} = useNotificationToast();
  const {colors} = useGetColorThemeDisplay();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isProcessSend, setIsProcessSend] = React.useState(false);

  const [dropDownContract, setDropDownContract] = React.useState(false);
  const [isVisibleOption, setIsVisibleOption] = React.useState(true);

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
          contract: null,
        },
      }),
    );
  };

  const onCapture = React.useCallback(
    uri => {
      downloadFileLocal(
        uri,
        `Thong_tin_modem_KHG_${contract}`,
        'png',
        () => startFuncLoading(dispatch),
        () => endFuncLoading(dispatch),
      );
    },
    [contract],
  );

  //   CONFIG VIEW
  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          ...state?.set_data.tools_chat,
          dataFilter: null,
          contract: null,
        },
      }),
    );
  };

  const handleGetInfoContract = () => {
    GET_INFO_MODEM_KHG({
      state,
      dispatch,
      contract: contract,
      openNotificationToast,
    });
  };

  const RenderItem = ({item, index}) => {
    const {
      dia_chi,
      phan_cong,
      thoi_gian_len_checklist,
      thoi_gian_su_dung,
      thong_so_thi_cong,
      thong_tin_ban_dau,
      mo_ta,
    } = {...item};
    return (
      <>
        <View
          style={tw.style(
            'flex-col gap-2 p-2 rounded-lg border border-[#007aff]',
            {},
          )}>
          <RowDialogCP
            label="Địa chỉ"
            value={dia_chi}
            styleRow={tw.style('flex-1 py-0')}
            noneBorderBottom
            noBullet
            styleVal={tw.style('text-[12px]')}
          />
          <RowDialogCP
            label="Phân công"
            value={phan_cong}
            styleRow={tw.style('flex-1 py-0')}
            noneBorderBottom
            noBullet
            styleVal={tw.style('text-[12px]')}
          />
          <RowDialogCP
            label="Thời gian lên checklist"
            value={thoi_gian_len_checklist}
            styleRow={tw.style('flex-1 py-0')}
            noneBorderBottom
            noBullet
            styleVal={tw.style('text-[12px]')}
          />
          <RowDialogCP
            label="Thời gian sử dụng"
            value={thoi_gian_su_dung}
            styleRow={tw.style('flex-1 py-0')}
            noneBorderBottom
            noBullet
            styleVal={tw.style('text-[12px]')}
          />
          <RowDialogCP
            label="Thông số thi công"
            value={thong_so_thi_cong}
            styleRow={tw.style('flex-1 py-0')}
            noneBorderBottom
            noBullet
            styleVal={tw.style('text-[12px]')}
          />
          <RowDialogCP
            label="Thông tin ban đầu"
            value={thong_tin_ban_dau}
            styleRow={tw.style('flex-1 py-0')}
            noneBorderBottom
            noBullet
            styleVal={tw.style('text-[12px]')}
          />
          <Text
            style={tw.style('font-bold text-[15px] mx-2', {
              color: colors.BLACK_COLOR,
            })}>
            Mô tả
          </Text>
          {Object.entries(mo_ta || {}).map(([key, value], index) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={tw.style('flex-row gap-2 mx-2')}
                key={index}>
                <Text
                  style={tw.style('text-[12px] font-bold', {
                    color: colors.BLACK_COLOR,
                  })}>
                  {key}
                </Text>
                <Text
                  style={tw.style(
                    'text-[12px] font-bold flex-grow w-1 leading-5',
                    {
                      color: colors.BLACK_COLOR,
                    },
                  )}>
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  const checkSubmit = contract?.length > 0;

  return {
    isLoading,
    currentUser,
    data_chat_history,
    contract,
    result_botChat,
    viewShotRef,
    currentPage,
    isProcessSend,
    dropDownContract,
    isVisibleOption,
    checkSubmit,

    setDropDownContract,
    setIsVisibleOption,
    setCurrentPage,
    setIsProcessSend,
    handleChange,
    handleBackNavigate,
    onCapture,
    handleReset,
    handleGetInfoContract,
    RenderItem,
  };
};
