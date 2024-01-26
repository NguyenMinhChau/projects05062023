import useAppContext from '../../utils/hooks/useAppContext';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  PRIMARY_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../styles/colors.global';

export const useColorThemeGeneral = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      BACKGROUND_CARD: '#313131',
      STEPPER_TEXT_LEFT_COLOR: '#1e90ff',
      STEPPER_STEP_COLOR: '#1e90ff',
      ACTIVE_COLOR: '#32ff7e',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      BACKGROUND_CARD: '#ffffff',
      STEPPER_TEXT_LEFT_COLOR: PRIMARY_COLOR,
      STEPPER_STEP_COLOR: PRIMARY_COLOR,
      ACTIVE_COLOR: '#3ae374',
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
