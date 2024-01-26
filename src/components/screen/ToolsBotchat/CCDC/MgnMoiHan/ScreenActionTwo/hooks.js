import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {handleDownloadRemoteImage} from '../../../../../../utils/cameraRoll.utils';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import {useColorThemeCCDC} from '../../config';
import FastImageCP from '../../../../../General/FastImageCP';
import tw from '../../../../../../styles/twrnc.global';
import {IconCP} from '../../../../../../utils/icon.utils';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import NavigateService from '../../../../../routersConfig/NavigateService';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import {
  CONFIRM_UPLOAD_IMAGE_SERVICE_TWO,
  GET_LIST_MACHINE_DEFECT_BY_ID_TWO,
  MACHINE_DEFECT_SERVICE,
  MACHINE_DEFECT_SERVICE_UPDATE,
} from '../../../../../../services/toolsBotchat/CCDC/MgnMoiHan/ScreenActionTwo';
import moment from 'moment';
import RenderTagCP from '../../../../../General/RenderTag';
import DialogCP from '../../../../../General/Dialog/DialogCP';
import TextInputCP from '../../../../../General/TextInputCP';
import ButtonCP from '../../../../../General/ButtonCP';
import {fList} from '../../../../../../utils/array.utils';
import useDebounce from '../../../../../../utils/hooks/useDebounce';
import slugify from 'slugify';
import {EMPTY_CHAR} from '../../../../../../helpers/_empty';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import {useCssApp} from '../../../../../../utils/css.utils';

