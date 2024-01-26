import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Platform,
} from 'react-native';
import tw from '../../../../../styles/twrnc.global';
import {IconCP, TYPE_ICON} from '../../../../../utils/icon.utils';
import {
  BGC_CRITICAL_COLOR,
  BGC_SUCCESS_COLOR,
  BLACK_COLOR,
  CRITICAL_COLOR,
  PRIMARY_COLOR,
} from '../../../../../styles/colors.global';
import RowDialogCP from '../../../../General/Dialog/RowDialogCP';
import {
  CLASS_TYPE_OPTIONS,
  IS_VIEW_OPTIONS,
  MESSAGE_STATUS_VIE_CONFIG,
  TYPE_IMAGE_OPTIONS,
} from '../config';
import {fList} from '../../../../../utils/array.utils';
import {EMPTY_CHAR} from '../../../../../helpers/_empty';
import TextInputCP from '../../../../General/TextInputCP';
import useAppContext from '../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../Context/AppContext.reducer';
import useDebounce from '../../../../../utils/hooks/useDebounce';
import {GET_LIST_GALLERY, SAVED_GALLERY} from '../../../../../services/toolsai';
import LoadingScreen from '../../../../General/LoadingScreen';
import {useRefreshList} from '../../../../../utils/refreshList.utils';
import PaginationCP from '../../../../General/PaginationCP';
import FastImageCP from '../../../../General/FastImageCP';
import {useLayoutAnimation} from '../../../../../utils/LayoutAnimation';
import CustomSelectCP from '../../../../General/CustomSelectCP';
import ButtonCP from '../../../../General/ButtonCP';
import BannerNestedScreen from '../../../../General/BannerNestedScreen';
import {useGetColorThemeDisplay} from '../../../../../utils/appearance.utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import {SafeAreaWrap} from '../../../../General/SafeAreaWrap';
import {useNotificationToast} from '../../../../../utils/notification_toast.utils';
import {TextInput} from 'react-native-paper';
import ActionSheetCP from '../../../../General/ActionSheetCP';

