import React from 'react';
import {Image, Platform, Text, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Polyline,
  Circle,
  Overlay,
  Heatmap,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import tw from '../../../styles/twrnc.global';
import {useAppLocation} from '../../../utils/location.utils';
import {useCssApp} from '../../../utils/css.utils';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import useAppContext from '../../../utils/hooks/useAppContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ButtonCP from '../../General/ButtonCP';
import ActionSheetCP from '../../General/ActionSheetCP';
import CustomSelectCP from '../../General/CustomSelectCP';
import {DATA_LOCATION_VIE} from '../../../locations/VietNam';
import FastImageCP from '../../General/FastImageCP';

const TYPE_POLYGON = [
  {
    label: 'Polygon',
    value: 'Polygon',
  },
  {
    label: 'Polyline',
    value: 'Polyline',
  },
  {
    label: 'Circle',
    value: 'Circle',
  },
  ...(Platform.OS === 'android'
    ? [
        {
          label: 'Heatmap',
          value: 'Heatmap',
        },
      ]
    : []),
];

export default function MapViewCP() {
  const DATA_PROVINCE = DATA_LOCATION_VIE.map(item => {
    return {
      label: item.properties.ten_tinh,
      value: item.properties.ten_tinh,
    };
  });
  const {dispatch, state} = useAppContext();
  const {appearance_display, currentUser} = state.set_data;
  const {longitude, latitude} = useAppLocation();
  const {shadowCss} = useCssApp();
  const {colors} = useGetColorThemeDisplay();
  const [polygons, setPolygons] = React.useState([]);
  const [polygonsByProvince, setPolygonsByProvince] = React.useState([]);
  const [isVisibleOption, setIsVisibleOption] = React.useState(false);
  const [activeDropDown, setActiveDropdown] = React.useState(null);
  const [typePolygon, setTypePolygon] = React.useState('Polygon');
  const [province, setProvince] = React.useState('TP. Hồ Chí Minh');
  const [region, setRegion] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = React.useRef(null);
  const theme =
    appearance_display?.value === 'dark' ||
    appearance_display?.value === 'dark-no-system'
      ? 'dark'
      : 'light';
  // const dataOverlay = polygons.map(item => {
  //   return [item.latitude, item.longitude];
  // });

  const goToMyLocation = () => {
    mapRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const goToProvince = dataPolygons => {
    const lat = dataPolygons?.map(item => item.latitude);
    const long = dataPolygons?.map(item => item.longitude);
    const latMin = Math.min(...lat);
    const latMax = Math.max(...lat);
    const longMin = Math.min(...long);
    const longMax = Math.max(...long);
    const latDelta = latMax - latMin;
    const longDelta = longMax - longMin;
    setRegion({
      ...region,
      latitude: latMin + latDelta / 2,
      longitude: longMin + longDelta / 2,
      latitudeDelta: latDelta + 0.1,
      longitudeDelta: longDelta + 0.1,
    });
    mapRef.current?.animateToRegion({
      latitude: latMin + latDelta / 2,
      longitude: longMin + longDelta / 2,
      latitudeDelta: latDelta + 0.1,
      longitudeDelta: longDelta + 0.1,
    });
  };

  React.useEffect(() => {
    const data = DATA_LOCATION_VIE.find(
      item => item.properties.ten_tinh === province,
    );
    if (data) {
      const dataPolygon = data.geometry.coordinates.map(item => {
        return item?.[0]?.map(x => {
          return {
            latitude: x[1],
            longitude: x[0],
          };
        });
      });
      const result = dataPolygon.reduce((acc, val) => acc.concat(val), []);
      setPolygonsByProvince(dataPolygon);
      goToProvince(result);
    }
  }, [province]);

  const DATA_POLYGON = polygons;

  return (
    <>
      <View
        style={tw.style(
          'absolute top-0 bottom-0 left-0 right-0 flex-1 justify-end items-center',
        )}>
        <View style={tw.style('absolute top-[10px] left-[10px] z-50')}>
          <View style={tw.style('flex-col gap-2')}>
            <ButtonCP
              noneBorder
              colorIcon="#666666"
              colorBG="#e5ebf5"
              iconName="options-outline"
              sizeIcon={25}
              onPress={() => {
                setIsVisibleOption(!isVisibleOption);
              }}
              styleContainer={tw.style('py-1 px-2')}
            />
            {Platform.OS === 'ios' && (
              <ButtonCP
                noneBorder
                colorIcon="#666666"
                colorBG="#e5ebf5"
                iconName="locate-outline"
                sizeIcon={25}
                onPress={() => {
                  goToMyLocation();
                }}
                styleContainer={tw.style('py-1 px-2')}
              />
            )}
            <ButtonCP
              noneBorder
              colorIcon="#666666"
              colorBG="#e5ebf5"
              iconName="golf-outline"
              sizeIcon={25}
              onPress={() => {
                goToProvince(
                  polygonsByProvince?.reduce((acc, val) => acc.concat(val), []),
                );
              }}
              styleContainer={tw.style('py-1 px-2')}
            />
          </View>
        </View>
        <MapView
          ref={mapRef}
          style={tw.style('absolute top-0 bottom-0 left-0 right-0')}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          region={region}
          showsPointsOfInterest={true}
          // followsUserLocation={true}
          // focusable={true}
          userLocationCalloutEnabled={true}
          showsScale={true}
          showsCompass={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userInterfaceStyle={theme}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
          loadingEnabled={!region.longitude && !region.latitude}
          loadingIndicatorColor={colors.PRIMARY_COLOR}
          loadingBackgroundColor={colors.WHITE_COLOR}
          mapType="standard"
          // onRegionChangeComplete={e => {
          //   setRegion({
          //     ...region,
          //     ...e,
          //   });
          // }}
          onPress={e => {
            setPolygons([
              ...polygons,
              {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              },
            ]);
          }}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}>
            <CustomMarker province={province} />
          </Marker>
          <Marker
            coordinate={{
              latitude: 10.453151505000056,
              longitude: 106.9660247990001,
            }}>
            <CustomMarkerImage />
          </Marker>
          <Marker
            coordinate={{
              latitude: 10.467506684000048,
              longitude: 106.97111350400004,
            }}>
            <CustomMarkerImage />
          </Marker>
          <Polyline
            coordinates={[
              {latitude: 10.453151505000056, longitude: 106.9660247990001},
              {latitude: 10.467506684000048, longitude: 106.97111350400004},
            ]}
            strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
          {DATA_POLYGON?.length > 0 && typePolygon === 'Polygon' && (
            <Polygon
              coordinates={DATA_POLYGON}
              strokeColor={colors.WARNING_COLOR}
              strokeWidth={2}
              fillColor={colors.WARNING_COLOR + '7a'}
            />
          )}
          {polygonsByProvince?.length > 0 && (
            <>
              {polygonsByProvince?.map((item, index) => {
                return (
                  <Polygon
                    key={index}
                    coordinates={item}
                    strokeColor={colors.PRIMARY_COLOR}
                    strokeWidth={2}
                    fillColor={colors.PRIMARY_COLOR + '7a'}
                  />
                );
              })}
            </>
          )}
          {polygons?.length > 0 && typePolygon === 'Polyline' && (
            <Polyline
              coordinates={polygons}
              strokeColor={colors.WARNING_COLOR} // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={2}
            />
          )}
          {polygons?.length > 0 && typePolygon === 'Circle' && (
            <Circle
              center={polygons?.[polygons.length - 1]}
              radius={1000} // độ bao phủ
              strokeWidth={2}
              strokeColor={colors.WARNING_COLOR}
              fillColor={colors.WARNING_COLOR + '7a'}
            />
          )}
          {/* {polygons.length > 1 && typePolygon === 'Overlay' && (
            <Overlay
              image={require('../../../assets/images/overlay_image.png')}
              bounds={dataOverlay}
              opacity={1}
            />
          )} */}
          {polygons.length > 0 && typePolygon === 'Heatmap' && (
            <Heatmap
              points={polygons.map(item => {
                return {
                  latitude: item.latitude,
                  longitude: item.longitude,
                };
              })}
              radius={30}
              opacity={1}
              // gradient={{
              //   colors: [
              //     colors.WARNING_COLOR,
              //     colors.BGC_INFO_COLOR,
              //     colors.BGC_CRITICAL_COLOR,
              //     colors.BGC_SUCCESS_COLOR,
              //     colors.BGC_WARNING_COLOR,
              //   ],
              //   startPoints: [0.01, 0.1, 0.2, 0.6, 1],
              //   colorMapSize: 250,
              // }}
            />
          )}
        </MapView>
        <View
          style={tw.style(
            'absolute bottom-10 left-0 right-0 items-center justify-center flex-col gap-1',
          )}>
          <View
            style={tw.style('p-2 rounded-3xl min-w-[150px]', {
              backgroundColor: '#e5ebf5',
            })}>
            <Text style={tw.style('text-center', {color: '#666666'})}>
              {region?.latitude?.toFixed(3)}, {region.longitude?.toFixed(3)}
            </Text>
          </View>
          <View style={tw.style('flex-row gap-1 items-center justify-center')}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPolygons([])}
              style={tw.style('p-2 rounded-3xl min-w-[120px]', {
                backgroundColor: '#e5ebf5',
              })}>
              <Text style={tw.style('text-center', {color: '#666666'})}>
                Reset Polygon Drawing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPolygonsByProvince([])}
              style={tw.style('p-2 rounded-3xl min-w-[120px]', {
                backgroundColor: '#e5ebf5',
              })}>
              <Text style={tw.style('text-center', {color: '#666666'})}>
                Reset Polygon Province
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ActionSheetCP
        title="Options"
        isVisible={isVisibleOption}
        onClose={() => setIsVisibleOption(false)}
        onOpen={() => setIsVisibleOption(true)}>
        <CustomSelectCP
          label="Tỉnh/Thành phố"
          dataList={DATA_PROVINCE}
          placeholder="Chọn Tỉnh/Thành phố"
          selectList={province}
          onSelectValue={val => {
            setProvince(val);
            setIsVisibleOption(false);
          }}
          styleContainer={tw.style('flex-0')}
          idActive="province"
          isActiveDropDown={activeDropDown === 'province'}
          onSetActiveDropDown={val => setActiveDropdown(val)}
          isFullData
        />
        <CustomSelectCP
          label="Kiểu Polygons"
          dataList={TYPE_POLYGON}
          placeholder="Chọn kiểu Polygon"
          selectList={typePolygon}
          onSelectValue={val => {
            setTypePolygon(val);
            setIsVisibleOption(false);
          }}
          styleContainer={tw.style('flex-0')}
          idActive="typePolygon"
          isActiveDropDown={activeDropDown === 'typePolygon'}
          onSetActiveDropDown={val => setActiveDropdown(val)}
          isFullData
        />
      </ActionSheetCP>
    </>
  );
}

function CustomMarker({province}) {
  const {shadowCss} = useCssApp();
  const {colors} = useGetColorThemeDisplay();
  return (
    <View
      style={tw.style('rounded-md p-1', {
        backgroundColor: colors.CRITICAL_COLOR + '9a',
        ...shadowCss(),
      })}>
      <Text
        style={tw.style('text-[11px] font-bold', {
          color: '#fff',
        })}>
        {province?.toUpperCase()}
      </Text>
    </View>
  );
}
function CustomMarkerImage({province}) {
  const {shadowCss} = useCssApp();
  const {colors} = useGetColorThemeDisplay();
  return (
    <View
      style={tw.style(
        'rounded-lg overflow-hidden items-center justify-center',
      )}>
      <Image
        source={require('../../../assets/images/overlay_image.png')}
        style={tw.style('w-8 h-8')}
      />
    </View>
  );
}
