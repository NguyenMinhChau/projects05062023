import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';
import {axios101Get, axios101Post} from '../utils/axios/axiosInstance';
import {errorMessage} from './jwt';

const startFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'tools_config',
      value: {
        isLoading: true,
      },
    }),
  );
};

const endFunc = dispatch => {
  dispatch(
    SET_DATA_PAYLOAD({
      key: 'tools_config',
      value: {
        isLoading: false,
      },
    }),
  );
};

// ?! GET LIST JOBS -  OK
export const GET_LIST_JOB_DEVICE_TOOL_SYSTEM = async (props = {}) => {
  const {month, date, dispatch, state, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/get-list-job-device-tool-system?date=${date}&month=${month}`,
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          isLoading: false,
          list_job: resPost.payload,
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
    endFunc(dispatch);
  }
};

//?! GET JOB BY ID - OK
export const GET_JOB_BY_ID = async (props = {}) => {
  const {id_job, dispatch, openNotificationToast} = props;
  startFunc(dispatch);
  try {
    const resGet = await axios101Post(
      `tool-system/get-detail-device-by-job-name/${id_job}`,
    );
    dispatch(SET_DATA_PAYLOAD({key: 'dataByObjId', value: resGet.payload}));
    endFunc(dispatch);
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

// ?! GET LIST ALL DEVICE TABLE
export const GET_LIST_ALL_DEVICE_TABLE = async (props = {}) => {
  const {
    list_pop_name,
    dispatch,
    state,
    limit = 9999999,
    openNotificationToast,
  } = props;
  return true;
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/device/get-list-all-device-table?limit=${limit}`,
  //     {
  //       functionName: ['ACN', 'CE'],
  //       popName: list_pop_name,
  //       typeDev: ['GPON', 'HUAWEI'],
  //     },
  //   );
  //   dispatch(
  //     SET_DATA_PAYLOAD({
  //       key: 'tools_config',
  //       value: {
  //         list_all_device_table: resPost.payload,
  //       },
  //     }),
  //   );
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};

// ?! GET LIST FILTER SWITCH DI BY POP SWITCH DI - ASSIGN API MOBILE
export const GET_LIST_FILTER_SWITCH_DI_BY_POP_SWITCH_DI = async (
  props = {},
) => {
  const {dispatch, state, pop_switch_di, page, limit, openNotificationToast} =
    props;
  return true;
  // try {
  //   const body = {
  //     func: ['DI'],
  //     popName: [pop_switch_di],
  //   };
  //   const resPost = await axios101Post(
  //     `infrastructure/olt/get-table-with-filter/Device?page=${page}&limit=${limit}`,
  //     body,
  //   );
  //   dispatch(
  //     SET_DATA_PAYLOAD({
  //       key: 'tools_config',
  //       value: {
  //         form_data: {
  //           ...state.set_data.tools_config.form_data,
  //           name_switch_di_list: resPost.payload,
  //         },
  //       },
  //     }),
  //   );
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};

// CREATE/UPDATE FUNC GENERAL
const startCreateUpdateFunc = dispatch => {
  return () => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          modal_add_new_plan: false,
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          isLoading: true,
        },
      }),
    );
  };
};
const createSuccess = (dispatch, openNotificationToast) => {
  return () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          isLoading: false,
        },
      }),
    );
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_toggle.tools_config,
          modal_add_new_plan: false,
          modal_new_plan_options: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Thêm mới thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  };
};
const createUpdateError = (dispatch, openNotificationToast, msg) => {
  return () => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          modal_add_new_plan: true,
        },
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          isLoading: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  };
};
const updateSuccess = (dispatch, openNotificationToast) => {
  return () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_config',
        value: {
          isEdit: false,
          isLoading: false,
          form_data: {
            ...state.set_data.tools_config.form_data,
            _idUpdate: '',
          },
        },
      }),
    );
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'tools_config',
        value: {
          ...state.set_toggle.tools_config,
          modal_add_new_plan: false,
        },
      }),
    );
    openNotificationToast({
      title: 'Thông báo',
      message: 'Cập nhật thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  };
};

// ?! REBOOT POP
//? CREATE
export const CREATE_REBOOT_POP = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     'inas-infrastructure/tool-system/reboot-pop/create-step-reboot-pop',
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_REBOOT_POP = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/reboot-pop/update-step-reboot-pop/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  // ? errorMessage(error)
  // : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! CONFIG NEW OLT
// ? CREATE
export const CREATE_CONFIG_OLT = async (props = {}) => {
  const {
    payload,
    setDataListDevice,
    pop_name,
    huawei_pop,
    model_dev,
    number_link_dn,
    dispatch,
    openNotificationToast,
  } = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resGet = await axios101Get(
  //     `inas-infrastructure/tool-system/auto-config-olt/cap-phat-tai-nguyen/${pop_name}/${huawei_pop}/${model_dev}/${number_link_dn}`,
  //     payload,
  //   );
  //   setDataListDevice({payload, list: resGet.payload});
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
// ? UPDATE
export const UPDATE_CONFIG_OLT = async (props = {}) => {
  const {payload, id_task, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPut = await axios101Put(
  //     `inas-infrastructure/tool-system/update-info-auto-config-olt/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
// ? HANDLE CẤU HÌNH THIẾT BỊ / CẤP PHÁT TÀI NGUYÊN - ASSIGN API MOBILE
export const HANDLE_CONFIG_AUTO_OLT = async (props = {}) => {
  const {dispatch, state, step, typeJob, _id, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/execute-job-id/${_id}/${typeJob}/${step}`,
    );
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: `${step} thành công`,
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
// ? HANDLE TERMINATED PLAN
export const HANDLE_TERMINATED_PLAN_CONFIG_AUTO_OLT = async (props = {}) => {
  const {_id, dispatch, state, setVisible, reason, openNotificationToast} =
    props;
  return true;
  // try {
  //   const resPut = await axios101Put(
  //     `inas-infrastructure/tool-system/auto-config-olt/close-task-config-OLT/${_id}`,
  //     {
  //       message: reason,
  //     },
  //   );
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: 'Đóng kế hoạch thành công',
  //   type: TYPE_NOTIFICATION.SUCCESS,
  // })
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};

// ?! CONFIG NEW POP
// ? CREATE
export const CREATE_CONFIG_NEW_POP = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/kh-pop/create-kh-pop`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_CONFIG_NEW_POP = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // /startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/kh-pop/update-kh-pop/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! UP SWITCH FTI
// ? CREATE
export const CREATE_UP_SWITCH_FTI = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/kh-pop/create-kh-pop`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_UP_SWITCH_FTI = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/kh-pop/update-kh-pop/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! CONFIG NEW CE
//? CREATE - ASSIGN API MOBILE
export const CREATE_CONFIG_NEW_CE = async (props = {}) => {
  const {payload, typeJob, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `tool-system/config-HW/create-step/${typeJob}`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE - ASSIGN API MOBILE
export const UPDATE_CONFIG_NEW_CE = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `tool-system/config-HW/update-job/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
// ? HANDLE CẤU HÌNH THIẾT BỊ / CẤP PHÁT TÀI NGUYÊN - ASSIGN API MOBILE
export const HANDLE_CONFIG_NEW_CE = async (props = {}) => {
  const {dispatch, state, step, typeJob, _id, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/execute-job-id/${_id}/${typeJob}/${step}`,
    );
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: `${step} thành công`,
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
// ? HANDLE TERMINATED PLAN
export const HANDLE_TERMINATED_PLAN_CONFIG_NEW_CE = async (props = {}) => {
  const {_id, dispatch, state, setVisible, reason, openNotificationToast} =
    props;
  return true;
  // try {
  //   const resPut = await axios101Put(
  //     `inas-infrastructure/tool-system/auto-config-olt/close-task-config-OLT/${_id}`,
  //     {
  //       message: reason,
  //     },
  //   );
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: 'Đóng kế hoạch thành công',
  //   type: TYPE_NOTIFICATION.SUCCESS,
  // })
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};

// ?! CONFIG AUTO HUAWEI: COMING SOON

// ?! REPLACE DEVICE FACILITY
// ? CREATE
export const CREATE_REPLACE_DEV_FACILITY = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/replace-device/add-device-to-plan`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_REPLACE_DEV_FACILITY = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/replace-device/update-device-in-plan/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! REPLACE SWITCH CE
//? CREATE - ASSIGN API MOBILE
export const CREATE_REPLACE_SWITCH_CE = async (props = {}) => {
  const {payload, typeJob, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `tool-system/config-HW/create-step/${typeJob}`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE - ASSIGN API MOBILE
export const UPDATE_REPLACE_SWITCH_CE = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `tool-system/config-HW/update-job/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (err) {
  // dispatch(
  //   SET_TOGGLE_PAYLOAD({
  //     key: 'tools_config',
  //     value: {
  //       modal_add_new_plan: true,
  //     },
  //   }),
  // );
  // dispatch(
  //   SET_DATA_PAYLOAD({
  //     key: 'tools_config',
  //     value: {
  //
  //       isLoading: false,
  //     },
  //   }),
  // );
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: errorMessage(err),
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};
// ? HANDLE CẤP PHÁT TÀI NGUYÊN - ASSIGN API MOBILE
export const HANDLE_CONFIG_REPLACE_SWITCH_CE = async (props = {}) => {
  const {dispatch, state, step, typeJob, _id, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/execute-job-id/${_id}/${typeJob}/${step}`,
    );
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: `${step} thành công`,
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

// ?! RELOCATION METRO POP
// ? CREATE
export const CREATE_RELOCATION_METRO_POP = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/kh-pop/create-kh-pop`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_RELOCATION_METRO_POP = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/kh-pop/update-kh-pop/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! RELOCATION POP
// ? CREATE
export const CREATE_RELOCATION_POP = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/kh-pop/create-kh-pop`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_RELOCATION_POP = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/kh-pop/update-kh-pop/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! RELOCATION POP PLUS
// ? CREATE
export const CREATE_RELOCATION_POP_PLUS = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/kh-pop/create-kh-pop`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_RELOCATION_POP_PLUS = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/kh-pop/update-kh-pop/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};

// ?! CONFIG NEW POWER
export const GET_LIST_GPON = async (props = {}) => {
  const {
    state,
    dispatch,
    popName,
    modelDev,
    setDataListDevice,
    payload,
    openNotificationToast,
  } = {
    ...props,
  };
  return true;
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/config-power-dev/cap-phat-tai-nguyen/${popName}/${modelDev}`,
  //   );
  //   setDataListDevice({form: payload, list: resPost?.payload});
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: 'Thành công',
  //   type: TYPE_NOTIFICATION.SUCCESS,
  // });
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};
// ? CREATE
export const CREATE_CONFIG_NEW_POWER = async (props = {}) => {
  const {payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPost = await axios101Post(
  //     `inas-infrastructure/tool-system/config-power-dev/create-step-config-nguon`,
  //     payload,
  //   );
  // createSuccess(dispatch, openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
//? UPDATE
export const UPDATE_CONFIG_NEW_POWER = async (props = {}) => {
  const {id_task, payload, dispatch, openNotificationToast} = props;
  return true;
  // startCreateUpdateFunc(dispatch)
  // try {
  //   const resPUT = await axios101Put(
  //     `inas-infrastructure/tool-system/config-power-dev/update-info-auto-config-olt/${id_task}`,
  //     payload,
  //   );
  // updateSuccess(dispatch,openNotificationToast)
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  // createUpdateError(dispatch, openNotificationToast, msg);
  // }
};
// ? HANDLE CẤP PHÁT TÀI NGUYÊN/CẤU HÌNH TB NGUỒN
export const HANDLE_CONFIG_NEW_POWER = async (props = {}) => {
  const {dispatch, state, step, typeJob, _id, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/execute-job-id/${_id}/${typeJob}/${step}`,
    );
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: `${step} thành công`,
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

// ? HANDLE TERMINATED PLAN
export const HANDLE_TERMINATED_PLAN_CONFIG_NEW_POWER = async (props = {}) => {
  const {_id, dispatch, state, setVisible, payload, openNotificationToast} =
    props;
  return true;
  // try {
  //   const resPut = await axios101Put(
  //     `inas-infrastructure/tool-system/config-power-dev/update-info-auto-config-nguon/${_id}`,payload );
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: 'Đóng kế hoạch thành công',
  //   type: TYPE_NOTIFICATION.SUCCESS,
  // })
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};

// ? HANDLE CẤP PHÁT TÀI NGUYÊN/CẤU HÌNH TB NGUỒN
export const HANDLE_CONFIG_UPGRADE_LINK = async (props = {}) => {
  const {dispatch, state, step, typeJob, _id, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/execute-job-id/${_id}/${typeJob}/${step}`,
    );
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: `${step} thành công`,
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};

// ? HANDLE TERMINATED PLAN
export const HANDLE_TERMINATED_PLAN_UPGRADE_LINK = async (props = {}) => {
  const {_id, dispatch, state, setVisible, payload, openNotificationToast} =
    props;
  return true;
  // try {
  //   const resPut = await axios101Put(
  //     `inas-infrastructure/tool-system/config-power-dev/update-info-auto-config-nguon/${_id}`,payload );
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: 'Đóng kế hoạch thành công',
  //   type: TYPE_NOTIFICATION.SUCCESS,
  // })
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};

// ? HANDLE CẤU HÌNH THIẾT BỊ / CẤP PHÁT TÀI NGUYÊN - ASSIGN API MOBILE
export const HANDLE_CONFIG_REBOOT_POP = async (props = {}) => {
  const {dispatch, state, step, typeJob, _id, openNotificationToast} = props;
  try {
    const resPost = await axios101Post(
      `tool-system/execute-job-id/${_id}/${typeJob}/${step}`,
    );
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: `${step} thành công`,
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    openNotificationToast({
      title: 'Thông báo',
      message: msg,
      type: TYPE_NOTIFICATION.ERROR,
    });
  }
};
// ? HANDLE TERMINATED PLAN
export const HANDLE_TERMINATED_PLAN_REBOOT_POP = async (props = {}) => {
  const {_id, dispatch, state, setVisible, reason, openNotificationToast} =
    props;
  return true;
  // try {
  //   const resPut = await axios101Put(
  //     `inas-infrastructure/tool-system/auto-config-olt/close-task-config-OLT/${_id}`,
  //     {
  //       message: reason,
  //     },
  //   );
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: 'Đóng kế hoạch thành công',
  //   type: TYPE_NOTIFICATION.SUCCESS,
  // })
  // } catch (error) {
  // const msg = error?.response?.status
  //     ? errorMessage(error)
  //     : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
  //   dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
  //   setVisible(false);
  // openNotificationToast({
  //   title: 'Thông báo',
  //   message: msg,
  //   type: TYPE_NOTIFICATION.ERROR,
  // })
  // }
};
