import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

import Marker from './Marker';
import { useNavigate, useLocation } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Paper,
  IconButton,
  Container,
  Grid
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
  const mapsRef = useRef(null);
  let navigate = useNavigate();

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

    if (props.results.length != 0)
      fitToPlaces();

    // Bind the resize listener
    // bindResizeListener(map, maps, bounds);
  };

  const fitToPlaces = () => {
    const bounds = getMapBounds(mapRef.current, mapsRef.current, props.results);
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

      if (props.results.length == 0)
        mapRef.current.setCenter(props.center);
      
    }

  }, [props.results]);
  
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
    console.log(mapState);
    // console.log(mapRef.current);
  }

  console.log(props.focus);

  // console.log(props.center);

  const Info = ({service}) => {
    const clickOpen = (item) => (event) => {
      navigate("/service", { state: { service: item } });
    };

    let imageURL = '';

    if (service.Images.length > 0)
      imageURL = service.Images[0];

    return (
      <Paper
        sx={{
          bgcolor: '#fff',
          height: '200px',
          minWidth: '150px',
          mt: -27,
          ml: -2,
          position: 'absolute',
          zIndex: 2,
        }}
      >
        <Grid container pt={2} sx={{
          width: '100%'
        }}>
          <Grid item xs={10} sx={{
          width: '100%'
        }}>
            <Typography variant='h6' sx={{ textAlign: 'center', pl: 3, width: '100%'}}>
              {service.Title}
            </Typography>

          </Grid>
          
          <Grid
            item 
            xs={2}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}>
            <IconButton onClick={() => props.updateFocus(null)} sx={{
              height: '40px',
              mt: -2
            }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {/* {service.Images} */}
        <img src={imageURL} style={{ height: '50%', width: '50%', objectFit: 'cover'  }}/>
        <Button onClick={clickOpen(service)}>Open</Button>
      </Paper>

    )
  };

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
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, props.results)}
          // onLoad={handleLoad}
        >
          {props.results.map(listitem => (
            // <MyMarker 
            //   key={listitem._id}
            //   lat={parseFloat(listitem.Latitude)} 
            //   lng={parseFloat(listitem.Longitude)} 
            //   service={listitem}
            //   focus={props.focus}
            // />

            <Box 
              key={listitem._id} 
              lat={parseFloat(listitem.Latitude)} 
              lng={parseFloat(listitem.Longitude)} 
            >
              {props.focus != null && listitem._id == props.focus._id &&
                <Info service={listitem} />
              }

              
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