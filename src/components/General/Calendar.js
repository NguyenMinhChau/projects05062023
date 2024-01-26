import React from 'react';
import {View, Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import useAppContext from '../../utils/hooks/useAppContext';
import tw from '../../styles/twrnc.global';
import {useColorThemeGeneral} from './config';
import {IconCP} from '../../utils/icon.utils';
import {SET_DATA_PAYLOAD} from '../Context/AppContext.reducer';
import {yyyy_mm} from '../../utils/TimerFormat';
import {BLACK_COLOR} from '../../styles/colors.global';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';

export default function CalendarCP({
  styleContainer,
  colorsDarkMode,
  useHandleColorDots,
  markedDates,
  isReloadCalendar = false,
}) {
  const {dispatch, state} = useAppContext();
  const {colors} = useColorThemeGeneral();
  const {colors: colorsDisplay} = useGetColorThemeDisplay();
  const {appearance_display} = state.set_data;
  const {day} = state.set_data.calendar;

  const renderHeader = date => {
    const month = date.toString('MMMM');
    const year = date.getFullYear().toString();
    return (
      <View style={tw.style('flex-col items-center justify-center')}>
        <Text
          style={tw.style('text-[22px] font-bold capitalize', {
            color: colors.BLACK_COLOR,
          })}>
          {month}
        </Text>
        <Text style={tw.style('text-[14px] text-[#8F9BB3]')}>{year}</Text>
      </View>
    );
  };

  const renderArrow = direction => {
    const iconName =
      direction === 'left' ? 'chevron-back-outline' : 'chevron-forward-outline';
    return <IconCP name={iconName} color={colors.BLACK_COLOR} size={20} />;
  };

  const handleChange = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'calendar',
        value: {
          [key]: value,
        },
      }),
    );
  };

  const handleDayPress = day => {
    handleChange('day', day.dateString);
  };

  LocaleConfig.locales['vi'] = {
    monthNames: [
      'Tháng 01',
      'Tháng 02',
      'Tháng 03',
      'Tháng 04',
      'Tháng 05',
      'Tháng 06',
      'Tháng 07',
      'Tháng 08',
      'Tháng 09',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th.1',
      'Th.2',
      'Th.3',
      'Th.4',
      'Th.5',
      'Th.6',
      'Th.7',
      'Th.8',
      'Th.9',
      'Th.10',
      'Th.11',
      'Th.12',
    ],
    dayNames: [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm Nay',
  };

  LocaleConfig.defaultLocale = 'vi';

  React.useEffect(() => {
    if(isReloadCalendar){
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'calendar',
          value: {
            day: new Date(),
            month: new Date(),
          },
        }),
      );
    }
  }, []);

  const themeCalendar = {
    textSectionTitleColor: '#b6c1cd',
    // todayBackgroundColor: '#dfe6e9',
    // todayTextColor: BLACK_COLOR,
    todayBackgroundColor: colorsDisplay.PRIMARY_COLOR,
    todayTextColor: colorsDisplay.WHITE_COLOR,
    calendarBackground: 'transparent',
    selectedDayTextColor: colors.WHITE_COLOR,
    selectedDayBackgroundColor: colorsDisplay.PRIMARY_COLOR,
    dayTextColor: colorsDisplay.DATE_TEXT_COLOR,
    textDisabledColor: colorsDisplay.DATE_TEXT_DISABLED_COLOR,
  };

  return (
    <View style={tw.style({...styleContainer})}>
      <Calendar
        key={appearance_display?.value || 'light'}
        theme={themeCalendar}
        renderHeader={renderHeader}
        renderArrow={renderArrow}
        onDayPress={handleDayPress}
        onMonthChange={date => {
          handleChange('month', yyyy_mm(date.dateString));
        }}
        markingType={'multi-dot'}
        markedDates={{
          ...markedDates,
          [`${day}`]: {
            selected: true,
          },
        }}
      />
    </View>
  );
}
