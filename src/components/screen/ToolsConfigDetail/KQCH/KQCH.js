import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import WrapperToolsConfig from '../Wrapper';
import KQCHConfigNewOLT from './ConfigNewOLT';
import KQCHReplaceSwitchCE from './ReplaceSwitchCE';
import KQCHConfigNewCE from './ConfigNewCE';
import {TYPE_JOB} from '../../Tools/config';
import {useColorThemeToolsDetail} from '../config';
import ScreenDevelopment from '../../../General/ScreenDevelopment';

export default function KQCH({navigation, route}) {
  const {refreshing, onRefresh} = useRefreshList();
  const {colors} = useColorThemeToolsDetail();
  const {dataByObjId} = {...route};
  const {jobInfo} = {...dataByObjId};
  const {typeJob} = {...jobInfo};

  const renderByTypeJob = () => {
    switch (typeJob) {
      case TYPE_JOB.CONFIG_REPLACE_CE_SWITCH:
        return <KQCHReplaceSwitchCE dataByObjId={dataByObjId} />;
      case TYPE_JOB.CONFIG_NEW_CE_SWITCH:
        return <KQCHConfigNewCE dataByObjId={dataByObjId} />;
      case TYPE_JOB.AUTO_CONFIG_OLT:
        return <KQCHConfigNewOLT dataByObjId={dataByObjId} />;
      default:
        return <ScreenDevelopment styleContainer={tw.style('px-0')} />;
    }
  };

  return (
    <WrapperToolsConfig navigation={navigation} route={route}>
      <View style={tw.style(`flex-1 py-2`)}>
        <Text
          style={tw.style(`font-bold text-[20px]`, {
            color: colors.BLACK_COLOR,
          })}>
          Kết quả cấu hình
        </Text>
        {renderByTypeJob()}
      </View>
    </WrapperToolsConfig>
  );
}
