import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';

const dummyService = {
  _id: 1,
  Title: 'servicetitle',
  Latitude: '59.95',
  Longitude: '30.4',
};

const MyMarker = ({service, focus}) => {
  return (
    <Box style={{
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(-50%, -50%)',
    }}>

      {focus && (focus._id == service._id) &&
        <Box
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'green'
          }}
        />
      }
      <LocationOnIcon 
        sx={{
          color: '#003c80',
          height: '50px',
          width: '50px',
          cursor: 'pointer',
        }}
      />
    </Box>
  )
};

const theme = createTheme({
  typography: {
    fontFamily: [
      // 'Comfortaa',
      'Roboto',
      '"Helvetica"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

MyMarker.defaultProps = {
  service: dummyService,
}

Map.defaultProps = {
  center: {lat: 59.95, lng: 30.33},
  zoom: 11,
  results: [
    {
      _id: 1,
      Title: 'service 1',
      Latitude: '59.95',
      Longitude: '30.4',
    },
    {
      _id: 2,
      Title: 'service 2',
      Latitude: '59.95',
      Longitude: '30.2',
    }
  ]
}

export default function Map(props) {
  const mapRef = useRef(null);
  let defaultCenter = {
    lat: 28.602,
    lng: -81.200,
  };

  // Return map bounds based on list of places
  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(
        place.Latitude,
        place.Longitude
      ));
    });
    return bounds;
  };

  // // Re-center map when resizing the window
  // const bindResizeListener = (map, maps, bounds) => {
  //   maps.event.addDomListenerOnce(map, 'idle', () => {
  //     maps.event.addDomListener(window, 'resize', () => {
  //       map.fitBounds(bounds);
  //     });
  //   });
  // };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    mapRef.current = map;
    console.log(mapRef.current);
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    console.log(map);
    // map.setZoom(5);
    // Bind the resize listener
    // bindResizeListener(map, maps, bounds);
  };

  // useEffect(() => {
  //   // Get bounds by our places
  //   const bounds = getMapBounds(map, maps, places);
  //   // Fit map to bounds
  //   map.fitBounds(bounds);
  // }, []);


  // function handleLoad(map) {
  //   mapRef.current = map;
  //   console.log(mapRef);
  // }

  const clickItem = (item) => async (event) => {
    props.updateFocus(item);
  };

  function createMapOptions(maps) {
    return {
      // panControl: false,
      // mapTypeControl: true,
    }
  }

  const onChange = (mapState/* , bounds, marginBounds */) => {
    // console.log(props.center);
    // console.log(mapState);
    // console.log(mapRef.current);
  }

  // console.log(props.focus);

  console.log(props.center);

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => mapRef.current.setZoom(5)}>Button</Button>
      <Box
        sx={{
          ...props.sx,
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyADmpMRE8HD7JlV4vQK1V1RjzScFszfMB8' }}
          defaultCenter={defaultCenter}
          // center={props.center}
          zoom={props.zoom}
          options={createMapOptions}
          onChange={onChange}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, props.results)}
          // onLoad={handleLoad}
        >
          {props.results.map(listitem => (
            <MyMarker 
              key={listitem._id}
              lat={parseFloat(listitem.Latitude)} 
              lng={parseFloat(listitem.Longitude)} 
              service={listitem}
              focus={props.focus}
            />
          ))}
        </GoogleMapReact>
      </Box>
    </ThemeProvider>
  );
}