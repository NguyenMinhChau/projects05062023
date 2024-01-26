import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useColorThemeCCDC} from '../../config';
import tw from '../../../../../../styles/twrnc.global';
import {IconCP, TYPE_ICON} from '../../../../../../utils/icon.utils';
import {
  BLACK_COLOR,
  SUCCESS_COLOR,
} from '../../../../../../styles/colors.global';
import FastImageCP from '../../../../../General/FastImageCP';
import ButtonCP from '../../../../../General/ButtonCP';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ConditionImageKetQuaHan() {
  const {colors} = useColorThemeCCDC();
  const [dataImage, setDataImage] = React.useState(null);
  return (
    <>
      <View style={tw`flex-row items-center gap-1 mt-2`}>
        <IconCP name="filter-variant" typeIcon={TYPE_ICON.iconMaterial} size={20} color={colors.PRIMARY_COLOR} />
        <Text style={tw`text-[${colors.PRIMARY_COLOR}] text-[15px] font-bold`}>
          Điều kiện hình ảnh
        </Text>
      </View>
      <View style={tw`flex-col items-start`}>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh không quá mờ.
          </Text>
        </View>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh không bị chói sáng hoặc quá tối.
          </Text>
        </View>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh chụp màn hình máy đo đủ khoảng cách, không quá xa hoặc quá gần.
          </Text>
        </View>
        <View style={tw`flex-row items-start gap-1 mt-2`}>
          <IconCP
            name="checkmark-circle-outline"
            size={20}
            color={SUCCESS_COLOR}
          />
          <Text
            style={tw.style(`text-[13px]`, {
              color: colors.BLACK_COLOR,
            })}>
            Ảnh chụp có góc nghiêng không quá 30 độ.
          </Text>
        </View>
      </View>
      <View style={tw`flex-row items-center gap-1 mt-2`}>
        <IconCP name="image-outline" size={20} color={colors.PRIMARY_COLOR} />
        <Text style={tw`text-[${colors.PRIMARY_COLOR}] text-[15px] font-bold`}>
          Ảnh template hướng dẫn
        </Text>
      </View>
      <View style={tw.style('flex-row flex-wrap gap-3 my-3')}>
        <RenderItemImageTemplate
          topic="Mục kết quả hàn"
          type="Comway"
          uri={require('../../../../../../assets/CCDC/ket_qua_han/comway.jpg')}
          setDataImage={setDataImage}
        />
        <RenderItemImageTemplate
          topic="Mục kết quả hàn"
          type="Fitel"
          uri={require('../../../../../../assets/CCDC/ket_qua_han/fitel.jpg')}
          setDataImage={setDataImage}
        />
        <RenderItemImageTemplate
          topic="Mục kết quả hàn"
          type="Fujikura 68S+"
          uri={require('../../../../../../assets/CCDC/ket_qua_han/Fujikura/68S_plus.jpg')}
          setDataImage={setDataImage}
        />
        <RenderItemImageTemplate
          topic="Mục kết quả hàn"
          type="Fujikura 70S / 70S+"
          uri={require('../../../../../../assets/CCDC/ket_qua_han/Fujikura/70S_70S_plus.jpg')}
          setDataImage={setDataImage}
        />
      </View>
      {/* MODAL VIEW IMAGE */}
      <Modal
        transparent={true}
        // visible={dataImage ? true : false}
        visible={false}
        animationType="fade">
        <ImageViewer
          imageUrls={[
            {
              props: {
                source: dataImage,
              },
            },
          ]}
          enableSwipeDown={true}
          onSwipeDown={() => setDataImage(null)}
          style={tw.style('w-full h-[500px]')}
          loadingRender={() => {
            return (
              <View
                style={tw.style(
                  'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto',
                  {
                    backgroundColor: colors.WHITE_COLOR,
                  },
                )}>
                <ActivityIndicator size="small" color={colors.PRIMARY_COLOR} />
                <Text
                  style={tw.style('text-[15px] mb-3', {
                    color: colors.BLACK_COLOR,
                  })}>
                  Đang tải, vui lòng chờ
                </Text>
              </View>
            );
          }}
          renderHeader={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDataImage(null)}
                style={tw.style(
                  'absolute top-[10%] right-[15px] z-50 items-center justify-center w-[30px] h-[30px] rounded-full bg-white',
                )}>
                <IconCP name="close-outline" size={25} color={BLACK_COLOR} />
              </TouchableOpacity>
            );
          }}
          renderIndicator={(currentIndex, allSize) => {
            return (
              <>
                <View
                  style={tw.style(
                    'absolute top-[10%] left-[15px] z-50 items-center justify-center bg-white px-2 py-1 rounded',
                  )}>
                  <Text style={tw.style('text-[15px] text-black')}>
                    {currentIndex}/{allSize}
                  </Text>
                </View>
              </>
            );
          }}
          saveToLocalByLongPress={false}
          menus={({cancel, saveToLocal}) => {
            return (
              <View
                style={tw.style(
                  'absolute bottom-0 right-0 left-0 flex-col justify-center items-center w-full p-2 pb-[30px] shadow-lg rounded-tl-lg rounded-tr-lg',
                  {
                    backgroundColor: colors.BACKGROUND_CARD,
                  },
                )}>
                <View style={tw.style('flex-row w-full gap-2')}>
                  <ButtonCP
                    iconName="close-outline"
                    iconSize={25}
                    colorIcon="#fff"
                    colorBG="#ff0000"
                    colorBorder="#ff0000"
                    titleIcon="Thoát"
                    onPress={cancel}
                    styleContainer={tw.style('p-1 flex-1')}
                  />
                  <ButtonCP
                    iconName="download-outline"
                    iconSize={25}
                    colorIcon="#fff"
                    colorBG="#2f994e"
                    colorBorder="#2f994e"
                    titleIcon="Lưu ảnh"
                    onPress={saveToLocal}
                    styleContainer={tw.style('p-1 flex-1')}
                  />
                </View>
              </View>
            );
          }}
        />
      </Modal>
    </>
  );
}

const RenderItemImageTemplate = ({topic, type, uri, setDataImage}) => {
  const screenWidthItem = useWindowDimensions().width / 2 - 16;
  return (
    <View
      style={tw.style(
        `h-[150px] rounded-lg overflow-hidden border border-gray-100 relative`,
        {
          width: screenWidthItem,
        },
      )}>
      <TouchableOpacity
        activeOpacity={1}
        style={tw.style(
          'absolute top-0 left-0 right-0 z-50 bg-gray-100 px-[2px]',
        )}>
        <Text style={tw.style('text-black font-bold leading-5 text-[12px]')}>
          {topic}: <Text style={tw.style('text-red-500')}>{type}</Text>
        </Text>
      </TouchableOpacity>
      <FastImageCP
        uriLocal={uri}
        resizeMode="cover"
        onTouchStart={() => {
          setDataImage(uri);
        }}
        style={tw`w-full min-h-0 h-full`}
      />
    </View>
  );
};
