import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
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
import {Platform} from 'react-native';

export const useColorThemeSetting = () => {
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

export const DATA_SETTING_CONFIG = [
  {
    label: 'Tài khoản',
    iconName: 'person-outline',
    router: SCREEN_NAVIGATE.Info_Screen,
  },
  {
    label: 'Giao diện',
    iconName: 'phone-portrait-outline',
    router: SCREEN_NAVIGATE.Appearance_Screen,
  },
  {
    label: 'Quản lý truy cập',
    iconName: 'accessibility-outline',
    router: SCREEN_NAVIGATE.MngAccess_Screen,
  },
  {
    label: 'Thông tin ứng dụng',
    iconName: 'information-circle-outline',
    router: SCREEN_NAVIGATE.AppInfo_Screen,
    noneBorderBottom: true,
  },
];
export const DATA_SETTING_APP_INFO_CONFIG = [
  {
    label: 'Điều khoản sử dụng',
    name_file: 'Dieu_khoan_su_dung_ICDP_APP.pdf',
    iconName: 'information-circle-outline',
    urlWeb: 'http://1.52.246.101:4000/assets/PrivacyPolicy.pdf',
  },
  {
    label: 'Hướng dẫn sử dụng',
    name_file: 'Huong_dan_su_dung_ICDP_APP.pdf',
    iconName: 'receipt-outline',
    urlWeb: 'http://1.52.246.101:4000/assets/ConditionPolicy.pdf',
  },
  {
    label: 'Câu hỏi thường gặp',
    iconName: 'help-circle-outline',
    urlWeb: '',
    noneBorderBottom: true,
  },
];
