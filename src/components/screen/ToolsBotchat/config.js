import {TYPE_ICON} from '../../../utils/icon.utils';
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

export const useColorThemeToolsBotChat = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      WHITE_COLOR: WHITE_COLOR_DARK,
      BLACK_COLOR: BLACK_COLOR_DARK,
      MAIN_COLOR: MAIN_COLOR_DARK,
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

const PROGRAMS_INF = [
  {
    label: 'Chương trình tất niên',
    value: '657a9a1d9a8ec727b14859b2',
  },
  {
    label: 'Chương trình giáng sinh',
    value: '6596a21059e63edd82dd6b93',
  },
];

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

export const TOOLS_DATA_OPTIONS = currentUser => {
  const {codeGroup, codeRole} = {
    ...currentUser,
  };

  const isAdmin =
    codeGroup?.codeGroup?.toLowerCase() === 'admin' ||
    codeRole?.toLowerCase() === 'admin';
  return [
    {
      id: 1,
      title: 'Tool AI',
      category: 'Xử lý ảnh',
      iconName: 'airbnb',
      typeIcon: TYPE_ICON.iconFontAwesome,
      router: SCREEN_NAVIGATE.ToolsAI_Screen,
      // backgroundColor: '#22a6b3',
      // backgroundIcon: '#ffffff5a',
      // colorIcon: '#fff597',
      // textColorTitle: '#fff',
      // textColorCategory: '#fff',
      // colorIconStar: '#fff',
      iconImage: require('../../../assets/images/ai_icon.png'),
    },
    {
      id: 2,
      title: 'Tools kiểm tra hạ tầng',
      category: 'Kiểm tra thông tin hạ tầng',
      iconName: 'reader-outline',
      router: SCREEN_NAVIGATE.GetInfo_Screen,
      // backgroundColor: '#3498db',
      // backgroundIcon: '#ffffff3a',
      // colorIcon: '#fff597',
      // textColorTitle: '#fff',
      // textColorCategory: '#fff',
      // colorIconStar: '#fff',
      iconImage: require('../../../assets/images/get_info_icon.png'),
      tag: ['BotChat'],
    },
    // {
    //   id: 3,
    //   title: 'Config Tools',
    //   category: 'Tools',
    //   iconName: 'cog-outline',
    //   router: SCREEN_NAVIGATE.ConfigTools_Screen,
    // },
    {
      id: 4,
      title: 'Công cụ dụng cụ',
      category: 'Quản lý tài sản',
      iconName: 'medical-outline',
      router: SCREEN_NAVIGATE.CCDC_Screen,
      // backgroundColor: '#5452ed',
      // backgroundIcon: '#ffffff5a',
      // colorIcon: '#fff597',
      // textColorTitle: '#fff',
      // textColorCategory: '#fff',
      // colorIconStar: '#fff',
      // iconImage: require('../../../assets/images/may_han_icon.png'),
    },
    {
      id: 5,
      title: 'Chương trình tất niên',
      category: 'Vui xuân Giáp Thìn 2024',
      iconName: 'scale-outline',
      router: SCREEN_NAVIGATE.Dial_Inf_Screen,
      backgroundColor: '#b71916',
      backgroundIcon: '#ffffff5a',
      colorIcon: '#fff597',
      textColorTitle: '#fff597',
      textColorCategory: '#fff597',
      colorIconStar: '#fff597',
      iconImage: require('../../../assets/images/dragon_icon.png'),
    },
    // {
    //   id: 6,
    //   title: 'Chương trình giáng sinh',
    //   category: 'Vui giáng sinh cùng INF',
    //   iconName: 'scale-outline',
    //   router: SCREEN_NAVIGATE.Merry_Christmas_Screen,
    //   backgroundColor: '#b71916',
    //   backgroundIcon: '#ffffff5a',
    //   colorIcon: '#fff597',
    //   textColorTitle: '#fff597',
    //   textColorCategory: '#fff597',
    //   colorIconStar: '#fff597',
    //   iconImage: require('../../../assets/images/mery-chirstmas-icon.png'),
    // },
    ...(isAdmin
      ? [
          {
            id: 7,
            title: 'Feature',
            category: 'Feature test',
            iconName: 'scale-outline',
            router: SCREEN_NAVIGATE.Experiment_Screen,
          },
        ]
      : []),
  ];
};
