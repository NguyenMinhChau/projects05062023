import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text, TouchableOpacity} from 'react-native';
import TextInputCP from './TextInputCP';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {TextInput} from 'react-native-paper';

export default function TimeSelect({
  visible,
  value,
  onChange,
  headerTextIOS = 'Pick a time',
  onPressTime,
  subLabel = '',
  label = '',
  name = 'time',
  styleInput,
  outlinedStyleInput,
  contentStyleInput,
  disabled = false,
}) {
  const {colors} = useGetColorThemeDisplay();
  return (
    <>
      {label && (
        <TouchableOpacity activeOpacity={1}>
          <Text
            style={tw.style('text-[14px] mb-1 font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        // onPress={disabled ? () => {} : onPressTime}
        activeOpacity={disabled ? 1 : 0.8}>
        <TextInputCP
          value={
            value &&
            value.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false, // Use 24-hour format
            })
          }
          editable={false}
          label={label ? '' : `${subLabel}`}
          // onTouchStart={disabled ? () => {} : onPressTime}
          style={tw.style({...styleInput})}
          outlinedStyle={tw.style({...outlinedStyleInput})}
          contentStyle={tw.style({...contentStyleInput})}
          rightContent={
            <TextInput.Icon
              icon="clock-time-three-outline"
              size={22}
              style={tw.style('ml-0 mr-0')}
              color={colors.BLACK_COLOR}
              onTouchStart={disabled ? () => {} : onPressTime}
            />
          }
        />
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          testID="timePicker"
          value={value}
          mode="time"
          headerTextIOS={headerTextIOS} // Custom header text for iOS
          is24Hour={true}
          display="default"
          onChange={(event, time) => onChange(time || value, name)}
        />
      )}
    </>
  );
}
