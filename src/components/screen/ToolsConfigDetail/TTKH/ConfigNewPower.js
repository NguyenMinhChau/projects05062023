import React from 'react';
import {View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import ButtonCP from '../../../General/ButtonCP';
import {
  HANDLE_CONFIG_NEW_POWER,
  HANDLE_TERMINATED_PLAN_CONFIG_NEW_POWER,
} from '../../../../services/tools';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import DialogCP from '../../../General/Dialog/DialogCP';
import {useColorThemeToolsDetail} from '../config';
import TextInputCP from '../../../General/TextInputCP';
import {SET_TOGGLE_PAYLOAD} from '../../../Context/AppContext.reducer';
import {TYPE_JOB} from '../../Tools/config';

export default function TTKHConfigNewPower({idTask, dataByObjId}) {
  const {dispatch, state} = useAppContext();
  const [visible, setVisible] = React.useState(false);
  const [reasonClose, setReasonClose] = React.useState('');
  const {openNotifyNotYetCallAPI, openNotificationToast} =
    useNotificationToast();
  const {colors} = useColorThemeToolsDetail();

  const {deviceInfo, info} = {...dataByObjId};
  const {taskRunner, expectTimeStart, expectTimeFinish} = {...info};

  const {info: infoDevice, initialConfigInfo} = {...deviceInfo?.[0]};

  const {popName, modelDev} = {...infoDevice};
  const {result} = {...initialConfigInfo?.[0]};
  const {ipDev} = {...result};

  const handleConfig = type => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    HANDLE_CONFIG_NEW_POWER({
      dispatch,
      state,
      step: type,
      _id: idTask,
      typeJob: TYPE_JOB.CONFIG_NEW_POWER,
      openNotificationToast,
    });
  };
  const handleTerminated = () => {
    // dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    openNotifyNotYetCallAPI();
    const payload = {
      popName: popName,
      modelDev: modelDev,
      ipOLT: ipDev,
      taskRunner: taskRunner,
      expectTimeStart: expectTimeStart,
      expectTimeFinish: expectTimeFinish,
      status: 'CLOSE',
      message: reasonClose,
    };
    HANDLE_TERMINATED_PLAN_CONFIG_NEW_POWER({
      dispatch,
      state,
      _id: idTask,
      setVisible,
      payload,
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
          styleContainer={tw`p-1 flex-1`}
        />
        <ButtonCP
          iconName="cog-outline"
          titleIcon=" Cấu hình TB nguồn"
          colorIcon="#fff"
          sizeIcon={15}
          styleText={tw`text-[12px]`}
          colorBorder="#7635DC"
          colorBG="#7635DC"
          onPress={() => handleConfig('config')}
          styleContainer={tw`flex-1 p-1 px-2`}
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
