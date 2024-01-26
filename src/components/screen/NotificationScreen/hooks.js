import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import useAppContext from '../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';
import tw from '../../../styles/twrnc.global';
import {Text, View} from 'react-native';
import FastImageCP from '../../General/FastImageCP';
import {Divider} from 'react-native-paper';
import NavigateService from '../../routersConfig/NavigateService';
import {DATA_MOCK_NOTIFICATION} from './config';
import moment from 'moment';
import {IconCP} from '../../../utils/icon.utils';

export const useNotificationScreen = () => {
  const {state, dispatch} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {openNotificationToast} = useNotificationToast();

  const {
    isLoading,
    filter_type,
    isVisibleFilter,
    list_notifications,
    list_notifications_read,
    list_notifications_no_read,
  } = state.set_data.notification_screen_state;

  const handleChange = (key, val) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'notification_screen_state',
        value: {
          [key]: val,
        },
      }),
    );
  };

  const RenderItemNotification = ({item, index}) => {
    const {_id, value, tab_active, redirect_to, createdAt, read} = {...item};
    const {image_url, title, sub_title} = {...value};
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            NavigateService?.navigate(redirect_to, {
              _id: _id,
              value: value,
              tab_active: tab_active,
            });
          }}
          style={tw.style(`py-3 relative`, {
            backgroundColor: read ? 'transparent' : colors.PRIMARY_COLOR + '1a',
          })}>
          <View
            style={tw.style(
              'absolute top-2 right-2 flex-row items-center gap-1',
            )}>
            <Text
              style={tw.style('italic text-[11px] capitalize', {
                color: colors.BLACK_COLOR,
              })}>
              {moment(createdAt).format('dddd, DD/MM/YYYY HH:mm:ss')}
            </Text>
            {!read ? (
              <View style={tw.style('w-2 h-2 bg-red-500 rounded-full')}></View>
            ) : (
              <IconCP name="checkmark-done-outline" size={16} color="#9a9a9a" />
            )}
          </View>
          <View style={tw.style('flex-row w-full gap-2 mt-[10px]')}>
            <View style={tw.style('w-10 h-10 rounded-full')}>
              <FastImageCP
                uri={image_url}
                uriError={require('../../../assets/images/question-image.png')}
                uriLocal={require('../../../assets/images/question-image.png')}
                resizeMode="contain"
                style={tw.style('w-full h-full min-h-0')}
              />
            </View>
            <View style={tw.style('flex-1 flex-col')}>
              <Text
                style={tw.style('font-bold text-[14px] leading-5', {
                  color: colors.BLACK_COLOR,
                })}>
                {title}
              </Text>
              <Text
                style={tw.style('text-[12px] font-normal leading-5 italic', {
                  color: colors.BLACK_COLOR,
                })}>
                {sub_title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  const DATA_NOTIFICATION =
    filter_type === 'all'
      ? DATA_MOCK_NOTIFICATION
      : filter_type === 'read'
      ? DATA_MOCK_NOTIFICATION?.filter(item => item?.read)
      : DATA_MOCK_NOTIFICATION?.filter(item => !item?.read);

  return {
    isLoading,
    list_notifications,
    list_notifications_read,
    list_notifications_no_read,
    filter_type,
    isVisibleFilter,
    DATA_NOTIFICATION,

    handleChange,
    RenderItemNotification,
  };
};
