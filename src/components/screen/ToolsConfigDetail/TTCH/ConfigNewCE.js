import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import tw from '../../../../styles/twrnc.global';
import {ColorsStatusHandle} from '../../../../utils/ColorsHandle';
import SelectCP from '../../../General/SelectCP';
import {dd_mm_yyyy_hh_mm_ss_comma_sub7} from '../../../../utils/TimerFormat';
import {fList} from '../../../../utils/array.utils';
import {parsePortName} from '../../../../utils/parse.namePort';
import {useColorThemeToolsDetail} from '../config';
import ScreenDevelopment from '../../../General/ScreenDevelopment';
import ActionSheetCP from '../../../General/ActionSheetCP';
import CustomSelectCP from '../../../General/CustomSelectCP';

export default function TTCHConfigNewCE({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const [activeDropDown, setActiveDropdown] = React.useState(null);

  const {info, initialConfigInfo, resultStatus} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {popName, group, function: FuncDev, typeDev} = {...info};

  const {result} = {...initialConfigInfo?.[0]};

  const {
    diIpDev,
    diName,
    diEthTrk,
    branch,
    diPop,
    diDownLinks,
    ceIpDev,
    ceGateway,
    ceName,
    ceModel,
    ceEthTrk,
    cePop,
    pimIp,
    vlanMgntId,
    vlanPimId,
    vlanPppoeId,
    ceUplinks,
    links,
    link_type,
  } = {...(result?.[0] || result)};

  const [dataConnectByTimeNewCE, setDataConnectByTimeNewCE] =
    React.useState(null);
  const [time, setTime] = React.useState(initialConfigInfo?.[0]?.timestamp);
  const [isShow, setIsShow] = React.useState(false);

  useEffect(() => {
    const dataFilterConnectNewCE = fList(initialConfigInfo).filter(item => {
      return item.timestamp === time;
    });
    setDataConnectByTimeNewCE(dataFilterConnectNewCE);
  }, [time]);

  const {
    ceUplinks: ceUplinksConnectByTime,
    diDownLinks: diDownLinksConnectByTime,
  } = {...dataConnectByTimeNewCE?.[0]?.result?.[0]};
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
            label="POP"
            value={popName}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Group"
            value={group}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Function"
            value={FuncDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Trạng thái"
            value={resultStatus}
            colorVal={ColorsStatusHandle(resultStatus)}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
        </View>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="IP DI"
            value={diIpDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Tên TB DI"
            value={diName}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Loại TB DI"
            value={typeDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Eth-trunk DI"
            value={diEthTrk}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="POP DI"
            value={branch + diPop}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Port downlink DI"
            valueList={fList(diDownLinks).map(item => parsePortName(item))}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
        </View>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="IP CE"
            value={ceIpDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="IP Gateway CE"
            value={ceGateway}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Tên TB CE"
            value={ceName}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Loại TB CE"
            value={ceModel}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Eth-Trunk CE"
            value={ceEthTrk}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Tên POP CE"
            value={branch + cePop}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="PIM IP CE"
            value={pimIp}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="VLAN MGNT CE"
            value={vlanMgntId}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="VLAN PIM CE"
            value={vlanPimId}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="VLAN PPPOE CE"
            value={vlanPppoeId}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Port uplink CE"
            valueList={fList(ceUplinks).map(item => parsePortName(item))}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
        </View>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="Số link đấu nối"
            value={links}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Loại link đấu nối"
            value={link_type}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-2`}
            noneBorderBottom
            noBullet
          />
        </View>
      </View>
      <View>
        <CustomSelectCP
          label="Thời gian cấp phát"
          placeholder="Chọn thời gian cấp phát"
          dataList={fList(initialConfigInfo).map(item => {
            return {
              label: dd_mm_yyyy_hh_mm_ss_comma_sub7(item.timestamp).toString(),
              value: item.timestamp,
            };
          })}
          selectList={dd_mm_yyyy_hh_mm_ss_comma_sub7(time).toString()}
          onSelectValue={val => setTime(val)}
          styleContainer={tw.style('flex-0 min-h-[40px] h-[40px]')}
          idActive="time"
          isActiveDropDown={activeDropDown === 'time'}
          onSetActiveDropDown={val => setActiveDropdown(val)}
          isFullData
        />
      </View>
      <View
        style={tw.style(`p-3 mb-5 rounded-lg min-h-[100px]`, {
          backgroundColor: colors.BACKGROUND_CARD,
        })}>
        <Text
          style={tw.style(`text-center font-bold text-[18px] mb-2`, {
            color: colors.BLACK_COLOR,
          })}>
          Cách kết nối
        </Text>
        <View
          style={tw`flex-row w-full px-1 justify-between items-center gap-1`}>
          <View style={tw`flex-col items-center justify-center`}>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              Switch DI
            </Text>
          </View>
          <View style={tw`flex-1`}>
            <View style={tw`border-[0.5px] border-gray-300`}></View>
          </View>

          <View style={tw`flex-col items-center justify-center`}>
            <Text
              style={tw.style(`font-bold text-[13px]`, {
                color: colors.BLACK_COLOR,
              })}>
              Switch CE
            </Text>
          </View>
        </View>
        <View style={tw`flex-col gap-3 mt-3`}>
          {fList(diDownLinksConnectByTime).map((item, _idx) => {
            return (
              <View key={_idx} style={tw`flex-row items-center gap-x-2`}>
                <Text
                  style={tw.style(`text-[13px] font-bold`, {
                    color: colors.BLACK_COLOR,
                  })}>
                  {parsePortName(item)}
                </Text>
                <View style={tw`flex-1`}>
                  <View style={tw`border-[0.5px] border-gray-300`}></View>
                </View>
                <Text
                  style={tw.style(`text-[13px] font-bold`, {
                    color: colors.BLACK_COLOR,
                  })}>
                  {parsePortName(ceUplinksConnectByTime[_idx])}
                </Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={
            fList(diDownLinksConnectByTime)?.length <= 0
              ? () => {}
              : () => {
                  setIsShow(true);
                }
          }
          activeOpacity={0.9}
          style={tw`mt-3 items-center justify-center`}>
          <Text
            style={tw.style(`underline font-medium text-[14px]`, {
              color: colors.PRIMARY_COLOR,
            })}>
            {fList(diDownLinksConnectByTime).length <= 0
              ? 'Không có kết nối nào'
              : 'Xem chi tiết'}
          </Text>
        </TouchableOpacity>
      </View>
      <ActionSheetCP
        title="Cách kết nối"
        isVisible={isShow}
        onClose={() => setIsShow(false)}
        onOpen={() => setIsShow(true)}>
        <View>
          <View style={tw`min-h-[300px] mt-3`}>
            <ScreenDevelopment />
          </View>
        </View>
      </ActionSheetCP>
    </>
  );
}
