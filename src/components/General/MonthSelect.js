import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import TextInputCP from './TextInputCP';
import moment from 'moment';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {TextInput} from 'react-native-paper';

export default function MonthSelect({
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
          value={moment(value).format('MM/YYYY')}
          editable={false}
          label={label ? '' : `${subLabel}`}
          // onTouchStart={disabled ? () => {} : onPressDate}
          style={tw.style({...styleInput})}
          outlinedStyle={tw.style({...outlinedStyleInput})}
          contentStyle={tw.style({...contentStyleInput})}
          rightContent={
            <TextInput.Icon
              icon="calendar-month-outline"
              size={22}
              style={tw.style('ml-0 mr-0')}
              color={colors.BLACK_COLOR}
              onTouchStart={disabled ? () => {} : onPressDate}
            />
          }
        />
      </TouchableOpacity>
      {visible && (
        <View
          style={tw.style(
            'absolute top-[15px] left-[-10px] right-0 w-full h-full',
          )}>
          <MonthPicker
            value={value}
            mode="number"
            onChange={(event, date) => {
              onChange(date || value, name);
            }}
            okButton="Chọn"
            okButtonStyle={{color: 'blue'}}
            cancelButton="Thoát"
            cancelButtonStyle={{color: 'red'}}
          />
        </View>
      )}
    </>
  );
}
