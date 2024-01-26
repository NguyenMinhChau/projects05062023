import useAppContext from '../../../utils/hooks/useAppContext';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  PRIMARY_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../styles/colors.global';

export const useColorThemeTools = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR,
      MAIN_COLOR: MAIN_COLOR_DARK,
      BACKGROUND_CARD: '#313131',
      STEPPER_TEXT_LEFT_COLOR: '#1e90ff',
      STEPPER_PRIMARY_COLOR: '#1e90ff',
      AUTO_CONFIG_OLT: '#ff6b81',
      REPLACE_OLT_CE_NEW_CE: '#D980FA',
      REPLACE_DEVICE: '#7bed9f',
      REBOOT_POP: '#70a1ff',
      HUAWEI: '#feca57',
      POP_RELOCATION_PLAN_MPOP: '#00d2d3',
      POP_RELOCATION_PLAN_POP: '#48dbfb',
      POP_RELOCATION_PLAN_POP_PLUS: '#72EDD1',
      NEW_POP_CONFIGUARATION: '#74b9ff',
      AUTO_CONFIG_HW: '#a29bfe',
      CONFIG_NEW_POWER: '#7ed6df',
      UPGRADE_UPLINK: '#ff9ff3',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      MAIN_COLOR: MAIN_COLOR,
      BACKGROUND_CARD: '#FFFFFF',
      STEPPER_TEXT_LEFT_COLOR: PRIMARY_COLOR,
      STEPPER_PRIMARY_COLOR: PRIMARY_COLOR,
      AUTO_CONFIG_OLT: '#e91e63',
      REPLACE_OLT_CE_NEW_CE: '#9b59b6',
      REPLACE_DEVICE: '#50cd89',
      REBOOT_POP: '#3A5CCC',
      HUAWEI: '#FFC107',
      POP_RELOCATION_PLAN_MPOP: '#0D7D8D',
      POP_RELOCATION_PLAN_POP: '#1bc5bd',
      POP_RELOCATION_PLAN_POP_PLUS: '#72EDD1',
      NEW_POP_CONFIGUARATION: '#0045FF',
      AUTO_CONFIG_HW: '#30336b',
      CONFIG_NEW_POWER: '#22a6b3',
      UPGRADE_UPLINK: '#6697FF',
    },
  };
  const colors =
    appearance_display?.value === 'dark' ||
    appearance_display?.value === 'dark-no-system'
      ? themeDark?.colors
      : themeLight?.colors;

  return {
    colors,
  };
};

