import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputCP from './TextInputCP';
import tw from '../../styles/twrnc.global';
import moment from 'moment';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {TextInput} from 'react-native-paper';

export default function DateSelect({
  visible,
  value,
  onChange,
  onPressDate,
  subLabel = '',
  label = '',
  name = 'date',
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
        // onPress={disabled ? () => {} : onPressDate}
        activeOpacity={disabled ? 1 : 0.8}>
        <TextInputCP
          value={moment(value).format('DD/MM/YYYY')}
          editable={false}
          label={label ? '' : `${subLabel}`}
          // onTouchStart={disabled ? () => {} : onPressDate}
          style={tw.style({...styleInput})}
          outlinedStyle={tw.style({...outlinedStyleInput})}
          contentStyle={tw.style({...contentStyleInput})}
          rightContent={
            <TextInput.Icon
              icon="calendar"
              size={22}
              style={tw.style('ml-0 mr-0')}
              color={colors.BLACK_COLOR}
              onTouchStart={disabled ? () => {} : onPressDate}
            />
          }
        />
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          testID="datePicker"
          value={value}
          mode="date"
          display="default"
          onChange={(event, date) => {
            onChange(date || value, name);
          }}
        />
      )}
    </>
  );
}
