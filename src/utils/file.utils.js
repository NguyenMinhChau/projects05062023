import {Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {
  DocumentDirectoryPath,
  DownloadDirectoryPath,
  writeFile,
  readFile,
} from 'react-native-fs';

export const launchCameraUtils = async (options, callback, other = {}) => {
  try {
    await launchCamera(options, response => {
      if (response.didCancel) {
        callback(null);
      } else if (response.errorCode) {
        callback(null);
      } else {
        callback(response, other);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const launchImageLibraryUtils = async (
  options,
  callback,
  other = {},
) => {
  try {
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        callback(null);
      } else if (response.errorCode) {
        callback(null);
      } else {
        callback(response, other);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const downloadFileRemote = async (
  url,
  name_file,
  funcStart = () => {},
  funcEnd = () => {},
) => {
  const isIOS = Platform.OS === 'ios';
  const RootDir =
    (isIOS
      ? RNFetchBlob.fs.dirs.DocumentDir
      : RNFetchBlob.fs.dirs.DownloadDir) +
    '/' +
    name_file;

  const {config} = RNFetchBlob;
  const options = {
    fileCache: true,
    IOSBackgroundTask: true,
    IOSDownloadTask: true,
    path: RootDir,
    notification: true,
    addAndroidDownloads: {
      path: RootDir,
      notification: true,
      useDownloadManager: true,
    },
  };
  funcStart();
  config(options)
    .fetch('GET', url)
    .then(res => {
      setTimeout(() => {
        if (isIOS) {
          RNFetchBlob.ios.openDocument(res?.data);
        } else {
          // RNFetchBlob.android.actionViewIntent(res?.path());
        }
        funcEnd();
      }, 300);
    });
};

export const downloadFileLocal = async (
  url,
  name_file,
  type_file,
  funcStart = () => {},
  funcEnd = () => {},
  funcSuccess = () => {},
  funcError = () => {},
) => {
  const isIOS = Platform.OS === 'ios';
  const RootDir =
    (isIOS ? DocumentDirectoryPath : DownloadDirectoryPath) + '/' + name_file;
  funcStart();
  readFile(url, 'base64').then(data => {
    writeFile(`${RootDir}.${type_file}`, data, 'base64')
      .then(res => {
        setTimeout(() => {
          funcSuccess();
          funcEnd();
        }, 300);
      })
      .catch(err => {
        funcError();
        funcEnd();
      });
  });
  // const RootDir =
  //   (isIOS
  //     ? RNFetchBlob.fs.dirs.DocumentDir
  //     : RNFetchBlob.fs.dirs.DownloadDir) +
  //   '/' +
  //   name_file;
  // funcStart();
  // RNFetchBlob.fs.readFile(url, 'base64').then(data => {
  //   RNFetchBlob.fs
  //     .writeFile(`${RootDir}.${type_file}`, data, 'base64')
  //     .then(res => {
  //       setTimeout(() => {
  //         funcEnd();
  //       }, 300);
  //     });
  // });
};
