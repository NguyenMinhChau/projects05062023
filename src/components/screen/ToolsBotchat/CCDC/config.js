import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {TYPE_ICON} from '../../../../utils/icon.utils';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  PRIMARY_COLOR,
  PRIMARY_COLOR_DARK,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../../styles/colors.global';

export const useColorThemeCCDC = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR_DARK,
      MAIN_COLOR: MAIN_COLOR_DARK,
      BACKGROUND_CARD: '#313131',
      TITLE_CARD_COLOR: '#ffffff',
      DESC_CARD_COLOR: '#9ca3af',
      LINK_COLOR: '#9cb2ff',
      DISABLED_COLOR: '#767676',
      ACTIVE_COLOR: '#f44061',
      VIEW_ACTIVE_COLOR: '#007aff',
      VIEW_ACTIVE_BGC_COLOR: '#313131',
      BORDER_INPUT_COLOR: 'rgba(255, 255, 255, 0.2)',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      MAIN_COLOR: MAIN_COLOR,
      BACKGROUND_CARD: '#ffffff',
      TITLE_CARD_COLOR: '#304a54',
      DESC_CARD_COLOR: '#9ca3af',
      LINK_COLOR: '#007aff',
      DISABLED_COLOR: '#666666',
      ACTIVE_COLOR: '#ee0050',
      VIEW_ACTIVE_COLOR: '#007aff',
      VIEW_ACTIVE_BGC_COLOR: '#f3f4f6',
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

export const DATA_CCDC_CONFIG = [
  {
    label: 'Quản lý - Kiểm soát lịch sử máy hàn',
    value: 'quan_ly_kiem_soat',
    iconName: 'clipboard-text-clock-outline',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.Mgn_Moi_Han_Screen,
  },
  {
    label: 'Bảo trì bảo dưỡng',
    value: 'bao_tri_bao_duong',
    iconName: 'wrench-clock',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.Maintance_Ccdc_Screen,
    noneBorderBottom: true,
  },
];