export default function GalleryHistoryScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {search} = state.set_data;
  const {list_gallery, class_type, type_image, isView, user, isFilter} =
    state.set_data.tools_ai;
  const {page, limit} = state.set_data.pagination;
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [itemModal, setItemModal] = React.useState(null);
  const refGallery = React.useRef(null);
  const [activeDropDown, setActiveDropdown] = React.useState(null);
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();
  const {openNotificationToast} = useNotificationToast();

  const debounceSearch = useDebounce(search, 500);

  const handleBack = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'pagination',
        value: {
          page: 1,
          limit: 10,
        },
      }),
    );
  };

  const handleSavedGallery = id => {
    setSubmitting(true);
    SAVED_GALLERY({
      idGallery: id,
      state,
      dispatch,
      classType: class_type,
      typeImage: type_image,
      isView: isView?.map(item => item === 'true'),
      user: user,
      limit,
      page,
      setLoadingMore,
      setSubmitting,
      openNotificationToast,
    });
  };

  const handleChangeForm = (key, val) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_ai',
        value: {
          ...state.set_data.tools_ai,
          [key]: val,
        },
      }),
    );
  };

  const CallAPI = () => {
    setLoadingMore(true);
    GET_LIST_GALLERY({
      classType: class_type,
      typeImage: type_image,
      isView: isView?.map(item => item === 'true'),
      user: user,
      state,
      dispatch,
      limit,
      page,
      setLoadingMore,
      setSubmitting,
      openNotificationToast,
    });
  };

  const {refreshing, onRefresh} = useRefreshList(CallAPI);

  const handleClearFilter = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'tools_ai',
        value: {
          ...state.set_data.tools_ai,
          class_type: [],
          type_image: [],
          isView: [],
          user: [],
        },
      }),
    );
  };

  React.useEffect(() => {
    CallAPI();
  }, [page]);

  const RenderItem = ({item}) => {
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
      <View style={tw.style('flex-1 flex-col m-[1px]')}>
        <TouchableOpacity
          activeOpacity={1}
          key={item?._id}
          style={tw.style(
            'flex-1 flex-row rounded-lg overflow-hidden shadow-md bg-white',
            {
              backgroundColor:
                item?.class === 'ok' ? BGC_SUCCESS_COLOR : BGC_CRITICAL_COLOR,
            },
          )}>
          <FastImageCP
            uri={item?.original}
            onTouchStart={() => {
              setIsVisible(true);
              setItemModal(item);
            }}
          />
          <View
            style={tw.style('flex-1 flex-col justify-start items-start p-1')}>
            {fList(dataContent).map((content, index) => {
              const valVieByMessage = MESSAGE_STATUS_VIE_CONFIG.find(
                i => i.label === item[content?.key]?.toString()?.toLowerCase(),
              );
              return (
                <RowDialogCP
                  key={index}
                  label={content?.label}
                  value={
                    valVieByMessage
                      ? valVieByMessage?.description
                      : item[content?.key]?.toString() || EMPTY_CHAR
                  }
                  noneBorderBottom
                  noBullet
                  styleRow={tw`p-1`}
                  styleVal={tw`text-black`}
                  styleLabel={tw`text-black`}
                />
              );
            })}
            <RowDialogCP
              label="Loại"
              value={item?.type}
              noneBorderBottom
              noBullet
              styleRow={tw`p-1`}
              styleVal={tw`text-[12px] text-black`}
              styleLabel={tw`text-black`}
            />
            <RowDialogCP
              label="Nhân sự"
              value={item?.user}
              noneBorderBottom
              noBullet
              styleRow={tw`p-1`}
              styleVal={tw`text-[12px] text-black`}
              styleLabel={tw`text-black`}
            />
            <View
              style={tw.style(
                'flex-row items-center justify-between w-full p-1',
              )}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSavedGallery(item?._id)}
                style={tw.style(
                  'bg-white p-1 rounded flex-row items-center gap-1 justify-center',
                )}>
                <IconCP
                  name={item?.isView ? 'bookmark-outline' : 'ban-outline'}
                  size={16}
                  color={item?.isView ? PRIMARY_COLOR : CRITICAL_COLOR}
                />
                <Text
                  style={tw.style(
                    `font-bold text-[12px] text-[${
                      item?.isView ? PRIMARY_COLOR : CRITICAL_COLOR
                    }]`,
                  )}>
                  {item?.isView ? 'Saved' : 'Not saved'}
                </Text>
              </TouchableOpacity>
              <Text
                style={tw.style(
                  'text-[12px] text-black text-right font-bold flex-grow w-1',
                )}>
                {item?.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const groupByDate = data => {
    return data.reduce((acc, item) => {
      const date = item?.time.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  let groupedData = groupByDate(fList(list_gallery?.payload));

  const USER_DATA_OPTIONS = Object.entries(groupedData || {}).reduce(
    (acc, [key]) => {
      const filtered = groupedData[key].filter(item => {
        return item?.user;
      });
      if (filtered.length) {
        acc.push({
          label: filtered[0]?.user,
          value: filtered[0]?.user,
        });
      }
      return acc.filter(
        (item, index, self) =>
          index === self.findIndex(t => t.value === item.value),
      );
    },
    [],
  );

  if (debounceSearch) {
    groupedData = Object.entries(groupedData || {}).reduce(
      (acc, [key, data]) => {
        const filtered = data.filter(item => {
          const date = item?.time.split(' ')[0].split('/').reverse().join('/');
          return date.includes(debounceSearch);
        });
        if (filtered.length) {
          acc[key] = filtered;
        }
        return acc;
      },
      {},
    );
  }

  return (
    <>
      {submitting && <LoadingScreen />}
      <SafeAreaWrap
        backgroundColorTop={colors.MAIN_COLOR}
        backgroundColorBottom={colors.WHITE_COLOR}>
        <BannerNestedScreen
          navigation={navigation}
          title="Lịch sử xử lý ảnh"
          handleBack={handleBack}
        />
        <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
          <View
            style={tw.style('flex-1 relative', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <View style={tw.style('gap-1 flex-row p-1')}>
              <View style={tw.style('flex-1')}>
                <TextInputCP
                  placeholder="Nhập ngày tháng năm (01/01/2023)"
                  placeholderTextColor={'#677483'}
                  textColor={BLACK_COLOR}
                  cursorColor={PRIMARY_COLOR}
                  name="search"
                  value={search}
                  onChange={val => {
                    dispatch(SET_DATA_PAYLOAD({key: 'search', value: val}));
                  }}
                  style={tw.style(`bg-white justify-center h-[35px] mb-0`)}
                  contentStyle={tw.style('mr-[40px] ml-[45px]')}
                  outlinedStyle={tw.style('rounded-lg border', {
                    borderColor: colors.PRIMARY_COLOR,
                  })}
                  rightContent={
                    <TextInput.Icon
                      icon="close-circle-outline"
                      size={23}
                      color={colors.PRIMARY_COLOR}
                      style={tw.style('mr-[-8px]')}
                      onTouchStart={() => {
                        dispatch(SET_DATA_PAYLOAD({key: 'search', value: ''}));
                      }}
                    />
                  }
                  leftContent={
                    <TextInput.Icon
                      icon="magnify"
                      size={23}
                      color={colors.PRIMARY_COLOR}
                    />
                  }
                />
              </View>
              <ButtonCP
                colorBorder={colors.PRIMARY_COLOR}
                colorBG={colors.PRIMARY_COLOR}
                colorIcon={'#fff'}
                iconName={isFilter ? 'filter-variant-remove' : 'filter-variant'}
                typeIcon={TYPE_ICON.iconMaterial}
                onPress={() => {
                  handleChangeForm('isFilter', !isFilter);
                }}
                styleContainer={tw.style('px-2 py-[5px]')}
              />
            </View>
            <ScrollView
              ref={refGallery}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.PRIMARY_COLOR]}
                  onTouchEnd={() => handleChangeForm('isFilter', false)}
                />
              }
              style={tw.style('flex-1')}
              contentContainerStyle={tw`flex-col flex-wrap p-1 ${
                Object.entries(groupedData)?.length === 0 ? 'flex-1' : ''
              }`}
              scrollEventThrottle={400}>
              {loadingMore ? (
                <View
                  style={tw.style(
                    'items-center flex-1 justify-center p-2 flex-row gap-1',
                  )}>
                  <Text
                    style={tw.style('italic', {
                      color: colors.BLACK_COLOR,
                    })}>
                    Đang tải dữ liệu
                  </Text>
                  <ActivityIndicator
                    size="small"
                    color={colors.DISABLED_COLOR}
                    animating={loadingMore}
                  />
                </View>
              ) : (
                <>
                  {Object.entries(groupedData || {})?.length > 0 ? (
                    Object.entries(groupedData || {})
                      .sort((a, b) => {
                        const dateA = a[0].split('/').reverse().join('/');
                        const dateB = b[0].split('/').reverse().join('/');
                        if (dateA > dateB) {
                          return -1;
                        } else if (dateA < dateB) {
                          return 1;
                        } else {
                          return 0;
                        }
                      })
                      .map((item, index) => {
                        const [date, data] = item;
                        return (
                          <View
                            style={tw.style('flex-1 flex-col w-full', {
                              marginTop: index === 0 ? 0 : 10,
                            })}
                            onTouchStart={() =>
                              handleChangeForm('isFilter', false)
                            }
                            key={index}>
                            <View style={tw.style('p-2')}>
                              <Text
                                style={tw.style(`text-[16px] font-bold`, {
                                  color: colors.BLACK_COLOR,
                                })}>
                                {date
                                  ?.split(' ')[0]
                                  .split('/')
                                  .reverse()
                                  .join('/')}
                              </Text>
                            </View>
                            <FlatList
                              data={data}
                              renderItem={RenderItem}
                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={tw`flex-col gap-3`}
                            />
                          </View>
                        );
                      })
                  ) : (
                    <View
                      style={tw.style(
                        'flex-1 w-full items-center justify-center',
                      )}>
                      <FastImageCP
                        uriLocal={require('../../../../../assets/images/tools_relax.png')}
                        style={tw.style('w-full h-full rounded-md')}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </>
              )}
            </ScrollView>
            {Object.entries(groupedData || {})?.length > 0 && (
              <PaginationCP totalPages={list_gallery.total_page} />
            )}
          </View>
        </View>

        <Modal transparent={true} visible={isVisible} animationType="fade">
          <ImageViewer
            imageUrls={[{url: itemModal?.original}]}
            enableSwipeDown={true}
            onSwipeDown={() => setIsVisible(false)}
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setIsVisible(false)}
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
        <ActionSheetCP
          title="Bộ lọc"
          isVisible={isFilter}
          onClose={() => handleChangeForm('isFilter', false)}
          onOpen={() => handleChangeForm('isFilter', true)}
          ButtonActions={() => {
            return (
              <View
                style={tw.style(
                  `flex-row items-center justify-end gap-2 p-2 mt-2 ${
                    Platform.OS === 'ios' ? 'mb-5' : 'mb-0'
                  }`,
                )}>
                <ButtonCP
                  iconName="trash-bin-outline"
                  titleIcon="Xóa filter"
                  colorIcon="#ffffff"
                  sizeIcon={17}
                  colorBG="#ff0000"
                  colorBorder="#ff0000"
                  variant="contained"
                  onPress={() => {
                    handleClearFilter();
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
                <ButtonCP
                  iconName="navigate-outline"
                  sizeIcon={17}
                  colorIcon="#ffffff"
                  titleIcon="Xác nhận"
                  colorBorder={PRIMARY_COLOR}
                  colorBG={PRIMARY_COLOR}
                  onPress={() => {
                    CallAPI();
                    handleChangeForm('isFilter', false);
                  }}
                  styleContainer={tw.style('p-1 flex-1')}
                />
              </View>
            );
          }}>
          <CustomSelectCP
            label="Trạng thái hình ảnh"
            dataList={CLASS_TYPE_OPTIONS}
            placeholder="Chọn trạng thái hình ảnh"
            selectList={class_type}
            onSelectValue={val => handleChangeForm('class_type', val)}
            isQuantityInitData
            styleContainer={tw.style('flex-0')}
            quantityDataInit={10}
            multiple
            idActive="class_type"
            isActiveDropDown={activeDropDown === 'class_type'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={TYPE_IMAGE_OPTIONS}
            label="Loại hình ảnh"
            placeholder="Chọn loại ảnh"
            selectList={type_image}
            onSelectValue={val => handleChangeForm('type_image', val)}
            isQuantityInitData
            styleContainer={tw.style('flex-0')}
            quantityDataInit={10}
            multiple
            idActive="type_image"
            isActiveDropDown={activeDropDown === 'type_image'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={USER_DATA_OPTIONS}
            label="Người thực hiện"
            placeholder="Chọn người thực hiện"
            selectList={user}
            onSelectValue={val => handleChangeForm('user', val)}
            isQuantityInitData
            styleContainer={tw.style('flex-0')}
            quantityDataInit={10}
            multiple
            idActive="user"
            isActiveDropDown={activeDropDown === 'user'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
          <CustomSelectCP
            dataList={IS_VIEW_OPTIONS}
            label="Trạng thái"
            placeholder="Chọn trạng thái"
            selectList={isView}
            onSelectValue={val => handleChangeForm('isView', val)}
            isQuantityInitData
            styleContainer={tw.style('flex-0')}
            quantityDataInit={10}
            multiple
            idActive="isView"
            isActiveDropDown={activeDropDown === 'isView'}
            onSetActiveDropDown={val => setActiveDropdown(val)}
          />
        </ActionSheetCP>
      </SafeAreaWrap>
    </>
  );
}
