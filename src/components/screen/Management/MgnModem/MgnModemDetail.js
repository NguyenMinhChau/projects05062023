import React from 'react';
import {useColorThemeManagement} from '../config';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import tw from '../../../../styles/twrnc.global';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import FastImageCP from '../../../General/FastImageCP';
import RenderHtml, {
  HTMLContentModel,
  defaultSystemFonts,
  defaultHTMLElementModels,
} from 'react-native-render-html';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../styles/colors.global';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconCP, TYPE_ICON} from '../../../../utils/icon.utils';
import ButtonCP from '../../../General/ButtonCP';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ImageSliderCP from '../../../General/ImageSliderCP';
import {fList} from '../../../../utils/array.utils';
import {useCssApp} from '../../../../utils/css.utils';
import ScreenNoData from '../../../General/ScreenNoData';
import {handleStyleInlineReactQuill} from '../../../../styles/reactQuillKey';

export default function MgnModemDetailScreen({navigation, route}) {
  const {colors} = useColorThemeManagement();
  const {shadowCss} = useCssApp();
  const {width} = useWindowDimensions();
  const {data} = {...route.params};
  const [urlImage, setUrlImage] = React.useState(null);

  const systemFonts = [
    ...defaultSystemFonts,
    'Montserrat-Regular',
    'Montserrat-Bold',
  ];

  const {picture, description, createAt, editor, model, modelCode, dataImages} =
    {...data};

  const convertHtmlToInlineCss = htmlString => {
    const cssInline = htmlString.replace(
      /class=['"]([^'"]*)['"]/g,
      (_, classes) => {
        const inlineStyles = [];

        // Xử lý từng class
        classes.split(' ').forEach(className => {
          handleStyleInlineReactQuill(className, inlineStyles);
        });

        // Trả về chuỗi CSS inline
        return `style="${inlineStyles.join('; ')}"`;
      },
    );

    // Trả về chuỗi HTML với CSS inline
    return cssInline;
  };

  const source = convertHtmlToInlineCss(description);

  const tagsStyles = {
    div: {
      lineHeight: 22,
      letterSpacing: 1.5,
      color: colors.BLACK_COLOR,
    },
    img: {
      borderRadius: 10,
      width: '100%',
      overflow: 'hidden',
      marginVertical: 10,
    },
    p: {
      margin: 0,
    },
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.BLACK_COLOR,
    },
    h2: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.BLACK_COLOR,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.BLACK_COLOR,
    },
    h4: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.BLACK_COLOR,
    },
    h5: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.BLACK_COLOR,
    },
    h6: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.BLACK_COLOR,
    },
    blockquote: {
      borderLeftWidth: 3,
      borderLeftColor: colors.PRIMARY_COLOR,
      padding: 10,
      margin: 0,
      marginVertical: 10,
    },
    pre: {
      backgroundColor: '#f1f1f1',
      color: '#000',
      padding: 10,
      margin: 0,
      marginVertical: 10,
      borderRadius: 10,
    },
    a: {
      color: colors.PRIMARY_COLOR,
    },
    ol: {
      color: colors.BLACK_COLOR,
    },
    ul: {
      color: colors.BLACK_COLOR,
    },
    li: {
      marginBottom: 5,
    },
  };

  const customHTMLElementModels = {
    font: defaultHTMLElementModels.p.extend({
      contentModel: HTMLContentModel.mixed,
      getMixedUAStyles: element => {
        return {
          color: element?.attributes?.color ? element?.attributes?.color : null,
          fontSize: element?.attributes?.size
            ? Number(element?.attributes?.size) * 4
            : null,
        };
      },
    }),
  };

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Thiết bị ${model}`}
          styleText={tw.style('text-[15px]')}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            contentContainerStyle={tw.style(
              'flex-grow mx-2 my-3 p-2 pb-5 relative',
            )}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              activeOpacity={1}
              style={tw.style(
                'absolute top-0 right-0 bottom-0 left-0 z-40 bg-transparent w-full h-full',
              )}></TouchableOpacity>
            <View style={tw.style('w-full h-[250px] overflow-hidden z-50')}>
              <FastImageCP
                uri={picture}
                uriError={require('../../../../assets/images/no_data.png')}
                resizeMode="contain"
                style={tw.style('w-full h-full')}
                onTouchStart={() => setUrlImage(picture)}
              />
            </View>
            {dataImages?.length > 0 && (
              <>
                <View style={tw.style('px-0 w-full py-1 mt-2 z-50')}>
                  <Text
                    style={tw.style('font-bold text-[20px] text-blue-600', {
                      //color: colors.BLACK_COLOR,
                    })}>
                    Xem thêm hình ảnh thiết bị
                  </Text>
                </View>
                <View
                  style={tw.style('h-[100px] w-full py-1 z-50', {
                    backgroundColor: colors.WHITE_COLOR,
                  })}>
                  <ImageSliderCP images={fList(dataImages)} visibleItems={5} />
                </View>
              </>
            )}
            <Text
              style={tw.style('font-bold text-[20px] py-3 text-blue-600', {
                //color: colors.BLACK_COLOR,
              })}>
              Thông tin thiết bị
            </Text>
            {description ? (
              <TouchableOpacity activeOpacity={1} style={tw.style('z-50')}>
                <RenderHtml
                  contentWidth={width}
                  source={{html: source}}
                  tagsStyles={tagsStyles}
                  systemFonts={systemFonts}
                  customHTMLElementModels={customHTMLElementModels}
                  baseStyle={{
                    color: colors.BLACK_COLOR,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={tw.style('flex-1 items-center justify-center')}>
                <Text
                  style={tw.style('text-center mx-2 leading-5 text-[15px]', {
                    color: colors.BLACK_COLOR,
                  })}>
                  Không có thông tin thiết bị {model}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
        <Modal
          transparent={true}
          visible={urlImage ? true : false}
          animationType="fade">
          <ImageViewer
            imageUrls={[{url: urlImage}]}
            enableSwipeDown={true}
            onSwipeDown={() => setUrlImage(null)}
            style={tw.style('w-full h-[500px]')}
            loadingRender={() => {
              return (
                <View
                  style={tw.style(
                    'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto',
                    {
                      backgroundColor: colors.WHITE_COLOR,
                    },
                  )}>
                  <ActivityIndicator
                    size="small"
                    color={colors.PRIMARY_COLOR}
                  />
                  <Text
                    style={tw.style('text-[15px] mb-3', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Đang tải, vui lòng chờ
                  </Text>
                </View>
              );
            }}
            renderHeader={() => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setUrlImage(null)}
                  style={tw.style(
                    'absolute top-[10%] right-[15px] z-50 items-center justify-center w-[30px] h-[30px] rounded-full bg-white',
                  )}>
                  <IconCP name="close-outline" size={25} color={BLACK_COLOR} />
                </TouchableOpacity>
              );
            }}
            renderIndicator={(currentIndex, allSize) => {
              return (
                <>
                  <View
                    style={tw.style(
                      'absolute top-[10%] left-[15px] z-50 items-center justify-center bg-white px-2 py-1 rounded',
                    )}>
                    <Text style={tw.style('text-[15px] text-black')}>
                      {currentIndex}/{allSize}
                    </Text>
                  </View>
                </>
              );
            }}
            saveToLocalByLongPress={false}
            menus={({cancel, saveToLocal}) => {
              return (
                <View
                  style={tw.style(
                    'absolute bottom-0 right-0 left-0 flex-col justify-center items-center w-full p-2 pb-[30px] shadow-lg rounded-tl-lg rounded-tr-lg',
                    {
                      backgroundColor: colors.BACKGROUND_CARD,
                    },
                  )}>
                  <View style={tw.style('flex-row w-full gap-2')}>
                    <ButtonCP
                      iconName="close-outline"
                      iconSize={25}
                      colorIcon="#fff"
                      colorBG="#ff0000"
                      colorBorder="#ff0000"
                      titleIcon="Thoát"
                      onPress={cancel}
                      styleContainer={tw.style('p-1 flex-1')}
                    />
                    <ButtonCP
                      iconName="download-outline"
                      iconSize={25}
                      colorIcon="#fff"
                      colorBG="#2f994e"
                      colorBorder="#2f994e"
                      titleIcon="Lưu ảnh"
                      onPress={saveToLocal}
                      styleContainer={tw.style('p-1 flex-1')}
                    />
                  </View>
                </View>
              );
            }}
          />
        </Modal>
      </SafeAreaWrap>
    </>
  );
}
