import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ButtonCP from '../General/ButtonCP';
import tw from '../../styles/twrnc.global';
import {PRIMARY_COLOR} from '../../styles/colors.global';
import Footer from '../General/Footer';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import useAppContext from '../../utils/hooks/useAppContext';
import FastImage from 'react-native-fast-image';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {SafeAreaWrap} from '../General/SafeAreaWrap';
import { useLayoutAnimation } from '../../utils/LayoutAnimation';

const IMAGE_SLIDER = [
  require('../../assets/images/slider_1_500x500.png'),
  require('../../assets/images/slider_2_500x500.png'),
  require('../../assets/images/slider_3_500x500.png'),
  // require('../../assets/images/slider_4_500x500.png'),
  require('../../assets/images/slider_5_500x500.png'),
];

export default function LoaderSliderCP({redirect, onClick}) {
  const {dispatch, state} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {currentUser} = state.set_data;
  const [indexDot, setIndexDot] = React.useState(0);
  const {LayoutAnimationConfig,ANIMATION_PROPERTY,ANIMATION_TYPE} = useLayoutAnimation()

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.WHITE_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <View
          style={tw.style('flex-1 flex-col items-center justify-center', {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <View
            style={tw.style('h-[60%] w-full', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <SliderBox
              activeOpacity={1}
              ImageComponent={FastImage}
              images={IMAGE_SLIDER}
              sliderBoxHeight={500}
              paginationBoxVerticalPadding={20}
              autoplay
              autoplayInterval={5000}
              resizeMethod={'resize'}
              currentImageEmitter={(index) => {
                setIndexDot(index);
                LayoutAnimationConfig(400, ANIMATION_TYPE.EASE_IN_EASE_OUT, ANIMATION_PROPERTY.OPACITY)
              }}
              resizeMode={'contain'}
              // resizeMode={'cover'}
              onCurrentImagePressed={(index) => {}}
              paginationBoxStyle={tw.style(
                'absolute bottom-0 p-0 m-0 items-center justify-center py-4 self-center',
              )}
              dotColor={PRIMARY_COLOR}
              inactiveDotColor={tw.color('gray-200')}
              dotStyle={tw.style('hidden', )}
              ImageComponentStyle={tw.style(
                'w-[95%] h-[95%] bg-white rounded-lg',
              )}
              imageLoadingColor={PRIMARY_COLOR}
            />
            <View style={tw.style('flex-row items-center justify-center gap-1')}>
              {IMAGE_SLIDER.map((item,index) => {
                return <View style={tw.style(`h-[8px] rounded-md ${index === indexDot ? `bg-[${PRIMARY_COLOR}] w-6` : `bg-gray-100 w-[10px]`}`)}></View>
                 
              })}
            </View>
          </View>
          <View
            style={tw.style(
              'flex-1 flex-col w-full items-center justify-center p-2',
            )}>
            <View
              style={tw.style(
                'flex-1 flex-col gap-10 w-full items-center justify-center',
              )}>
              <View style={tw.style('items-center w-full')}>
                <Text
                  style={tw.style(' text-[22px] font-bold', {
                    color: colors.BLACK_COLOR,
                  })}>
                  Chào Mừng Bạn Đến ICDP Mobile
                </Text>
              </View>
              <ButtonCP
              colorIcon='#fff'
              iconName='navigate-outline'
                titleIcon="Bắt đầu ngay"
                styleContainer={tw.style('w-[300px] rounded-[20px] py-3')}
                styleText={tw.style('text-[14px] font-bold uppercase')}
                colorBG={PRIMARY_COLOR}
                colorBorder={PRIMARY_COLOR}
                onPress={() => {
                  redirect.navigate(
                    currentUser?.email
                      ? SCREEN_NAVIGATE.Dashboard_Screen
                      : SCREEN_NAVIGATE.Login_Screen,
                  );
                  onClick();
                }}
              />
            </View>
            <Footer />
          </View>
        </View>
      </SafeAreaWrap>
    </>
  );
}
