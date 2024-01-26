import React from 'react';
import WrapperToolsAI from '../WrapperToolsAI';

const QuangScreen = ({navigation, route}) => {
  const {value} = {...route?.params};
  return (
    <WrapperToolsAI
      titleHeader="Máy đo quang"
      typeImage={value}
      navigation={navigation}></WrapperToolsAI>
  );
};

export default QuangScreen;
