import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import FastImageCP from './FastImageCP';
import {IconCP} from '../../utils/icon.utils';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {BLACK_COLOR, WHITE_COLOR} from '../../styles/colors.global';
import ImageViewer from 'react-native-image-zoom-viewer';
import ButtonCP from './ButtonCP';
import {fList} from '../../utils/array.utils';
import {useCssApp} from '../../utils/css.utils';

const ImageSliderCP = ({images, visibleItems = 3}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageTargetLink, setImageTargetLink] = useState(null);
  const scrollViewRef = useRef();
  const {colors} = useGetColorThemeDisplay();
  const {shadowCss} = useCssApp();

  const PAGE_IMAGE_SLIDER = Math.ceil(images.length / visibleItems);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollViewRef.current.scrollTo({
        x: (currentIndex - 1) * Dimensions.get('window').width,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < PAGE_IMAGE_SLIDER - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * Dimensions.get('window').width,
      });
    }
  };

  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <FastImageCP
          key={index}
          uri={typeof image === 'string' ? image : null}
          uriLocal={typeof image === 'string' ? null : image}
          uriError={require('../../assets/images/no_data.png')}
          resizeMode="contain"
          style={tw.style('min-h-0 rounded-lg', {
            width: Dimensions.get('window').width / visibleItems,
            backgroundColor: colors.BACKGROUND_CARD,
            ...shadowCss({
              elevation: 3,
            }),
          })}
          onTouchStart={() => setImageTargetLink(image)}
        />
      );
    });
  };

  return (
    <>
      <View style={tw.style('flex-1 relative')}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const newIndex = Math.floor(
              event.nativeEvent.contentOffset.x /
                Dimensions.get('window').width,
            );
            setCurrentIndex(newIndex);
          }}
          contentContainerStyle={tw.style({
            paddingVertical: 3,
            paddingHorizontal: 10,
            gap: 10,
          })}
          ref={scrollViewRef}>
          {renderImages()}
        </ScrollView>
        {images.length > visibleItems && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw.style(
                'absolute top-[50%] left-[10px] p-[6px] rounded-md z-2 shadow-md border-[0.5px] border-gray-50',
                {
                  transform: [{translateY: -20}],
                  backgroundColor: colors.BACKGROUND_CARD,
                },
              )}
              onPress={handlePrev}>
              <IconCP
                name="chevron-back-outline"
                size={20}
                color={colors.BLACK_COLOR}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw.style(
                'absolute top-[50%] right-[10px] p-[6px] rounded-md z-2 shadow-md border-[0.5px] border-gray-50',
                {
                  transform: [{translateY: -20}],
                  backgroundColor: colors.BACKGROUND_CARD,
                },
              )}
              onPress={handleNext}>
              <IconCP
                name="chevron-forward-outline"
                size={20}
                color={colors.BLACK_COLOR}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <ModalViewImage
        dataImages={images}
        imageTargetLink={imageTargetLink}
        setImageTargetLink={setImageTargetLink}
      />
    </>
  );
};

const ModalViewImage = ({dataImages, imageTargetLink, setImageTargetLink}) => {
  const {colors} = useGetColorThemeDisplay();
  const imageUrls = fList(dataImages).map(item => {
    if (typeof item === 'string') {
      return {
        url: item,
      };
    } else {
      return {
        props: {
          source: item,
        },
      };
    }
  });
  return (
    <Modal
      transparent={true}
      visible={imageTargetLink ? true : false}
      animationType="fade">
      <ImageViewer
        imageUrls={imageUrls}
        enableSwipeDown={true}
        onSwipeDown={() => setImageTargetLink(null)}
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
              <ActivityIndicator size="small" color={colors.PRIMARY_COLOR} />
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
              onPress={() => setImageTargetLink(null)}
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
        index={imageUrls.findIndex(item => {
          if (typeof imageTargetLink === 'string') {
            return item?.url === imageTargetLink;
          } else {
            return item?.props?.source === imageTargetLink;
          }
        })}
      />
    </Modal>
  );
};

export default ImageSliderCP;
