import React from 'react';
import {Animated, ActivityIndicator} from 'react-native';

export default function Logo() {
  const rotateAnim = new Animated.Value(0);
  const rotate = () => {
    Animated.timing(rotateAnim, {
      toValue: 360,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      rotate();
    });
  };
  React.useEffect(() => {
    rotate();
  }, []);
  return (
    <Animated.View
    // style={{
    //   transform: [
    //     {
    //       rotate: rotateAnim.interpolate({
    //         inputRange: [0, 360],
    //         outputRange: ['0deg', '360deg'],
    //       }),
    //     },
    //   ],
    // }}
    >
      {/* <Image
        source={require('../../assets/images/ICDP_mobile_logo.png')}
        style={tw`w-[100px] h-[100px]`}
        resizeMode="contain"
      /> */}
      <ActivityIndicator size="large" color="#7f8fa6" />
    </Animated.View>
  );
}
