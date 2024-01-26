import React from 'react';
import {
  Text,
  View,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import PhotoEditor from '@baronha/react-native-photo-editor';
import tw from '../../../../styles/twrnc.global';
import useAppContext from '../../../../utils/hooks/useAppContext';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import RenderTagCP from '../../../General/RenderTag';
import {fList} from '../../../../utils/array.utils';
import {EMPTY_CHAR} from '../../../../helpers/_empty';
import Footer from '../../../General/Footer';
import {IconCP} from '../../../../utils/icon.utils';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../../utils/file.utils';
import {optionsImageLibrary, optionsLaunchCamera} from './config';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';
import {stickers} from '../../../../assets/Stickers';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import {useColorThemeSetting} from '../config';
import useAppPermission from '../../../../utils/MgnAccess/config';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import ActionSheetCP from '../../../General/ActionSheetCP';
import {useCssApp} from '../../../../utils/css.utils';

export default function InfoScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {colors} = useColorThemeSetting();
  const {shadowCss} = useCssApp();

  const {refreshing, onRefresh} = useRefreshList();
  const {checkPermission, TYPE_ACCESS} = useAppPermission();
  const {currentUser} = state.set_data;
  const {file_single} = state.set_data.file;

  const {
    fullName,
    email,
    nameDepartment,
    maNV,
    codeGroup,
    codeRole,
    codeOrganization,
    codeDepartment,
    area,
    zone,
    nameProvince,
    codeProvince,
    branchMnt,
  } = {
    ...currentUser,
  };

  const {codeGroup: role} = {...codeGroup};

  const [showAccord, setShowAccord] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [targetAccord, setTargetAccord] = React.useState('');

  const getProvince = str => {
    var ketQua = str.match(/\((.*?)\)/);
    if (ketQua) {
      var result = ketQua[1];
      return result;
    }
  };

  const dataProvince = [
    ...new Set(
      fList(branchMnt).map(item => {
        return getProvince(item);
      }),
    ),
  ]
    .sort((a, b) => {
      return a.localeCompare(b);
    })
    .map((item, idx) => {
      return {
        label: item,
        value: item,
        code: idx,
      };
    });

  const dataBranch = fList(branchMnt).map((item, idx) => {
    return {
      label: item.replace('(', ' ('),
      value: item,
      code: idx,
    };
  });

  const handleChangePhoto = async response => {
    if (response) {
      // const result = await PhotoEditor.open({
      //   path: response?.assets?.[0]?.uri,
      //   stickers: stickers,
      // });
      const payload = {
        // uri: result || response?.assets?.[0]?.uri,
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName,
        type: response?.assets?.[0]?.type,
      };
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'file',
          value: {...state.set_data.file, file_single: payload},
        }),
      );
      setIsVisible(false);
    }
  };

  const {uri, name, type} = {...file_single};

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Thông tin tài khoản"
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style('p-3 pb-1', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style('rounded-xl p-2', {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              <View style={tw.style('flex-row gap-3 items-center')}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsVisible(true)}
                  style={tw.style(
                    `rounded-full overflow-hidden border border-gray-100 w-[100px] h-[100px]`,
                  )}>
                  <Image
                    source={
                      uri
                        ? {uri: uri}
                        : require('../../../../assets/images/avatar_placeholder.png')
                    }
                    style={tw.style(`w-full h-full`)}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View
                  style={tw.style(
                    'flex-col gap-[2px] flex-grow w-1 items-start',
                  )}>
                  <Text
                    style={tw.style('font-bold text-[16px]', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {fullName || EMPTY_CHAR}
                  </Text>
                  <Text
                    style={tw.style(' text-[13px]', {
                      color: colors.DISABLED_COLOR,
                    })}>
                    Email: {email || EMPTY_CHAR}
                  </Text>
                  <Text
                    style={tw.style(' text-[13px]', {
                      color: colors.DISABLED_COLOR,
                    })}>
                    Mã NV: {maNV || EMPTY_CHAR}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={tw`flex-grow p-3`}
            style={tw.style({
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style(' rounded-xl p-2 mb-3 mt-1', {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              <RowDialogCP
                label="Quyền"
                ValueCP={() => {
                  return (
                    <View style={tw.style('flex-1 items-end justify-end')}>
                      <RenderTagCP
                        tag={role || codeRole}
                        styleText={tw.style('text-white')}
                      />
                    </View>
                  );
                }}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Mã phòng"
                value={`${codeDepartment} - ${codeOrganization}`}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Tên phòng"
                value={nameDepartment}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Khu vực"
                value={area}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Vùng"
                value={zone}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Tỉnh thành"
                value={nameProvince}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Chi nhánh"
                value={codeProvince}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
              />
              <RowDialogCP
                label="Tỉnh thành quản lý"
                ValueCP={() => {
                  return (
                    <View style={tw.style('flex-1 items-end justify-end')}>
                      <IconCP
                        name="chevron-down-outline"
                        size={15}
                        color={colors.BLACK_COLOR}
                      />
                    </View>
                  );
                }}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
                dataAccord={fList(dataProvince)}
                onClickAccord={() => {
                  setShowAccord(prev => !prev);
                  setTargetAccord('province');
                }}
                showAccord={showAccord && targetAccord === 'province'}
              />
              <RowDialogCP
                label="Chi nhánh quản lý"
                noneBorderBottom
                ValueCP={() => {
                  return (
                    <View style={tw.style('flex-1 items-end justify-end')}>
                      <IconCP
                        name="chevron-down-outline"
                        size={15}
                        color={colors.BLACK_COLOR}
                      />
                    </View>
                  );
                }}
                styleLabel={tw`font-medium`}
                styleRow={tw.style('py-3')}
                noBullet
                dataAccord={fList(dataBranch)}
                onClickAccord={() => {
                  setShowAccord(prev => !prev);
                  setTargetAccord('branch');
                }}
                showAccord={showAccord && targetAccord === 'branch'}
              />
            </View>
          </ScrollView>
          <Footer styleLogo={tw.style('h-[70px] w-[100px]')} />
        </View>
        <ActionSheetCP
          title="Thay đổi ảnh đại diện"
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onOpen={() => setIsVisible(true)}>
          <View style={tw`mt-3 min-h-[130px]`}>
            <RowDialogCP
              label="Chọn ảnh từ thư viện"
              styleLabel={tw`font-medium`}
              styleRow={tw.style('py-3')}
              leftNameIcon={'image-outline'}
              onClickAccord={() => {
                launchImageLibraryUtils(optionsImageLibrary, handleChangePhoto);
              }}
              noValue
            />
            <RowDialogCP
              label="Chụp ảnh"
              styleLabel={tw`font-medium`}
              styleRow={tw.style('py-3')}
              leftNameIcon={'camera-outline'}
              onClickAccord={() => {
                checkPermission(TYPE_ACCESS.CAMERA, false);
                launchCameraUtils(optionsLaunchCamera, handleChangePhoto);
              }}
              noValue
            />
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
