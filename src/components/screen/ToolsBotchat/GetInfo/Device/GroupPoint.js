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
import CustomSelectCP from '../../../../General/CustomSelectCP';
import ButtonCP from '../../../../General/ButtonCP';
import LoadingScreen from '../../../../General/LoadingScreen';
import {useGetColorThemeDisplay} from '../../../../../utils/appearance.utils';
import ScreenNoData from '../../../../General/ScreenNoData';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import {useGroupPointHooks} from './hooks/GroupPointHooks';
import TextInputCP from '../../../../General/TextInputCP';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useCssApp} from '../../../../../utils/css.utils';

export default function ConfigGroupPointScreen({navigation}) {
  const {
    isLoading,
    group_point,
    branch,
    pop_name,
    isVisibleOption,
    viewShotRef,
    result_botChat,
    checkSubmit,
    DATA_BRANCH_FILTER,
    DATA_POP_NAME_FILTER,

    setIsVisibleOption,
    handleBackNavigate,
    onCapture,
    handleReset,
    handleChange,
    CallApiFilterPop,
    checkGroupPointFormat,
    handleGetInfoGroupPoint,
  } = useGroupPointHooks();
  const [activeDropDown, setActiveDropdown] = React.useState(null);
  const {colors} = useGetColorThemeDisplay();
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
          title={`Thông Tin Tập Điểm ${
            group_point?.length ? `(${group_point})` : ''
          }`}
          handleBack={handleBackNavigate}
          showLogo={false}
          styleText={tw.style('text-[15px]')}
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
                iconName="options-outline"
                sizeIcon={25}
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
                  <View style={tw.style('flex-row gap-2')}>
                    <View style={tw.style('flex-1')}>
                      <CustomSelectCP
                        label="Chi Nhánh"
                        dataList={DATA_BRANCH_FILTER}
                        placeholder="Chọn Chi Nhánh"
                        selectList={branch}
                        onSelectValue={val => handleChange('branch', val)}
                        styleContainer={tw.style(
                          'flex-0 min-h-[40px] h-[40px]',
                        )}
                        required
                        idActive="branch"
                        isActiveDropDown={activeDropDown === 'branch'}
                        onSetActiveDropDown={val => setActiveDropdown(val)}
                        isFullData
                      />
                    </View>
                    <View style={tw.style('flex-1')}>
                      <CustomSelectCP
                        label="Tên POP"
                        dataList={DATA_POP_NAME_FILTER}
                        placeholder="Chọn tên POP"
                        selectList={pop_name}
                        onSelectValue={val => handleChange('pop_name', val)}
                        styleContainer={tw.style(
                          'flex-0 min-h-[40px] h-[40px]',
                        )}
                        reCallAPI={CallApiFilterPop}
                        required
                        idActive="pop_name"
                        isActiveDropDown={activeDropDown === 'pop_name'}
                        onSetActiveDropDown={val => setActiveDropdown(val)}
                        isFullData
                      />
                    </View>
                  </View>

                  <TextInputCP
                    labelOutside="Tên Tập Điểm"
                    placeholder="Nhập tên Tập Điểm"
                    value={typeof group_point === 'string' ? group_point : ''}
                    onChange={val => {
                      if (`${val}`?.length < 8) {
                        return;
                      }
                      handleChange('group_point', val);
                    }}
                    editable={pop_name?.length > 0}
                    style={tw.style(`justify-center mt-1 mb-0`)}
                    contentStyle={tw`p-2`}
                    error={!checkGroupPointFormat(group_point)}
                    helperText='*Định dạng group point: "xxxxxxx.xxx"'
                    styleHelperText={tw.style('text-[12px] text-red-500')}
                    required
                  />
                </ScrollView>
                <View
                  style={tw.style(`flex-row items-center gap-2 py-2 mt-2 `)}>
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
                      handleGetInfoGroupPoint();
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
              dataState={{...useGroupPointHooks()}}
            />
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}

const ConfigView = ({dataState, viewShotRef}) => {
  const {group_point, result_botChat, RenderItem} = {...dataState};
  const {colors} = useGetColorThemeDisplay();
  const heightDevice = Dimensions.get('window').height;

  return (
    <>
      <View style={tw.style('flex-1 relative')}>
        {fList(result_botChat).length > 0 && group_point ? (
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
