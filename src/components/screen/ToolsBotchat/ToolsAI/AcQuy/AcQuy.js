import React from 'react';
import WrapperToolsAI from '../WrapperToolsAI';

const AcQuyScreen = ({navigation, route}) => {
  const {value} = {...route?.params};
  return (
    <WrapperToolsAI
      titleHeader="Máy đo ắc quy"
      typeImage={value}
      navigation={navigation}></WrapperToolsAI>
  );
};

export default AcQuyScreen;
