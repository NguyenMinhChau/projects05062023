import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import LoadingScreen from '../../../General/LoadingScreen';
import {useDialInf} from './hooks';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import tw from '../../../../styles/twrnc.global';
import {fList} from '../../../../utils/array.utils';
import FastImage from 'react-native-fast-image';
import Footer from '../../../General/Footer';
import useOrientation from '../../../../utils/hooks/useOrientation';
import FastImageCP from '../../../General/FastImageCP';
import BackgroundVideoCP from '../../../General/BackgroundVideo';
import ButtonCP from '../../../General/ButtonCP';
import DialogCP from '../../../General/Dialog/DialogCP';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconCP} from '../../../../utils/icon.utils';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../../../styles/colors.global';
import {TYPE_NOTIFICATION} from '../../../General/NotificationToast';
import {useNotificationToast} from '../../../../utils/notification_toast.utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {SCAN_QR_CODE_SERVICE} from '../../../../services/toolsBotchat/DialINF';
import {useAppLocation} from '../../../../utils/location.utils';
import moment from 'moment';
import {optionsImageLibrary} from './config';
import {launchImageLibraryUtils} from '../../../../utils/file.utils';
import ActionSheetCP from '../../../General/ActionSheetCP';

export default function DialINFScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {currentUser} = state.set_data;
  const {colors} = useGetColorThemeDisplay();
  const {
    isLoading,
    isVisibleResult,
    isVisibleUserJoin,
    isVisiblePrize,
    list_prize,
    list_user_join,
    list_user_prize,
    list_user_no_prize,
    user_info_program,
    qrcode_image,

    handleChangePhoto,
    handleChangeValue,
    CallApiGetPrize,
    CallApiGetUserJoin,
    CallApiGetUserPrize,
    CallApiGetUserNoPrize,
    CallApiGetUserInfoProgram,
  } = useDialInf();
  const {orientation} = useOrientation();
  const {latitude, longitude} = useAppLocation();
  const {openNotificationToast} = useNotificationToast();
  const [visibleCamera, setVisibleCamera] = React.useState(false);
  const [prizeActive, setPrizeActive] = React.useState('trung_thuong');
  const [scanRepeat, setScanRepeat] = React.useState(false);
  const [onFlash, setOnFlash] = React.useState(false);
  const [imageView, setImageView] = React.useState(null);
  const [selectedImageRealTime, setSelectedImageRealTime] =
    React.useState(null);

  const heightDevice = Dimensions.get('window').height;
  const widthDevice = Dimensions.get('window').width;

  const scanSuccess = async e => {
    if (e.data) {
      SCAN_QR_CODE_SERVICE({
        state,
        dispatch,
        openNotificationToast,
        endpoint: e.data,
        lat: latitude?.toString(),
        long: longitude?.toString(),
        emailUser: currentUser?.email,
      });
      setVisibleCamera(false);
    }
  };

  const {code, status, timeCheckIn, digits} = {...user_info_program?.[0]};

  const {donVi, chuc, tram} = {...digits};

  const checkCheckIn = code ? true : false;

  const {codeGroup, codeRole} = {...currentUser};

  const isAdmin =
    codeGroup?.codeGroup?.toLowerCase() === 'admin' ||
    codeRole?.toLowerCase() === 'admin';

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title={`Chương trình tất niên 2024`}
          styleText={tw.style('text-[15px]')}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          {/* ACTIONS */}
          <View style={tw.style('p-1 gap-1 flex-row flex-wrap bg-[#192e52]')}>
            {checkCheckIn && (
              <ButtonCP
                iconName="ribbon-outline"
                titleIcon="Xem kết quả"
                sizeIcon={13}
                colorIcon="#fff"
                colorBG="#d2502d"
                colorBorder="#d2502d"
                onPress={() => {
                  CallApiGetUserPrize();
                  handleChangeValue('isVisibleResult', true);
                }}
                styleText={tw.style('font-bold text-[9px] uppercase')}
                styleContainer={tw.style(' p-1 py-[6px] flex-1')}
              />
            )}
            {isAdmin && (
              <ButtonCP
                iconName="people-outline"
                titleIcon="Nguời tham gia"
                sizeIcon={13}
                colorIcon="#fff"
                colorBG="#d2502d"
                colorBorder="#d2502d"
                onPress={() => {
                  CallApiGetUserJoin();
                  handleChangeValue('isVisibleUserJoin', true);
                }}
                styleText={tw.style('font-bold text-[9px] uppercase')}
                styleContainer={tw.style(' p-1 py-[6px] flex-1')}
              />
            )}
            <ButtonCP
              iconName="reader-outline"
              titleIcon="Các giải thưởng"
              sizeIcon={13}
              colorIcon="#fff"
              colorBG="#d2502d"
              colorBorder="#d2502d"
              onPress={() => {
                CallApiGetPrize();
                handleChangeValue('isVisiblePrize', true);
              }}
              styleText={tw.style('font-bold text-[9px] uppercase')}
              styleContainer={tw.style(' p-1 py-[6px] flex-1')}
            />
          </View>

          <BackgroundVideoCP
            refreshControls={CallApiGetUserInfoProgram}
            styleContainer={tw.style('flex-1 items-center justify-center', {
              paddingTop: heightDevice / 6,
            })}
            // uriLocal={require('../../../../assets/video/video_background_01_2024.mp4')}>
            uriLocal={require('../../../../assets/video/ChuongTrinhTatNien2024.mp4')}>
            {/* CODE */}
            {checkCheckIn && (
              <View
                style={tw.style('flex-1 border-0 bg-transparent relative', {
                  width: 250,
                  minHeight: 230,
                })}>
                <View
                  style={tw.style(
                    'flex-1 rounded-md p-5 items-center justify-center gap-2',
                  )}>
                  <Text
                    style={tw.style(
                      'text-black text-[12px] text-center font-medium leading-5',
                    )}>
                    Đây là mã số dự thưởng của bạn
                  </Text>
                  <View
                    style={tw`flex-row items-center gap-2 justify-center w-full rounded-md p-2`}>
                    <View
                      style={tw.style(
                        'w-[50px] h-[50px] rounded-md bg-[#ff00001a] items-center justify-center',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[25px] text-center text-[#f62625] font-bold',
                        )}>
                        {tram || '-'}
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'w-[50px] h-[50px] rounded-md bg-[#ff00001a] items-center justify-center',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[25px] text-center text-[#f62625] font-bold',
                        )}>
                        {chuc || '-'}
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'w-[50px] h-[50px] rounded-md bg-[#ff00001a] items-center justify-center',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[25px] text-center text-[#f62625] font-bold',
                        )}>
                        {donVi || '-'}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={tw.style(
                      'text-black text-[12px] text-center font-medium leading-5 mb-2',
                    )}>
                    Chúc bạn một năm mới vui vẻ, hạnh phúc, thành công và gặp
                    thật nhiều may mắn nhé 🍀 INF yêu bạn ❤
                  </Text>
                </View>
              </View>
            )}

            {/* CAMERA */}
            {!checkCheckIn && (
              <View
                style={tw.style(
                  'overflow-hidden bg-transparent border-0 relative',
                  {
                    width: 300,
                    minHeight: 230,
                  },
                )}>
                {visibleCamera ? (
                  <>
                    <View
                      style={tw.style(
                        'flex-1 relative w-full bg-gray-50 h-full overflow-hidden rounded-xl',
                      )}>
                      <View
                        style={tw.style(
                          'absolute z-50 top-3 left-3 w-[23px] h-[3px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 top-3 left-3 w-[3px] h-[23px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 top-3 right-3 w-[23px] h-[3px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 top-3 right-3 w-[3px] h-[23px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 bottom-3 right-3 w-[23px] h-[3px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 bottom-3 right-3 w-[3px] h-[23px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 bottom-3 left-3 w-[23px] h-[3px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute z-50 bottom-3 left-3 w-[3px] h-[23px] bg-green-500',
                        )}></View>
                      <View
                        style={tw.style(
                          'absolute flex-row gap-1 items-center z-50 top-5 px-2 right-5',
                        )}>
                        {/* <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            launchImageLibraryUtils(
                              optionsImageLibrary,
                              handleChangePhoto,
                            );
                          }}
                          style={tw.style(
                            'flex-row items-center justify-center gap-1 p-1 rounded-md',
                            {
                              backgroundColor: '#ffffff5a',
                            },
                          )}>
                          <Text
                            style={tw.style(
                              'font-bold text-[12px] text-white',
                            )}>
                            Tải ảnh từ thư viện
                          </Text>
                          <IconCP
                            name={'image-outline'}
                            size={18}
                            color={PRIMARY_COLOR}
                          />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => setOnFlash(!onFlash)}
                          style={tw.style(
                            'flex-row items-center justify-center gap-1 p-1 rounded-md',
                            {
                              backgroundColor: '#ffffff5a',
                            },
                          )}>
                          <Text
                            style={tw.style(
                              'font-bold text-[12px] text-white',
                            )}>
                            {onFlash ? 'Flash Off' : 'Flash On'}
                          </Text>
                          <IconCP
                            name={
                              onFlash ? 'flash-outline' : 'flash-off-outline'
                            }
                            size={18}
                            color={PRIMARY_COLOR}
                          />
                        </TouchableOpacity>
                      </View>
                      <QRCodeScanner
                        onRead={scanSuccess}
                        flashMode={
                          onFlash
                            ? RNCamera.Constants.FlashMode.torch
                            : RNCamera.Constants.FlashMode.off
                        }
                        reactivate={true}
                        reactivateTimeout={1000}
                      />
                      <FastImage
                        style={tw.style('w-full h-full absolute top-0 left-0')}
                        source={require('../../../../assets/images/scanner_realtime.gif')}
                        resizeMode="contain"
                      />
                    </View>
                  </>
                ) : (
                  <View style={tw.style('flex-1 items-center justify-center')}>
                    <ButtonCP
                      iconName="id-card-outline"
                      titleIcon="Điểm danh tại đây"
                      colorIcon="#fff"
                      colorBG="#d2502d"
                      colorBorder="#d2502d"
                      onPress={() => {
                        setVisibleCamera(true);
                      }}
                      styleText={tw.style(
                        'text-white font-bold text-[14px] uppercase',
                      )}
                      styleContainer={tw.style('mb-2 mx-2')}
                    />
                  </View>
                )}
              </View>
            )}
          </BackgroundVideoCP>
        </View>
        {/* DANH SÁCH TRÚNG THƯỞNG/KHÔNG TRÚNG THƯỞNG */}
        <ActionSheetCP
          title={`Danh sách ${
            prizeActive === 'trung_thuong' ? '' : 'không '
          }trúng thưởng chương trình tất niên INF 2024`}
          styleTitle={tw.style('text-center px-2', {
            color: prizeActive === 'trung_thuong' ? '#34d058' : '#b71916',
          })}
          styleActionSheetContentChild={tw.style('bg-white')}
          styleActionSheetContent={tw.style('bg-white')}
          isVisible={isVisibleResult}
          onClose={() => handleChangeValue('isVisibleResult', false)}
          onOpen={() => handleChangeValue('isVisibleResult', true)}>
          <View style={tw`min-h-[300px] mt-3 flex-col gap-3`}>
            {/* TAB OPTIONS */}
            <View style={tw.style('flex-row items-center w-full')}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPrizeActive('trung_thuong')}
                style={tw.style(
                  'py-2 items-center justify-center border-b-[2px] flex-1',
                  {
                    borderBottomColor:
                      prizeActive === 'trung_thuong'
                        ? '#34d058'
                        : 'transparent',
                  },
                )}>
                <Text
                  style={tw.style('font-bold text-[15px]', {
                    color:
                      prizeActive === 'trung_thuong' ? '#34d058' : '#000000',
                  })}>
                  Trúng thưởng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPrizeActive('khong_trung_thuong')}
                style={tw.style(
                  'py-2 items-center justify-center border-b-[2px] flex-1',
                  {
                    borderBottomColor:
                      prizeActive === 'khong_trung_thuong'
                        ? '#b71916'
                        : 'transparent',
                  },
                )}>
                <Text
                  style={tw.style('font-bold text-[15px]', {
                    color:
                      prizeActive === 'khong_trung_thuong'
                        ? '#b71916'
                        : '#000000',
                  })}>
                  Không trúng thưởng
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={tw.style('font-bold text-black')}>
              Tổng:{' '}
              {prizeActive === 'trung_thuong'
                ? list_user_prize?.length?.toLocaleString()
                : list_user_no_prize?.length?.toLocaleString()}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={tw.style('w-full bg-gray-100 rounded-lg overflow-hidden')}>
              {prizeActive === 'trung_thuong' ? (
                <>
                  {/* THEAD */}
                  <View
                    style={tw.style(
                      'flex-row items-center justify-between w-full border-b-[1px] border-white',
                    )}>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1 py-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Email
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Phòng ban
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Mã dự thưởng
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Mã SP
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Tên SP
                      </Text>
                    </View>
                  </View>
                  {/* TBODY */}
                  {fList(list_user_prize)?.length > 0 ? (
                    fList(list_user_prize).map((item, _idx) => {
                      const {code, email, prize, phongBan} = {...item};
                      const {prizeName, prizeCode} = {...prize};
                      return (
                        <View
                          key={_idx}
                          style={tw.style(
                            `flex-row items-center justify-between w-full border-b-[1px] border-white`,
                          )}>
                          <View
                            style={tw.style(
                              'flex-col py-[6px] items-center justify-center flex-1',
                            )}>
                            {/* <View
                        style={tw.style('rounded-lg', {
                          width: 50,
                          height: 50,
                        })}>
                        <FastImageCP
                          uri={
                            'https://cdn.viettelstore.vn/Images/Product/ProductImage/1672788603.jpeg'
                          }
                          resizeMode="contain"
                          style={tw.style('w-full h-full min-h-0')}
                          onTouchStart={() => {
                            setImageView(
                              'https://cdn.viettelstore.vn/Images/Product/ProductImage/1672788603.jpeg',
                            );
                          }}
                        />
                      </View> */}
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {email || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px]  items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {phongBan || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px]  items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {code || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px]  items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {prizeCode || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px] items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {prizeName || '-'}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Text
                      style={tw.style(
                        'text-black italic text-[10px] text-center m-2',
                      )}>
                      Chưa có danh sách trúng thưởng
                    </Text>
                  )}
                </>
              ) : (
                <>
                  {/* THEAD */}
                  <View
                    style={tw.style(
                      'flex-row items-center justify-between w-full border-b-[1px] border-white',
                    )}>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1 py-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Email
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Phòng ban
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Mã dự thưởng
                      </Text>
                    </View>
                    <View
                      style={tw.style(
                        'flex-col items-center justify-center flex-1',
                      )}>
                      <Text
                        style={tw.style(
                          'text-[10px] text-[#243c7c] font-bold text-center',
                        )}>
                        Thời gian Checkin
                      </Text>
                    </View>
                  </View>
                  {/* TBODY */}
                  {fList(list_user_no_prize)?.length > 0 ? (
                    fList(list_user_no_prize).map((item, _idx) => {
                      const {code, email, timeCheckIn, phongBan} = {...item};
                      return (
                        <View
                          key={_idx}
                          style={tw.style(
                            `flex-row items-center justify-between w-full border-b-[1px] border-white`,
                          )}>
                          <View
                            style={tw.style(
                              'flex-col py-[6px] items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {email || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px] items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {phongBan || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px]  items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {code || '-'}
                            </Text>
                          </View>
                          <View
                            style={tw.style(
                              'flex-col py-[6px] items-center justify-center flex-1',
                            )}>
                            <Text
                              style={tw.style(
                                'text-[10px] text-black text-center',
                              )}>
                              {code && timeCheckIn
                                ? moment(timeCheckIn)
                                    .add(7, 'hours')
                                    .format('DD/MM/YYYY HH:mm:ss')
                                : '-'}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Text
                      style={tw.style(
                        'text-black italic text-[10px] text-center m-2',
                      )}>
                      Chưa có danh sách không trúng thưởng
                    </Text>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
        </ActionSheetCP>
        {/* DANH SÁCH NGƯỜI THAM GIA */}
        <ActionSheetCP
          title="Danh sách nhân sự tham gia chương trình tất niên INF 2024"
          styleTitle={tw.style('text-center px-2 text-[#b71916]')}
          styleActionSheetContentChild={tw.style('bg-white')}
          styleActionSheetContent={tw.style('bg-white')}
          isVisible={isVisibleUserJoin}
          onClose={() => handleChangeValue('isVisibleUserJoin', false)}
          onOpen={() => handleChangeValue('isVisibleUserJoin', true)}>
          <View style={tw`min-h-[300px] mt-3 flex-col gap-3`}>
            <Text style={tw.style('font-bold text-black')}>
              Tổng: {list_user_join?.length?.toLocaleString()}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={tw.style('w-full bg-gray-100 rounded-lg overflow-hidden')}>
              {/* THEAD */}
              <View
                style={tw.style(
                  'flex-row items-center justify-between w-full border-b-[1px] border-white',
                )}>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1 py-2',
                  )}>
                  <Text
                    style={tw.style(
                      'text-[10px] text-[#243c7c] font-bold text-center',
                    )}>
                    Email
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1 py-2',
                  )}>
                  <Text
                    style={tw.style(
                      'text-[10px] text-[#243c7c] font-bold text-center',
                    )}>
                    Phòng
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1',
                  )}>
                  <Text
                    style={tw.style(
                      'text-[10px] text-[#243c7c] font-bold text-center',
                    )}>
                    Trạng thái
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1 py-2',
                  )}>
                  <Text
                    style={tw.style(
                      'text-[10px] text-[#243c7c] font-bold text-center',
                    )}>
                    Thời gian Check in
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1',
                  )}>
                  <Text
                    style={tw.style(
                      'text-[10px] text-[#243c7c] font-bold text-center',
                    )}>
                    Mã dự thưởng
                  </Text>
                </View>
              </View>
              {/* TBODY */}
              {fList(list_user_join)?.length > 0 ? (
                fList(list_user_join).map((item, _idx) => {
                  const {email, status, code, timeCheckIn, phongBan} = {
                    ...item,
                  };
                  return (
                    <View
                      key={_idx}
                      style={tw.style(
                        `flex-row items-center justify-between w-full border-b-[1px] border-white`,
                      )}>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center flex-1 ',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {email || '-'}
                        </Text>
                      </View>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center flex-1 ',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {phongBan || '-'}
                        </Text>
                      </View>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center flex-1',
                        )}>
                        <Text
                          style={tw.style(
                            `text-[10px] ${
                              code ? 'text-green-500' : 'text-red-500'
                            }  text-center`,
                          )}>
                          {code ? 'Đã Check in' : 'Chưa Check in'}
                        </Text>
                      </View>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center flex-1',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {code
                            ? timeCheckIn
                              ? moment(timeCheckIn)
                                  .add(7, 'hours')
                                  .format('DD/MM/YYYY HH:mm:ss')
                              : '-'
                            : '-'}
                        </Text>
                      </View>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center flex-1 ',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {code || '-'}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={tw.style(
                    'text-black italic text-[10px] text-center m-2',
                  )}>
                  Chưa có danh sách người tham gia
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ActionSheetCP>
        {/* DANH SÁCH CÁC GIẢI THƯỞNG */}
        <ActionSheetCP
          title="Danh sách các giải thưởng chương trình tất niên INF 2024"
          styleTitle={tw.style('text-center px-2 text-[#b71916]')}
          styleActionSheetContentChild={tw.style('bg-white')}
          styleActionSheetContent={tw.style('bg-white')}
          isVisible={isVisiblePrize}
          onClose={() => handleChangeValue('isVisiblePrize', false)}
          onOpen={() => handleChangeValue('isVisiblePrize', true)}>
          <View style={tw`min-h-[300px] mt-3 flex-col gap-3`}>
            <Text style={tw.style('font-bold text-black')}>
              Tổng: {list_prize?.length?.toLocaleString()}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={tw.style('w-full bg-gray-100 rounded-lg overflow-hidden')}>
              {/* THEAD */}
              <View
                style={tw.style(
                  'flex-row items-center justify-between w-full border-b-[1px] border-white',
                )}>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center w-[50px] py-2',
                  )}>
                  <Text
                    style={tw.style('text-[10px] text-[#243c7c] font-bold')}>
                    STT
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center w-[150px] py-2 ',
                  )}>
                  <Text
                    style={tw.style('text-[10px] text-[#243c7c] font-bold')}>
                    Mã SP
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'flex-col items-center justify-center flex-1 py-2',
                  )}>
                  <Text
                    style={tw.style('text-[10px] text-[#243c7c] font-bold')}>
                    Tên SP
                  </Text>
                </View>
              </View>
              {/* TBODY */}
              {fList(list_prize)?.length > 0 ? (
                fList(list_prize).map((item, _idx) => {
                  const {prizeCode, prizeName} = {...item};
                  return (
                    <View
                      key={_idx}
                      style={tw.style(
                        `flex-row items-center justify-between w-full border-b-[1px] border-white`,
                      )}>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center w-[50px]',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {_idx + 1}
                        </Text>
                      </View>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center w-[150px] ',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {prizeCode}
                        </Text>
                      </View>
                      <View
                        style={tw.style(
                          'flex-col py-[6px] items-center justify-center flex-1 ',
                        )}>
                        <Text
                          style={tw.style(
                            'text-[10px] text-black text-center',
                          )}>
                          {prizeName}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={tw.style(
                    'text-black italic text-[10px] text-center m-2',
                  )}>
                  Chưa có danh sách các giải thưởng
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ActionSheetCP>
      </SafeAreaWrap>

      {/* VIEW IMAGE */}
      <Modal
        transparent={true}
        visible={imageView ? true : false}
        animationType="fade">
        <ImageViewer
          imageUrls={[{url: imageView}]}
          enableSwipeDown={true}
          onSwipeDown={() => setImageView(null)}
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
                onPress={() => setImageView(null)}
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
        />
      </Modal>
    </>
  );
}
