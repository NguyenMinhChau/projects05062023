import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Banner from '../Banner/Banner';
import tw from '../../../styles/twrnc.global';
import {CARD_DATA} from './Dashboard.data';
import useAppContext from '../../../utils/hooks/useAppContext';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../styles/colors.global';
import {AUTH_RETRIEVE} from '../../../services/auth';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import LoaderSliderCP from '../../LoaderApp/LoaderSlider';
import {
  getAsyncCacheBiometric,
  getAsyncCacheLoaderSliderUsed,
  setAsyncCacheBiometric,
  setAsyncCacheLoaderSliderUsed,
} from '../../../utils/cache.services';
import {IconCP} from '../../../utils/icon.utils';
import {VIEW_OPTIONS_NEW_FEED, useColorThemeDashboard} from './config';
import {NEW_FEED_DATA} from './Newfeed.data';
import {dd__mm__yyyy} from '../../../utils/TimerFormat';
import FastImage from 'react-native-fast-image';
import {
  getTokenDevice,
  sendNotification,
} from '../../../utils/notifications.utils';
import {useCopyToClipboard} from '../../../utils/copy.clipboard';
import FastImageCP from '../../General/FastImageCP';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../General/NotificationToast';
import {useCssApp} from '../../../utils/css.utils';
import {useLayoutAnimation} from '../../../utils/LayoutAnimation';
import {Divider} from 'react-native-paper';

const IMAGE_SLIDER = [
  require('../../../assets/images/slider_1_500x500.png'),
  require('../../../assets/images/slider_2_500x500.png'),
  require('../../../assets/images/slider_3_500x500.png'),
  // require('../../../assets/images/slider_4_500x500.png'),
  require('../../../assets/images/slider_5_500x500.png'),
];

