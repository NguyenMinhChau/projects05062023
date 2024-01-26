import React from 'react';
import {useSwapIPListKhg} from './hooks';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import {PLUGINS_TYPE, useColorThemeSwapIP} from '../config';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import tw from '../../../../../styles/twrnc.global';
import ButtonCP from '../../../../General/ButtonCP';
import {TextInput} from 'react-native-paper';
import TextInputCP from '../../../../General/TextInputCP';
import PaginationCP from '../../../../General/PaginationCP';
import {useRefreshList} from '../../../../../utils/refreshList.utils';
import ScreenNoData from '../../../../General/ScreenNoData';
import CustomSelectCP from '../../../../General/CustomSelectCP';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LoadingScreen from '../../../../General/LoadingScreen';
import {
  BLACK_COLOR,
  CRITICAL_COLOR,
  PRIMARY_COLOR,
  WARNING_COLOR,
} from '../../../../../styles/colors.global';
import {fList} from '../../../../../utils/array.utils';
import ActionSheetCP from '../../../../General/ActionSheetCP';
import DateSelect from '../../../../General/DateSelect';
import {useDialogConfirmToast} from '../../../../../utils/dialog_confirm_toast.utils';
import RenderTagCP from '../../../../General/RenderTag';
import RadioGroupCP from '../../../../General/RadioGroupCP';
import useAppContext from '../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../Context/AppContext.reducer';
import {useNotificationToast} from '../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../General/NotificationToast';
import {TYPE_ICON} from '../../../../../utils/icon.utils';

