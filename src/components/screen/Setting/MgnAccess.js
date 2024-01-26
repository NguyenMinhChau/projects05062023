import React from 'react';
import {View, ScrollView, Switch} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../../styles/colors.global';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {useColorThemeSetting} from './config';
import useAppContext from '../../../utils/hooks/useAppContext';
import {fList} from '../../../utils/array.utils';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import {RESULTS} from 'react-native-permissions';
import useAppPermission from '../../../utils/MgnAccess/config';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import {
  getAsyncCacheBiometric,
  getAsyncCacheBiometricKEY,
  setAsyncCacheBiometric,
} from '../../../utils/cache.services';
import {useAppBiometrics} from '../../../utils/biometrics.utils';
import {useCssApp} from '../../../utils/css.utils';

export default function MgnAccessScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {access_app, currentUser, biometric_app, accessToken, tokenSecurity} =
    state.set_data;
  const {accessToken: tokenAccess} = {...accessToken};
  const {tokenSecurity: securityToken} = {...tokenSecurity};
  const {colors} = useColorThemeSetting();
  const {shadowCss} = useCssApp();

  const {checkPermission} = useAppPermission();
  const {isBiometrics, isBiometricsFaceID, isBiometricsTouchID} =
    useAppBiometrics(navigation);

  const dataMgnAccess = Object?.values(access_app || {});

  const toggleSwitch = async id => {
    const index = dataMgnAccess.findIndex(item => item.id === id);
    if (index !== -1) {
      checkPermission(dataMgnAccess[index]?.type_access);
    }
  };

  const {email} = {...currentUser};

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title="Quản lý truy cập" />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('flex-grow p-3', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style(`flex-col gap-2 rounded-xl  px-3`, {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              {fList(dataMgnAccess).map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    styleLabel={tw`font-medium`}
                    leftNameIcon={item?.iconName}
                    noneBorderBottom={item?.noneBorderBottom}
                    ValueCP={() => {
                      return (
                        <Switch
                          trackColor={{false: '#e8e8ea', true: PRIMARY_COLOR}}
                          thumbColor={WHITE_COLOR}
                          ios_backgroundColor="#e8e8ea"
                          onValueChange={() => toggleSwitch(item?.id)}
                          value={item?.checked === RESULTS.GRANTED}
                          disabled={item?.disable}
                        />
                      );
                    }}
                    styleRow={tw.style(
                      `py-3 border-b-[${
                        item?.noneBorderBottom ? '0px' : '0.5px'
                      }]`,
                    )}
                    noBullet
                  />
                );
              })}
              {(isBiometrics || isBiometricsTouchID || isBiometricsFaceID) && (
                <RowDialogCP
                  label={`Đăng nhập sinh trắc học ${
                    isBiometricsTouchID ? '(Touch ID)' : '(Face ID)'
                  }`}
                  styleLabel={tw`font-medium`}
                  leftNameIcon="id-card-outline"
                  ValueCP={() => {
                    return (
                      <Switch
                        trackColor={{false: '#e8e8ea', true: PRIMARY_COLOR}}
                        thumbColor={WHITE_COLOR}
                        ios_backgroundColor="#e8e8ea"
                        onValueChange={async () => {
                          await setAsyncCacheBiometric({
                            state: !biometric_app?.state,
                            data: {
                              emailUser: email,
                              tokenAccess: tokenAccess,
                              securityToken: securityToken,
                            },
                          });
                          await getAsyncCacheBiometric(dispatch);
                        }}
                        value={biometric_app?.state}
                      />
                    );
                  }}
                  styleRow={tw.style(`py-3 border-b-[0px]`)}
                  noBullet
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}