const DashboardPage = ({navigation, route}) => {
  const {dispatch, state} = useAppContext();
  const {openNotificationToast} = useNotificationToast();
  const {onCopyToClipboard} = useCopyToClipboard();

  const {data} = {...route.params};

  const {
    accessToken,
    loader_slider_used,
    tokenSecurity,
    biometric_app,
    currentUser,
  } = state.set_data;
  const [isViewNewFeed, setIsViewNewFeed] = React.useState('view_2');
  const [indexDot, setIndexDot] = React.useState(0);
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();
  const {colors} = useColorThemeDashboard();
  const {shadowCss} = useCssApp();

  const handleCardPress = async (send_msg, access_token, token_security) => {
    if (send_msg) {
      const token = await getTokenDevice();
      onCopyToClipboard(token);
      await sendNotification(token);
    } else if (access_token) {
      const accessTokenVal = accessToken?.accessToken || '';
      onCopyToClipboard(accessTokenVal);
    } else if (token_security) {
      const tokenSecurityVal = tokenSecurity?.tokenSecurity || '';
      onCopyToClipboard(tokenSecurityVal);
    } else {
      openNotificationToast({
        title: 'Thông báo',
        type: TYPE_NOTIFICATION.INFO,
        message: 'Giao diện đang phát triển!',
      });
    }
  };

  const handleRedirect = router => {
    navigation.navigate({
      name: router,
      params: {
        data: data,
      },
    });
  };

  const screenWidth = Dimensions.get('window').width;
  const widthEventUsed = screenWidth / 2 - 8 * 2;

  const RenderToolsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          item?.router
            ? handleRedirect(item?.router)
            : handleCardPress(false, false, false);
        }}
        key={item.id}
        style={tw.style('flex-col items-center justify-center gap-1', {
          width: screenWidth / 4 - 8 * 2,
          height: 100,
        })}>
        <View style={tw.style('w-[30px] h-[30px]')}>
          {item?.image ? (
            <FastImageCP
              uriLocal={item?.image}
              resizeMode="contain"
              style={tw.style('w-full min-h-[23px] flex-0')}
            />
          ) : (
            <IconCP
              name={item?.iconName}
              size={20}
              color={colors.BLACK_COLOR}
              typeIcon={item?.typeIcon}
            />
          )}
        </View>
        <Text
          style={tw.style('text-[12px] font-medium text-center', {
            color: colors.BLACK_COLOR,
          })}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderNewFeedItem = ({item, index}) => {
    const classedView =
      isViewNewFeed === 'view_1'
        ? {
            width: screenWidth - 24,
            marginBottom: 10,
            flexDirection: 'row',
          }
        : {
            width: widthEventUsed,
            marginLeft: index % 2 === 0 ? 0 : 10,
            marginBottom: 10,
          };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={item.id}
        onPress={() => {
          item?.router
            ? handleRedirect(item?.router)
            : handleCardPress(
                item?.send_msg || false,
                item?.access_token || false,
                item?.token_security || false,
              );
        }}
        style={tw.style(`rounded-lg p-2 justify-center items-center gap-2`, {
          backgroundColor: item?.backgroundColor || colors.BACKGROUND_CARD,
          ...shadowCss({
            elevation: item?.backgroundColor ? 0 : 3,
          }),
          ...classedView,
        })}>
        <View
          style={tw.style(
            `flex-row items-start justify-between ${
              isViewNewFeed === 'view_1' ? 'mb-auto' : 'w-full'
            }`,
          )}>
          <View
            style={tw.style(
              `${
                item?.backgroundIcon
                  ? `bg-[${item?.backgroundIcon}]`
                  : 'bg-gray-50'
              } w-[35px] h-[35px] p-1 items-center justify-center rounded-full overflow-hidden`,
            )}>
            {item?.iconImage ? (
              <FastImageCP
                uriLocal={item?.iconImage}
                resizeMode="contain"
                style={tw.style('min-h-0 w-[25px] h-[25px]')}
              />
            ) : (
              <IconCP
                name={item?.iconName}
                size={28}
                color={item?.colorIcon || BLACK_COLOR}
                typeIcon={item?.typeIcon}
              />
            )}
          </View>
          {isViewNewFeed === 'view_2' && (
            <IconCP
              name="megaphone-outline"
              size={20}
              color={item?.colorIconStar || colors.DISABLED_COLOR}
            />
          )}
        </View>
        <View
          style={tw.style(
            'flex-col flex-1 gap-1 items-start justify-start w-full',
          )}>
          <Text
            style={tw.style(`font-bold text-[15px] mt-1`, {
              color: item?.textColorTitle || colors.TITLE_CARD_COLOR,
            })}>
            {item.title}
          </Text>
          <Text
            style={tw.style(`text-[13px]`, {
              color: item?.textColorCategory || colors.DESC_CARD_COLOR,
            })}>
            {item.description}
          </Text>
          <View
            style={tw.style('flex-row items-end justify-between w-full gap-2')}>
            <Text
              style={tw.style(`text-[13px] flex-grow w-1`, {
                color: item?.textColorCategory || colors.DESC_CARD_COLOR,
              })}>
              {dd__mm__yyyy(item.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loader_slider_used?.state ? (
        <LoaderSliderCP
          redirect={navigation}
          onClick={async () => {
            await setAsyncCacheLoaderSliderUsed({state: false});
            await getAsyncCacheLoaderSliderUsed(dispatch);
          }}
        />
      ) : (
        <SafeAreaWrap
          backgroundColorTop={colors.MAIN_COLOR}
          backgroundColorBottom={colors.WHITE_COLOR}>
          <Banner navigation={navigation} />
          <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
            <View
              style={tw.style('w-full', {
                backgroundColor: colors.WHITE_COLOR,
              })}>
              <SliderBox
                activeOpacity={1}
                ImageComponent={FastImage}
                images={IMAGE_SLIDER}
                sliderBoxHeight={200}
                paginationBoxVerticalPadding={20}
                currentImageEmitter={index => {
                  setIndexDot(index);
                  LayoutAnimationConfig(
                    400,
                    ANIMATION_TYPE.EASE_IN_EASE_OUT,
                    ANIMATION_PROPERTY.OPACITY,
                  );
                }}
                autoplay
                autoplayInterval={5000}
                resizeMethod={'resize'}
                resizeMode={'contain'}
                // resizeMode={'cover'}
                paginationBoxStyle={tw.style(
                  'absolute bottom-0 p-0 m-0 items-center justify-center py-2 self-center',
                )}
                dotColor={PRIMARY_COLOR}
                inactiveDotColor={tw.color('gray-400')}
                dotStyle={tw.style('hidden')}
                ImageComponentStyle={tw.style(
                  'w-[97%] my-2 bg-white rounded-lg',
                )}
                imageLoadingColor={PRIMARY_COLOR}
              />
              <View
                style={tw.style(
                  'flex-row items-center justify-center gap-1 mb-2',
                )}>
                {IMAGE_SLIDER.map((item, index) => {
                  return (
                    <View
                      style={tw.style(
                        `h-[8px] rounded-md ${
                          index === indexDot
                            ? `bg-[${PRIMARY_COLOR}] w-6`
                            : `bg-gray-200 w-[10px]`
                        }`,
                      )}></View>
                  );
                })}
              </View>
            </View>
            <Divider />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={tw.style({
                backgroundColor: colors.WHITE_COLOR,
              })}
              nestedScrollEnabled
              contentContainerStyle={tw`flex-grow`}>
              {/* ICDP ĐỀ XUẤT */}
              <View style={tw.style('w-full')}>
                <View
                  style={tw.style(
                    'flex-row items-center justify-between w-full',
                  )}>
                  <View style={tw`flex-row items-center gap-1 mt-4 mx-3`}>
                    <Text
                      style={tw.style(`font-bold text-[20px]`, {
                        color: colors.ACTIVE_COLOR,
                      })}>
                      ICDP đề xuất
                    </Text>
                  </View>
                </View>
                <View style={tw.style('px-3')}>
                  <FlatList
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={CARD_DATA}
                    contentContainerStyle={{
                      gap: 8,
                    }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={RenderToolsItem}
                    nestedScrollEnabled
                  />
                </View>
              </View>
              <Divider />
              {/* NEW FEED  */}
              <View style={tw.style('w-full h-full')}>
                <View
                  style={tw.style(
                    'flex-row items-center justify-between w-full',
                  )}>
                  <View style={tw`flex-row items-center gap-1 my-4 mx-3`}>
                    <Text
                      style={tw.style(`font-bold text-[20px]`, {
                        color: colors.ACTIVE_COLOR,
                      })}>
                      Tin tức
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-3 my-4 mx-3`}>
                    {VIEW_OPTIONS_NEW_FEED.map((item, _idx) => {
                      return (
                        <TouchableOpacity
                          key={_idx}
                          activeOpacity={0.7}
                          style={tw.style(
                            `rounded w-[30px] h-[30px] items-center justify-center ${
                              isViewNewFeed === item?.view
                                ? `bg-[${colors.VIEW_ACTIVE_COLOR + '2a'}]`
                                : ''
                            }`,
                          )}
                          onPress={() => setIsViewNewFeed(item?.view)}>
                          <IconCP
                            name={item?.iconName}
                            size={item?.sizeIcon}
                            color={
                              isViewNewFeed === item?.view
                                ? colors.VIEW_ACTIVE_COLOR
                                : colors.BLACK_COLOR
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <FlatList
                  key={isViewNewFeed === 'view_1' ? '$' : '#'}
                  showsVerticalScrollIndicator={false}
                  data={NEW_FEED_DATA}
                  contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                  numColumns={isViewNewFeed === 'view_1' ? 1 : 2}
                  keyExtractor={item => {
                    return isViewNewFeed === 'view_1'
                      ? '$' + item.id.toString()
                      : '#' + item.id.toString();
                  }}
                  renderItem={RenderNewFeedItem}
                  nestedScrollEnabled
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaWrap>
      )}
    </>
  );
};

export default DashboardPage;
