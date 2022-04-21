import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"
import { Icon, Input } from 'native-base';
import { MaterialIcons } from "@native-base/icons";

const GooglePlacesInput = (props) => {

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
      textInputProps={{
        InputComp: Input,
        InputLeftElement: <Icon size="6" ml="2" as={<MaterialIcons name="search" />} Color="muted.400" />,
        InputRightElement: props.clearButton,
        InputRightElement: props.filterIcon,
        w: '100%',
        h: '50',
        variant: 'filled',
        size: 'xl',
        bgColor: 'white',
      }}
      // styles={
      //   {
      //     textInput: {
      //       backgroundColor: '#fff',
      //       height: "100%",
      //       width: "90%",
      //       borderRadius: 1,
      //       borderColor: "blue",
      //       paddingTop: 5,
      //       paddingRight: 0,
      //       paddingBottom: 5,
      //       paddingLeft: 0,
      //       fontSize: 17,
      //       flex: 0,
      //     },
      //     textInputContainer: {
      //       alignSelf: "center"
      //     }
      //   }}

      // DO WHATEVER YOU WANT WITH THE LOCATION ONCE IT IS SELECTED
      // ↓↓↓↓↓↓↓
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true

        // Set the location in the parent
        props.passLocation(data.description);
        // props.doSearch(data.description);
      }}
      query={{
        key: PLACES_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;