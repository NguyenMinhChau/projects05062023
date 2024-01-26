import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {Iconify} from 'react-native-iconify';
import tw from '../../styles/twrnc.global';
import {useLayoutAnimation} from '../../utils/LayoutAnimation';
import {IconCP} from '../../utils/icon.utils';
import {fList} from '../../utils/array.utils';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';

export default function AccordionCP({
  open,
  defaultOpen = false,
  toggleDropDown,
  dataList,
  openSub2,
  toggleDropDownSub2,

  styleRow,
  title,
  styleTitle,
  TitleCustom,
  onClickItem,
  onRedirect,
  sourceImage,
  sourceIcon,
  colorDots = '#2b5de1',

  RenderItemCustom,
}) {
  return (
    <>
      <RenderItemMenu
        open={open}
        defaultOpen={defaultOpen}
        toggleDropDown={toggleDropDown}
        dataList={dataList}
        openSub2={openSub2}
        toggleDropDownSub2={toggleDropDownSub2}
        styleRow={styleRow}
        title={title}
        styleTitle={styleTitle}
        TitleCustom={TitleCustom}
        onClickItem={onClickItem}
        onRedirect={onRedirect}
        sourceImage={sourceImage}
        sourceIcon={sourceIcon}
        colorDots={colorDots}
        RenderItemCustom={RenderItemCustom}
      />
    </>
  );
}

export const RenderItemMenu = ({
  open,
  defaultOpen,
  toggleDropDown,
  dataList,
  openSub2,
  toggleDropDownSub2,

  styleRow,
  title,
  styleTitle,
  TitleCustom,
  onClickItem,
  onRedirect,
  sourceImage,
  sourceIcon,
  colorDots = '#2b5de1',
  borderBottomColor,
  RenderItemCustom,
}) => {
  const {colors} = useGetColorThemeDisplay();
  const {LayoutAnimationConfig, ANIMATION_TYPE, ANIMATION_PROPERTY} =
    useLayoutAnimation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={tw.style(
        `py-2 m-2 p-2 border-b-[1px] border-b-gray-100 relative`,
        {
          borderBottomColor: borderBottomColor || '#fafafa',
          ...styleRow,
        },
      )}
      onPress={() => {
        fList(dataList).length === 0 && !RenderItemCustom && !onRedirect
          ? {}
          : fList(dataList).length > 0 || RenderItemCustom
          ? toggleDropDown()
          : onRedirect
          ? onRedirect()
          : onClickItem();
        // LayoutAnimationConfig(
        //   300,
        //   ANIMATION_TYPE.LINEAR,
        //   ANIMATION_PROPERTY.OPACITY,
        // );
      }}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row flex-1 items-center justify-start`}>
          {sourceImage && <Image source={sourceImage} style={tw`mr-1`} />}
          {sourceIcon && sourceIcon}
          {TitleCustom ? (
            <TitleCustom />
          ) : (
            <Text
              style={tw.style(`text-[16px] pl-2 font-bold`, {
                color: colors.BLACK_COLOR,
                ...styleTitle,
              })}>
              {title}
            </Text>
          )}
        </View>
        {(fList(dataList).length > 0 || RenderItemCustom) && (
          <IconCP
            name={
              defaultOpen || open
                ? 'chevron-down-outline'
                : 'chevron-forward-outline'
            }
            size={18}
            color={colors.BLACK_COLOR}
          />
        )}
      </View>
      {(defaultOpen || open) &&
        (fList(dataList).length > 0 || RenderItemCustom) && (
          <>
            <View style={tw`w-full m-2`}></View>
            <View style={tw`flex-col gap-2`}>
              {RenderItemCustom ? (
                <RenderItemCustom />
              ) : (
                <>
                  {fList(dataList).map((item, index) =>
                    item?.subMenuLev2 ? (
                      <RenderItemMenu
                        key={index}
                        toggleDropDown={toggleDropDownSub2}
                        open={openSub2}
                        title={item?.label}
                        dataList={item?.subMenuLev2}
                        onClickItem={onClickItem}
                        onRedirect={onRedirect}
                        sourceImage={item?.image}
                        sourceIcon={item?.icon}
                        colorDots={colorDots}
                        borderBottomColor={'transparent'}
                      />
                    ) : (
                      <RenderSubFinal
                        key={index}
                        item={item}
                        onRedirect={onRedirect}
                        onClickItem={onClickItem}
                        colorDots={colorDots}
                      />
                    ),
                  )}
                </>
              )}
            </View>
          </>
        )}
    </TouchableOpacity>
  );
};

export const RenderSubFinal = ({item, onRedirect, onClickItem, colorDots}) => {
  const {colors} = useGetColorThemeDisplay();
  return (
    <TouchableOpacity
      style={tw`flex-row items-center`}
      onPress={
        item?.disabled
          ? () => {}
          : onRedirect
          ? () => onRedirect(item)
          : () => onClickItem(item.value)
      }
      disabled={item?.disabled || false}>
      <Iconify
        icon="ph:dot-duotone"
        size={40}
        color={item?.disabled ? colors.DISABLED_COLOR : colorDots}
      />
      <Text
        style={tw.style('text-[16px] ml-1 flex-grow w-1', {
          color: item?.disabled ? colors.DISABLED_COLOR : colors.BLACK_COLOR,
        })}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};
