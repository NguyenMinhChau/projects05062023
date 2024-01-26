import {SCREEN_NAVIGATE} from './General.config';
import Banner from '../screen/Banner/Banner';
import Login from '../screen/Login/Login';
import NavPane from '../screen/NavPane/NavPane';
import ResultPage from '../screen//ToolsBotchat/ToolsAI/ResultPage/ResultPage';
import ToolsConfigDetail from '../screen/ToolsConfigDetail';
import TTKH from '../screen/ToolsConfigDetail/TTKH/TTKH';
import TTCH from '../screen/ToolsConfigDetail/TTCH/TTCH';
import Progress from '../screen/ToolsConfigDetail/Progress/Progress';
import KQCH from '../screen/ToolsConfigDetail/KQCH/KQCH';
import AppearanceScreen from '../screen/Setting/Appearance';
import TabBottomCP from '../routersRender/TabBottomCP';
import LoaderSliderCP from '../LoaderApp/LoaderSlider';
import MgnAccessScreen from '../screen/Setting/MgnAccess';
import AppInfoScreen from '../screen/Setting/AppInfo';
import WebViewReviewScreen from '../screen/WebViewReview/WebViewReview';
import GalleryHistoryScreen from '../screen/ToolsBotchat/ToolsAI/GalleryHistory/GalleryHistory';
import ToolsAIScreen from '../screen/ToolsBotchat/ToolsAI/ToolsAI';
import GetInfoScreen from '../screen/ToolsBotchat/GetInfo/GetInfo';
import ConfigToolsScreen from '../screen/ToolsBotchat/ConfigTools/ConfigTools';
import InfoScreen from '../screen/Setting/Info/Info';
import ConfigNewOLTScreen from '../screen/ToolsBotchat/ConfigTools/ConfigNewOLT';
import ConfigNewSWCEScreen from '../screen/ToolsBotchat/ConfigTools/ConfigNewSWCE';
import ConfigReplaceSWCEScreen from '../screen/ToolsBotchat/ConfigTools/ConfigReplaceSWCE';
import ConfigDelNeighborScreen from '../screen/ToolsBotchat/ConfigTools/ConfigDelNeighbor';
import ConfigSpeedPortScreen from '../screen/ToolsBotchat/ConfigTools/ConfigSpeedPort';
import ConfigClearOLTScreen from '../screen/ToolsBotchat/ConfigTools/ConfigClearOLT';
import ConfigGroupPointScreen from '../screen/ToolsBotchat/GetInfo/Device/GroupPoint';
import ConfigDeviceOfPopScreen from '../screen/ToolsBotchat/GetInfo/Device/DeviceOfPop';
import ConfigPortErrorScreen from '../screen/ToolsBotchat/GetInfo/Port/PortError';
import ConfigPowerErrorScreen from '../screen/ToolsBotchat/GetInfo/Device/PowerError';
import ConfigPowerInfoScreen from '../screen/ToolsBotchat/GetInfo/Device/PowerInfo';
import ConfigBatteryTestScreen from '../screen/ToolsBotchat/GetInfo/Device/BatteryTest';
import ConfigPMSInfoScreen from '../screen/ToolsBotchat/GetInfo/Device/PMSInfo';
import ConfigSirenToggleScreen from '../screen/ToolsBotchat/GetInfo/Device/SirenToggle';
import ConfigTransceiverScreen from '../screen/ToolsBotchat/GetInfo/Port/Transceiver';
import ConfigCRCScreen from '../screen/ToolsBotchat/GetInfo/Port/CRC';
import ConfigLACPScreen from '../screen/ToolsBotchat/GetInfo/Port/LACP';
import ConfigCusOfPonScreen from '../screen/ToolsBotchat/GetInfo/Port/CusOfPon';
import ConfigCusChecklistScreen from '../screen/ToolsBotchat/GetInfo/Customer/CusChecklist';
import ConfigCusModemScreen from '../screen/ToolsBotchat/GetInfo/Customer/CusModem';
import ConfigCusServiceScreen from '../screen/ToolsBotchat/GetInfo/Customer/CusService';
import ConfigOntDefaultPwdScreen from '../screen/ToolsBotchat/GetInfo/Customer/OntDefaultPwd';
import ConfigMacToNbVendorScreen from '../screen/ToolsBotchat/GetInfo/Customer/MacToNbVendor';
import ConfigSHD2GrPtsSttScreen from '../screen/ToolsBotchat/GetInfo/Device/SHD2GrPtsStt';
import AcQuyScreen from '../screen/ToolsBotchat/ToolsAI/AcQuy/AcQuy';
import QuangScreen from '../screen/ToolsBotchat/ToolsAI/Quang/Quang';
import ScheduleOperateScreen from '../screen/Management/ScheduleOperate/ScheduleOperate';
import ExperimentScreen from '../screen/Experiment/Experiment';
import MgnModemScreen from '../screen/Management/MgnModem/MgnModem';
import MgnModemDetailScreen from '../screen/Management/MgnModem/MgnModemDetail';
import RichEditorScreen from '../screen/RichEditor/RichEditor';
import CCDCScreen from '../screen/ToolsBotchat/CCDC/CCDC';
import MaintanceScreen from '../screen/ToolsBotchat/CCDC/Maintance/Maintance';
import MgnMoiHanScreen from '../screen/ToolsBotchat/CCDC/MgnMoiHan/MgnMoiHan';
import ScreenActionOne from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionOne/ScreenActionOne';
import ScreenActionTwo from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionTwo/ScreenActionTwo';
import ScreenActionThree from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionThree/ScreenActionThree';
import ScreenActionFour from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionFour/ScreenActionFour';
import HistoryActionOneScreen from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionOne/History';
import HistoryActionTwoScreen from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionTwo/History';
import HistoryActionThreeScreen from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionThree/History';
import HistoryActionFourScreen from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionFour/History';
import ListSCScreen from '../screen/ToolsBotchat/CCDC/MgnMoiHan/ScreenActionThree/ListSC';
import DialINFScreen from '../screen/ToolsBotchat/DialINF/DialINF';
import MerryChristMasScreen from '../screen/ToolsBotchat/MerryChristmas/MerryChristmas';
import ResponseKHGScreen from '../screen/Management/SwapIP/ResponseKHG/ResponseKHG';
import ListKHGScreen from '../screen/Management/SwapIP/ListKHG/ListKHG';
import SwapIPScreen from '../screen/Management/SwapIP/SwapIp';
import NotificationScreen from '../screen/NotificationScreen/NotificationScreen';

