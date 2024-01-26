import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {CurveType, LineChartBicolor} from 'react-native-gifted-charts';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import tw from '../../../styles/twrnc.global';
import {IconCP} from '../../../utils/icon.utils';

export default function LineChartBieGift({
  titleChart = 'Line Chart Bi Color',
  dataTitle = [
    {
      title: 'Humidity',
      color: '#4a87ff',
    },
    {
      title: 'Temperature',
      color: '#4caf50',
    },
  ],
  dataLineChart = [
    {value: 0, dataPointText: '0'},
    {value: -10, dataPointText: '-10'},
    {value: 8, dataPointText: '8'},
    {value: -58, dataPointText: '-58'},
    {value: 56, dataPointText: '56'},
    {value: 78, dataPointText: '78'},
    {value: 74, dataPointText: '74'},
    {value: 98, dataPointText: '98'},
  ],
  styleContainer,
  backgroundColor,
  rotateLabel = false,
  hideRules = false,
  showVerticalLines = false,
  height = 200,
  spacingColumns = 20,
  noOfSections = 5,
  lineColor,
  pointLineColor,
  thicknessLine = 1,
  yAxisLabelPrefix = '',
  yAxisLabelSuffix = '',
  xAxisLabelPrefix = '',
  initialSpacing = 10,
  disableScroll = false,
  scrollToIndex = 0,
  verticalLinesColor,
  hideDataPoints = false,
  curved = true,
  curveType = CurveType.CUBIC,
  textLabelColor,
  textShiftX = 5,
  textShiftY = -5,
}) {
  const {colors} = useGetColorThemeDisplay();
  const maxValue = Math.max(
    ...dataLineChart.map(item => {
      return Math.ceil(item?.value + 20);
    }),
  );
  const scrollRefChart = React.useRef(null);

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
    <View style={tw.style('w-full mb-3', {...styleContainer})}>
      {titleChart && renderTitle()}
      {dataLineChart?.length > 0 ? (
        <LineChartBicolor
          isAnimated
          data={dataLineChart}
          startFillColorOpacity={0.5}
          textColor={colors.BLACK_COLOR}
          textShiftX={textShiftX}
          textShiftY={textShiftY}
          dataPointsColor={colors.BLACK_COLOR}
          curved={curved}
          yAxisLabelPrefix={yAxisLabelPrefix}
          xAxisLabelPrefix={xAxisLabelPrefix}
          yAxisLabelSuffix={yAxisLabelSuffix}
          hideYAxisText={dataLineChart.length > 0 ? false : true}
          textColor1={textLabelColor ? textLabelColor : colors.PRIMARY_COLOR}
          yAxisThickness={0}
          yAxisColor={colors.BLACK_COLOR}
          xAxisThickness={1}
          xAxisColor={colors.BLACK_COLOR}
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
  );
}
