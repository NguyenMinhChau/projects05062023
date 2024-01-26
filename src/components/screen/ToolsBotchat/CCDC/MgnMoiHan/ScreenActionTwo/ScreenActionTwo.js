// QUẢN LÍ LỊCH SỬ GỬI BẢO HÀNH/SỬA CHỮA
import React from 'react';
import {useMgnMoiHanActionTwo} from './hooks';
import {useColorThemeCCDC} from '../../config';
import LoadingScreen from '../../../../../General/LoadingScreen';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import tw from '../../../../../../styles/twrnc.global';
import ConditionImageBaoDuong from './ConditionImageBaoDuong';
import ConditionImageSerial from './ConditionImageSerial';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconCP, TYPE_ICON} from '../../../../../../utils/icon.utils';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../../../../utils/file.utils';
import useAppPermission from '../../../../../../utils/MgnAccess/config';
import {
  optionsImageLibrary,
  optionsLaunchCamera,
  optionsLaunchCameraMultiple,
} from './config';
import TextInputCP from '../../../../../General/TextInputCP';
import FastImageCP from '../../../../../General/FastImageCP';
import DateSelect from '../../../../../General/DateSelect';
import ButtonCP from '../../../../../General/ButtonCP';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import {fList} from '../../../../../../utils/array.utils';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import ActionSheetCP from '../../../../../General/ActionSheetCP';

