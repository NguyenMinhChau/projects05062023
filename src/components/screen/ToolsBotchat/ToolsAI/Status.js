import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';
import tw from '../../../../styles/twrnc.global';
import {EMPTY_CHAR} from '../../../../helpers/_empty';
import DialogCP from '../../../General/Dialog/DialogCP';
import {IconCP} from '../../../../utils/icon.utils';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {
  BLACK_COLOR,
  CRITICAL_COLOR,
  SUCCESS_COLOR,
} from '../../../../styles/colors.global';
import {MESSAGE_STATUS_VIE_CONFIG, PARSE_MESSAGE} from './config';
import moment from 'moment';
import 'moment/locale/vi';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';

const PopupPage = ({status, data, navigation, user}) => {
  const [isVisible, setIsVisible] = useState(true);
  const {colors} = useGetColorThemeDisplay();

  useEffect(() => {
    setIsVisible(status === true || status === false);
  }, [status]);

  const closePopup = () => {
    setIsVisible(false);
  };

  const onNavigate = () => {
    const convertRes = {data: data, navigation: navigation};
    navigation.navigate(SCREEN_NAVIGATE.ResultPage_Screen, convertRes);
    setIsVisible(false);
  };

  const currentDate = new Date();

  const formattedDate = moment(currentDate)
    .locale('vi')
    .format('dddd, DD/MM/YYYY HH:mm:ss');

  const dataRender = [
    ...(status === true &&
    (data?.[0]?.R ||
      data?.[0]?.R === '' ||
      data?.[0]?.R === '0' ||
      data?.[0]?.U ||
      data?.[0]?.U === '' ||
      data?.[0]?.U === '0')
      ? [
          {
            label: 'Trở suất',
            key: 'R',
          },
          {
            label: 'Hiệu điện thế',
            key: 'U',
          },
        ]
      : status === true &&
        (data?.[0]?.power ||
          data?.[0]?.power === '' ||
          data?.[0]?.power === '0' ||
          data?.[0]?.wave ||
          data?.[0]?.wave === '' ||
          data?.[0]?.wave === '0')
      ? [
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
    ...(status === false
      ? [
          {
            label: 'Trạng thái',
            key: 'class',
          },
          {
            label: 'Nguyên nhân lỗi',
            key: 'message',
            reason: Object.keys(PARSE_MESSAGE || {}).includes(data[0]?.message)
              ? PARSE_MESSAGE[data[0]?.message].reason
              : '',
          },
          {
            label: 'Đề xuất',
            key: 'message',
            recommend: Object.keys(PARSE_MESSAGE || {}).includes(
              data[0]?.message,
            )
              ? PARSE_MESSAGE[data[0]?.message].recommend
              : '',
          },
        ]
      : []),
  ];

  const dataHeader = {
    ...(status === true
      ? {
          uriImage: require('../../../../assets/images/Success_Micro_Transparent.gif'),
          title: 'Xử lý thành công',
        }
      : {}),
    ...(status === false
      ? {
          uriImage: require('../../../../assets/images/cancel_icon.png'),
          title: 'Xử lý thất bại',
        }
      : {}),
  };

  return (
    <>
      <DialogCP
        visible={isVisible}
        setVisible={val => setIsVisible(val)}
        title="Kết quả xử lý">
        <ScrollView
          contentContainerStyle={tw.style('items-center pb-4')}
          style={tw`h-auto`}
          showsVerticalScrollIndicator={false}>
          <FastImage
            style={tw.style('w-[150px] h-[100px]')}
            source={dataHeader.uriImage}
            resizeMode="contain"
          />
          <Text
            style={tw.style('text-[25px] font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            {dataHeader.title}
          </Text>
          <Text
            style={tw.style('text-[15px] font-bold capitalize', {
              color: colors.BLACK_COLOR,
            })}>
            {formattedDate}
          </Text>
          <View
            style={tw.style(
              'items-center flex-row gap-1 justify-start px-2 w-full mt-5',
            )}>
            <IconCP
              name="camera-outline"
              size={23}
              color={colors.BLACK_COLOR}
            />
            <Text
              style={tw.style(' font-bold text-[15px]', {
                color: colors.BLACK_COLOR,
              })}>
              Giá trị ảnh
            </Text>
          </View>
          {dataRender.map((item, index) => {
            const valVieByMessage = MESSAGE_STATUS_VIE_CONFIG.find(
              i => i.label === data[0]?.[item.key]?.toLowerCase(),
            );

            return (
              <RowDialogCP
                key={index}
                label={item.label}
                value={
                  valVieByMessage
                    ? valVieByMessage?.description
                    : data[0]?.[item.key] || EMPTY_CHAR
                }
                SubLabelCustom={() => {
                  return (
                    <>
                      {(item.reason || item.recommend) && (
                        <View
                          style={tw.style('flex-1 px-3 justify-start w-full')}>
                          <Text
                            style={tw.style('text-black leading-5 text-left')}>
                            {item.reason || item.recommend || ''}
                          </Text>
                        </View>
                      )}
                    </>
                  );
                }}
                styleSubLabel={tw.style('w-[150px]')}
                leftNameIcon="checkmark-done-outline"
                styleLeftIcon={tw.style({
                  color:
                    status === true
                      ? SUCCESS_COLOR
                      : status === false
                      ? CRITICAL_COLOR
                      : BLACK_COLOR,
                })}
                styleRow={tw`px-2 py-1`}
                noneBorderBottom
                noBullet
              />
            );
          })}
          <View style={tw.style('flex-row w-[100%] gap-1 px-2 mt-3')}>
            <TouchableOpacity
              style={tw.style(
                `items-center justify-center bg-${
                  status === true ? 'green' : 'red'
                }-600 py-2 rounded-lg flex-1`,
              )}
              onPress={closePopup}>
              <Text
                style={tw.style('font-bold text-[15px] uppercase text-white')}>
                OK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'items-center justify-center bg-blue-600 py-2 rounded-lg flex-1',
              )}
              onPress={onNavigate}>
              <Text
                style={tw.style('font-bold text-[15px] uppercase text-white')}>
                Xem chi tiết
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DialogCP>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    height: '65%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    justifyContent: 'flex-start', // Align content to the left
    // borderRadius: 20,
  },
  imageStatusContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 48,
    height: 48,
  },
  modalText: {
    fontSize: 23,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: 'black',
  },
  divider: {
    marginTop: 10,
    width: 223,
    height: 2,
    backgroundColor: '#988D8D',
  },
  dateContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingTop: 5,
  },
  title: {
    color: 'black',
    fontSize: 16,
    // fontFamily: 'Roboto',
    fontWeight: '600',
    textAlign: 'left',
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button1: {
    backgroundColor: '#234EE8',
    color: 'white',
    borderWidth: 1,
    borderColor: '#4EAFE5',
    borderRadius: 7,
    width: 200,
    height: 50,
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 15,
    marginTop: 10,
    fontWeight: '900',
  },
  button2: {
    color: '#4EAFE5',
    borderWidth: 1,
    borderColor: '#4EAFE5',
    borderRadius: 7,
    width: 200,
    height: 50,
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
});

export default PopupPage;
