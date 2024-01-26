import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';

export const handleDownloadRemoteImage = async (
  url,
  handleFuncStart = () => {},
  handleFuncFinish = () => {},
  handleFuncSuccess = () => {},
  handleFuncError = () => {},
) => {
  handleFuncStart();
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png',
  })
    .fetch('GET', url)
    .then(async res => {
      CameraRoll.save(res.data, 'photo')
        .then(() => {
          handleFuncFinish();
          handleFuncSuccess();
        })
        .catch(err => {
          handleFuncFinish();
          handleFuncError();
        })
        .finally(() => handleFuncFinish());
    })
    .catch(error => {
      handleFuncFinish();
      handleFuncError();
    });
};
