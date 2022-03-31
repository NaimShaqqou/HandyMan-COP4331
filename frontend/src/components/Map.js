import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, } from '@react-google-maps/api';

const Map = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyADmpMRE8HD7JlV4vQK1V1RjzScFszfMB8"
  })

  const containerStyle = {
    width: '100%',
    height: '850px',
  };
  
  const markers = [{
    position: {
      lat: 28.602,
      lng: -81.200
    },
    name: "marker for ucf"
  }];

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={15}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        <Marker
          onLoad={onLoad}
          position={markers[0].position}
          clickable={true}
          label={markers[0].name}
          onClick={((e) => console.log(e))}
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)