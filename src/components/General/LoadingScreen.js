import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import FastImageCP from './FastImageCP';
import LoadingDots from './LoadingDots';

export default function LoadingScreen({navigation, hideLogo = false}) {
  const [msg, setMsg] = React.useState('');
  const {colors} = useGetColorThemeDisplay();
  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setMsg(
  //       'Hệ thống đang chịu tải hoặc đường truyền của bạn đang có vấn đề, vui lòng chờ thêm hoặc liên hệ Admin',
  //     );
  //   }, 30000);

  //   return () => clearTimeout(timer);
  // });

  return (
    <View
      style={tw.style(
        'absolute z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center p-2',
        {
          backgroundColor: colors.BGC_LOADING,
        },
      )}>
      <View
        style={tw.style(
          'items-center justify-center mb-2 p-1 pb-3 min-w-[100px] rounded-md',
          {
            backgroundColor: colors.BGC_CHILD_LOADING,
          },
        )}>
        {hideLogo && (
          <Text style={tw.style('text-center text-[15px] text-white mb-3')}>
            Đang xử lý
          </Text>
        )}
        {!hideLogo && (
          <FastImageCP
            uriLocal={require('../../assets/images/ICDP_mobile_logo_2.png')}
            uriError={require('../../assets/images/ICDP_mobile_logo_2.png')}
            resizeMode="contain"
            style={tw.style('w-[70px] h-[50px] min-h-[50px]')}
          />
        )}
        <LoadingDots dots={3} size={6} bounceHeight={3} />
      </View>
    </View>
  );
}
