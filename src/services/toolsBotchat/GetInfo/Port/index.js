import axios from 'axios';
import {SET_DATA_PAYLOAD} from '../../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../../components/General/NotificationToast';
import {fList} from '../../../../utils/array.utils';
import {URL_101, axios101Post} from '../../../../utils/axios/axiosInstance';
import {
  getAsyncCacheAccessTokenKEY,
  getAsyncCacheTokenSecurityKEY,
} from '../../../../utils/cache.services';
import {errorMessage} from '../../../jwt';
import {ToastShow} from '../../../../utils/Toast';
import {TYPE_TOAST} from '../../../../utils/toast.config';

const startFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'tools_chat',
      value: {
        isLoading: true,
      },
    }),
  );
};
const endFunc = dispatch => {
  return dispatch(
    SET_DATA_PAYLOAD({
      key: 'tools_chat',
      value: {
        isLoading: false,
      },
    }),
  );
};

// THÔNG TIN MODULE QUANG
export const GET_INFO_TRANSCEIVER = async (props = {}) => {
  const {
    state,
    dispatch,
    pop_name,
    name_dev,
    port,
    port_crc,
    transceiver,
    openNotificationToast,
  } = props;
  startFunc(dispatch);
  try {
    const resPost = await axios101Post(
      'tool-system/botchat/transceiver-module',
      {
        popName: pop_name,
        nameDev: name_dev,
        port: port,
        portCRC: port_crc,
        transceiver: transceiver,
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          isLoading: false,
          result_botChat: resPost?.payload,
        },
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      duration: 10000,

      props: {
        message: `Lấy thông tin module quang thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: `Lấy thông tin module quang thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
    //   type: TYPE_NOTIFICATION.SUCCESS,
    // });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    ToastShow({
      type: TYPE_TOAST.ERROR,
      duration: 10000,

      props: {
        message: msg,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: msg,
    //   type: TYPE_NOTIFICATION.ERROR,
    // });
    endFunc(dispatch);
  }
};
// THÔNG TIN KHG PORT PON
export const GET_INFO_KHG_PORT_PON = async (props = {}) => {
  const {state, dispatch, name_dev, port, openNotificationToast} = props;
  startFunc(dispatch);
  try {
    const resPost = await axios101Post('tool-system/botchat/customer-of-pon', {
      nameDev: name_dev,
      port: port,
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_chat',
        value: {
          isLoading: false,
          result_botChat: resPost?.payload,
        },
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      duration: 10000,

      props: {
        message: `Lấy thông tin KHG port PON thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: `Lấy thông tin KHG port PON thành công. Với ${resPost?.payload?.length} tập dữ liệu!`,
    //   type: TYPE_NOTIFICATION.SUCCESS,
    // });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    ToastShow({
      type: TYPE_TOAST.ERROR,
      duration: 10000,

      props: {
        message: msg,
      },
    });
    // openNotificationToast({
    //   title: 'Thông báo',
    //   message: msg,
    //   type: TYPE_NOTIFICATION.ERROR,
    // });
    endFunc(dispatch);
  }
};

export const GET_FILTER_PORT_TRANS_AND_CUS_OF_PON = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, setIsVisibleOption} =
    {...props};
  const {popName, nameDev, branch, province, zone, area} = {...payload};
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const endPoint = 'infrastructure/devices/get-filters/Device';
    const endPointTransceiver = 'tool-system/botchat/transceiver-module/filter';
    let resPostPopName;
    let resPostNameDev;
    let resPostPort;
    if (fList(branch).length > 0) {
      startFunc(dispatch);
      resPostPopName = await axios.post(
        `${URL_101}/${endPoint}/popName`,
        payload,
        {
          headers: {
            token: tokenSecurity?.tokenSecurity,
            tokenAPI: accessToken?.accessToken,
          },
        },
      );
      endFunc(dispatch);
      if (fList(popName).length > 0) {
        startFunc(dispatch);
        resPostNameDev = await axios.post(
          `${URL_101}/${endPoint}/nameDev`,
          payload,
          {
            headers: {
              token: tokenSecurity?.tokenSecurity,
              tokenAPI: accessToken?.accessToken,
            },
          },
        );
      }
      if (fList(nameDev).length > 0) {
        startFunc(dispatch);
        resPostPort = await axios101Post(`${endPointTransceiver}/port`, {
          area: area,
          zone: zone,
          province: province,
          branch: branch,
          nameDev: nameDev?.[0] || '',
          popName: popName?.[0] || '',
        });
      }
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'tools_chat',
          value: {
            isLoading: false,
            dataFilter: {
              pop_name_filter: resPostPopName?.data?.payload,
              name_dev_filter: resPostNameDev?.data?.payload,
              port_filter: resPostPort?.payload,
            },
          },
        }),
      );
    }
  } catch (error) {
    // setIsVisibleOption(false);
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
    endFunc(dispatch);
  }
};

export const GET_FILTER_PORT_TRANS_AND_CUS_OF_PON_OLT = async (props = {}) => {
  const {state, dispatch, openNotificationToast, payload, setIsVisibleOption} =
    {...props};
  const {popName, nameDev, branch, province, zone, area} = {...payload};
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    const endPoint = 'infrastructure/devices/get-filters/OLT';
    const endPointTransceiver = 'tool-system/botchat/transceiver-module/filter';
    let resPostPopName;
    let resPostNameDev;
    let resPostPort;
    if (fList(branch).length > 0) {
      startFunc(dispatch);
      resPostPopName = await axios.post(
        `${URL_101}/${endPoint}/popName`,
        payload,
        {
          headers: {
            token: tokenSecurity?.tokenSecurity,
            tokenAPI: accessToken?.accessToken,
          },
        },
      );
      endFunc(dispatch);
      if (fList(popName).length > 0) {
        startFunc(dispatch);
        resPostNameDev = await axios.post(
          `${URL_101}/${endPoint}/nameDev`,
          payload,
          {
            headers: {
              token: tokenSecurity?.tokenSecurity,
              tokenAPI: accessToken?.accessToken,
            },
          },
        );
      }
      if (fList(nameDev).length > 0) {
        startFunc(dispatch);
        resPostPort = await axios101Post(`${endPointTransceiver}/port`, {
          area: area,
          zone: zone,
          province: province,
          branch: branch,
          nameDev: nameDev?.[0] || '',
          popName: popName?.[0] || '',
        });
      }
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'tools_chat',
          value: {
            isLoading: false,
            dataFilter: {
              pop_name_filter: resPostPopName?.data?.payload,
              name_dev_filter: resPostNameDev?.data?.payload,
              port_filter: resPostPort?.payload,
            },
          },
        }),
      );
    }
  } catch (error) {
    // setIsVisibleOption(false);
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
    endFunc(dispatch);
  }
};
