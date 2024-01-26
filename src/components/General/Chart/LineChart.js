import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {CurveType, LineChart} from 'react-native-gifted-charts';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import tw from '../../../styles/twrnc.global';
import {IconCP} from '../../../utils/icon.utils';
import RowDialogCP from '../Dialog/RowDialogCP';

export default function LineChartGift({
  titleChart = 'Line Chart',
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
    {value: 10, dataPointText: '10'},
    {value: 8, dataPointText: '8'},
    {value: 58, dataPointText: '58'},
    {value: 56, dataPointText: '56'},
    {value: 78, dataPointText: '78'},
    {value: 74, dataPointText: '74'},
    {value: 98, dataPointText: '98'},
  ],
  dataLineChart2 = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 18, dataPointText: '18'},
    {value: 40, dataPointText: '40'},
    {value: 36, dataPointText: '36'},
    {value: 60, dataPointText: '60'},
    {value: 54, dataPointText: '54'},
    {value: 85, dataPointText: '85'},
  ],
  dataLineChart3 = [],
  dataLineChart4 = [],
  dataLineChart5 = [],
  styleContainer,
  backgroundColor,
  rotateLabel = false,
  hideRules = false,
  showVerticalLines = false,
  height = 200,
  spacingColumns = 20,
  noOfSections = 5,
  lineColor,
  lineColor2,
  lineColor3,
  lineColor4,
  lineColor5,
  pointLineColor,
  pointLineColor2,
  pointLineColor3,
  pointLineColor4,
  pointLineColor5,
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
  textLabelColor2,
  textLabelColor3,
  textLabelColor4,
  textLabelColor5,
  textShiftX = 5,
  textShiftY = -5,
  areaChart = false,
  startFillColor1,
  startFillColor2,
  startFillColor3,
  startFillColor4,
  startFillColor5,
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
        <LineChart
          areaChart={areaChart}
          startFillColor1={
            startFillColor1 ? startFillColor1 : colors.PRIMARY_COLOR
          }
          startFillColor2={
            startFillColor2 ? startFillColor2 : colors.SUCCESS_COLOR
          }
          startFillColor3={
            startFillColor3 ? startFillColor3 : colors.WARNING_COLOR
          }
          startFillColor4={
            startFillColor4 ? startFillColor4 : colors.INFO_COLOR
          }
          startFillColor5={
            startFillColor5 ? startFillColor5 : colors.CRITICAL_COLOR
          }
          rotateLabel={rotateLabel}
          isAnimated
          showFractionalValue
          hideRules={hideRules}
          hideDataPoints={hideDataPoints}
          showVerticalLines={showVerticalLines}
          verticalLinesColor={verticalLinesColor}
          backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
          width={Dimensions.get('window').width - 60}
          height={height}
          yAxisColor={colors.BLACK_COLOR}
          yAxisThickness={0}
          xAxisColor={colors.BLACK_COLOR}
          xAxisThickness={0}
          data={dataLineChart}
          data2={dataLineChart2}
          data3={dataLineChart3}
          data4={dataLineChart4}
          data5={dataLineChart5}
          spacing={spacingColumns}
          onPress={value => {}}
          maxValue={maxValue}
          stepValue={maxValue / noOfSections}
          noOfSections={noOfSections}
          initialSpacing={initialSpacing}
          scrollRef={scrollRefChart}
          showScrollIndicator={true}
          disableScroll={disableScroll}
          scrollToIndex={scrollToIndex}
          dataPointsColor={
            pointLineColor ? pointLineColor : colors.PRIMARY_COLOR
          }
          dataPointsColor2={
            pointLineColor2 ? pointLineColor2 : colors.SUCCESS_COLOR
          }
          dataPointsColor3={
            pointLineColor3 ? pointLineColor3 : colors.WARNING_COLOR
          }
          dataPointsColor4={
            pointLineColor4 ? pointLineColor4 : colors.INFO_COLOR
          }
          dataPointsColor5={
            pointLineColor5 ? pointLineColor5 : colors.CRITICAL_COLOR
          }
          color1={lineColor ? lineColor : colors.PRIMARY_COLOR}
          color2={lineColor2 ? lineColor2 : colors.SUCCESS_COLOR}
          color3={lineColor3 ? lineColor3 : colors.WARNING_COLOR}
          color4={lineColor4 ? lineColor4 : colors.INFO_COLOR}
          color5={lineColor5 ? lineColor5 : colors.CRITICAL_COLOR}
          curved={curved}
          curveType={curveType}
          thickness={thicknessLine}
          autoShiftLabels={true}
          leftShiftForTooltip={Dimensions.get('window').width / 2 - 190}
          leftShiftForLastIndexTooltip={
            Dimensions.get('window').width / 2 - 150
          }
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
          hideYAxisText={dataLineChart.length > 0 ? false : true}
          textColor1={textLabelColor ? textLabelColor : colors.PRIMARY_COLOR}
          textColor2={textLabelColor2 ? textLabelColor2 : colors.SUCCESS_COLOR}
          textColor3={textLabelColor3 ? textLabelColor3 : colors.WARNING_COLOR}
          textColor4={textLabelColor4 ? textLabelColor4 : colors.INFO_COLOR}
          textColor5={textLabelColor5 ? textLabelColor5 : colors.CRITICAL_COLOR}
          textShiftX={textShiftX}
          textShiftY={textShiftY}
          yAxisThickness={0}
          yAxisColor={colors.BLACK_COLOR}
          xAxisThickness={0}
          xAxisColor={colors.BLACK_COLOR}
          pointerConfig={{
            width: 8,
            height: 8,
            pointer1Color: colors.PRIMARY_COLOR,
            pointer2Color: colors.SUCCESS_COLOR,
            pointer3Color: colors.WARNING_COLOR,
            pointer4Color: colors.INFO_COLOR,
            pointer5Color: colors.CRITICAL_COLOR,
            pointerStripColor: 'transparent',
          }}
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
