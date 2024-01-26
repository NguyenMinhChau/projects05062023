import {errorMessage} from '../../jwt';
import {SET_DATA_PAYLOAD} from '../../../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../../../components/General/NotificationToast';
import {HOST_CPE} from '@env';
import {
  getAsyncCacheAccessTokenKEY,
  getAsyncCacheTokenSecurityKEY,
} from '../../../utils/cache.services';
import axios from 'axios';
import {
  axiosCPEGet,
  axiosCPEGetNoToken,
  axiosCPEPost,
  axiosCPEPostNoToken,
} from '../../../utils/axios/axiosInstance';

const startFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'swap_ip',
      value: {
        isLoading: true,
      },
    }),
  );
};

const endFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'swap_ip',
      value: {
        isLoading: false,
      },
    }),
  );
};

export const GET_LIST_SWAP_IP = async (props = {}) => {
  const {
    state,
    dispatch,
    isLoad,
    payload,
    page,
    limit,
    fromDate,
    toDate,
    openNotificationToast,
    programId,
  } = {
    ...props,
  };
  startFunc(dispatch);
  try {
    setTimeout(() => {
      endFunc(dispatch);
    }, 3000);
    if (programId) {
      // const resPost = await axios.post(
      //   `${HOST_CPE}/portal-cpe/get-list-submit-swap-ip-customer?fromDate=${fromDate}&toDate=${toDate}&programId=${programId}&page=${page}&limit=${limit}`,
      //   payload,
      // );
      const resPost = await axiosCPEPostNoToken(
        `portal-cpe/get-list-submit-swap-ip-customer?fromDate=${fromDate}&toDate=${toDate}&programId=${programId}&page=${page}&limit=${limit}`,
        payload,
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'swap_ip',
          value: {
            isLoading: false,
            list_swap_ip: resPost,
          },
        }),
      );
    }
  } catch (error) {
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

export const GET_LIST_KHG_SWAP_IP = async (props = {}) => {
  const {
    state,
    dispatch,
    payload,
    page,
    limit,
    openNotificationToast,
    programId,
  } = {
    ...props,
  };
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  startFunc(dispatch);
  try {
    setTimeout(() => {
      endFunc(dispatch);
    }, 3000);
    if (programId) {
      // const resPost = await axios.post(
      //   `${HOST_CPE}/portal-mnt/get-list-mac-contract-portal-by-program?programId=${programId}&page=${page}&limit=${limit}&skip=0`,
      //   {
      //     ...payload,
      //     headers: {
      //       Authorization: `Bearer ${accessToken?.accessToken}`,
      //     },
      //   },
      // );
      const resPost = await axiosCPEPost(
        `portal-mnt/get-list-mac-contract-portal-by-program?programId=${programId}&page=${page}&limit=${limit}&skip=0`,
        payload,
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'swap_ip',
          value: {
            isLoading: false,
            list_khg_swap_ip: resPost,
          },
        }),
      );
    }
  } catch (error) {
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

export const UPDATE_PLUGIN_STATUS_KHG_SWAP_IP = async (props = {}) => {
  const {
    state,
    dispatch,
    payload,
    payloadUser,
    page,
    limit,
    openNotificationToast,
    programId,
    typeHandle,
  } = {
    ...props,
  };
  startFunc(dispatch);
  try {
    setTimeout(() => {
      endFunc(dispatch);
    }, 3000);
    if (programId) {
      // const resPost = await axios.post(
      //   `${HOST_CPE}/portal-mnt/handle-plugin-by-program?programId=${programId}&type=${typeHandle}`,
      //   payload,
      // );
      const resPost = await axiosCPEPostNoToken(
        `portal-mnt/handle-plugin-by-program?programId=${programId}&type=${typeHandle}`,
        payload,
      );
      // const resPostUser = await axios.post(
      //   `${HOST_CPE}/portal-mnt/get-list-mac-contract-portal-by-program?programId=${programId}&page=${page}&limit=${limit}&skip=0`,
      //   payloadUser,
      // );
      const resPostUser = await axiosCPEPostNoToken(
        `portal-mnt/get-list-mac-contract-portal-by-program?programId=${programId}&page=${page}&limit=${limit}&skip=0`,
        payloadUser,
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'swap_ip',
          value: {
            isLoading: false,
            list_khg_swap_ip: resPostUser,
          },
        }),
      );
      openNotificationToast({
        title: 'Thông báo',
        message: 'Cập nhật plugin thành công!',
        type: TYPE_NOTIFICATION.SUCCESS,
      });
    }
  } catch (error) {
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

export const GET_FILTER_SWAP_IP = async (props = {}) => {
  const {
    state,
    dispatch,
    payload,
    fromDate,
    toDate,
    openNotificationToast,
    programId,
  } = {
    ...props,
  };
  try {
    setTimeout(() => {
      endFunc(dispatch);
    }, 3000);
    if (programId) {
      // const resPost = await axios.post(
      //   `${HOST_CPE}/portal-cpe/filter-list-submit-swap-ip-customer?fromDate=${fromDate}&toDate=${toDate}&programId=${programId}&exportExcel=false`,
      //   payload,
      // );
      const resPost = await axiosCPEPostNoToken(
        `portal-cpe/filter-list-submit-swap-ip-customer?fromDate=${fromDate}&toDate=${toDate}&programId=${programId}&exportExcel=false`,
        payload,
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'swap_ip',
          value: {
            isLoading: false,
            data_filter: resPost?.payload?.[0],
          },
        }),
      );
    }
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
    endFunc(dispatch);
  }
};