const {
  Login_Screen,
  NavPane_Screen,
  Banner_Screen,
  ResultPage_Screen,
  Gallery_History_Screen,
  GetInfo_Screen,
  ConfigGroupPoint_Screen,
  ConfigSHD2GrPtsStt_Screen,
  ConfigDeviceOfPop_Screen,
  ConfigPowerError_Screen,
  ConfigPowerInfo_Screen,
  ConfigBatteryTest_Screen,
  ConfigPMSInfo_Screen,
  ConfigSirenToggle_Screen,
  ConfigTransceiver_Screen,
  ConfigPortError_Screen,
  ConfigCRC_Screen,
  ConfigLACP_Screen,
  ConfigCusOfPon_Screen,
  ConfigCusChecklist_Screen,
  ConfigCusModem_Screen,
  ConfigCusService_Screen,
  ConfigOntDefaultPwd_Screen,
  ConfigMacToNbVendor_Screen,
  ConfigTools_Screen,
  ConfigNewOLT_Screen,
  ConfigNewSWCE_Screen,
  ConfigReplaceSWCE_Screen,
  ConfigDelNeighbor_Screen,
  ConfigSpeedPort_Screen,
  ConfigClearOLT_Screen,
  ToolsAI_Screen,
  AcQuy_Screen,
  Quang_Screen,
  Tools_Config_Detail_Screen,
  Tools_Config_Detail_TTKH_Screen,
  Tools_Config_Detail_TTCH_Screen,
  Tools_Config_Detail_Progress_Screen,
  Tools_Config_Detail_KQCH_Screen,
  Appearance_Screen,
  MngAccess_Screen,
  AppInfo_Screen,
  Info_Screen,
  Schedule_Operate_Screen,
  Mgn_Modem_Screen,
  Mgn_Modem_Detail_Screen,
  Rich_Editor_Screen,
  CCDC_Screen,
  Mgn_Moi_Han_Screen,
  Mgn_Moi_Han_Action_One_Screen,
  History_Action_One_Screen,
  Mgn_Moi_Han_Action_Two_Screen,
  History_Action_Two_Screen,
  Mgn_Moi_Han_Action_Three_Screen,
  History_Action_Three_Screen,
  Mgn_Moi_Han_ListSC_Screen,
  Mgn_Moi_Han_Action_Four_Screen,
  History_Action_Four_Screen,
  Maintance_Ccdc_Screen,
  Swap_IP_Screen,
  Swap_IP_Response_KHG_Screen,
  Swap_IP_List_KHG_Screen,
  Dial_Inf_Screen,
  Merry_Christmas_Screen,
  Notification_Screen,
  Experiment_Screen,
  WebView_Review_Screen,
  Main_Screen,
  LoaderSliderCP_Screen,
} = SCREEN_NAVIGATE;

