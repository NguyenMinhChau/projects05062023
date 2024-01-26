import React from 'react';
import {
  GET_LIST_PRIZE,
  GET_LIST_USER_INFO_PROGRAM,
  GET_LIST_USER_JOIN,
  GET_LIST_USER_NO_PRIZE,
  GET_LIST_USER_PRIZE,
} from '../../../../services/toolsBotchat/DialINF';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';

export const useDialInf = () => {
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    isVisibleResult,
    isVisibleUserJoin,
    isVisiblePrize,
    prize,
    list_user_join,
    qrcode_image,
    list_prize,
    list_user_prize,
    list_user_no_prize,
    user_info_program,
  } = state.set_data.dial_inf;
  const {currentUser} = state.set_data;
  const {openNotificationToast} = useNotificationToast();

  // LẤY DANH SÁCH CÁC GIẢI THƯỞNG
  const CallApiGetPrize = () => {
    GET_LIST_PRIZE({
      state,
      dispatch,
      openNotificationToast,
    });
  };
  // LẤY DANH SÁCH CÁC USER THAM GIA
  const CallApiGetUserJoin = () => {
    GET_LIST_USER_JOIN({
      state,
      dispatch,
      openNotificationToast,
      isPrize: '',
      emailUser: '',
    });
  };
  // LẤY THÔNG TIN USER THAM GIA CHƯƠNG TRÌNH
  const CallApiGetUserInfoProgram = () => {
    GET_LIST_USER_INFO_PROGRAM({
      state,
      dispatch,
      openNotificationToast,
      isPrize: '',
      emailUser: currentUser?.email,
    });
  };
  // LẤY DANH SÁCH CÁC USER ĐÃ TRÚNG THƯỞNG
  const CallApiGetUserPrize = () => {
    GET_LIST_USER_PRIZE({
      state,
      dispatch,
      openNotificationToast,
      isPrize: true,
      emailUser: '',
    });
  };
  // LẤY DANH SÁCH CÁC USER CHƯA TRÚNG THƯỞNG
  const CallApiGetUserNoPrize = () => {
    GET_LIST_USER_NO_PRIZE({
      state,
      dispatch,
      openNotificationToast,
      isPrize: false,
      emailUser: '',
    });
  };

  React.useEffect(() => {
    CallApiGetPrize();
    CallApiGetUserJoin();
    CallApiGetUserPrize();
    CallApiGetUserNoPrize();
    CallApiGetUserInfoProgram();
  }, []);

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleChangePhoto = response => {
    if (response) {
      const payload = {
        ...response?.assets?.[0],
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName || `image_${Date.now()}`,
        type: response?.assets?.[0]?.type,
      };
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'dial_inf',
          value: {
            qrcode_image: payload,
          },
        }),
      );
    }
  };

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dial_inf',
        value: {
          isLoading: true,
        },
      }),
    );
  };

  return {
    isLoading,
    isVisibleResult,
    isVisibleUserJoin,
    isVisiblePrize,
    prize,
    list_user_join,
    list_prize,
    list_user_prize,
    list_user_no_prize,
    user_info_program,
    qrcode_image,

    handleChangePhoto,
    handleChangeValue,
    handleReset,
    CallApiGetPrize,
    CallApiGetUserJoin,
    CallApiGetUserPrize,
    CallApiGetUserNoPrize,
    CallApiGetUserInfoProgram,
  };
};
