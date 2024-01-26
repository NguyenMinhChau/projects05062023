import React from 'react';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import {handleDownloadRemoteImage} from '../../../../../../utils/cameraRoll.utils';
import NavigateService from '../../../../../routersConfig/NavigateService';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useColorThemeCCDC} from '../../config';
import tw from '../../../../../../styles/twrnc.global';
import FastImageCP from '../../../../../General/FastImageCP';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import {IconCP} from '../../../../../../utils/icon.utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import moment from 'moment';
import {
  CREATE_MAY_HAN_DINH_KI_SERVICE,
  GET_MAY_HAN_BY_ID,
  IMPORT_IMAGE_MAY_HAN_AI_DETECTED,
  UPDATE_MAY_HAN_DINH_KI_SERVICE,
} from '../../../../../../services/toolsBotchat/CCDC/MgnMoiHan/ScreenActionOne';
import {EMPTY_CHAR} from '../../../../../../helpers/_empty';
import slugify from 'slugify';
import useDebounce from '../../../../../../utils/hooks/useDebounce';
import {downloadFileLocal} from '../../../../../../utils/file.utils';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import ButtonCP from '../../../../../General/ButtonCP';
import {fList} from '../../../../../../utils/array.utils';
import DialogCP from '../../../../../General/Dialog/DialogCP';
import {useCssApp} from '../../../../../../utils/css.utils';

