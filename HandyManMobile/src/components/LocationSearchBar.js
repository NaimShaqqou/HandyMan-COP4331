import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"

const GooglePlacesInput = () => {

  const ref = useRef();
  
  let x = useEffect(() => {
    ref.current?.getAddressText();
  }, []);

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder='Search Location'
      styles={
        {
          textInput: {
          backgroundColor: '#FFFFFF',
          height: "100%",
          width: "80%",
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 15,
          flex: 0,
          },
        }}

      // DO WHATEVER YOU WANT WITH THE LOCATION ONCE IT IS SELECTED
      // ↓↓↓↓↓↓↓
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);

        console.log("Now getting the other stuff\n\n\n\n" + x);
      }}
      query={{
        key: PLACES_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;