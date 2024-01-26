import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {fList} from '../../../../utils/array.utils';
import {parsePortName} from '../../../../utils/parse.namePort';
import ButtonCP from '../../../General/ButtonCP';
import {PRIMARY_COLOR, SUCCESS_COLOR} from '../../../../styles/colors.global';
import {IconCP} from '../../../../utils/icon.utils';
import moment from 'moment';
import AccordionCP from '../../../General/AccordionCP';
import DialogCP from '../../../General/Dialog/DialogCP';
import FastImageCP from '../../../General/FastImageCP';
import {useColorThemeToolsDetail} from '../config';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import ScreenDevelopment from '../../../General/ScreenDevelopment';
import ActionSheetCP from '../../../General/ActionSheetCP';

export default function TTCHReplaceSwitchCE({dataByObjId}) {
  const {deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const {colors: colorsDisplay} = useGetColorThemeDisplay();

  const {initialConfigInfo, jobId, checkServiceHuawei} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {result} = {...initialConfigInfo?.[0]};

  const {currentDevice, newDevice, interfaceChange, intermediate} = {
    ...(result?.[0] || result),
  };

  const {
    result: resultCheckServiceHW,
    status: statusCheckServiceHW,
    message: messageCheckServiceHW,
    email: emailTaskRunnerCheckService,
    timestamp: timestampCheckService,
  } = {...checkServiceHuawei?.[0]};

  const {pim_neighbor, olt_neighbors, multicast_routing} = {
    ...resultCheckServiceHW,
  };

  const isStatusMulticast_routing =
    multicast_routing?.OK === '10/10' ? true : false;

  // ?! INFO REPLACE SWITCH CE
  const {
    province,
    pop,
    pimVlanIf,
    nameDev: newNameDev,
    ipDev: newIpDev,
    gateway: newGW,
    mgntId: newMgnt,
  } = {...newDevice};

  const {
    nameDev: curNameDev,
    ipDev: curIpDev,
    gateway: curGW,
    mgntId: curMgnt,
  } = {...currentDevice};

  const [isIdGpon, setIsIdGpon] = React.useState(null);
  const [isDataMacIPwan, setIsDataMacIPwan] = React.useState(null);
  const [isShow, setIsShow] = React.useState(false);
  const [isShowCheckService, setIsShowCheckService] = React.useState(false);
  const [isShowMulticast, setIsShowMulticast] = React.useState(false);
  const [isShowGpon, setIsShowGpon] = React.useState(true);
  const [isShowMacIPwan, setIsShowMacIPwan] = React.useState(false);

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
        style={tw.style(`p-3 my-5 rounded-lg min-h-[100px]`, {
          backgroundColor: colors.BACKGROUND_CARD,
        })}>
        <Text
          style={tw.style(`text-center font-bold text-[18px] mb-2`, {
            color: colors.BLACK_COLOR,
          })}>
          Thông tin chung
        </Text>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="Job ID"
            value={jobId}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
            onCopy
          />
          <RowDialogCP
            label="Province"
            value={province}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="POP Name"
            value={province + pop}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="PIM"
            value={'VLAN ' + pimVlanIf}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
        </View>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="Current Name"
            value={curNameDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Current IP"
            value={curIpDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Current GW"
            value={curGW}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="Current Mgnt"
            value={'VLAN ' + curMgnt}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
        </View>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="New Name"
            value={newNameDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="New IP"
            value={newIpDev}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="New GW"
            value={newGW}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
          <RowDialogCP
            label="New Mgnt"
            value={'VLAN ' + newMgnt}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
          />
        </View>
        <View style={tw`mb-3`}>
          <RowDialogCP
            label="Intermediate Port"
            ValueCP={() => {
              return (
                <View
                  style={tw.style(
                    'flex-row gap-y-1 gap-x-1 items-end justify-end',
                  )}>
                  <View
                    style={tw.style(
                      'flex flex-col items-center justify-center',
                    )}>
                    <Text
                      style={tw.style('text-[13px] italic', {
                        color: PRIMARY_COLOR,
                      })}>
                      Current CE
                    </Text>
                    <Text
                      style={tw.style({
                        color: PRIMARY_COLOR,
                      })}>
                      {intermediate}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'border-b-[1px] border-gray-300 w-[40px] mb-2',
                    )}></View>
                  <View
                    style={tw.style(
                      'flex flex-col items-start justify-center',
                    )}>
                    <Text
                      style={tw.style('text-[13px]  italic', {
                        color: PRIMARY_COLOR,
                      })}>
                      New CE
                    </Text>
                    <Text
                      style={tw.style({
                        color: PRIMARY_COLOR,
                      })}>
                      X0/0/24
                    </Text>
                  </View>
                </View>
              );
            }}
            styleLabel={tw`font-bold`}
            styleRow={tw`py-1`}
            noneBorderBottom
            noBullet
            noValue
          />
        </View>
        <View style={tw.style('flex-row gap-1')}>
          <ButtonCP
            iconName="git-compare-outline"
            colorIcon="#fff"
            sizeIcon={18}
            styleText={tw`text-[12px]`}
            titleIcon="Xem thay đổi port"
            colorBG={PRIMARY_COLOR}
            colorBorder={PRIMARY_COLOR}
            onPress={() => setIsShow(true)}
            styleContainer={tw.style('flex-1 p-1')}
          />
          <ButtonCP
            iconName="checkmark-done-outline"
            colorIcon="#fff"
            sizeIcon={18}
            styleText={tw`text-[12px]`}
            titleIcon="Xem kiểm tra DV"
            colorBG={SUCCESS_COLOR}
            colorBorder={SUCCESS_COLOR}
            onPress={() => setIsShowCheckService(true)}
            styleContainer={tw.style('flex-1 p-1')}
          />
        </View>
      </View>
      {/* XEM CHI TIẾT CÁCH KẾT NỐI: CONFIG NEW CE/ REPLACE CE */}
      <ActionSheetCP
        title="Xem thay đổi port"
        isVisible={isShow}
        onClose={() => setIsShow(false)}
        onOpen={() => setIsShow(true)}>
        <View>
          <View style={tw`min-h-[300px] mt-3`}>
            <View
              style={tw.style('rounded-xl flex-col', {
                backgroundColor: colors.BACKGROUND_CONNECT,
              })}>
              <View
                style={tw.style(
                  'flex-row items-center justify-center mb-3 border-b-[0.5px]',
                  {
                    borderColor: colorsDisplay.BORDER_COLOR,
                  },
                )}>
                <Text
                  style={tw.style(
                    'w-[20%] py-2 text-center font-bold text-[12px] text-blue-500',
                  )}>
                  SW Hiện Tại
                </Text>
                <Text style={tw.style('w-[15%] py-2')}></Text>
                <Text
                  style={tw.style(
                    'w-[20%] py-2 text-center font-bold text-[12px] text-green-500',
                  )}>
                  SW Mới
                </Text>
                <Text style={tw.style('w-[15%] py-2')}></Text>
                <Text
                  style={tw.style(
                    'w-[20%] text-center py-2 font-bold text-[12px] text-violet-500',
                  )}>
                  Neighbor
                </Text>
              </View>
              <FlatList
                contentContainerStyle={tw`flex-grow`}
                data={fList(interfaceChange)}
                keyExtractor={(item, _idx) => _idx.toString()}
                renderItem={({item, index}) => {
                  const newEthTrunk = Object.keys(item || {})?.[0];

                  const {newMem, oldEth, oldMem, neighborName, neighborMem} = {
                    ...Object.values(item || {})?.[0],
                  };
                  return (
                    <View
                      key={index}
                      style={tw.style(
                        'flex-row items-start justify-center pb-3',
                        {
                          borderColor: colorsDisplay.BORDER_COLOR,
                          borderBottomWidth:
                            index === fList(interfaceChange).length - 1
                              ? 0
                              : 0.5,
                        },
                      )}>
                      <View
                        style={tw.style('w-[20%] flex-col items-center py-2')}>
                        <Text
                          style={tw.style(
                            'text-[12px] flex-1 text-center text-blue-500 font-bold',
                          )}>
                          {oldEth || EMPTY_CHAR}
                        </Text>
                        <View
                          style={tw.style(
                            'flex-col items-center justify-center',
                          )}>
                          {fList(oldMem).map((item, _idx) => {
                            return (
                              <Text
                                key={_idx}
                                style={tw.style(
                                  'text-[14px] text-blue-500 text-center',
                                )}>
                                {item || EMPTY_CHAR}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        style={tw.style('w-[15%] flex-col gap-3 pt-[30px]')}>
                        <Text
                          style={tw.style(
                            'text-[12px] flex-1 text-center ',
                          )}></Text>
                        {fList(oldMem).map((item, _idx) => {
                          return (
                            <View
                              key={_idx}
                              style={tw.style('border-t-[0.5px] min-h-[10px]', {
                                borderColor: colorsDisplay.BORDER_COLOR,
                              })}
                            />
                          );
                        })}
                      </View>
                      <View
                        style={tw.style('w-[20%] flex-col items-center py-2')}>
                        <Text
                          style={tw.style(
                            'text-[12px] flex-1 text-center text-green-500 font-bold',
                          )}>
                          {newEthTrunk || EMPTY_CHAR}
                        </Text>
                        <View
                          style={tw.style(
                            'flex-col items-center justify-center',
                          )}>
                          {fList(newMem).map((item, _idx) => {
                            return (
                              <Text
                                key={_idx}
                                style={tw.style(
                                  'text-[14px] text-green-500 text-center',
                                )}>
                                {item || EMPTY_CHAR}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        style={tw.style('w-[15%] flex-col gap-3 pt-[30px]')}>
                        <Text
                          style={tw.style(
                            'text-[12px] flex-1 text-center ',
                          )}></Text>
                        {fList(newMem).map((item, _idx) => {
                          return (
                            <View
                              key={_idx}
                              style={tw.style('border-t-[0.5px] min-h-[10px]', {
                                borderColor: colorsDisplay.BORDER_COLOR,
                              })}
                            />
                          );
                        })}
                      </View>
                      <View
                        style={tw.style('w-[20%] flex-col items-center py-2')}>
                        <Text
                          style={tw.style(
                            'text-[12px] flex-1 text-center text-violet-500 font-bold',
                          )}>
                          {neighborName.replace('-Trunk', '') || EMPTY_CHAR}
                        </Text>
                        <View
                          style={tw.style(
                            'flex-col items-center justify-center',
                          )}>
                          {fList(neighborMem).map((item, _idx) => {
                            return (
                              <Text
                                key={_idx}
                                style={tw.style(
                                  'text-[14px] text-violet-500 text-center',
                                )}>
                                {parsePortName(item) || EMPTY_CHAR}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  );
                }}
                nestedScrollEnabled
              />
            </View>
          </View>
        </View>
      </ActionSheetCP>
      {/* XEM CHI TIẾT CHECK DỊCH VỤ */}
      <ActionSheetCP
        HeaderCustomSticky={() => {
          return (
            <View style={tw.style('flex-col items-center justify-center')}>
              <Text
                style={tw.style(`font-bold text-[20px] mb-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                Kiểm tra dịch vụ{' '}
                {fList(checkServiceHuawei)?.length > 0 && (
                  <Text
                    style={tw.style(
                      `text-[18px] ${
                        statusCheckServiceHW === 'OK'
                          ? 'text-green-500'
                          : 'text-orange-500'
                      }`,
                    )}>
                    [{statusCheckServiceHW}]
                  </Text>
                )}
              </Text>
              {fList(checkServiceHuawei)?.length > 0 && (
                <Text style={tw.style('text-gray-500 text-[12px] font-bold')}>
                  [{emailTaskRunnerCheckService} -{' '}
                  {moment(timestampCheckService).format('DD/MM/YYYY HH:mm:ss')}]
                </Text>
              )}
            </View>
          );
        }}
        onOpen={() => setIsShowCheckService(true)}
        isVisible={isShowCheckService}
        onClose={() => setIsShowCheckService(false)}>
        <View style={tw`min-h-[300px] mt-3`}>
          {fList(checkServiceHuawei)?.length > 0 ? (
            <>
              {/* HUAWEI */}
              <View
                style={tw.style('flex-col p-2 rounded-lg', {
                  backgroundColor: colors.BACKGROUND_CHECK_SERVICE,
                })}>
                <Text style={tw.style('text-gray-500 font-bold text-[16px]')}>
                  {newNameDev} - {newIpDev}
                </Text>
                <RowDialogCP
                  label="PIM Neighbor"
                  styleLabel={tw.style('font-bold', {
                    color: colors.ITEM_TITLE_TEXT_CHECK_SERVICE,
                  })}
                  styleRow={tw`px-0 pr-[19px]`}
                  noValue
                  ValueCP={() => {
                    return pim_neighbor ? IconSuccess : IconError;
                  }}
                  noneBorderBottom
                  noBullet
                />
                <AccordionCP
                  toggleDropDown={() => setIsShowMulticast(!isShowMulticast)}
                  open={isShowMulticast}
                  TitleCustom={() => {
                    return (
                      <View
                        style={tw.style(
                          'flex-row w-full items-center justify-between py-2',
                        )}>
                        <Text
                          style={tw.style('text-[14px] p-0 font-bold', {
                            color: colors.ITEM_TITLE_TEXT_CHECK_SERVICE,
                          })}>
                          Multicast Routing
                        </Text>
                        <RenderIconCheckStatus
                          status={isStatusMulticast_routing}
                        />
                      </View>
                    );
                  }}
                  styleRow={tw.style('px-1 py-0 m-0 mb-3')}
                  styleTitle={tw.style(
                    'text-[#243c7c] text-[14px] p-0 font-bold',
                  )}
                  RenderItemCustom={() => {
                    return (
                      <>
                        {multicast_routing &&
                          Object.entries(multicast_routing || {})
                            .filter(([key]) => key !== 'OK')
                            .map(([key, val], _idx) => {
                              return (
                                <View
                                  key={_idx}
                                  style={tw.style(
                                    'flex-row items-end justify-between w-full pl-4 pr-7',
                                  )}>
                                  <Text
                                    style={tw.style('text-[13px]', {
                                      color: PRIMARY_COLOR,
                                    })}>
                                    {key}
                                  </Text>
                                  <RenderIconCheckStatus status={val} />
                                </View>
                              );
                            })}
                      </>
                    );
                  }}
                  defaultOpen={isShowMulticast}
                />
              </View>
              {/* GPON */}
              <View
                style={tw.style('flex-col p-2 rounded-lg mt-2', {
                  backgroundColor: colors.BACKGROUND_CHECK_SERVICE,
                })}>
                <View
                  style={tw.style(
                    'flex-row items-center justify-between w-full',
                  )}>
                  <Text style={tw.style('text-gray-500 font-bold text-[16px]')}>
                    GPON Neighbors
                  </Text>
                  <Text
                    style={tw.style('text-[12px] text-orange-500 font-bold')}>
                    [Check dịch vụ lần thứ {fList(checkServiceHuawei)?.length}
                    /10]
                  </Text>
                </View>
                <View style={tw.style('w-full flex-col gap-2 mt-3')}>
                  {olt_neighbors &&
                    Object.entries(olt_neighbors || {}).map(
                      ([key, val], _idx) => {
                        const {
                          access_to_customer,
                          customer_to_access,
                          ipDev,
                          mac_online_pon,
                        } = {...val};
                        const isCheckMacOnline = Object.entries(
                          mac_online_pon || {},
                        ).every(([key_mac, val_mac], _idx_mac) => {
                          const {result_port} = {...val_mac};
                          return result_port;
                        });
                        return (
                          <>
                            <AccordionCP
                              key={_idx}
                              toggleDropDown={
                                isShowGpon && isIdGpon === _idx
                                  ? () => {
                                      setIsShowGpon(false);
                                      setIsIdGpon(null);
                                    }
                                  : () => {
                                      setIsShowGpon(true);
                                      setIsIdGpon(_idx);
                                    }
                              }
                              open={isShowGpon && isIdGpon === _idx}
                              TitleCustom={() => {
                                return (
                                  <View
                                    style={tw.style(
                                      'flex-row w-full items-center justify-between py-2',
                                    )}>
                                    <Text
                                      style={tw.style(
                                        'text-[14px] p-0 font-bold',
                                        {
                                          color:
                                            colors.ITEM_TITLE_TEXT_CHECK_SERVICE,
                                        },
                                      )}>
                                      {key + ' - ' + ipDev}
                                    </Text>
                                    <RenderIconCheckStatus
                                      status={
                                        isCheckMacOnline &&
                                        access_to_customer &&
                                        customer_to_access
                                      }
                                    />
                                  </View>
                                );
                              }}
                              styleRow={tw.style('p-0 pl-1 m-0')}
                              styleTitle={tw.style(
                                'text-[#243c7c] text-[14px] p-0 font-bold',
                              )}
                              RenderItemCustom={() => {
                                return (
                                  <>
                                    <View
                                      style={tw.style(
                                        'flex-col w-full bg-gray-100 rounded-lg overflow-hidden',
                                      )}>
                                      {/* LUỒNG ACCESS/IPTV */}
                                      <View style={tw.style('flex-row w-full')}>
                                        <View
                                          style={tw.style(
                                            `flex-2 p-2 items-center justify-center font-medium border-b-[1px] border-r-[0.5px] border-white ${
                                              access_to_customer
                                                ? 'bg-green-200'
                                                : 'bg-red-200'
                                            }`,
                                          )}>
                                          <Text
                                            style={tw.style(
                                              'text-black text-[13px]',
                                            )}>
                                            Luồng Access xuống KHG
                                          </Text>
                                        </View>
                                        <View
                                          style={tw.style(
                                            `flex-2 p-2 items-center justify-center font-medium border-b-[1px] border-l-[0.5px] border-white ${
                                              customer_to_access
                                                ? 'bg-green-200'
                                                : 'bg-red-200'
                                            }`,
                                          )}>
                                          <Text
                                            style={tw.style(
                                              'text-black text-[13px]',
                                            )}>
                                            Luồng IPTV lên Access
                                          </Text>
                                        </View>
                                      </View>
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
                                            style={tw.style(
                                              'text-[13px] text-[#243c7c] font-bold',
                                            )}>
                                            Port
                                          </Text>
                                        </View>
                                        <View
                                          style={tw.style(
                                            'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                          )}>
                                          <Text
                                            style={tw.style(
                                              'text-[13px] text-[#243c7c] font-bold',
                                            )}>
                                            Port Status
                                          </Text>
                                        </View>
                                        <View
                                          style={tw.style(
                                            'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                          )}>
                                          <Text
                                            style={tw.style(
                                              'text-[13px] text-[#243c7c] font-bold',
                                            )}>
                                            Total Mac
                                          </Text>
                                        </View>
                                        <View
                                          style={tw.style(
                                            'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                          )}>
                                          <Text
                                            style={tw.style(
                                              'text-[13px] text-[#243c7c] font-bold',
                                            )}>
                                            Mac Online
                                          </Text>
                                        </View>
                                        <View
                                          style={tw.style(
                                            'flex-col items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                          )}>
                                          <Text
                                            style={tw.style(
                                              'text-[13px] text-[#243c7c] font-bold',
                                            )}>
                                            Result
                                          </Text>
                                        </View>
                                      </View>
                                      {/* TBODY */}
                                      {Object.entries(mac_online_pon || {})
                                        .sort((a, b) => {
                                          return (
                                            Number(
                                              a?.[0]?.split('/')?.[1] || 0,
                                            ) -
                                            Number(b?.[0]?.split('/')?.[1] || 0)
                                          );
                                        })
                                        .map(([key_mac, val_mac], _idx_mac) => {
                                          const {
                                            online_mac,
                                            total_mac,
                                            mac_ipwan,
                                            status,
                                            result_port,
                                          } = {
                                            ...val_mac,
                                          };
                                          return (
                                            <View
                                              key={_idx_mac}
                                              style={tw.style(
                                                'flex-row items-center justify-between w-full',
                                              )}>
                                              <View
                                                style={tw.style(
                                                  'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                                )}>
                                                <Text
                                                  style={tw.style(
                                                    'text-[13px] capitalize text-black',
                                                  )}>
                                                  {key_mac}
                                                </Text>
                                              </View>
                                              <View
                                                style={tw.style(
                                                  'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                                )}>
                                                <Text
                                                  style={tw.style(
                                                    'text-[13px] text-black',
                                                  )}>
                                                  {status}
                                                </Text>
                                              </View>
                                              <View
                                                style={tw.style(
                                                  'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                                )}>
                                                <Text
                                                  style={tw.style(
                                                    'text-[13px] text-black',
                                                  )}>
                                                  {total_mac}
                                                </Text>
                                              </View>
                                              <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                  setIsShowMacIPwan(true);
                                                  setIsShowCheckService(false);
                                                  setIsDataMacIPwan({
                                                    key: key_mac,
                                                    val: mac_ipwan,
                                                  });
                                                }}
                                                style={tw.style(
                                                  `flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white relative ${
                                                    status === 'DOWN'
                                                      ? ''
                                                      : result_port
                                                      ? 'bg-green-200'
                                                      : 'bg-red-200'
                                                  }`,
                                                )}>
                                                <Text
                                                  style={tw.style(
                                                    'text-[13px] text-black',
                                                  )}>
                                                  {online_mac}
                                                </Text>
                                                <View
                                                  style={tw.style(
                                                    'absolute bottom-0 right-0',
                                                  )}>
                                                  <IconCP
                                                    name="expand-outline"
                                                    size={10}
                                                    color="#ebb619"
                                                  />
                                                </View>
                                              </TouchableOpacity>
                                              <View
                                                style={tw.style(
                                                  'flex-col py-1 items-center justify-center flex-1 border-b-[1px] border-l-[1px] border-white',
                                                )}>
                                                <RenderIconCheckStatus
                                                  status={result_port}
                                                />
                                              </View>
                                            </View>
                                          );
                                        })}
                                    </View>
                                  </>
                                );
                              }}
                            />
                          </>
                        );
                      },
                    )}
                </View>
              </View>
            </>
          ) : (
            <ScreenDevelopment
              message="Kế hoạch chưa được kiểm tra dịch vụ"
              styleContainer={tw.style('px-0')}
            />
          )}
        </View>
      </ActionSheetCP>
      {/* DETAIL MAC_IP_WAN */}
      <DialogCP
        visible={isShowMacIPwan}
        setVisible={setIsShowMacIPwan}
        styleDialog={tw`mx-10`}
        TitleCustom={() => {
          return (
            <Text
              style={tw.style('ml-4 mt-3 font-bold capitalize text-[18px]', {
                color: colors.BLACK_COLOR,
              })}>
              {isDataMacIPwan?.key}
            </Text>
          );
        }}>
        <View style={tw`bg-white p-4 rounded-md w-full mt-3`}>
          {fList(isDataMacIPwan?.val).length > 0 ? (
            fList(isDataMacIPwan?.val).map((val_ip, _idx_ip) => {
              const [ip, ip_val] = Object.entries(val_ip || {})?.[0];
              return (
                <View
                  key={_idx_ip}
                  style={tw.style(
                    'flex-row w-full justify-between items-center gap-2 text-[13px]',
                  )}>
                  <Text style={tw.style('text-black')}>{ip}</Text>
                  <Text style={tw.style('text-[#3a61c8]')}>
                    {ip_val === 'None' ? '-' : ip_val}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={tw.style(
                'text-black text-[14px] italic text-center mt-3',
              )}>
              Không có dữ liệu
            </Text>
          )}
        </View>
      </DialogCP>
    </>
  );
}
