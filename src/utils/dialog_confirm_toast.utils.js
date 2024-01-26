import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
import useAppContext from './hooks/useAppContext';

export const useDialogConfirmToast = () => {
  const {dispatch, state} = useAppContext();
  const {propsData} = state.set_data.dialog_confirm_toast;
  //   mở modal
  const openDialogConfirmToast = ({
    title = '',
    message = '',
    MessageCustom = null,
    funcHandle = () => {},
    imageLink = null,
    imageLocal = null,
    propsData = {},
  }) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dialog_confirm_toast',
        value: {
          visible_toast: true,
          title: title,
          message,
          MessageCustom,
          imageLink: imageLink,
          imageLocal: imageLocal,
          funcHandle: funcHandle,
          propsData: propsData,
        },
      }),
    );
  };
  //   đóng modal
  const closeDialogConfirmToast = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dialog_confirm_toast',
        value: {
          visible_toast: false,
          title: '',
          message: '',
          MessageCustom: null,
          imageLink: null,
          imageLocal: null,
          funcHandle: () => {},
          propsData: {},
        },
      }),
    );
  };
  // cập nhật propsData
  const updatePropsData = (props = {}) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'dialog_confirm_toast',
        value: {
          propsData: {
            ...propsData,
            ...props,
          },
        },
      }),
    );
  };

  return {
    openDialogConfirmToast,
    closeDialogConfirmToast,
    updatePropsData,
  };
};
