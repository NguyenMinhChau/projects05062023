import React from 'react';
import {View} from 'react-native';
import {ColorsStatusHandle} from '../../../../utils/ColorsHandle';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import tw from '../../../../styles/twrnc.global';
import {IconCP} from '../../../../utils/icon.utils';
import {useColorThemeToolsDetail} from '../config';
import ScreenDevelopment from '../../../General/ScreenDevelopment';
import {PRIMARY_COLOR} from '../../../../styles/colors.global';

export default function KQCHConfigNewOLT({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const {resultConfig, resultStatus} = {...(deviceInfo?.[0] || deviceInfo)};

  const {
    olt_epld_ver_ori,
    olt_epld_ver_curr,
    olt_fw_ver_ori,
    olt_fw_ver_curr,
    olt_password,
    huawei_login,
    olt_login,
    olt_create_cfg_file,
    huawei_lacp_join,
    huawei_meth_ip_return,
    olt_lacp_join,
    olt_login_from_server,
    olt_vlan42,
    olt_load_cfg_file,
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
      {Object?.keys(resultConfig || {}).length > 0 ? (
        <>
          <View
            style={tw.style(`my-2 rounded-xl p-2`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <RowDialogCP
              label="Kết quả"
              value={resultStatus}
              colorVal={ColorsStatusHandle(resultStatus)}
              noneBorderBottom
              leftNameIcon="sync-outline"
            />
            <RowDialogCP
              label="OLT EPLD Ver trước cấu hình"
              value={olt_epld_ver_ori}
              colorVal={PRIMARY_COLOR}
              noneBorderBottom
              leftNameIcon="scale-outline"
            />
            <RowDialogCP
              label="OLT EPLD Ver sau cấu hình"
              value={olt_epld_ver_curr}
              colorVal={PRIMARY_COLOR}
              noneBorderBottom
              leftNameIcon="scale-outline"
            />
          </View>
          <View
            style={tw.style(`my-2 rounded-xl p-2`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <RowDialogCP
              label="OLT FW trước cấu hình"
              value={olt_fw_ver_ori}
              colorVal={PRIMARY_COLOR}
              styleVal={tw`font-medium`}
              noneBorderBottom
              leftNameIcon="scale-outline"
            />
            <RowDialogCP
              label="OLT FW sau cấu hình"
              value={olt_fw_ver_curr}
              colorVal={PRIMARY_COLOR}
              styleVal={tw`font-medium`}
              noneBorderBottom
              leftNameIcon="scale-outline"
            />
            <RowDialogCP
              label="OLT Password"
              value={olt_password}
              colorVal={ColorsStatusHandle('TRUE')}
              noneBorderBottom
              leftNameIcon="key-outline"
            />
          </View>
          <View
            style={tw.style(`my-2 rounded-xl p-2 mb-3`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <RowDialogCP
              label="HW Login"
              ValueCP={() => {
                return huawei_login ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="OLT Login"
              ValueCP={() => {
                return olt_login ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="Tạo file cấu hình"
              ValueCP={() => {
                return olt_create_cfg_file ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="HW LACP"
              ValueCP={() => {
                return huawei_lacp_join ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="HW IP METH"
              ValueCP={() => {
                return huawei_meth_ip_return ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="OLT LACP"
              ValueCP={() => {
                return olt_lacp_join ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="OLT Login từ server"
              ValueCP={() => {
                return olt_login_from_server ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="OLT Vlan42"
              ValueCP={() => {
                return olt_vlan42 ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
            <RowDialogCP
              label="OLT Load file cấu hình"
              ValueCP={() => {
                return olt_load_cfg_file ? IconSuccess : IconError;
              }}
              noneBorderBottom
              noBullet
            />
          </View>
        </>
      ) : (
        <ScreenDevelopment
          styleContainer={tw.style('px-0')}
          message="Chưa có kết quả cấu hình"
        />
      )}
    </>
  );
}