export const DETAILED_TASKS = [
  'AUTO_CONFIG_OLT',
  'CONFIG_NEW_POWER',
  'REBOOT_POP',
  'CONFIG_NEW_CE_SWITCH',
  'CONFIG_REPLACE_CE_SWITCH',
];
export const TASK_LIST = [
  'AUTO_CONFIG_OLT',
  'CONFIG_NEW_CE_SWITCH',
  'CONFIG_REPLACE_CE_SWITCH',
  'CONFIG_REPLACE_OLT',
  'REPLACE_DEVICE',
  'REBOOT_POP',
  'HUAWEI',
  'POP_RELOCATION_PLAN_MPOP',
  'POP_RELOCATION_PLAN_POP',
  'POP_RELOCATION_PLAN_POP_PLUS',
  'NEW_POP_CONFIGUARATION',
  'AUTO_CONFIG_HW',
  'UPGRADE_UPLINK',
];
export const MAP_GROUP = {
  POP_RELOCATION_PLAN_POP: 'POP',
  POP_RELOCATION_PLAN_POP_PLUS: 'POP+',
  POP_RELOCATION_PLAN_MPOP: 'MPOP',
};
export const useHandleColor = (eventType, colors) => {
  switch (eventType) {
    case 'AUTO_CONFIG_OLT':
      return colors.AUTO_CONFIG_OLT;
    case 'CONFIG_NEW_CE_SWITCH':
    case 'CONFIG_REPLACE_CE_SWITCH':
    case 'CONFIG_REPLACE_OLT':
      return colors.REPLACE_OLT_CE_NEW_CE;
    case 'REPLACE_DEVICE':
      return colors.REPLACE_DEVICE;
    case 'REBOOT_POP':
      return colors.REBOOT_POP;
    case 'HUAWEI':
      return colors.HUAWEI;
    case 'POP_RELOCATION_PLAN_MPOP':
      return colors.POP_RELOCATION_PLAN_POP;
    case 'POP_RELOCATION_PLAN_POP':
      return colors.POP_RELOCATION_PLAN_POP;
    case 'POP_RELOCATION_PLAN_POP_PLUS':
      return colors.POP_RELOCATION_PLAN_POP_PLUS;
    case 'NEW_POP_CONFIGUARATION':
      return colors.NEW_POP_CONFIGUARATION;
    case 'AUTO_CONFIG_HW':
      return colors.AUTO_CONFIG_HW;
    case 'CONFIG_NEW_POWER':
      return colors.CONFIG_NEW_POWER;
    case 'UPGRADE_UPLINK':
      return colors.UPGRADE_UPLINK;
    default:
      return '#40739e';
  }
};
export const STEP_CODE = {
  WAITING: 0,
  EXECUTING: 1,
  RUNNING: 2,
  DONE: 3,
  CLOSED: 4,
};
export const STEPS = [
  'Tạo KH',
  'Lắp Thiết Bị',
  'Cấu Hình TB',
  'Cấu hình chuyển Ports',
  'Kiểm tra dịch vụ',
  'Hoàn Thành',
];
export const TASK_TYPE = [
  {
    label: 'Reboot POP',
    value: 'REBOOT_POP',
    color: '#3A5CCC',
    description: 'Kế Hoạch Reboot POP',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      typeRebootPOP: 'Cách Reboot POP',
      typeRun: 'Cách Thực Thi',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStart: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinish: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
    },
    group: 'Bảo Trì',
    configTitle: 'Reboot',
    apiDelete:
      'inas-infrastructure/tool-system/reboot-pop/delete-task-reboot-pop',
  },
  {
    label: 'Cấu Hình OLT Mới',
    value: 'AUTO_CONFIG_OLT',
    color: '#e91e63',

    group: 'Triển Khai Mới',

    description: 'Kế Hoạch Cấu Hình OLT',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      planDuration: 'Thời Lượng Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStartString: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinishString: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Danh Sách POP',
    },
    apiDelete: null,
  },
  {
    label: 'Thay Thế Thiết Bị Facility',
    value: 'REPLACE_DEVICE',
    color: '#50cd89',
    description: 'Kế Hoạch Thay Thế Thiết Bị Facility',
    group: 'Thay Thế',

    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      expectTimeStart: 'Thời Gian Dự Tính Thực Thi',
      expectTimeFinish: 'Thời Gian Dự Tính Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
    },
    apiDelete: null,
  },
  {
    label: 'Di Dời Metro POP',
    value: 'POP_RELOCATION_PLAN_MPOP',
    color: '#0D7D8D',
    description: 'Kế Hoạch Di Dời Metro POP',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      expectTimeStartString: 'Thời Gian Dự Tính Thực Thi',
      expectTimeFinishString: 'Thời Gian Dự Tính Kết Thúc',
      planDuration: 'Thời Lượng Thực Hiện',

      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Tên POP',
    },
    group: 'Di Dời',
    apiDelete: null,
  },
  {
    label: 'Di Dời POP',
    value: 'POP_RELOCATION_PLAN_POP',
    color: '#1bc5bd',
    description: 'Kế Hoạch Di Dời POP',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      expectTimeStartString: 'Thời Gian Dự Tính Thực Thi',
      expectTimeFinishString: 'Thời Gian Dự Tính Kết Thúc',
      planDuration: 'Thời Lượng Thực Hiện',

      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Tên POP',
    },
    group: 'Di Dời',
    apiDelete: null,
  },
  {
    label: 'Di Dời POP+',
    value: 'POP_RELOCATION_PLAN_POP_PLUS',
    color: '#72EDD1',
    description: 'Kế Hoạch Di Dời POP+',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      expectTimeStartString: 'Thời Gian Dự Tính Thực Thi',
      expectTimeFinishString: 'Thời Gian Dự Tính Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Tên POP',
      planDuration: 'Thời Lượng Thực Hiện',
    },
    group: 'Di Dời',
    apiDelete: null,
  },
  {
    label: 'Cấu Hình POP Mới',
    value: 'NEW_POP_CONFIGUARATION',
    color: '#0045FF',
    description: 'Kế Hoạch Cấu Hình POP Mới',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      expectTimeStartString: 'Thời Gian Dự Tính Thực Thi',
      expectTimeFinishString: 'Thời Gian Dự Tính Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Tên POP',
      planDuration: 'Thời Lượng Thực Hiện',
    },
    group: 'Triển Khai Mới',
    apiDelete: null,
  },
  {
    label: 'Up Switch FTI',
    value: 'UP_SWITCH_FTI',
    color: '#6697FF',
    description: 'Kế Hoạch Up Switch FTI',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      expectTimeStartString: 'Thời Gian Dự Tính Thực Thi',
      expectTimeFinishString: 'Thời Gian Dự Tính Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Tên POP',
      planDuration: 'Thời Lượng Thực Hiện',
    },
    group: 'Triển Khai Mới',
    apiDelete: null,
  },
  {
    label: 'Cấu Hình Mới Switch CE',
    value: 'CONFIG_NEW_CE_SWITCH',
    color: '#FF4956',

    group: 'Triển Khai Mới',

    description: 'Kế Hoạch Cấu Hình Mới Switch CE Huawei',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      planDuration: 'Thời Lượng Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStartString: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinishString: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      // popName: 'Danh Sách POP',

      // cePopName: 'CE POP',
      // huaweiPop: 'HW POP',
      // diPopName: 'DI POP',
      // ceModelName: 'CE Model',

      // diNameDev: 'DI',
      // links: 'Số Link',
      // linkType: 'Loại Link',
    },
    apiDelete: null,
  },
  {
    label: 'Thay Thế Switch CE',
    value: 'CONFIG_REPLACE_CE_SWITCH',
    color: '#FF4956',

    group: 'Thay Thế',
    description: 'Kế Hoạch Thay Thế Switch CE Huawei',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      planDuration: 'Thời Lượng Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStartString: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinishString: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      // popName: 'Danh Sách POP',

      // cePopName: 'CE POP',
      // huaweiPop: 'HW POP',
      // diPopName: 'DI POP',
      // ceModelName: 'CE Model',

      // diNameDev: 'DI',
      // links: 'Số Link',
      // linkType: 'Loại Link',
    },
    apiDelete: null,
  },
  {
    label: 'Thay Thế OLT (Soon)',
    value: 'CONFIG_REPLACE_OLT',
    color: '#FF4956',
    group: 'Thay Thế',
    description: 'Kế Hoạch Thay Thế OLT',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      planDuration: 'Thời Lượng Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStartString: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinishString: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Danh Sách POP',

      cePopName: 'CE POP',
      huaweiPop: 'HW POP',
      diPopName: 'DI POP',
      ceModelName: 'CE Model',

      diNameDev: 'DI',
      links: 'Số Link',
      linkType: 'Loại Link',
    },
    disabled: true,
    apiDelete: null,
  },
  {
    label: 'Cấu Hình Auto Huawei',
    value: 'AUTO_CONFIG_HW',
    color: '#e91e63',
    group: 'Triển Khai Mới',
    description: 'Kế Hoạch Cấu Hình Huawei Auto',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      planDuration: 'Thời Lượng Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStartString: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinishString: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      popName: 'Danh Sách POP',

      cePopName: 'POP CE',
      huaweiPop: 'POP Huawei',
      ceModelName: 'CE Model',
      diNameDev: 'DI Name',
      links: 'Số Link',
      linkType: 'Loại Link',
      diPopName: 'DI POP',
      ceNameDev: 'CE Name',
    },
    apiDelete: null,
  },
  {
    label: 'Cấp Phát Thiết Bị Nguồn',
    value: 'CONFIG_NEW_POWER',
    color: '#e91e63',

    group: 'Triển Khai Mới',

    description: 'Kế Hoạch Cấp Phát Thiết Bị Nguồn',
    infoLabels: {
      typeJob: 'Loại Kế Hoạch',
      scheduleRunTime: 'Thời Gian Dự Tính Thực Thi',
      jobName: 'Tên Kế Hoạch',
      planDuration: 'Thời Lượng Kế Hoạch',
      createdAt: 'Thời Gian Tạo',
      lastUpdate: 'Cập Nhật Cuối',
      timeStartString: 'Thời Gian Bắt Đầu Thực Thi',
      timeFinishString: 'Thời Gian Kết Thúc',
      taskMaker: 'Người Tạo Kế Hoạch',
      taskRunner: 'Người Thực Thi Kế Hoạch',
      status: 'Trạng Thái',
      // popName: 'Danh Sách POP',
    },
    apiDelete: null,
  },
  {
    label: 'Upgrade Uplink',
    value: 'UPGRADE_UPLINK',
    color: '#3A5CCC',
    description: 'Nâng cấp Uplink',
  },
];
export const TYPE_JOB = {
  AUTO_CONFIG_OLT: 'AUTO_CONFIG_OLT',
  CONFIG_NEW_CE_SWITCH: 'CONFIG_NEW_CE_SWITCH',
  CONFIG_NEW_POWER: 'CONFIG_NEW_POWER',
  CONFIG_REPLACE_CE_SWITCH: 'CONFIG_REPLACE_CE_SWITCH',
  CONFIG_REPLACE_OLT: 'CONFIG_REPLACE_OLT',
  REPLACE_DEVICE: 'REPLACE_DEVICE',
  REBOOT_POP: 'REBOOT_POP',
  HUAWEI: 'HUAWEI',
  POP_RELOCATION_PLAN_MPOP: 'POP_RELOCATION_PLAN_MPOP',
  POP_RELOCATION_PLAN_POP: 'POP_RELOCATION_PLAN_POP',
  POP_RELOCATION_PLAN_POP_PLUS: 'POP_RELOCATION_PLAN_POP_PLUS',
  NEW_POP_CONFIGUARATION: 'NEW_POP_CONFIGUARATION',
  AUTO_CONFIG_HW: 'AUTO_CONFIG_HW',
  UP_SWITCH_FTI: 'UP_SWITCH_FTI',
  UPGRADE_UPLINK: 'UPGRADE_UPLINK',
};
