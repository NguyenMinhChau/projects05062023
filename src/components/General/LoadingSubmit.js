import React from 'react';
import {View} from 'react-native';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import FastImageCP from './FastImageCP';
import LoadingDots from './LoadingDots';
import {SafeAreaWrap} from './SafeAreaWrap';

export default function LoadingSubmit({
  isSubmit = true,
  task = '',
  navigation,
}) {
  const {colors} = useGetColorThemeDisplay();

  return (
    <>
      {isSubmit && (
        <View
          style={tw.style(
            'absolute z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center p-2',
            {
              backgroundColor: colors.BGC_LOADING,
            },
          )}>
          <SafeAreaWrap
            backgroundColorTop={colors.BGC_LOADING}
            backgroundColorBottom={colors.BGC_LOADING}
            style={tw.style('flex-1 items-center justify-center')}>
            <View
              style={tw.style(
                'items-center justify-center mb-2 p-1 pb-3 min-w-[100px] rounded-md',
                {
                  backgroundColor: colors.BGC_CHILD_LOADING,
                },
              )}>
              <FastImageCP
                uriLocal={require('../../assets/images/ICDP_mobile_logo_2.png')}
                uriError={require('../../assets/images/ICDP_mobile_logo_2.png')}
                resizeMode="contain"
                style={tw.style('w-[70px] h-[50px] min-h-[50px]')}
              />
              <LoadingDots dots={3} size={6} bounceHeight={3} />
            </View>
          </SafeAreaWrap>
        </View>
      )}
    </>
  );
}

// <>
//   <SafeAreaView style={tw.style(`flex-0 bg-[${colors.WHITE_COLOR}]`)} />
//   <SafeAreaView
//     style={tw.style('flex-col gap-2 flex-1 w-full h-full', {
//       backgroundColor: colors.WHITE_COLOR,
//     })}>
//     <View
//       style={tw.style('items-start justify-start px-3')}
//       onTouchStart={() =>
//         navigation
//           ? navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen)
//           : {}
//       }>
//       <Image
//         source={require('../../assets/images/ICDP_mobile_logo_2.png')}
//         resizeMode="contain"
//         style={tw.style('w-[130px] h-[100px]')}
//       />
//     </View>
//     <View
//       style={tw`flex-1 h-full items-center justify-center flex-col gap-2 p-2 mb-[100px]`}>
//       <Logo />
//       <View style={tw`w-full mt-3 items-center justify-center`}>
//         <Text
//           style={tw.style(`text-center font-medium leading-6`, {
//             color: colors.BLACK_COLOR,
//           })}>
//           Đang xử lý {task ? task : 'dữ liệu'}, vui lòng đợi trong giây
//           lát, cảm ơn!
//         </Text>
//         {/* <View style={tw`flex-row items-center gap-1`}>
//         <Text style={tw`text-center font-bold text-red-500 leading-6`}>
//           Thời gian xử lý: {formatTime(loadingTime)}
//         </Text>
//       </View> */}
//       </View>
//     </View>
//   </SafeAreaView>
// </>
