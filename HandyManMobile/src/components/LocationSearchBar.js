import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "@env";
import { TextInput } from "react-native-paper";

const GooglePlacesInput = forwardRef((props, ref) => {
  const autocompleteRef = useRef();
  
  // Call this to change the services. This will force refresh the render.
  // handleChange = e => this.setState({services: e});
  useImperativeHandle(ref, () => ({

    setText(text)
    {
      autocompleteRef.current?.setAddressText(text);
    }
    
  }));

  return (
    <GooglePlacesAutocomplete
      ref={autocompleteRef}
      textInputProps={{
        InputComp: TextInput,
        style: {
          width: "100%",
        },
        mode: props.mode != null ? "flat" : "outlined",
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
});

export default GooglePlacesInput;
