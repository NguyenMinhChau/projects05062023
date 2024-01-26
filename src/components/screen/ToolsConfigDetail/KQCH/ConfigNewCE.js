import React from 'react';
import {View} from 'react-native';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import tw from '../../../../styles/twrnc.global';
import {IconCP} from '../../../../utils/icon.utils';
import {useColorThemeToolsDetail} from '../config';
import ScreenDevelopment from '../../../General/ScreenDevelopment';

export default function KQCHConfigNewCE({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const {resultConfig} = {...(deviceInfo?.[0] || deviceInfo)};
  const {
    login_huawei_di,
    vlanif45_huawei_di_configed,
    getting_dynamic_ip,
    login_huawei_ce,
    login_ftp,
    creating_cfg_file,
    loading_config_file,
    reboot_after_loading_cfg,
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
            label="Login Huawei DI from Server"
            ValueCP={() => {
              return login_huawei_di ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Cấu hình VlanIf45 trên Huawei DI"
            ValueCP={() => {
              return vlanif45_huawei_di_configed ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="IP Dynamic Huawei CE"
            ValueCP={() => {
              return getting_dynamic_ip ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Login Huawei CE from Server"
            ValueCP={() => {
              return login_huawei_ce ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Login FTP từ Huawei CE đến Server"
            ValueCP={() => {
              return login_ftp ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Tạo file config Huawei CE"
            ValueCP={() => {
              return creating_cfg_file ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Load file cấu hình Huawei CE"
            ValueCP={() => {
              return loading_config_file ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Reboot Huawei CE sau Cấu hình"
            ValueCP={() => {
              return reboot_after_loading_cfg ? IconSuccess : IconError;
            }}
            noneBorderBottom
            noBullet
          />
        </View>
      ) : (
        <ScreenDevelopment
          styleContainer={tw.style('px-0')}
          message="Chưa có kết quả cấu hình"
        />
      )}
    </>
  );
}