export default function ScreenActionTwo({navigation, route}) {
  const {data, _idMayHan} = {...route.params};
  const {
    isLoading,
    isEdit,
    image_maintance,
    image_current,
    image_serial,
    image_error,
    image_target_link,
    clickImage,
    target_condition_image,
    data_image_machine_uploaded,
    date_maintance,
    image_picker,
    visible_image,
    used_visible,
    info_error,
    detail_info_error,

    handleReset,
    CallApiGetList,
    handleChangeValue,
    handleChangePhoto,
    handleSubmit,
    handleUpdate,
  } = useMgnMoiHanActionTwo(data, _idMayHan);
  const {openDialogConfirmToast} = useDialogConfirmToast();
  const {openNotificationToast} = useNotificationToast();
  const {colors} = useColorThemeCCDC();
  const {uri: uri_current} = {...image_current}; // image 2
  const {uri: uri_maintance} = {...image_maintance}; // image 3
  const {uri: uri_serial} = {...image_serial}; // image 4
  const optionsImageLibraryMultiple = {
    title: 'Select Photo',
    mediaType: 'photo',
    multiple: true,
    selectionLimit: isEdit
      ? 8 - fList(data_image_machine_uploaded)?.length
      : 8 - fList(image_error)?.length,
    includeBase64: true,
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Quản lí lịch sử gửi bảo hành/sửa chữa"
          handleBack={() => {
            handleReset();
            // CallApiGetList();
          }}
          styleText={tw.style('text-[13px]')}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('py-2 px-3 flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <FormInfo
              optionsImageLibraryMultiple={optionsImageLibraryMultiple}
              dataState={{...useMgnMoiHanActionTwo(data, _idMayHan)}}
              _idMayHan={_idMayHan}
              dataParams={data}
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
                    if (fList(data_image_machine_uploaded)?.length > 8) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Vui lòng tải dưới 8 ảnh thông tin bảo dưỡng',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    }
                    openDialogConfirmToast({
                      title: 'Thông báo',
                      message:
                        'Bạn có chắc chắn muốn cập nhật gửi bảo hành/sửa chữa?',
                      funcHandle: () => {
                        handleUpdate(navigation, data?._id);
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={
                    !date_maintance ||
                    (image_error?.length === 0 &&
                      data_image_machine_uploaded?.length === 0) ||
                    !image_maintance ||
                    !image_serial ||
                    !info_error ||
                    !detail_info_error
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
                    if (fList(image_error)?.length > 8) {
                      openNotificationToast({
                        title: 'Thông báo',
                        message: 'Vui lòng tải dưới 8 ảnh thông tin bảo dưỡng',
                        type: TYPE_NOTIFICATION.WARNING,
                      });
                      return;
                    }
                    openDialogConfirmToast({
                      title: 'Thông báo',
                      message:
                        'Bạn có chắc chắn muốn tạo mới gửi bảo hành/sửa chữa?',
                      funcHandle: () => {
                        handleSubmit(navigation, data?._id);
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={
                    !date_maintance ||
                    image_error?.length === 0 ||
                    !image_maintance ||
                    !image_serial ||
                    !info_error ||
                    !detail_info_error
                  }
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
      <ModalSelectedImage
        optionsImageLibraryMultiple={optionsImageLibraryMultiple}
        clickImage={clickImage}
        uri={
          clickImage === 'image_1'
            ? image_error || data_image_machine_uploaded
            : clickImage === 'image_updated'
            ? data_image_machine_uploaded
            : clickImage === 'image_2'
            ? uri_current
            : clickImage === 'image_3'
            ? uri_maintance
            : uri_serial
        }
        image_picker={image_picker}
        handleChangePhoto={handleChangePhoto}
        handleChangeValue={handleChangeValue}
      />
      <ModalViewImage
        clickImage={clickImage}
        image_target_link={image_target_link}
        uri={
          clickImage === 'image_1'
            ? image_error || data_image_machine_uploaded
            : clickImage === 'image_updated'
            ? data_image_machine_uploaded
            : clickImage === 'image_2'
            ? uri_current
            : clickImage === 'image_3'
            ? uri_maintance
            : uri_serial
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

const FormInfo = ({dataState, optionsImageLibraryMultiple}) => {
  const {
    isEdit,
    date_update,
    date_maintance,
    image_maintance,
    data_image_machine_uploaded,
    note,
    image_serial,
    image_error,
    info_error,
    detail_info_error,
    date_picker,
    fullName,

    handleChangeValue,
    handleChangePhoto,
    dateMaintanceConfirm,
  } = {...dataState};
  const {colors} = useColorThemeCCDC();
  const {openNotificationToast} = useNotificationToast();

  return (
    <>
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP
            name="calendar-number-outline"
            size={18}
            color={colors.BLACK_COLOR}
          />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Ngày tháng cập nhật{' '}
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Chỉ xem)
            </Text>
          </Text>
        </View>
        <DateSelect
          visible={false}
          value={date_update}
          onChange={val => {}}
          onPressDate={() => {}}
          styleInput={tw.style(`justify-center h-[45px] mt-1`)}
          disabled
        />
      </View>
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP name="person-outline" size={18} color={colors.BLACK_COLOR} />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Người cập nhật{' '}
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Chỉ xem)
            </Text>
          </Text>
        </View>
        <TextInputCP
          placeholder="Tên người cập nhật"
          value={fullName}
          style={tw.style(`justify-center h-[45px] mt-1`)}
          outlinedStyle={tw.style(`border-[1px]`, {
            borderColor: '#ccc',
          })}
          disabled
        />
      </View>
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP
            name="calendar-number-outline"
            size={18}
            color={colors.BLACK_COLOR}
          />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Ngày tháng gửi bảo hành/sửa chữa{' '}
            <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
        </View>
        <DateSelect
          visible={date_picker}
          value={date_maintance}
          onChange={val => dateMaintanceConfirm(val)}
          onPressDate={() => handleChangeValue('date_picker', true)}
          styleInput={tw.style(`justify-center h-[45px] mt-1`)}
        />
      </View>

      {/* SERIAL OK - image 4: 1 ảnh */}
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Tải lên hình ảnh serial trên thân máy{' '}
            <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleChangeValue('target_condition_image', 'serial_than_may');
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
          {!image_serial?.uri ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <FastImageCP
              // isImage
              uri={image_serial?.uri}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('image_target_link', image_serial?.uri);
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
            {image_serial?.uri ? 'Cập nhật' : 'Tải lên'} hình ảnh serial trên
            thân máy
          </Text>
        </TouchableOpacity>
      </View>

      {/* LỖI OK - image 1: < 8 ảnh*/}
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <View style={tw.style('flex-row gap-1 items-center mr-5')}>
            <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
            <Text
              style={tw.style('text-[15px] font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Tải lên hình ảnh vị trí hư hỏng/bị lỗi (Tối đa 8 ảnh){' '}
              <Text style={tw.style('text-red-500')}>*</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw.style(
            `items-center justify-center my-2 gap-2 py-6 rounded-xl border-[2px] border-dashed relative`,
            {
              borderColor: '#ccc',
            },
          )}
          activeOpacity={1}>
          {fList(image_error).length === 0 &&
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
              {fList(image_error || data_image_machine_uploaded).map(
                (item, index) => {
                  return (
                    <View style={tw.style('relative')} key={index}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          const newData = fList(
                            image_error || data_image_machine_uploaded,
                          ).filter((item, indexItem) => indexItem !== index);
                          handleChangeValue(
                            isEdit
                              ? 'data_image_machine_uploaded'
                              : 'image_error',
                            newData.length > 0 ? newData : [],
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
              if (
                isEdit
                  ? fList(data_image_machine_uploaded)?.length >= 8
                  : fList(image_error)?.length >= 8
              ) {
                openNotificationToast({
                  title: 'Thông báo',
                  message:
                    'Đã quá giới hạn tải ảnh, vui lòng tải nhỏ hơn hoặc bằng 8 ảnh',
                  type: TYPE_NOTIFICATION.WARNING,
                });
                return;
              }
              handleChangeValue('clickImage', 'image_1');
              launchImageLibraryUtils(
                optionsImageLibraryMultiple,
                handleChangePhoto,
                {
                  clickImage: 'image_1',
                },
              );
            }}>
            {fList(image_error).length > 0 ||
            data_image_machine_uploaded?.length > 0
              ? 'Cập nhật'
              : 'Tải lên'}{' '}
            vị trí hư hỏng/bị lỗi
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP
            name="information-circle-outline"
            size={18}
            color={colors.BLACK_COLOR}
          />
          <Text
            style={tw.style('text-[15px] mb-2 font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Thông tin lỗi <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
        </View>
        <TextInputCP
          placeholder="Ví dụ: Lỗi khối gia nhiệt, Lỗi L/R sợi quá dài, Lỗi X/Y nền tối, Lỗi Motor quá bước, Lỗi arc lệch trái/phải, Lỗi sợi quá bẩn/góc cắt lớn, Lỗi mối hàn suy hao cao, Lỗi căn chỉnh sợi, Lỗi khác"
          multiline={true}
          value={info_error}
          onChange={val => {
            handleChangeValue('info_error', val);
          }}
          style={tw`h-[150px]`}
          contentStyle={tw`p-2`}
        />
      </View>

      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP name="reader-outline" size={18} color={colors.BLACK_COLOR} />
          <Text
            style={tw.style('text-[15px] mb-2 font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Mô tả chi tiết lỗi <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
        </View>
        <TextInputCP
          placeholder="Ví dụ: Nắp gia nhiệt không tự mở, Nung không được,... "
          multiline={true}
          value={detail_info_error}
          onChange={val => {
            handleChangeValue('detail_info_error', val);
          }}
          style={tw`h-[150px]`}
          contentStyle={tw`p-2`}
        />
      </View>

      {/*  BẢO DƯỠNG - image 3:  1 ảnh */}
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
          <Text
            style={tw.style('text-[15px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            Tải lên hình ảnh thông tin bảo dưỡng{' '}
            <Text style={tw.style('text-red-500')}>*</Text>
          </Text>
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
          {!image_maintance?.uri ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <FastImageCP
              // isImage
              uri={image_maintance?.uri}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('clickImage', 'image_3');
                handleChangeValue('image_target_link', image_maintance?.uri);
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
            {image_maintance?.uri ? 'Cập nhật' : 'Tải lên'} hình ảnh thông tin
            bảo dưỡng
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
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
  optionsImageLibraryMultiple,
  image_picker,
  clickImage,
  uri,
  handleChangeValue,
  handleChangePhoto,
}) => {
  const {checkPermission, TYPE_ACCESS} = useAppPermission();
  const otherOptions = {
    clickImage: clickImage,
  };
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
              launchImageLibraryUtils(
                clickImage === 'image_1'
                  ? optionsImageLibraryMultiple
                  : optionsImageLibrary,
                handleChangePhoto,
                otherOptions,
              );
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
              launchCameraUtils(
                clickImage === 'image_1'
                  ? optionsLaunchCameraMultiple
                  : optionsLaunchCamera,
                handleChangePhoto,
                otherOptions,
              );
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
  image_target_link,
  visible_image,
  handleChangeValue,
}) => {
  const {colors} = useColorThemeCCDC();
  const imageUrls =
    clickImage === 'image_1'
      ? fList(uri).map(item => {
          return {url: item?.uri || item};
        })
      : clickImage === 'image_updated'
      ? fList(uri).map(item => {
          return {url: item};
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
        index={imageUrls.findIndex(item => {
          return item.url === image_target_link;
        })}
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
          ) : null}
        </View>
      </ActionSheetCP>
    </>
  );
};
