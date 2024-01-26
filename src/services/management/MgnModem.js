import {SET_DATA_PAYLOAD} from '../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../components/General/NotificationToast';
import {axios101Post} from '../../utils/axios/axiosInstance';
import {errorMessage} from '../jwt';

const startFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'mgn_modem',
      value: {
        isLoading: true,
      },
    }),
  );
};
const endFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'mgn_modem',
      value: {
        isLoading: false,
      },
    }),
  );
};

export const GET_FILTER_MODEM = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload} = {...props};
  try {
    const resPostAdapter = await axios101Post(
      'cpe/device/filter/adapter',
      payload,
    );
    const resPostAntenna = await axios101Post(
      'cpe/device/filter/antenna',
      payload,
    );
    // const resPostBwBps = await axios101Post(
    //   'cpe/device/filter/BW_bps',
    //   payload,
    // );
    // const resPostCPU = await axios101Post('cpe/device/filter/CPU', payload);
    // const resPostCurrentFirmware = await axios101Post(
    //   'cpe/device/filter/currentFirmware',
    //   payload,
    // );
    // const resPostDimension = await axios101Post(
    //   'cpe/device/filter/dimension',
    //   payload,
    // );
    // const resPostEasyMeshR2 = await axios101Post(
    //   'cpe/device/filter/easyMeshR2',
    //   payload,
    // );
    // const resPostFlash = await axios101Post('cpe/device/filter/flash', payload);
    // const resPostHiFPTAppSupported = await axios101Post(
    //   'cpe/device/filter/hiFPTAppSupported',
    //   payload,
    // );
    // const resPostIc2400MHz = await axios101Post(
    //   'cpe/device/filter/ic2400MHz',
    //   payload,
    // );
    // const resPostIc5000MHz = await axios101Post(
    //   'cpe/device/filter/ic5000MHz',
    //   payload,
    // );
    // const resPostInterface = await axios101Post(
    //   'cpe/device/filter/interface',
    //   payload,
    // );
    // const resPostKernelVersion = await axios101Post(
    //   'cpe/device/filter/kernelVersion',
    //   payload,
    // );
    // const resPostMIMO = await axios101Post('cpe/device/filter/MIMO', payload);
    // const resPostModel = await axios101Post('cpe/device/filter/model', payload);
    // const resPostNatSession = await axios101Post(
    //   'cpe/device/filter/natSession',
    //   payload,
    // );
    // const resPostPa2400MHz = await axios101Post(
    //   'cpe/device/filter/pa2400MHz',
    //   payload,
    // );
    // const resPostPa5000MHz = await axios101Post(
    //   'cpe/device/filter/pa5000MHz',
    //   payload,
    // );
    // const resPostRAM = await axios101Post('cpe/device/filter/RAM', payload);
    // const resPostRebootTimerFunc = await axios101Post(
    //   'cpe/device/filter/rebootTimerFunc',
    //   payload,
    // );
    // const resPostTxPower = await axios101Post(
    //   'cpe/device/filter/txPower',
    //   payload,
    // );
    // const resPostType = await axios101Post('cpe/device/filter/type', payload);
    // const resPostWifiSupported = await axios101Post(
    //   'cpe/device/filter/wifiSupported',
    //   payload,
    // );
    // const resPostWifiTimerFunc = await axios101Post(
    //   'cpe/device/filter/wifiTimerFunc',
    //   payload,
    // );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_modem',
        value: {
          data_filter: {
            adapter: resPostAdapter?.payload,
            antenna: resPostAntenna?.payload,
            // BW_bps: resPostBwBps?.payload,
            // CPU: resPostCPU?.payload,
            // currentFirmware: resPostCurrentFirmware?.payload,
            // dimension: resPostDimension?.payload,
            // easyMeshR2: resPostEasyMeshR2?.payload,
            // flash: resPostFlash?.payload,
            // hiFPTAppSupported: resPostHiFPTAppSupported?.payload,
            // ic2400MHz: resPostIc2400MHz?.payload,
            // ic5000MHz: resPostIc5000MHz?.payload,
            // interface_filter: resPostInterface?.payload,
            // kernelVersion: resPostKernelVersion?.payload,
            // MIMO: resPostMIMO?.payload,
            // model: resPostModel?.payload,
            // natSession: resPostNatSession?.payload,
            // pa2400MHz: resPostPa2400MHz?.payload,
            // pa5000MHz: resPostPa5000MHz?.payload,
            // RAM: resPostRAM?.payload,
            // rebootTimerFunc: resPostRebootTimerFunc?.payload,
            // txPower: resPostTxPower?.payload,
            // type: resPostType?.payload,
            // wifiSupported: resPostWifiSupported?.payload,
            // wifiTimerFunc: resPostWifiTimerFunc?.payload,
          },
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

export const GET_LIST_MODEM = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, page, limit} = {
    ...props,
  };
  startFunc(dispatch);
  try {
    const resPost = await axios101Post(
      `cpe/device/list?page=${page}&limit=${limit}`,
      payload,
    );
    endFunc(dispatch);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_modem',
        value: {
          list_modem: resPost,
        },
      }),
    );
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    endFunc(dispatch);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
