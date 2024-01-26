import {View, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import tw from '../styles/twrnc.global';
import {IconCP} from './icon.utils';
import {fList} from './array.utils';

export const TYPE_TOAST = {
  SUCCESS: 'successToast',
  ERROR: 'errorToast',
  WARNING: 'warningToast',
  INFO: 'infoToast',
};

export const toastConfig = colors => {
  return {
    [TYPE_TOAST.SUCCESS]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2`,
            {
              backgroundColor: colors.BACKGROUND_CARD_TOAST,
            },
          )}>
          <IconCP name="checkmark-circle" size={23} color="#3ab952" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#3ab952] font-bold text-[16px]`)}>
                {title || 'Đã xử lý thành công'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(`text-[14px] leading-6 text-justify my-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                {message || 'Xử lý thành công'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.ERROR]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2`,
            {
              backgroundColor: colors.BACKGROUND_CARD_TOAST,
            },
          )}>
          <IconCP name="close-circle-outline" size={23} color="#e85450" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#e85450] font-bold text-[16px]`)}>
                {title || 'Đã xảy ra lỗi'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(`text-[14px] leading-6 text-justify my-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                {message ||
                  'Xử lý thất bại. Vui lòng liên hệ phòng KTHT - INFMN để được hỗ trợ.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.WARNING]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2`,
            {
              backgroundColor: colors.BACKGROUND_CARD_TOAST,
            },
          )}>
          <IconCP name="alert-circle-outline" size={23} color="#e3b432" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#e3b432] font-bold text-[16px]`)}>
                {title || 'Đã xảy vấn đề'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(`text-[14px] leading-6 text-justify my-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                {message ||
                  'Có thể bạn đang gặp một vài vấn đề. Vui lòng liên hệ phòng KTHT - INFMN để được hỗ trợ.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.INFO]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2`,
            {
              backgroundColor: colors.BACKGROUND_CARD_TOAST,
            },
          )}>
          <IconCP name="information-circle-outline" size={23} color="#1e90ff" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#1e90ff] font-bold text-[16px]`)}>
                {title || 'Thông báo'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(`text-[14px] leading-6 text-justify my-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                {message || 'ICDP Mobile có một vài thông tin gửi đến bạn.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
  };
};