// TOKEN
export const GET_FILTER_KHG_SWAP_IP = async (props = {}) => {
  const {state, dispatch, payload, openNotificationToast, programId} = {
    ...props,
  };
  const accessToken = await getAsyncCacheAccessTokenKEY();
  const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
  try {
    setTimeout(() => {
      endFunc(dispatch);
    }, 3000);
    if (programId) {
      // const resGet = await axios.get(
      //   `${HOST_CPE}/portal-mnt/filter-list-mac-contract-portal-by-program?programId=${programId}`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken?.accessToken}`,
      //     },
      //   },
      // );
      const resGet = await axiosCPEGet(
        `portal-mnt/filter-list-mac-contract-portal-by-program?programId=${programId}`,
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'swap_ip',
          value: {
            isLoading: false,
            data_filter: resGet?.payload,
          },
        }),
      );
    }
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
    endFunc(dispatch);
  }
};

export const GET_LIST_PROGRAM_ID = async (props = {}) => {
  const {state, dispatch, openNotificationToast} = {
    ...props,
  };
  try {
    // const resGet = await axios.get(`${HOST_CPE}/portal-mnt/create-program`);
    const resGet = await axiosCPEGetNoToken(`portal-mnt/create-program`);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'swap_ip',
        value: {
          isLoading: false,
          data_program_id: resGet?.payload,
          program_id: resGet?.payload?.[0]?.nameProgram,
        },
      }),
    );
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
    endFunc(dispatch);
  }
};

export const GET_CHART_DATA = async (props = {}) => {
  const {state, dispatch, openNotificationToast, programId, fromDate, toDate} =
    {
      ...props,
    };
  startFunc(dispatch);
  try {
    setTimeout(() => {
      endFunc(dispatch);
    }, 3000);
    if (programId) {
      // const resGet = await axios.get(
      //   `${HOST_CPE}/portal-cpe/chart/sent-summary?programId=${programId}&fromDate=${fromDate}&toDate=${toDate}`,
      // );
      const resGet = await axiosCPEGetNoToken(
        `portal-cpe/chart/sent-summary?programId=${programId}&fromDate=${fromDate}&toDate=${toDate}`,
      );
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'swap_ip',
          value: {
            isLoading: false,
            dataChart: resGet?.payload,
          },
        }),
      );
    }
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
    endFunc(dispatch);
  }
};
