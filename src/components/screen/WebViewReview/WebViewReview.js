import React from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
  Text,
  Dimensions,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {WebView} from 'react-native-webview';
import tw from '../../../styles/twrnc.global';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import ButtonCP from '../../General/ButtonCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import LoadingScreen from '../../General/LoadingScreen';
import {downloadFileRemote} from '../../../utils/file.utils';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';

export default function WebViewReviewScreen({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const [onLoad, setOnLoad] = React.useState(true);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const {colors} = useGetColorThemeDisplay();
  const webview = React.useRef(null);
  const {url, title, sourceHTML, name_file} = {...route?.params};

  const isIOS = Platform.OS === 'ios';

  const urlWebView = isIOS
    ? url
    : 'https://docs.google.com/gview?embedded=true&url=' + url;

  const reload = () => webview.current.reload();
  return (
    <>
      {isSubmit && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={title}
          showDownLoadFile={url}
          onPressDownLoadFile={() => {
            downloadFileRemote(
              url,
              name_file,
              () => {
                setIsSubmit(true);
              },
              () => {
                setIsSubmit(false);
              },
            );
          }}
          styleText={tw.style('text-[13px]')}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('flex-grow flex-1', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View
              style={tw.style(
                'w-full flex-1 items-center justify-center relative',
                {
                  backgroundColor: colors.WHITE_COLOR,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                },
              )}>
              {url || sourceHTML ? (
                <View
                  style={tw.style('flex-1 w-full h-full', {
                    backgroundColor: colors.WHITE_COLOR,
                  })}>
                  <WebView
                    ref={webview}
                    source={sourceHTML ? sourceHTML : {uri: urlWebView}}
                    onLoad={() => {
                      setOnLoad(false);
                    }}
                    style={tw.style(`flex-1`)}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowFileAccess={true}
                    scalesPageToFit={true}
                    thirdPartyCookiesEnabled={true}
                    startInLoadingState={true}
                    useWebKit={true}
                    renderLoading={() => <Loading />}
                    renderError={() => <Error reload={reload} />}
                    injectedJavaScript={`
                    const meta = document.createElement('meta');
                    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
                    meta.setAttribute('name', 'viewport');
                    document.getElementsByTagName('head')[0].appendChild(meta);
                    document.getElementsByTagName('body')[0].style.zoom = 1;
                  `}
                  />
                </View>
              ) : (
                <Image
                  source={require('../../../assets/images/webview_url404.png')}
                  resizeMode="contain"
                  style={tw.style('w-full h-[400px]')}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaWrap>
    </>
  );
}

const Loading = () => {
  const {colors} = useGetColorThemeDisplay();
  return (
    <View
      style={tw.style(
        'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto',
        {
          backgroundColor: colors.WHITE_COLOR,
        },
      )}>
      <ActivityIndicator size="small" color={colors.PRIMARY_COLOR} />
      <Text
        style={tw.style('text-[15px] mb-3', {
          color: colors.BLACK_COLOR,
        })}>
        Đang tải, vui lòng chờ
      </Text>
    </View>
  );
};

const Error = ({reload}) => {
  const {colors} = useGetColorThemeDisplay();
  return (
    <View
      style={tw.style(
        'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto',
        {
          backgroundColor: colors.WHITE_COLOR,
        },
      )}>
      <Text
        style={tw.style('text-[15px] mb-3', {
          color: colors.BLACK_COLOR,
        })}>
        Đã xảy ra lỗi khi tải file
      </Text>
      <ButtonCP
        text="Tải lại"
        colorBG={colors.PRIMARY_COLOR}
        colorBorder={colors.PRIMARY_COLOR}
        styleContainer={tw.style('w-[150px] h-[40px]')}
        styleText={tw.style('text-base font-semibold')}
      />
    </View>
  );
};
