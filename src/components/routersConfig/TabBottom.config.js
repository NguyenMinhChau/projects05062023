import {SCREEN_NAVIGATE} from './General.config';
import DashboardPage from '../screen/Dashboard/Dashboard';
import SettingScreen from '../screen/Setting/Setting';
import Tools from '../screen/Tools/Tools';
import ToolsBotchatScreen from '../screen/ToolsBotchat/ToolsBotchat';
import ManagementScreen from '../screen/Management/Management';
import {SafeAreaViewCP} from './General.config';

const {
  Tools_Config,
  Tools_Botchat_Screen,
  Dashboard_Screen,
  Management_Screen,
  Setting_Screen,
} = SCREEN_NAVIGATE;

export const TabBottomRouterObj = [
  {
    id: 1,
    screen: Tools,
    screen_name: Tools_Config,
    key_words: [
      'ke hoach',
      'plan',
      'cau hinh',
      'bao tri',
      'reboot pop',
      'trien khai moi',
      'olt moi',
      'pop moi',
      'switch fti',
      'switch ce',
      'di doi',
      'metro pop',
      'pop+',
      'pop plus',
      'pop cong',
      'thay the',
      'facility',
    ],
    tabBarLabel: 'Kế hoạch',
    tabIconLabel: 'calendar-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    id: 2,
    screen: ToolsBotchatScreen,
    screen_name: Tools_Botchat_Screen,
    key_words: ['cong cu', 'tools', 'AI', 'bot chat'],
    tabBarLabel: 'Tools',
    tabIconLabel: 'construct-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    id: 3,
    screen: DashboardPage,
    screen_name: Dashboard_Screen,
    tabBarLabel: 'Dashboard',
    tabIconLabel: 'home',
    isIconLabelCustom: true,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    id: 4,
    screen: ManagementScreen,
    screen_name: Management_Screen,
    tabBarLabel: 'Quản lý',
    tabIconLabel: 'cube-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    id: 5,
    screen: SettingScreen,
    screen_name: Setting_Screen,
    key_words: ['setting', 'cai dat'],
    tabBarLabel: 'Cài đặt',
    tabIconLabel: 'settings-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export default TabBottomRouterObj;
