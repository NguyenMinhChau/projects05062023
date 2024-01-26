import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {
  BLACK_COLOR,
  BLACK_COLOR_DARK,
  PRIMARY_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_DARK,
} from '../../../../styles/colors.global';
import useAppContext from '../../../../utils/hooks/useAppContext';

export const TAB_OPTIONS = [
  {
    id: 1,
    label: 'Xem theo ngày',
    value: 'view_1',
  },
  {
    id: 2,
    label: 'Xem theo giờ',
    value: 'view_2',
  },
];

export const useColorThemeScheduleOperator = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      PRIMARY_COLOR: PRIMARY_COLOR,
      BACKGROUND_CARD: '#313131',
      CA_SANG: '#ffce31',
      CA_TOI: '#7f8c8d',
      DAY_OFF: '#e74c3c9a',
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      WHITE_COLOR: WHITE_COLOR,
      BLACK_COLOR: BLACK_COLOR,
      PRIMARY_COLOR: PRIMARY_COLOR,
      BACKGROUND_CARD: '#FFFFFF',
      STEPPER_TEXT_LEFT_COLOR: PRIMARY_COLOR,
      STEPPER_PRIMARY_COLOR: PRIMARY_COLOR,
      CA_SANG: '#ffce31',
      CA_TOI: '#7f8c8d',
      DAY_OFF: '#e74c3c9a',
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

export const SCHEDULE_OPERATOR_LIST = ['CA_SANG', 'CA_TOI'];

export const useHandleColorScheduleOperator = (eventType, colors) => {
  switch (eventType) {
    case 'CA_SANG':
    case 'Ca Sáng':
      return colors.CA_SANG;
    case 'CA_TOI':
    case 'Ca Tối':
      return colors.CA_TOI;
    default:
      return '#40739e';
  }
};

export const SCHEDULE_OPERATOR_TYPE = [
  {
    label: 'Ca Sáng',
    value: 'CA_SANG',
    color: '#FFC107',
  },
  {
    label: 'Ca Chiều',
    value: 'CA_TOI',
    color: '#3A5CCC',
  },
];

export const TYPE_SCHEDULE = {
  CA_SANG: 'CA_SANG',
  CA_TOI: 'CA_TOI',
};
