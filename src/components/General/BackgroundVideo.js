import {Dimensions, RefreshControl, ScrollView, View} from 'react-native';
import Video from 'react-native-video';
import tw from '../../styles/twrnc.global';
import {useRefreshList} from '../../utils/refreshList.utils';

export default function BackgroundVideoCP({
  styleContainer,
  styleVideoContainer,
  uri,
  uriLocal,
  children,
  resizeMode = 'stretch',
  refreshControls,
}) {
  const {onRefresh, refreshing} = useRefreshList(refreshControls);
  return (
    <ScrollView
      refreshControl={
        refreshControls ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : null
      }
      nestedScrollEnabled
      contentContainerStyle={tw.style('flex-1', {...styleContainer})}>
      {uriLocal || uri ? (
        <Video
          source={uriLocal ? uriLocal : {uri: uri}}
          style={tw.style('absolute top-0 left-0 bottom-0 right-0', {
            ...styleVideoContainer,
          })}
          muted={true}
          repeat={true}
          resizeMode={resizeMode}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
      ) : (
        <View style={tw.style('flex-0')}></View>
      )}
      {children}
    </ScrollView>
  );
}
