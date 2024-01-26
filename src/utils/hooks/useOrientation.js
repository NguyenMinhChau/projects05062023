import React from 'react';
import {Dimensions} from 'react-native';

export default function useOrientation() {
  const [orientation, setOrientation] = React.useState('LANDSCAPE');
  const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  };
  React.useEffect(() => {
    determineAndSetOrientation();
    Dimensions?.addEventListener('change', determineAndSetOrientation);
  }, [orientation]);

  return {orientation};
}
