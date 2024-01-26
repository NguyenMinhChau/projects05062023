// QUẢN LÍ LỊCH SỬ MỐI HÀN ĐỊNH KÌ
import React from 'react';
import {useMgnMoiHanActionOne} from './hooks';
import LoadingScreen from '../../../../../General/LoadingScreen';
import {useColorThemeCCDC} from '../../config';
import {SafeAreaWrap} from '../../../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../../../General/BannerNestedScreen';
import tw from '../../../../../../styles/twrnc.global';
import {
  ActivityIndicator,
  Button,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MonthSelect from '../../../../../General/MonthSelect';
import FastImageCP from '../../../../../General/FastImageCP';
import TextInputCP from '../../../../../General/TextInputCP';
import ButtonCP from '../../../../../General/ButtonCP';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import {IconCP, TYPE_ICON} from '../../../../../../utils/icon.utils';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../../../../utils/file.utils';
import useAppPermission from '../../../../../../utils/MgnAccess/config';
import {optionsImageLibrary, optionsLaunchCamera} from './config';
import ImageViewer from 'react-native-image-zoom-viewer';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import ConditionImageBaoDuong from './ConditionImageBaoDuong';
import ConditionImageKetQuaHan from './ConditionImageKetQuaHan';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import ActionSheetCP from '../../../../../General/ActionSheetCP';

export default function ScreenActionOne({navigation, route}) {
  const {data, _idMayHan} = {...route.params};
  const {
    isLoading,
    isEdit,
    image,
    note,
    note_update,
    data_image,
    image_current,
    image_current_update,
    clickImage,
    target_condition_image,
    image_picker,
    visible_image,
    used_visible,

    handleChangeValue,
    handleChangePhoto,
    handleReset,
    handleSubmit,
    handleUpdate,
    CallApiGetById,
  } = useMgnMoiHanActionOne(data, _idMayHan);
  const {openDialogConfirmToast} = useDialogConfirmToast();

  const {colors} = useColorThemeCCDC();
  const {uri} = {...image};
  const {dataImg} = {...data_image};
  const {uri: uri_current, name: name_current} = {...image_current};
  const isChangeImageCurrent = image_current_update?.uri !== uri_current;
  const isChangeNote = note_update?.trim() !== note?.trim();
  return (
    <>
      {isLoading && <LoadingScreen />}

      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Quản lí lịch sử mối hàn định kì"
          handleBack={() => {
            handleReset();
            CallApiGetById();
          }}
          styleText={tw.style('text-[13px]')}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('px-3 py-2 flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <FormInfo
              dataState={{...useMgnMoiHanActionOne(data, _idMayHan)}}
              uri={uri}
              uri_current={uri_current}
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
                        'Bạn có chắc chắn muốn cập nhật mối hàn định kì?',
                      funcHandle: () => {
                        handleUpdate(navigation, data?._id);
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={!isChangeImageCurrent && !isChangeNote}
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
                      message: 'Bạn có chắc chắn muốn tạo mới mối hàn định kì?',
                      funcHandle: () => {
                        handleSubmit(navigation, data?._id);
                      },
                    });
                  }}
                  styleContainer={tw.style('flex-1 p-1')}
                  disabled={!image_current}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>

      <ModalSelectedImage
        clickImage={clickImage}
        isEdit={isEdit}
        uri={clickImage === 'image_1' ? uri || dataImg : uri_current}
        image_picker={image_picker}
        handleChangePhoto={handleChangePhoto}
        handleChangeValue={handleChangeValue}
        dataParams={data}
        _idMayHan={_idMayHan}
      />
      <ModalViewImage
        uri={clickImage === 'image_1' ? uri || dataImg : uri_current}
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

const FormInfo = ({dataState, uri, uri_current}) => {
  const {
    image_current,
    note,
    date,
    data_image,
    month_picker,
    item_by_id,

    onCapture,
    handleChangeValue,
    monthConfirm,
    handleChangePhoto,
  } = {...dataState};

  const {colors} = useColorThemeCCDC();
  const viewShotRef = React.useRef(null);

  const {
    dataImg,
    seri_arc,
    serialNumber,
    count_arc,
    numCountHan,
    total_arc,
    total_moi_han_hien_tai,
    userUpdate,
    timeUpdate,
    statusAI,
  } = {...data_image};

  const total_moi_han_thang_truoc_do = Object?.entries(
    item_by_id?.images || {},
  )?.filter(([k, v]) => {
    return moment(date).subtract(1, 'months').format('YYYY-MM') === k;
  })?.[0]?.[1]?.total_moi_han_hien_tai;

  const result_total_mo_han = total_moi_han_thang_truoc_do
    ? (
        (total_moi_han_hien_tai || total_arc) - total_moi_han_thang_truoc_do
      ).toLocaleString()
    : 'Không có tổng số lần hàn tháng trước đó';

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
            Tháng{' '}
            <Text
              style={tw.style('italic', {
                color: colors.PRIMARY_COLOR,
              })}>
              (Chỉ xem)
            </Text>
          </Text>
        </View>
        <MonthSelect
          visible={month_picker}
          value={date}
          onChange={val => monthConfirm(val)}
          onPressDate={() => handleChangeValue('month_picker', true)}
          styleInput={tw.style(`justify-center h-[45px] mt-1`)}
          disabled
        />
      </View>
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
              borderColor: '#ccc',
            },
          )}
          activeOpacity={1}>
          {!dataImg ? (
            <FastImageCP
              uriLocal={require('../../../../../../assets/images/image_placeholder.png')}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[80px] h-[80px] min-h-[80px]')}
            />
          ) : (
            <FastImageCP
              // isImage
              uri={dataImg}
              uriError={require('../../../../../../assets/images/image_placeholder.png')}
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('clickImage', 'image_1');
                handleChangeValue('visible_image', true);
              }}
            />
          )}
          <Text
            style={tw.style('text-[14px] font-bold', {
              color: colors.PRIMARY_COLOR,
            })}
            onPress={() => {
              handleChangeValue('clickImage', 'image_1');
              handleChangeValue('image_picker', true);
            }}>
            {dataImg ? 'Cập nhật' : 'Tải lên'} hình ảnh thông tin bảo dưỡng
          </Text>
        </TouchableOpacity>
        {data_image && (
          <ViewShot
            ref={viewShotRef}
            options={{
              quality: 0.9,
            }}>
            <View
              style={tw.style(' rounded-xl p-2 shadow-md mb-3 mt-1', {
                backgroundColor: colors.BACKGROUND_CARD,
              })}>
              <View
                style={tw.style(
                  'flex-row items-center justify-between gap-1 w-full mb-2',
                )}>
                <Text
                  style={tw.style('text-[15px] font-bold', {
                    color: colors.BLACK_COLOR,
                  })}>
                  {moment(date).format('MM/YYYY')}
                </Text>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      viewShotRef?.current?.capture().then(onCapture);
                    }}
                    style={tw.style('w-full items-end justify-end')}>
                    <IconCP
                      name="download-outline"
                      size={25}
                      color={colors.PRIMARY_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <RowDialogCP
                label="Serial Number"
                leftNameIcon="ticket-outline"
                value={seri_arc || serialNumber}
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
              <RowDialogCP
                label="Số lần hàn"
                leftNameIcon="calculator-outline"
                value={Number(count_arc || numCountHan)?.toLocaleString()}
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
              <RowDialogCP
                label="Tổng số lần hàn"
                leftNameIcon="sigma"
                typeIcon={TYPE_ICON.iconMaterial}
                value={(total_arc || total_moi_han_hien_tai)?.toLocaleString()}
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
              <RowDialogCP
                label="Số mối hàn thực hiện trong tháng"
                leftNameIcon="sigma"
                typeIcon={TYPE_ICON.iconMaterial}
                value={result_total_mo_han}
                styleLabelContainer={tw.style('max-w-[150px]')}
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
              <RowDialogCP
                label="Người cập nhật"
                leftNameIcon="person-outline"
                value={userUpdate}
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
              <RowDialogCP
                label="Thời gian cập nhật"
                leftNameIcon="time-outline"
                value={moment(timeUpdate).format('DD/MM/YYYY HH:mm:ss')}
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
              <RowDialogCP
                label="Kết quả"
                styleLabel={tw`font-medium text-[13px]`}
                styleVal={tw.style('text-[13px]')}
                sizeLeftIcon={18}
                leftNameIcon="reader-outline"
                ValueCP={() => {
                  return (
                    <IconCP
                      name={statusAI ? 'checkmark-circle' : 'close-circle'}
                      size={22}
                      color={statusAI ? '#43a047' : '#ff0000'}
                      style={tw.style(`ml-1`)}
                    />
                  );
                }}
                styleRow={tw.style('py-2')}
                noBullet
                noneBorderBottom
              />
            </View>
          </ViewShot>
        )}
      </View>
      <View style={tw.style('flex-col gap-1 w-full')}>
        <View style={tw.style('flex-row gap-1 items-center flex-wrap')}>
          <View style={tw.style('flex-row gap-1 items-center mr-5')}>
            <IconCP name="image-outline" size={18} color={colors.BLACK_COLOR} />
            <Text
              style={tw.style('text-[15px] font-bold', {
                color: colors.BLACK_COLOR,
              })}>
              Tải hình ảnh lịch sử hàn gần nhất mục KẾT QUẢ HÀN{' '}
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
              borderColor: '#ccc',
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
              resizeMode="contain"
              style={tw.style('w-[300px] h-[100px] min-h-[80px]')}
              onTouchStart={() => {
                handleChangeValue('clickImage', 'image_2');
                handleChangeValue('visible_image', true);
              }}
            />
          )}
          <Text
            style={tw.style('text-[14px] font-bold text-center mx-2', {
              color: colors.PRIMARY_COLOR,
            })}
            onPress={() => {
              handleChangeValue('clickImage', 'image_2');
              handleChangeValue('image_picker', true);
            }}>
            {image_current?.uri ? 'Cập nhật' : 'Tải'} hình ảnh lịch sử hàn gần
            nhất mục KẾT QUẢ HÀN
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
  image_picker,
  clickImage,
  isEdit,
  uri,
  handleChangeValue,
  handleChangePhoto,
  dataParams,
  _idMayHan,
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
        <View style={tw`mt-3 min-h-[130px] flex-col gap-2`}>
          <ButtonCP
            iconName="image-outline"
            colorIcon={colors.BLACK_COLOR}
            titleIcon="Chọn ảnh từ thư viện"
            bgTransparent
            noneBorder
            onPress={() => {
              launchImageLibraryUtils(optionsImageLibrary, handleChangePhoto, {
                _id: isEdit ? _idMayHan : dataParams?._id,
                imageTarget: clickImage,
              });
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
              launchCameraUtils(optionsLaunchCamera, handleChangePhoto, {
                _id: isEdit ? _idMayHan : dataParams?._id,
                imageTarget: clickImage,
              });
            }}
            styleContainer={tw.style('p-2 justify-start items-start')}
          />
        </View>
      </ActionSheetCP>
    </>
  );
};

const ModalViewImage = ({uri, visible_image, handleChangeValue}) => {
  const {colors} = useColorThemeCCDC();
  return (
    <Modal transparent={true} visible={visible_image} animationType="fade">
      <ImageViewer
        imageUrls={[{url: uri}]}
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
          ) : target_condition_image === 'ket_qua_han' ? (
            <ConditionImageKetQuaHan />
          ) : null}
        </View>
      </ActionSheetCP>
    </>
  );
};
