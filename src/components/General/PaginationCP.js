import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useAppContext from '../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../Context/AppContext.reducer';
import tw from '../../styles/twrnc.global';
import {IconCP} from '../../utils/icon.utils';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';

export default function PaginationCP({totalPages}) {
  const {state, dispatch} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {page, limit} = state.set_data.pagination;

  const setPage = val => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'pagination',
        value: {
          ...state.set_data.pagination,
          page: val,
        },
      }),
    );
  };

  const handlePageClick = page => {
    setPage(page);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const canGoToNextPage = page < totalPages;
  const canGoToLastPage = page < totalPages;
  const canGoToPrevPage = page > 1;
  const canGoToFirstPage = page > 1;

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(
          <TouchableOpacity
            key={i}
            onPress={() => handlePageClick(i)}
            style={tw.style(
              `px-[10px] py-[8px] border rounded-md ${
                i === page
                  ? `bg-[${colors.PRIMARY_COLOR}] border-[${colors.PRIMARY_COLOR}]`
                  : ' border-gray-400'
              }`,
            )}>
            <Text
              style={tw.style(
                `${
                  i === page
                    ? `text-[${colors.WHITE_COLOR}] font-bold`
                    : `text-[${colors.BLACK_COLOR}]`
                }`,
              )}>
              {i?.toLocaleString()}
            </Text>
          </TouchableOpacity>,
        );
      } else if (
        (i === page - 2 && i > 2) ||
        (i === page + 2 && i < totalPages - 1)
      ) {
        pages.push(
          <Text
            key={i}
            style={tw.style(`p-3 `, {
              color: colors.BLACK_COLOR,
            })}>
            ...
          </Text>,
        );
      }
    }

    return pages;
  };

  return (
    <>
      <View style={tw.style('flex-row items-center justify-center p-1 gap-1')}>
        <View style={tw.style('flex-row mr-2')}>
          <TouchableOpacity
            onPress={handleFirstPage}
            disabled={!canGoToFirstPage}
            style={tw.style('p-2')}>
            <IconCP
              name="caret-back-outline"
              size={16}
              color={
                canGoToFirstPage ? colors.BLACK_COLOR : colors.DISABLED_COLOR
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={!canGoToPrevPage}
            style={tw.style('p-2')}>
            <IconCP
              name="chevron-back-outline"
              size={16}
              color={
                canGoToPrevPage ? colors.BLACK_COLOR : colors.DISABLED_COLOR
              }
            />
          </TouchableOpacity>
        </View>
        {renderPagination()}
        <View style={tw.style('flex-row ml-2')}>
          <TouchableOpacity
            onPress={handleNextPage}
            disabled={!canGoToNextPage}
            style={tw.style('p-2')}>
            <IconCP
              name="chevron-forward-outline"
              size={16}
              color={
                canGoToNextPage ? colors.BLACK_COLOR : colors.DISABLED_COLOR
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLastPage}
            disabled={!canGoToLastPage}
            style={tw.style('p-2')}>
            <IconCP
              name="caret-forward-outline"
              size={16}
              color={
                canGoToLastPage ? colors.BLACK_COLOR : colors.DISABLED_COLOR
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
