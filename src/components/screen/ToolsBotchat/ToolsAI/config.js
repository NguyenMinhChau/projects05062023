import {TYPE_ICON} from '../../../../utils/icon.utils';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';

export const DATA_TOOLS_AI_CONFIG = [
  {
    label: 'Máy đo ắc quy',
    value: 'ac_quy',
    iconName: 'car-battery',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.AcQuy_Screen,
  },
  {
    label: 'Máy đo quang',
    value: 'quang',
    iconName: 'fuel-cell',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.Quang_Screen,
  },
  {
    label: 'Lịch sử xử lý',
    value: 'history',
    iconName: 'clipboard-text-clock-outline',
    typeIcon: TYPE_ICON.iconMaterial,
    router: SCREEN_NAVIGATE.Gallery_History_Screen,
    noneBorderBottom: true,
  },
];

export const CLASS_TYPE_OPTIONS = [
  {label: 'OK', value: 'ok'},
  {label: 'NOT OK', value: 'not ok'},
];

export const TYPE_IMAGE_OPTIONS = [
  {label: 'Ắc Quy', value: 'ACCU'},
  {label: 'Quang', value: 'QUANG'},
];

export const IS_VIEW_OPTIONS = [
  {label: 'Saved', value: 'true'},
  {label: 'No Saved', value: 'false'},
];

export const PARSE_MESSAGE = {
  far: {
    reason: 'Ảnh quá xa',
    recommend: 'Chụp ảnh gần hơn',
  },
  light: {
    reason: 'Ảnh quá sáng',
    recommend: 'Ảnh cần giảm bớt độ chói',
  },
  rotated: {
    reason: 'Ảnh bị nghiêng',
    recommend: 'Cần xoay ảnh lại đúng chiều',
  },
  blur: {
    reason: 'Ảnh bị mờ',
    recommend: 'Cần chụp ảnh rõ nét hơn',
  },
  image_invalid: {
    reason: 'Ảnh không hợp lệ',
    recommend: 'Ảnh sai quy định, cần chụp ảnh vào màn hình máy đo',
  },
};

export const MESSAGE_STATUS_VIE_CONFIG = [
  {
    label: 'good_image',
    description: 'Ảnh tốt',
  },
  {
    label: 'good image',
    description: 'Ảnh tốt',
  },
  {
    label: 'good',
    description: 'Ảnh tốt',
  },
  {
    label: 'far',
    description: 'Ảnh ở xa',
  },
  {
    label: 'blur',
    description: 'Ảnh bị mờ',
  },
  {
    label: 'light',
    description: 'Ảnh bị chói',
  },
  {
    label: 'rotated',
    description: 'Ảnh bị nghiêng/xoay',
  },
  {
    label: 'image_invalid',
    description: 'Ảnh không hợp lệ',
  },
  {
    label: 'image invalid',
    description: 'Ảnh không hợp lệ',
  },
  {
    label: 'no wave detected',
    description: 'Không phát hiện wave',
  },
  {
    label: 'no zones detected',
    description: 'Không phát hiện vùng quét',
  },
  {
    label: 'no screen detected',
    description: 'Không phát hiện vùng quét',
  },
];
