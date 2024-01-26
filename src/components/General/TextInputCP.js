import * as React from 'react';
import {TextInput} from 'react-native-paper';
import tw from '../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {Text, TouchableOpacity} from 'react-native';

const TextInputCP = (
  {
    value,
    onChange,
    type = 'outlined',
    label,
    labelOutside,
    disabled = false,
    placeholder,
    placeholderTextColor,
    error = false,
    style,
    contentStyle,
    outlinedStyle,
    outlineColor = '#ccc',
    editable = true,
    leftContent,
    rightContent,
    multiline = false,
    textColor,
    secureTextEntry = false,
    onSubmitEditing,
    keyboardType = 'default',
    autoCorrect = false,
    returnKeyType = 'next',
    cursorColor,
    onTouchStart = () => {},
    helperText = '',
    HelperTextCustom,
    styleHelperText,
    required = false,
  },
  ref,
) => {
  const {colors} = useGetColorThemeDisplay();
  return (
    <>
      {labelOutside && (
        <TouchableOpacity activeOpacity={1}>
          <Text
            style={tw.style('text-[14px] mb-[6px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            {labelOutside}{' '}
            {required && (
              <Text style={tw.style('text-red-500 font-bold ml-1')}>*</Text>
            )}
          </Text>
        </TouchableOpacity>
      )}

      <TextInput
        onTouchStart={onTouchStart}
        mode={type}
        label={labelOutside ? '' : label}
        value={value}
        onChangeText={text => onChange(text)}
        disabled={disabled}
        editable={editable}
        placeholder={placeholder}
        style={tw.style('mb-2 text-[15px]', {
          backgroundColor: colors.WHITE_COLOR,
          height: 45,
          ...style,
        })}
        dense={true}
        cursorColor={cursorColor ? cursorColor : colors.BLACK_COLOR}
        textColor={textColor ? textColor : colors.BLACK_COLOR}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#ccc'
        }
        error={error}
        outlineColor={outlineColor}
        outlineStyle={tw.style('rounded-lg border', {
          borderColor: value
            ? error
              ? '#ff0000'
              : colors.PRIMARY_COLOR + '9a'
            : '#ccc',
          ...outlinedStyle,
        })}
        left={leftContent}
        right={rightContent}
        multiline={multiline}
        contentStyle={tw.style('', {...contentStyle})}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCorrect={autoCorrect}
        ref={ref}
        theme={{
          colors: {
            primary: cursorColor ? cursorColor : tw.color('gray-300'),
          },
        }}
      />
      {HelperTextCustom && error && <HelperTextCustom />}
      {helperText && error && (
        <Text
          style={tw.style('text-[12px] italic my-1', {
            color: colors.BLACK_COLOR,
            ...styleHelperText,
          })}>
          {helperText}
        </Text>
      )}
    </>
  );
};

export default React.forwardRef(TextInputCP);