export const useMgnMoiHanActionOne = (data, _idMayHan) => {
  const [urlImage, setUrlImage] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [targetVisible, setTargetVisible] = React.useState(null);
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    search,
    date,
    image,
    image_current,
    image_current_update,
    clickImage,
    target_condition_image,
    note,
    note_update,
    data_image,
    idUpdated,
    selected_item,
    item_by_id,
    month_picker,
    visible_image,
    image_picker,
    used_visible,
  } = state.set_data.mgn_moi_han_action_one;
  const {isEdit, isCreate} = state.set_data.mgn_moi_han;
  const {colors} = useColorThemeCCDC();
  const {shadowCss} = useCssApp();

  const CallApiGetById = () => {
    if (data?._id && !isEdit && !isCreate) {
      GET_MAY_HAN_BY_ID({
        state,
        dispatch,
        openNotificationToast,
        id: data?._id,
      });
    }
  };

  React.useEffect(() => {
    CallApiGetById();
  }, []);

  const searchDebounce = useDebounce(search, 500);
  const {dataLog, images} = {...item_by_id};
  const {total_moi_han_hien_tai, ...rest} = {
    ...data,
    logFileImages: item_by_id?.logFileImages || {},
  };

  let DATA_IMAGES = Object?.entries(images || {}).map(([key, value]) => {
    return {
      ...value,
      ...rest,
      month: key,
    };
  });

  if (searchDebounce) {
    DATA_IMAGES = DATA_IMAGES.filter(item => {
      const {
        serial,
        month,
        serialNumber,
        userUpdate,
        loai_may,
        model,
        nameDevice,
        timeUpdate,
        tinh_trang,
      } = {...item};
      const str = `${serial} ${serialNumber} ${userUpdate} ${loai_may} ${model} ${nameDevice} ${tinh_trang}`;
      const slugifyItem = slugify(str, {
        replacement: '',
        strict: false,
        remove: /[*+~.()'"!:@-]/g,
        lower: true,
        locale: 'vi',
        trim: true,
      });
      const slugifySearch = slugify(searchDebounce, {
        replacement: ' ',
        strict: false,
        remove: /[*+~.()'"!:@-]/g,
        lower: true,
        locale: 'vi',
        trim: true,
      })
        ?.replace(/-/g, ' ')
        ?.replace(/\s+/g, '');
      const regex = new RegExp(slugifySearch.replace(/\\/g, ''));
      return (
        regex.test(slugifyItem) ||
        moment(timeUpdate).format('DD/MM/YYYY').includes(slugifySearch) ||
        moment(month).format('MM/YYYY').includes(slugifySearch)
      );
    });
  }

  const {openNotificationToast} = useNotificationToast();
  const {openDialogConfirmToast} = useDialogConfirmToast();

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_one',
        value: {
          isLoading: false,
          isEdit: false,
          search: '',
          date: new Date(),
          image: null,
          image_current: null,
          clickImage: 'image_1',
          target_condition_image: null,
          note: '',
          data_image: null,
          idUpdated: null,
          selected_item: null,
          month_picker: false,
          image_picker: false,
          visible_image: false,
          used_visible: false,
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          isEdit: false,
          isCreate: false,
        },
      }),
    );
  };

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_one',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const monthConfirm = date => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_one',
        value: {
          date: date,
          month_picker: false,
        },
      }),
    );
  };

  const detectedImage = (_id, payloadImage) => {
    const formData = new FormData();
    formData.append('imageFile', payloadImage);
    formData.append('month', moment(date).format('YYYY-MM'));
    formData.append('id', _id);
    IMPORT_IMAGE_MAY_HAN_AI_DETECTED({
      state,
      dispatch,
      openNotificationToast,
      payload: formData,
      isEdit,
    });
  };

  const handleChangePhoto = async (response, other) => {
    const {_id, imageTarget} = {...other};
    if (response) {
      const payload = {
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName || `image_${Date.now()}`,
        type: response?.assets?.[0]?.type,
      };
      if (imageTarget === 'image_1') {
        openDialogConfirmToast({
          title: 'Thông báo',
          message: 'Bạn có muốn xác nhận ảnh này?',
          funcHandle: () => {
            detectedImage(_id, payload);
          },
        });
      }
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'mgn_moi_han_action_one',
          value: {
            [imageTarget === 'image_1' ? 'image' : 'image_current']: payload,
            image_picker: false,
          },
        }),
      );
    }
  };

  const handleDownLoadTemplate = url => {
    handleDownloadRemoteImage(
      url,
      () => {
        handleChangeValue('isLoading', true);
      },
      () => {
        handleChangeValue('isLoading', false);
      },
      () => {
        openNotificationToast({
          title: 'Thông báo',
          message: 'Tải hình ảnh thành công',
          type: TYPE_NOTIFICATION.SUCCESS,
        });
      },
      () => {
        openNotificationToast({
          title: 'Thông báo',
          message: 'Tải hình ảnh thất bại',
          type: TYPE_NOTIFICATION.ERROR,
        });
      },
    );
  };

  const handleSubmit = async (navigation, _id) => {
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('note', note);
    formData.append('month', moment().format('YYYY-MM'));
    formData.append('imageFiles', image_current);
    await CREATE_MAY_HAN_DINH_KI_SERVICE({
      state,
      dispatch,
      openNotificationToast,
      payload: formData,
      handleReset,
      navigation,
    });
    CallApiGetById();
  };

  const handleUpdate = async (navigation, _id) => {
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('note', note);
    formData.append('month', moment().format('YYYY-MM'));
    formData.append('imageFiles', image_current?.name ? image_current : null);
    await UPDATE_MAY_HAN_DINH_KI_SERVICE({
      state,
      dispatch,
      openNotificationToast,
      payload: formData,
      handleReset,
      navigation,
    });
    CallApiGetById();
  };

  const handleClickEdit = item => {
    const imageLogFile = Object.entries(item?.logFileImages || {})?.find(
      ([key, value]) => {
        return moment(item?.month).format('YYYY-MM') === key;
      },
    )?.[1]?.image;
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_one',
        value: {
          data_image: item,
          date: new Date(item?.month),
          note: Object.entries(item?.logFileImages || {})?.[0]?.[1]?.note,
          note_update: Object.entries(item?.logFileImages || {})?.[0]?.[1]
            ?.note,
          image_current: {
            uri: imageLogFile,
          },
          image_current_update: {
            uri: imageLogFile,
          },
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          isEdit: true,
          isCreate: false,
        },
      }),
    );
  };

  const checkMonthCurrent = month => {
    const monthCurrent = moment().format('YYYY-MM');
    const monthItem = moment(month).format('YYYY-MM');
    return monthCurrent === monthItem ? true : false;
  };

  const checkMonthCurrentInList = list => {
    const monthCurrent = moment().format('YYYY-MM');
    return list?.some(item => {
      const monthItem = moment(item?.month).format('YYYY-MM');
      return monthCurrent === monthItem;
    });
  };

  const RenderItemHistory = ({item, index}) => {
    const {
      _id,
      month,
      dataImg,
      numCountHan,
      serialNumber,
      timeUpdate,
      total_moi_han_hien_tai,
      nameDevice,
      timeCreate,
    } = {...item};

    const {images} = {...item_by_id};

    const total_moi_han_thang_truoc_do = DATA_IMAGES?.filter(x => {
      return moment(month).subtract(1, 'months').format('YYYY-MM') === x?.month;
    })?.[0]?.total_moi_han_hien_tai;

    const result_total_mo_han = total_moi_han_thang_truoc_do
      ? (total_moi_han_hien_tai - total_moi_han_thang_truoc_do).toLocaleString()
      : 'Không có dữ liệu tháng trước đó';

    const imageLogFile = Object.entries(item?.logFileImages || {})?.find(
      ([key, value]) => {
        return moment(month).format('YYYY-MM') === key;
      },
    )?.[1]?.image;

    const timeUpdateLogFile = Object.entries(item?.logFileImages || {})?.find(
      ([key, value]) => {
        return moment(month).format('YYYY-MM') === key;
      },
    )?.[1]?.lastUpdated;

    const userUpdateDetectImg = Object.entries(images || {})?.find(
      ([key, value]) => {
        return moment(month).format('YYYY-MM') === key;
      },
    )?.[1]?.userUpdate;

    const userCreateDetectImg = Object.entries(images || {})?.find(
      ([key, value]) => {
        return moment(month).format('YYYY-MM') === key;
      },
    )?.[1]?.userCreate;

    const DATA_IMAGE_LIST = fList([dataImg, imageLogFile]).filter(x => {
      return x;
    });

    return (
      <View
        style={tw.style(
          'flex-1 rounded-lg overflow-hidden border border-blue-300',
          {
            backgroundColor: colors.BACKGROUND_CARD,
            //...shadowCss(),
          },
        )}
        key={index}>
        <View style={tw.style('flex-1 flex-col')}>
          <View style={tw.style('flex-1 flex-row relative')}>
            <FastImageCP
              // isImage
              uri={dataImg}
              uriLocal={require('../../../../../../assets/images/no_data.png')}
              uriError={require('../../../../../../assets/images/no_data.png')}
              resizeMode="cover"
              onTouchStart={() => {
                setUrlImage(DATA_IMAGE_LIST);
              }}
            />
            {DATA_IMAGE_LIST?.length > 0 && (
              <View
                style={tw.style(
                  'absolute top-0 left-0 items-center justify-center p-1 min-w-[30px] rounded-br-lg',
                  {
                    backgroundColor: '#ccc',
                  },
                )}>
                <Text
                  style={tw.style('text-[10px] font-bold', {
                    color: colors.PRIMARY_COLOR,
                  })}>
                  {DATA_IMAGE_LIST?.length} ảnh
                </Text>
              </View>
            )}
            <View
              style={tw.style('flex-1 flex-col justify-start items-start p-1')}>
              <View
                style={tw.style(
                  'w-full flex-row justify-between items-center',
                )}>
                <Text
                  style={tw.style('font-bold text-[11px]', {
                    color: colors.PRIMARY_COLOR,
                  })}>
                  {nameDevice || EMPTY_CHAR}
                </Text>
                {checkMonthCurrent(month) && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handleClickEdit(item);
                      NavigateService.navigate(
                        SCREEN_NAVIGATE.Mgn_Moi_Han_Action_One_Screen,
                        {
                          data: item,
                          _idMayHan: data?._id,
                        },
                      );
                    }}
                    style={tw.style('items-end')}>
                    <IconCP
                      name="create-outline"
                      size={22}
                      color={colors.PRIMARY_COLOR}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={tw.style('w-full flex-col relative')}
                onPress={() => {
                  setVisible(true);
                  setTargetVisible(item);
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setVisible(true);
                    setTargetVisible(item);
                  }}
                  style={tw.style(
                    'w-full absolute z-50 h-full bg-transparent',
                  )}></TouchableOpacity>
                <RowDialogCP
                  label="Serial number"
                  value={serialNumber}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Tháng"
                  value={moment(month).format('MM/YYYY')}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Số lần hàn"
                  value={numCountHan?.toLocaleString()}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Tổng số mối hàn hiện tại"
                  value={total_moi_han_hien_tai?.toLocaleString()}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Số mối hàn trong tháng"
                  value={result_total_mo_han}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                {userCreateDetectImg && (
                  <RowDialogCP
                    label="Người tạo"
                    value={userCreateDetectImg}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                )}
                {userUpdateDetectImg && (
                  <RowDialogCP
                    label="Người cập nhật"
                    value={userUpdateDetectImg}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                )}
                <RowDialogCP
                  label="Thời gian tạo"
                  value={moment(timeCreate).format('DD/MM/YYYY HH:mm:ss')}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Cập nhật cuối"
                  value={moment(timeUpdate).format('DD/MM/YYYY HH:mm:ss')}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          visible={urlImage?.length > 0 ? true : false}
          animationType="fade">
          <ImageViewer
            imageUrls={urlImage?.map(item => {
              return {
                url: item,
              };
            })}
            enableSwipeDown={true}
            onSwipeDown={() => setUrlImage([])}
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
                  <ActivityIndicator
                    size="small"
                    color={colors.PRIMARY_COLOR}
                  />
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
                  onPress={() => setUrlImage(null)}
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
        <DialogCP
          visible={visible && targetVisible?._id === _id}
          setVisible={setVisible}
          styleDialog={tw`mx-10`}
          title="Xem chi tiết">
          <View
            style={tw.style(`p-4 rounded-md w-full`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <View style={tw.style('max-h-[350px]')}>
              <ScrollView>
                <View style={tw.style('flex-col mb-2')}>
                  <Text
                    style={tw.style('text-[14px] mb-1', {
                      color: colors.PRIMARY_COLOR,
                    })}>
                    Ghi chú
                  </Text>
                  <Text
                    style={tw.style('text-[16px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {Object.entries(
                      targetVisible?.logFileImages || {},
                    )?.[0]?.[1]?.note || 'Không có ghi chú'}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </DialogCP>
      </View>
    );
  };

  const onCapture = React.useCallback(uri => {
    downloadFileLocal(
      uri,
      `Moi_han_thang_${moment(date).format('MM-YYYY')}`,
      'png',
      () => handleChangeValue('isLoading', true),
      () => handleChangeValue('isLoading', false),
      () =>
        openNotificationToast({
          title: 'Thông báo',
          message: 'Tải hình ảnh thành công',
          type: TYPE_NOTIFICATION.SUCCESS,
        }),
      () =>
        openNotificationToast({
          title: 'Thông báo',
          message: 'Tải hình ảnh thất bại',
          type: TYPE_NOTIFICATION.ERROR,
        }),
    );
  }, []);

  return {
    isLoading,
    isEdit,
    search,
    date,
    image,
    image_current,
    image_current_update,
    note,
    note_update,
    data_image,
    idUpdated,
    selected_item,
    item_by_id,
    month_picker,
    visible_image,
    image_picker,
    used_visible,
    clickImage,
    DATA_IMAGES,
    target_condition_image,

    onCapture,
    monthConfirm,
    detectedImage,
    handleChangeValue,
    handleChangePhoto,
    handleReset,
    handleSubmit,
    handleUpdate,
    handleDownLoadTemplate,
    RenderItemHistory,
    CallApiGetById,
    checkMonthCurrentInList,
  };
};
