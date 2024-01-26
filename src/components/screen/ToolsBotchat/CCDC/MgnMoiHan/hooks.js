import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import useAppContext from '../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../Context/AppContext.reducer';
import {useColorThemeCCDC} from '../config';
import tw from '../../../../../styles/twrnc.global';
import RowDialogCP from '../../../../General/Dialog/RowDialogCP';
import ButtonCP from '../../../../General/ButtonCP';
import NavigateService from '../../../../routersConfig/NavigateService';
import {SCREEN_NAVIGATE} from '../../../../routersConfig/General.config';
import {IconCP, TYPE_ICON} from '../../../../../utils/icon.utils';
import React from 'react';
import FastImageCP from '../../../../General/FastImageCP';
import ImageViewer from 'react-native-image-zoom-viewer';
import {BLACK_COLOR} from '../../../../../styles/colors.global';
import {useLayoutAnimation} from '../../../../../utils/LayoutAnimation';
import {
  GET_FILTER_MOI_HAN,
  GET_LIST_MOI_HAN,
} from '../../../../../services/toolsBotchat/CCDC/MgnMoiHan';
import {useNotificationToast} from '../../../../../utils/notification_toast.utils';
import useDebounce from '../../../../../utils/hooks/useDebounce';
import {fList} from '../../../../../utils/array.utils';
import {useCssApp} from '../../../../../utils/css.utils';

