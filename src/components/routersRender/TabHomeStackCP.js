import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import TabHomeStackRouterObj from '../routersConfig/TabHomeStack.config';
import useAppContext from '../../utils/hooks/useAppContext';
import {isValidToken} from '../../services/jwt';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheCurrentUser,
  getAsyncCacheLoaderSliderUsed,
  getAsyncCacheTokenSecurity,
} from '../../utils/cache.services';
import {fList} from '../../utils/array.utils';
import NavigateService from '../routersConfig/NavigateService';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator();

export default function TabHomeStackCP() {
  const {state, dispatch} = useAppContext();
  const {accessToken, currentUser} = state.set_data;

  useEffect(() => {
    getAsyncCacheLoaderSliderUsed(dispatch);
    getAsyncCacheCurrentUser(dispatch);
    getAsyncCacheAccessToken(dispatch);
    getAsyncCacheTokenSecurity(dispatch);
  }, []);

  const {accessToken: tokenAccess} = {...accessToken};

  const isCheckLogin = currentUser?.email && tokenAccess;

  return (
    <NavigationContainer ref={ref => NavigateService.setTopLevelNavigator(ref)}>
      <Stack.Navigator
        initialRouteName={
          isCheckLogin
            ? SCREEN_NAVIGATE.Main_Screen
            : SCREEN_NAVIGATE.Login_Screen
        }
        screenOptions={{
          headerShown: false,
        }}>
        {fList(TabHomeStackRouterObj)?.map((item, index) => {
          const {screen, screen_name, navigationOptions} = {
            ...item,
          };
          return (
            <Stack.Screen
              key={index}
              name={screen_name}
              component={screen}
              options={{
                presentation: 'containedTransparentModal',
                animationTypeForReplace: 'push',
                animation: 'fade',
                ...navigationOptions,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
