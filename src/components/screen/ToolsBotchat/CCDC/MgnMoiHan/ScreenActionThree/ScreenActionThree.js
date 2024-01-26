// BÁO CÁO LỊCH SỬ HÀN NỐI CHO XỬ LÝ SỰ CỐ
import React from 'react';
import {useMgnMoiHanActionThree} from './hooks';
import {useColorThemeCCDC} from '../../config';
import LoadingScreen from '../../../../../General/LoadingScreen';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../../../../../../styles/twrnc.global';
import FastImageCP from '../../../../../General/FastImageCP';
import TextInputCP from '../../../../../General/TextInputCP';
import ButtonCP from '../../../../../General/ButtonCP';
import ConditionImageBaoDuong from './ConditionImageBaoDuong';
import ConditionImageKetQuaHan from './ConditionImageKetQuaHan';
import ConditionImageSerial from './ConditionImageSerial';
import {IconCP, TYPE_ICON} from '../../../../../../utils/icon.utils';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import ImageViewer from 'react-native-image-zoom-viewer';
import useAppPermission from '../../../../../../utils/MgnAccess/config';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../../../../utils/file.utils';
import {optionsImageLibrary, optionsLaunchCamera} from './config';
import ScreenNoData from '../../../../../General/ScreenNoData';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import RenderTagCP from '../../../../../General/RenderTag';
import {useAppLocation} from '../../../../../../utils/location.utils';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import {fList} from '../../../../../../utils/array.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import ActionSheetCP from '../../../../../General/ActionSheetCP';

export default function ScreenActionThree({navigation, route}) {
  const {data, _idMayHan} = {...route.params};
  const {
    isLoading,
    isEdit,
    image_multiple,
    image_current,
    image_serial,
    image_error,
    data_image_machine_uploaded,
    selected_sc,
    clickImage,
    target_condition_image,
    image_picker,
    visible_image,
    used_visible,

    handleReset,
    handleSubmit,
    handleUpdate,
    CallApiGetList,
    handleChangeValue,
    handleChangePhoto,
  } = useMgnMoiHanActionThree(data, _idMayHan);
  const {openDialogConfirmToast} = useDialogConfirmToast();
  const {openNotificationToast} = useNotificationToast();
  const {colors} = useColorThemeCCDC();
  const {uri: uri_current} = {...image_current};
  const {uri: uri_error} = {...image_error};
  const {latitude, longitude} = useAppLocation();
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Báo cáo lịch sử hàn nối cho xử lý sự cố"
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
              _idMayHan={_idMayHan}
              dataState={{...useMgnMoiHanActionThree(data, _idMayHan)}}
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
                    if (!latitude && latitude !== 0) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Không tìm được vĩ độ, vui lòng thử lại!',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    } else if (!longitude && longitude !== 0) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Không tìm được kinh độ, vui lòng thử lại!',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    }
                    openDialogConfirmToast({
                      title: 'Thông báo',
                      message:
                        'Bạn có chắc chắn muốn cập nhật hàn nối cho xử lý sự cố?',
                      funcHandle: () => {
                        handleUpdate(
                          navigation,
                          data?._id,
                          latitude,
                          longitude,
                        );
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={
                    !image_error || !image_current || selected_sc.length === 0
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
                    if (!latitude && latitude !== 0) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Không tìm được vĩ độ, vui lòng thử lại!',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    } else if (!longitude && longitude !== 0) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Không tìm được kinh độ, vui lòng thử lại!',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    }
                    openDialogConfirmToast({
                      title: 'Thông báo',
                      message:
                        'Bạn có chắc chắn muốn tạo mới hàn nối cho xử lý sự cố?',
                      funcHandle: () => {
                        handleSubmit(
                          navigation,
                          data?._id,
                          latitude,
                          longitude,
                        );
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={
                    !image_error || !image_current || selected_sc.length === 0
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
            : clickImage === 'image_3'
            ? uri_current
            : uri_error
        }
        image_picker={image_picker}
        handleChangePhoto={handleChangePhoto}
        handleChangeValue={handleChangeValue}
      />
      <ModalViewImage
        clickImage={clickImage}
        uri={
          clickImage === 'image_1'
            ? image_multiple || data_image_machine_uploaded
            : clickImage === 'image_3'
            ? uri_current
            : uri_error
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

const FormInfo = ({dataState, _idMayHan, navigation}) => {
  const {
    selected_sc,
    data_image_machine_uploaded,
    image_current,
    image_error,
    note,

    handleChangeValue,
  } = {...dataState};
  const {colors} = useColorThemeCCDC();
  return (
    <>
      <View style={tw.style('flex-col gap-1 w-full mb-2')}>
        <View style={tw.style('flex-row items-center flex-wrap gap-1')}>
          <IconCP
            name="newspaper-outline"
            size={18}
            color={colors.BLACK_COLOR}
          />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Danh sách SC <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleChangeValue('sc_selected_fake', selected_sc);
              handleChangeValue('idUpdated', _idMayHan);
              navigation.navigate({
                name: SCREEN_NAVIGATE.Mgn_Moi_Han_ListSC_Screen,
                params: {},
              });
            }}
            style={tw.style('flex-row gap-1 items-center')}>
            <Text
              style={tw.style('text-[15px] italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Xem và chọn danh sách SC)
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={tw.style(' rounded-xl p-2 shadow-md mt-1', {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          {selected_sc.length > 0 ? (
            <View style={tw.style('w-full max-h-[200px]')}>
              <ScrollView
                nestedScrollEnabled
                contentContainerStyle={tw.style('flex-row flex-wrap gap-2')}>
                {selected_sc.map((item, index) => {
                  const {TicketCode} = {...item};
                  return (
                    <RenderTagCP
                      key={index}
                      styleText={tw.style({color: colors.BLACK_COLOR})}
                      styleContainer={tw.style('', {
                        backgroundColor: colors.BACKGROUND_CARD,
                        borderColor: colors.BLACK_COLOR,
                      })}
                      tag={`${TicketCode}`}
                    />
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <ScreenNoData
              styleContainer={tw.style('h-[150px] w-full flex-0')}
            />
          )}
        </View>
      </View>

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
          {!image_error?.uri ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <FastImageCP
              // isImage
              uri={image_error?.uri}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('clickImage', 'image_4');
                handleChangeValue('visible_image', true);
              }}
            />
          )}
          <Text
            style={tw.style('text-[14px] font-bold', {
              color: colors.PRIMARY_COLOR,
            })}
            onPress={() => {
              handleChangeValue('clickImage', 'image_4');
              handleChangeValue('image_picker', true);
            }}>
            {image_error?.uri ? 'Cập nhật' : 'Tải lên'} hình ảnh thông tin bảo
            dưỡng
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('w-full flex-row items-center flex-wrap gap-1')}>
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
          {target_condition_image === 'thong_tin_bao_duong' ? (
            <ConditionImageBaoDuong />
          ) : target_condition_image === 'serial_than_may' ? (
            <ConditionImageSerial />
          ) : target_condition_image === 'ket_qua_han' ? (
            <ConditionImageKetQuaHan />
          ) : null}
        </View>
      </ActionSheetCP>
    </>
  );
};
