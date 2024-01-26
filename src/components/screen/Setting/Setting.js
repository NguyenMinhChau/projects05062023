import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {BLACK_COLOR} from '../../../styles/colors.global';
import Banner from '../Banner/Banner';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import useAppContext from '../../../utils/hooks/useAppContext';
import {AUTH_LOGOUT} from '../../../services/auth';
import {IconCP} from '../../../utils/icon.utils';
import {DATA_SETTING_CONFIG, useColorThemeSetting} from './config';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import LoadingScreen from '../../General/LoadingScreen';
import {useNotificationToast} from '../../../utils/notification_toast.utils';
import {useCssApp} from '../../../utils/css.utils';

export default function SettingScreen({navigation}) {
  const {dispatch, state} = useAppContext();
  const {colors} = useColorThemeSetting();
  const {shadowCss} = useCssApp();
  const [submitting, setSubmitting] = React.useState(false);
  const {openNotificationToast} = useNotificationToast();

  const handleLogout = () => {
    AUTH_LOGOUT({dispatch, navigation, openNotificationToast});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
    }, 1000);
  };

  return (
    <>
      {submitting && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <Banner navigation={navigation} />
        <View
          style={tw.style(`flex-1`, {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('p-3 flex-grow', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style('rounded-xl p-2', {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              {DATA_SETTING_CONFIG.map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    leftNameIcon={item?.iconName}
                    styleLabel={tw`font-medium`}
                    ValueCP={() => {
                      return (
                        <IconCP
                          size={15}
                          color={colors.BLACK_COLOR}
                          name="chevron-forward-outline"
                        />
                      );
                    }}
                    styleRow={tw`py-3 border-b-[0.5px] ${
                      item?.noneBorderBottom && 'border-b-0'
                    }`}
                    onClickAccord={() => navigation.navigate(item?.router)}
                    noBullet
                  />
                );
              })}
            </View>
            <View style={tw.style('mt-3')}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLogout}
                style={tw`w-full flex-row gap-2 rounded-md px-3 py-2 border border-transparent bg-gray-50 items-center justify-center mb-3`}>
                <Text style={tw`text-[15px] font-medium text-black`}>
                  Đăng xuất
                </Text>
                <IconCP name="log-out-outline" size={20} color={BLACK_COLOR} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}
