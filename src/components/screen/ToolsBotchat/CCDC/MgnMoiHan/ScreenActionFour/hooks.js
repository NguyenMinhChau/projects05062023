import React from 'react';
import {handleDownloadRemoteImage} from '../../../../../../utils/cameraRoll.utils';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../../General/NotificationToast';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImageCP from '../../../../../General/FastImageCP';
import {IconCP} from '../../../../../../utils/icon.utils';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import ImageViewer from 'react-native-image-zoom-viewer';
import tw from '../../../../../../styles/twrnc.global';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import {useColorThemeCCDC} from '../../config';
import NavigateService from '../../../../../routersConfig/NavigateService';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import {
  CONFIRM_UPLOAD_IMAGE_SERVICE_FOUR,
  GET_LIST_MACHINE_DEFECT_BY_ID_FOUR,
  PLAN_WELD_IMAGE_SERVICE,
  PLAN_WELD_IMAGE_SERVICE_UPDATE,
} from '../../../../../../services/toolsBotchat/CCDC/MgnMoiHan/ScreenActionFour';
import useDebounce from '../../../../../../utils/hooks/useDebounce';
import slugify from 'slugify';
import moment from 'moment';
import ButtonCP from '../../../../../General/ButtonCP';
import DialogCP from '../../../../../General/Dialog/DialogCP';
import {fList} from '../../../../../../utils/array.utils';
import RenderTagCP from '../../../../../General/RenderTag';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import TextInputCP from '../../../../../General/TextInputCP';
import {useCssApp} from '../../../../../../utils/css.utils';