export const useMgnMoiHanActionTwo = (data, _idMayHan) => {
  const [visible, setVisible] = React.useState(false);
  const [targetVisible, setTargetVisible] = React.useState(null);
  const [dataImage, setDataImage] = React.useState([]);
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    isFilter,
    search,
    type_machine,
    data_image_machine,
    data_image_machine_uploaded,
    date_update,
    from_date_filter,
    to_date_filter,
    month_filter,
    date_maintance,
    image_maintance,
    image_current,
    image_serial,
    image_error,
    image_target_link,
    info_error,
    detail_info_error,
    clickImage,
    target_condition_image,
    note,
    note_reject,
    idUpdated,
    selected_item,
    date_picker,
    image_picker,
    visible_image,
    used_visible,
  } = state.set_data.mgn_moi_han_action_two;
  const {isEdit, isCreate} = state.set_data.mgn_moi_han;
  const {currentUser} = state.set_data;
  const {fullName, email} = {
    ...currentUser,
  };

  const {colors} = useColorThemeCCDC();
  const {shadowCss} = useCssApp();

  const {openNotificationToast} = useNotificationToast();
  const {openDialogConfirmToast, updatePropsData} = useDialogConfirmToast();
  const searchDebounce = useDebounce(search, 500);

  const CallApiGetList = () => {
    const payload = {
      id: data?._id,
      type: 'DEFECT',
      month: moment(month_filter).format('YYYY-MM'),
    };
    if (data?._id && !isEdit && !isCreate) {
      GET_LIST_MACHINE_DEFECT_BY_ID_TWO({
        state,
        dispatch,
        openNotificationToast,
        payload,
      });
    }
  };

  React.useEffect(() => {
    CallApiGetList();
  }, []);

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_two',
        value: {
          isLoading: false,
          isEdited: false,
          search: '',
          date_update: new Date(),
          date_maintance: new Date(),
          from_date_filter: new Date(
            new Date().setDate(new Date().getDate() - 7),
          ),
          to_date_filter: new Date(),
          month_filter: new Date(),
          data_image_machine_uploaded: [],
          image_maintance: null,
          image_current: null,
          image_error: null, // multiple
          image_serial: null,
          image_target_link: '',
          clickImage: 'image_1',
          target_condition_image: null,
          note: '',
          info_error: '',
          detail_info_error: '',
          idUpdated: null,
          selected_item: null,
          date_picker: false,
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
        key: 'mgn_moi_han_action_two',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const dateMaintanceConfirm = date => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_two',
        value: {
          date_maintance: date,
          date_picker: false,
        },
      }),
    );
  };

  const dateFilterConfirm = (key, date) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_two',
        value: {
          [key]: date,
          date_picker: false,
        },
      }),
    );
  };

  const handleChangePhoto = (response, other) => {
    const {clickImage} = {...other};
    if (response) {
      const payload = {
        ...response?.assets?.[0],
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName || `image_${Date.now()}`,
        type: response?.assets?.[0]?.type,
      };
      const payloadMultiple = response?.assets?.map(item => ({
        ...item,
        uri: item?.uri,
        name: item?.fileName || `image_${Date.now()}`,
        type: item?.type,
      }));
      const dataImageMachineUploaded = fList(data_image_machine_uploaded).map(
        item => {
          return {uri: item?.uri || item};
        },
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'mgn_moi_han_action_two',
          value: {
            [clickImage === 'image_1'
              ? isEdit
                ? 'data_image_machine_uploaded'
                : 'image_error'
              : clickImage === 'image_4'
              ? 'image_serial'
              : 'image_maintance']:
              clickImage === 'image_3' || clickImage === 'image_4'
                ? payload
                : [
                    ...fList(isEdit ? dataImageMachineUploaded : image_error),
                    ...payloadMultiple,
                  ],
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

  const handleSubmit = (navigation, _id) => {
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('causes', info_error);
    formData.append('explain', detail_info_error);
    formData.append('note', note);
    formData.append('date', moment(date_maintance).format('YYYY-MM-DD'));
    const DATA_IMAGE_ERROR = [
      ...(fList(isEdit ? data_image_machine_uploaded : image_error)?.length > 0
        ? [
            ...fList(isEdit ? data_image_machine_uploaded : image_error)?.map(
              item => {
                return item;
              },
            ),
          ]
        : []),
    ];
    fList(DATA_IMAGE_ERROR).forEach(item => {
      formData.append('imgDefects', item);
    });
    formData.append('imgSeri', image_serial ? image_serial : null);
    formData.append('imgMtn', image_maintance ? image_maintance : null);
    MACHINE_DEFECT_SERVICE({
      state,
      dispatch,
      openNotificationToast,
      payload: formData,
      handleReset,
      navigation,
      CallApiGetList,
    });
  };

  const handleUpdate = (navigation, _id) => {
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('idMayHan', _idMayHan);
    formData.append('causes', info_error);
    formData.append('explain', detail_info_error);
    formData.append('note', note);
    formData.append('date', moment(date_maintance).format('YYYY-MM-DD'));
    const DATA_IMAGE_ERROR = [
      ...(fList(isEdit ? data_image_machine_uploaded : image_error)?.length > 0
        ? [
            ...fList(isEdit ? data_image_machine_uploaded : image_error)?.map(
              item => {
                return item;
              },
            ),
          ]
        : []),
    ];
    fList(DATA_IMAGE_ERROR).forEach(item => {
      formData.append('imgDefects', item);
    });
    formData.append('imgSeri', image_serial?.name ? image_serial : null);
    formData.append('imgMtn', image_maintance?.name ? image_maintance : null);

    MACHINE_DEFECT_SERVICE_UPDATE({
      state,
      dispatch,
      openNotificationToast,
      payload: formData,
      handleReset,
      navigation,
      CallApiGetList,
    });
  };

  const handleConfirmImage = (_id, type_confirm, note) => {
    const payloadReject = {
      id: _id,
      type: 'DEFECT',
      confirmation: type_confirm,
      rejectNote: note,
    };
    const payloadConfirm = {
      id: _id,
      type: 'DEFECT',
      confirmation: type_confirm,
      confirmNote: note,
    };
    CONFIRM_UPLOAD_IMAGE_SERVICE_TWO({
      state,
      dispatch,
      openNotificationToast,
      payload: type_confirm === 'OK' ? payloadConfirm : payloadReject,
    });
    CallApiGetList();
  };

  const handleClickEdit = item => {
    const {
      createdAt,
      causes,
      explain,
      timestamps,
      note: noteEdit,
      image,
    } = {
      ...item,
    };
    const {maintanenceInfo, serial, defects} = {...image};
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_two',
        value: {
          note: noteEdit,
          date_maintance: timestamps?.date
            ? new Date(timestamps?.date)
            : new Date(createdAt),
          info_error: causes,
          detail_info_error: explain,
          data_image_machine_uploaded: defects,
          image_serial: {
            uri: serial,
          },
          image_maintance: {
            uri: maintanenceInfo,
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

  const RenderItemHistory = ({item, index}) => {
    const {
      _id,
      createdAt,
      userCreated,
      lastUpdated, // cập nhật
      confirmAt, // cập nhật kiếm soát
      userUpdate,
      isConfirmed,
      timestamps,
      image,
      userConfirmed,
    } = {
      ...item,
    };
    const {maintanenceInfo, serial, defects} = {...image};
    const imageArray = [maintanenceInfo, serial, ...defects];
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
              uri={maintanenceInfo}
              uriLocal={require('../../../../../../assets/images/click-here.png')}
              uriError={require('../../../../../../assets/images/click-here.png')}
              resizeMode="cover"
              onTouchStart={() => {
                setDataImage(imageArray);
              }}
            />
            {fList(imageArray)?.length > 0 && (
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
                  {fList(imageArray)?.length} ảnh
                </Text>
              </View>
            )}
            <View
              style={tw.style('flex-1 flex-col justify-start items-start p-1')}>
              <View
                style={tw.style('w-full flex-row justify-end items-center')}>
                {isConfirmed === 'WAITING' && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handleClickEdit(item);
                      NavigateService.navigate(
                        SCREEN_NAVIGATE.Mgn_Moi_Han_Action_Two_Screen,
                        {
                          data: item,
                          _idMayHan: data?._id,
                        },
                      );
                    }}
                    style={tw.style('')}>
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
                onPress={() => {
                  setVisible(true);
                  setTargetVisible(item);
                }}
                style={tw.style('w-full flex-col relative')}>
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
                  label="Người tạo"
                  value={userCreated}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Ngày tạo"
                  value={moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                {lastUpdated && (
                  <RowDialogCP
                    label="Cập nhật cuối"
                    value={moment(lastUpdated).format('DD/MM/YYYY HH:mm:ss')}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                )}
                {confirmAt && userConfirmed && (
                  <RowDialogCP
                    label="Ngày kiểm soát"
                    value={moment(confirmAt).format('DD/MM/YYYY HH:mm:ss')}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                )}
                {userUpdate && (
                  <RowDialogCP
                    label="Người cập nhật"
                    value={userUpdate}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                )}
                <RowDialogCP
                  label="TG gửi BHSC"
                  value={
                    timestamps?.date
                      ? moment(timestamps?.date).format('DD/MM/YYYY')
                      : EMPTY_CHAR
                  }
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                {userConfirmed && (
                  <RowDialogCP
                    label="Người kiểm soát"
                    value={userConfirmed}
                    styleRow={tw.style('py-1 px-0 mt-0')}
                    styleLabel={tw.style('text-[10px]')}
                    styleVal={tw.style('text-[10px]')}
                    noBullet
                    noneBorderBottom
                  />
                )}
                <RowDialogCP
                  label="Trạng thái"
                  ValueCP={() => {
                    return (
                      <RenderTagCP
                        tag={isConfirmed}
                        textReplace={
                          isConfirmed === 'WAITING'
                            ? 'Chưa xác nhận'
                            : isConfirmed === 'OK'
                            ? 'Đã xác nhận'
                            : 'Bị từ chối'
                        }
                        iconName={
                          isConfirmed === 'WAITING'
                            ? 'time-outline'
                            : isConfirmed === 'OK'
                            ? 'checkmark-done-circle-outline'
                            : 'close-circle-outline'
                        }
                        colorIcon="#fff"
                        sizeIcon={13}
                        styleText={tw.style('text-white text-[10px]')}
                      />
                    );
                  }}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* MODAL VIEW IMAGE */}
        <Modal
          transparent={true}
          visible={fList(dataImage)?.length > 0 ? true : false}
          animationType="fade">
          <ImageViewer
            imageUrls={fList(dataImage)?.map(item => {
              return {url: item};
            })}
            enableSwipeDown={true}
            onSwipeDown={() => setDataImage([])}
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
                  onPress={() => setDataImage([])}
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
        {/* MODAL DETAIL */}
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
                    Nguyên nhân lỗi
                  </Text>
                  <Text
                    style={tw.style('text-[16px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {targetVisible?.causes || 'Không có nguyên nhân lỗi'}
                  </Text>
                </View>
                <View style={tw.style('flex-col mb-2')}>
                  <Text
                    style={tw.style('text-[14px] mb-2', {
                      color: colors.PRIMARY_COLOR,
                    })}>
                    Mô tả lỗi
                  </Text>
                  <Text
                    style={tw.style('text-[16px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {targetVisible?.explain || 'Không có mô tả lỗi'}
                  </Text>
                </View>
                <View style={tw.style('flex-col mb-2')}>
                  <Text
                    style={tw.style('text-[14px] mb-2', {
                      color: colors.PRIMARY_COLOR,
                    })}>
                    Ghi chú
                  </Text>
                  <Text
                    style={tw.style('text-[16px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {targetVisible?.note || 'Không có ghi chú'}
                  </Text>
                </View>
                {targetVisible?.rejectNote && (
                  <View style={tw.style('flex-col mb-2')}>
                    <Text
                      style={tw.style('text-[14px] mb-2', {
                        color: colors.PRIMARY_COLOR,
                      })}>
                      Lý do reject sửa chữa
                    </Text>
                    <Text
                      style={tw.style('text-[16px] leading-6', {
                        color: colors.BLACK_COLOR,
                      })}>
                      {targetVisible?.rejectNote || 'Không có lý do'}
                    </Text>
                  </View>
                )}
                {targetVisible?.confirmNote && (
                  <View style={tw.style('flex-col mb-2')}>
                    <Text
                      style={tw.style('text-[14px] mb-2', {
                        color: colors.PRIMARY_COLOR,
                      })}>
                      Ghi chú xác nhận sửa chữa
                    </Text>
                    <Text
                      style={tw.style('text-[16px] leading-6', {
                        color: colors.BLACK_COLOR,
                      })}>
                      {targetVisible?.confirmNote || 'Không có ghi chú'}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
            {targetVisible?.isConfirmed === 'WAITING' && (
              <View style={tw`flex flex-row flex-wrap justify-end gap-2 mt-2`}>
                <ButtonCP
                  iconName="checkmark-done-circle-outline"
                  colorIcon="#ffff"
                  sizeIcon={16}
                  styleText={tw.style('text-[10px]')}
                  titleIcon="Xác nhận sửa chữa"
                  colorBorder="#2f994e"
                  colorBG="#2f994e"
                  onPress={() => {
                    setVisible(false);
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận sửa chữa',
                      funcHandle: propsData => {
                        const {note} = {...propsData};
                        if (note) {
                          handleConfirmImage(targetVisible?._id, 'OK', note);
                          return true;
                        }
                      },
                      propsData: {note: ''},
                      MessageCustom: () => {
                        return (
                          <TextInputCP
                            placeholder="Vui lòng nhập lý do xác nhận sửa chữa..."
                            multiline={true}
                            onChange={val => {
                              updatePropsData({note: val});
                            }}
                            style={tw`h-[150px] w-full`}
                            contentStyle={tw`p-2`}
                            outlinedStyle={tw`border border-gray-400`}
                          />
                        );
                      },
                    });
                  }}
                  styleContainer={tw.style('p-1 w-full')}
                />
                <ButtonCP
                  iconName="close-circle-outline"
                  colorIcon="#ffff"
                  sizeIcon={16}
                  styleText={tw.style('text-[10px]')}
                  titleIcon="Reject sửa chữa"
                  colorBorder="#ff0000"
                  colorBG="#ff0000"
                  onPress={() => {
                    setVisible(false);
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận reject sửa chữa',
                      funcHandle: propsData => {
                        const {note} = {...propsData};
                        if (note) {
                          handleConfirmImage(
                            targetVisible?._id,
                            'REJECT',
                            note,
                          );
                          return true;
                        }
                      },
                      propsData: {note: ''},
                      MessageCustom: () => {
                        return (
                          <TextInputCP
                            placeholder="Vui lòng nhập lý do reject sửa chữa..."
                            multiline={true}
                            onChange={val => {
                              updatePropsData({note: val});
                            }}
                            style={tw`h-[150px] w-full`}
                            contentStyle={tw`p-2`}
                            outlinedStyle={tw`border border-gray-400`}
                          />
                        );
                      },
                    });
                  }}
                  styleContainer={tw.style('p-1 w-full')}
                />
              </View>
            )}
          </View>
        </DialogCP>
      </View>
    );
  };

  let DATA_SEARCH = data_image_machine;
  if (searchDebounce) {
    DATA_SEARCH = DATA_SEARCH.filter(item => {
      const {
        isConfirmed,
        userCreated,
        explain,
        causes,
        createdAt,
        lastUpdated,
        updatedAt,
      } = {...item};
      const str = `${isConfirmed} ${userCreated} ${explain} ${causes}`;
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
        moment(createdAt).format('DD/MM/YYYY').includes(slugifySearch) ||
        moment(lastUpdated).format('DD/MM/YYYY').includes(slugifySearch) ||
        moment(updatedAt).format('DD/MM/YYYY').includes(slugifySearch)
      );
    });
  }

  return {
    isLoading,
    isFilter,
    isEdit,
    search,
    type_machine,
    data_image_machine,
    data_image_machine_uploaded,
    date_update,
    from_date_filter,
    to_date_filter,
    month_filter,
    date_maintance,
    image_maintance,
    image_current,
    clickImage,
    target_condition_image,
    image_serial,
    image_error,
    info_error,
    detail_info_error,
    note,
    note_reject,
    idUpdated,
    selected_item,
    date_picker,
    image_picker,
    visible_image,
    used_visible,
    fullName,
    email,
    DATA_SEARCH,
    image_target_link,

    handleChangeValue,
    handleReset,
    handleChangePhoto,
    handleSubmit,
    handleUpdate,
    handleDownLoadTemplate,
    dateMaintanceConfirm,
    dateFilterConfirm,
    RenderItemHistory,
    handleClickEdit,
    CallApiGetList,
  };
};
