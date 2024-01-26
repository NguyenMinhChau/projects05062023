import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import useAppContext from '../../utils/hooks/useAppContext';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../Context/AppContext.reducer';
import tw from '../../styles/twrnc.global';
import FastImageCP from './FastImageCP';
import useDebounce from '../../utils/hooks/useDebounce';
import TabHomeStackRouterObj from '../routersConfig/TabHomeStack.config';
import {IconCP} from '../../utils/icon.utils';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import slugify from 'slugify';
import {fList} from '../../utils/array.utils';
import TabBottomRouterObj from '../routersConfig/TabBottom.config';
import {useCssApp} from '../../utils/css.utils';

export default function SearchScreen({navigation}) {
  const {dispatch, state} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {shadowCss} = useCssApp();
  const {isVisible_search} = state.set_toggle;
  const {search} = state.set_data;
  const [dataSearch, setDataSearch] = React.useState([]);

  const searchDebounce = useDebounce(search, 500);

  const listHeight = useSharedValue(0);

  const heightDevice = Dimensions.get('window').height;

  const listStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(listHeight.value, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(listHeight.value === 0 ? 0 : 1, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  React.useEffect(() => {
    listHeight.value = isVisible_search ? 250 : 0;
  }, [isVisible_search]);

  React.useEffect(() => {
    function flexibleSearch(data, searchTerm) {
      const search = (item, searchValue) => {
        const slugifyItem = slugify(item, {
          replacement: '',
          strict: false,
          remove: /[*+~.()'"!:@-]/g,
          lower: true,
          locale: 'vi',
          trim: true,
        });

        const slugifySearch = slugify(searchValue, {
          replacement: ' ',
          strict: false,
          remove: /[*+~.()'"!:@-]/g,
          lower: true,
          locale: 'vi',
          trim: true,
        })
          ?.replace(/-/g, ' ')
          ?.replace(/\s+/g, '');

        // Sử dụng biểu thức chính quy để kiểm tra sự tương tự
        const regex = new RegExp(slugifySearch.replace(/\\/g, ''));
        return regex.test(slugifyItem);
      };

      return fList(data)?.filter((item, _idx) => {
        const {key_words, screen_name} = {...item};

        if (screen_name) {
          return key_words?.some(item => search(item, searchTerm));
        }

        return false;
      });
    }

    const dataSearch = flexibleSearch(
      [...TabHomeStackRouterObj, ...TabBottomRouterObj],
      searchDebounce,
    );

    setDataSearch(dataSearch);
  }, [searchDebounce]);

  const RenderSearchItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate({
            name: item?.screen_name,
            params: {
              value: item?.value || '',
            },
          });
          dispatch(SET_DATA_PAYLOAD({key: 'search', value: ''}));
          dispatch(
            SET_TOGGLE_PAYLOAD({
              key: 'isVisible_search',
              value: false,
            }),
          );
        }}
        style={tw.style('w-full p-3 flex-row items-center justify-between')}>
        <Text
          style={tw.style(`text-[15px] flex-1 w-1`, {
            color: colors.BLACK_COLOR,
          })}>
          {item?.screen_name}
        </Text>
        <IconCP
          name="navigate-circle-outline"
          size={22}
          color={colors.PRIMARY_COLOR}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isVisible_search && (
        <View
          onTouchStart={e => {
            e.stopPropagation();
            dispatch(
              SET_TOGGLE_PAYLOAD({
                key: 'isVisible_search',
                value: false,
              }),
            );
          }}
          style={tw.style(
            // `w-full h-[${heightDevice}px] flex-grow p-3 absolute top-[60px] bottom-0 right-0 left-0 z-20 bg-black bg-opacity-50`,
            `w-full h-full absolute top-[60px] flex-grow z-50`,
            {
              ...shadowCss({
                elevation: 5,
              }),
            },
          )}>
          <View
            onTouchStart={e => {
              e.stopPropagation();
              dispatch(
                SET_TOGGLE_PAYLOAD({
                  key: 'isVisible_search',
                  value: true,
                }),
              );
            }}>
            <View
              style={tw.style(
                // 'rounded-lg flex-grow overflow-hidden max-h-[250px] shadow-md z-50 border border-b-[3px] border-gray-400',
                'flex-grow z-50 max-h-[250px] rounded-bl-[10px] rounded-br-[10px]',
                {
                  backgroundColor: colors.BACKGROUND_CARD,
                  ...shadowCss({
                    elevation: 5,
                  }),
                },
              )}>
              {dataSearch.length > 0 ? (
                <Animated.View
                  style={[
                    listStyle,
                    {
                      overflow: 'hidden',
                      flexDirection: 'column',
                    },
                  ]}>
                  <Text
                    style={tw.style('text-[14px] font-medium px-2 pt-2', {
                      color: colors.PRIMARY_COLOR,
                    })}>
                    Tìm thấy {dataSearch?.length} kết quả
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    data={dataSearch}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={RenderSearchItem}
                    contentContainerStyle={tw.style('flex-grow')}
                  />
                </Animated.View>
              ) : (
                <View
                  style={tw.style(
                    'flex-grow justify-center items-center pb-3',
                  )}>
                  <FastImageCP
                    uriLocal={require('../../assets/images/no_data.png')}
                    resizeMode="contain"
                    style={tw.style('w-full h-[200px]')}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
