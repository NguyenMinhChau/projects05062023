// BÁO CÁO LỊCH SỬ HÀN NỐI CHO TRIỂN KHAI/NÂNG CẤP
import React from 'react';
import {useMgnMoiHanActionFour} from './hooks';
import {useColorThemeCCDC} from '../../config';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import LoadingScreen from '../../../../../General/LoadingScreen';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import tw from '../../../../../../styles/twrnc.global';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputCP from '../../../../../General/TextInputCP';
import FastImageCP from '../../../../../General/FastImageCP';
import ButtonCP from '../../../../../General/ButtonCP';
import ConditionImageKetQuaHan from './ConditionImageKetQuaHan';
import ConditionImageBaoDuong from './ConditionImageBaoDuong';
import ConditionImage from './ConditionImage';
import {IconCP, TYPE_ICON} from '../../../../../../utils/icon.utils';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  optionsImageLibrary,
  optionsImageLibraryMultiple,
  optionsLaunchCamera,
} from './config';
import useAppPermission from '../../../../../../utils/MgnAccess/config';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../../../../utils/file.utils';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import {fList} from '../../../../../../utils/array.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import {HOST_101, PORT} from '@env';
import ActionSheetCP from '../../../../../General/ActionSheetCP';

export default function ScreenActionFour({navigation, route}) {
  const {data, _idMayHan} = {...route.params};
  const {
    isLoading,
    isEdit,
    image,
    image_multiple,
    image_current,
    image_target_link,
    data_image_machine_uploaded,
    ma_ke_hoach,
    clickImage,
    target_condition_image,
    image_picker,
    visible_image,
    used_visible,

    handleReset,
    handleChangeValue,
    handleChangePhoto,
    CallApiGetList,
    handleSubmit,
    handleUpdate,
    checkMaKeHoach,
  } = useMgnMoiHanActionFour(data, _idMayHan);
  const {colors} = useColorThemeCCDC();
  const {openDialogConfirmToast} = useDialogConfirmToast();
  const {openNotificationToast} = useNotificationToast();
  const {uri} = {...image};
  const {uri: uri_current} = {...image_current};
  const textPlanCode = ma_ke_hoach
    ?.split('\n')
    ?.map(item => item?.trim())
    ?.join(',');
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Báo cáo lịch sử hàn nối cho triển khai/nâng cấp"
          styleText={tw.style('text-[13px]')}
          handleBack={() => {
            handleReset();
            // CallApiGetList();
          }}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('py-2 px-3 flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <FormInfo
              dataState={{...useMgnMoiHanActionFour(data, _idMayHan)}}
              uri={uri}
              navigation={navigation}
            />
            <View style={tw.style('flex-row items-center w-full py-2 gap-2')}>
              <ButtonCP
                iconName="close-outline"
                colorIcon="#ffffff"
                titleIcon="Hủy bỏ"
                colorBG="#ff0000"
                colorBorder="#ff0000"
                onPress={() => {
                  navigation.goBack();
                  handleReset();
                }}
                styleContainer={tw.style('flex-1 p-1')}
              />
              {isEdit ? (
                <ButtonCP
                  iconName="create-outline"
                  colorIcon="#ffffff"
                  titleIcon="Cập nhật"
                  colorBorder="#f39c12"
                  colorBG="#f39c12"
                  onPress={() => {
                    openDialogConfirmToast({
                      title: 'Thông báo',
                      message:
                        'Bạn có chắc chắn muốn cập nhật lịch sử hàn nối cho triển khai/nâng cấp',
                      funcHandle: () => {
                        handleUpdate(navigation, data?._id);
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={
                    !image_current ||
                    !image ||
                    !ma_ke_hoach ||
                    !checkMaKeHoach(textPlanCode)
                  }
                />
              ) : (
                <ButtonCP
                  iconName="folder-plus-outline"
                  typeIcon={TYPE_ICON.iconMaterial}
                  colorIcon="#ffffff"
                  titleIcon="Tạo mới"
                  colorBorder="#43a047"
                  colorBG="#43a047"
                  onPress={() => {
                    openDialogConfirmToast({
                      title: 'Thông báo',
                      message:
                        'Bạn có chắc chắn muốn tạo mới lịch sử hàn nối cho triển khai/nâng cấp?',
                      funcHandle: () => {
                        handleSubmit(navigation, data?._id);
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={
                    !image_current ||
                    !image ||
                    !ma_ke_hoach ||
                    !checkMaKeHoach(textPlanCode)
                  }
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
      <ModalSelectedImage
        uri={
          clickImage === 'image_1'
            ? image_multiple || data_image_machine_uploaded
            : clickImage === 'image_2'
            ? uri
            : uri_current
        }
        image_picker={image_picker}
        handleChangePhoto={handleChangePhoto}
        handleChangeValue={handleChangeValue}
      />
      <ModalViewImage
        image_target_link={image_target_link}
        clickImage={clickImage}
        uri={
          clickImage === 'image_1'
            ? image_multiple || data_image_machine_uploaded
            : clickImage === 'image_2'
            ? uri
            : uri_current
        }
        visible_image={visible_image}
        handleChangeValue={handleChangeValue}
      />
      <ModalUsedImage
        target_condition_image={target_condition_image}
        used_visible={used_visible}
        handleChangeValue={handleChangeValue}
      />
    </>
  );
}

const FormInfo = ({dataState, uri, navigation}) => {
  const {
    isEdit,
    ma_ke_hoach,
    image_multiple,
    image,
    image_current,
    note,
    data_image_machine_uploaded,

    handleChangeValue,
    handleChangePhoto,
    checkMaKeHoach,
  } = {...dataState};
  const {colors} = useColorThemeCCDC();
  const {openNotificationToast} = useNotificationToast();
  const textPlanCode = ma_ke_hoach
    ?.split('\n')
    ?.map(item => item?.trim())
    ?.join(',');
  return (
    <>
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP
            name="code-working-outline"
            size={18}
            color={colors.BLACK_COLOR}
          />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Mã kế hoạch <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate({
                name: SCREEN_NAVIGATE.WebView_Review_Screen,
                params: {
                  url: `${HOST_101}:${PORT}/assets/Qui_dinh_y_nghĩa_cac_ky_tu_trong_cap_MKH.pdf`,
                  title: 'Quy định và ý nghĩa trong tạo và cấp mã hế hoạch',
                  name_file: `QUI ĐỊNH VÀ Ý NGHĨA CÁC KÝ TỰ TRONG TẠO/CẤP MÃ KẾ HOẠCH.pdf`,
                },
              });
            }}>
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Xem hướng dẫn)
            </Text>
          </TouchableOpacity>
        </View>
        <TextInputCP
          placeholder="HCM.I.M.AQ.151123.01,HCM.I.M.AQ.151123.02"
          value={ma_ke_hoach}
          multiline={true}
          error={!checkMaKeHoach(textPlanCode)}
          onChange={val => {
            handleChangeValue('ma_ke_hoach', val?.toUpperCase());
          }}
          style={tw.style(`justify-center min-h-[35px] mt-1 mb-0`)}
          contentStyle={tw`p-2`}
        />
        <Text
          style={tw.style('text-[12px] italic leading-5 mb-2', {
            color: colors.BLACK_COLOR,
          })}>
          <Text style={tw.style('text-red-500')}>* </Text>
          Có thể nhập nhiều mã kế hoạch, mỗi mã kế hoạch là 1 dòng hoặc viết
          liền cách nhau bởi dấu phẩy
        </Text>
      </View>

      {/* MULTIPLE - image_1 */}
      {/* <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <View style={tw.style('flex-row gap-1 items-center mr-5')}>
            <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
            <Text
              style={tw.style('text-[15px] font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Tải lên hình ảnh thông tin bảo dưỡng và lịch sử hàn gần nhất mục
              KẾT QUẢ HÀN <Text style={tw.style('text-red-500')}>*</Text>
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleChangeValue('used_visible', true)}>
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Xem hướng dẫn)
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw.style(
            `items-center justify-center my-2 gap-2 py-6 rounded-xl border-[2px] border-dashed relative`,
            {
              borderColor: '#ccc',
            },
          )}
          activeOpacity={1}>
          {fList(image_multiple).length === 0 &&
          data_image_machine_uploaded?.length === 0 ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <ScrollView
              horizontal={true}
              contentContainerStyle={tw.style('flex-row gap-3 px-3')}>
              {fList(image_multiple || data_image_machine_uploaded).map(
                (item, index) => {
                  return (
                    <View style={tw.style('relative')} key={index}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          const newData = fList(
                            image_multiple || data_image_machine_uploaded,
                          ).filter((item, indexItem) => indexItem !== index);
                          handleChangeValue(
                            isEdit
                              ? 'data_image_machine_uploaded'
                              : 'image_multiple',
                            newData,
                          );
                        }}
                        style={tw.style(
                          'absolute z-50 top-1 right-1 bg-white items-center justify-center w-[20px] h-[20px] rounded-full',
                        )}>
                        <IconCP
                          name="close-outline"
                          size={18}
                          color="#ff0000"
                        />
                      </TouchableOpacity>
                      <FastImageCP
                        // isImage
                        resizeMode="stretch"
                        style={tw.style('w-[100px] max-h-[80px] rounded-lg')}
                        onTouchStart={() => {
                          handleChangeValue('clickImage', 'image_1');
                          handleChangeValue(
                            'image_target_link',
                            item?.uri || item,
                          );
                          handleChangeValue('visible_image', true);
                        }}
                        uri={item?.uri || item}
                      />
                    </View>
                  );
                },
              )}
            </ScrollView>
          )}
          <Text
            style={tw.style('text-[14px] font-bold text-center mx-2', {
              color: colors.PRIMARY_COLOR,
            })}
            onPress={() => {
              handleChangeValue('clickImage', 'image_1');
              launchImageLibraryUtils(
                optionsImageLibraryMultiple,
                handleChangePhoto,
              );
            }}>
            {fList(image_multiple).length > 0 ||
            data_image_machine_uploaded?.length > 0
              ? 'Cập nhật'
              : 'Tải lên'}{' '}
            hình ảnh thông tin bảo dưỡng và lịch sử hàn gần nhất mục KẾT QUẢ HÀN
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* KET QUA HAN - image_3 */}
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <View style={tw.style('flex-row gap-1 items-center mr-5')}>
            <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
            <Text
              style={tw.style('text-[15px] font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Tải lên hình ảnh gần nhất mục KẾT QUẢ HÀN{' '}
              <Text style={tw.style('text-red-500')}>*</Text>
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleChangeValue('target_condition_image', 'ket_qua_han');
              handleChangeValue('used_visible', true);
            }}>
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Xem hướng dẫn)
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw.style(
            `items-center justify-center my-2 gap-2 py-6 rounded-xl border-[2px] border-dashed relative`,
            {
              borderColor: colors.BLACK_COLOR,
            },
          )}
          activeOpacity={1}>
          {!image_current?.uri ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <FastImageCP
              // isImage
              uri={image_current?.uri}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('clickImage', 'image_3');
                handleChangeValue('visible_image', true);
              }}
            />
          )}
          <Text
            style={tw.style('text-[14px] font-bold', {
              color: colors.PRIMARY_COLOR,
            })}
            onPress={() => {
              handleChangeValue('clickImage', 'image_3');
              handleChangeValue('image_picker', true);
            }}>
            {image_current?.uri ? 'Cập nhật' : 'Tải lên'} hình ảnh gần nhất mục
            KẾT QUẢ HÀN
          </Text>
        </TouchableOpacity>
      </View>

      {/* THONG TIN BAO DUONG - image_4 */}
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <View style={tw.style('flex-row gap-1 items-center mr-5')}>
            <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
            <Text
              style={tw.style('text-[15px] font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Tải lên hình ảnh thông tin bảo dưỡng{' '}
              <Text style={tw.style('text-red-500')}>*</Text>
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleChangeValue(
                'target_condition_image',
                'thong_tin_bao_duong',
              );
              handleChangeValue('used_visible', true);
            }}>
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Xem hướng dẫn)
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw.style(
            `items-center justify-center my-2 gap-2 py-6 rounded-xl border-[2px] border-dashed relative`,
            {
              borderColor: colors.BLACK_COLOR,
            },
          )}
          activeOpacity={1}>
          {!image?.uri ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <FastImageCP
              // isImage
              uri={image?.uri}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('clickImage', 'image_2');
                handleChangeValue('visible_image', true);
              }}
            />
          )}
          <Text
            style={tw.style('text-[14px] font-bold', {
              color: colors.PRIMARY_COLOR,
            })}
            onPress={() => {
              handleChangeValue('clickImage', 'image_2');
              handleChangeValue('image_picker', true);
            }}>
            {image?.uri ? 'Cập nhật' : 'Tải lên'} hình ảnh thông tin bảo dưỡng
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row w-full gap-1 items-center flex-wrap')}>
          <IconCP name="receipt-outline" size={18} color={colors.BLACK_COLOR} />
          <Text
            style={tw.style('text-[15px] mb-2 font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Ghi chú
          </Text>
        </View>
        <TextInputCP
          placeholder="Ghi chú"
          multiline={true}
          value={note}
          onChange={val => {
            handleChangeValue('note', val);
          }}
          style={tw`h-[150px]`}
          contentStyle={tw`p-2`}
        />
      </View>
    </>
  );
};

const ModalSelectedImage = ({
  uri,
  image_picker,
  handleChangeValue,
  handleChangePhoto,
}) => {
  const {checkPermission, TYPE_ACCESS} = useAppPermission();
  const {colors} = useColorThemeCCDC();
  return (
    <>
      <ActionSheetCP
        title={`${uri ? 'Cập nhật' : 'Tải'} hình ảnh`}
        isVisible={image_picker}
        onClose={() => handleChangeValue('image_picker', false)}
        onOpen={() => handleChangeValue('image_picker', true)}>
        <View style={tw`mt-3 min-h-[130px]`}>
          <ButtonCP
            iconName="image-outline"
            colorIcon={colors.BLACK_COLOR}
            titleIcon="Chọn ảnh từ thư viện"
            bgTransparent
            noneBorder
            onPress={() => {
              launchImageLibraryUtils(optionsImageLibrary, handleChangePhoto);
            }}
            styleContainer={tw.style('p-2 justify-start items-start')}
          />
          <ButtonCP
            iconName="camera-outline"
            colorIcon={colors.BLACK_COLOR}
            titleIcon="Chụp ảnh"
            bgTransparent
            noneBorder
            onPress={() => {
              checkPermission(TYPE_ACCESS.CAMERA, false);
              launchCameraUtils(optionsLaunchCamera, handleChangePhoto);
            }}
            styleContainer={tw.style('p-2 justify-start items-start')}
          />
        </View>
      </ActionSheetCP>
    </>
  );
};

const ModalViewImage = ({
  uri,
  image_target_link,
  clickImage,
  visible_image,
  handleChangeValue,
}) => {
  const {colors} = useColorThemeCCDC();
  const imageUrls =
    clickImage === 'image_1'
      ? fList(uri).map(item => {
          return {url: item?.uri || item};
        })
      : [{url: uri}];
  return (
    <Modal transparent={true} visible={visible_image} animationType="fade">
      <ImageViewer
        imageUrls={imageUrls}
        enableSwipeDown={true}
        onSwipeDown={() => handleChangeValue('visible_image', false)}
        style={tw.style('w-full h-[500px]')}
        loadingRender={() => {
          return (
            <View
              style={tw.style(
                'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto',
                {
                  backgroundColor: colors.WHITE_COLOR,
                },
              )}>
              <ActivityIndicator size="small" color={colors.PRIMARY_COLOR} />
              <Text
                style={tw.style('text-[15px] mb-3', {
                  color: colors.BLACK_COLOR,
                })}>
                Đang tải, vui lòng chờ
              </Text>
            </View>
          );
        }}
        renderHeader={() => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleChangeValue('visible_image', false)}
              style={tw.style(
                'absolute top-[10%] right-[15px] z-50 items-center justify-center w-[30px] h-[30px] rounded-full bg-white',
              )}>
              <IconCP name="close-outline" size={25} color={BLACK_COLOR} />
            </TouchableOpacity>
          );
        }}
        renderIndicator={(currentIndex, allSize) => {
          return (
            <>
              <View
                style={tw.style(
                  'absolute top-[10%] left-[15px] z-50 items-center justify-center bg-white px-2 py-1 rounded',
                )}>
                <Text style={tw.style('text-[15px] text-black')}>
                  {currentIndex}/{allSize}
                </Text>
              </View>
            </>
          );
        }}
        saveToLocalByLongPress={false}
        menus={({cancel, saveToLocal}) => {
          return (
            <View
              style={tw.style(
                'absolute bottom-0 right-0 left-0 flex-col justify-center items-center w-full p-2 pb-[30px] shadow-lg rounded-tl-lg rounded-tr-lg',
                {
                  backgroundColor: colors.BACKGROUND_CARD,
                },
              )}>
              <View style={tw.style('flex-row w-full gap-2')}>
                <ButtonCP
                  iconName="close-outline"
                  iconSize={25}
                  colorIcon="#fff"
                  colorBG="#ff0000"
                  colorBorder="#ff0000"
                  titleIcon="Thoát"
                  onPress={cancel}
                  styleContainer={tw.style('p-1 flex-1')}
                />
                <ButtonCP
                  iconName="download-outline"
                  iconSize={25}
                  colorIcon="#fff"
                  colorBG="#2f994e"
                  colorBorder="#2f994e"
                  titleIcon="Lưu ảnh"
                  onPress={saveToLocal}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            </View>
          );
        }}
        // index={imageUrls?.findIndex(item => item.url === image_target_link)}
      />
    </Modal>
  );
};

const ModalUsedImage = ({
  used_visible,
  target_condition_image,
  handleChangeValue,
}) => {
  return (
    <>
      <ActionSheetCP
        title="Điều kiện về hình ảnh"
        isVisible={used_visible}
        onClose={() => handleChangeValue('used_visible', false)}
        onOpen={() => handleChangeValue('used_visible', true)}>
        <View style={tw`mt-3 min-h-[200px]`}>
          {target_condition_image === 'ket_qua_han' ? (
            <ConditionImageKetQuaHan />
          ) : target_condition_image === 'thong_tin_bao_duong' ? (
            <ConditionImageBaoDuong />
          ) : (
            <ConditionImage />
          )}
        </View>
      </ActionSheetCP>
    </>
  );
};