export default function ListKHGScreen({navigation}) {
  const {
    isLoading,
    program_id,
    keyword,
    isFilter,
    list_khg_swap_ip,
    DATA_PROGRAM_ID,
    updateMany,
    selected_list,
    fromDate,
    toDate,
    actions,
    typeHandle,
    modem,
    province,
    plugin_status,
    date_time_picker,
    DATA_MODEM,
    DATA_ACTIONS,
    DATA_PLUGIN_STATUS,
    DATA_PROVINCE,
    isAdmin,

    CallAPI,
    RenderItem,
    handleBack,
    handleChange,
    handleDateConfirm,
    handleDatePress,
    handleSelectedAllKHG,
    checkAllKHG,
    handleUpdatePlugin,
  } = useSwapIPListKhg();
  const {colors} = useColorThemeSwapIP();
  const [activeDropDown, setActiveDropdown] = React.useState(null);
  const [targetDateTime, setTargetDateTime] = React.useState('date_time');

  const {refreshing, onRefresh} = useRefreshList(CallAPI);
  const {openDialogConfirmToast, updatePropsData} = useDialogConfirmToast();
  const {openNotificationToast} = useNotificationToast();
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Swap IPv6 - Danh sách KHG ${program_id ? program_id : ''}`}
          styleText={tw.style('text-[15px]')}
          handleBack={handleBack}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style('w-full flex-row justify-between p-2', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <Text
              style={tw.style('text-[20px] font-bold', {
                color: colors.ACTIVE_COLOR,
              })}>
              Danh sách KHG Swap Wifi 6
            </Text>
          </View>
          <View style={tw.style('flex-row pb-2 px-2 gap-1')}>
            <View style={tw.style('flex-1')}>
              <TextInputCP
                placeholder="Tìm nhanh khách hàng theo SHĐ?"
                placeholderTextColor={'#677483'}
                textColor={BLACK_COLOR}
                cursorColor={PRIMARY_COLOR}
                name="keyword"
                value={keyword}
                onChange={val => handleChange('keyword', val)}
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
                    onTouchStart={() => handleChange('keyword', '')}
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
            <ButtonCP
              colorBorder={colors.PRIMARY_COLOR}
              colorBG={colors.PRIMARY_COLOR}
              colorIcon={'#fff'}
              iconName={isFilter ? 'filter-variant-remove' : 'filter-variant'}
              typeIcon={TYPE_ICON.iconMaterial}
              onPress={() => {
                handleChange('isFilter', true);
              }}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
            {/* {fList(list_khg_swap_ip?.payload).length > 0 && (
              <ButtonCP
                noneBorder
                colorBG={'#e24328'}
                colorIcon={'#fff'}
                iconName={updateMany ? 'close-outline' : 'create-outline'}
                onPress={() => {
                  handleChange('updateMany', !updateMany);
                }}
                styleContainer={tw.style('py-[5px] px-[8px]')}
              />
            )} */}
            {isAdmin && (
              <ButtonCP
                noneBorder
                colorBG={WARNING_COLOR}
                colorIcon="#fff"
                iconName="settings-outline"
                onPress={() => {
                  openDialogConfirmToast({
                    title: 'Thông báo xác nhận điều chỉnh plugin',
                    funcHandle: propsData => {
                      const {typeHandle, macONT} = {...propsData};
                      if (typeHandle?.value && macONT) {
                        handleUpdatePlugin(typeHandle?.value, [macONT]);
                        return true;
                      }
                    },
                    propsData: {
                      typeHandle: '',
                      macONT: '',
                    },
                    imageLocal: require('../../../../../assets/images/modem_vector.png'),
                    MessageCustom: () => {
                      const [type, setType] = React.useState(null);
                      const [macAddress, setMacAddress] = React.useState(null);
                      return (
                        <>
                          <View style={tw.style('max-h-[350px] w-full')}>
                            <ScrollView>
                              <View style={tw.style('flex-col mb-2')}>
                                <Text
                                  style={tw.style('text-[14px] mb-2', {
                                    color: colors.PRIMARY_COLOR,
                                  })}>
                                  Địa chỉ MAC
                                </Text>
                                <TextInputCP
                                  placeholder="2c549188c9e3"
                                  onChange={val => {
                                    setMacAddress(val);
                                  }}
                                  contentStyle={tw`p-2`}
                                  outlinedStyle={tw`border border-gray-400`}
                                />
                              </View>
                              <View style={tw.style('flex-col mb-2')}>
                                <Text
                                  style={tw.style('text-[14px] mb-2', {
                                    color: colors.PRIMARY_COLOR,
                                  })}>
                                  Chọn trạng thái cập nhật
                                </Text>
                                <View style={tw`flex-row gap-2 flex-wrap`}>
                                  <RadioGroupCP
                                    dataOptions={PLUGINS_TYPE}
                                    valueSelect={type}
                                    style={tw`p-1`}
                                    setValSelect={val => {
                                      setType(val);
                                      updatePropsData({
                                        macONT: macAddress,
                                        typeHandle: val,
                                      });
                                    }}
                                  />
                                </View>
                              </View>
                            </ScrollView>
                          </View>
                        </>
                      );
                    },
                  });
                }}
                styleContainer={tw.style('py-[5px] px-[8px]')}
              />
            )}
          </View>
          {!updateMany && fList(list_khg_swap_ip?.payload).length > 0 && (
            <View
              style={tw.style(
                'flex-row pb-2 px-2 gap-1 items-center justify-end',
              )}>
              <ButtonCP
                titleIcon={`${
                  checkAllKHG() ? `Bỏ chọn tất cả` : `Chọn tất cả `
                }`}
                noneBorder
                bgTransparent
                colorIcon={colors.BLACK_COLOR}
                positionIcon="right"
                iconName={checkAllKHG() ? 'checkbox-outline' : 'square-outline'}
                onPress={() => {
                  handleSelectedAllKHG();
                }}
                styleContainer={tw.style('py-1 px-[8px]')}
              />
              {selected_list?.length > 0 && (
                <ButtonCP
                  titleIcon="Xác nhận"
                  noneBorder
                  colorBG={colors.SUCCESS_COLOR}
                  colorIcon="#fff"
                  positionIcon="right"
                  iconName="checkmark-done-outline"
                  onPress={() => {
                    if (selected_list.length === 0) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Vui lòng chọn mã hợp đồng khách hàng',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    }
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận điều chỉnh plugin',
                      funcHandle: propsData => {
                        const {typeHandle} = {...propsData};
                        if (typeHandle?.value) {
                          handleUpdatePlugin(typeHandle?.value);
                          return true;
                        }
                      },
                      propsData: {
                        typeHandle: '',
                      },
                      imageLocal: require('../../../../../assets/images/modem_vector.png'),
                      MessageCustom: () => {
                        const [type, setType] = React.useState(null);
                        return (
                          <>
                            <View style={tw.style('max-h-[350px] w-full')}>
                              <ScrollView>
                                <View style={tw.style('flex-col mb-2')}>
                                  <Text
                                    style={tw.style('text-[14px] mb-2', {
                                      color: colors.PRIMARY_COLOR,
                                    })}>
                                    Danh sách địa chỉ MAC
                                  </Text>
                                  <View
                                    style={tw.style(
                                      'flex-row gap-2 flex-wrap',
                                    )}>
                                    {selected_list?.length > 0 ? (
                                      selected_list?.map((item, index) => {
                                        return (
                                          <RenderTagCP
                                            key={index}
                                            tag={item?.macONT}
                                          />
                                        );
                                      })
                                    ) : (
                                      <Text
                                        style={tw.style(
                                          'text-[16px] leading-6',
                                          {
                                            color: colors.BLACK_COLOR,
                                          },
                                        )}>
                                        Không có dữ liệu
                                      </Text>
                                    )}
                                  </View>
                                </View>
                                <View style={tw.style('flex-col mb-2')}>
                                  <Text
                                    style={tw.style('text-[14px] mb-2', {
                                      color: colors.PRIMARY_COLOR,
                                    })}>
                                    Chọn trạng thái cập nhật
                                  </Text>
                                  <View style={tw`flex-row gap-2 flex-wrap`}>
                                    <RadioGroupCP
                                      dataOptions={PLUGINS_TYPE}
                                      valueSelect={type}
                                      style={tw`p-1`}
                                      setValSelect={val => {
                                        updatePropsData({
                                          typeHandle: val,
                                        });
                                        setType(val);
                                      }}
                                    />
                                  </View>
                                </View>
                              </ScrollView>
                            </View>
                          </>
                        );
                      },
                    });
                  }}
                  styleContainer={tw.style('py-[5px] px-[8px]')}
                />
              )}
            </View>
          )}
          <View
            style={tw.style('flex-1', {
              backgroundColor: colors.WHITE_COLOR,
            })}
            onTouchEnd={() => handleChange('isFilter', false)}>
            {fList(list_khg_swap_ip?.payload).length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={list_khg_swap_ip?.payload}
                  contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    gap: 8,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItem}
                  nestedScrollEnabled
                />
                <PaginationCP totalPages={list_khg_swap_ip?.total_page} />
              </>
            ) : (
              <ScreenNoData />
            )}
          </View>
        </View>
        <ActionSheetCP
          title="Bộ lọc"
          isVisible={isFilter}
          onClose={() => handleChange('isFilter', false)}
          onOpen={() => handleChange('isFilter', true)}
          ButtonActions={() => {
            return (
              <View
                style={tw.style(
                  `w-full flex-row gap-2 justify-end p-2 mt-2 ${
                    Platform.OS === 'ios' ? 'mb-5' : 'mb-0'
                  }`,
                )}>
                <ButtonCP
                  iconName="trash-bin-outline"
                  titleIcon="Xóa filter"
                  colorIcon="#ffffff"
                  sizeIcon={17}
                  colorBG="#ff0000"
                  colorBorder="#ff0000"
                  onPress={() => {
                    handleChange('actions', []);
                    handleChange('modem', []);
                    handleChange('plugin_status', []);
                    handleChange('province', []);
                    handleChange('keyword', '');
                    handleChange(
                      'program_id',
                      DATA_PROGRAM_ID?.[0].value || null,
                    );
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
                <ButtonCP
                  iconName="navigate-outline"
                  sizeIcon={17}
                  colorIcon="#ffffff"
                  titleIcon="Xác nhận"
                  colorBG={colors.PRIMARY_COLOR}
                  colorBorder={colors.PRIMARY_COLOR}
                  onPress={() => {
                    CallAPI();
                    handleChange('isFilter', false);
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            );
          }}>
          <CustomSelectCP
            dataList={DATA_PROGRAM_ID}
            label="Tên chương trình"
            placeholder="Chọn tên chương trình"
            selectList={program_id}
            onSelectValue={val => {
              handleChange('program_id', val);
            }}
            isQuantityInitData
            quantityDataInit={20}
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            styleInput={tw.style('p-1')}
            idActive="program_id"
            isActiveDropDown={activeDropDown === 'program_id'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={DATA_PROVINCE}
            label="Tỉnh"
            placeholder="Chọn tỉnh"
            selectList={province}
            onSelectValue={val => {
              handleChange('province', val);
            }}
            isQuantityInitData
            quantityDataInit={20}
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            styleInput={tw.style('p-1')}
            multiple
            idActive="province"
            isActiveDropDown={activeDropDown === 'province'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={DATA_MODEM}
            label="Modem"
            placeholder="Chọn modem"
            selectList={modem}
            onSelectValue={val => handleChange('modem', val)}
            isQuantityInitData
            quantityDataInit={20}
            multiple
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            idActive="modem"
            isActiveDropDown={activeDropDown === 'modem'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={DATA_ACTIONS}
            label="Active"
            placeholder="Chọn active"
            selectList={actions}
            onSelectValue={val => handleChange('actions', val)}
            isQuantityInitData
            quantityDataInit={20}
            multiple
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            idActive="actions"
            isActiveDropDown={activeDropDown === 'actions'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={DATA_PLUGIN_STATUS}
            label="Plugin Status"
            placeholder="Chọn plugin status"
            selectList={plugin_status}
            onSelectValue={val => handleChange('plugin_status', val)}
            isQuantityInitData
            quantityDataInit={20}
            multiple
            styleContainer={tw.style('min-h-[40px] h-[40px]')}
            idActive="plugin_status"
            isActiveDropDown={activeDropDown === 'plugin_status'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
