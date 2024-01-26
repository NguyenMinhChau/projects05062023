import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import {useCopyToClipboard} from '../../../utils/copy.clipboard';
import {IconCP} from '../../../utils/icon.utils';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';

export default function RowDialogCP({
  header,
  label,
  subLabel,
  SubLabelCustom,
  value,
  ValueCP,
  valueList = [],
  colorVal,
  icon,
  colorIcon = '#57cf7f',
  leftImage,
  leftNameIcon,
  sizeLeftIcon = 23,
  colorLeftIcon,
  rightImage,
  rightNameIcon,
  sizeRightIcon = 23,
  colorRightIcon,
  noneBorderBottom,
  styleLabel,
  styleLabelContainer,
  styleSubLabel,
  styleVal,
  styleHeader,
  styleRow,
  styleLeftImage,
  styleLeftIcon,
  styleRightImage,
  styleRightIcon,
  noBullet = false,
  onCopy = false,
  dataAccord = [], // {title: '', value: {label: '', value: '', code: ''}}} || {label: '', value: '', code: ''}
  onClickAccord,
  showAccord = false,
  typeIcon,
  disabled = false,
  noValue = false,
}) {
  const {colors} = useGetColorThemeDisplay();
  const {onCopyToClipboard} = useCopyToClipboard();

  const ContentChildren = () => {
    return (
      <>
        <View style={tw`items-center flex-row`}>
          {leftNameIcon ? (
            <IconCP
              name={leftNameIcon}
              size={sizeLeftIcon}
              color={colorLeftIcon ? colorLeftIcon : colors.BLACK_COLOR}
              style={tw.style(`mr-1`, {...styleLeftIcon})}
              typeIcon={typeIcon}
            />
          ) : (
            <View
              style={tw.style('mr-1', leftImage && 'w-[25px] h-[25px]', {
                ...styleLeftImage,
              })}>
              {leftImage ? (
                <Image
                  source={leftImage}
                  resizeMode="contain"
                  style={tw`w-full h-full`}
                />
              ) : (
                <>
                  {!noBullet && (
                    <Text
                      style={tw.style({
                        color: colors.BLACK_COLOR,
                      })}>
                      -
                    </Text>
                  )}
                </>
              )}
            </View>
          )}
          <View style={tw.style({...styleLabelContainer})}>
            <Text
              style={tw.style('font-normal', {
                color: colors.BLACK_COLOR,
                ...styleLabel,
              })}>
              {label}
            </Text>
          </View>
        </View>

        {ValueCP ? (
          <ValueCP />
        ) : (
          <View style={tw`items-center justify-end flex-row flex-grow w-1`}>
            <Text
              style={tw.style('font-bold w-full text-right', {
                color: colorVal ? colorVal : colors.BLACK_COLOR,
                ...styleVal,
              })}>
              {icon ? (
                <IconCP
                  name="checkmark-circle-outline"
                  size={25}
                  color={colorIcon}
                />
              ) : rightNameIcon ? (
                <IconCP
                  name={rightNameIcon}
                  size={sizeRightIcon}
                  color={colorRightIcon ? colorRightIcon : colors.BLACK_COLOR}
                  style={tw.style(`ml-1`, {...styleRightIcon})}
                  typeIcon={typeIcon}
                />
              ) : rightImage ? (
                <View
                  style={tw.style('mr-1', rightImage && 'w-[30px] h-[30px]', {
                    ...styleRightImage,
                  })}>
                  <Image
                    source={rightImage}
                    resizeMode="contain"
                    style={tw`w-full h-full`}
                  />
                </View>
              ) : valueList.length > 0 ? (
                <View style={tw`flex-col items-end justify-end w-full gap-1`}>
                  {valueList.map((val, _idx) => (
                    <Text
                      key={_idx}
                      style={tw.style('font-bold w-full text-right', {
                        color: colorVal ? colorVal : colors.BLACK_COLOR,
                        ...styleVal,
                      })}>
                      {val}
                    </Text>
                  ))}
                </View>
              ) : !noValue ? (
                <Text
                  onPress={onCopy ? () => onCopyToClipboard(value) : () => {}}>
                  {onCopy && (
                    <IconCP
                      name="copy-outline"
                      size={16}
                      color={colors.BLACK_COLOR}
                    />
                  )}
                  <Text
                    onPress={onClickAccord ? onClickAccord : () => {}}
                    style={tw.style('text-[13px] leading-5 font-bold', {
                      color: colorVal ? colorVal : colors.BLACK_COLOR,
                      ...styleVal,
                    })}>
                    {value || value === 0 || EMPTY_CHAR}
                  </Text>
                </Text>
              ) : null}
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      {header && (
        <View
          style={tw.style('p-1 mt-3 w-full', {
            backgroundColor: colors.WHITE_COLOR_GRAY_100,
            ...styleHeader,
          })}>
          <Text
            style={tw.style(`font-bold`, {
              color: colors.BLACK_COLOR,
            })}>
            {header}
          </Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={onClickAccord && !disabled ? 0.8 : 1}
        onPress={onClickAccord && !disabled ? onClickAccord : () => {}}
        style={tw.style(
          'justify-between flex-row items-center gap-1 px-1 py-2 border-b-[0.5px] border-solid',
          noneBorderBottom && 'border-b-0',
          disabled && 'opacity-50',
          {
            borderColor: colors.BORDER_COLOR,
            ...styleRow,
          },
        )}>
        <ContentChildren />
      </TouchableOpacity>
      {subLabel && (
        <Text
          style={tw.style('text-[12px] font-bold mx-2 mb-2 leading-5', {
            color: colors.BLACK_COLOR,
            ...styleSubLabel,
          })}>
          {subLabel}
        </Text>
      )}
      {SubLabelCustom && <SubLabelCustom />}
      {onClickAccord && showAccord && (
        <View style={tw.style('max-h-[200px]')}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataAccord}
            keyExtractor={item => item.label}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity activeOpacity={1}>
                  <Text
                    style={tw.style('py-2', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={tw.style(`p-2 flex-grow`, {
              backgroundColor: colors.WHITE_COLOR,
            })}
            nestedScrollEnabled
          />
        </View>
      )}
    </>
  );
}
