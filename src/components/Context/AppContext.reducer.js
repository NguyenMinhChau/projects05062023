import {SET_DATA, SET_TOGGLE} from './AppContext.actions';
import {
  CALENDAR_STATE,
  DIALOG_CONFIRM_TOAST_STATE,
  DIAL_INF_STATE,
  FILE_STATE,
  LOADER_STATE,
  LOGIN_STATE,
  MAINTANCE_CCDC_STATE,
  MERRY_CHRISTMAS_STATE,
  MGN_MODEM_STATE,
  MGN_MODEM_TOGGLE_MODAL,
  MGN_MOI_HAN_ACTION_FOUR_STATE,
  MGN_MOI_HAN_ACTION_ONE_STATE,
  MGN_MOI_HAN_ACTION_THREE_STATE,
  MGN_MOI_HAN_ACTION_TWO_STATE,
  MGN_MOI_HAN_STATE,
  NOTIFICATION_SCREEN_STATE,
  NOTIFICATION_TOAST_STATE,
  PAGINATION_STATE,
  POP_STATE,
  RICH_EDITOR_STATE,
  SCHEDULE_OPERATOR_STATE,
  SCHEDULE_TOGGLE_MODAL,
  SWAP_IP_STATE,
  TOAST_MODAL,
  TOOLS_AI_STATE,
  TOOLS_CHAT_STATE,
  TOOLS_CONFIG,
  TOOLS_TOGGLE_MODAL,
  USER_ROLE,
} from './AppContext.state';

const initialStateApp = {
  set_data: {
    currentUser: null,
    accessToken: null,
    tokenSecurity: null,
    dataByObjId: null,
    appearance_display: null,
    loader_slider_used: null,
    access_app: null,
    biometric_app: null,
    search: '',
    pagination: PAGINATION_STATE,
    tools_ai: TOOLS_AI_STATE,
    tools_chat: TOOLS_CHAT_STATE,
    file: FILE_STATE,
    tools_config: TOOLS_CONFIG,
    user_role: USER_ROLE,
    pop_info: POP_STATE,
    calendar: CALENDAR_STATE,
    schedule_operator: SCHEDULE_OPERATOR_STATE,
    mgn_modem: MGN_MODEM_STATE,
    rich_editor: RICH_EDITOR_STATE,
    mgn_moi_han: MGN_MOI_HAN_STATE,
    mgn_moi_han_action_one: MGN_MOI_HAN_ACTION_ONE_STATE,
    mgn_moi_han_action_two: MGN_MOI_HAN_ACTION_TWO_STATE,
    mgn_moi_han_action_three: MGN_MOI_HAN_ACTION_THREE_STATE,
    mgn_moi_han_action_four: MGN_MOI_HAN_ACTION_FOUR_STATE,
    maintance_ccdc: MAINTANCE_CCDC_STATE,
    notification_toast: NOTIFICATION_TOAST_STATE,
    dialog_confirm_toast: DIALOG_CONFIRM_TOAST_STATE,
    swap_ip: SWAP_IP_STATE,
    dial_inf: DIAL_INF_STATE,
    merry_christmas_inf: MERRY_CHRISTMAS_STATE,
    login_state: LOGIN_STATE,
    notification_screen_state: NOTIFICATION_SCREEN_STATE,
  },
  set_toggle: {
    tools_config: TOOLS_TOGGLE_MODAL,
    schedule_operator: SCHEDULE_TOGGLE_MODAL,
    mgn_modem: MGN_MODEM_TOGGLE_MODAL,
    loader: LOADER_STATE,
    isVisible_menu: false,
    isVisible_search: false,
    submitting: false,
  },
};

const SET_DATA_PAYLOAD = payload => {
  return {
    type: SET_DATA,
    key: payload.key,
    value: payload.value,
  };
};
const SET_TOGGLE_PAYLOAD = payload => {
  return {
    type: SET_TOGGLE,
    key: payload.key,
    value: payload.value,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        set_data: {
          ...state.set_data,
          [action.key]:
            typeof state.set_data[action.key] !== 'object'
              ? action.value
              : {
                  ...state.set_data[action.key],
                  ...action.value,
                },
        },
      };
    case SET_TOGGLE:
      return {
        ...state,
        set_toggle: {
          ...state.set_toggle,
          [action.key]:
            typeof state.set_toggle[action.key] !== 'object'
              ? action.value
              : {
                  ...state.set_toggle[action.key],
                  ...action.value,
                },
        },
      };
    default:
      return state;
  }
};
export default reducer;
export {initialStateApp, SET_DATA_PAYLOAD, SET_TOGGLE_PAYLOAD};
