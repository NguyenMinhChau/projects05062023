import {SafeAreaView} from 'react-native';

export const SCREEN_NAVIGATE = {
  Login_Screen: 'Đăng nhập',
  Dashboard_Screen: 'Dashboard',
  Tools_Botchat_Screen: 'Công cụ xử lý ảnh và BotChat',
  GetInfo_Screen: 'Tools kiểm tra hạ tầng - BotChat',
  ConfigGroupPoint_Screen: 'Thông tin tập điểm',
  ConfigSHD2GrPtsStt_Screen: 'Trạng thái Tập Điểm từ SHĐ',
  ConfigDeviceOfPop_Screen: 'Kiểm tra thiết bị của POP',
  ConfigPowerError_Screen: 'Các thiết bị nguồn đang lỗi trên Opsview',
  ConfigPowerInfo_Screen: 'Tình trạng nguồn của POP',
  ConfigBatteryTest_Screen: 'Thực hiện test Accu',
  ConfigPMSInfo_Screen: 'Thông tin từ thiết bị PMS',
  ConfigSirenToggle_Screen: 'Bật/Tắt còi hú POP Indoor',
  ConfigTransceiver_Screen: 'Thông tin module quang',
  ConfigPortError_Screen: 'Các port đang lỗi trên Opsview',
  ConfigCRC_Screen: 'Kiểm tra CRC của port',
  ConfigLACP_Screen: 'Trạng thái join LACP của port',
  ConfigCusOfPon_Screen: 'Thông tin khách hàng port PON',
  ConfigCusChecklist_Screen: 'Kiểm tra Checklist của KHG',
  ConfigCusModem_Screen: 'Thông tin modem KHG',
  ConfigCusService_Screen: 'Kiểm tra DV KHG',
  ConfigOntDefaultPwd_Screen: 'Lấy password default của Modem CIG',
  ConfigMacToNbVendor_Screen: 'Lấy vendor modem hàng xóm',
  ConfigTools_Screen: 'Công cụ cấu hình - BotChat',
  ConfigNewOLT_Screen: 'Cấu hình OLT mới',
  ConfigNewSWCE_Screen: 'Cấu hình Switch CE mới',
  ConfigReplaceSWCE_Screen: 'Cấu hình Switch CE thay thế',
  ConfigDelNeighbor_Screen: 'Xóa Descr port Neighbour từ TB thu hồi',
  ConfigSpeedPort_Screen: 'Cấu hình SpeedPort trên thiết bị',
  ConfigClearOLT_Screen: 'Clear Index OLT',
  ToolsAI_Screen: 'Công cụ xử lý ảnh',
  AcQuy_Screen: 'Máy đo ắc quy',
  Quang_Screen: 'Máy đo quang',
  ResultPage_Screen: 'Kết quả',
  Gallery_History_Screen: 'Lịch sử xử lý ảnh',
  Overview_Screen: 'Tổng quan',
  Branch_Screen: 'Chi nhánh',
  Tools_Config: 'Kế hoạch cấu hình',
  Tools_Config_Detail_Screen: 'Cấu hình chi tiết',
  Tools_Config_Detail_TTKH_Screen: 'Thông tin kế hoạch',
  Tools_Config_Detail_TTCH_Screen: 'Thông tin cấu hình',
  Tools_Config_Detail_Progress_Screen: 'Tiến trình thực hiện',
  Tools_Config_Detail_KQCH_Screen: 'Kết quả cấu hình',
  Info_Screen: 'Tài khoản',
  Setting_Screen: 'Cài đặt',
  Appearance_Screen: 'Chế độ hiển thị',
  MngAccess_Screen: 'Quản lý truy cập ứng dụng',
  AppInfo_Screen: 'Thông tin ứng dụng - Điều khoản',
  Management_Screen: 'Quản lý',
  Schedule_Operate_Screen: 'Lịch trực vận hành',
  Mgn_Modem_Screen: 'Quản lý thiết bị',
  Mgn_Modem_Detail_Screen: 'Xem chi tiết modem',
  Rich_Editor_Screen: 'Nhập thông tin',
  CCDC_Screen: 'Công cụ dụng cụ',
  Mgn_Moi_Han_Screen: 'Quản lý - Kiểm soát lịch sử máy hàn',
  Mgn_Moi_Han_Action_One_Screen: 'Quản lý lịch sử mối hàn định kì',
  History_Action_One_Screen: 'Danh sách quản lý lịch sử mối hàn định kì',
  Mgn_Moi_Han_Action_Two_Screen: 'Quản lý lịch sử gửi bảo hành/sửa chữa',
  History_Action_Two_Screen: 'Danh sách quản lý lịch sử gửi bảo hành/sửa chữa',
  Mgn_Moi_Han_Action_Three_Screen: 'Báo cáo lịch sử hàn nối cho xử lý sự cố',
  History_Action_Three_Screen:
    'Danh sách báo cáo lịch sử hàn nối cho xử lý sự cố',
  Mgn_Moi_Han_Action_Four_Screen:
    'Báo cáo lịch sử hàn nối cho triển khai/nâng cấp',
  Mgn_Moi_Han_ListSC_Screen: 'Danh sách SC',
  History_Action_Four_Screen:
    'Danh sách báo cáo lịch sử hàn nối cho triển khai/nâng cấp',
  Maintance_Ccdc_Screen: 'Bảo trì bảo dưỡng',
  Swap_IP_Screen: 'Swap IP',
  Swap_IP_Response_KHG_Screen: 'Phản hồi khách hàng - Swap IPv6',
  Swap_IP_List_KHG_Screen: 'Danh sách khách hàng - Swap IPv6',
  Dial_Inf_Screen: 'Chương trình tất niên INF',
  Merry_Christmas_Screen: 'Chương trình giáng sinh INF',
  Notification_Screen: 'Thông báo ứng dụng',
  // NO SEARCH
  NavPane_Screen: 'NavPane',
  Experiment_Screen: 'Experiment',
  Banner_Screen: 'Banner',
  WebView_Review_Screen: 'WebView Review',
  Main_Screen: 'Main_Screen',
  LoaderSliderCP_Screen: 'LoaderSliderCP',
};

// HOC: SafeAreaView for component
export const SafeAreaViewCP = (
  WrappedComponent,
  backgroundColorTop = 'gray',
  backgroundColorMiddle = 'gray',
  backgroundColorBottom = 'gray',
) => {
  return props => {
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: backgroundColorTop}} />
        <SafeAreaView style={{flex: 1, backgroundColor: backgroundColorMiddle}}>
          <WrappedComponent {...props} />
        </SafeAreaView>
        <SafeAreaView
          style={{flex: 0, backgroundColor: backgroundColorBottom}}
        />
      </>
    );
  };
};
