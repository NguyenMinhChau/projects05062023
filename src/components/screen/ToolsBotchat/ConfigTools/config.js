import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';

export const TAB_OPTIONS = [
  {
    id: 1,
    label: 'Cấu hình',
    value: 'config',
    title: 'cấu hình',
  },
  {
    id: 2,
    label: 'Xem lịch sử',
    value: 'history',
    title: 'lịch sử',
  },
];

export const DATA_TOOLS_CONFIG = [
  {
    label: 'Cấu hình OLT mới',
    iconName: 'cog-outline',
    router: SCREEN_NAVIGATE.ConfigNewOLT_Screen,
  },
  {
    label: 'Cấu hình SW CE mới',
    iconName: 'cog-outline',
    router: SCREEN_NAVIGATE.ConfigNewSWCE_Screen,
  },
  {
    label: 'Cấu hình SW CE thay thế',
    iconName: 'git-compare-outline',
    router: SCREEN_NAVIGATE.ConfigReplaceSWCE_Screen,
  },
  {
    label: 'Xóa Descr port Neighbour từ TB thu hồi',
    iconName: 'close-circle-outline',
    router: SCREEN_NAVIGATE.ConfigDelNeighbor_Screen,
  },
  {
    label: 'Cấu hình SpeedPort trên thiết bị',
    iconName: 'cog-outline',
    router: SCREEN_NAVIGATE.ConfigSpeedPort_Screen,
  },
  {
    label: 'Clear Index OLT',
    iconName: 'close-circle-outline',
    router: SCREEN_NAVIGATE.ConfigClearOLT_Screen,
    noneBorderBottom: true,
  },
];

export const TOOLS_CONFIG_OPTIONS = [
  {
    id: 1,
    label: 'Cấu hình OLT mới',
    value: '/NewOltConfig',
  },
  {
    id: 2,
    label: 'Cấu hình SW CE mới',
    value: '/NewCeSwConfig',
  },
  {
    id: 3,
    label: 'Cấu hình SW CE thay thế',
    value: '/CeSwReplacementConfig',
  },
  {
    id: 4,
    label: 'Xóa Descr port Neighbour từ TB thu hồi',
    value: '/NeighPortDescrRemove',
  },
  {
    id: 5,
    label: 'Cấu hình SpeedPort trên thiết bị',
    value: '/SpeedPortConfig',
  },
  {
    id: 6,
    label: 'Clear Index OLT',
    value: '/ClearIndex',
  },
];
