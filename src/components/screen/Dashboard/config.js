import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  PRIMARY_COLOR,
  PRIMARY_COLOR_DARK,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../styles/colors.global';

export const VIEW_OPTIONS_NEW_FEED = [
  {
    id: 1,
    iconName: 'list-outline',
    sizeIcon: 26,
    view: 'view_1',
  },
  {
    id: 2,
    iconName: 'apps-outline',
    sizeIcon: 20,
    view: 'view_2',
  },
];

export const useColorThemeDashboard = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      MAIN_COLOR: MAIN_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR_DARK,
      BACKGROUND_CARD: '#313131',
      TITLE_CARD_COLOR: '#ffffff',
      DESC_CARD_COLOR: '#9ca3af',
      LINK_COLOR: '#9cb2ff',
      DISABLED_COLOR: '#767676',
      ACTIVE_COLOR: '#f44061',
      VIEW_ACTIVE_COLOR: '#007aff',
      VIEW_ACTIVE_BGC_COLOR: '#313131',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      MAIN_COLOR: MAIN_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      BACKGROUND_CARD: '#ffffff',
      TITLE_CARD_COLOR: '#304a54',
      DESC_CARD_COLOR: '#9ca3af',
      LINK_COLOR: '#007aff',
      DISABLED_COLOR: '#666666',
      ACTIVE_COLOR: '#ee0050',
      VIEW_ACTIVE_COLOR: '#007aff',
      VIEW_ACTIVE_BGC_COLOR: '#f3f4f6',
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
