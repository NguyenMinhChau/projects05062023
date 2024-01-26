import React from 'react';
import {View, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
import tw from '../../styles/twrnc.global';
import {IconCP} from '../../utils/icon.utils';
import {
  BLACK_COLOR,
  CRITICAL_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../styles/colors.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../Context/AppContext.reducer';
import useAppContext from '../../utils/hooks/useAppContext';
import SearchScreen from './SearchScreen';
import TextInputCP from './TextInputCP';
import {TextInput} from 'react-native-paper';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import {useRoute} from '@react-navigation/native';

export default function BannerNestedScreen({
  navigation,
  title,
  styleText,
  isBgcTransparent = false,
  colorIcon,
  showSearchScreen = true,
  showLogo = true,
  showDownLoadFile = false,
  onPressDownLoadFile = () => {},
  handleBack = () => {},
  ActionCustom,
}) {
  const {colors} = useGetColorThemeDisplay();
  const {dispatch, state} = useAppContext();
  const {isVisible_search} = state.set_toggle;
  const {search} = state.set_data;
  const refSearch = React.useRef(null);
  const route = useRoute();

  const searchInputWidth = useSharedValue(0);

  const inputStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(searchInputWidth.value, {
        duration: 350,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(searchInputWidth.value === 0 ? 0 : 1, {
        duration: 350,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  React.useEffect(() => {
    searchInputWidth.value = isVisible_search ? widthDevice - 20 : 0;
    if (refSearch?.current) {
      refSearch.current.focus();
    }
  }, [isVisible_search, refSearch]);

  const toggleVisibilitySearch = e => {
    e.stopPropagation();
    dispatch(
      SET_TOGGLE_PAYLOAD({key: 'isVisible_search', value: !isVisible_search}),
    );
  };

  const widthDevice = Dimensions.get('window').width;

  return (
    <>
      <View
        style={tw.style(
          `flex-row items-center justify-between gap-1 z-30 p-2 min-h-[60px]`,
          {
            backgroundColor: isBgcTransparent
              ? 'transparent'
              : colors.MAIN_COLOR,
          },
        )}>
        {isVisible_search && (
          <Animated.View style={[inputStyles, {overflow: 'hidden'}]}>
            <TextInputCP
              ref={refSearch}
              placeholder="Bạn muốn tìm gì?"
              placeholderTextColor={'#677483'}
              textColor={BLACK_COLOR}
              cursorColor={PRIMARY_COLOR}
              name="search"
              value={search}
              onChange={val => {
                dispatch(SET_DATA_PAYLOAD({key: 'search', value: val}));
              }}
              style={tw.style(`bg-white justify-center h-[35px] mb-0`)}
              contentStyle={tw.style('mr-[40px] ml-[45px]')}
              outlinedStyle={tw.style('rounded-full border-white')}
              rightContent={
                <TextInput.Icon
                  icon="close-circle-outline"
                  size={23}
                  color={'#677483'}
                  style={tw.style('mr-[-8px]')}
                  onTouchStart={() => {
                    dispatch(
                      SET_TOGGLE_PAYLOAD({
                        key: 'isVisible_search',
                        value: false,
                      }),
                    );
                    dispatch(SET_DATA_PAYLOAD({key: 'search', value: ''}));
                  }}
                />
              }
              leftContent={
                <TextInput.Icon icon="magnify" size={23} color={'#677483'} />
              }
            />
          </Animated.View>
        )}
        {!isVisible_search && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
                dispatch(
                  SET_TOGGLE_PAYLOAD({
                    key: 'isVisible_search',
                    value: false,
                  }),
                );
                handleBack();
              }}
              style={tw.style('p-3')}>
              <IconCP
                name="arrow-back-outline"
                size={25}
                color={isBgcTransparent ? BLACK_COLOR : WHITE_COLOR}
              />
            </TouchableOpacity>
            {title && (
              <Text
                style={tw.style(
                  'flex-1 px-5 text-white font-bold text-center text-[18px] leading-5',
                  {
                    color: isBgcTransparent ? BLACK_COLOR : WHITE_COLOR,
                    ...styleText,
                  },
                )}>
                {title}
              </Text>
            )}
            <View
              style={tw.style(
                'p-3 flex-row gap-2 items-center justify-center',
              )}>
              {showDownLoadFile && (
                <View style={tw`items-end justify-end`}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPressDownLoadFile}
                    style={tw.style('items-center justify-center')}>
                    <IconCP
                      name="download-outline"
                      size={25}
                      color={isBgcTransparent ? BLACK_COLOR : WHITE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {showSearchScreen ? (
                <View style={tw`items-end justify-end`}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={e => toggleVisibilitySearch(e)}
                    style={tw.style('mr-1 items-center justify-center')}>
                    <IconCP
                      name="search-outline"
                      size={25}
                      color={isBgcTransparent ? BLACK_COLOR : WHITE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              ) : showLogo ? (
                <View style={tw`w-[60px] h-[40px]`}>
                  <Image
                    source={require('../../assets/images/ICDP_mobile_logo_2.png')}
                    style={tw`w-full h-full`}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
              {ActionCustom && <ActionCustom />}
              {!isVisible_search && (
                <View style={tw.style('relative')}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate(SCREEN_NAVIGATE.Notification_Screen);
                    }}
                    style={tw.style('mr-1 items-center justify-center')}>
                    <IconCP
                      name={
                        route?.name === SCREEN_NAVIGATE.Notification_Screen
                          ? 'notifications'
                          : 'notifications-outline'
                      }
                      size={25}
                      color={
                        route?.name ===
                        SCREEN_NAVIGATE.Tools_Config_Detail_Screen
                          ? PRIMARY_COLOR
                          : WHITE_COLOR
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={tw.style(
                      'absolute top-0 right-0 bg-red-500 p-[2px] w-2 h-2 rounded-full items-center justify-center',
                    )}></View>
                </View>
              )}
            </View>
          </>
        )}
      </View>
      <SearchScreen navigation={navigation} />
    </>
  );
}