export const useMgnMoiHan = () => {
  const {state, dispatch} = useAppContext();
  const {colors} = useColorThemeCCDC();
  const {
    isLoading,
    isFilter,
    data_moi_han,
    data_filter,
    search,
    zone,
    branch,
    vp_cn,
    loai_may,
    hang_sx,
    model,
    tinh_trang,
  } = state.set_data.mgn_moi_han;
  const {page, limit} = state.set_data.pagination;
  const [indexTarget, setIndexTarget] = React.useState(null);
  const [urlImage, setUrlImage] = React.useState([]);
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();
  const {openNotificationToast} = useNotificationToast();
  const {shadowCss} = useCssApp();

  const searchDebounce = useDebounce(search, 500);

  const handleResetFilter = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          zone: [],
          branch: [],
          vp_cn: [],
          loai_may: [],
          hang_sx: [],
          model: [],
          tinh_trang: [],
        },
      }),
    );
  };

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

  const payload = {
    zone: zone,
    branch: branch,
    vp_cn: vp_cn,
    loai_may: loai_may,
    hang_sx: hang_sx,
    model: model,
    tinh_trang: tinh_trang,
    keyword: searchDebounce,
  };

  const CallAPIFilter = () => {
    GET_FILTER_MOI_HAN({state, dispatch, openNotificationToast, payload});
  };

  const CallAPIGetList = () => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'pagination',
        value: {
          page: page,
        },
      }),
    );
    GET_LIST_MOI_HAN({
      state,
      dispatch,
      openNotificationToast,
      payload,
      page,
      limit,
    });
  };

  React.useEffect(() => {
    CallAPIFilter();
  }, [
    zone,
    branch,
    vp_cn,
    loai_may,
    hang_sx,
    model,
    tinh_trang,
    searchDebounce,
  ]);

  React.useEffect(() => {
    CallAPIGetList();
  }, [page, limit, searchDebounce]);

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'mgn_moi_han',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const RenderItem = ({item, index}) => {
    const {
      zone,
      branch,
      vp_cn,
      loai_may,
      hang_sx,
      tinh_trang,
      serial,
      serialImage,
      nameDevice,
    } = {
      ...item,
    };
    const imagesCurrent = serialImage?.[0];
    return (
      <View
        style={tw.style(
          'flex-1 rounded-lg overflow-hidden border border-blue-300',
          {
            backgroundColor: colors.BACKGROUND_CARD,
            //...shadowCss(),
          },
        )}
        key={index}>
        <View style={tw.style('flex-1 flex-col')}>
          <View style={tw.style('flex-1 flex-row relative')}>
            <FastImageCP
              // isImage
              uri={imagesCurrent}
              uriLocal={require('../../../../../assets/images/no_data.png')}
              uriError={require('../../../../../assets/images/no_data.png')}
              resizeMode="cover"
              onTouchStart={() => {
                setUrlImage(serialImage);
              }}
            />
            {fList(serialImage)?.length > 0 && (
              <View
                style={tw.style(
                  'absolute top-0 left-0 items-center justify-center p-1 min-w-[30px] rounded-br-lg',
                  {
                    backgroundColor: '#ccc',
                  },
                )}>
                <Text
                  style={tw.style('text-[10px] font-bold', {
                    color: colors.PRIMARY_COLOR,
                  })}>
                  {fList(serialImage)?.length} ảnh
                </Text>
              </View>
            )}
            <View
              style={tw.style('flex-1 flex-col justify-start items-start p-1')}>
              <View
                style={tw.style(
                  'w-full flex-row justify-between items-center',
                )}>
                <Text
                  style={tw.style(
                    `font-bold ${
                      Platform.OS === 'ios' ? 'text-[11px]' : 'text-[10px]'
                    }`,
                    {
                      color: colors.PRIMARY_COLOR,
                    },
                  )}>
                  {nameDevice}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    LayoutAnimationConfig(
                      200,
                      ANIMATION_TYPE.LINEAR,
                      ANIMATION_PROPERTY.OPACITY,
                    );
                    if (index === indexTarget) {
                      setIndexTarget(null);
                      return;
                    }
                    setIndexTarget(index);
                  }}
                  style={tw.style('items-end rounded-md p-[2px] px-1', {
                    backgroundColor: colors.PRIMARY_COLOR + '2a',
                  })}>
                  <IconCP
                    name={indexTarget?.toString() && indexTarget?.toString() === index?.toString() ? 'playlist-remove' : 'playlist-plus'}
                    typeIcon={TYPE_ICON.iconMaterial}
                    size={20}
                    color={colors.PRIMARY_COLOR}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={tw.style('w-full flex-col relative')}
                onPress={() => setIndexTarget(null)}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setIndexTarget(null)}
                  style={tw.style(
                    'absolute top-0 bottom-0 right-0 left-0 z-50 bg-transparent',
                  )}></TouchableOpacity>
                <RowDialogCP
                  label="Vùng"
                  value={zone}
                  noBullet
                  noneBorderBottom
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                />
                <RowDialogCP
                  label="Chi nhánh"
                  value={branch}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="VPCN/VPGD"
                  value={vp_cn}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Loại máy"
                  value={loai_may}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Hãng SX"
                  value={hang_sx}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
                <RowDialogCP
                  label="Tình trạng"
                  value={tinh_trang}
                  styleRow={tw.style('py-1 px-0 mt-0')}
                  styleLabel={tw.style('text-[10px]')}
                  styleVal={tw.style('text-[10px]')}
                  noBullet
                  noneBorderBottom
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {indexTarget === index && (
          <View
            style={tw.style(
              'absolute top-[25px] w-[90%] right-[10px] bottom-[5px] rounded-xl shadow-md',
              {
                backgroundColor: colors.WHITE_COLOR,
              },
            )}>
            <ScrollView
              contentContainerStyle={tw.style(
                'flex-grow flex-col justify-between',
              )}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled>
              <RowDialogCP
                leftNameIcon="calendar-number-outline"
                sizeLeftIcon={18}
                value="Quản lí lịch sử mối hàn định kì"
                noneBorderBottom
                styleRow={tw.style('px-2 py-2')}
                onClickAccord={() => {
                  NavigateService.navigate(
                    SCREEN_NAVIGATE.History_Action_One_Screen,
                    {
                      data: item,
                    },
                  );
                  setIndexTarget(null);
                }}
                styleVal={tw.style('text-left')}
              />
              <RowDialogCP
                leftNameIcon="construct-outline"
                sizeLeftIcon={18}
                value="Quản lí lịch sử gửi bảo hành/sửa chữa"
                noneBorderBottom
                styleRow={tw.style('px-2 py-2')}
                onClickAccord={() => {
                  NavigateService.navigate(
                    SCREEN_NAVIGATE.History_Action_Two_Screen,
                    {
                      data: item,
                    },
                  );
                  setIndexTarget(null);
                }}
                styleVal={tw.style('text-left')}
              />
              <RowDialogCP
                leftNameIcon="document-text-outline"
                sizeLeftIcon={18}
                value="Báo cáo lịch sử hàn nối cho xử lý sự cố"
                noneBorderBottom
                styleRow={tw.style('px-2 py-2')}
                onClickAccord={() => {
                  NavigateService.navigate(
                    SCREEN_NAVIGATE.History_Action_Three_Screen,
                    {
                      data: item,
                    },
                  );
                  setIndexTarget(null);
                }}
                styleVal={tw.style('text-left')}
              />
              <RowDialogCP
                leftNameIcon="documents-outline"
                sizeLeftIcon={18}
                value="Báo cáo lịch sử hàn nối cho triển khai/nâng cấp"
                noneBorderBottom
                styleRow={tw.style('px-2 py-2')}
                onClickAccord={() => {
                  NavigateService.navigate(
                    SCREEN_NAVIGATE.History_Action_Four_Screen,
                    {
                      data: item,
                    },
                  );
                  setIndexTarget(null);
                }}
                styleVal={tw.style('text-left')}
              />
            </ScrollView>
          </View>
        )}
        <Modal
          transparent={true}
          visible={fList(urlImage).length > 0 ? true : false}
          animationType="fade">
          <ImageViewer
            imageUrls={fList(urlImage)?.map(item => {
              return {url: item};
            })}
            enableSwipeDown={true}
            onSwipeDown={() => setUrlImage([])}
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
                  onPress={() => setUrlImage([])}
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
      </View>
    );
  };

  const DATA_ZONE = fList(data_filter?.zone?.[0]?.data)?.map(item => {
    return {label: item, value: item};
  });
  const DATA_BRANCH = fList(data_filter?.branch?.[0]?.data)?.map(item => {
    return {label: item, value: item};
  });
  const DATA_VPCN = fList(data_filter?.vp_cn?.[0]?.data)?.map(item => {
    return {label: item, value: item};
  });
  const DATA_LOAI_MAY = fList(data_filter?.loai_may?.[0]?.data)?.map(item => {
    return {label: item, value: item};
  });
  const DATA_HANG_SX = fList(data_filter?.hang_sx?.[0]?.data)?.map(item => {
    return {label: item, value: item};
  });
  const DATA_MODEL = fList(data_filter?.model?.[0]?.data)?.map(item => {
    return {label: item, value: item};
  });
  const DATA_TINH_TRANG = fList(data_filter?.tinh_trang?.[0]?.data)?.map(
    item => {
      return {label: item, value: item};
    },
  );

  return {
    isLoading,
    isFilter,
    data_moi_han,
    search,
    zone,
    branch,
    vp_cn,
    loai_may,
    hang_sx,
    model,
    tinh_trang,
    DATA_ZONE,
    DATA_BRANCH,
    DATA_VPCN,
    DATA_LOAI_MAY,
    DATA_HANG_SX,
    DATA_MODEL,
    DATA_TINH_TRANG,

    handleBack,
    handleChangeValue,
    RenderItem,
    handleResetFilter,
    CallAPIFilter,
    CallAPIGetList,
  };
};
