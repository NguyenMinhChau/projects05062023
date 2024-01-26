import {yyyy_mm, yyyy_mm_dd} from '../../utils/TimerFormat';

// SET_DATA
export const TOOLS_CONFIG = {
  isLoading: true,
  isEdit: false,
  list_job: [],
  list_all_device_table: [],
  form_data: {
    month_list_job: yyyy_mm(new Date()),
    day_list_job: yyyy_mm_dd(new Date()),
    type_job: '',
    type_job_vi: '',
    job_name: '',
    nhan_su_th: '',
    pop_name: '',
    pop_name_other: '',
    pop_name_list: [],
    name_switch_di_list: [],
    pop_curr_list: [],
    model_name: '',
    model_dev: '',
    name_switch_di: '',
    pop_new_curr: '',
    pop_new_curr_val: '',
    config_pop_other: '',
    date: new Date(),
    time: new Date(),
    date_end: new Date(),
    time_end: new Date(),
    model_sw_ce: '',
    number_link_dn: '',
    type_link_dn: '',
    status_exc: {label: 'Chưa thực thi', value: 'WAITING'},
    type_reboot_pop: {label: 'Song Song (Giống BotChat)', value: 'SYNCHRONOUS'},
    type_run_pop: {label: 'Thực thi thủ công', value: 'MANUAL'},
    gpon_power: null,
    _idUpdate: '',
  },
};

export const USER_ROLE = {
  isLoading: true,
  user_list_by_role: [],
};

export const NOTIFICATION_SCREEN_STATE = {
  isLoading: true,
  list_notifications: [],
  list_notifications_read: [],
  list_notifications_no_read: [],
  isVisibleFilter: false,
  filter_type: 'all',
};

export const LOADER_STATE = {
  loaderGif: false,
  loaderBgc: false,
  click_notification: false,
};

export const FILE_STATE = {
  file_list: [],
  file_singer: null,
};

export const POP_STATE = {
  isLoading: true,
  table_pop_info: [],
  pop_auto_complete: [],
  pop_with_filter: [],
};

export const TOOLS_AI_STATE = {
  isLoading: true,
  isFilter: false,
  list_gallery: [],
  // filter
  class_type: [],
  type_image: [],
  isView: [],
  user: [],
};

export const SCHEDULE_OPERATOR_STATE = {
  isLoading: true,
  isFilter: false,
  list_schedule_operator: [],
  visibleCalendar: false,
  employee_list: [],
  from_date: new Date(),
  to_date: new Date(),
  date_filter: '',
  email_filter: '',
  radio_schedule: null,
  employee: null,
  employee_email: '',
  employee_full_name: '',
  employee_phone: '',
  employee_code: '',
  employee_department: '',
  employee_province: '',
  employee_zone: '',
  scheduleId: '',
  shift: '',
  color: '',
  note: '',
  status_employee: null,
  idUpdate: '',
};

export const CALENDAR_STATE = {
  day: null,
  month: null,
  fromDate: new Date(),
  toDate: new Date().setDate(new Date().getDate() + 3),
};

export const PAGINATION_STATE = {
  page: 1,
  limit: 10,
};

export const TOOLS_CHAT_STATE = {
  isLoading: false,
  result_botChat: null,
  data_chat_history: [],
  message_chat: '',
  file_chat_multiple: [],
  file_chat_single: null,
  area_chat_selected: null,
  zone_chat_selected: null,
  province_chat_selected: null,
  pop_name_chat_selected: null,
  // GET INFO
  group_point: [],
  pop_name: [],
  name_dev: [],
  port: [],
  port_crc: [],
  transceiver: [],
  contract: [],
  ip_dev: [],
  type_dev: [],
  contract: [],
  dataFilter: null,
  // FILTER
  area: [],
  zone: [],
  province: [],
  branch: [],
};

export const MGN_MOI_HAN_STATE = {
  isLoading: true,
  isEdit: false,
  isFilter: false,
  isCreate: false,
  data_moi_han: null,
  data_filter: null,
  search: '',
  keyword: '',
  zone: [],
  branch: [],
  vp_cn: [],
  loai_may: [],
  hang_sx: [],
  model: [],
  tinh_trang: [],
};

export const MGN_MOI_HAN_ACTION_ONE_STATE = {
  isLoading: false,
  isEdit: false,
  search: '',
  date: new Date(),
  image: null,
  image_current: null,
  image_current_update: null,
  clickImage: 'image_1',
  target_condition_image: null,
  note: '',
  note_update: '',
  data_image: null,
  idUpdated: null,
  selected_item: null,
  item_by_id: null,
  month_picker: false,
  image_picker: false,
  visible_image: false,
  used_visible: false,
};

export const MGN_MOI_HAN_ACTION_TWO_STATE = {
  isLoading: false,
  isEdit: false,
  isFilter: false,
  search: '',
  type_machine: 'DEFECT',
  data_image_machine: [],
  data_image_machine_uploaded: [],
  date_update: new Date(),
  date_maintance: new Date(),
  image_maintance: null, // 1 ảnh
  image_current: null, // 1 ảnh
  image_error: null, // < 8 ảnh
  image_serial: null, // 1 ảnh
  clickImage: 'image_1',
  target_condition_image: null,
  image_target_link: '',
  note: '',
  note_reject: '',
  from_date_filter: new Date(new Date().setDate(new Date().getDate() - 7)),
  to_date_filter: new Date(),
  month_filter: new Date(),
  info_error: '',
  detail_info_error: '',
  idUpdated: null,
  selected_item: null,
  date_picker: false,
  image_picker: false,
  visible_image: false,
  used_visible: false,
};

