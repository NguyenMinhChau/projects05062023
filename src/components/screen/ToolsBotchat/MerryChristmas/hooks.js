import React from 'react';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';
import {GET_INFO_USER_MERRY_CHRISTMAS} from '../../../../services/toolsBotchat/MerryChristmas';

export const useMerryChristMas = () => {
  const {state, dispatch} = useAppContext();
  const {isLoading, data_code, user_info_program} =
    state.set_data.merry_christmas_inf;
  const {currentUser} = state.set_data;
  const {openNotificationToast} = useNotificationToast();

  React.useEffect(() => {
    GET_INFO_USER_MERRY_CHRISTMAS({
      state,
      dispatch,
      emailUser: currentUser.email,
      openNotificationToast,
    });
  }, []);

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'merry_christmas_inf',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'merry_christmas_inf',
        value: {
          isLoading: false,
          user_info_program: null,
          data_code: null,
        },
      }),
    );
  };

  return {
    isLoading,
    user_info_program,
    data_code,

    handleChangeValue,
    handleReset,
  };
};
