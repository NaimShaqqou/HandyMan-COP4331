import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"
import { Icon, Input } from 'native-base';
import { MaterialIcons } from "@native-base/icons";

const GooglePlacesInput = ({filterIcon}) => {

  const ref = useRef();

  // used to set the filters section of the front end
  var filters = {
    search: "",
    category: "",
    maxDist: 15
  }
  
  function setFilters(filters)
  {
    this.filters = filters;
  }

  const doSearch = async (location, event) => 
  {
    try {
      // call register api
      var obj = { 
        search: filters.search, 
        category: filters.category, 
        location: location, 
        maxDist: filters.maxDist, 
        jwtToken: lName
      }
      var js = JSON.stringify(obj);

      const response = await fetch('https://myhandyman1.herokuapp.com/api/search-services', {
          method: 'POST',
          body: js,
          headers: { "Content-Type": "application/json" }
      });
      var res = JSON.parse(await response.text());

      // if (res.error == '') 
        // send the data to the map and list

    } catch (e) {
      console.log(e.toString());
      return; 
    }

    // if successful navigate to confirm email page
    // if error, then determine type of error and display it
  }  

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
        InputRightElement: filterIcon,
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
        doSearch(data.description);
        console.log(data);
      }}
      query={{
        key: PLACES_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;