import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import {IconCP} from '../../../utils/icon.utils';

import useAppContext from '../../../utils/hooks/useAppContext';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  PRIMARY_COLOR,
  WARNING_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../styles/colors.global';

const SIZE_ICON = 25;

export const useColorThemeToolsDetail = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR,
      WARNING_COLOR: WARNING_COLOR,
      BACKGROUND_CARD: '#313131',
      BACKGROUND_CONNECT: '#1c1c1c',
      BACKGROUND_CHECK_SERVICE: '#22242f',
      ITEM_TITLE_TEXT_CHECK_SERVICE: '#ffffff',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      WARNING_COLOR: WARNING_COLOR,
      BACKGROUND_CARD: '#FFFFFF',
      BACKGROUND_CONNECT: '#f9fafb',
      BACKGROUND_CHECK_SERVICE: '#f9fafb',
      ITEM_TITLE_TEXT_CHECK_SERVICE: '#243c7c',
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

export const routersKey = {
  TTKH: 'TTKH',
  TTCH: 'TTCH',
  Progess: 'Progess',
  KQCH: 'KQCH',
};

export const routersConfigOLT = index => {
  const {colors} = useColorThemeToolsDetail();
  return [
    {
      key: routersKey.TTKH,
      title: 'TTKH',
      icon: (
        <IconCP
          name="document-text-outline"
          size={SIZE_ICON}
          color={index === 0 ? colors.PRIMARY_COLOR : colors.BLACK_COLOR}
        />
      ),
      //badge: true, // show a dot: boolean || number
    },
    {
      key: routersKey.TTCH,
      title: 'TTCH',
      icon: (
        <IconCP
          name="settings-outline"
          size={SIZE_ICON}
          color={index === 1 ? colors.PRIMARY_COLOR : colors.BLACK_COLOR}
        />
      ),
      badge: false,
    },
    {
      key: routersKey.KQCH,
      title: 'KQCH',
      icon: (
        <IconCP
          name="speedometer-outline"
          size={SIZE_ICON}
          color={index === 2 ? colors.PRIMARY_COLOR : colors.BLACK_COLOR}
        />
      ),
      badge: false,
    },
  ];
};

export const STATUS_COLOR = {
  WAITING: {
    color: 'orange',
    icon: 'lucide:hourglass',
  },
  EXECUTING: {
    color: 'secondary',
    icon: 'lucide:more-horizontal',
  },
  RUNNING: {
    color: 'warning',
    icon: 'lucide:zap',
  },
  DONE: {
    color: 'success',
    icon: 'lucide:check-circle',
  },
  CLOSE: {
    color: 'error',
    icon: 'lucide:shield-close',
  },
  CHECK_SERVICE_OK: {
    colorCustom: '#5375e5',
    icon: 'lucide:check-circle',
  },
  CHECK_SERVICE_NOK: {
    colorCustom: '#5375e5',
    icon: 'lucide:check-circle',
  },
  CONFIG_OK: {
    color: 'secondary',
    icon: 'lucide:check-circle',
  },
};

export const STATUS_OPTIONS = [
  {
    label: 'Chưa Thực Thi',
    value: 'WAITING',
    color: 'orange',
  },
  {
    label: 'Đang Thực Thi',
    value: 'RUNNING',
    color: 'warning',
  },
  {
    label: 'Đã Thực Thi',
    value: 'DONE',
    color: 'success',
  },
  {
    label: 'Đang Cấu Hình Thiết Bị',
    value: 'EXECUTING',
    color: 'secondary',
    enabled: ['AUTO_CONFIG_OLT'],
  },
  {
    label: 'Đã Đóng',
    value: 'CLOSE',
    color: 'error',
    enabled: ['AUTO_CONFIG_OLT'],
  },
  {
    label: 'Check Dịch Vụ',
    value: 'CHECK_SERVICE_OK',
    color: '#5375e5',
    enabled: ['CONFIG_REPLACE_CE_SWITCH'],
  },
];

export const STEP_CODE = {
  WAITING: 0,
  EXECUTING: 1,
  RUNNING: 2,
  DONE: 3,
  CLOSED: 4,
};

export const STEP_CODE_REPLACE_CE = {
  WAITING: 0,
  RUNNING: 1,
  EXECUTING: 2,
  CONFIG_OK: 2,
  CHECK_SERVICE_OK: 3,
  CHECK_SERVICE_NOK: 3,
  DONE: 4,
};

export const STEP_CODE_VIE_CONFIG = [
  {
    label: 'WAITING',
    value: 'Chưa Thực Thi',
  },
  {
    label: 'EXECUTING',
    value: 'Đang Thực Thi',
  },
  {
    label: 'RUNNING',
    value: 'Đang Thực Thi',
  },
  {
    label: 'DONE',
    value: 'Đã Thực Thi',
  },
  {
    label: 'CLOSE',
    value: 'Đã Đóng',
  },
  {
    label: 'CONFIG_OK',
    value: 'Cấu Hình TB Thành Công',
  },
  {
    label: 'CHECK_SERVICE_OK',
    value: 'Check Dịch Vụ Thành Công',
  },
  {
    label: 'CHECK_SERVICE_NOK',
    value: 'Check Dịch Vụ Không Thành Công',
  },
];

export const STEP_CODE_RESULT_VIE_CONFIG = [
  {
    label: 'OK',
    value: 'Thành Công',
  },
  {
    label: 'NOT OK',
    value: 'Không Thành Công',
  },
];

export const STEPS_REPLACE_CE = [
  'Tạo KH',
  'Lắp Thiết Bị',
  'Cấu Hình TB',
  'Kiểm tra dịch vụ',
  'Hoàn Thành',
];
export const STEPS = ['Tạo KH', 'Lắp Thiết Bị', 'Cấu Hình TB', 'Hoàn Thành'];

export const STEPS_REBOOT_POP = ['Tạo KH', 'Reboot POP', 'Hoàn Thành'];

export const STEPS_UPGRADE_LINK = ['Tạo KH', 'Cấu hình TB', 'Hoàn Thành'];

export const getColorResultTaskStatus = (resultStatus, taskStatus) => {
  const {colors} = useColorThemeToolsDetail();
  const color =
    resultStatus === 'NOT OK'
      ? '#f34b4b'
      : taskStatus === 'EXECUTING'
      ? '#f39c12'
      : taskStatus === 'RUNNING'
      ? '#f34b4b'
      : colors.BLACK_COLOR;
  return color;
};

export const getColorFillCircleActiveProgress = (resultStatus, taskStatus) => {
  const fill =
    resultStatus === 'NOT OK'
      ? '#f34b4b'
      : taskStatus === 'EXECUTING'
      ? '#f39c12'
      : taskStatus === 'RUNNING'
      ? '#f34b4b'
      : taskStatus === 'CLOSED'
      ? '#43a047'
      : '#43a047';
  return fill;
};

export const getMessageResultStatus = (
  resultStatus,
  taskStatus,
  messageDevice,
) => {
  const fMessage =
    resultStatus === 'NOT OK' && !taskStatus.includes('CHECK_SERVICE')
      ? messageDevice
      : taskStatus === 'EXECUTING' || taskStatus === 'RUNNING'
      ? 'Cấu hình thiết bị'
      : '';
  return fMessage;
};

export const getStepActive = (step, val) => {
  return step === val ? true : false;
};
