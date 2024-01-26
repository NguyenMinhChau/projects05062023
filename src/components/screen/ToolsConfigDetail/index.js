import React from 'react';
import {BottomNavigation} from 'react-native-paper';
import BottomTabCP from '../../General/BottomTab';
import {routersConfigOLT, routersKey, useColorThemeToolsDetail} from './config';
import TTKH from './TTKH/TTKH';
import TTCH from './TTCH/TTCH';
import KQCH from './KQCH/KQCH';
import useAppContext from '../../../utils/hooks/useAppContext';
import {GET_JOB_BY_ID} from '../../../services/tools';
import LoadingScreen from '../../General/LoadingScreen';
import {useNotificationToast} from '../../../utils/notification_toast.utils';

export default function ToolsConfigDetail({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const {submitting} = state?.set_toggle;
  const {dataByObjId: dataByObjIdState} = state?.set_data;
  const {isLoading} = state.set_data.tools_config;
  const {dataByObjId, _id: idNotify} = {...route?.params};
  const {_id: idTask} = {...dataByObjId?.jobInfo};

  const {colors} = useColorThemeToolsDetail();
  const {openNotificationToast} = useNotificationToast();

  React.useEffect(() => {
    GET_JOB_BY_ID({
      id_job: idTask ? idTask : idNotify,
      dispatch,
      openNotificationToast,
    });
  }, []);

  const routeParams = {
    dataByObjId: dataByObjIdState,
  };

  const [index, setIndex] = React.useState(0);
  const renderScene = BottomNavigation.SceneMap({
    [routersKey.TTKH]: () => (
      <TTKH navigation={navigation} route={routeParams} />
    ),
    [routersKey.TTCH]: () => (
      <TTCH navigation={navigation} route={routeParams} />
    ),
    [routersKey.KQCH]: () => (
      <KQCH navigation={navigation} route={routeParams} />
    ),
  });
  const routes = routersConfigOLT(index);
  return (
    <>
      {(submitting || isLoading) && <LoadingScreen />}
      <BottomTabCP
        index={index}
        setIndex={setIndex}
        routes={routes}
        renderScene={renderScene}
        activeColor={colors.PRIMARY_COLOR}
      />
    </>
  );
}