export const useMgnMoiHanActionFour = (data, _idMayHan) => {
  const [visible, setVisible] = React.useState(false);
  const [targetVisible, setTargetVisible] = React.useState(null);
  const [dataImage, setDataImage] = React.useState([]);
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    isFilter,
    search,
    date_picker,
    ma_ke_hoach,
    from_date_filter,
    to_date_filter,
    month_filter,
    image,
    image_multiple,
    image_current,
    data_image_machine,
    data_image_machine_uploaded,
    image_target_link,
    note,
    clickImage,
    target_condition_image,
    idUpdated,
    selected_item,
    image_picker,
    visible_image,
    used_visible,
  } = state.set_data.mgn_moi_han_action_four;
  const {isEdit, isCreate} = state.set_data.mgn_moi_han;
  const {colors} = useColorThemeCCDC();
  const {shadowCss} = useCssApp();

  const {openNotificationToast} = useNotificationToast();
  const {openDialogConfirmToast, updatePropsData} = useDialogConfirmToast();
  const searchDebounce = useDebounce(search, 500);

  const CallApiGetList = () => {
    const payload = {
      id: data?._id,
      type: 'PLAN_USED',
      month: moment(month_filter).format('YYYY-MM'),
    };
    if (data?._id && !isEdit && !isCreate) {
      GET_LIST_MACHINE_DEFECT_BY_ID_FOUR({
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
        key: 'mgn_moi_han_action_four',
        value: {
          isLoading: false,
          date_picker: false,
          search: '',
          from_date_filter: new Date(
            new Date().setDate(new Date().getDate() - 7),
          ),
          to_date_filter: new Date(),
          month_filter: new Date(),
          ma_ke_hoach: null,
          data_image_machine_uploaded: [],
          image: null,
          image_multiple: null,
          image_current: null,
          image_target_link: '',
          clickImage: 'image_1',
          target_condition_image: null,
          note: '',
          idUpdated: null,
          selected_item: null,
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

  const dateFilterConfirm = (key, date) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_four',
        value: {
          [key]: date,
          date_picker: false,
        },
      }),
    );
  };

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_four',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleChangePhoto = async response => {
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
          key: 'mgn_moi_han_action_four',
          value: {
            [clickImage === 'image_1'
              ? isEdit
                ? 'data_image_machine_uploaded'
                : 'image_multiple'
              : clickImage === 'image_2'
              ? 'image'
              : 'image_current']:
              clickImage === 'image_1'
                ? [
                    ...fList(
                      isEdit ? dataImageMachineUploaded : image_multiple,
                    ),
                    ...payloadMultiple,
                  ]
                : payload,
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
    const textPlanCode = ma_ke_hoach
      ?.split('\n')
      ?.map(item => item?.trim())
      ?.join(',');
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('planCode', textPlanCode);
    formData.append('explain', note);
    formData.append('note', note);
    formData.append('date', moment().format('YYYY-MM-DD'));
    const DATA_IMAGE = [
      ...(image_current ? [image_current] : []),
      ...(image ? [image] : []),
    ];
    fList(DATA_IMAGE).forEach(item => {
      formData.append('imageFiles', item);
    });
    PLAN_WELD_IMAGE_SERVICE({
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
    const textPlanCode = ma_ke_hoach
      ?.split('\n')
      ?.map(item => item.trim())
      ?.join(',');
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('idMayHan', _idMayHan);
    formData.append('planCode', textPlanCode);
    formData.append('explain', note);
    formData.append('note', note);
    formData.append('date', moment().format('YYYY-MM-DD'));
    const DATA_IMAGE = [
      ...(image_current ? [image_current] : []),
      ...(image ? [image] : []),
    ];
    fList(DATA_IMAGE).forEach(item => {
      formData.append('imageFiles', item);
    });
    PLAN_WELD_IMAGE_SERVICE_UPDATE({
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
      type: 'PLAN_USED',
      confirmation: type_confirm,
      rejectNote: note,
    };
    const payloadConfirm = {
      id: _id,
      type: 'PLAN_USED',
      confirmation: type_confirm,
      confirmNote: note,
    };
    CONFIRM_UPLOAD_IMAGE_SERVICE_FOUR({
      state,
      dispatch,
      openNotificationToast,
      payload: type_confirm === 'OK' ? payloadConfirm : payloadReject,
    });
    CallApiGetList();
  };

  const checkMaKeHoach = ma_ke_hoach => {
    if (ma_ke_hoach) {
      const arr = ma_ke_hoach?.split(',');
      const regex =
        /^[A-Z]{3}.I.[NUMDIRTSH]{1}.[PP|PB|PM|BD|UA|IZ|EZ|RS|RC|RA|FA|CA|DS|OL|CR|SA|SB|PD|AQ|MD|MQ|MF|OD|CB|DP|FO|TI|MH|AS|RA|TT|EP]{2}.[0-9]{6}.[0-9]{2,}$/;
      return arr?.every(item => {
        return regex.test(item?.trim());
      });
    }
    return true;
  };

  const handleClickEdit = item => {
    const {explain, planCode, image} = {
      ...item,
    };

    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_four',
        value: {
          note: explain,
          ma_ke_hoach: planCode,
          data_image_machine_uploaded: image,
          image_current: {
            uri: image?.[0],
          },
          image: {
            uri: image?.[1],
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
      image,
      planCode,
      userConfirmed,
    } = {
      ...item,
    };
    const imageCurrent = image?.[1];
    const planCodeArr = planCode?.split(',')?.map(item => {
      return item?.trim();
    });
    const planCodeArrTarget = targetVisible?.planCode?.split(',')?.map(item => {
      return item?.trim();
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
              uri={imageCurrent}
              uriLocal={require('../../../../../../assets/images/click-here.png')}
              uriError={require('../../../../../../assets/images/click-here.png')}
              resizeMode="cover"
              onTouchStart={() => {
                setDataImage(fList(image)?.reverse());
              }}
            />
            {fList(image)?.length > 0 && (
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
                  {fList(image)?.length} ảnh
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
                        SCREEN_NAVIGATE.Mgn_Moi_Han_Action_Four_Screen,
                        {
                          data: item,
                          _idMayHan: data?._id,
                        },
                      );
                    }}>
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
                {/* <RowDialogCP
                  label="TG gửi TKNC"
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
                /> */}

                <RowDialogCP
                  label="Mã KH"
                  ValueCP={() => {
                    return (
                      <View style={tw.style('flex-row items-center')}>
                        {planCodeArr?.slice(0, 1)?.map((item, index) => {
                          return (
                            <Text
                              key={index}
                              style={tw.style('text-[10px] font-bold', {
                                color: colors.BLACK_COLOR,
                              })}>
                              {item}
                            </Text>
                          );
                        })}

                        {planCodeArr?.length - 1 > 0 && (
                          <Text
                            style={tw.style('text-[10px] font-bold', {
                              color: colors.BLACK_COLOR,
                            })}>
                            {planCodeArr?.slice(0, 1).length > 0 && ','} +
                            {planCodeArr?.length - 1}
                          </Text>
                        )}
                      </View>
                    );
                  }}
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
                    style={tw.style('text-[14px] mb-2', {
                      color: colors.PRIMARY_COLOR,
                    })}>
                    Danh sách mã KH
                  </Text>
                  <View style={tw.style('flex-row gap-1 flex-wrap')}>
                    {planCodeArrTarget?.length > 0 ? (
                      planCodeArrTarget?.map((item, index) => {
                        return (
                          <RenderTagCP
                            key={index}
                            tag={item}
                            styleText={tw.style('text-[10px]')}
                          />
                        );
                      })
                    ) : (
                      <Text
                        style={tw.style('text-[16px] leading-6', {
                          color: colors.BLACK_COLOR,
                        })}>
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
                      Lý do reject thông tin TKNC
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
                      Ghi chú xác nhận thông tin TKNC
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
                  titleIcon="Xác nhận thông tin TKNC"
                  colorBorder="#2f994e"
                  colorBG="#2f994e"
                  onPress={() => {
                    setVisible(false);
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận thông tin TKNC',
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
                            placeholder="Vui lòng nhập lý do xác nhận thông tin TKNC..."
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
                  titleIcon="Reject thông tin TKNC"
                  colorBorder="#ff0000"
                  colorBG="#ff0000"
                  onPress={() => {
                    setVisible(false);
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận',
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
                            placeholder="Vui lòng nhập lý do reject thông tin TKNC..."
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
    from_date_filter,
    to_date_filter,
    ma_ke_hoach,
    image,
    image_multiple,
    month_filter,
    data_image_machine,
    data_image_machine_uploaded,
    image_current,
    image_target_link,
    note,
    clickImage,
    target_condition_image,
    idUpdated,
    selected_item,
    image_picker,
    visible_image,
    used_visible,
    date_picker,
    DATA_SEARCH,

    handleChangeValue,
    handleReset,
    handleChangePhoto,
    handleDownLoadTemplate,
    handleSubmit,
    handleUpdate,
    checkMaKeHoach,
    RenderItemHistory,
    CallApiGetList,
    dateFilterConfirm,
  };
};
