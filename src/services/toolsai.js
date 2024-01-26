import FormData from 'form-data';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {errorMessage} from './jwt';
import {
  axios101Post,
  axios101Put,
  axiosToolsAIPost,
} from '../utils/axios/axiosInstance';
import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
import {TYPE_NOTIFICATION} from '../components/General/NotificationToast';

export const API_HANDLE_IMAGE = async (props = {}) => {
  const {
    email_user,
    typeImage,
    image,
    navigation,
    setProgress,
    setStatus,
    setData,
    setOpenVisionCamera,
    setSelectedImageRealTime,
    setIsErrorRealtimeCamera,
    setStatusRealTime,
    setIsScannerRealtimeCamera,
  } = props;
  const pathByTab =
    typeImage === 'ac_quy' ? 'handle-lcd-v4' : 'handle-lcd-ofm1';

  let data = new FormData();
  if (Array.isArray(image)) {
    image.forEach(element => {
      const ext = element?.uri?.split('.').pop();
      data.append('image', {
        uri: element?.uri,
        name: ext ? `${element?.name}.${ext}` : `${element?.name}.jpg`,
        type: ext ? `image/${ext}` : 'image/jpg',
      });
    });
  } else {
    const ext = image?.uri?.split('.').pop();
    data.append('image', {
      uri: image?.uri,
      name: ext ? `${image?.name}.${ext}` : `${image?.name}.jpg`,
      type: ext ? `image/${ext}` : 'image/jpg',
    });
  }

  try {
    const resPost = await axiosToolsAIPost(`${pathByTab}/${email_user}`, data);
    setProgress(false);
    setOpenVisionCamera(false);
    setSelectedImageRealTime(null);
    setIsErrorRealtimeCamera(false);
    setStatusRealTime(null);
    setIsScannerRealtimeCamera(false);
    if (
      Object.keys(resPost?.data || {}).length === 0 ||
      resPost.data[0].class !== 'ok'
    ) {
      setStatus(false);
      setData(resPost.data);
      return;
    } else if (Object.keys(resPost?.data || {}).length === 1) {
      setData(resPost.data);
      setStatus(true);
    } else {
      setData(resPost.data);
      setStatus('ok');
      const convertRes = {data: resPost.data, navigation: navigation};
      navigation.navigate({
        name: SCREEN_NAVIGATE.ResultPage_Screen,
        params: convertRes,
      });
    }

    return resPost;
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    setOpenVisionCamera(false);
    setSelectedImageRealTime(null);
    setIsErrorRealtimeCamera(false);
    setStatusRealTime(null);
    setIsScannerRealtimeCamera(false);
    setStatus(false);
    setProgress(false);
  }
};

export const API_VALID_IMAGE = async (props = {}) => {
  const {
    email_user,
    typeImage,
    image,
    navigation,
    setProgress,
    setStatus,
    setData,
    setOpenVisionCamera,
    setSelectedImageRealTime,
    setIsErrorRealtimeCamera,
    setStatusRealTime,
    setIsScannerRealtimeCamera,
  } = props;
  const pathByTab = typeImage === 'ac_quy' ? 'valid' : 'ofm-valid';

  let data = new FormData();
  const ext = image?.uri?.split('.').pop();
  data.append('image', {
    uri: image?.uri,
    name: ext ? `${image?.name}.${ext}` : `${image?.name}.jpg`,
    type: ext ? `image/${ext}` : 'image/jpg',
  });

  try {
    const resPost = await axiosToolsAIPost(`${pathByTab}`, data);
    setStatusRealTime(resPost.data?.[0]);
    const {class: statusClass} = {...resPost.data?.[0]};
    if (statusClass === 'ok') {
      setProgress(true);
      API_HANDLE_IMAGE({
        email_user,
        typeImage,
        image,
        navigation,
        setProgress,
        setStatus,
        setData,
        setOpenVisionCamera,
        setSelectedImageRealTime,
        setIsErrorRealtimeCamera,
        setStatusRealTime,
        setIsScannerRealtimeCamera,
      });
    }
  } catch (error) {
    const msg = error?.response?.status
      ? errorMessage(error)
      : (error?.message || 'Lỗi không xác định') + ', vui lòng thử lại sau!';
    setIsErrorRealtimeCamera(true);
  }
};

export const GET_LIST_GALLERY = async (props = {}) => {
  const {
    classType,
    typeImage,
    isView,
    user,
    state,
    dispatch,
    limit,
    page,
    setLoadingMore,
    setSubmitting,
    openNotificationToast,
  } = props;
  try {
    const resPost = await axios101Post(
      `tool-system/get-history-result-tool?page=${page}&limit=10`,
      {
        class: classType || [],
        type: typeImage || [],
        isView: isView || [],
        user: user || [],
      },
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_ai',
        value: {
          ...state?.set_data.tools_ai,
          list_gallery: resPost,
        },
      }),
    );
    setSubmitting(false);
    setLoadingMore(false);
  } catch (error) {
    setLoadingMore(false);
    setSubmitting(false);
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

export const SAVED_GALLERY = async (props = {}) => {
  const {
    idGallery,
    state,
    dispatch,
    setLoadingMore,
    classType,
    typeImage,
    isView,
    user,
    limit,
    page,
    setSubmitting,
    openNotificationToast,
  } = props;
  try {
    const resPut = await axios101Put(
      `tool-system/handle-history-result-tool/${idGallery}`,
    );
    GET_LIST_GALLERY({
      classType,
      typeImage,
      isView,
      user,
      state,
      dispatch,
      limit,
      page,
      setLoadingMore,
      setSubmitting,
    });
    setSubmitting(false);
    openNotificationToast({
      title: 'Thông báo',
      message: 'Lưu thành công',
      type: TYPE_NOTIFICATION.SUCCESS,
    });
  } catch (error) {
    setSubmitting(false);
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
