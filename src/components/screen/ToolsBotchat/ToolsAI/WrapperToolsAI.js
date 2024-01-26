import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Banner from '../../Banner/Banner';
import Status from './Status';
import FastImage from 'react-native-fast-image';
import tw from '../../../../styles/twrnc.global';
import Footer from '../../../General/Footer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MESSAGE_STATUS_VIE_CONFIG} from './config';
import {
  Camera,
  CameraCaptureError,
  useCameraDevices,
} from 'react-native-vision-camera';
import {API_HANDLE_IMAGE, API_VALID_IMAGE} from '../../../../services/toolsai';
import useOrientation from '../../../../utils/hooks/useOrientation';
import useAppContext from '../../../../utils/hooks/useAppContext';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import ConditionImage from './ConditionImage';
import useAppPermission from '../../../../utils/MgnAccess/config';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import {fList} from '../../../../utils/array.utils';
import LoadingScreen from '../../../General/LoadingScreen';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import {TYPE_NOTIFICATION} from '../../../General/NotificationToast';
import ActionSheetCP from '../../../General/ActionSheetCP';

const WrapperToolsAI = ({navigation, titleHeader, typeImage, children}) => {
  const {state} = useAppContext();
  const {currentUser} = state.set_data;
  const {orientation} = useOrientation();
  const {colors} = useGetColorThemeDisplay();
  const {checkPermission, TYPE_ACCESS} = useAppPermission();

  const {email: email_user} = {...currentUser};

  const [status, setStatus] = useState('');
  const [data, setData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageRealTime, setSelectedImageRealTime] = useState(null);
  const [statusRealTime, setStatusRealTime] = useState(null);
  const [isProgress, setProgress] = useState(false);
  const [openVisionCamera, setOpenVisionCamera] = useState(false);
  const [isErrorRealTimeCamera, setIsErrorRealtimeCamera] = useState(false);
  const [isScannerRealTimeCamera, setIsScannerRealtimeCamera] = useState(false);
  const {openNotificationToast} = useNotificationToast();

  const camera = React.useRef(null);
  const devices = useCameraDevices();
  const device = Array.isArray(devices)
    ? fList(devices).find(i => i?.position === 'back')
    : devices?.back;
  const MAX_IMAGES = 10;

  React.useEffect(() => {
    if (camera?.current) {
      setIsScannerRealtimeCamera(true);
      const handleRealTimeCamera = async () => {
        try {
          const photo = await camera.current.takePhoto({
            playSoundOnCapture: false,
            enableShutterSound: false,
          });
          setIsScannerRealtimeCamera(false);
          if (photo) {
            setSelectedImageRealTime(photo);
            const newImageRealTime = {
              uri: 'file://' + photo.path,
              name: `image_${Date.now()}`,
            };
            API_VALID_IMAGE({
              email_user,
              typeImage,
              image: newImageRealTime,
              navigation,
              setProgress,
              setStatus,
              setData,
              setOpenVisionCamera,
              setSelectedImageRealTime,
              setIsErrorRealtimeCamera,
              setStatusRealTime,
              setIsScannerRealtimeCamera,
            });
          }
        } catch (e) {
          setIsErrorRealtimeCamera(true);
          setIsScannerRealtimeCamera(false);
          if (e instanceof CameraCaptureError) {
            switch (e.code) {
              case 'capture/file-io-error':
                console.error('Failed to write photo to disk!');
                break;
              default:
                console.error(e);
                break;
            }
          }
        }
      };
      setTimeout(() => {
        handleRealTimeCamera();
      }, 1500);
    }
  }, [openVisionCamera, camera, selectedImageRealTime]);

  const format = React.useMemo(() => {
    return device?.formats.reduce((prev, curr) => {
      if (prev == null) return curr;
      if (curr.maxFps > prev.maxFps) return curr;
      else return prev;
    }, undefined);
  }, [device?.formats]);

  const handleChoosePhoto = async () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      multiple: true,
      selectionLimit: MAX_IMAGES,
    };
    await launchImageLibrary(options, async response => {
      try {
        if (response.didCancel) {
          console.log('Cancelled');
        } else if (response.error) {
          console.log(response.error);
        } else {
          const newImages = response.assets.map(asset => ({
            uri: asset.uri,
            name: asset.fileName || `image_${Date.now()}`,
          }));
          setSelectedImages([...newImages, newImages]);
          setProgress(true);
          API_HANDLE_IMAGE({
            email_user,
            typeImage,
            image: newImages,
            navigation,
            setProgress,
            setStatus,
            setData,
            setOpenVisionCamera,
            setSelectedImageRealTime,
            setIsErrorRealtimeCamera,
            setStatusRealTime,
            setIsScannerRealtimeCamera,
          });
          deleteImage(newImages);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleTakePhoto = async () => {
    checkPermission(TYPE_ACCESS.CAMERA, false);
    const options = {
      title: 'Take Photo',
    };
    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.error) {
        console.log(response.error);
      } else {
        const uri = response?.uri || response?.assets?.[0]?.uri;
        if (uri) {
          const newImage = {
            uri: uri,
            name: `image_${Date.now()}`,
          };
          setSelectedImages(prevImages => [...prevImages, newImage]);
          setProgress(true);
          API_HANDLE_IMAGE({
            email_user,
            typeImage,
            image: newImage,
            navigation,
            setProgress,
            setStatus,
            setData,
            setOpenVisionCamera,
            setSelectedImageRealTime,
            setIsErrorRealtimeCamera,
            setStatusRealTime,
            setIsScannerRealtimeCamera,
          });
          deleteImage(newImage);
        }
      }
    });
  };

  const deleteImage = image => {
    setSelectedImages(prevImages =>
      prevImages.filter(item => item.uri !== image.uri),
    );
    setStatus('');
    setData({});
  };

  const {
    class: statusClass,
    message: messageStatus,
    score_confidence: scoreStatus,
  } = {...statusRealTime};

  const valVieByMessage = MESSAGE_STATUS_VIE_CONFIG.find(
    i => i.label === messageStatus?.toLowerCase(),
  );

  if (device === null) {
    useEffect(() => {
      openNotificationToast({
        title: 'Thông báo',
        message: 'Không tìm thấy camera trên thiết bị của bạn.',
        type: TYPE_NOTIFICATION.INFO,
      });
    }, []);
    return (
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title={titleHeader} />
        <View
          style={tw.style('flex-1 items-center justify-center', {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <ActivityIndicator size={20} color="#ccc" />
        </View>
      </SafeAreaWrap>
    );
  }

  return (
    <>
      {isProgress && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen navigation={navigation} title={titleHeader} />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`flex-grow p-2`}
            style={tw.style({
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <ConditionImage />
            <TouchableOpacity
              style={tw.style(
                `items-center justify-center mt-6 gap-2 py-5 mx-[50px] rounded-xl border-[2px] border-dashed border-red-500`,
              )}
              activeOpacity={0.8}
              onPress={handleChoosePhoto}>
              <Image
                style={tw.style('w-[50px] h-[50px]')}
                source={require('../../../../assets/images/image_lib.png')}
                resizeMode="contain"
              />
              <Text
                style={tw.style('text-[14px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Thêm ảnh từ thiết bị
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleTakePhoto}
              style={tw.style(
                `items-center justify-center mt-4 gap-2 py-5 mx-[50px] rounded-xl border-[2px] border-dashed border-yellow-500`,
              )}>
              <Image
                style={tw.style('w-[50px] h-[50px]')}
                source={require('../../../../assets/images/image_photo.png')}
                resizeMode="contain"
              />
              <Text
                style={tw.style(' text-[14px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Chụp thông số máy đo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (!device) {
                  openNotificationToast({
                    title: 'Thông báo',
                    message: 'Không tìm thấy camera trên thiết bị của bạn.',
                    type: TYPE_NOTIFICATION.INFO,
                  });
                  return;
                }
                checkPermission(TYPE_ACCESS.CAMERA, false);
                setOpenVisionCamera(true);
                setSelectedImageRealTime(null);
                setIsErrorRealtimeCamera(false);
                setIsScannerRealtimeCamera(false);
              }}
              style={tw.style(
                `items-center justify-center mt-4 gap-2 py-5 mx-[50px] rounded-xl border-[2px] border-dashed border-green-500`,
              )}>
              <FastImage
                style={tw.style('w-[60px] h-[60px]')}
                source={require('../../../../assets/images/image_scan.gif')}
                resizeMode="contain"
              />
              <Text
                style={tw.style(' text-[14px] font-bold', {
                  color: colors.BLACK_COLOR,
                })}>
                Quét tự động
              </Text>
            </TouchableOpacity>
            {children}
            {status !== '' && (
              <Status
                status={status}
                data={data}
                navigation={navigation}
                isVisible={true}
              />
            )}
          </ScrollView>
        </View>
        <ActionSheetCP
          title="Quét tự động"
          isVisible={openVisionCamera}
          onClose={() => setOpenVisionCamera(false)}
          onOpen={() => setOpenVisionCamera(true)}>
          <View
            style={tw.style(
              'rounded-lg my-3 items-center justify-start min-h-[550px] w-full',
            )}>
            {isScannerRealTimeCamera && (
              <Text
                style={tw.style(
                  'text-green-500 text-center text-[14px] mb-2 font-medium italic leading-5',
                )}>
                Đang quét ảnh...
              </Text>
            )}
            {isErrorRealTimeCamera && (
              <Text
                style={tw.style(
                  'text-red-500 text-center text-[14px] font-medium italic leading-5',
                )}>
                Ảnh chụp không đúng tiêu chuẩn, vui lòng đọc kĩ điều kiện hình
                ảnh và scan lại. Xin cảm ơn!
              </Text>
            )}
            {statusRealTime && (
              <View
                style={tw.style('flex-col gap-1 items-center justify-center')}>
                <Text style={tw.style('text-red-500 font-medium text-[14px]')}>
                  Trạng thái: {statusClass}
                </Text>
                <Text style={tw.style('text-red-500 font-medium text-[14px]')}>
                  Phản hồi: {valVieByMessage?.description}
                </Text>
                {scoreStatus && (
                  <Text
                    style={tw.style('text-red-500 font-medium text-[14px]')}>
                    Mức tin cậy (0-1): {scoreStatus}
                  </Text>
                )}
              </View>
            )}
            <View
              style={tw.style(
                'flex-1 w-full rounded-xl overflow-hidden bg-gray-100 border-[3px] mt-2',
                isErrorRealTimeCamera ? 'border-red-500' : 'border-green-500',
              )}>
              <View style={tw.style('flex-1 relative')}>
                <Camera
                  ref={camera}
                  style={tw.style('w-full h-full')}
                  device={device}
                  isActive={true}
                  format={Platform.OS === 'android' ? format : null}
                  orientation={
                    orientation === 'PORTRAIT' ? 'portrait' : 'landscape-left'
                  }
                  photoOptions={{
                    qualityPrioritization: 'speed',
                    maxResolution: 'high',
                  }}
                  photo
                />
                <FastImage
                  style={tw.style('w-full h-full absolute top-0 left-0')}
                  source={require('../../../../assets/images/scanner_realtime.gif')}
                  resizeMode="contain"
                />
                <Footer
                  style={tw.style('mb-0')}
                  styleLogo={tw.style('w-[100px] h-[60px]')}
                />
              </View>
            </View>
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
};

export default WrapperToolsAI;
