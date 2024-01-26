import {TYPE_ICON} from '../../../utils/icon.utils';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';

export const CARD_DATA = [
  {
    id: 1,
    title: 'Kế hoạch',
    category: 'Calendar',
    iconName: 'calendar-outline',
    image: require('../../../assets/images/plan_image.png'),
    router: SCREEN_NAVIGATE.Tools_Config,
  },
  {
    id: 2,
    title: 'Công cụ',
    category: 'Tools',
    iconName: 'construct-outline',
    image: require('../../../assets/images/tools_image.png'),
    router: SCREEN_NAVIGATE.Tools_Botchat_Screen,
  },
  {
    id: 3,
    title: 'Tổng quan',
    category: 'Statistics',
    image: require('../../../assets/images/overview_image.png'),
    iconName: 'newspaper-outline',
  },
  {
    id: 4,
    title: 'Thông tin',
    category: 'KPI',
    image: require('../../../assets/images/info_image.png'),
    iconName: 'megaphone-outline',
  },
  {
    id: 5,
    title: 'Nhiệt độ',
    category: 'Management',
    image: require('../../../assets/images/temperature_image.png'),
    iconName: 'thermometer-outline',
  },
  {
    id: 6,
    title: 'Thiết bị',
    category: 'Management',
    image: require('../../../assets/images/device_image.png'),
    iconName: 'scale-outline',
  },
  {
    id: 7,
    title: 'POP',
    category: 'Management',
    iconName: 'tablet-landscape-outline',
    image: require('../../../assets/images/pop_image.png'),
  },
  {
    id: 8,
    title: 'Tham chiếu',
    category: 'KPI',
    iconName: 'file-tray-full-outline',
    image: require('../../../assets/images/reference_image.png'),
  },
  {
    id: 9,
    title: 'Phân quyền',
    category: 'Admin',
    iconName: 'shield-checkmark-outline',
    image: require('../../../assets/images/authen_image.png'),
  },
];
