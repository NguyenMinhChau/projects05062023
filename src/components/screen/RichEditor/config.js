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
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import useAppContext from '../../../utils/hooks/useAppContext';

export const useColorThemeRichEditor = () => {
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

export const optionsImageLibrary = {
  title: 'Select Photo',
  mediaType: 'photo',
  multiple: false,
  selectionLimit: 1,
  includeBase64: true,
};

export const optionsLaunchCamera = {
  title: 'Take Photo',
  mediaType: 'photo',
  includeBase64: true,
};

export const optionsVideoLibrary = {
  title: 'Select Video',
  mediaType: 'video',
  multiple: false,
  selectionLimit: 1,
  includeBase64: true,
};

export const DATA_COLOR = [
  'transparent',
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#FF5733',
  '#3498db',
  '#2ecc71',
  '#e74c3c',
  '#9b59b6',
  '#f39c12',
  '#1abc9c',
  '#d35400',
  '#7f8c8d',
  '#27ae60',
  '#FF6347',
  '#1e90ff',
  '#00ff7f',
  '#cd5c5c',
  '#8a2be2',
  '#ffd700',
  '#008080',
  '#ff4500',
  '#bdb76b',
  '#32cd32',
  '#8b0000',
  '#483D8B',
  '#FF1493',
  '#556B2F',
  '#9932CC',
  '#20B2AA',
  '#FFD700',
  '#ADFF2F',
  '#8B008B',
  '#00BFFF',
  '#FF00FF',
];
