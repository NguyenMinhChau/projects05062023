import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import tw from '../../../../../styles/twrnc.global';
import {PRIMARY_COLOR} from '../../../../../styles/colors.global';
import {fList} from '../../../../../utils/array.utils';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import ButtonCP from '../../../../General/ButtonCP';
import LoadingScreen from '../../../../General/LoadingScreen';
import {useGetColorThemeDisplay} from '../../../../../utils/appearance.utils';
import ScreenNoData from '../../../../General/ScreenNoData';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import {useCusServiceHooks} from './hooks/CusServiceHooks';
import TextInputCP from '../../../../General/TextInputCP';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useCssApp} from '../../../../../utils/css.utils';
import CustomSelectCP from '../../../../General/CustomSelectCP';

export default function ConfigCusServiceScreen({navigation, route}) {
  const {
    viewShotRef,
    isLoading,
    isVisibleOption,
    result_botChat,
    ip_dev,
    type_dev,
    checkSubmit,

    setIsVisibleOption,
    handleChange,
    handleReset,
    handleGetInfoCusService,
    handleBackNavigate,
  } = useCusServiceHooks();
  const {colors} = useGetColorThemeDisplay();
  const [activeDropDown, setActiveDropdown] = React.useState(null);
  const {shadowCss} = useCssApp();
  const heightDevice = Dimensions.get('window').height;
  const filterHeight = useSharedValue(0);
  const filterStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(filterHeight.value === 0 ? 0 : 1, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  React.useEffect(() => {
    filterHeight.value = isVisibleOption ? heightDevice / 2 : 0;
  }, [isVisibleOption]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Kiểm Tra DV KHG ${
            ip_dev?.length && type_dev?.length
              ? `(${ip_dev} - ${type_dev})`
              : ''
          }`}
          handleBack={handleBackNavigate}
          styleText={tw.style('text-[15px]')}
          showLogo={false}
          showSearchScreen={!result_botChat || result_botChat?.length === 0}
          showDownLoadFile={result_botChat?.length > 0}
          onPressDownLoadFile={() =>
            viewShotRef?.current?.capture().then(onCapture)
          }
          ActionCustom={() => {
            return (
              <ButtonCP
                noneBorder
                bgTransparent
                colorIcon={'#fff'}
                sizeIcon={25}
                iconName="options-outline"
                onPress={() => {
                  setIsVisibleOption(!isVisibleOption);
                }}
                styleContainer={tw.style('px-2 py-[5px]')}
              />
            );
          }}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          {isVisibleOption && (
            <Animated.View
              style={[
                filterStyle,
                {
                  // maxHeight: heightDevice / 2,
                },
              ]}>
              <View
                style={tw.style('p-2 m-2 rounded-xl', {
                  backgroundColor: colors.BACKGROUND_CARD,
                  maxHeight: heightDevice / 2,
                  ...shadowCss(),
                })}>
                <ScrollView
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}>
                  {/* <TextInputCP
                    labelOutside="Loại Thiết Bị"
                    placeholder="Nhập loại Thiết Bị"
                    value={
                      typeof type_dev === 'string'
                        ? type_dev?.toUpperCase()
                        : ''
                    }
                    onChange={val => {
                      handleChange('type_dev', val?.toUpperCase());
                    }}
                    style={tw.style(`justify-center mt-0`)}
                    contentStyle={tw`p-2`}
                    required
                  /> */}
                  <View style={tw.style('flex-row gap-2')}>
                    <View style={tw.style('flex-1')}>
                      <CustomSelectCP
                        label="Chọn loại Thiết Bị"
                        dataList={[
                          {
                            label: 'GPON',
                            value: 'GPON',
                          },
                          {
                            label: 'HUAWEI',
                            value: 'HUAWEI',
                          },
                        ]}
                        placeholder="Chọn loại Thiết bị"
                        selectList={type_dev}
                        onSelectValue={val => handleChange('type_dev', val)}
                        styleContainer={tw.style(
                          'flex-0 min-h-[40px] h-[40px]',
                        )}
                        required
                        idActive="type_dev"
                        isActiveDropDown={activeDropDown === 'type_dev'}
                        onSetActiveDropDown={val => setActiveDropdown(val)}
                        isFullData
                      />
                    </View>
                    <View style={tw.style('flex-1')}>
                      <TextInputCP
                        labelOutside="IP Thiết Bị"
                        placeholder="Nhập IP Thiết Bị"
                        value={typeof ip_dev === 'string' ? ip_dev : ''}
                        onChange={val => {
                          handleChange('ip_dev', val);
                        }}
                        style={tw.style(`justify-center mt-0 mb-1`)}
                        contentStyle={tw`p-2`}
                        required
                      />
                    </View>
                  </View>
                </ScrollView>
                <View style={tw.style(`flex-row items-center gap-2 p-2 mt-2 `)}>
                  <ButtonCP
                    iconName="close-outline"
                    titleIcon="Xóa options"
                    colorIcon="#e67e22"
                    variant="outlined"
                    onPress={handleReset}
                    colorBG="#e67e22"
                    colorBorder="#e67e22"
                    styleText={tw.style('text-[14px]')}
                    styleContainer={tw.style('flex-1 p-1')}
                  />
                  <ButtonCP
                    iconName="reader-outline"
                    titleIcon="Lấy thông tin"
                    colorIcon="#ffffff"
                    onPress={() => {
                      handleGetInfoCusService();
                    }}
                    disabled={!checkSubmit}
                    colorBG={PRIMARY_COLOR}
                    colorBorder={PRIMARY_COLOR}
                    styleText={tw.style('text-[14px]')}
                    styleContainer={tw.style('flex-1 p-1')}
                  />
                </View>
              </View>
            </Animated.View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <ConfigView
              viewShotRef={viewShotRef}
              dataState={{...useCusServiceHooks()}}
            />
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}

const ConfigView = ({dataState, viewShotRef}) => {
  const {result_botChat, RenderItem} = {...dataState};
  const {colors} = useGetColorThemeDisplay();

  return (
    <>
      <View style={tw.style('flex-1 relative')}>
        {fList(result_botChat).length > 0 ? (
          <ViewShot
            ref={viewShotRef}
            options={{
              quality: 0.9,
            }}>
            <View
              style={tw.style('p-2', {
                backgroundColor: colors.WHITE_COLOR,
              })}>
              <FlatList
                data={fList(result_botChat)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={RenderItem}
                nestedScrollEnabled
                scrollEventThrottle={16}
                onEndReachedThreshold={0.5}
                contentContainerStyle={tw.style('flex-grow gap-2')}
              />
            </View>
          </ViewShot>
        ) : (
          <>
            {result_botChat && fList(result_botChat).length === 0 && (
              <Text
                style={tw.style('text-center text-[15px] my-1', {
                  color: colors.BLACK_COLOR,
                })}>
                Không có thông tin
              </Text>
            )}
            <ScreenNoData
              uriLocal={require('../../../../../assets/images/chatbot_image.png')}
            />
          </>
        )}
      </View>
    </>
  );
};
