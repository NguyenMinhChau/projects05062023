import {
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../../../../../../styles/twrnc.global';
import useAppContext from '../../../../../../utils/hooks/useAppContext';
import {IconCP} from '../../../../../../utils/icon.utils';
import {SET_DATA_PAYLOAD} from '../../../../../Context/AppContext.reducer';
import RowDialogCP from '../../../../../General/Dialog/RowDialogCP';
import {useColorThemeCCDC} from '../../config';
import {fList} from '../../../../../../utils/array.utils';
import FastImageCP from '../../../../../General/FastImageCP';
import ImageViewer from 'react-native-image-zoom-viewer';
import {BLACK_COLOR} from '../../../../../../styles/colors.global';
import React from 'react';
import NavigateService from '../../../../../routersConfig/NavigateService';
import {SCREEN_NAVIGATE} from '../../../../../routersConfig/General.config';
import {
  CONFIRM_UPLOAD_IMAGE_SERVICE_THREE,
  GET_LIST_MACHINE_DEFECT_BY_ID_THREE,
  GET_LIST_SC,
  SC_WELD_IMAGE_SERVICE,
  SC_WELD_IMAGE_SERVICE_UPDATE,
} from '../../../../../../services/toolsBotchat/CCDC/MgnMoiHan/ScreenActionThree';
import {useNotificationToast} from '../../../../../../utils/notification_toast.utils';
import DialogCP from '../../../../../General/Dialog/DialogCP';
import RenderTagCP from '../../../../../General/RenderTag';
import moment from 'moment';
import ButtonCP from '../../../../../General/ButtonCP';
import {EMPTY_CHAR} from '../../../../../../helpers/_empty';
import useDebounce from '../../../../../../utils/hooks/useDebounce';
import slugify from 'slugify';
import {useDialogConfirmToast} from '../../../../../../utils/dialog_confirm_toast.utils';
import TextInputCP from '../../../../../General/TextInputCP';
import {HOST_101_FIX_HEADER} from '@env';
import {useCssApp} from '../../../../../../utils/css.utils';

export const useMgnMoiHanActionThree = (data, _idMayHan) => {
  const [visible, setVisible] = React.useState(false);
  const [targetVisible, setTargetVisible] = React.useState(null);
  const [dataImage, setDataImage] = React.useState([]);
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    isFilter,
    search,
    pop,
    data_sc,
    from_date,
    from_date_filter,
    from_time,
    to_date,
    to_date_filter,
    month_filter,
    data_filter,
    kv_btht_sc,
    phan_tu_sc,
    nhom_ngnhan_dc,
    nguyen_nhan_dc,
    queue_sc,
    pop_name_sc,
    branch_sc,
    location_sc,
    to_time,
    ma_sc_filter,
    data_image_machine,
    data_image_machine_uploaded,
    nhom_pt_filter,
    clickImage,
    target_condition_image,
    image_current,
    image_multiple,
    image_error,
    image_serial,
    targetDateTime,
    selected_sc,
    sc_selected_fake,
    note,
    idUpdated,
    selected_item,
    image_picker,
    date_picker,
    visible_image,
    used_visible,
  } = state.set_data.mgn_moi_han_action_three;
  const {isEdit, isCreate} = state.set_data.mgn_moi_han;
  const {page, limit} = state.set_data.pagination;
  const {colors} = useColorThemeCCDC();
  const searchDebounce = useDebounce(search, 500);
  const {openNotificationToast} = useNotificationToast();
  const {shadowCss} = useCssApp();

  const {openDialogConfirmToast, updatePropsData} = useDialogConfirmToast();

  let limitPage = 10;
  const startPage = (page - 1) * limitPage + 1;
  const endPage = startPage + limitPage - 1;

  const newDateFrom = moment(from_date).format('YYYY-MM-DD');
  const newTimeFrom = moment(from_time).format('HH:mm:ss');
  const formattedDateTimeFrom = moment(
    `${newDateFrom}T${newTimeFrom}`,
  ).toISOString();
  const newDateTo = moment(to_date).format('YYYY-MM-DD');
  const newTimeTo = moment(to_time).format('HH:mm:ss');
  const formattedDateTimeTo = moment(`${newDateTo}T${newTimeTo}`).toISOString();

  const DATA_BRANCH_SC =
    data_filter?.branch?.map(item => {
      return {
        label: item,
        value: item,
      };
    }) || [];
  const DATA_LOCATION_SC =
    data_filter?.location?.map(item => {
      return {
        label: item,
        value: item,
      };
    }) || [];

  // const CallGetListFilterSC = () => {
  //   GET_LIST_FILTER_SC({
  //     state,
  //     dispatch,
  //     openNotificationToast,
  //   });
  // };

  const CallApiGetListSC = () => {
    const payload = {
      branch: branch_sc || [],
      zone: location_sc || [],
      fromDate: moment(
        formattedDateTimeFrom ||
          new Date(new Date().setDate(new Date().getDate() - 5)),
      ).format('YYYY-MM-DD HH:mm:ss'),
      toDate: moment(formattedDateTimeTo).format('YYYY-MM-DD HH:mm:ss'),
      id: idUpdated,
    };
    GET_LIST_SC({
      state,
      dispatch,
      openNotificationToast,
      page,
      limit,
      payload,
    });
  };

  const CallApiGetList = () => {
    const payload = {
      id: data?._id,
      type: 'SC_USED',
      month: moment(month_filter).format('YYYY-MM'),
    };
    if (data?._id && !isEdit && !isCreate) {
      GET_LIST_MACHINE_DEFECT_BY_ID_THREE({
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
        key: 'mgn_moi_han_action_three',
        value: {
          isLoading: false,
          search: '',
          pop: null,
          from_date: new Date(new Date().setDate(new Date().getDate() - 5)),
          from_time: new Date(),
          to_date: new Date(),
          to_time: new Date(),
          month_filter: new Date(),
          from_date_filter: new Date(
            new Date().setDate(new Date().getDate() - 5),
          ),
          kv_btht_sc: [],
          phan_tu_sc: [],
          nhom_ngnhan_dc: [],
          nguyen_nhan_dc: [],
          queue_sc: [],
          pop_name_sc: [],
          branch_sc: [],
          location_sc: [],
          to_date_filter: new Date(),
          data_image_machine_uploaded: [],
          ma_sc_filter: [],
          nhom_pt_filter: [],
          image_multiple: null,
          image_current: null,
          image_error: null,
          image_serial: null,
          note: '',
          selected_sc: [],
          clickImage: 'image_1',
          target_condition_image: null,
          targetDateTime: 'from_date',
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
        key: 'mgn_moi_han_action_three',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleSubmit = (navigation, _id, latitude, longitute) => {
    const newDateFrom = moment(from_date).format('YYYY-MM-DD');
    const newTimeFrom = moment(from_time).format('HH:mm:ss');
    const formattedDateTimeFrom = moment(
      `${newDateFrom}T${newTimeFrom}`,
    ).toISOString();
    const newDateTo = moment(to_date).format('YYYY-MM-DD');
    const newTimeTo = moment(to_time).format('HH:mm:ss');
    const formattedDateTimeTo = moment(
      `${newDateTo}T${newTimeTo}`,
    ).toISOString();
    const formData = new FormData();
    formData.append('id', _id);
    const sc = selected_sc?.map(item => item?.TicketCode)?.join(', ');
    formData.append('maSC', sc);
    formData.append('explain', note);
    formData.append('note', note);
    formData.append('latitute', latitude?.toString());
    formData.append('longitute', longitute?.toString());
    formData.append(
      'fromDate',
      moment(formattedDateTimeFrom).format('YYYY-MM-DD HH:mm:ss'),
    );
    formData.append(
      'toDate',
      moment(formattedDateTimeTo).format('YYYY-MM-DD HH:mm:ss'),
    );
    formData.append('date', moment(from_date).format('YYYY-MM-DD'));
    formData.append('imgMtn', image_current ? image_current : null);
    formData.append('imgLatestWelding', image_error ? image_error : null);
    SC_WELD_IMAGE_SERVICE({
      state,
      dispatch,
      openNotificationToast,
      payload: formData,
      handleReset,
      navigation,
      CallApiGetList,
    });
  };

  const handleUpdate = (navigation, _id, latitude, longitute) => {
    const newDateFrom = moment(from_date).format('YYYY-MM-DD');
    const newTimeFrom = moment(from_time).format('HH:mm:ss');
    const formattedDateTimeFrom = moment(
      `${newDateFrom}T${newTimeFrom}`,
    ).toISOString();
    const newDateTo = moment(to_date).format('YYYY-MM-DD');
    const newTimeTo = moment(to_time).format('HH:mm:ss');
    const formattedDateTimeTo = moment(
      `${newDateTo}T${newTimeTo}`,
    ).toISOString();
    const formData = new FormData();
    formData.append('id', _id);
    formData.append('idMayHan', _idMayHan);
    const sc = selected_sc?.map(item => item?.TicketCode)?.join(', ');
    formData.append('maSC', sc);
    formData.append('explain', note);
    formData.append('note', note);
    formData.append('latitute', latitude?.toString());
    formData.append('longitute', longitute?.toString());
    formData.append(
      'fromDate',
      moment(formattedDateTimeFrom).format('YYYY-MM-DD HH:mm:ss'),
    );
    formData.append(
      'toDate',
      moment(formattedDateTimeTo).format('YYYY-MM-DD HH:mm:ss'),
    );
    formData.append('date', moment(from_date).format('YYYY-MM-DD'));

    formData.append('imgMtn', image_current?.name ? image_current : null);
    formData.append('imgLatestWelding', image_error?.name ? image_error : null);
    SC_WELD_IMAGE_SERVICE_UPDATE({
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
      type: 'SC_USED',
      confirmation: type_confirm,
      rejectNote: note,
    };
    const payloadConfirm = {
      id: _id,
      type: 'SC_USED',
      confirmation: type_confirm,
      confirmNote: note,
    };
    CONFIRM_UPLOAD_IMAGE_SERVICE_THREE({
      state,
      dispatch,
      openNotificationToast,
      payload: type_confirm === 'OK' ? payloadConfirm : payloadReject,
    });
    CallApiGetList();
  };

  const dateConfirm = (name, date) => {
    if (date) {
      handleChangeValue(name, date);
    }
    handleChangeValue('date_picker', false);
  };

  const dateFilterConfirm = (key, date) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_three',
        value: {
          [key]: date,
          date_picker: false,
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
          key: 'mgn_moi_han_action_three',
          value: {
            [clickImage === 'image_1'
              ? isEdit
                ? 'data_image_machine_uploaded'
                : 'image_multiple'
              : clickImage === 'image_3'
              ? 'image_current'
              : 'image_error']:
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

  const handleSelectSC = sc => {
    if (sc) {
      let selected = [...sc_selected_fake];
      const index = fList(selected)?.findIndex(
        item => item?.TicketCode === sc?.TicketCode,
      );
      if (index === -1) {
        selected?.push(sc);
      } else {
        selected?.splice(index, 1);
      }
      handleChangeValue('sc_selected_fake', selected);
    }
  };

  const checkSelectedSC = sc => {
    const index = fList(sc_selected_fake).findIndex(
      item => item?.TicketCode === sc?.TicketCode,
    );
    return index !== -1;
  };

  const checkAllSC = () => {
    return sc_selected_fake?.length === data_sc?.length;
  };

  const handleSelectAllSC = () => {
    if (checkAllSC()) {
      handleChangeValue('sc_selected_fake', []);
    } else {
      handleChangeValue('sc_selected_fake', data_sc);
    }
  };

  const RenderItemSC = ({item, index}) => {
    const {
      TicketCode,
      Title,
      IssueGroup,
      Issue,
      ReasonName,
      ReasonDetailName,
      CreatedDate,
    } = {
      ...item,
    };

    return (
      <>
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            handleSelectSC(item);
          }}
          style={tw.style(
            `rounded-xl p-3 pt-1 border  min-h-[190px] relative`,
            {
              backgroundColor: checkSelectedSC(item)
                ? '#2563eb1A'
                : colors.BACKGROUND_CARD,
              borderColor: checkSelectedSC(item) ? '#2563eb' : 'transparent',
              ...shadowCss({
                elevation: checkSelectedSC(item) ? 0 : 3,
              }),
            },
          )}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSelectSC(item);
            }}
            style={tw.style(
              'w-full absolute z-50 h-full bg-transparent',
            )}></TouchableOpacity>
          <View style={tw.style('flex-col flex-1')}>
            <View
              style={tw.style(
                'w-full flex-row justify-between items-center mb-2',
              )}>
              <View style={tw.style('flex-row gap-1 items-center')}>
                <IconCP
                  name="bookmark-outline"
                  size={16}
                  color={colors.BLACK_COLOR}
                />
                <Text
                  style={tw.style('font-bold text-[15px]', {
                    color: colors.BLACK_COLOR,
                  })}>
                  {TicketCode || EMPTY_CHAR}
                </Text>
              </View>
              <View style={tw.style('items-end')}>
                <IconCP
                  name={
                    checkSelectedSC(item)
                      ? 'checkbox-outline'
                      : 'square-outline'
                  }
                  size={20}
                  color={
                    checkSelectedSC(item)
                      ? colors.PRIMARY_COLOR
                      : colors.BLACK_COLOR
                  }
                />
              </View>
            </View>
            {Title && (
              <RowDialogCP
                leftNameIcon="chatbox-ellipses-outline"
                sizeLeftIcon={15}
                label="Tiêu đề"
                value={Title}
                styleRow={tw.style('py-1 px-0 mt-0')}
                noBullet
                noneBorderBottom
              />
            )}
            <RowDialogCP
              leftNameIcon="contract-outline"
              sizeLeftIcon={15}
              label="Nhóm phần tử"
              value={IssueGroup}
              styleRow={tw.style('py-1 px-0 mt-0')}
              noBullet
              noneBorderBottom
            />
            <RowDialogCP
              leftNameIcon="hardware-chip-outline"
              sizeLeftIcon={15}
              label="Phần tử"
              value={Issue}
              styleRow={tw.style('py-1 px-0 mt-0')}
              noBullet
              noneBorderBottom
            />
            <RowDialogCP
              leftNameIcon="warning-outline"
              sizeLeftIcon={15}
              label="Nguyên nhân"
              value={ReasonName}
              styleRow={tw.style('py-1 px-0 mt-0')}
              noBullet
              noneBorderBottom
            />
            <RowDialogCP
              leftNameIcon="reader-outline"
              sizeLeftIcon={15}
              label="Nguyên nhân CT"
              value={ReasonDetailName}
              styleRow={tw.style('py-1 px-0 mt-0')}
              noBullet
              noneBorderBottom
            />
            <RowDialogCP
              leftNameIcon="time-outline"
              sizeLeftIcon={15}
              label="TG tạo ticket"
              value={CreatedDate}
              styleRow={tw.style('py-1 px-0 mt-0')}
              noBullet
              noneBorderBottom
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const handleClickEdit = item => {
    const {explain, note, fromDate, toDate, incidentId, image} = {
      ...item,
    };
    const {latestWelding, maintanenceInfo} = {...image};
    const imageMaintance = maintanenceInfo?.includes(`${HOST_101_FIX_HEADER}`)
      ? maintanenceInfo
      : `${HOST_101_FIX_HEADER}/ql-ccdc/get-image/${maintanenceInfo}`;
    const imagelatestWelding = latestWelding?.includes(`${HOST_101_FIX_HEADER}`)
      ? latestWelding
      : `${HOST_101_FIX_HEADER}/ql-ccdc/get-image/${latestWelding}`;
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han_action_three',
        value: {
          note: note || explain,
          from_date: moment(new Date(fromDate)).subtract(7, 'hours').toDate(),
          to_date: moment(new Date(toDate)).subtract(7, 'hours').toDate(),
          from_time: new Date(fromDate),
          to_time: new Date(toDate),
          selected_sc: incidentId.map(item => {
            return {TicketCode: item};
          }),
          image_current: {
            uri: imageMaintance,
          },
          image_error: {
            uri: imagelatestWelding,
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
      incidentId,
      userConfirmed,
    } = {
      ...item,
    };
    const {latestWelding, maintanenceInfo} = {...image};
    const imageMaintance = maintanenceInfo?.includes(`${HOST_101_FIX_HEADER}`)
      ? maintanenceInfo
      : `${HOST_101_FIX_HEADER}/ql-ccdc/get-image/${maintanenceInfo}`;
    const imagelatestWelding = latestWelding?.includes(`${HOST_101_FIX_HEADER}`)
      ? latestWelding
      : `${HOST_101_FIX_HEADER}/ql-ccdc/get-image/${latestWelding}`;
    const arrayImage = [imageMaintance, imagelatestWelding];
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
              uri={imageMaintance}
              uriLocal={require('../../../../../../assets/images/click-here.png')}
              uriError={require('../../../../../../assets/images/click-here.png')}
              resizeMode="cover"
              onTouchStart={() => {
                setDataImage(arrayImage);
              }}
            />
            {fList(arrayImage)?.length > 0 && (
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
                  {fList(arrayImage)?.length} ảnh
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
                        SCREEN_NAVIGATE.Mgn_Moi_Han_Action_Three_Screen,
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
                <RowDialogCP
                  label="Danh sách SC"
                  ValueCP={() => {
                    return (
                      <View style={tw.style('flex-row items-center')}>
                        {incidentId?.slice(0, 1)?.map((item, index) => {
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
                        {incidentId?.length - 1 > 0 && (
                          <Text
                            style={tw.style('text-[10px] font-bold', {
                              color: colors.BLACK_COLOR,
                            })}>
                            {incidentId?.slice(0, 1).length > 0 && ','} +
                            {incidentId?.length - 1}
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
                    Danh sách SC
                  </Text>
                  <View style={tw.style('flex-row gap-2 flex-wrap')}>
                    {targetVisible?.incidentId?.length > 0 ? (
                      targetVisible?.incidentId?.map((item, index) => {
                        return <RenderTagCP key={index} tag={item} />;
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
                    Thời gian tạo ticket
                  </Text>
                  <Text
                    style={tw.style('text-[16px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Từ{' '}
                    {moment(targetVisible?.fromDate).format(
                      'DD/MM/YYYY HH:mm:ss',
                    )}
                  </Text>
                  <Text
                    style={tw.style('text-[16px] leading-6', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Đến{' '}
                    {moment(targetVisible?.toDate).format(
                      'DD/MM/YYYY HH:mm:ss',
                    )}
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
                      Lý do reject thông tin XLSC
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
                      Ghi chú xác nhận thông tin XLSC
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
                  titleIcon="Xác nhận thông tin XLSC"
                  colorBorder="#2f994e"
                  colorBG="#2f994e"
                  onPress={() => {
                    setVisible(false);
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận thông tin XLSC',
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
                            placeholder="Vui lòng nhập lý do xác nhận thông tin XLSC..."
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
                  titleIcon="Reject thông tin XLSC"
                  colorBorder="#ff0000"
                  colorBG="#ff0000"
                  onPress={() => {
                    setVisible(false);
                    openDialogConfirmToast({
                      title: 'Thông báo xác nhận reject thông tin XLSC',
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
                            placeholder="Vui lòng nhập lý do reject thông tin XLSC..."
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

  let DATA_LIST_SC = fList(data_sc)?.filter((item, index) => {
    if (index + 1 >= startPage && index + 1 <= endPage) {
      return true;
    }
  });

  let DATA_SEARCH_LIST_SC = [];

  if (searchDebounce) {
    DATA_SEARCH_LIST_SC = fList(data_sc).filter(item => {
      const {
        TicketCode,
        Title,
        IssueGroup,
        Issue,
        ReasonName,
        ReasonDetailName,
        CreatedDate,
      } = {
        ...item,
      };
      const str = `${TicketCode} ${Title} ${IssueGroup} ${Issue} ${ReasonName} ${ReasonDetailName}`;
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
        moment(CreatedDate)
          .format('DD/MM/YYYY HH:mm:ss')
          .includes(slugifySearch)
      );
    });
  }

  let DATA_SEARCH_LIST_SC_PAGINATION = DATA_SEARCH_LIST_SC?.filter(
    (item, index) => {
      if (index + 1 >= startPage && index + 1 <= endPage) {
        return true;
      }
    },
  );

  const DATA_SC = searchDebounce
    ? DATA_SEARCH_LIST_SC_PAGINATION
    : DATA_LIST_SC;

  const LENGTH_SC = Math.ceil(
    (searchDebounce ? DATA_SEARCH_LIST_SC?.length : data_sc?.length) /
      limitPage,
  );

  return {
    isLoading,
    isFilter,
    isEdit,
    search,
    pop,
    searchDebounce,
    limitPage,
    startPage,
    endPage,
    data_sc,
    from_date,
    formattedDateTimeFrom,
    formattedDateTimeTo,
    from_date_filter,
    data_image_machine,
    data_image_machine_uploaded,
    from_time,
    to_date,
    nhom_pt_filter,
    to_date_filter,
    month_filter,
    to_time,
    image_current,
    image_multiple,
    image_error,
    image_serial,
    note,
    clickImage,
    target_condition_image,
    selected_sc,
    sc_selected_fake,
    idUpdated,
    selected_item,
    image_picker,
    date_picker,
    visible_image,
    used_visible,
    targetDateTime,
    DATA_SEARCH,
    ma_sc_filter,
    kv_btht_sc,
    phan_tu_sc,
    nhom_ngnhan_dc,
    nguyen_nhan_dc,
    queue_sc,
    pop_name_sc,
    branch_sc,
    location_sc,
    DATA_SC,
    LENGTH_SC,
    DATA_NHOM_PHAN_TU_SC: [],
    DATA_NHOM_NGUYEN_NHAN_SC: [],
    DATA_KVBTHT: [],
    DATA_PHAN_TU: [],
    DATA_BRANCH_SC: DATA_BRANCH_SC.filter(x => x?.value),
    DATA_LOCATION_SC: DATA_LOCATION_SC.filter(x => x?.value),

    RenderItemSC,
    handleChangeValue,
    handleReset,
    handleSubmit,
    handleUpdate,
    handleSelectSC,
    checkSelectedSC,
    dateConfirm,
    handleChangePhoto,
    checkAllSC,
    handleSelectAllSC,
    RenderItemHistory,
    CallApiGetList,
    dateFilterConfirm,
    CallApiGetListSC,
  };
};