export const MGN_MOI_HAN_ACTION_THREE_STATE = {
  isLoading: false,
  isEdit: false,
  isFilter: false,
  search: '',
  pop: null,
  data_image_machine: [],
  data_image_machine_uploaded: [],
  from_date: new Date(new Date().setDate(new Date().getDate() - 5)),
  from_time: new Date(),
  to_date: new Date(),
  to_time: new Date(),
  from_date_filter: new Date(new Date().setDate(new Date().getDate() - 5)),
  to_date_filter: new Date(),
  month_filter: new Date(),
  image_maintance: null,
  image_current: null,
  image_error: null, // 1 ảnh
  image_serial: null, // 1 ảnh
  image_multiple: null,
  image_target_link: '',
  data_filter: null,
  kv_btht_sc: [],
  phan_tu_sc: [],
  nhom_pt_filter: [],
  nhom_ngnhan_dc: [],
  nguyen_nhan_dc: [],
  queue_sc: [],
  pop_name_sc: [],
  branch_sc: [],
  location_sc: [],
  note: '',
  note_reject: '',
  data_sc: [],
  selected_sc: [],
  sc_selected_fake: [],
  ma_sc_filter: [],
  clickImage: 'image_1',
  target_condition_image: null,
  targetDateTime: 'from_date',
  idUpdated: null,
  selected_item: null,
  date_picker: false,
  image_picker: false,
  visible_image: false,
  used_visible: false,
};

export const MGN_MOI_HAN_ACTION_FOUR_STATE = {
  isLoading: false,
  isEdit: false,
  isFilter: false,
  from_date_filter: new Date(new Date().setDate(new Date().getDate() - 7)),
  to_date_filter: new Date(),
  month_filter: new Date(),
  data_image_machine: [],
  data_image_machine_uploaded: [],
  search: '',
  ma_ke_hoach: null,
  image: null,
  image_multiple: null,
  image_current: null,
  clickImage: 'image_1',
  target_condition_image: null,
  image_target_link: '',
  note: '',
  note_reject: '',
  idUpdated: null,
  date_picker: false,
  selected_item: null,
  image_picker: false,
  visible_image: false,
  used_visible: false,
};

export const MAINTANCE_CCDC_STATE = {
  isLoading: true,
  search: '',
};

export const MGN_MODEM_STATE = {
  isLoading: true,
  isFilter: false,
  list_modem: [],
  search: '',
  data_filter: null,
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
  content: null,
};

export const RICH_EDITOR_STATE = {
  url_editor: '',
  title_url_editor: '',
  content_editor: '',
  html_editor: '',
  font_size_editor: 1,
  fore_color_editor: '#000000',
  bg_color_editor: 'transparent',
  visibleLink_editor: false,
  visibleHTML_editor: false,
  visibleForeColor_editor: false,
  visibleBgcColor_editor: false,
  visibleEmoji_editor: false,
};

// SET_TOGGLE
export const TOOLS_TOGGLE_MODAL = {
  modal_new_plan_options: false,
  modal_add_new_plan: false,
  modal_detail_plan: false,
  time_picker_visible: false,
  date_picker_visible: false,
};

export const SCHEDULE_TOGGLE_MODAL = {
  modal_schedule: false,
  modal_schedule_detail: false,
};

export const MGN_MODEM_TOGGLE_MODAL = {
  modal_add_edit: false,
};

export const DIAL_INF_STATE = {
  isLoading: false,
  prize: false,
  qrcode_image: null,
  list_user_join: [], // not email, not prize
  user_info_program: null, // email user, not prize
  list_user_prize: [], // email user, prize true
  list_user_no_prize: [], // email user, prize false
  isVisibleResult: false,
  isVisibleUserJoin: false,
  isVisiblePrize: false,
};

export const MERRY_CHRISTMAS_STATE = {
  isLoading: false,
  data_code: null,
  user_info_program: null,
};
export const LOGIN_STATE = {
  isLoad: false,
  showOtpInput: false,
  isShowLoginEmail: false,
  emailValue: '',
  otpValue: '',
};

export const NOTIFICATION_TOAST_STATE = {
  visible_toast: false,
  type: '',
  title: '',
  message: '',
  buttons: [],
  duration: null,
  MessageCustom: null,
};

export const DIALOG_CONFIRM_TOAST_STATE = {
  visible_toast: false,
  title: '',
  message: '',
  MessageCustom: null,
  propsData: {},
  imageLink: null,
  imageLocal: null,
  funcHandle: () => {},
};

export const SWAP_IP_STATE = {
  isLoading: true,
  isFilter: false,
  updateMany: false,
  single_click: null,
  selected_list: [],
  typeHandle: null,
  list_swap_ip: null,
  list_khg_swap_ip: null,
  dataChart: null,
  fromDate: new Date(new Date().setDate(new Date().getDate() - 7)),
  toDate: new Date(),
  data_filter: null,
  data_program_id: [],
  program_id: null,
  actions: [],
  province: [],
  modem: [],
  plugin_status: [],
  keyword: '',
  date_time_picker: false,
  visible_modal: false,
  visible_modal_plugin: false,
  selected_item: null,
};
