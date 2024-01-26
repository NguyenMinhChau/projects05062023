import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import LoadingScreen from '../../../General/LoadingScreen';
import {useMerryChristMas} from './hooks';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import tw from '../../../../styles/twrnc.global';
import {fList} from '../../../../utils/array.utils';
import useOrientation from '../../../../utils/hooks/useOrientation';
import BackgroundVideoCP from '../../../General/BackgroundVideo';
import ButtonCP from '../../../General/ButtonCP';
import {IconCP} from '../../../../utils/icon.utils';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../styles/colors.global';
import {TYPE_NOTIFICATION} from '../../../General/NotificationToast';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';
import useAppContext from '../../../../utils/hooks/useAppContext';
import FastImageCP from '../../../General/FastImageCP';
import {SET_PRIZE_MERRY_CHRISTMAS} from '../../../../services/toolsBotchat/MerryChristmas';

export default function MerryChristMasScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {currentUser} = state.set_data;
  const {colors} = useGetColorThemeDisplay();
  const {
    isLoading,
    user_info_program,
    data_code,

    handleChangeValue,
    handleReset,
  } = useMerryChristMas();
  const {orientation} = useOrientation();
  const {openNotificationToast} = useNotificationToast();
  const [isShowGif, setIsShowGif] = React.useState(false);
  const [isReTry, setIsReTry] = React.useState(false);

  const heightDevice = Dimensions.get('window').height;
  const widthDevice = Dimensions.get('window').width;

  const {email: emailUser} = {...currentUser};
  const {status, message} = {...data_code};

  const uriImage =
    message && status
      ? require('../../../../assets/images/prize_box_christmas_true.png')
      : message && !status
      ? require('../../../../assets/images/prize_box_christmas_false.png')
      : isShowGif
      ? require('../../../../assets/images/prize_box_christmas_gif.gif')
      : require('../../../../assets/images/prize_box_christmas.png');

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Chương trình giáng sinh INF`}
          styleText={tw.style('text-[15px]')}
          handleBack={handleReset}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <BackgroundVideoCP
            styleContainer={tw.style('flex-1 items-center justify-center', {
              paddingTop: heightDevice / 9,
            })}
            uriLocal={require('../../../../assets/video/video_background_mery_chirstmas.mp4')}>
            <View
              style={tw.style(
                'overflow-hidden bg-transparent border-0 relative',
                {
                  width: 280,
                  minHeight: 230,
                },
              )}>
              <View
                style={tw.style(
                  'flex-1 rounded-md p-5 items-center justify-center gap-2',
                )}>
                <View
                  style={tw.style('p-2 rounded-xl w-full', {
                    backgroundColor: '#ffffff',
                  })}>
                  {!message && (
                    <Text
                      style={tw.style(
                        ' text-[13px] text-center leading-5 text-black uppercase font-bold',
                      )}>
                      {isShowGif
                        ? 'Hãy chờ đợi kết quả'
                        : 'Nhấn vào hộp quà bên dưới'}
                    </Text>
                  )}
                  <View
                    style={tw.style(
                      'w-full h-[100px] items-center justify-center mt-2',
                    )}>
                    <FastImageCP
                      uriLocal={uriImage}
                      resizeMode="contain"
                      style={tw.style('w-full h-full min-h-0')}
                      onTouchStart={() => {
                        if (message) return;
                        setIsShowGif(true);
                        setTimeout(() => {
                          SET_PRIZE_MERRY_CHRISTMAS({
                            state,
                            dispatch,
                            emailUser,
                            openNotificationToast,
                            setIsShowGif,
                            setIsReTry,
                          });
                        }, 2000);
                      }}
                    />
                  </View>
                  {message && (
                    <Text
                      style={tw.style(
                        `text-[15px] text-center leading-5 mb-2 ${
                          status ? 'text-green-500' : 'text-red-500'
                        }`,
                      )}>
                      {message}
                    </Text>
                  )}
                  {isReTry && (
                    <ButtonCP
                      iconName="refresh-outline"
                      titleIcon="Thử lại"
                      colorIcon="#fff"
                      sizeIcon={18}
                      colorBG="#d2502d"
                      colorBorder="#d2502d"
                      onPress={() => {
                        setIsReTry(false);
                        handleReset();
                        setIsShowGif(false);
                      }}
                      styleText={tw.style(
                        'text-white font-bold text-[12px] uppercase',
                      )}
                      styleContainer={tw.style('mt-2 mx-2 p-1')}
                    />
                  )}
                </View>
              </View>
            </View>
          </BackgroundVideoCP>
        </View>
      </SafeAreaWrap>
    </>
  );
}
