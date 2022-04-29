import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

import Marker from './Marker';
import { useNavigate, useLocation } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion, AnimatePresence } from 'framer-motion';

import MarkerInfo from './MarkerInfo';

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Paper,
  IconButton,
  Container,
  Grid,
  ClickAwayListener
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
  resObj: {
    fitBoundsTrigger: 0,
    res: {
      searchLocationCoords: {
          lat: 28.5383832,
          lng: -81.3789269
      },
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
      ],
      error: ""
    }
  }
}

export default function Map(props) {
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  let navigate = useNavigate();

  const results = props.resObj && props.resObj.res && props.resObj.res.results ? props.resObj.res.results : [];

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
    mapsRef.current = maps;
    console.log(mapRef.current);
    // console.log(map);
    // console.log(maps);
    // Get bounds by our places

    if (results.length != 0)
      fitToPlaces();

    // Bind the resize listener
    // bindResizeListener(map, maps, bounds);
  };

  const fitToPlaces = () => {
    const bounds = getMapBounds(mapRef.current, mapsRef.current, results);
    // Fit map to bounds
    // mapRef.current.panToBounds(bounds);
    console.log(bounds);
    mapRef.current.fitBounds(bounds);

    // if (mapRef.current.zoom > 15)

    mapRef.current.setZoom(Math.min(mapRef.current.getZoom() - 1, 15));
  };

  useEffect(() => {
    if (mapRef.current && mapsRef.current) {
      fitToPlaces();
      console.log(164);

      if (results.length == 0)
        mapRef.current.setCenter(props.center);
      
    }

  }, [props.resObj.fitBoundsTrigger]);
  
  useEffect(() => {
    if (props.focus && mapRef.current) {
      // mapRef.current.setCenter(props.center);
      mapRef.current.panTo({
        lat: parseFloat(props.focus.Latitude),
        lng: parseFloat(props.focus.Longitude),
      });
    }
  }, [props.focus]);


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
    props.updateMargin(mapState.marginBounds);
    // console.log(mapRef.current);
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Button onClick={() => mapRef.current.setZoom(10)}>Zoom</Button>
      <Button onClick={() => mapRef.current.setCenter({lat: 28.602,lng: -81.200,})}>Center</Button>
      <Button onClick={() => mapRef.current.panTo({lat: 28.602,lng: -81.200,})}>Pan</Button> */}
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
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, results)}
          // onLoad={handleLoad}
        >
          {results.map(listitem => (
            <Box 
              key={listitem._id} 
              lat={parseFloat(listitem.Latitude)} 
              lng={parseFloat(listitem.Longitude)} 
            >
              <AnimatePresence exitBeforeEnter>
                {props.focus != null && listitem._id == props.focus._id &&
                  <MarkerInfo service={listitem} updateFocus={props.updateFocus} />
                }
              </AnimatePresence>

              <Marker
                service={listitem}
                focus={props.focus}
                text={listitem.Title}
                onClick={() => props.updateFocus(listitem)}
              />
            </Box>
            
          ))}
        </GoogleMapReact>
      </Box>
    </ThemeProvider>
  );
}