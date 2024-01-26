import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import {useRefreshList} from '../../../utils/refreshList.utils';
import tw from '../../../styles/twrnc.global';
import {useNotificationScreen} from './hooks';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';
import {OPTIONS_FILTER} from './config';
import {IconCP, TYPE_ICON} from '../../../utils/icon.utils';
import {fList} from '../../../utils/array.utils';
import ScreenNoData from '../../General/ScreenNoData';

export default function NotificationScreen({navigation}) {
  const {colors} = useGetColorThemeDisplay();

  const {
    isLoading,
    list_notifications,
    list_notifications_read,
    list_notifications_no_read,
    filter_type,
    isVisibleFilter,
    DATA_NOTIFICATION,

    handleChange,
    RenderItemNotification,
  } = useNotificationScreen();

  const {refreshing, onRefresh} = useRefreshList();

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Thông báo ứng dụng"
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <Text
            style={tw.style(
              'text-[16px] font-bold italic text-center text-orange-500 m-2',
            )}>
            Đây là khu vực thử nghiệm (Beta)
          </Text>
          <View
            style={tw.style(
              'flex-row gap-1 pb-1 justify-between items-center',
            )}>
            <TouchableOpacity
              style={tw.style('mx-2 flex-row gap-1 items-center')}
              activeOpacity={0.8}
              onPress={() => {}}>
              <IconCP
                name="checkmark-done-outline"
                size={18}
                color={colors.BLACK_COLOR}
              />
              <Text
                style={tw.style('italic text-[14px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Đọc tất cả
              </Text>
            </TouchableOpacity>
            <ButtonCP
              noneBorder
              bgTransparent
              colorIcon={colors.PRIMARY_COLOR}
              iconName={
                isVisibleFilter ? 'filter-variant-remove' : 'filter-variant'
              }
              typeIcon={TYPE_ICON.iconMaterial}
              sizeIcon={25}
              onPress={() => {
                handleChange('isVisibleFilter', true);
              }}
              styleContainer={tw.style(
                'px-2 py-[5px] rounded-none rounded-bl-md',
                {},
              )}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={tw`flex-grow`}
            style={tw.style({
              backgroundColor: colors.WHITE_COLOR,
            })}>
            {fList(DATA_NOTIFICATION).length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={DATA_NOTIFICATION}
                  contentContainerStyle={{
                    paddingVertical: 8,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItemNotification}
                  nestedScrollEnabled
                />
              </>
            ) : (
              <ScreenNoData
                uriLocal={require('../../../assets/images/notification_empty.png')}
              />
            )}
          </ScrollView>
        </View>
        <ActionSheetCP
          title="Bộ lọc thông báo"
          isVisible={isVisibleFilter}
          onClose={() => handleChange('isVisibleFilter', false)}
          onOpen={() => handleChange('isVisibleFilter', true)}>
          <View style={tw.style('flex-col py-3')}>
            {OPTIONS_FILTER.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    handleChange('filter_type', item?.value);
                    handleChange('isVisibleFilter', false);
                  }}
                  style={tw.style(`px-2 py-3 flex-row gap-2 items-center`, {
                    backgroundColor:
                      filter_type === item?.value
                        ? colors.PRIMARY_COLOR + '2a'
                        : 'transparent',
                  })}>
                  <IconCP
                    name={item?.iconName}
                    size={20}
                    typeIcon={item?.typeIcon}
                    color={
                      filter_type === item?.value
                        ? colors.PRIMARY_COLOR
                        : colors.BLACK_COLOR
                    }
                  />
                  <Text
                    style={tw.style(
                      `text-[15px] ${
                        filter_type === item?.value
                          ? 'font-bold'
                          : 'font-normal'
                      }`,
                      {
                        color:
                          filter_type === item?.value
                            ? colors.PRIMARY_COLOR
                            : colors.BLACK_COLOR,
                      },
                    )}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
