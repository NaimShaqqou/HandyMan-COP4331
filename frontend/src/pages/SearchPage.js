import React, { useState, useEffect } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import Navbar from '../components/NavBar';
import SearchResults from "../components/SearchResults";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar"
import Switch from "../components/Switch"

import Map from '../components/GoogleMapReactComponent';

import {
  Container,
  Box,
} from "@mui/material";

const SearchPage = () => {
  console.log('SearchPage');
  const { state } = useLocation();
  
  let [autoSearch, setAutoSearch] = useState(false);
  let [focusItem, setFocusItem] = useState(null);
  let [resObj, setResObj] = useState({
    res: state && state.res ? state.res : [],
    fitBoundsTrigger: 0,
  });
  let [searchTrigger, setSearchTrigger] = useState(0);
  let [mapMargin, setMapMargin] = useState({});

  // useEffect(() => {
  //   if (state.res) {
  //     console.log(43);
  //   }
  // }, []);

  // console.log(mapMargin);

  // const triggerFitBounds = () => {
  //   setFitBoundsTrigger(prev => !prev);
  // }

  const toggleAutoSearch = () => {
    setAutoSearch(prev => !prev);
  }

  const updateMapMarginFromChild = (newMapMargin) => {
    setMapMargin(newMapMargin);
  }

  const updateFocusFromChild = (newFocus) => {
    setFocusItem(newFocus);
  };
  
  const updateResFromSearchbar = (newResObj) => {
    setResObj(newResObj);
  };

  const triggerSearch = () => setSearchTrigger(Math.random());

  return (
    <Box
      sx={{
        // mt: '0px',
        width: '100%',
        height: 'calc(100vh - 64px)',
      }}
    >
      {/* Developer Tools */}
      {/* <Button onClick={triggerSearch}>Search Current Map</Button> */}
      <Box
        sx={{
          height: '100%'
        }}
      >
        <Map
          sx={{
            width: '100%',
            height: '100%',
          }}
          focus={focusItem}
          updateFocus={updateFocusFromChild}
          resObj={resObj}
          // center={center}
          updateMargin={updateMapMarginFromChild}
          triggerSearch={triggerSearch}
          autoSearch={autoSearch}
        />
      </Box>

      <Container sx={{ 
          width: { xs: '410px', sm: '510px', md: '940px'},
          height: '300px',
          mt: '-90vh',
          position: 'sticky',
          pointerEvents: 'none',
        }}
      >
        <SearchBar 
          updateRes={updateResFromSearchbar} 
          mapMargin={mapMargin} 
          fitBoundsTrigger={resObj.fitBoundsTrigger}
          searchTrigger={searchTrigger}
        />

        <Switch 
          value={autoSearch} 
          onClick={toggleAutoSearch}
          width={100}
          height={60}
          style={{
            // width: '160px',
            // height: '100px',
            position: 'absolute',
            top: 0,
            left: -100,
          }}
          text=""
        />
      </Container>

      <SearchResults
        focus={focusItem}
        updateFocus={updateFocusFromChild}
        searchResults = {state}
        results={(resObj.res && resObj.res.error == '') ? resObj.res.results : []}
        sx={{
          // width: '500px',
          height: '75%',
          mt: '-200px',
          ml: '3%',
          zIndex: 98,
          position: 'sticky',
          pointerEvents: 'none',
          // bgcolor: 'green',
        }}
      />

    </Box>
  );
}

export default SearchPage;

