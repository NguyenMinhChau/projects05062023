import {LayoutAnimation, Platform, UIManager} from 'react-native';

export const useLayoutAnimation = () => {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const ANIMATION_TYPE = {
    LINEAR: 'linear',
    EASE_IN_EASE_OUT: 'easeInEaseOut',
    EASE_IN: 'easeIn',
    EASE_OUT: 'easeOut',
  };

  const ANIMATION_PROPERTY = {
    OPACITY: 'opacity',
    SCALE_XY: 'scaleXY',
    SCALE_X: 'scaleX',
    SCALE_Y: 'scaleY',
  };

  const LayoutAnimationConfig = (
    duration = 300,
    type = 'linear',
    property = 'scaleY',
    props = {},
  ) => {
    const {
      typeCreate,
      propertyCreate,
      typeUpdate,
      propertyUpdate,
      typeDelete,
      propertyDelete,
    } = props;
    const createObj = {
      type: typeCreate || type,
      property: propertyCreate || property,
    };
    const updateObj = {
      type: typeUpdate || type,
      property: propertyUpdate || property,
    };
    const deleteObj = {
      type: typeDelete || type,
      property: propertyDelete || property,
    };
    return LayoutAnimation.configureNext({
      duration: duration,
      create: createObj,
      update: updateObj,
      delete: deleteObj,
    });
  };
  return {
    LayoutAnimationConfig,
    ANIMATION_TYPE,
    ANIMATION_PROPERTY,
  };
};
