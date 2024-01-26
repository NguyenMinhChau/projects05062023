import {TYPE_ICON} from '../../../../utils/icon.utils';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';

export const TAB_OPTIONS = [
  {
    id: 1,
    label: 'Kiểm tra',
    value: 'preview',
    title: 'kiểm tra',
  },
  {
    id: 2,
    label: 'Xem lịch sử',
    value: 'history',
    title: 'lịch sử',
  },
];

export const DATA_GET_INFO_DEVICE_CONFIG = [
  {
    label: 'Thông tin Tập Điểm',
    iconName: 'group',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.ConfigGroupPoint_Screen,
    noneBorderBottom: true,
  },
  // {
  //   label: 'Trạng thái Tập Điểm từ SHĐ',
  //   iconName: 'file-sign',
  //   typeIcon: TYPE_ICON.iconMaterial,
  //   router: SCREEN_NAVIGATE.ConfigSHD2GrPtsStt_Screen,
  // },
  // {
  //   label: 'Kiểm tra thiết bị của POP',
  //   iconName: 'scale-outline',
  //   router: SCREEN_NAVIGATE.ConfigDeviceOfPop_Screen,
  // },
  // {
  //   label: 'Các th.bị Nguồn đang lỗi trên Opsview',
  //   iconName: 'bug-outline',
  //   router: SCREEN_NAVIGATE.ConfigPowerError_Screen,
  // },
  // {
  //   label: 'Tình trạng nguồn của POP',
  //   iconName: 'power-outline',
  //   router: SCREEN_NAVIGATE.ConfigPowerInfo_Screen,
  // },
  // {
  //   label: 'Thực hiện test Accu',
  //   iconName: 'car-battery',
  //   typeIcon: TYPE_ICON.iconMaterial,
  //   router: SCREEN_NAVIGATE.ConfigBatteryTest_Screen,
  // },
  // {
  //   label: 'Thông tin từ thiết bị PMS',
  //   iconName: 'newspaper-outline',
  //   router: SCREEN_NAVIGATE.ConfigPMSInfo_Screen,
  // },
  // {
  //   label: 'Bật/Tắt còi hú POP Indoor',
  //   iconName: 'toggle-outline',
  //   router: SCREEN_NAVIGATE.ConfigSirenToggle_Screen,
  //   noneBorderBottom: true,
  // },
];

export const DATA_GET_INFO_PORT_CONFIG = [
  {
    label: 'Thông tin module quang',
    iconName: 'fuel-cell',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.ConfigTransceiver_Screen,
  },
  // {
  //   label: 'Các Port đang lỗi trên Opsview',
  //   iconName: 'bug-outline',
  //   router: SCREEN_NAVIGATE.ConfigPortError_Screen,
  // },
  // {
  //   label: 'Kiểm tra CRC của port',
  //   iconName: 'trending-up-outline',
  //   router: SCREEN_NAVIGATE.ConfigCRC_Screen,
  // },
  // {
  //   label: 'Trạng thái join LACP của port',
  //   iconName: 'git-compare-outline',
  //   router: SCREEN_NAVIGATE.ConfigLACP_Screen,
  // },
  {
    label: 'Thông tin KHG port PON',
    iconName: 'document-text-outline',
    router: SCREEN_NAVIGATE.ConfigCusOfPon_Screen,
    noneBorderBottom: true,
  },
];

export const DATA_GET_INFO_CUSTOMER_CONFIG = [
  // {
  //   label: 'Kiểm tra Checklist của KHG',
  //   iconName: 'checkmark-done-circle-outline',
  //   router: SCREEN_NAVIGATE.ConfigCusChecklist_Screen,
  // },
  {
    label: 'Thông tin modem KHG',
    iconName: 'document-text-outline',
    router: SCREEN_NAVIGATE.ConfigCusModem_Screen,
  },
  {
    label: 'Kiểm tra DV KHG',
    iconName: 'shapes-outline',
    router: SCREEN_NAVIGATE.ConfigCusService_Screen,
    noneBorderBottom: true,
  },
  // {
  //   label: 'Lấy password default của Modem CIG',
  //   iconName: 'key-outline',
  //   router: SCREEN_NAVIGATE.ConfigOntDefaultPwd_Screen,
  // },
  // {
  //   label: 'Lấy vendor modem hàng xóm',
  //   iconName: 'cloud-done-outline',
  //   router: SCREEN_NAVIGATE.ConfigMacToNbVendor_Screen,
  //   noneBorderBottom: true,
  // },
];

export const TOOLS_GET_INFO_OPTIONS = [
  {
    id: 1,
    label: 'Thiết bị',
    value: 'DEVICE',
    subMenu: [
      {id: 1, label: 'Thông tin Tập Điểm', value: '/GroupPoints'},
      {id: 2, label: 'Trạng thái Tập Điểm từ SHĐ', value: '/SHD2GrPtsStt'},
      {id: 3, label: 'Kiểm tra thiết bị của POP', value: '/DeviceOfPop'},
      {
        id: 4,
        label: 'Các th.bị Nguồn đang lỗi trên Opsview',
        value: '/PowerError',
      },
      {id: 5, label: 'Tình trạng nguồn của POP', value: '/PowerInfo'},
      {id: 6, label: 'Thực hiện test Accu', value: '/BatteryTest'},
      {id: 7, label: 'Thông tin từ thiết bị PMS', value: '/PMSInfo'},
      {id: 8, label: 'Bật/Tắt còi hú POP Indoor.', value: '/SirenToggle'},
    ],
  },
  {
    id: 2,
    label: 'Port',
    value: 'PORT',
    subMenu: [
      {id: 1, label: 'Thông tin module quang', value: '/Transceiver'},
      {id: 2, label: 'Các Port đang lỗi trên Opsview', value: '/PortError'},
      {id: 3, label: 'Kiểm tra CRC của port', value: '/CRC'},
      {id: 4, label: 'Trạng thái join LACP của port', value: '/LACP'},
      {id: 5, label: 'Thông tin KHG port PON.', value: '/CusOfPon'},
    ],
  },
  {
    id: 3,
    label: 'Khách hàng',
    value: 'CUSTOMER',
    subMenu: [
      {id: 1, label: 'Kiểm tra Checklist của KHG', value: '/CusChecklist'},
      {id: 2, label: 'Thông tin modem KHG', value: '/CusModem'},
      {id: 3, label: 'Kiểm tra DV KHG', value: '/CusService'},
      {
        id: 4,
        label: 'Lấy password default của Modem CIG',
        value: '/OntDefaultPwd',
      },
      {
        id: 5,
        label: 'Lấy vendor modem hàng xóm.',
        value: '/MacToNbVendor',
      },
    ],
  },
];
