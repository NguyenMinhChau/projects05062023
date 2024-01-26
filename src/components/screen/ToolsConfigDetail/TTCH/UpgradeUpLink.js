import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import tw from '../../../../styles/twrnc.global';
import {fList} from '../../../../utils/array.utils';
import {useColorThemeToolsDetail} from '../config';
import {IconCP} from '../../../../utils/icon.utils';
import RenderTagCP from '../../../General/RenderTag';
import {parsePortName} from '../../../../utils/parse.namePort';
import {SUCCESS_COLOR} from '../../../../styles/colors.global';

export default function TTCHUpgradeUpLink({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();

  const {info, ipDev, initialConfigInfo} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {nameOps} = {...info};

  const {result} = {...initialConfigInfo?.[0]};

  const {device_1, device_2} = {...result};

  const checkFunctionName = (functionDevice1, functionDevice2) => {
    let func_name_01;
    let func_name_02;
    if (functionDevice1 === functionDevice2) {
      func_name_01 = functionDevice1 + ' 1';
      func_name_02 = functionDevice2 + ' 2';
    } else {
      func_name_01 = functionDevice1;
      func_name_02 = functionDevice2;
    }

    return {func_name_01, func_name_02};
  };

  const {
    ipDev: ipDevDevice1,
    popName: popNameDevice1,
    branch: branchDevice1,
    modelDev: modelDevDevice1,
    eth_trunk: ethTrunkDevice1,
    current_ports: current_portsDevice1,
    new_ports: new_new_portsDevice1,
    nameDev: newNameDevDevice1,
    function: functionDevice1,
  } = {
    ...device_1,
  };
  const {
    ipDev: ipDevDevice2,
    popName: popNameDevice2,
    branch: branchDevice2,
    modelDev: modelDevDevice2,
    eth_trunk: ethTrunkDevice2,
    current_ports: current_portsDevice2,
    new_ports: new_new_portsDevice2,
    nameDev: newNameDevDevice2,
    function: functionDevice2,
  } = {
    ...device_2,
  };

  const IconSuccess = (
    <IconCP
      name="checkmark-circle-outline"
      size={22}
      color={tw.color('green-500')}
    />
  );
  const IconError = (
    <IconCP name="close-circle-outline" size={22} color={tw.color('red-500')} />
  );

  const RenderIconCheckStatus = ({status}) => {
    return status ? IconSuccess : IconError;
  };

  const {func_name_01, func_name_02} = checkFunctionName(
    functionDevice1,
    functionDevice2,
  );

  return (
    <>
      <View
        style={tw.style(`p-3 my-5 rounded-xl min-h-[100px]`, {
          backgroundColor: colors.BACKGROUND_CARD,
        })}>
        <Text
          style={tw.style(
            `text-center font-bold text-[18px] text-orange-500 mb-2`,
          )}>
          Thiết bị {func_name_01}
        </Text>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="Tên TB"
            value={newNameDevDevice1}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
            styleVal={tw.style({
              color: colors.PRIMARY_COLOR,
            })}
          />
          <RowDialogCP
            label="IP TB"
            value={ipDevDevice1}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Function"
            value={functionDevice1}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          {popNameDevice1 && (
            <RowDialogCP
              label="POP"
              value={popNameDevice1}
              styleLabel={tw`font-bold`}
              noneBorderBottom
              noBullet
              styleRow={tw`py-2`}
            />
          )}
          <RowDialogCP
            label="Chi nhánh"
            value={branchDevice1}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Model TB"
            value={modelDevDevice1}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port Logic"
            value={ethTrunkDevice1}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port Hiện tại"
            ValueCP={() => {
              return (
                <View style={tw`flex-col items-end justify-end`}>
                  {current_portsDevice1.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={tw.style('ml-2 font-bold', {
                          color: colors.PRIMARY_COLOR,
                        })}>
                        {parsePortName(item)}
                      </Text>
                    );
                  })}
                </View>
              );
            }}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port Mới"
            ValueCP={() => {
              return (
                <View style={tw`flex-col items-end justify-end`}>
                  {new_new_portsDevice1.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={tw.style('ml-2 font-bold', {
                          color: '#12cbc4',
                        })}>
                        {parsePortName(item)}
                      </Text>
                    );
                  })}
                </View>
              );
            }}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
        </View>

        <Text
          style={tw.style(
            `text-center font-bold text-[18px] text-orange-500 mb-2`,
          )}>
          Thiết bị {func_name_02}
        </Text>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="Tên TB"
            value={newNameDevDevice2}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
            styleVal={tw.style({
              color: SUCCESS_COLOR,
            })}
          />
          <RowDialogCP
            label="IP TB"
            value={ipDevDevice2}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Function"
            value={functionDevice2}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          {popNameDevice2 && (
            <RowDialogCP
              label="POP"
              value={popNameDevice2}
              styleLabel={tw`font-bold`}
              noneBorderBottom
              noBullet
              styleRow={tw`py-2`}
            />
          )}
          <RowDialogCP
            label="Chi nhánh"
            value={branchDevice2}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Model TB"
            value={modelDevDevice2}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port Logic"
            value={ethTrunkDevice2}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port Hiện tại"
            ValueCP={() => {
              return (
                <View style={tw`flex-col items-end justify-end`}>
                  {current_portsDevice2.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={tw.style('ml-2 font-bold', {
                          color: SUCCESS_COLOR,
                        })}>
                        {parsePortName(item)}
                      </Text>
                    );
                  })}
                </View>
              );
            }}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port Mới"
            ValueCP={() => {
              return (
                <View style={tw`flex-col items-end justify-end`}>
                  {new_new_portsDevice2.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={tw.style('ml-2 font-bold', {
                          color: colors.WARNING_COLOR,
                        })}>
                        {parsePortName(item)}
                      </Text>
                    );
                  })}
                </View>
              );
            }}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
        </View>
      </View>
    </>
  );
}
