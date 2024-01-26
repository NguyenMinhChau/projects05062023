import React from 'react';
import {useColorThemeToolsDetail} from '../config';
import tw from '../../../../styles/twrnc.global';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {fList} from '../../../../utils/array.utils';
import AccordionCP from '../../../General/AccordionCP';
import RenderTagCP from '../../../General/RenderTag';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {PRIMARY_COLOR} from '../../../../styles/colors.global';

const TYPE_REBOOT_POP = [
  {label: 'Song Song (Giống BotChat)', value: 'SYNCHRONOUS'},
  {label: 'Tuần tự', value: 'ASYNCHRONOUS'},
];
const TYPE_RUN_POP = [
  {label: 'Thực thi thủ công', value: 'MANUAL'},
  {label: 'Thực thi tự động', value: 'AUTO'},
];

export default function TTCHRebootPop({dataByObjId, props = {}}) {
  const {colors} = useColorThemeToolsDetail();
  const {deviceInfo, jobInfo} = {...dataByObjId};
  const [isVisible, setIsVisible] = React.useState(false);
  const [targetVisible, setTargetVisible] = React.useState(null);

  const {initialConfigInfo} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {typeRebootPOP, typeRun} = {...jobInfo};

  const typeRebootVI = TYPE_REBOOT_POP.filter(
    x => x.value === typeRebootPOP,
  )?.[0]?.label;
  const typeRunVI = TYPE_RUN_POP.filter(x => x.value === typeRun)?.[0]?.label;

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
          Danh sách POP
        </Text>
        <Text
          style={tw.style('text-[14px] mb-1 font-bold', {
            color: colors.BLACK_COLOR,
          })}>
          Cách Reboot:{' '}
          <Text style={tw.style('text-orange-500')}>{typeRebootVI}</Text>
        </Text>
        <Text
          style={tw.style('text-[14px] mb-1 font-bold', {
            color: colors.BLACK_COLOR,
          })}>
          Cách thực thi:{' '}
          <Text style={tw.style('text-orange-500')}>{typeRunVI}</Text>
        </Text>
        {fList(deviceInfo)?.length > 0 ? (
          fList(deviceInfo)?.map((item, _idx) => {
            const {data, _id} = {...item};
            const {popName} = {..._id};
            const {nameOps} = {...data?.[0]};
            return (
              <AccordionCP
                toggleDropDown={
                  isVisible && targetVisible === popName
                    ? () => {
                        setIsVisible(false);
                        setTargetVisible(null);
                      }
                    : () => {
                        setIsVisible(true);
                        setTargetVisible(popName);
                      }
                }
                open={isVisible && targetVisible === popName}
                key={_idx}
                styleRow={tw.style('px-1 py-0 m-0 mb-3', {
                  backgroundColor:
                    popName === targetVisible
                      ? PRIMARY_COLOR + '9a'
                      : 'transparent',
                  borderRadius: popName === targetVisible ? 8 : 0,
                })}
                styleTitle={tw.style(
                  'text-[#243c7c] text-[14px] p-0 font-bold',
                )}
                TitleCustom={() => {
                  return (
                    <View
                      style={tw.style(
                        'flex-row flex-wrap w-full items-center justify-between py-2',
                      )}>
                      <View style={tw.style('flex-col')}>
                        <Text
                          style={tw.style('text-[14px] p-0 font-bold', {
                            color: colors.WARNING_COLOR,
                          })}>
                          {popName}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                RenderItemCustom={() => {
                  return (
                    <>
                      <View
                        style={tw.style(
                          'w-full bg-gray-100 rounded-lg overflow-hidden mb-3',
                        )}>
                        <View
                          style={tw.style(
                            'flex-row items-center justify-between w-full border-b-[1px] border-white',
                          )}>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 py-1 px-[2px]',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Tên TB
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 py-1 px-[2px]',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              IP TB
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 py-1 px-[2px]',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Type Dev
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 py-1 px-[2px]',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Trạng thái
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col items-center justify-center flex-1 py-1 px-[2px]',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[13px] text-[#243c7c] font-bold',
                              )}>
                              Kết quả
                            </Text>
                          </View>
                        </View>
                        {fList(deviceInfo)?.length > 0 ? (
                          fList(data)?.map((item, _idx) => {
                            const {
                              nameOps,
                              nameDev,
                              ipDev,
                              typeDev,
                              status,
                              resultStatus,
                            } = {...item};
                            return (
                              <View key={_idx} style={tw.style('flex-col')}>
                                <Text
                                  style={tw.style(
                                    'text-[#20bf6b] text-[12px] p-1 font-bold',
                                  )}>
                                  <Text style={tw.style('text-black')}>
                                    NameOps:
                                  </Text>{' '}
                                  {nameOps}
                                </Text>
                                <View
                                  style={tw.style(
                                    `flex-row items-center justify-between w-full border-b-[1px] border-white`,
                                  )}>
                                  <View
                                    style={tw.style(
                                      'flex-col items-center justify-center flex-1 py-1 px-[2px] ',
                                    )}>
                                    <Text
                                      style={tw.style(
                                        'text-[12px] text-black text-center',
                                      )}>
                                      {nameDev}
                                    </Text>
                                  </View>
                                  <View
                                    style={tw.style(
                                      'flex-col py-1 px-[2px] items-center justify-center flex-1',
                                    )}>
                                    <Text
                                      style={tw.style(
                                        'text-[12px] text-black text-center',
                                      )}>
                                      {ipDev}
                                    </Text>
                                  </View>
                                  <View
                                    style={tw.style(
                                      'flex-col  items-center justify-center flex-1 py-1 px-[2px]',
                                    )}>
                                    <RenderTagCP
                                      tag={typeDev}
                                      styleContainer={tw.style(
                                        'p-[2px] border-black',
                                      )}
                                      styleText={tw.style(
                                        'text-[10px] text-black',
                                      )}
                                    />
                                  </View>
                                  <View
                                    style={tw.style(
                                      'flex-col  items-center justify-center flex-1 py-1 px-[2px]',
                                    )}>
                                    <RenderTagCP
                                      tag={status}
                                      styleContainer={tw.style('p-[2px]')}
                                      styleText={tw.style('text-[10px]')}
                                    />
                                  </View>
                                  <View
                                    style={tw.style(
                                      'flex-col  items-center justify-center flex-1 py-1 px-[2px]',
                                    )}>
                                    <RenderTagCP
                                      tag={resultStatus}
                                      styleContainer={tw.style('p-[2px]')}
                                      styleText={tw.style('text-[10px]')}
                                    />
                                  </View>
                                </View>
                              </View>
                            );
                          })
                        ) : (
                          <Text style={tw.style('text-black text-center my-2')}>
                            Không có dữ liệu
                          </Text>
                        )}
                      </View>
                    </>
                  );
                }}
              />
            );
          })
        ) : (
          <Text style={tw.style('text-black text-center my-2')}>
            Không có dữ liệu
          </Text>
        )}
      </View>
    </>
  );
}
