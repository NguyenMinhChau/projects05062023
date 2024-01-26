import React from 'react';
import {View, Text, ScrollView, Linking} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {IconCP} from '../../../utils/icon.utils';
import {PRIMARY_COLOR} from '../../../styles/colors.global';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {DATA_SETTING_APP_INFO_CONFIG, useColorThemeSetting} from './config';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import {PACKAGE_NAME_APP, URL_APP_PLAY_STORE} from '@env';
import ButtonCP from '../../General/ButtonCP';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import LoadingScreen from '../../General/LoadingScreen';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import {useCssApp} from '../../../utils/css.utils';

export default function AppInfoScreen({navigation}) {
  const [isUpdateApp, setIsUpdateApp] = React.useState(false);
  const [isLoadingFile, setIsLoadingFile] = React.useState(false);
  const [versionNewApp, setVersionNewApp] = React.useState(null);
  const {colors} = useColorThemeSetting();
  const {shadowCss} = useCssApp();

  React.useEffect(() => {
    const initCheckApp = async () => {
      VersionCheck.needUpdate({
        packageName: PACKAGE_NAME_APP,
      }).then(async res => {
        if (res?.isNeeded) {
          setIsUpdateApp(true);
          setVersionNewApp(res?.latestVersion);
        } else {
          setIsUpdateApp(false);
          setVersionNewApp(null);
        }
      });
    };
    initCheckApp();
  }, []);

  const openStore = async () => {
    await Linking.openURL(URL_APP_PLAY_STORE);
  };

  return (
    <>
      {isLoadingFile && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Điều khoản và thông tin ứng dụng"
          styleText={tw`text-[14px]`}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('flex-grow bg-gray-50 p-3', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style(`flex-col gap-2 px-3 py-2 rounded-xl`, {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              {DATA_SETTING_APP_INFO_CONFIG.map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    styleLabel={tw`font-medium`}
                    leftNameIcon={item?.iconName}
                    noneBorderBottom={item?.noneBorderBottom}
                    ValueCP={() => {
                      return (
                        <IconCP
                          size={15}
                          color={colors.BLACK_COLOR}
                          name="chevron-forward-outline"
                        />
                      );
                    }}
                    styleRow={tw.style(
                      `py-3 border-b-[${
                        item?.noneBorderBottom ? '0px' : '0.5px'
                      }]`,
                    )}
                    onClickAccord={() => {
                      navigation.navigate({
                        name: SCREEN_NAVIGATE.WebView_Review_Screen,
                        params: {
                          url: item?.urlWeb,
                          title: item?.label,
                          sourceHTML: item?.sourceHTML,
                          name_file: item?.name_file,
                        },
                      });
                    }}
                    noBullet
                  />
                );
              })}
            </View>
            <View
              style={tw.style('w-full p-2 mt-3 px-5 py-2 rounded-xl', {
                backgroundColor: colors.BACKGROUND_CARD,
                ...shadowCss(),
              })}>
              <Text
                style={tw.style('font-medium text-[15px]', {
                  color: colors.BLACK_COLOR,
                })}>
                Thông tin phiên bản
              </Text>

              {isUpdateApp && versionNewApp ? (
                <>
                  <Text
                    style={tw.style(
                      'text-green-500 font-medium text-[13px] leading-5',
                    )}>
                    Đã có phiên bản mới, phiên bản{' '}
                    <Text
                      style={tw.style(
                        'text-blue-500 font-bold text-[13px] leading-5',
                      )}>
                      {versionNewApp || EMPTY_CHAR}.{' '}
                    </Text>
                    <Text
                      style={tw.style(
                        'text-green-500 font-medium text-[13px] leading-5',
                      )}>
                      Vui lòng cập nhật để có trải nghiệm tốt nhất. Cảm ơn!
                    </Text>
                  </Text>
                  <View style={tw.style('justify-end mt-2')}>
                    <ButtonCP
                      iconName="refresh-outline"
                      colorIcon="#fff"
                      titleIcon="Cập nhật ngay"
                      sizeIcon={18}
                      onPress={openStore}
                      colorBG={PRIMARY_COLOR}
                      colorBorder={PRIMARY_COLOR}
                    />
                  </View>
                </>
              ) : (
                <Text
                  style={tw.style(
                    'text-slate-400 font-medium text-[13px] leading-5 mt-1',
                  )}>
                  Bạn đang sử dụng phiên bản mới nhất, phiên bản{' '}
                  <Text
                    style={tw.style(
                      'text-blue-500 font-bold text-[13px] leading-5',
                    )}>
                    {DeviceInfo.getVersion() || EMPTY_CHAR}{' '}
                  </Text>
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}
