import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  CRITICAL_COLOR,
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../../styles/colors.global';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {TYPE_ICON} from '../../../../utils/icon.utils';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';

export const useColorThemeSwapIP = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      MAIN_COLOR: MAIN_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR,
      ACTIVE_COLOR: '#f44061',
      BACKGROUND_CARD: '#313131',
      SUCCESS_COLOR: '#42a046',
      BORDER_INPUT_COLOR: 'rgba(255, 255, 255, 0.2)',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      MAIN_COLOR: MAIN_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      ACTIVE_COLOR: '#ee0050',
      BACKGROUND_CARD: '#FFFFFF',
      SUCCESS_COLOR: '#42a046',
      BORDER_INPUT_COLOR: 'rgba(0,0,0,0.3)',
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

export const DATA_SWAP_IP_CONFIG = [
  {
    label: 'Phản hồi KHG Swap IPv6',
    value: 'phan_hoi_khg',
    iconName: 'refresh-outline',
    router: SCREEN_NAVIGATE.Swap_IP_Response_KHG_Screen,
  },
  {
    label: 'Danh sách khách hàng Swap IPv6',
    value: 'danh_sach_khg',
    iconName: 'newspaper-outline',
    router: SCREEN_NAVIGATE.Swap_IP_List_KHG_Screen,
    noneBorderBottom: true,
  },
];

export const PLUGINS_TYPE = [
  {
    label: 'Enable',
    value: 'enable',
    color: SUCCESS_COLOR,
  },
  {
    label: 'Disable',
    value: 'disable',
    color: CRITICAL_COLOR,
  },
];
