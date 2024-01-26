import React from 'react';
import {View, Text, Image, ScrollView, RefreshControl} from 'react-native';
import {useRefreshList} from '../../../utils/refreshList.utils';
import tw from '../../../styles/twrnc.global';
import {WHITE_COLOR} from '../../../styles/colors.global';
import {TYPE_JOB} from '../Tools/config';
import TTKHReplaceSwitchCE from './TTKH/ReplaceSwitchCE';
import TTKHConfigNewCE from './TTKH/ConfigNewCE';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import {useColorThemeToolsDetail} from './config';
import TTKHConfigNewPower from './TTKH/ConfigNewPower';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import FastImageCP from '../../General/FastImageCP';
import TTKHConfigOLT from './TTKH/ConfigOLT';
import TTKHUpgradeUplink from './TTKH/UpgradeUpLink';
import TTKHRebootPOP from './TTKH/RebootPop';

export default function WrapperToolsConfig({children, navigation, route}) {
  const {dataByObjId} = {...route};
  const {deviceInfo, jobInfo} = {...dataByObjId};
  const {info} = {...(deviceInfo?.[0] || deviceInfo)};
  const {popName} = {...info};
  const {jobName, typeJob, _id: idTask} = {...jobInfo};
  const {colors} = useColorThemeToolsDetail();

  const {refreshing, onRefresh} = useRefreshList();

  const renderByTypeJob = () => {
    switch (typeJob) {
      case TYPE_JOB.CONFIG_REPLACE_CE_SWITCH:
        return <TTKHReplaceSwitchCE idTask={idTask} />;
      case TYPE_JOB.CONFIG_NEW_CE_SWITCH:
        return <TTKHConfigNewCE idTask={idTask} />;
      case TYPE_JOB.REBOOT_POP:
        return <TTKHRebootPOP idTask={idTask} />;
      case TYPE_JOB.AUTO_CONFIG_OLT:
        return <TTKHConfigOLT idTask={idTask} />;
      case TYPE_JOB.CONFIG_NEW_POWER:
        return <TTKHConfigNewPower idTask={idTask} dataByObjId={dataByObjId} />;
      case TYPE_JOB.UPGRADE_UPLINK:
        return <TTKHUpgradeUplink idTask={idTask} dataByObjId={dataByObjId} />;
      default:
        return null;
    }
  };

  const uriImage =
    typeJob === TYPE_JOB.AUTO_CONFIG_OLT
      ? require('../../../assets/images/olt_image.png')
      : typeJob === TYPE_JOB.CONFIG_NEW_POWER
      ? require('../../../assets/images/power_image.png')
      : typeJob === TYPE_JOB.CONFIG_NEW_CE_SWITCH ||
        typeJob === TYPE_JOB.CONFIG_REPLACE_CE_SWITCH
      ? require('../../../assets/images/switch_ce_image.png')
      : typeJob === TYPE_JOB.POP_RELOCATION_PLAN_MPOP ||
        typeJob === TYPE_JOB.POP_RELOCATION_PLAN_POP ||
        typeJob === TYPE_JOB.POP_RELOCATION_PLAN_POP_PLUS ||
        typeJob === TYPE_JOB.REBOOT_POP
      ? require('../../../assets/images/pop_cabinet_image.png')
      : require('../../../assets/images/sw_hw_logo.png');

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop="#d8ebec"
        backgroundColorBottom={colors.WHITE_COLOR}>
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style(`w-full h-[150px] relative mb-3`, {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <BannerNestedScreen
              navigation={navigation}
              isBgcTransparent
              showSearchScreen={false}
            />
            <View style={tw`absolute w-full h-[80%]`}>
              <Image
                source={require('../../../assets/images/bg_config_olt.png')}
                style={tw.style(`w-full h-full`)}
                resizeMode="stretch"
              />
              <View
                style={tw`absolute w-full h-full top-[40%] items-center justify-center`}>
                <View
                  style={tw.style(
                    `absolute w-[100px] h-[100px] overflow-hidden rounded-full items-center justify-center p-2 border-[3px]`,
                    {
                      backgroundColor: WHITE_COLOR,
                      borderColor: colors.PRIMARY_COLOR,
                    },
                  )}>
                  <FastImageCP
                    uriLocal={uriImage}
                    resizeMode="cover"
                    onTouchStart={() => {}}
                    style={tw.style('w-[90%] h-[90%] min-h-0')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={tw`w-full mb-2 px-4 items-center justify-center `}>
            <Text
              style={tw.style(`font-bold text-[16px] text-center leading-6`, {
                color: colors.BLACK_COLOR,
              })}>
              {jobName}
            </Text>
            <Text
              style={tw.style(`font-medium text-[14px] text-center mt-2`, {
                color: colors.BLACK_COLOR,
              })}>
              #{popName}
            </Text>
          </View>
          {renderByTypeJob()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={tw.style(`flex-1 p-2`, {
              backgroundColor: colors.WHITE_COLOR,
            })}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {children}
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}
