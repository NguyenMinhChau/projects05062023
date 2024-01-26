import Geolocation from '@react-native-community/geolocation';
import useAppPermission from './MgnAccess/config';
import React from 'react';

export const useAppLocation = () => {
  const {checkPermission, TYPE_ACCESS} = useAppPermission();
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [dataLocation, setDataLocation] = React.useState(null);
  const [dataTimeZone, setDataTimeZone] = React.useState(null);

  React.useEffect(() => {
    const initialLocation = () => {
      checkPermission(TYPE_ACCESS.LOCATION, false);
      const apiKey = 'AIzaSyDoupCT34lYubzddpk8nGy9altOKWNjwXE';
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
          const timezoneApiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(
            Date.now() / 1000,
          )}&key=${apiKey}`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              setDataLocation(data);
            })
            .catch(error => {
              console.error(error);
            });
          fetch(timezoneApiUrl)
            .then(response => response.json())
            .then(data => {
              setDataTimeZone(data);
            })
            .catch(error => {
              console.error(error);
            });
        },
        error => {
          console.error(error);
        },
      );
    };
    initialLocation();
  }, []);
  return {
    latitude,
    longitude,
    dataLocation,
    dataTimeZone,
  };
};
