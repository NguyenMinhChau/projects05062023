import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import tw from '../../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import {Tooltip} from 'native-base';
import {IconCP} from '../../../utils/icon.utils';
import ScreenNoData from '../ScreenNoData';
import DialogCP from '../Dialog/DialogCP';
import RowDialogCP from '../Dialog/RowDialogCP';

export default function StackBarChartGifted({
  titleChart = 'Stack Bar Chart',
  rotateLabel = false,
  dataTitle = [
    {
      title: 'NO RESPONSE',
      color: '#f39c12',
    },
    {
      title: 'EXIT',
      color: '#EF4444',
    },
    {
      title: 'OK',
      color: '#10B981',
    },
  ],
  dataStackBarChart = [
    {
      stacks: [
        {value: 10, color: '#f39c12', label: 'NO RESPONSE'},
        {
          value: 20,
          color: '#10B981',
          label: 'OK',
          marginBottom: 2,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      ],
      label: 'Jan',
    },
    {
      stacks: [
        {value: 10, color: '#10B981', label: 'OK'},
        {value: 11, color: '#f39c12', label: 'NO RESPONSE', marginBottom: 2},
        {
          value: 15,
          color: '#EF4444',
          label: 'EXIT',
          marginBottom: 2,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 14, color: '#f39c12', label: 'NO RESPONSE'},
        {
          value: 18,
          color: '#10B981',
          label: 'OK',
          marginBottom: 2,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      ],
      label: 'Feb',
    },
    {
      stacks: [
        {value: 7, color: '#10B981', label: 'OK'},
        {value: 11, color: '#f39c12', label: 'NO RESPONSE', marginBottom: 2},
        {
          value: 10,
          color: '#EF4444',
          label: 'EXIT',
          marginBottom: 2,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      ],
      label: 'Mar',
    },
  ],
  styleContainer,
  horizontal = false,
  hideRules = false,
  backgroundColor,
  height = 200,
  initialSpacing = 10,
  noOfSections = 5,
  spacingColumns = 20,
  disableScroll = false,
  scrollToIndex = 0,
  yAxisLabelPrefix = '',
  xAxisLabelPrefix = '',
  yAxisLabelSuffix = '',
  disableScroll = false,
  scrollToIndex = 0,
}) {
  const [data, setData] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const {colors} = useGetColorThemeDisplay();
  const scrollRefChart = React.useRef(null);
  const maxValue = Math.max(
    ...dataStackBarChart.map(item => {
      return Math.ceil(
        Math.max(
          ...item.stacks.map(itemStack => {
            return itemStack.value;
          }),
        ) + 20,
      );
    }),
  );
  const renderTitle = () => {
    return (
      <View style={tw.style('my-2 px-2')}>
        <Text
          style={tw.style('text-left text-[15px] font-bold uppercase', {
            color: colors.BLACK_COLOR,
          })}>
          {titleChart}
        </Text>
        {dataTitle.length > 0 && (
          <View
            style={tw.style(
              'flex-row flex-wrap gap-2 justify-evenly mt-2 w-full',
            )}>
            {dataTitle.map((item, index) => {
              const {title, color} = {...item};
              return (
                <View style={tw.style('flex-row items-center')} key={index}>
                  <IconCP
                    name="ellipse"
                    size={12}
                    color={color}
                    style={tw.style('mr-1')}
                  />
                  <Text
                    style={tw.style('text-[10px] font-bold', {
                      color: colors.BLACK_COLOR,
                    })}>
                    {title}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={tw.style('w-full mb-3', {...styleContainer})}>
        {titleChart && renderTitle()}
        {dataStackBarChart?.length > 0 ? (
          <BarChart
            width={Dimensions.get('window').width - 60}
            backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
            height={height}
            hideRules={hideRules}
            rotateLabel={rotateLabel}
            isAnimated
            showFractionalValue
            stackData={dataStackBarChart}
            activeOpacity={0.8}
            maxValue={maxValue}
            barStyle={{borderRadius: 10}}
            scrollToIndex={scrollToIndex}
            disableScroll={disableScroll}
            barWidth={25}
            yAxisThickness={0}
            yAxisColor={colors.BLACK_COLOR}
            xAxisThickness={0}
            xAxisColor={colors.BLACK_COLOR}
            xAxisLabelTextStyle={{
              color: colors.BLACK_COLOR,
              fontSize: 8,
              fontWeight: 'bold',
            }}
            yAxisTextStyle={{
              color: colors.BLACK_COLOR,
              fontSize: 8,
              fontWeight: 'bold',
            }}
            yAxisLabelPrefix={yAxisLabelPrefix}
            xAxisLabelPrefix={xAxisLabelPrefix}
            yAxisLabelSuffix={yAxisLabelSuffix}
            hideYAxisText={dataStackBarChart.length > 0 ? false : true}
            autoShiftLabels={true}
            noOfSections={noOfSections}
            stepValue={maxValue / noOfSections}
            spacing={spacingColumns}
            onPress={value => {
              setData(value);
              setVisible(true);
            }}
            scrollRef={scrollRefChart}
          />
        ) : (
          <View
            style={tw.style('h-[50px] items-center justify-center', {
              backgroundColor: colors.WHITE_COLOR,
            })}>
            <Text
              style={tw.style('text-[13px] italic text-center', {
                color: colors.BLACK_COLOR,
              })}>
              Không có dữ liệu về biểu đồ
            </Text>
          </View>
        )}
      </View>
      <DialogCP
        visible={visible}
        setVisible={setVisible}
        styleDialog={tw`mx-10`}
        title={`Xem chi tiết ${data?.label}`}>
        <View
          style={tw.style(`p-4 rounded-md w-full`, {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          <View style={tw.style('max-h-[350px]')}>
            <ScrollView>
              {data?.stacks?.map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    value={item?.value}
                    noneBorderBottom={index === data?.stacks?.length - 1}
                    noBullet
                    styleRow={tw`py-2 px-0`}
                    styleVal={tw.style({
                      color: item?.color,
                    })}
                    styleLabel={tw.style('font-medium')}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </DialogCP>
    </>
  );
}
