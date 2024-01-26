import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import tw from '../../../../../styles/twrnc.global';
import {SCREEN_NAVIGATE} from '../../../../routersConfig/General.config';
import ResultItem from './ResultItem';
import ButtonCP from '../../../../General/ButtonCP';
import {handleDownloadRemoteImage} from '../../../../../utils/cameraRoll.utils';
import LoadingScreen from '../../../../General/LoadingScreen';
import {useCopyToClipboard} from '../../../../../utils/copy.clipboard';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import FastImageCP from '../../../../General/FastImageCP';
import {useGetColorThemeDisplay} from '../../../../../utils/appearance.utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconCP} from '../../../../../utils/icon.utils';
import {BLACK_COLOR} from '../../../../../styles/colors.global';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import {useNotificationToast} from '../../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../../General/NotificationToast';

const ResultPage = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState('');
  const {colors} = useGetColorThemeDisplay();
  const {onCopyToClipboard} = useCopyToClipboard();
  const {openNotificationToast} = useNotificationToast();

  const {data: cardData} = {...route.params};

  const handleCardPress = (cardId, url) => {
    setIsVisible(true);
    setUrlPhoto(url);
  };

  const RenderFlatList = ({item, index}) => {
    const dataContent = [
      ...(item?.R ||
      item?.R === '' ||
      item?.R === '0' ||
      item?.U ||
      item?.U === '' ||
      item?.U === '0'
        ? [
            {
              label: 'Trạng thái',
              key: 'class',
            },
            {
              label: 'Message',
              key: 'message',
            },
            {
              label: 'Điện trở',
              key: 'R',
            },
            {
              label: 'Hiệu điện thế',
              key: 'U',
            },
          ]
        : []),
      ...(item?.power ||
      item?.power === '' ||
      item?.power === '0' ||
      item?.wave ||
      item?.wave === '' ||
      item?.wave === '0'
        ? [
            {
              label: 'Trạng thái',
              key: 'class',
            },
            {
              label: 'Message',
              key: 'message',
            },
            {
              label: 'Cable Status',
              key: 'cable_status',
            },
            {
              label: 'Công suất',
              key: 'power',
            },
            {
              label: 'Bước sóng',
              key: 'wave',
            },
          ]
        : []),
    ];
    return (
      <ResultItem
        item={item}
        index={index}
        dataContent={dataContent}
        handleCardPress={handleCardPress}
      />
    );
  };

  return (
    <>
      {isLoad && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title="Kết quả xử lý" />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style(`flex-1 w-full`, {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            {Array.isArray(cardData) && cardData.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={cardData}
                contentContainerStyle={tw.style(
                  `flex-grow justify-start items-start mt-3 pb-[50px] px-3 gap-2`,
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={RenderFlatList}
              />
            ) : (
              <>
                <FastImageCP
                  uriLocal={require('../../../../../assets/images/in_progress.png')}
                  resizeMode="contain"
                  style={tw.style('w-full h-[500px]')}
                />
                <Text
                  style={tw.style(
                    'text-gray-500 text-[15px] text-center italic',
                  )}>
                  Không tìm thấy kết quả xử lý nào
                </Text>
              </>
            )}
            <Modal transparent={true} visible={isVisible} animationType="fade">
              <ImageViewer
                imageUrls={[{url: urlPhoto}]}
                enableSwipeDown={true}
                onSwipeDown={() => setIsVisible(false)}
                style={tw.style('w-full')}
                loadingRender={() => {
                  return (
                    <View
                      style={tw.style(
                        'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto',
                        {
                          backgroundColor: colors.WHITE_COLOR,
                        },
                      )}>
                      <ActivityIndicator
                        size="small"
                        color={colors.PRIMARY_COLOR}
                      />
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
                    <View
                      style={tw.style(
                        'absolute z-50 top-[10%] right-0 left-0 flex-row items-center justify-end flex-1 gap-1 px-2',
                      )}>
                      <View style={tw.style('flex-row items-center gap-4')}>
                        <ButtonCP
                          sizeIcon={25}
                          iconName="download-outline"
                          onPress={() => {
                            handleDownloadRemoteImage(
                              urlPhoto,
                              () => {
                                setIsLoad(true);
                              },
                              () => {
                                setIsLoad(false);
                                setIsVisible(false);
                              },
                              () => {
                                openNotificationToast({
                                  title: 'Thông báo',
                                  message: 'Tải hình ảnh thành công',
                                  type: TYPE_NOTIFICATION.SUCCESS,
                                });
                              },
                              () => {
                                openNotificationToast({
                                  title: 'Thông báo',
                                  message: 'Tải hình ảnh thất bại',
                                  type: TYPE_NOTIFICATION.ERROR,
                                });
                              },
                            );
                          }}
                          variant="outlined"
                          colorIcon={BLACK_COLOR}
                          colorBorder={BLACK_COLOR}
                          styleContainer={tw.style('p-1 ml-2 bg-white')}
                        />
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => setIsVisible(false)}
                          style={tw.style(
                            'items-center justify-center w-[30px] h-[30px] rounded-full bg-white',
                          )}>
                          <IconCP
                            name="close-outline"
                            size={25}
                            color={BLACK_COLOR}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                renderFooter={() => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        onCopyToClipboard(urlPhoto);
                        Linking.openURL(urlPhoto);
                      }}
                      style={tw.style(
                        'items-center justify-center p-2 pb-[15%]',
                      )}>
                      <Text
                        style={tw.style('text-center font-medium text-white')}>
                        Nhấn vào để sao chép:{' '}
                        <Text
                          style={tw.style(
                            'text-blue-500 text-center font-medium flex-1 w-1',
                          )}>
                          {urlPhoto}
                        </Text>
                      </Text>
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
          </View>
        </View>
      </SafeAreaWrap>
    </>
  );
};

export default ResultPage;
