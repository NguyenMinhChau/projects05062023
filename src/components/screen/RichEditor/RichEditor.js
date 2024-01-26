import React from 'react';
import {useColorThemeRichEditor} from './config';
import {SafeAreaWrap} from '../../General/SafeAreaWrap';
import tw from '../../../styles/twrnc.global';
import {Dimensions, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {IconCP, TYPE_ICON} from '../../../utils/icon.utils';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import useAppContext from '../../../utils/hooks/useAppContext';
import TextInputCP from '../../General/TextInputCP';
import ButtonCP from '../../General/ButtonCP';
import DialogCP from '../../General/Dialog/DialogCP';
import {
  optionsImageLibrary,
  optionsLaunchCamera,
  optionsVideoLibrary,
  DATA_COLOR,
} from './config';
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../utils/file.utils';
import useAppPermission from '../../../utils/MgnAccess/config';
import {EmojiRichEditorView} from './EmojiRichEditorView';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import ActionSheetCP from '../../General/ActionSheetCP';

export default function RichEditorScreen({navigation, route}) {
  const heightDevice = Dimensions.get('window').height;
  const {colors} = useColorThemeRichEditor();
  const {state, dispatch} = useAppContext();
  const {
    content_editor,
    url_editor,
    title_url_editor,
    html_editor,
    font_size_editor,
    fore_color_editor,
    bg_color_editor,
    visibleLink_editor,
    visibleHTML_editor,
    visibleForeColor_editor,
    visibleBgcColor_editor,
    visibleEmoji_editor,
  } = state.set_data.rich_editor;
  const [visibleImage, setVisibleImage] = React.useState(false);
  const richText = React.useRef();
  const {checkPermission, TYPE_ACCESS} = useAppPermission();

  const handleChangeRich = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'rich_editor',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleBack = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'rich_editor',
        value: {
          url_editor: '',
          title_url_editor: '',
          content_editor: '',
          html_editor: '',
          font_size_editor: 1,
          fore_color_editor: '#000000',
          bg_color_editor: 'transparent',
          visibleLink_editor: false,
          visibleHTML_editor: false,
          visibleForeColor_editor: false,
          visibleBgcColor_editor: false,
          visibleEmoji_editor: false,
        },
      }),
    );
  };

  const onPressAddImage = React.useCallback(() => {
    setVisibleImage(true);
  }, []);

  const onInsertVideo = React.useCallback(() => {
    launchImageLibraryUtils(optionsVideoLibrary, handleChangeVideo);
  }, []);

  const onInsertLink = React.useCallback(() => {
    handleChangeRich('visibleLink_editor', true);
  }, []);

  const onInsertHTML = React.useCallback(() => {
    handleChangeRich('visibleHTML_editor', true);
  }, []);

  const onIncreaseFontSize = React.useCallback(() => {
    if (font_size_editor === 7) return;
    handleChangeRich('font_size_editor', font_size_editor + 1);
    richText?.current?.setFontSize(font_size_editor + 1);
  }, [font_size_editor]);

  const onDecreaseFontSize = React.useCallback(() => {
    if (font_size_editor === 1) return;
    handleChangeRich('font_size_editor', font_size_editor - 1);
    richText?.current?.setFontSize(font_size_editor - 1);
  }, [font_size_editor]);

  const onForeColor = React.useCallback(() => {
    handleChangeRich('visibleForeColor_editor', true);
  }, []);

  const onBgcColor = React.useCallback(() => {
    handleChangeRich('visibleBgcColor_editor', true);
  }, []);

  const onEmoji = React.useCallback(() => {
    Keyboard.dismiss();
    richText.current?.blurContentEditor();
    handleChangeRich('visibleEmoji_editor', !visibleEmoji_editor);
  }, [visibleEmoji_editor]);

  // func handle
  const handleInsertLink = () => {
    richText?.current?.insertLink(title_url_editor, url_editor);
    handleChangeRich('visibleLink_editor', false);
    handleChangeRich('url_editor', '');
    handleChangeRich('title_url_editor', '');
  };

  const handleInsertHTML = () => {
    richText?.current?.insertHTML(html_editor);
    handleChangeRich('visibleHTML_editor', false);
    handleChangeRich('html_editor', '');
  };

  const handleForeColor = color => {
    richText.current?.setForeColor(color);
  };

  const handleBgcColor = color => {
    richText.current?.setHiliteColor(color);
  };

  const handleInsertEmoji = React.useCallback(emoji => {
    richText.current?.insertText(emoji);
    richText.current?.blurContentEditor();
    handleChangeRich('visibleEmoji_editor', false);
  }, []);

  const handleChangePhoto = async response => {
    if (response) {
      const payload = {
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName,
        type: response?.assets?.[0]?.type,
        base64: response?.assets?.[0]?.base64,
      };
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'file',
          value: {...state.set_data.file, file_single: payload},
        }),
      );
      richText.current?.insertImage(
        `data:${payload.type};base64,${payload.base64}`,
        // height: 250px; object-fit: stretch;
        'background: transparent; width: 100%;',
      );
      setVisibleImage(false);
    }
  };

  const handleChangeVideo = async response => {
    if (response) {
      const payload = {
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName,
        type: response?.assets?.[0]?.type,
      };
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'file',
          value: {...state.set_data.file, file_single: payload},
        }),
      );
      // richText.current?.insertVideo(
      //   url,
      //   'width: 100%;',
      // );
      const htmlVideo = `<video controls src="${payload.uri}" type="video/mp4"></video>`;
      richText.current?.insertHTML(htmlVideo);
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Nhập thông tin"
          handleBack={handleBack}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <RichEditor
            ref={richText}
            initialFocus={true}
            firstFocusEnd={true}
            disabled={false}
            useContainer={true}
            initialHeight={heightDevice - 180}
            enterKeyHint={'done'}
            placeholder="Write something..."
            placeholderStyle={tw.style('text-[14px]')}
            initialContentHTML={'<p>Write something...</p>'}
            onChange={val => {
              handleChangeRich('content_editor', val);
            }}
            onPaste={data => {}}
            editorStyle={{
              backgroundColor: '#fff',
              color: '#000',
              caretColor: fore_color_editor,
              placeholderColor: 'gray',
              paddingBottom: '50px',
            }}
            style={{
              flex: 1,
            }}
            on
          />
          <View
            style={tw.style(
              'w-full bg-white items-center justify-center py-1',
            )}>
            <RichToolbar
              editor={richText}
              activeOpacity={0.9}
              disabled={false}
              selectedIconTint={colors.ACTIVE_COLOR}
              onPressAddImage={onPressAddImage}
              insertVideo={onInsertVideo}
              onInsertLink={onInsertLink}
              insertHTML={onInsertHTML}
              foreColor={onForeColor}
              hiliteColor={onBgcColor}
              insertEmoji={onEmoji}
              flatContainerStyle={{
                paddingHorizontal: 12,
              }}
              actions={[
                actions.keyboard,
                actions.undo,
                actions.redo,
                actions.removeFormat,
                actions.setStrikethrough,
                // actions.checkboxList,
                actions.insertOrderedList,
                actions.insertBulletsList,
                actions.blockquote,
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.alignFull,
                actions.heading1,
                actions.heading2,
                actions.heading3,
                actions.heading4,
                actions.heading5,
                actions.heading6,
                actions.code,
                actions.line,
                actions.insertLink,
                actions.indent,
                actions.outdent,
                actions.insertImage,
                // actions.insertVideo,
                actions.foreColor,
                actions.hiliteColor,
                'insertEmoji',
                'insertHTML',
                'increaseFontSize',
                'decreaseFontSize',
              ]}
              iconMap={{
                insertEmoji: require('../../../assets/images/emoji.png'),
                insertHTML: require('../../../assets/images/html_emoji.png'),
                increaseFontSize: ({tintColor}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onIncreaseFontSize}>
                    <IconCP
                      name="format-font-size-increase"
                      size={20}
                      color={tintColor}
                      typeIcon={TYPE_ICON.iconMaterial}
                    />
                  </TouchableOpacity>
                ),
                decreaseFontSize: ({tintColor}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onDecreaseFontSize}>
                    <IconCP
                      name="format-font-size-decrease"
                      size={20}
                      color={tintColor}
                      typeIcon={TYPE_ICON.iconMaterial}
                    />
                  </TouchableOpacity>
                ),
                [actions.heading1]: ({tintColor}) => (
                  <Text
                    style={{
                      color: tintColor,
                    }}>
                    H1
                  </Text>
                ),
                [actions.heading2]: ({tintColor}) => (
                  <Text
                    style={{
                      color: tintColor,
                    }}>
                    H2
                  </Text>
                ),
                [actions.heading3]: ({tintColor}) => (
                  <Text
                    style={{
                      color: tintColor,
                    }}>
                    H3
                  </Text>
                ),
                [actions.heading4]: ({tintColor}) => (
                  <Text
                    style={{
                      color: tintColor,
                    }}>
                    H4
                  </Text>
                ),
                [actions.heading5]: ({tintColor}) => (
                  <Text
                    style={{
                      color: tintColor,
                    }}>
                    H5
                  </Text>
                ),
                [actions.heading6]: ({tintColor}) => (
                  <Text
                    style={{
                      color: tintColor,
                    }}>
                    H6
                  </Text>
                ),
                [actions.foreColor]: ({tintColor}) => (
                  <View style={tw.style('flex-col items-center')}>
                    <Text style={{color: '#000000'}}>Aa</Text>
                    <View
                      style={tw.style(`w-[20px] h-1 rounded-sm`, {
                        backgroundColor: fore_color_editor,
                      })}></View>
                  </View>
                ),
                [actions.hiliteColor]: ({tintColor}) => (
                  <View
                    style={tw.style(`w-[20px] h-[20px] border rounded`, {
                      backgroundColor: bg_color_editor,
                      borderColor:
                        bg_color_editor === 'transparent'
                          ? '#84898e'
                          : bg_color_editor,
                    })}></View>
                ),
              }}
            />
            <View style={tw.style('flex-row w-full gap-2 px-2')}>
              <ButtonCP
                iconName="close-outline"
                titleIcon="Thoát"
                colorIcon="#ffffff"
                sizeIcon={20}
                styleText={tw.style('text-[14px]')}
                colorBG="#ff0000"
                colorBorder="#ff0000"
                styleContainer={tw.style('rounded-lg mt-1 p-[6px] flex-1')}
                onPress={() => navigation.goBack()}
              />
              <ButtonCP
                iconName="save-outline"
                titleIcon="Lưu thông tin"
                colorIcon="#ffffff"
                sizeIcon={20}
                styleText={tw.style('text-[14px]')}
                colorBG={colors.PRIMARY_COLOR}
                colorBorder={colors.PRIMARY_COLOR}
                styleContainer={tw.style('rounded-lg mt-1 p-[6px] flex-1')}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>

        {/* INSERT LINK */}
        <DialogCP
          visible={visibleLink_editor}
          setVisible={val => handleChangeRich('visibleLink_editor', val)}
          styleDialog={tw`mx-10`}
          title="Chèn link">
          <View
            style={tw.style(`p-4 rounded-md w-full`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <TextInputCP
              placeholder="Nhập tên url hiển thị"
              value={title_url_editor}
              onChange={val => {
                handleChangeRich('title_url_editor', val);
              }}
              contentStyle={tw`p-2`}
              style={tw.style(`min-h-[35px] h-[35px]`)}
              outlinedStyle={tw`border border-gray-400`}
            />
            <TextInputCP
              placeholder="Nhập url"
              value={url_editor}
              onChange={val => {
                handleChangeRich('url_editor', val);
              }}
              style={tw.style(`min-h-[35px] h-[35px]`)}
              contentStyle={tw`p-2`}
              outlinedStyle={tw`border border-gray-400`}
            />
            <View style={tw`flex flex-row justify-end gap-2`}>
              <ButtonCP
                iconName="close-outline"
                colorIcon="#ffffff"
                colorBorder="#dc2626"
                colorBG="#dc2626"
                titleIcon="Thoát"
                onPress={() => {
                  handleChangeRich('visibleLink_editor', false);
                  handleChangeRich('url_editor', '');
                  handleChangeRich('title_url_editor', '');
                }}
                sizeIcon={20}
                styleContainer={tw.style(`p-1`)}
              />
              <ButtonCP
                iconName="checkmark-outline"
                titleIcon="OK"
                colorIcon="#fff"
                colorBorder={colors.PRIMARY_COLOR}
                colorBG={colors.PRIMARY_COLOR}
                disabled={!url_editor || !title_url_editor}
                onPress={handleInsertLink}
                sizeIcon={20}
                styleContainer={tw.style(`p-1`)}
              />
            </View>
          </View>
        </DialogCP>
        {/* CHOOSE IMAGE */}
        <ActionSheetCP
          title="Chọn ảnh"
          isVisible={visibleImage}
          onClose={() => setVisibleImage(false)}
          onOpen={() => setVisibleImage(true)}>
          <View style={tw`mt-3 min-h-[130px]`}>
            <RowDialogCP
              label="Chọn ảnh từ thư viện"
              styleLabel={tw`font-medium`}
              styleRow={tw.style('py-3')}
              leftNameIcon={'image-outline'}
              onClickAccord={() => {
                launchImageLibraryUtils(optionsImageLibrary, handleChangePhoto);
              }}
              noValue
            />
            <RowDialogCP
              label="Chụp ảnh"
              styleLabel={tw`font-medium`}
              styleRow={tw.style('py-3')}
              leftNameIcon={'camera-outline'}
              onClickAccord={() => {
                checkPermission(TYPE_ACCESS.CAMERA, false);
                launchCameraUtils(optionsLaunchCamera, handleChangePhoto);
              }}
              noValue
            />
          </View>
        </ActionSheetCP>
        {/* INSERT HTML */}
        <DialogCP
          visible={visibleHTML_editor}
          setVisible={val => handleChangeRich('visibleHTML_editor', val)}
          styleDialog={tw`mx-10`}
          title="Chèn HTML">
          <View
            style={tw.style(`p-4 rounded-md w-full`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <TextInputCP
              placeholder="Past HTML vào đây"
              value={html_editor}
              multiline
              onChange={val => {
                handleChangeRich('html_editor', val);
              }}
              style={tw.style(`min-h-[150px]`)}
              contentStyle={tw`p-2`}
              outlinedStyle={tw`border border-gray-400`}
            />
            <View style={tw`flex flex-row justify-end gap-2`}>
              <ButtonCP
                iconName="close-outline"
                colorIcon="#ffffff"
                colorBorder="#dc2626"
                colorBG="#dc2626"
                titleIcon="Thoát"
                onPress={() => {
                  handleChangeRich('visibleHTML_editor', false);
                  handleChangeRich('html_editor', '');
                }}
                sizeIcon={20}
                styleContainer={tw.style(`p-1`)}
              />
              <ButtonCP
                iconName="checkmark-outline"
                titleIcon="OK"
                colorIcon="#fff"
                colorBorder={colors.PRIMARY_COLOR}
                colorBG={colors.PRIMARY_COLOR}
                disabled={!html_editor}
                onPress={handleInsertHTML}
                sizeIcon={20}
                styleContainer={tw.style(`p-1`)}
              />
            </View>
          </View>
        </DialogCP>
        {/* FORE COLOR */}
        <DialogCP
          visible={visibleForeColor_editor}
          setVisible={val => handleChangeRich('visibleForeColor_editor', val)}
          styleDialog={tw`mx-10 my-10`}
          title="Chọn màu chữ">
          <View
            style={tw.style(`p-4 rounded-md w-full`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <View
              style={tw`flex flex-row flex-wrap gap-4 justify-between mb-5`}>
              {DATA_COLOR.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleForeColor(item);
                    handleChangeRich('fore_color_editor', item);
                    handleChangeRich('visibleForeColor_editor', false);
                  }}
                  style={tw.style(
                    `w-[30px] h-[30px] rounded-full border ${
                      item === 'transparent' ? '' : 'shadow-md'
                    }`,
                    {
                      backgroundColor: item,
                      borderWidth: item === 'transparent' ? 1 : 0,
                      borderColor: colors.BLACK_COLOR,
                    },
                  )}
                />
              ))}
            </View>
          </View>
        </DialogCP>
        {/* BACKGROUND COLOR */}
        <DialogCP
          visible={visibleBgcColor_editor}
          setVisible={val => handleChangeRich('visibleBgcColor_editor', val)}
          styleDialog={tw`mx-10 my-10`}
          title="Chọn Background">
          <View
            style={tw.style(`p-4 rounded-md w-full`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <View
              style={tw`flex flex-row flex-wrap gap-4 justify-between mb-5`}>
              {DATA_COLOR.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleBgcColor(item);
                    handleChangeRich('bg_color_editor', item);
                    handleChangeRich('visibleBgcColor_editor', false);
                  }}
                  style={tw.style(
                    `w-[30px] h-[30px] rounded-full border ${
                      item === 'transparent' ? '' : 'shadow-md'
                    }`,
                    {
                      backgroundColor: item,
                      borderWidth: item === 'transparent' ? 1 : 0,
                      borderColor: colors.BLACK_COLOR,
                    },
                  )}
                />
              ))}
            </View>
          </View>
        </DialogCP>
        {/* EMOJI */}
        <DialogCP
          visible={visibleEmoji_editor}
          setVisible={val => handleChangeRich('visibleEmoji_editor', val)}
          styleDialog={tw`mx-10`}
          title="Chọn Emoji">
          <View
            style={tw.style(`p-4 rounded-md w-full max-h-[300px]`, {
              backgroundColor: colors.BACKGROUND_CARD,
            })}>
            <EmojiRichEditorView onSelect={handleInsertEmoji} />
          </View>
        </DialogCP>
      </SafeAreaWrap>
    </>
  );
}
