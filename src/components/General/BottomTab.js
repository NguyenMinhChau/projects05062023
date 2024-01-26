import React from 'react';
import {View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';

export default function BottomTabCP({
  index,
  setIndex,
  routes,
  renderScene,
  isShowLabel = true,
  activeColor, // label color
  bgIcon,
  shifting = false,
}) {
  const {colors} = useGetColorThemeDisplay();
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      theme={{colors: {secondaryContainer: colors.WHITE_COLOR}}}
      renderIcon={({route, focused, color}) => {
        return (
          <View style={tw`items-center justify-center h-full w-full`}>
            {route.icon}
          </View>
        );
      }}
      activeColor={activeColor}
      labeled={isShowLabel}
      barStyle={tw.style('shadow-sm', {
        backgroundColor: colors.WHITE_COLOR,
        height: 95,
      })}
      shifting={shifting}
      keyboardHidesNavigationBar={true}
      inactiveColor={colors.BLACK_COLOR}
    />
  );
}
