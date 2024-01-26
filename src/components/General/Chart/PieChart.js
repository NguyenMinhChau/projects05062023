import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import tw from '../../../styles/twrnc.global';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import {IconCP} from '../../../utils/icon.utils';

export default function PieChartGift({
  titleChart = 'Pie Chart',
  dataPieChart = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
      text: '47%',
    },
    {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE', text: '40%'},
    {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3', text: '16%'},
    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97', text: '3%'},
  ],
  backgroundColor,
  styleContainer,
  dataTitle = [
    {
      title: 'Humidity',
      color: '#177AD5',
    },
    {
      title: 'Temperature',
      color: '#79D2DE',
    },
    {
      title: 'Water Temperature',
      color: '#ED6665',
    },
  ],
  height = 200,
  showText = true,
  textBackgroundColor,
  textSize = 12,
  textBackgroundRadius = 20,
  isThreeD = false,
  innerCircleColor,
  valueCenterLabel = '47%',
  textCenterLabel = 'Excellent',
}) {
  const {colors} = useGetColorThemeDisplay();
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
              'flex-row flex-wrap gap-2 justify-evenly my-2 w-full',
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
      <View
        style={tw.style('w-full mb-3 items-center justify-center', {
          ...styleContainer,
        })}>
        {titleChart && renderTitle()}
        <PieChart
          data={dataPieChart}
          backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
          width={Dimensions.get('window').width - 60}
          height={height}
          showText={showText}
          focusOnPress
          showValuesAsLabels
          sectionAutoFocus
          showTextBackground
          textColor="white"
          textBackgroundColor={
            textBackgroundColor ? textBackgroundColor : 'rgba(0, 0, 0, 0.2)'
          }
          textBackgroundRadius={textBackgroundRadius}
          textSize={textSize}
          isThreeD={isThreeD}
          showGradient
          innerCircleColor={innerCircleColor ? innerCircleColor : '#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  {valueCenterLabel}
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>
                  {textCenterLabel}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
