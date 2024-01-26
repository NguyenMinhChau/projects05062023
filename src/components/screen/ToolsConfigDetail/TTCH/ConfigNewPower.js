import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import tw from '../../../../styles/twrnc.global';
import {fList} from '../../../../utils/array.utils';
import {useColorThemeToolsDetail} from '../config';
import {IconCP} from '../../../../utils/icon.utils';
import RenderTagCP from '../../../General/RenderTag';
import ActionSheetCP from '../../../General/ActionSheetCP';

export default function TTCHConfigNewPower({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const [visible, setVisible] = React.useState(false);

  const {info, ipDev, initialConfigInfo} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {nameOps} = {...info};

  const {result} = {...initialConfigInfo?.[0]};

  const {
    nameDev,
    ipDev: ipDevOLT,
    modelDev,
    powerPort,
    PortStatus,
    branch,
    portConfig,
    suggest,
  } = {...result};

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

  return (
    <>
      <View
        style={tw.style(`p-3 my-5 rounded-xl min-h-[100px]`, {
          backgroundColor: colors.BACKGROUND_CARD,
        })}>
        <Text
          style={tw.style(`text-center font-bold text-[18px] text-black mb-2`, {
            color: colors.BLACK_COLOR,
          })}>
          Thông tin chung
        </Text>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="IP TB nguồn"
            value={ipDev}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="NameOps"
            value={nameOps}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Chi nhánh"
            value={branch}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Tên TB OLT"
            value={nameDev}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="IP TB OLT"
            value={ipDevOLT}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Model TB OLT"
            value={modelDev}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Port giám sát nguồn"
            value={powerPort}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
          <RowDialogCP
            label="Thông tin khác"
            ValueCP={() => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setVisible(true)}>
                  <Text
                    style={tw.style('text-[14px] underline', {
                      color: colors.PRIMARY_COLOR,
                    })}>
                    Xem chi tiết
                  </Text>
                </TouchableOpacity>
              );
            }}
            styleLabel={tw`font-bold`}
            noneBorderBottom
            noBullet
            styleRow={tw`py-2`}
          />
        </View>
      </View>
      <ActionSheetCP
        title="Xem chi tiết"
        isVisible={visible}
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}>
        <View style={tw`min-h-[300px] mt-3 flex-col gap-3`}>
          <View style={tw.style('flex-row items-center gap-2')}>
            <Text
              style={tw.style('font-bold text-[15px]', {
                color: colors.BLACK_COLOR,
              })}>
              Suggestions:
            </Text>
            <RenderIconCheckStatus status={suggest} />
          </View>
          <View style={tw.style('flex-col items-start gap-2')}>
            <Text
              style={tw.style('font-bold text-[15px]', {
                color: colors.BLACK_COLOR,
              })}>
              Port Status:
            </Text>
            <View
              style={tw.style('w-full bg-gray-100 rounded-lg overflow-hidden')}>
              {/* THEAD */}
              <View
                style={tw.style(
                  'flex-row items-center justify-between w-full',
                )}>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                  )}>
                  <Text
                    style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                    Tên Port
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                  )}>
                  <Text
                    style={tw.style('text-[13px] text-[#243c7c] font-bold')}>
                    Trạng thái
                  </Text>
                </View>
              </View>
              {/* TBODY */}
              {Object.entries(PortStatus || {}).map(([key, val], _idx) => {
                const bgByStatus = val === 'UP' ? 'bg-green-200' : 'bg-red-200';
                return (
                  <View
                    key={_idx}
                    style={tw.style(
                      `flex-row items-center justify-between w-full ${bgByStatus}`,
                    )}>
                    <View
                      style={tw.style(
                        'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                      )}>
                      <Text style={tw.style('text-[13px] text-black')}>
                        {key}
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                      )}>
                      <Text style={tw.style('text-[13px] text-black')}>
                        {val}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={tw.style(
              `flex-col items-start gap-2 ${
                Platform.OS === 'ios' ? 'mb-5' : 'mb-2'
              }`,
            )}>
            <Text
              style={tw.style('font-bold text-[15px]', {
                color: colors.BLACK_COLOR,
              })}>
              Port Config:
            </Text>
            <View style={tw.style('flex-row flex-wrap gap-2')}>
              {fList(portConfig).map((item, _idx) => {
                return <RenderTagCP tag={item} key={_idx} />;
              })}
            </View>
          </View>
        </View>
      </ActionSheetCP>
    </>
  );
}
