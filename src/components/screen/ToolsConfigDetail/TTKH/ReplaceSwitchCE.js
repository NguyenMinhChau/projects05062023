import React from 'react';
import {View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import ButtonCP from '../../../General/ButtonCP';
import {HANDLE_CONFIG_REPLACE_SWITCH_CE} from '../../../../services/tools';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {WARNING_COLOR} from '../../../../styles/colors.global';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {SET_TOGGLE_PAYLOAD} from '../../../Context/AppContext.reducer';
import {TYPE_JOB} from '../../Tools/config';

export default function TTKHReplaceSwitchCE({idTask}) {
  const {dispatch, state} = useAppContext();
  const {openNotifyNotYetCallAPI, openNotificationToast} =
    useNotificationToast();

  const handleConfig = type => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    HANDLE_CONFIG_REPLACE_SWITCH_CE({
      dispatch,
      state,
      step: type,
      _id: idTask,
      typeJob: TYPE_JOB.CONFIG_REPLACE_CE_SWITCH,
      openNotificationToast,
    });
  };

  return (
    <>
      <View
        style={tw`w-full flex-row flex-nowrap items-center justify-between mb-1 px-1 gap-2`}>
        <ButtonCP
          iconName="file-tray-full-outline"
          titleIcon="Cấp phát TN"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder="#40c4aa"
          colorBG="#40c4aa"
          text="Cấp phát TN"
          onPress={() => handleConfig('allocation')}
          styleContainer={tw`flex-1 p-1`}
        />
        <ButtonCP
          iconName="cog-outline"
          titleIcon=" Cấu hình CE"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder="#7635DC"
          colorBG="#7635DC"
          onPress={() => handleConfig('config')}
          styleContainer={tw`flex-1 p-1`}
        />
        {/* 
        <ButtonCP
          iconName="checkmark-circle-outline"
          titleIcon="KT dịch vụ"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder={WARNING_COLOR}
          colorBG={WARNING_COLOR}
          onPress={() => handleConfig('CONFIG_NEW_CE_SWITCH')}
          styleContainer={tw`flex-1 p-1`}
        /> */}
      </View>
    </>
  );
}
