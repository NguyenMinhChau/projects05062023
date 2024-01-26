import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import Banner from '../Banner/Banner';
import {BLACK_COLOR} from '../../../styles/colors.global';
import {
  TOOLS_DATA_OPTIONS,
  VIEW_OPTIONS,
  useColorThemeToolsBotChat,
} from './config';
import {IconCP} from '../../../utils/icon.utils';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import FastImageCP from '../../General/FastImageCP';
import {useCssApp} from '../../../utils/css.utils';
import useAppContext from '../../../utils/hooks/useAppContext';

export default function ToolsBotchatScreen({navigation}) {
  const {state} = useAppContext();
  const {currentUser} = state.set_data;
  const [isView, setIsView] = React.useState('view_2');
  const {colors} = useColorThemeToolsBotChat();
  const {shadowCss} = useCssApp();

  const screenWidth = Dimensions.get('window').width;
  const widthEventUsed = screenWidth / 2 - 8 * 2;

  const handleRedirect = router => {
    navigation.navigate(router);
  };

  const RenderToolsItem = ({item, index}) => {
    const classedView =
      isView === 'view_1'
        ? {
            width: screenWidth - 24,
            marginBottom: 10,
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
        style={tw.style(
          `rounded-lg p-2 justify-center items-center gap-2 relative`,
          {
            backgroundColor: item?.backgroundColor || colors.BACKGROUND_CARD,
            ...shadowCss({
              elevation: item?.backgroundColor ? 0 : 3,
            }),
            ...classedView,
          },
        )}
        onPress={() => handleRedirect(item?.router)}>
        <View style={tw.style('flex-row items-start justify-between w-full')}>
          <View
            style={tw.style(
              `${
                item?.backgroundIcon
                  ? `bg-[${item?.backgroundIcon}]`
                  : 'bg-gray-50'
              } w-[50px] h-[50px] p-1 items-center justify-center rounded-full overflow-hidden`,
            )}>
            {item?.iconImage ? (
              <FastImageCP
                uriLocal={item?.iconImage}
                resizeMode="contain"
                style={tw.style('min-h-0 w-[40px] h-[40px]')}
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
          <View style={tw.style('flex-col items-end gap-1')}>
            <IconCP
              name="star-sharp"
              size={20}
              color={item?.colorIconStar || colors.ACTIVE_COLOR}
            />
            {/* {item?.tag && (
              <View
                style={tw.style('border p-[2px] rounded', {
                  borderColor: colors.ACTIVE_COLOR,
                })}>
                <Text style={tw.style('text-red-500 font-bold text-[12px]')}>
                  {item?.tag}
                </Text>
              </View>
            )} */}
          </View>
        </View>
        <View
          style={tw.style('flex-col gap-1 items-start justify-start w-full')}>
          <Text
            style={tw.style(`font-bold text-[15px] mt-1`, {
              color: item?.textColorTitle || colors.TITLE_CARD_COLOR,
            })}>
            {item.title}
          </Text>
          {item?.tag?.length ? (
            <View style={tw.style('flex-row flex-wrap gap-1 mt-1')}>
              {item?.tag?.map((itemTag, idx) => {
                return (
                  <View
                    key={idx}
                    style={tw.style('border p-[2px] rounded', {
                      borderColor: colors.ACTIVE_COLOR,
                    })}>
                    <Text
                      style={tw.style('text-red-500 font-bold text-[11px]')}>
                      {itemTag}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text
              style={tw.style(`text-[13px]`, {
                color: item?.textColorCategory || colors.DESC_CARD_COLOR,
              })}>
              {item.category}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <Banner navigation={navigation} />
        <View
          style={tw.style('flex-1', {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`flex-grow`}
            style={tw.style({
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style('flex-row items-center justify-between w-full')}>
              <View style={tw`flex-row items-center gap-1 mt-4 mx-3`}>
                <Text
                  style={tw.style(`font-bold text-[20px]`, {
                    color: colors.ACTIVE_COLOR,
                  })}>
                  Các công cụ
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-3 mt-4 mx-3`}>
                {VIEW_OPTIONS.map((item, _idx) => {
                  return (
                    <TouchableOpacity
                      key={_idx}
                      activeOpacity={0.7}
                      style={tw.style(
                        `rounded w-[30px] h-[30px] items-center justify-center ${
                          isView === item?.view
                            ? `bg-[${colors.VIEW_ACTIVE_COLOR + '2a'}]`
                            : ''
                        }`,
                      )}
                      onPress={() => setIsView(item?.view)}>
                      <IconCP
                        name={item?.iconName}
                        size={item?.sizeIcon}
                        color={
                          isView === item?.view
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
              key={isView === 'view_1' ? '$' : '#'}
              showsVerticalScrollIndicator={false}
              data={TOOLS_DATA_OPTIONS(currentUser)}
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
              numColumns={isView === 'view_1' ? 1 : 2}
              keyExtractor={(item, index) => {
                return isView === 'view_1'
                  ? '$' + (item?.id || index).toString()
                  : '#' + (item?.id || index).toString();
              }}
              renderItem={RenderToolsItem}
              nestedScrollEnabled
            />
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}
