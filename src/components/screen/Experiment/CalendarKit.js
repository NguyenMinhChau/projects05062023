import React from 'react';
import {TimelineCalendar, MomentConfig} from '@howljs/calendar-kit';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import {IconCP, TYPE_ICON} from '../../../utils/icon.utils';
import {BLACK_COLOR, WHITE_COLOR} from '../../../styles/colors.global';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';
import moment from 'moment';
import {useColorThemeTools} from '../Tools/config';

MomentConfig.updateLocale('vi', {
  weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
});

export default function CalendarKit({
  data = [],
  RenderEventContent,
  view_mode = 'threeDays',
  initialTimeIntervalHeight = 60,
}) {
  const {dispatch, state} = useAppContext();
  const {day, fromDate, toDate} = state.set_data.calendar;
  const {appearance_display} = state.set_data;
  const {colors} = useGetColorThemeDisplay();
  const [events, setEvents] = React.useState([]);
  const calendarRef = React.useRef(null);

  // return {
  //   _id: item?._id,
  //   idJob: job?._id,
  //   ...job,
  //   title: job?.jobName,
  //   start: job?.timeStart,
  //   end: job?.timeFinish,
  //   color: useHandleColor(job?.typeJob, colorsTools),
  // };

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

  // Kéo để sửa
  const [selectedEvent, setSelectedEvent] = React.useState();

  // Kéo để tạo
  const _onDragCreateEnd = event => {
    const randomId = Math.random().toString(36).slice(2, 10);
    const newEvent = {
      id: randomId,
      title: randomId,
      start: event.start,
      end: event.end,
      color: '#A3C7D6',
    };
    setEvents(prev => [...prev, newEvent]);
  };

  // Kéo để sửa
  const _onLongPressEvent = event => {
    setSelectedEvent(event);
  };

  const _onPressCancel = () => {
    setSelectedEvent(undefined);
  };

  const _onPressSubmit = () => {
    setEvents(prevEvents =>
      prevEvents.map(ev => {
        if (ev.id === selectedEvent?.id) {
          return {...ev, ...selectedEvent};
        }
        return ev;
      }),
    );
    setSelectedEvent(undefined);
  };

  const _renderEditFooter = () => {
    return (
      <View
        style={tw.style(
          'absolute bottom-0 right-0 left-0 shadow-md flex-row justify-center',
          {
            backgroundColor: colors.WHITE_COLOR,
          },
        )}>
        <TouchableOpacity
          style={tw.style(
            'px-4 py-2 bg-blue-600 justify-center rounded-lg m-2 min-w-[100px] items-center',
          )}
          onPress={_onPressCancel}>
          <Text style={tw.style('text-white font-bold text-[15px]')}>
            Hủy bỏ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            'px-4 py-2 bg-green-600 justify-center rounded-lg m-2 min-w-[100px] items-center',
          )}
          onPress={_onPressSubmit}>
          <Text style={tw.style('text-white font-bold text-[15px]')}>Lưu</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // change date when scroll
  const _onDateChanged = date => {
    const numOfDays = 2;
    const fromDateVal = new Date(date);
    const toDateVal = new Date(date);
    toDateVal.setDate(toDateVal.getDate() + numOfDays);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'calendar',
        value: {
          fromDate: fromDateVal,
          toDate: toDateVal,
        },
      }),
    );
  };

  // handle go to date
  const _onGoToDate = () => {
    const optionalProps = {
      // date: '2023-10-17',
      hourScroll: true,
      animatedHour: true,
      animatedDate: false,
    };
    calendarRef.current?.goToDate(optionalProps);
    handleChange('fromDate', new Date());
  };

  // handle Next page
  const _onNextPage = () => {
    calendarRef.current?.goToNextPage();
    calendarRef.current?.getZones('Asia/Ho_Chi_Minh');
  };

  // handle Prev page
  const _onPrevPage = () => {
    calendarRef.current?.goToPrevPage();
    calendarRef.current?.getZones('Asia/Ho_Chi_Minh');
  };

  // handle zoom in
  const _onZoomIn = () => {
    calendarRef.current?.zoom({scale: 1.2});
  };

  // handle zoom out
  const _onZoomOut = () => {
    calendarRef.current?.zoom({scale: 0.8});
  };

  // custom header date active/click
  const highlightDates = React.useMemo(
    () => ({
      [moment(fromDate).format('YYYY-MM-DD')]: {
        dayNameColor: colors.PRIMARY_COLOR,
        dayNumberColor: WHITE_COLOR,
        dayNumberBackgroundColor: colors.PRIMARY_COLOR,
      },
    }),
    [fromDate],
  );

  React.useEffect(() => {
    if (calendarRef?.current) {
      const date = moment(calendarRef?.current?.getDate()).format('YYYY-MM-DD');
      handleChange('fromDate', date);
    }
  }, []);

  const RenderHeader = ({fromDate, toDate}) => {
    const month = moment(fromDate).format('MMMM');
    const from = moment(fromDate).format('DD/MM/YYYY');
    const to = moment(toDate).format('DD/MM/YYYY');
    return (
      <View style={tw.style('flex-col items-center justify-center')}>
        <Text
          style={tw.style('text-[22px] font-bold capitalize', {
            color: colors.BLACK_COLOR,
          })}>
          {month}
        </Text>
        <Text style={tw.style('text-[14px] text-[#8F9BB3]')}>
          {from} - {to}
        </Text>
      </View>
    );
  };

  const DATA_DATE = [
    fromDate,
    moment(fromDate).add(1, 'days').format('YYYY-MM-DD'),
    moment(fromDate).add(2, 'days').format('YYYY-MM-DD'),
  ];

  return (
    <View style={tw.style('flex-1 relative')}>
      <View
        style={tw.style(
          'w-full flex flex-row items-center justify-between p-3 bg-transparent',
        )}>
        <TouchableOpacity activeOpacity={0.8} onPress={_onPrevPage}>
          <IconCP
            name="chevron-back-outline"
            color={colors.BLACK_COLOR}
            size={20}
          />
        </TouchableOpacity>
        <RenderHeader
          fromDate={fromDate ? new Date(fromDate) : new Date()}
          toDate={toDate ? new Date(toDate) : new Date()}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={_onNextPage}>
          <IconCP
            name="chevron-forward-outline"
            color={colors.BLACK_COLOR}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View
        style={tw.style(
          'flex-row justify-around items-center pl-[50px] bg-transparent pb-2',
        )}>
        {DATA_DATE.map((date, _idx) => {
          const dayOfWeek = moment(date).format('dd');
          const day = moment(date).format('DD');
          const isWeekend = [0, 6].includes(moment(date).day());
          const isActive = moment(date).isSame(fromDate, 'day');
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => handleChange('fromDate', date)}
              style={tw.style('flex-col items-center justify-center gap-2')}>
              <Text
                style={tw.style('text-[13px]', {
                  color: isWeekend
                    ? colors.DATE_TEXT_DISABLED_COLOR
                    : colors.BLACK_COLOR,
                })}>
                {dayOfWeek}
              </Text>
              <View
                style={tw.style(
                  'w-[25px] h-[25px] rounded-full items-center justify-center',
                  {
                    backgroundColor: isWeekend
                      ? 'transparent'
                      : colors.BACKGROUND_CARD,
                  },
                )}>
                <Text
                  style={tw.style('font-bold', {
                    color: isWeekend
                      ? colors.DATE_TEXT_DISABLED_COLOR
                      : colors.BLACK_COLOR,
                  })}>
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('flex-grow')}
        style={tw.style({
          backgroundColor: colors.WHITE_COLOR,
        })}>
        <TimelineCalendar
          key={appearance_display?.value || 'light'}
          ref={calendarRef}
          locale="vi"
          onPressDayNum={date => {
            handleChange('fromDate', date);
          }}
          // khoảng thời gian giữa các khe thời gian: mặc định 60
          timeInterval={60}
          // renderDayBarItem={date => {}}
          renderEventContent={event => {
            if (RenderEventContent) {
              return <RenderEventContent event={event} />;
            }
            return null;
          }}
          onPressEvent={event => {}}
          // week, day, threeDays and workWeek
          viewMode={view_mode}
          events={data}
          // Chụm để thu phóng
          allowPinchToZoom
          initialTimeIntervalHeight={initialTimeIntervalHeight}
          //minTimeIntervalHeight={29}
          maxTimeIntervalHeight={110}
          // Kéo để tạo
          //allowDragToCreate
          //onDragCreateEnd={_onDragCreateEnd}
          //dragCreateInterval={120}
          // Kéo để sửa
          // onLongPressEvent={_onLongPressEvent}
          //selectedEvent={selectedEvent}
          //onEndDragSelectedEvent={setSelectedEvent}
          highlightDates={highlightDates}
          // mỗi lần kéo thả +- 20ph
          dragStep={20}
          //isLoading={false}
          onDateChanged={_onDateChanged}
          theme={{
            backgroundColor: 'transparent',
            dragHourContainer: {
              backgroundColor: colors.BACKGROUND_CARD,
              borderColor: colors.BLACK_COLOR,
            },
            hourText: {color: colors.BLACK_COLOR},
            dragHourText: {color: colors.BLACK_COLOR},
            dragCreateItemBackgroundColor: colors.DRAG_ITEM_BGC_COLOR,
            loadingBarColor: colors.PRIMARY_COLOR,
            cellBorderColor: colors.BORDER_KIT_COLOR,

            //Saturday style
            saturdayName: {color: colors.DATE_TEXT_DISABLED_COLOR},
            saturdayNumber: {color: colors.DATE_TEXT_DISABLED_COLOR},
            saturdayNumberContainer: {backgroundColor: 'transparent'},

            //Sunday style
            sundayName: {color: colors.DATE_TEXT_DISABLED_COLOR},
            sundayNumber: {color: colors.DATE_TEXT_DISABLED_COLOR},
            sundayNumberContainer: {backgroundColor: 'transparent'},

            //Today style
            todayName: {color: colors.BLACK_COLOR},
            todayNumber: {color: BLACK_COLOR},
            todayNumberContainer: {backgroundColor: '#dfe6e9'},

            //Normal style
            dayName: {color: colors.BLACK_COLOR},
            dayNumber: {color: colors.BLACK_COLOR},
            dayNumberContainer: {backgroundColor: colors.WHITE_COLOR},
          }}
          isShowHeader={false}
        />
      </ScrollView>
      <View style={tw.style('absolute bottom-3 right-3 flex-col gap-2')}>
        <TouchableOpacity
          style={tw.style(
            'bg-blue-600 rounded-full flex flex-col items-center justify-center shadow-md w-[40px] h-[40px] p-1',
          )}
          activeOpacity={0.8}
          onPress={_onZoomIn}>
          <IconCP
            name="magnify-plus-outline"
            size={22}
            color={WHITE_COLOR}
            typeIcon={TYPE_ICON.iconMaterial}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            'bg-blue-600 rounded-full flex flex-col items-center justify-center shadow-md w-[40px] h-[40px] p-1',
          )}
          activeOpacity={0.8}
          onPress={_onZoomOut}>
          <IconCP
            name="magnify-minus-outline"
            size={22}
            color={WHITE_COLOR}
            typeIcon={TYPE_ICON.iconMaterial}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            'bg-blue-600 rounded-full flex flex-col items-center justify-center shadow-md w-[40px] h-[40px] p-1',
          )}
          activeOpacity={0.8}
          onPress={_onGoToDate}>
          <IconCP name="arrow-redo-outline" size={20} color={WHITE_COLOR} />
        </TouchableOpacity>
      </View>
      {!!selectedEvent && _renderEditFooter()}
    </View>
  );
}