export const TabHomeStackRouterObj = [
  {
    screen: Login,
    screen_name: Login_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: NavPane,
    screen_name: NavPane_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: Banner,
    screen_name: Banner_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ResultPage,
    screen_name: ResultPage_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: GalleryHistoryScreen,
    screen_name: Gallery_History_Screen,
    key_words: ['lich su xu ly anh', 'lich su quet anh', 'gallery history'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: GetInfoScreen,
    screen_name: GetInfo_Screen,
    key_words: ['lay thong tin', 'lay thong tin bot chat', 'get info'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigGroupPointScreen,
    screen_name: ConfigGroupPoint_Screen,
    key_words: ['lay thong tin tap diem', 'tap diem', 'group point'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigSHD2GrPtsSttScreen,
    screen_name: ConfigSHD2GrPtsStt_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigDeviceOfPopScreen,
    screen_name: ConfigDeviceOfPop_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigPowerErrorScreen,
    screen_name: ConfigPowerError_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigPowerInfoScreen,
    screen_name: ConfigPowerInfo_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigBatteryTestScreen,
    screen_name: ConfigBatteryTest_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigPMSInfoScreen,
    screen_name: ConfigPMSInfo_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigSirenToggleScreen,
    screen_name: ConfigSirenToggle_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigTransceiverScreen,
    screen_name: ConfigTransceiver_Screen,
    key_words: ['lay thong tin module quang', 'module quang', 'transceiver'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigPortErrorScreen,
    screen_name: ConfigPortError_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigCRCScreen,
    screen_name: ConfigCRC_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigLACPScreen,
    screen_name: ConfigLACP_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigCusOfPonScreen,
    screen_name: ConfigCusOfPon_Screen,
    key_words: [
      'lay thong tin khg port pon',
      'khg port pon',
      'khach hang port pon',
    ],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigCusChecklistScreen,
    screen_name: ConfigCusChecklist_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigCusModemScreen,
    screen_name: ConfigCusModem_Screen,
    key_words: ['lay thong tin modem khg', 'modem khg', 'modem khach hang'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigCusServiceScreen,
    screen_name: ConfigCusService_Screen,
    key_words: [
      'lay thong tin dich vu khg',
      'dich vu khg',
      'dich vu khach hang',
    ],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigOntDefaultPwdScreen,
    screen_name: ConfigOntDefaultPwd_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigMacToNbVendorScreen,
    screen_name: ConfigMacToNbVendor_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigToolsScreen,
    screen_name: ConfigTools_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigNewOLTScreen,
    screen_name: ConfigNewOLT_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigNewSWCEScreen,
    screen_name: ConfigNewSWCE_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigReplaceSWCEScreen,
    screen_name: ConfigReplaceSWCE_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigDelNeighborScreen,
    screen_name: ConfigDelNeighbor_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigSpeedPortScreen,
    screen_name: ConfigSpeedPort_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ConfigClearOLTScreen,
    screen_name: ConfigClearOLT_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ToolsAIScreen,
    screen_name: ToolsAI_Screen,
    key_words: ['tools xu ly anh', 'lich su xu ly anh'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: AcQuyScreen,
    screen_name: AcQuy_Screen,
    key_words: ['may do ac quy', 'do ac quy'],
    value: 'ac_quy',
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: QuangScreen,
    screen_name: Quang_Screen,
    key_words: ['may do quang', 'do quang'],
    value: 'quang',
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ToolsConfigDetail,
    screen_name: Tools_Config_Detail_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: TTKH,
    screen_name: Tools_Config_Detail_TTKH_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: TTCH,
    screen_name: Tools_Config_Detail_TTCH_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: Progress,
    screen_name: Tools_Config_Detail_Progress_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: KQCH,
    screen_name: Tools_Config_Detail_KQCH_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: AppearanceScreen,
    screen_name: Appearance_Screen,
    key_words: ['giao dien', 'display', 'appearance', 'dark mode'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: MgnAccessScreen,
    screen_name: MngAccess_Screen,
    key_words: ['quan ly truy cap icdp'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: AppInfoScreen,
    screen_name: AppInfo_Screen,
    key_words: ['thong tin ung dung icdp', 'info app'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: InfoScreen,
    screen_name: Info_Screen,
    key_words: ['profile', 'tai khoan', 'thong tin ca nhan'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ScheduleOperateScreen,
    screen_name: Schedule_Operate_Screen,
    key_words: ['schedule operator', 'lich truc van hanh'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: MgnModemScreen,
    screen_name: Mgn_Modem_Screen,
    key_words: ['modem', 'quan ly modem', 'quan ly thiet bi'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: MgnModemDetailScreen,
    screen_name: Mgn_Modem_Detail_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: RichEditorScreen,
    screen_name: Rich_Editor_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: CCDCScreen,
    screen_name: CCDC_Screen,
    key_words: ['ccdc', 'quan ly cong cu dung cu'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: MgnMoiHanScreen,
    screen_name: Mgn_Moi_Han_Screen,
    key_words: ['ccdc', 'quan ly kiem soat lich su moi han'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ScreenActionOne,
    screen_name: Mgn_Moi_Han_Action_One_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: HistoryActionOneScreen,
    screen_name: History_Action_One_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ScreenActionTwo,
    screen_name: Mgn_Moi_Han_Action_Two_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: HistoryActionTwoScreen,
    screen_name: History_Action_Two_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ScreenActionThree,
    screen_name: Mgn_Moi_Han_Action_Three_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ListSCScreen,
    screen_name: Mgn_Moi_Han_ListSC_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: HistoryActionThreeScreen,
    screen_name: History_Action_Three_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ScreenActionFour,
    screen_name: Mgn_Moi_Han_Action_Four_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: HistoryActionFourScreen,
    screen_name: History_Action_Four_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: MaintanceScreen,
    screen_name: Maintance_Ccdc_Screen,
    key_words: ['ccdc', 'bao tri bao duong moi han'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: SwapIPScreen,
    screen_name: Swap_IP_Screen,
    key_words: ['swap ip', 'wifi 6'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ResponseKHGScreen,
    screen_name: Swap_IP_Response_KHG_Screen,
    key_words: ['swap ip', 'wifi 6', 'phan hoi khach hang swap ipv6'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ListKHGScreen,
    screen_name: Swap_IP_List_KHG_Screen,
    key_words: ['swap ip', 'wifi 6', 'danh sach khach hang swap ipv6'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: DialINFScreen,
    screen_name: Dial_Inf_Screen,
    key_words: ['chuong trinh tat nien inf', 'end party'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: MerryChristMasScreen,
    screen_name: Merry_Christmas_Screen,
    key_words: [],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: NotificationScreen,
    screen_name: Notification_Screen,
    key_words: ['thong bao ung dung', 'notification'],
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: WebViewReviewScreen,
    screen_name: WebView_Review_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: LoaderSliderCP,
    screen_name: LoaderSliderCP_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: ExperimentScreen,
    screen_name: Experiment_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    screen: TabBottomCP,
    screen_name: Main_Screen,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export default TabHomeStackRouterObj;
