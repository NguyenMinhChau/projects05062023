import React from 'react';
import {Dialog, Portal} from 'react-native-paper';
import tw from '../../../styles/twrnc.global';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {IconCP} from '../../../utils/icon.utils';
import {useColorThemeGeneral} from '../config';

export default function DialogCP({
  visible,
  setVisible,
  children,
  title,
  TitleCustom,
  styleDialog,
  styleTitle,
  styleIconContainer,
  styleIconClose,
}) {
  const {colors} = useColorThemeGeneral();
  const heightDevice = Dimensions.get('window').height;
  return (
    <>
      {visible && (
        <Portal
          theme={{
            colors: {
              backdrop: 'rgba(0, 0, 0, 0.3)',
              surface: 'transparent',
            },
          }}>
          <Dialog
            style={tw.style(
              `p-0  mx-[5%] max-h-[${
                heightDevice - 80
              }px] rounded-xl overflow-hidden`,
              {
                backgroundColor: colors.BACKGROUND_CARD,
                ...styleDialog,
              },
            )}
            visible={visible}
            onDismiss={() => setVisible(false)}>
            <Dialog.Content style={tw.style(`p-0 m-0`)}>
              {title && (
                <View
                  style={tw`w-full flex flex-row gap-2 items-start justify-between`}>
                  <Text
                    style={tw.style(
                      `font-bold text-[18px] ml-4 mt-3 leading-6`,
                      {
                        color: colors.BLACK_COLOR,
                        ...styleTitle,
                      },
                    )}>
                    {title}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={tw.style({...styleIconContainer})}
                    onPress={() => setVisible(false)}>
                    <IconCP
                      style={tw.style(`text-right mt-3 mr-4`, {
                        ...styleIconClose,
                      })}
                      name="close-outline"
                      size={30}
                      color={colors.BLACK_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {TitleCustom && (
                <View
                  style={tw`w-full flex flex-row gap-2 items-start justify-between`}>
                  <TitleCustom />
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setVisible(false)}>
                    <IconCP
                      style={tw`text-right mt-3 mr-4`}
                      name="close-outline"
                      size={30}
                      color={colors.BLACK_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <>{children}</>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </>
  );
}
