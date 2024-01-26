import React from 'react';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../../Context/AppContext.reducer';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {useColorThemeMgnModem} from './config';
import FastImageCP from '../../../General/FastImageCP';
import NavigateService from '../../../routersConfig/NavigateService';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';
import useDebounce from '../../../../utils/hooks/useDebounce';
import {
  GET_FILTER_MODEM,
  GET_LIST_MODEM,
} from '../../../../services/management/MgnModem';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import moment from 'moment';
import {IconCP, TYPE_ICON} from '../../../../utils/icon.utils';
import {useCssApp} from '../../../../utils/css.utils';
import {fList} from '../../../../utils/array.utils';

export const useMgnModem = () => {
  const {state, dispatch} = useAppContext();
  const {
    isLoading,
    isFilter,
    content,
    search,
    list_modem,
    data_filter,
    adapter,
    antenna,
    BW_bps,
    CPU,
    currentFirmware,
    dimension,
    easyMeshR2,
    flash,
    hiFPTAppSupported,
    ic2400MHz,
    ic5000MHz,
    interface_filter,
    kernelVersion,
    MIMO,
    model,
    natSession,
    pa2400MHz,
    pa5000MHz,
    picture,
    RAM,
    rebootTimerFunc,
    txPower,
    type,
    wifiSupported,
    wifiTimerFunc,
  } = state.set_data.mgn_modem;
  const {modal_add_edit} = state.set_toggle.mgn_modem;
  const {page, limit} = state.set_data.pagination;
  const {colors} = useColorThemeMgnModem();
  const {shadowCss} = useCssApp();

  const {openNotificationToast} = useNotificationToast();

  const screenWidth = Dimensions.get('window').width;
  const widthEventUsed = screenWidth / 2 - 8 * 2;

  const [isView, setIsView] = React.useState('view_2');
  const searchDebounce = useDebounce(search, 500);

  const payload = {
    adapter: adapter,
    antenna: antenna,
    BW_bps: BW_bps,
    CPU: CPU,
    currentFirmware: currentFirmware,
    dimension: dimension,
    easyMeshR2: easyMeshR2,
    flash: flash,
    hiFPTAppSupported: hiFPTAppSupported,
    ic2400MHz: ic2400MHz,
    ic5000MHz: ic5000MHz,
    interface: interface_filter,
    kernelVersion: kernelVersion,
    MIMO: MIMO,
    model: model,
    natSession: natSession,
    pa2400MHz: pa2400MHz,
    pa5000MHz: pa5000MHz,
    picture: picture,
    RAM: RAM,
    rebootTimerFunc: rebootTimerFunc,
    txPower: txPower,
    type: type,
    wifiSupported: wifiSupported,
    wifiTimerFunc: wifiTimerFunc,
    keyword: searchDebounce,
  };

  const CallApiFilter = () => {
    GET_FILTER_MODEM({
      state,
      dispatch,
      openNotificationToast,
      payload: payload,
    });
  };

  const CallApiGetList = () => {
    GET_LIST_MODEM({
      state,
      dispatch,
      openNotificationToast,
      payload: payload,
      page,
      limit,
    });
  };

  const handleBack = () => {
    dispatch(SET_DATA_PAYLOAD({
      key: 'pagination',
      value: {
        page: 1,
        limit: 10,
      }
    }))
  }

  React.useEffect(() => {
    // CallApiFilter();
    CallApiGetList();
  }, [searchDebounce, page, limit]);

  const handleReset = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_modem',
        value: {
          search: '',
          adapter: [],
          antenna: [],
          BW_bps: [],
          CPU: [],
          currentFirmware: [],
          dimension: [],
          easyMeshR2: [],
          flash: [],
          hiFPTAppSupported: [],
          ic2400MHz: [],
          ic5000MHz: [],
          interface_filter: [],
          kernelVersion: [],
          MIMO: [],
          model: [],
          natSession: [],
          pa2400MHz: [],
          pa5000MHz: [],
          picture: [],
          RAM: [],
          rebootTimerFunc: [],
          txPower: [],
          type: [],
          wifiSupported: [],
          wifiTimerFunc: [],
        },
      }),
    );
  };

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_modem',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleChangeToggle = (key, value) => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'device_customer',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const RenderDeviceItem = ({item, index}) => {
    const classedView =
      isView === 'view_1'
        ? {
            width: screenWidth - 24,
            marginBottom: 10,
            flexDirection: 'row',
          }
        : {
            width: widthEventUsed,
            marginLeft: index % 2 === 0 ? 0 : 10,
            marginBottom: 10,
            flexDirection: 'column',
          };
    const {picture, model, modelCode, editor, createAt, carousel} = {...item};
    return (
      <>
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            NavigateService?.navigate(SCREEN_NAVIGATE.Mgn_Modem_Detail_Screen, {
              data: {...item, dataImages: fList(carousel)},
            });
          }}
          style={tw.style(`rounded-xl gap-2 items-center overflow-hidden border border-blue-300`, {
            backgroundColor: colors.BACKGROUND_CARD,
            ...classedView,
          })}>
          <View
            style={tw.style('h-[130px] overflow-hidden', {
              width: isView === 'view_1' ? screenWidth / 3 : '100%',
            })}>
            <FastImageCP
              uri={picture}
              uriError={require('../../../../assets/images/no_data.png')}
              resizeMode="cover"
              style={tw.style('w-full h-full')}
              onTouchStart={() => {
                NavigateService?.navigate(SCREEN_NAVIGATE.Mgn_Modem_Detail_Screen, {
                  data: {...item, dataImages: fList(carousel)},
                });
              }}
            />
          </View>
          <View style={tw.style('w-full flex-1 p-1 flex-col')}>
            {/* <Text
              style={tw.style('text-[14px] font-bold leading-5', {
                color: colors.BLACK_COLOR,
              })}
              numberOfLines={2}>
              Thiết bị Switch Huawei S5720-28X-PWR-LI-AC
            </Text> */}
            <View style={tw.style('mt-0')}>
              {model && (
                <Text
                  style={tw.style('text-[12px] leading-5', {
                    color: colors.BLACK_COLOR,
                  })}
                  numberOfLines={2}>
                  <Text style={tw.style('font-bold')}>
                    <IconCP
                      name="application-brackets-outline"
                      size={13}
                      color={colors.BLACK_COLOR}
                      typeIcon={TYPE_ICON.iconMaterial}
                    />{' '}
                    Model:
                  </Text>{' '}
                  {model}
                </Text>
              )}
              {modelCode && (
                <Text
                  style={tw.style('text-[12px] leading-5', {
                    color: colors.BLACK_COLOR,
                  })}
                  numberOfLines={2}>
                  <Text style={tw.style('font-bold')}>
                    <IconCP
                      name="application-brackets-outline"
                      size={13}
                      color={colors.BLACK_COLOR}
                      typeIcon={TYPE_ICON.iconMaterial}
                    />{' '}
                    Model Code:
                  </Text>{' '}
                  {modelCode}
                </Text>
              )}
              {createAt && (
                <Text
                  style={tw.style('text-[12px] leading-5', {
                    color: colors.BLACK_COLOR,
                  })}
                  numberOfLines={2}>
                  <Text style={tw.style('font-bold')}>
                    <IconCP
                      name="calendar-clock-outline"
                      size={13}
                      color={colors.BLACK_COLOR}
                      typeIcon={TYPE_ICON.iconMaterial}
                    />{' '}
                    Ngày tạo:
                  </Text>{' '}
                  {moment(createAt)
                    .subtract(7, 'hours')
                    .format('DD/MM/YYYY HH:mm:ss')}
                </Text>
              )}
              {editor && (
                <Text
                  style={tw.style('text-[12px] leading-5', {
                    color: colors.BLACK_COLOR,
                  })}
                  numberOfLines={2}>
                  <Text style={tw.style('font-bold')}>
                    <IconCP
                      name="account-circle-outline"
                      size={13}
                      color={colors.BLACK_COLOR}
                      typeIcon={TYPE_ICON.iconMaterial}
                    />{' '}
                    Cập nhật:
                  </Text>{' '}
                  {editor}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const totalPage = list_modem?.total_page || 0;
  const dataModem = list_modem?.payload || [];

  return {
    isLoading,
    isFilter,
    content,
    search,
    modal_add_edit,
    isView,
    totalPage,
    dataModem,

    handleBack,
    setIsView,
    handleReset,
    handleChangeValue,
    handleChangeToggle,
    RenderDeviceItem,
    CallApiGetList,
  };
};
