import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
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
import useAppContext from '../../../utils/hooks/useAppContext';

export const useColorThemeManagement = () => {
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

export const VIEW_OPTIONS = [
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

export const MANAGEMENT_DATA_OPTIONS = [
  {
    id: 1,
    title: 'Lịch trực vận hành',
    category: 'KTHT - INFMN',
    iconName: 'calendar-outline',
    router: SCREEN_NAVIGATE.Schedule_Operate_Screen,
    // backgroundColor: '#22a6b3',
    // backgroundIcon: '#ffffff5a',
    // colorIcon: '#fff597',
    // textColorTitle: '#fff',
    // textColorCategory: '#fff',
    // colorIconStar: '#fff',
    iconImage: require('../../../assets/images/calendar_icon.png'),
  },
  {
    id: 2,
    title: 'Quản lý thiết bị',
    category: 'INFMN',
    iconName: 'accessibility-outline',
    router: SCREEN_NAVIGATE.Mgn_Modem_Screen,
    // backgroundColor: '#487eb0',
    // backgroundIcon: '#ffffff5a',
    // colorIcon: '#fff597',
    // textColorTitle: '#fff',
    // textColorCategory: '#fff',
    // colorIconStar: '#fff',
    iconImage: require('../../../assets/images/modem_icon.png'),
  },
  {
    id: 3,
    title: 'Swap IPv6',
    category: 'INFMN',
    iconName: 'wifi-outline',
    router: SCREEN_NAVIGATE.Swap_IP_Screen,
    // backgroundColor: '#7f8fa6',
    // backgroundIcon: '#ffffff5a',
    // colorIcon: '#fff597',
    // textColorTitle: '#fff',
    // textColorCategory: '#fff',
    // colorIconStar: '#fff',
    iconImage: require('../../../assets/images/swapv6_icon.png'),
  },
];
