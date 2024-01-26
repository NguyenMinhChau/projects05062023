import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../styles/twrnc.global';
import {Image} from 'react-native';

export default function FastImageCP({
  uri,
  uriLocal,
  uriError,
  style,
  resizeMode = 'cover',
  onTouchStart = () => {},
  isImage = false,
}) {
  const [isLoad, setIsLoad] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onTouchStart}
      style={tw.style('min-h-[150px] w-[150px]', {...style})}>
      {isImage ? (
        <Image
          source={
            isError && !isLoad
              ? require('../../assets/images/no_data.png')
              : uriLocal || uri
              ? uri
                ? {uri: uri}
                : uriLocal
              : uriError
              ? uriError
              : require('../../assets/images/webview_url404.png')
          }
          onError={() => {
            setIsError(true);
          }}
          onLoad={() => {
            setIsLoad(true);
            setIsError(false);
          }}
          resizeMode={resizeMode}
          style={tw.style('w-full h-full')}
        />
      ) : (
        <FastImage
          style={tw.style('h-full w-full')}
          source={
            isError
              ? require('../../assets/images/no_data.png')
              : uriLocal || uri
              ? uri
                ? {
                    uri: uri,
                  }
                : uriLocal
              : uriError
              ? uriError
              : require('../../assets/images/webview_url404.png')
          }
          onError={() => {
            setIsError(true);
          }}
          onLoad={() => {
            setIsError(false);
          }}
          resizeMode={FastImage.resizeMode[resizeMode]}
        />
      )}
    </TouchableOpacity>
  );
}
