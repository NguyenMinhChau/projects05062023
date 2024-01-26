import React from 'react';
import {useMgnModem} from './hooks';
import {useColorThemeManagement} from '../config';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import tw from '../../../../styles/twrnc.global';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputCP from '../../../General/TextInputCP';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../styles/colors.global';
import {TextInput} from 'react-native-paper';
import ButtonCP from '../../../General/ButtonCP';
import PaginationCP from '../../../General/PaginationCP';
import {VIEW_OPTIONS_MGN_MODEM} from './config';
import {IconCP} from '../../../../utils/icon.utils';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import LoadingScreen from '../../../General/LoadingScreen';

export default function MgnModemScreen({navigation}) {
  const {colors} = useColorThemeManagement();

  const {
    isLoading,
    search,
    isView,
    totalPage,
    dataModem,

    handleBack,
    handleReset,
    setIsView,
    handleChangeValue,
    RenderDeviceItem,
    CallApiGetList,
  } = useMgnModem();
  const {refreshing, onRefresh} = useRefreshList(CallApiGetList);
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Quản lý thiết bị"
          handleBack={handleBack}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View style={tw.style('gap-1 flex-row p-2')}>
            <View style={tw.style('flex-1')}>
              <TextInputCP
                placeholder="Bạn muốn tìm gì?"
                placeholderTextColor={'#677483'}
                textColor={BLACK_COLOR}
                cursorColor={PRIMARY_COLOR}
                name="search"
                value={search}
                onChange={val => handleChangeValue('search', val)}
                style={tw.style(`bg-white justify-center h-[35px] mb-0`)}
                contentStyle={tw.style('mr-[40px] ml-[45px]')}
                outlinedStyle={tw.style('rounded-lg border', {
                  borderColor: colors.PRIMARY_COLOR,
                })}
                rightContent={
                  <TextInput.Icon
                    icon="close-circle-outline"
                    size={23}
                    color={colors.PRIMARY_COLOR}
                    style={tw.style('mr-[-8px]')}
                    onTouchStart={() => handleChangeValue('search', '')}
                  />
                }
                leftContent={
                  <TextInput.Icon
                    icon="magnify"
                    size={23}
                    color={colors.PRIMARY_COLOR}
                  />
                }
              />
            </View>
          </View>
          <View style={tw.style('flex-1')}>
            <View
              style={tw.style('flex-row items-center justify-between w-full')}>
              <View style={tw`flex-row items-center gap-1 my-2 mx-3`}>
                <Text
                  style={tw.style(`font-bold text-[20px]`, {
                    color: colors.ACTIVE_COLOR,
                  })}>
                  Danh sách thiết bị
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-3 my-2 mx-3`}>
                {VIEW_OPTIONS_MGN_MODEM.map((item, _idx) => {
                  return (
                    <TouchableOpacity
                      key={_idx}
                      activeOpacity={0.7}
                      style={tw.style(
                        `rounded w-[30px] h-[30px] items-center justify-center ${
                          isView === item?.view
                            ? `bg-[${colors.PRIMARY_COLOR + '3a'}]`
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              key={isView === 'view_1' ? '$' : '#'}
              showsVerticalScrollIndicator={false}
              data={dataModem}
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
              numColumns={isView === 'view_1' ? 1 : 2}
              keyExtractor={(item, index) => {
                return isView === 'view_1'
                  ? '$' + index.toString()
                  : '#' + index.toString();
              }}
              renderItem={RenderDeviceItem}
              nestedScrollEnabled
            />
          </View>
          <PaginationCP totalPages={totalPage} />
        </View>
      </SafeAreaWrap>
    </>
  );
}
