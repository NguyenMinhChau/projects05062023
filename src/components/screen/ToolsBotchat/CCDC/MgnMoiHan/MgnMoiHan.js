import React from 'react';
import {Platform} from 'react-native';
import {useMgnMoiHan} from './hooks';
import {useColorThemeCCDC} from '../config';
import PaginationCP from '../../../../General/PaginationCP';
import tw from '../../../../../styles/twrnc.global';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import ButtonCP from '../../../../General/ButtonCP';
import {TextInput} from 'react-native-paper';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../../styles/colors.global';
import TextInputCP from '../../../../General/TextInputCP';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import LoadingScreen from '../../../../General/LoadingScreen';
import CustomSelectCP from '../../../../General/CustomSelectCP';
import {useLayoutAnimation} from '../../../../../utils/LayoutAnimation';
import ScreenNoData from '../../../../General/ScreenNoData';
import {useRefreshList} from '../../../../../utils/refreshList.utils';
import ActionSheetCP from '../../../../General/ActionSheetCP';
import { TYPE_ICON } from '../../../../../utils/icon.utils';

export default function MgnMoiHanScreen({navigation}) {
  const {
    isLoading,
    isFilter,
    data_moi_han,
    search,
    zone,
    branch,
    vp_cn,
    loai_may,
    hang_sx,
    model,
    tinh_trang,
    DATA_ZONE,
    DATA_BRANCH,
    DATA_VPCN,
    DATA_LOAI_MAY,
    DATA_HANG_SX,
    DATA_MODEL,
    DATA_TINH_TRANG,

    handleBack,
    handleChangeValue,
    RenderItem,
    handleResetFilter,
    CallAPIGetList,
  } = useMgnMoiHan();
  const {colors} = useColorThemeCCDC();
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();
  const {refreshing, onRefresh} = useRefreshList(CallAPIGetList);
  const [activeDropDown, setActiveDropdown] = React.useState(null);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Quản lý - Kiểm soát lịch sử máy hàn"
          styleText={tw.style('text-[13px]')}
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
            <ButtonCP
              colorBorder={colors.PRIMARY_COLOR}
              colorBG={colors.PRIMARY_COLOR}
              colorIcon={'#fff'}
              iconName={isFilter ? 'filter-variant-remove' : 'filter-variant'}
              typeIcon={TYPE_ICON.iconMaterial}
              onPress={() => {
                handleChangeValue('isFilter', !isFilter);
              }}
              styleContainer={tw.style('px-2 py-[5px]')}
            />
          </View>
          <View
            style={tw.style('flex-1')}
            onTouchEnd={() => handleChangeValue('isFilter', false)}>
            {data_moi_han?.payload?.length > 0 ? (
              <>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={data_moi_han?.payload}
                  contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    gap: 8,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItem}
                  nestedScrollEnabled
                />
                <PaginationCP totalPages={data_moi_han?.total_page} />
              </>
            ) : (
              <ScreenNoData />
            )}
          </View>
        </View>
        <ActionSheetCP
          title="Bộ lọc"
          isVisible={isFilter}
          onClose={() => handleChangeValue('isFilter', false)}
          onOpen={() => handleChangeValue('isFilter', true)}
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
                  variant="contained"
                  onPress={handleResetFilter}
                  styleContainer={tw.style('p-1 flex-1')}
                />
                <ButtonCP
                  iconName="navigate-outline"
                  sizeIcon={17}
                  colorIcon="#ffffff"
                  titleIcon="Xác nhận"
                  colorBorder={PRIMARY_COLOR}
                  colorBG={PRIMARY_COLOR}
                  onPress={() => {
                    CallAPIGetList();
                    handleChangeValue('isFilter', false);
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            );
          }}>
          <View style={tw.style('px-1 flex-grow')}>
            <CustomSelectCP
              label="Vùng"
              dataList={DATA_ZONE}
              placeholder="Chọn vùng"
              selectList={zone}
              onSelectValue={val => handleChangeValue('zone', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="zone"
              isActiveDropDown={activeDropDown === 'zone'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
            <CustomSelectCP
              label="Chi nhánh"
              dataList={DATA_BRANCH}
              placeholder="Chọn chi nhánh"
              selectList={branch}
              onSelectValue={val => handleChangeValue('branch', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="branch"
              isActiveDropDown={activeDropDown === 'branch'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
            <CustomSelectCP
              label="VPCN/VPGD"
              dataList={DATA_VPCN}
              placeholder="Chọn VPCN/VPGD"
              selectList={vp_cn}
              onSelectValue={val => handleChangeValue('vp_cn', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="vp_cn"
              isActiveDropDown={activeDropDown === 'vp_cn'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
            <CustomSelectCP
              label="Loại máy"
              dataList={DATA_LOAI_MAY}
              placeholder="Chọn loại máy"
              selectList={loai_may}
              onSelectValue={val => handleChangeValue('loai_may', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="loai_may"
              isActiveDropDown={activeDropDown === 'loai_may'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
            <CustomSelectCP
              label="Hãng SX"
              dataList={DATA_HANG_SX}
              placeholder="Chọn hãng sản xuất"
              selectList={hang_sx}
              onSelectValue={val => handleChangeValue('hang_sx', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="hang_sx"
              isActiveDropDown={activeDropDown === 'hang_sx'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
            <CustomSelectCP
              label="Model"
              dataList={DATA_MODEL}
              placeholder="Chọn Model"
              selectList={model}
              onSelectValue={val => handleChangeValue('model', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="model"
              isActiveDropDown={activeDropDown === 'model'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
            <CustomSelectCP
              label="Tình trạng"
              dataList={DATA_TINH_TRANG}
              placeholder="Chọn tình trạng"
              selectList={tinh_trang}
              onSelectValue={val => handleChangeValue('tinh_trang', val)}
              isQuantityInitData
              quantityDataInit={20}
              multiple
              styleContainer={tw.style('min-h-[40px]')}
              idActive="tinh_trang"
              isActiveDropDown={activeDropDown === 'tinh_trang'}
              onSetActiveDropDown={val => setActiveDropdown(val)}
            />
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
