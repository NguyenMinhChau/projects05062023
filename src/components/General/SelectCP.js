import React from 'react';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import {BGC_INFO_COLOR} from '../../styles/colors.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {IconCP} from '../../utils/icon.utils';

{
  /* <SelectCP
  placeholder="Model Name"
  searchPlaceholder="Tìm kiếm Model"
  dataOptions={[{value: 'Model 1'}, {value: 'Model 2'}, {value: 'Model 3'}]}
  onSelect={val => handleChangeForm('model_name', val)}
/>; */
}

export default function SelectCP({
  onSelect,
  dataOptions,
  placeholder,
  searchPlaceholder = 'Tìm kiếm',
  multiple = false,
  labelMultiple = '',
  notFoundText = 'Không tìm thấy',
  defaultValue,
}) {
  const {colors} = useGetColorThemeDisplay();
  const Select = multiple ? MultipleSelectList : SelectList;
  return (
    <>
      <Select
        setSelected={onSelect}
        data={dataOptions}
        save="value"
        defaultOption={defaultValue}
        label={labelMultiple}
        placeholder={defaultValue ? defaultValue : placeholder}
        searchPlaceholder={searchPlaceholder}
        notFoundText={notFoundText}
        boxStyles={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#ccc',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
        inputStyles={{
          fontSize: 14,
          color: colors.BLACK_COLOR,
          marginHorizontal: -4,
          paddingLeft: 10,
        }}
        dropdownStyles={{
          marginTop: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          maxHeight: 200,
          marginBottom: 20,
          borderBottomWidth: 4,
        }}
        badgeStyles={{
          backgroundColor: BGC_INFO_COLOR,
        }}
        dropdownTextStyles={{
          color: colors.BLACK_COLOR,
        }}
        arrowicon={
          <IconCP
            name="chevron-down-outline"
            size={20}
            color={colors.BLACK_COLOR}
          />
        }
        closeicon={
          <IconCP name="close-outline" size={20} color={colors.BLACK_COLOR} />
        }
        searchicon={
          <IconCP name="search-outline" size={20} color={colors.BLACK_COLOR} />
        }
      />
    </>
  );
}
