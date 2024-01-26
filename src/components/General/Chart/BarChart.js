import React from 'react';
import {Dimensions, Text, View, useWindowDimensions} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import tw from '../../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import {Tooltip} from 'native-base';
import {IconCP} from '../../../utils/icon.utils';
import ScreenNoData from '../ScreenNoData';

// {
//     value: 40,
//     label: 'Jan',
//     spacing: 2,
//     labelWidth: 30,
//     barWidth: 30,
//     labelTextStyle: {color: 'gray'},
//     frontColor: '#177AD5',
// topLabelComponent: () => (
//   <Text
//     style={{
//       color: '#10B981',
//       fontSize: 8,
//       marginBottom: 6,
//     }}>
//     20
//   </Text>
// ),
// },
// {value: 20, frontColor: '#ED6665'},

export default function BarChartGifted({
  titleChart = '',
  dataTitle = [],
  dataBarChart = [],
  dataLineChart = [],
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
  lineColor,
  pointLineColor,
  thicknessLine = 1,
  yAxisLabelPrefix = '',
  xAxisLabelPrefix = '',
  yAxisLabelSuffix = '',
  rotateLabel = false,
}) {
  const {colors} = useGetColorThemeDisplay();
  const maxValue = Math.max(
    ...dataBarChart.map(item => {
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
      {dataBarChart?.length > 0 ? (
        <BarChart
          rotateLabel={rotateLabel}
          isAnimated
          showFractionalValue
          hideRules={hideRules}
          frontColor={colors.PRIMARY_COLOR}
          backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
          width={Dimensions.get('window').width - 60}
          height={height}
          horizontal={horizontal}
          rulesType="linear"
          data={dataBarChart}
          barColor={colors.PRIMARY_COLOR}
          spacing={spacingColumns}
          barStyle={{borderRadius: 10}}
          barWidth={25}
          onPress={value => {}}
          maxValue={maxValue}
          initialSpacing={initialSpacing}
          noOfSections={noOfSections} // số phần trên trục Y
          stepValue={maxValue / noOfSections}
          scrollRef={scrollRefChart}
          showLine={dataLineChart.length > 0 ? true : false}
          lineData={dataLineChart}
          showScrollIndicator={true}
          disableScroll={disableScroll}
          scrollToIndex={scrollToIndex}
          lineConfig={{
            curved: true,
            thickness: thicknessLine,
            isAnimated: true,
            color: lineColor ? lineColor : colors.PRIMARY_COLOR,
            dataPointsColor: pointLineColor
              ? pointLineColor
              : colors.PRIMARY_COLOR,
          }}
          autoShiftLabels={true}
          // renderTooltip={item => {
          //   const {value, label} = {...item};
          //   return (
          //     <View style={tw.style('bg-white p-2 rounded-lg z-50 shadow-lg')}>
          //       <Text style={tw.style('text-center text-sm text-black')}>
          //         {label}: {value?.toFixed(2)}
          //       </Text>
          //     </View>
          //   );
          // }}
          leftShiftForTooltip={Dimensions.get('window').width / 2 - 190}
          leftShiftForLastIndexTooltip={
            Dimensions.get('window').width / 2 - 150
          }
          activeOpacity={0.8}
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
          barBorderTopLeftRadius={3}
          barBorderTopRightRadius={3}
          yAxisLabelPrefix={yAxisLabelPrefix}
          xAxisLabelPrefix={xAxisLabelPrefix}
          yAxisLabelSuffix={yAxisLabelSuffix}
          hideYAxisText={dataBarChart.length > 0 ? false : true}
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
