import useAppContext from '../../../utils/hooks/useAppContext';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../styles/colors.global';

export const useColorThemeExperiment = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      MAIN_COLOR: MAIN_COLOR_DARK,
      BACKGROUND_CARD: '#313131',
      DISABLED_COLOR: '#95959c',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      MAIN_COLOR: MAIN_COLOR,
      BACKGROUND_CARD: '#ffffff',
      DISABLED_COLOR: '#666666',
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
