import React from 'react';
import {View, Text} from 'react-native';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import tw from '../../../../styles/twrnc.global';
import {IconCP} from '../../../../utils/icon.utils';
import {useColorThemeToolsDetail} from '../config';
import ScreenDevelopment from '../../../General/ScreenDevelopment';

export default function KQCHReplaceSwitchCE({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const {resultConfig} = {...(deviceInfo?.[0] || deviceInfo)};

  const {
    Login_To_DI,
    Login_To_New_CE,
    Getting_DI_DLK_Eth,
    FTP_To_Server,
    Getting_CE_ULK_Eth,
    Loading_Config_File,
    Login_To_Current_CE,
    Login_To_Current_CE_Verify,
    VLAN45_DI_Config,
    Login_To_New_CE_Verify,
    Getting_Dynamic_IP_Range,
    Getting_New_CE_Dynamic_IP,
  } = {...resultConfig};
  const IconSuccess = (
    <IconCP
      name="checkmark-circle-outline"
      size={30}
      color={tw.color('green-500')}
    />
  );
  const IconError = (
    <IconCP name="close-circle-outline" size={30} color={tw.color('red-500')} />
  );
  return (
    <>
      {resultConfig ? (
        <View
          style={tw.style(`my-2 rounded-xl p-2 mb-3`, {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          <RowDialogCP
            label="Login To DI"
            ValueCP={() => {
              return Login_To_DI ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Login To New CE"
            ValueCP={() => {
              return Login_To_New_CE ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Getting DI DLK Eth-Trunk"
            ValueCP={() => {
              return Getting_DI_DLK_Eth ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="FTP To Server"
            ValueCP={() => {
              return FTP_To_Server ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Getting Current CE ULK Eth"
            ValueCP={() => {
              return Getting_CE_ULK_Eth ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Loading Config File"
            ValueCP={() => {
              return Loading_Config_File ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Login To Current CE"
            ValueCP={() => {
              return Login_To_Current_CE ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Login To Current CE Verify"
            ValueCP={() => {
              return Login_To_Current_CE_Verify ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="VALN45 DI Config"
            ValueCP={() => {
              return VLAN45_DI_Config ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Login To New CE Verify"
            ValueCP={() => {
              return Login_To_New_CE_Verify ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Getting Dynamic IP Range"
            ValueCP={() => {
              return Getting_Dynamic_IP_Range ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Getting New CE Dynamic"
            ValueCP={() => {
              return Getting_New_CE_Dynamic_IP ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
        </View>
      ) : (
        <ScreenDevelopment
          message="Chưa có kết quả cấu hình"
          styleContainer={tw.style('px-0')}
        />
      )}
    </>
  );
}
