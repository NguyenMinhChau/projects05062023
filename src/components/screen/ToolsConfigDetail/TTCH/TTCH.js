import React from 'react';
import {View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import WrapperToolsConfig from '../Wrapper';
import {ColorsStatusHandle} from '../../../../utils/ColorsHandle';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import TTCHConfigNewOLT from './ConfigNewOLT';
import TTCHConfigNewCE from './ConfigNewCE';
import TTCHReplaceSwitchCE from './ReplaceSwitchCE';
import {TYPE_JOB} from '../../Tools/config';
import {STEP_CODE_VIE_CONFIG, useColorThemeToolsDetail} from '../config';
import TTCHConfigNewPower from './ConfigNewPower';
import TTCHRebootPop from './RebootPop';
import TTCHUpgradeUpLink from './UpgradeUpLink';

export default function TTCH({navigation, route}) {
  const {dataByObjId} = route;
  const {jobInfo, deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();

  const {info} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {modelDev, popName, group, function: FuncDev, typeDev} = {...info};

  const {status, typeJob} = {...jobInfo};

  const stepStatusVi =
    status && STEP_CODE_VIE_CONFIG.filter(x => x.label === status)?.[0]?.value;

  const renderByTypeJob = () => {
    switch (typeJob) {
      case TYPE_JOB.CONFIG_REPLACE_CE_SWITCH:
        return <TTCHReplaceSwitchCE dataByObjId={dataByObjId} />;
      case TYPE_JOB.CONFIG_NEW_CE_SWITCH:
        return <TTCHConfigNewCE dataByObjId={dataByObjId} />;
      case TYPE_JOB.AUTO_CONFIG_OLT:
        return <TTCHConfigNewOLT dataByObjId={dataByObjId} />;
      case TYPE_JOB.CONFIG_NEW_POWER:
        return <TTCHConfigNewPower dataByObjId={dataByObjId} />;
      case TYPE_JOB.REBOOT_POP:
        return <TTCHRebootPop dataByObjId={dataByObjId} />;
      case TYPE_JOB.UPGRADE_UPLINK:
        return <TTCHUpgradeUpLink dataByObjId={dataByObjId} />;
      default:
        return null;
    }
  };

  return (
    <WrapperToolsConfig navigation={navigation} route={route}>
      {/* INFO GENERAL */}
      <View
        style={tw.style(`w-full rounded-lg p-2`, {
          backgroundColor: colors.BACKGROUND_CARD,
        })}>
        <RowDialogCP
          label="Loại thiết bị"
          value={typeDev}
          noneBorderBottom
          styleLabel={tw`font-bold`}
          styleRow={tw`py-2`}
          leftNameIcon="scale-outline"
        />
        <RowDialogCP
          label="Model thiết bị"
          value={modelDev}
          noneBorderBottom
          styleLabel={tw`font-bold`}
          styleRow={tw`py-2`}
          leftNameIcon="scale-outline"
        />
        <RowDialogCP
          label="POP"
          value={popName}
          noneBorderBottom
          styleLabel={tw`font-bold`}
          styleRow={tw`py-2`}
          leftNameIcon="laptop-outline"
        />
        <RowDialogCP
          label="Group"
          value={group}
          noneBorderBottom
          styleLabel={tw`font-bold`}
          styleRow={tw`py-2`}
          leftNameIcon="bowling-ball-outline"
        />
        <RowDialogCP
          label="Function"
          value={FuncDev}
          noneBorderBottom
          styleLabel={tw`font-bold`}
          styleRow={tw`py-2`}
          leftNameIcon="code-outline"
        />
        <RowDialogCP
          label="Trạng thái"
          value={stepStatusVi}
          colorVal={ColorsStatusHandle(status)}
          noneBorderBottom
          styleLabel={tw`font-bold`}
          styleRow={tw`py-2`}
          leftNameIcon="chatbubbles-outline"
        />
      </View>
      {renderByTypeJob()}
    </WrapperToolsConfig>
  );
}
