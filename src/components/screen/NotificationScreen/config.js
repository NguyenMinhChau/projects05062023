import {TYPE_ICON} from '../../../utils/icon.utils';

export const OPTIONS_FILTER = [
  {
    label: 'Tất cả',
    value: 'all',
    iconName: 'file-tray-full-outline',
  },
  {
    label: 'Đã đọc',
    value: 'read',
    iconName: 'notifications-outline',
  },
  {
    label: 'Chưa đọc',
    value: 'no_read',
    iconName: 'bell-badge-outline',
    typeIcon: TYPE_ICON.iconMaterial,
  },
];

export const DATA_MOCK_NOTIFICATION = [
  {
    _id: '',
    value: {
      image_url: '',
      title: 'Xử lý ảnh máy hàn quang',
      sub_title: 'Kỹ thuật mạng ngoại vi',
    },
    tab_active: '',
    redirect_to: 'Lịch sử xử lý ảnh',
    createdAt: new Date(),
    read: true,
  },
  {
    _id: '',
    value: {
      image_url: '',
      title: 'Kế hoạch bảo trì hệ thống',
      sub_title: 'Phương Nam',
    },
    tab_active: '',
    redirect_to: 'Kế hoạch cấu hình',
    createdAt: new Date(),
    read: false,
  },
];
