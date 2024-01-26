import React, {useState, useRef, useEffect} from 'react';
import {OTPInputContainer, TextInputHidden} from './styles';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import tw from '../../styles/twrnc.global';
import {MAIN_TEXT_COLOR} from '../../styles/colors.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';

const OTPInput = ({
  setOtpValue,
  otpValue,
  styleLabel,
  keyboardType = 'numeric',
  pinLength = 6,
  onComplete = () => {},
  noLabel = false,
}) => {
  const [isPinReady, setIsPinReady] = useState(false);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const {colors} = useGetColorThemeDisplay();

  const inputRef = useRef();
  const boxArray = new Array(pinLength).fill(0);

  useEffect(() => {
    if (otpValue.length === pinLength) {
      onComplete(otpValue);
    }
    setIsPinReady(otpValue.length === pinLength);
    return () => {
      setIsPinReady(false);
    };
  }, [otpValue]);

  const boxDigit = (_, index) => {
    const emptyInput = '-';
    const digit = otpValue[index] || emptyInput;

    const isCurrentValue = index === otpValue.length;
    const isLastValue = index === pinLength - 1;
    const isCodeComplete = otpValue.length === pinLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        key={index}
        style={tw.style('border flex-1 py-2 rounded-md min-h-[40px] items-center justify-center', {
          borderColor: isValueFocused ? MAIN_TEXT_COLOR : '#0000007a',
        })}>
        <Text style={tw.style('text-black text-center font-bold text-[17px]')}>
          {digit}
        </Text>
      </View>
    );
  };

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  return (
    <View style={tw.style('w-full flex-col gap-2')}>
      {!noLabel && (
        <Text
          style={tw.style(`font-bold text-[14px] mb-1 text-black`, {
            ...styleLabel,
          })}>
          Nhập mã OTP
        </Text>
      )}
      <View style={tw.style('w-full relative')}>
        <Pressable style={tw.style('w-full flex-row justify-between gap-2')}>
          {boxArray.map(boxDigit)}
        </Pressable>
        <TextInput
          keyboardType={keyboardType}
          style={tw.style('absolute opacity-0 w-full h-full')}
          value={otpValue}
          onChangeText={setOtpValue}
          maxLength={pinLength}
          ref={inputRef}
          onBlur={handleOnBlur}
        />
      </View>
    </View>
  );
};
export default OTPInput;
