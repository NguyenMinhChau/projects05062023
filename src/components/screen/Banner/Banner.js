import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
  Text,
} from 'react-native';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import tw from '../../../styles/twrnc.global';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import {
  BLACK_COLOR,
  CRITICAL_COLOR,
  DISABLED_COLOR,
  MAIN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../../styles/colors.global';
import {IconCP} from '../../../utils/icon.utils';
import LoadingScreen from '../../General/LoadingScreen';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import SearchScreen from '../../General/SearchScreen';
import TextInputCP from '../../General/TextInputCP';
import {TextInput} from 'react-native-paper';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSpringTransition,
  withTimingTransition,
} from 'react-native-reanimated';
import {useLayoutAnimation} from '../../../utils/LayoutAnimation';
import {useRoute} from '@react-navigation/native';

const Banner = ({navigation}) => {
  const {dispatch, state} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {isVisible_search, submitting} = state.set_toggle;
  const {search} = state.set_data;
  const {LayoutAnimationConfig, ANIMATION_TYPE, ANIMATION_PROPERTY} =
    useLayoutAnimation();
  const widthDevice = Dimensions.get('window').width;
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
    searchInputWidth.value = isVisible_search ? widthDevice - 30 : 0;
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

  const countNotifications = 15;
  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <>
          <View
            style={tw.style(
              `relative top-0 w-full bg-[${colors.MAIN_COLOR}] h-[60px]`,
              {
                zIndex: 99,
              },
            )}>
            {!isVisible_search && (
              <View
                style={tw.style('absolute top-[25%] left-0 ml-4', {
                  zIndex: 100,
                })}
                onTouchStart={() => {
                  dispatch(
                    SET_TOGGLE_PAYLOAD({
                      key: 'isVisible_search',
                      value: false,
                    }),
                  );
                  navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen);
                }}>
                <Image
                  style={tw.style('absolute left-0', {zIndex: 100})}
                  source={require('../../../assets/images/ICDP_mobile_logo_2.png')}></Image>
              </View>
            )}
            {/* Menu toggle, search */}
            <View
              style={tw.style(
                'flex-row gap-3 h-full items-center justify-center absolute right-0 mr-4',
                {
                  zIndex: 100,
                },
              )}>
              {isVisible_search ? (
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
                          dispatch(
                            SET_DATA_PAYLOAD({key: 'search', value: ''}),
                          );
                        }}
                      />
                    }
                    leftContent={
                      <TextInput.Icon
                        icon="magnify"
                        size={23}
                        color={'#677483'}
                      />
                    }
                  />
                </Animated.View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={e => {
                    toggleVisibilitySearch(e);
                  }}
                  style={tw.style('mr-1 items-center justify-center')}>
                  <IconCP name="search-outline" size={25} color={WHITE_COLOR} />
                </TouchableOpacity>
              )}
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
          </View>
          <SearchScreen navigation={navigation} />
        </>
      )}
    </>
  );
};

export default Banner;
