import React from 'react';
import {Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import tw from '../../styles/twrnc.global';
import {useColorThemeGeneral} from './config';

export default function StepperCP({
  color,
  currentStrokeWidth = 3,
  separatorStrokeWidth = 2,
  currentStepIndicatorSize = 35,
  stepIndicatorSize = 30,
  currentPage = 0,
  onStepPress = () => {},
  listLabels = [],
  stepCount = 0,
  getStepIndicatorIconConfig = params => {},
  isIcon,
}) {
  const {colors} = useColorThemeGeneral();
  const secondIndicatorStyles = {
    stepIndicatorSize: stepIndicatorSize,
    currentStepIndicatorSize: currentStepIndicatorSize,
    separatorStrokeWidth: separatorStrokeWidth,
    currentStepStrokeWidth: currentStrokeWidth,
    stepStrokeCurrentColor: colors.STEPPER_STEP_COLOR,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: colors.STEPPER_STEP_COLOR,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.STEPPER_STEP_COLOR,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.STEPPER_STEP_COLOR,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.STEPPER_STEP_COLOR,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colors.STEPPER_STEP_COLOR,
  };

  const renderStepIndicator = params => getStepIndicatorIconConfig(params);

  const renderLabel = ({position, label, currentPosition}) => {
    return (
      <Text
        style={tw.style(
          'text-[12px] text-center font-medium',
          position === currentPosition
            ? `text-[${colors.STEPPER_STEP_COLOR}]`
            : 'text-[#999999]',
        )}>
        {label}
      </Text>
    );
  };
  return (
    <>
      <StepIndicator
        customStyles={secondIndicatorStyles}
        currentPosition={currentPage}
        onPress={onStepPress}
        stepCount={stepCount}
        renderStepIndicator={isIcon ? renderStepIndicator : renderLabel}
        labels={listLabels}
      />
    </>
  );
}
