import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {Iconify} from 'react-native-iconify';
import tw from '../../styles/twrnc.global';
import {fList} from '../../utils/array.utils';
import useDebounce from '../../utils/hooks/useDebounce';
import {PRIMARY_COLOR} from '../../styles/colors.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import slugify from 'slugify';
import {IconCP} from '../../utils/icon.utils';

const CustomSelectCP = ({
  selectList,
  onSelectValue,
  dataList = [],
  placeholder = 'Lựa chọn',
  label = '',
  placeholderText,
  colorIcon = '#b6b6b6',
  multiple = false,
  isCheckAll = false,
  isCheckAllMultiple = false,
  isQuantityInitData = false,
  quantityDataInit = 10,
  NUMBER_SPLICE = 13,
  styleContainer,
  styleItem,
  styleOutline,
  styleListDropDown,
  styleInput,
  reCallAPI,
  required = false,
  idActive = '',
  isActiveDropDown = false,
  isFullData = false,
  onSetActiveDropDown = () => {},
}) => {
  const [searchText, setSearchText] = useState('');
  const [singleText, setSingleText] = useState('');
  const [msg, setMsg] = useState('');
  const [isDropDownList, setIsDropDownList] = useState(false);
  const {colors} = useGetColorThemeDisplay();

  const useSearchText = useDebounce(searchText, 100);

  const filteredData = fList(dataList).filter(item => {
    const {label} = {...item};
    const slugifyItem = slugify(`${label}`, {
      replacement: '',
      strict: false,
      remove: /[*+~.()'"!:@-]/g,
      lower: true,
      locale: 'vi',
      trim: true,
    });
    const slugifySearch = slugify(useSearchText, {
      replacement: ' ',
      strict: false,
      remove: /[*+~.()'"!:@-]/g,
      lower: true,
      locale: 'vi',
      trim: true,
    })
      ?.replace(/-/g, ' ')
      ?.replace(/\s+/g, '');
    const regex = new RegExp(slugifySearch.replace(/\\/g, ''));
    return regex.test(slugifyItem);
    return item?.label?.toLowerCase()?.includes(slugifySearch?.toLowerCase());
  });

  const dataQuantityInit = isFullData
    ? fList(dataList)
    : fList(dataList).slice(0, quantityDataInit);
  const LENGTH_SELECT_LIST = fList(selectList).length;
  const LENGTH_DATA_LIST = fList(dataList).length;
  const LENGTH_DATA_FILTERED = fList(filteredData).length;
  const LENGTH_DATA_INITIAL = fList(dataQuantityInit).length;

  const DATA_CHOOSE_INIT_AND_FILTER = isQuantityInitData
    ? useSearchText
      ? fList(filteredData)
      : fList(dataQuantityInit)
    : fList(filteredData);
  const LENGTH_DATA_INIT_AND_FILTER = isQuantityInitData
    ? useSearchText
      ? LENGTH_DATA_FILTERED.toLocaleString()
      : LENGTH_DATA_INITIAL.toLocaleString()
    : LENGTH_DATA_FILTERED.toLocaleString();

  const refSearch = useRef(null);

  // useEffect(() => {
  //   if (isDropDownList) {
  //     refSearch.current.focus();
  //   }
  // }, [isDropDownList]);

  useEffect(() => {
    setTimeout(() => {
      if (fList(filteredData).length === 0) {
        setMsg(
          `Không có dữ liệu ${
            searchText ? `với tìm kiếm "${searchText}"` : ''
          }`,
        );
      }
    }, 1000);
  }, [useSearchText]);

  const RenderFlatList = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => {
          if (multiple) {
            if (fList(selectList).includes(item?.value)) {
              onSelectValue(fList(selectList).filter(i => i !== item?.value));
            } else {
              onSelectValue([...selectList, item?.value]);
            }
          } else {
            onSelectValue(item?.value);
            setIsDropDownList(false);
            setSearchText('');
            setSingleText(item?.value);
          }
        }}
        style={tw.style(`py-3 px-2`, {
          backgroundColor: fList(selectList).includes(item?.value)
            ? colors.PRIMARY_COLOR + '1a'
            : colors.WHITE_COLOR,
          ...styleItem,
        })}>
        <View
          style={tw.style(`flex-row items-center justify-between`, {
            paddingLeft: multiple ? 6 : 0,
          })}>
          <Text
            style={tw.style(``, {
              color: colors.BLACK_COLOR,
            })}>
            {item?.label}
          </Text>

          {multiple && (
            <>
              {fList(selectList).includes(item?.value) ? (
                <IconCP
                  name="checkmark-done-outline"
                  size={20}
                  color={colors.PRIMARY_COLOR}
                />
              ) : null}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {label && (
        <TouchableOpacity activeOpacity={1}>
          <Text
            style={tw.style('text-[14px] mb-2 font-bold', {
              color: colors.BLACK_COLOR,
            })}>
            {label}{' '}
            {required && (
              <Text style={tw.style('text-red-500 font-bold ml-1')}>*</Text>
            )}
          </Text>
        </TouchableOpacity>
      )}
      <View
        style={tw.style(`w-full flex-1 min-h-[45px]`, {
          marginBottom: isActiveDropDown && isDropDownList ? 0 : 8,
          ...styleContainer,
        })}
        onTouchEnd={() => {
          onSetActiveDropDown(idActive);
          if (reCallAPI && !isDropDownList) {
            reCallAPI();
          } else {
            return;
          }
        }}>
        <View
          onTouchEnd={() => {
            setIsDropDownList(true);
            if (
              !multiple &&
              selectList &&
              selectList.length > 0 &&
              selectList[0] !== ''
            ) {
              setSingleText(selectList?.toString());
            }
          }}
          style={tw.style(
            `w-full px-3 pr-[13px] h-full ${
              isDropDownList && isActiveDropDown
                ? 'rounded-tl-lg rounded-tr-lg'
                : 'rounded-lg'
            } border border-gray-300 justify-between items-center flex-row`,
            {
              borderColor: multiple
                ? selectList?.length > 0 || (isDropDownList && isActiveDropDown)
                  ? colors.PRIMARY_COLOR + '9a'
                  : '#ccc'
                : selectList
                ? selectList?.toString() !== '' ||
                  (isDropDownList && isActiveDropDown)
                  ? colors.PRIMARY_COLOR + '9a'
                  : '#ccc'
                : '#ccc',
              ...styleOutline,
            },
          )}>
          {isDropDownList && isActiveDropDown && (
            <Iconify icon="ic:baseline-search" size={20} color={colorIcon} />
          )}
          {/* INPUT, TEXT */}
          {!multiple ? (
            <View style={tw`flex-row items-center flex-1`}>
              {isDropDownList && isActiveDropDown ? (
                <TextInput
                  placeholder={
                    isDropDownList && isActiveDropDown
                      ? 'Tìm kiếm'
                      : placeholder
                  }
                  placeholderTextColor={
                    placeholderText ? placeholderText : '#ccc'
                  }
                  value={singleText}
                  onChangeText={text => {
                    setSingleText(text);
                    setSearchText(text);
                    setMsg('');
                  }}
                  selectionColor={PRIMARY_COLOR}
                  style={tw.style('flex-1 ', {
                    color: colors.BLACK_COLOR,
                    ...styleInput,
                  })}
                  onPressIn={() => {
                    onSetActiveDropDown(idActive);
                    setIsDropDownList(true);
                  }}
                  ref={refSearch}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    onSetActiveDropDown(idActive);
                    setIsDropDownList(!isDropDownList);
                  }}
                  style={tw.style('flex-1 w-full')}>
                  <Text
                    style={tw.style({
                      color: selectList?.toString()
                        ? colors.BLACK_COLOR
                        : '#ccc',
                    })}>
                    {selectList && selectList.length > 0 && selectList[0] !== ''
                      ? selectList?.toString()
                      : placeholder}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : isDropDownList && isActiveDropDown ? (
            <View style={tw`flex-row items-center gap-1 flex-1 mx-2`}>
              <View
                style={tw.style(
                  'flex-row max-h-[200px] overflow-scroll flex-grow gap-2 flex-wrap py-2 w-full',
                  LENGTH_SELECT_LIST === 0 && 'hidden',
                )}>
                {LENGTH_SELECT_LIST > 0 ? (
                  fList(selectList)
                    .slice(0, NUMBER_SPLICE)
                    .map((item, _idx) => {
                      return (
                        <View
                          key={_idx}
                          style={tw.style(
                            'py-[2px] px-2 rounded-lg bg-opacity-10 border relative',
                            {
                              borderColor: colors.PRIMARY_COLOR,
                              backgroundColor: colors.PRIMARY_COLOR + '1a',
                            },
                          )}
                          onTouchStart={() => {
                            onSelectValue(
                              fList(selectList).filter(i => i !== item),
                            );
                          }}>
                          <View
                            style={tw.style(
                              'absolute top-[-7px] right-[-7px] w-[13px] h-[13px] bg-white items-center justify-center rounded-full',
                            )}
                            onTouchStart={() => {
                              onSelectValue(
                                fList(selectList).filter(i => i !== item),
                              );
                            }}>
                            <IconCP
                              name="close-outline"
                              size={10}
                              color="#ff0000"
                            />
                          </View>
                          <Text
                            style={tw.style(`text-[12px]`, {
                              color: colors.PRIMARY_COLOR,
                            })}>
                            {fList(dataList).find(i => i.value === item)?.label}
                          </Text>
                        </View>
                      );
                    })
                ) : (
                  <Text style={tw`text-[#ccc]`}>{placeholder}</Text>
                )}
                {LENGTH_SELECT_LIST > 0 && (
                  <>
                    {LENGTH_SELECT_LIST > NUMBER_SPLICE && (
                      <Text
                        style={tw.style(`mt-[4px]`, {
                          color: colors.BLACK_COLOR,
                        })}>
                        + {LENGTH_SELECT_LIST - NUMBER_SPLICE}
                      </Text>
                    )}
                    <TextInput
                      placeholder={''}
                      onChangeText={text => {
                        setSearchText(text);
                        setMsg('');
                      }}
                      selectionColor={PRIMARY_COLOR}
                      style={tw.style('flex-1 p-0 min-h-[20px] h-[20px]', {
                        color: colors.BLACK_COLOR,
                        ...styleInput,
                      })}
                      onPressIn={() => {
                        onSetActiveDropDown(idActive);
                        setIsDropDownList(true);
                      }}
                      ref={refSearch}
                    />
                  </>
                )}
              </View>
              {LENGTH_SELECT_LIST === 0 && (
                <TextInput
                  placeholder={'Tìm kiếm'}
                  placeholderTextColor="#ccc"
                  onChangeText={text => {
                    setSearchText(text);
                    setMsg('');
                  }}
                  selectionColor={PRIMARY_COLOR}
                  style={tw.style('flex-1 p-0 min-h-[20px] h-[20px]', {
                    color: colors.BLACK_COLOR,
                    ...styleInput,
                  })}
                  onPressIn={() => {
                    onSetActiveDropDown(idActive);
                    setIsDropDownList(true);
                  }}
                  ref={refSearch}
                />
              )}
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              style={tw`flex-1 flex-row gap-2 flex-wrap py-2`}
              onPress={() => {
                onSetActiveDropDown(idActive);
                setIsDropDownList(!isDropDownList);
              }}>
              {LENGTH_SELECT_LIST > 0 ? (
                <View style={tw`flex-row flex-wrap gap-2 items-center`}>
                  {fList(selectList)
                    .slice(0, NUMBER_SPLICE)
                    .map((item, _idx) => {
                      return (
                        <View
                          key={_idx}
                          style={tw.style(
                            'py-[2px] px-2 rounded-lg bg-opacity-10 border relative',
                            {
                              borderColor: colors.PRIMARY_COLOR,
                              backgroundColor: colors.PRIMARY_COLOR + '1a',
                            },
                          )}
                          onTouchStart={() => {
                            onSelectValue(
                              fList(selectList).filter(i => i !== item),
                            );
                          }}>
                          <View
                            style={tw.style(
                              'absolute top-[-7px] right-[-7px] w-[13px] h-[13px] bg-white items-center justify-center rounded-full',
                            )}
                            onTouchStart={() => {
                              onSelectValue(
                                fList(selectList).filter(i => i !== item),
                              );
                            }}>
                            <IconCP
                              name="close-outline"
                              size={10}
                              color="#ff0000"
                            />
                          </View>
                          <Text
                            style={tw.style(`text-[12px]`, {
                              color: colors.PRIMARY_COLOR,
                            })}>
                            {fList(dataList).find(i => i.value === item)?.label}
                          </Text>
                        </View>
                      );
                    })}
                  {LENGTH_SELECT_LIST > NUMBER_SPLICE && (
                    <Text
                      style={tw.style(`mt-[4px]`, {
                        color: colors.BLACK_COLOR,
                      })}>
                      + {LENGTH_SELECT_LIST - NUMBER_SPLICE}
                    </Text>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    onSetActiveDropDown(idActive);
                    setIsDropDownList(!isDropDownList);
                  }}
                  style={tw.style('flex-1 w-full')}>
                  <Text style={tw`text-[#ccc]`}>{placeholder}</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
        </View>
        {/* ICON ARROW, CLOSE */}
        <TouchableOpacity
          style={tw.style(`p-2 absolute right-2 top-[50%] z-50`, {
            transform: [{translateY: -17}],
          })}
          activeOpacity={0.8}
          onPress={() => {
            setIsDropDownList(!isDropDownList);
            setSearchText('');
            onSetActiveDropDown(idActive);
          }}>
          {isDropDownList && isActiveDropDown ? (
            <IconCP name="chevron-up-outline" size={18} color={colorIcon} />
          ) : (
            <IconCP
              name="chevron-down-outline"
              size={18}
              color={colorIcon}
              style={tw`font-bold`}
            />
          )}
        </TouchableOpacity>
      </View>
      {/* DROPDOWN LIST */}
      {(isDropDownList || searchText) && isActiveDropDown && (
        <View
          style={tw.style(
            `flex-1 max-h-[200px] ${
              isDropDownList && isActiveDropDown
                ? 'rounded-bl-lg rounded-br-lg'
                : 'rounded-lg'
            } border mb-3 overflow-hidden`,
            {
              backgroundColor: colors.WHITE_COLOR,
              borderColor: isDropDownList
                ? colors.PRIMARY_COLOR + '9a'
                : '#ccc',
              ...styleListDropDown,
            },
          )}>
          {(useSearchText || isQuantityInitData || isFullData) &&
          fList(filteredData).length > 0 ? (
            <>
              {multiple && isCheckAll ? (
                <View
                  style={tw`flex-row items-center justify-between gap-x-1 pb-1`}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={tw`flex-row items-center px-[4px] pt-2`}
                    onPress={() => {
                      // CHECK ALL FILTER MULTIPLE
                      if (isCheckAllMultiple) {
                        // KIỂM TRA NẾU TẤT CẢ CÁC ITEM ĐÃ CHECK THÌ BỎ CHECK TẤT CẢ VÀ CẬP NHẬT SELECT LIST
                        if (
                          fList(DATA_CHOOSE_INIT_AND_FILTER).every(i =>
                            selectList.includes(i.value),
                          )
                        ) {
                          onSelectValue([
                            ...fList(selectList).filter(
                              i =>
                                !fList(DATA_CHOOSE_INIT_AND_FILTER)
                                  .map(i => i.value)
                                  .includes(i),
                            ),
                          ]);
                        }
                        // NGƯỢC LẠI THÌ THÊM VÀO SELECT LIST NHƯNG CÓ 2 TRƯỜNG HỢP XẢY RA
                        else {
                          const arrayNotCheckAllFilter = fList(
                            DATA_CHOOSE_INIT_AND_FILTER,
                          ).filter(i => !selectList.includes(i.value));
                          const isNotCheckAllFilter =
                            arrayNotCheckAllFilter.length > 0;
                          // TRƯỜNG HỢP 1: CÁC ITEM FILTER CHƯA CHECK ALL THÌ KHI CHECK SẼ THÊM TẤT CẢ CÁC ITEM FILTER VÀO SELECT LIST
                          if (!isNotCheckAllFilter) {
                            onSelectValue([
                              ...selectList,
                              ...fList(DATA_CHOOSE_INIT_AND_FILTER).map(
                                i => i.value,
                              ),
                            ]);
                          }
                          // TRƯỜNG HỢP 2: CHECK ALL LẠI VÀ THÊM CÁC ITEM CHƯA CHECK ALL VÀO SELECT LIST, NGOẠI TRỪ CÁC ITEM FILTER ĐÃ CHECK
                          else {
                            onSelectValue([
                              ...selectList,
                              ...fList(arrayNotCheckAllFilter).map(
                                i => i.value,
                              ),
                            ]);
                          }
                        }
                      } else {
                        // BỎ CHECK ALL
                        if (
                          fList(DATA_CHOOSE_INIT_AND_FILTER).length ===
                          LENGTH_SELECT_LIST
                        ) {
                          onSelectValue([]);
                        }
                        // CHECK ALL
                        else {
                          onSelectValue(
                            fList(DATA_CHOOSE_INIT_AND_FILTER).map(
                              i => i.value,
                            ),
                          );
                        }
                      }
                    }}>
                    <>
                      {fList(filteredData).length === LENGTH_SELECT_LIST ||
                      LENGTH_DATA_LIST === LENGTH_SELECT_LIST ? (
                        <Iconify
                          icon="ion:checkbox-outline"
                          size={20}
                          color="#007aff"
                        />
                      ) : LENGTH_SELECT_LIST > 0 &&
                        fList(filteredData).some(i =>
                          selectList.includes(i.value),
                        ) ? (
                        <Iconify
                          icon="bx:checkbox-minus"
                          size={20}
                          color="#007aff"
                        />
                      ) : (
                        <Iconify
                          icon="carbon:checkbox"
                          size={20}
                          color="#ccc"
                        />
                      )}
                    </>
                    <Text
                      style={tw.style(`ml-[10px]`, {
                        color: colors.BLACK_COLOR,
                      })}>
                      Chọn tất cả {LENGTH_DATA_INIT_AND_FILTER}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={tw`flex-row items-center px-[4px] pt-2`}
                    onPress={() => {
                      if (LENGTH_DATA_LIST === LENGTH_SELECT_LIST) {
                        onSelectValue([]);
                      } else {
                        onSelectValue(fList(dataList).map(i => i.value));
                      }
                    }}>
                    <Text
                      style={tw.style(`mr-[10px]`, {
                        color: colors.BLACK_COLOR,
                      })}>
                      Chọn tất cả {LENGTH_DATA_LIST.toLocaleString()}
                    </Text>
                    <>
                      {LENGTH_DATA_LIST === LENGTH_SELECT_LIST ? (
                        <Iconify
                          icon="ion:checkbox-outline"
                          size={20}
                          color="#007aff"
                        />
                      ) : LENGTH_SELECT_LIST > 0 ? (
                        <Iconify
                          icon="bx:checkbox-minus"
                          size={20}
                          color="#007aff"
                        />
                      ) : (
                        <Iconify
                          icon="carbon:checkbox"
                          size={20}
                          color="#ccc"
                        />
                      )}
                    </>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={tw`flex-row flex-wrap px-[10px] pt-[5px] items-center justify-between gap-x-1 pb-1`}>
                  <Text style={tw`text-gray-400 font-bold text-[12px]`}>
                    Có {LENGTH_DATA_INIT_AND_FILTER?.toLocaleString()} kết quả
                    tìm thấy
                  </Text>
                  <Text style={tw`text-gray-400 font-bold text-[12px]`}>
                    Tổng tất cả: {LENGTH_DATA_LIST?.toLocaleString()}
                  </Text>
                </View>
              )}
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw.style(`flex-grow`)}>
                {/* SHOW WHEN MULTIPLE */}
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATA_CHOOSE_INIT_AND_FILTER}
                  renderItem={RenderFlatList}
                  keyExtractor={item => item?.value?.toString()}
                  contentContainerStyle={tw`flex-grow`}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                />
              </ScrollView>
              <View style={tw.style('w-full h-1 bg-transparent')}></View>
            </>
          ) : !searchText && !msg && !isQuantityInitData ? (
            <View style={tw`items-start`}>
              <Text
                style={tw.style(`text-[14px] my-2 mx-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                Vui lòng tìm kiếm để cho ra kết quả
              </Text>
            </View>
          ) : (
            <View style={tw`items-start`}>
              <Text
                style={tw.style(`text-[14px] my-2 mx-2`, {
                  color: colors.BLACK_COLOR,
                })}>
                {msg
                  ? msg
                  : `Đang tìm kiếm kết quả ${
                      searchText ? `cho "${searchText}"` : ''
                    }`}
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default CustomSelectCP;
