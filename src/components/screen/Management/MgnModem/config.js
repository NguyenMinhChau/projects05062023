import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  PRIMARY_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../../styles/colors.global';

export const VIEW_OPTIONS_MGN_MODEM = [
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

export const useColorThemeMgnModem = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR,
      BACKGROUND_CARD: '#313131',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      BACKGROUND_CARD: '#FFFFFF',
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
