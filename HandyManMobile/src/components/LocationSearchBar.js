import React, { useEffect, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "@env";
import { TextInput } from "react-native-paper";

const GooglePlacesInput = (props) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      textInputProps={{
        InputComp: TextInput,
        style: {
          width: "100%",
        },
        mode: "outlined",
        left: <TextInput.Icon name="magnify" />,
        right: props.filterIcon,
        label: "Location",
      }}
      // DO WHATEVER YOU WANT WITH THE LOCATION ONCE IT IS SELECTED
      // ↓↓↓↓↓↓↓
      onPress={(data, _details = null) => {
        // 'details' is provided when fetchDetails = true

        // Set the location in the parent
        props.passLocation(data.description);
      }}
      query={{
        key: PLACES_API_KEY,
        language: "en",
      }}
    />
  );
};

export default GooglePlacesInput;
