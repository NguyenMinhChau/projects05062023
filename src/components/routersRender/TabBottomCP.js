import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import {Platform, View} from 'react-native';
import tw from '../../styles/twrnc.global';
import useAppContext from '../../utils/hooks/useAppContext';
import TabBottomRouterObj from '../routersConfig/TabBottom.config';
import {IconCP} from '../../utils/icon.utils';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {fList} from '../../utils/array.utils';

const Tab = createBottomTabNavigator();

function IconTabLabel({color, name, size = 20, isCustom = false, typeIcon}) {
  const {colors} = useGetColorThemeDisplay();
  return (
    <>
      {isCustom ? (
        <View
          style={tw.style(
            `w-[45px] h-[45px] rounded-full border-[2px] border-[${colors.PRIMARY_COLOR}] items-center justify-center`,
          )}>
          <IconCP name={name} size={size} color={color} typeIcon={typeIcon} />
        </View>
      ) : (
        <IconCP name={name} size={size} color={color} typeIcon={typeIcon} />
      )}
    </>
  );
}

export default function TabBottomCP() {
  const {state} = useAppContext();
  const {loader_slider_used} = state.set_data;
  const {isVisible_search} = state.set_toggle;
  const {colors} = useGetColorThemeDisplay();
  return (
    <Tab.Navigator initialRouteName={SCREEN_NAVIGATE.Dashboard_Screen}>
      {fList(TabBottomRouterObj)?.map((item, index) => {
        const {
          screen,
          navigationOptions,
          tabBarLabel,
          tabIconLabel,
          isIconLabelCustom,
          typeIcon,
          image,
          screen_name,
        } = {
          ...item,
        };
        return (
          <Tab.Screen
            key={index}
            name={screen_name}
            component={screen}
            options={{
              ...navigationOptions,
              tabBarHideOnKeyboard: true,
              tabBarLabel: tabBarLabel,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                display: isIconLabelCustom ? 'none' : 'flex',
              },
              tabBarActiveTintColor: colors.PRIMARY_COLOR,
              tabBarInactiveTintColor: colors.BLACK_COLOR,
              tabBarStyle: {
                display: loader_slider_used?.state ? 'none' : 'flex',
                //paddingBottom: Platform.OS === 'android' ? 10 : 0,
                //paddingTop: Platform.OS === 'android' ? 5 : 0,
                //height: Platform.OS === 'android' ? 60 : 0,
                paddingBottom: Platform?.OS === 'ios' ? 35 : 10,
                paddingTop: 5,
                height: Platform.OS === 'ios' ? 80 : 60,
                backgroundColor: colors.WHITE_COLOR,
                borderTopWidth: 0,
              },
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <>
                    <IconTabLabel
                      isCustom={isIconLabelCustom}
                      name={tabIconLabel}
                      size={20}
                      typeIcon={typeIcon}
                      color={
                        isIconLabelCustom
                          ? colors.PRIMARY_COLOR
                          : focused
                          ? colors.PRIMARY_COLOR
                          : colors.BLACK_COLOR
                      }
                    />
                  </>
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
