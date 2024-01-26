import React from 'react';
import {View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import DialogCP from '../../../General/Dialog/DialogCP';
import TextInputCP from '../../../General/TextInputCP';
import useAppContext from '../../../../utils/hooks/useAppContext';
import ButtonCP from '../../../General/ButtonCP';
import {
  HANDLE_CONFIG_NEW_CE,
  HANDLE_TERMINATED_PLAN_CONFIG_NEW_CE,
} from '../../../../services/tools';
import {useColorThemeToolsDetail} from '../config';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {SET_TOGGLE_PAYLOAD} from '../../../Context/AppContext.reducer';
import {TYPE_JOB} from '../../Tools/config';

export default function TTKHConfigNewCE({idTask}) {
  const {dispatch, state} = useAppContext();
  const [visible, setVisible] = React.useState(false);
  const [reasonClose, setReasonClose] = React.useState('');
  const {colors} = useColorThemeToolsDetail();
  const {openNotifyNotYetCallAPI, openNotificationToast} =
    useNotificationToast();

  const handleConfig = type => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    HANDLE_CONFIG_NEW_CE({
      dispatch,
      state,
      step: type,
      _id: idTask,
      typeJob: TYPE_JOB.CONFIG_NEW_CE_SWITCH,
      openNotificationToast,
    });
  };

  const handleTerminated = () => {
    // dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    openNotifyNotYetCallAPI();
    HANDLE_TERMINATED_PLAN_CONFIG_NEW_CE({
      dispatch,
      state,
      _id: idTask,
      setVisible,
      reason: reasonClose,
      openNotificationToast,
    });
  };

  return (
    <>
      <View
        style={tw`w-full flex-row gap-1 flex-nowrap items-center justify-around mb-5 px-1`}>
        <ButtonCP
          iconName="file-tray-full-outline"
          titleIcon="Cấp phát TN"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder="#40c4aa"
          colorBG="#40c4aa"
          onPress={() => handleConfig('allocation')}
          styleContainer={tw`p-1 flex-1`}
        />
        <ButtonCP
          iconName="cog-outline"
          titleIcon=" Cấu hình TB"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder="#7635DC"
          colorBG="#7635DC"
          onPress={() => handleConfig('config')}
          styleContainer={tw`p-1 flex-1`}
        />
        <ButtonCP
          iconName="close-outline"
          titleIcon=" Đóng KH"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder="#dc2626"
          colorBG="#dc2626"
          onPress={() => setVisible(true)}
          styleContainer={tw`p-1 flex-1`}
        />
      </View>
      <DialogCP
        visible={visible}
        setVisible={setVisible}
        styleDialog={tw`mx-10`}
        title="Nguyên nhân đóng">
        <View
          style={tw.style(`p-4 rounded-md w-full`, {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          <TextInputCP
            placeholder="Vui lòng nhập lý do..."
            multiline={true}
            value={reasonClose}
            onChange={val => {
              setReasonClose(val);
            }}
            style={tw`h-[150px]`}
            contentStyle={tw`p-2`}
            outlinedStyle={tw`border border-gray-400`}
          />
          <View style={tw`flex flex-row justify-end gap-2`}>
            <ButtonCP
              iconName="close-outline"
              titleIcon="Thoát"
              colorIcon="#fff"
              colorBorder="#dc2626"
              colorBG="#dc2626"
              onPress={() => setVisible(false)}
              styleContainer={tw`p-1`}
              sizeIcon={18}
              styleText={tw`text-[14px]`}
            />
            <ButtonCP
              iconName="checkmark-outline"
              titleIcon="Xác nhận"
              colorIcon="#fff"
              colorBorder={colors.PRIMARY_COLOR}
              colorBG={colors.PRIMARY_COLOR}
              disabled={!reasonClose}
              onPress={handleTerminated}
              styleContainer={tw`p-1`}
              sizeIcon={18}
              styleText={tw`text-[14px]`}
            />
          </View>
        </View>
      </DialogCP>
    </>
  );
}
