import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import Navbar from '../components/NavBar';
import SearchResults from "../components/SearchResults";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar"

import Map from '../components/GoogleMapReactComponent';

import {
  Container,
  Grid,
  Box,
  Paper,
  Stack,
  Button
} from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { motion, AnimatePresence, LayoutGroup, AnimateSharedLayout } from 'framer-motion';

const SearchPage = () => {
  const { state } = useLocation();
  
  let [focusItem, setFocusItem] = useState(null);
  // let [res, setRes] = useState(state && state.res ? state.res : []);
  let [resObj, setResObj] = useState({
    res: state && state.res ? state.res : [],
    fitBoundsTrigger: 0,
  });
  let [mapMargin, setMapMargin] = useState({});

  // console.log(mapMargin);

  // const triggerFitBounds = () => {
  //   setFitBoundsTrigger(prev => !prev);
  // }

  const updateMapMarginFromChild = (newMapMargin) => {
    setMapMargin(newMapMargin);
  }

  const updateFocusFromChild = (newFocus) => {
    setFocusItem(newFocus);
  };
  
  const updateResFromSearchbar = (newResObj) => {
    setResObj(newResObj);
  };

  console.log(resObj);

  // console.log(state);

  // let center = {
  //   lat: 28.602,
  //   lng: -81.200,
  // };

  // let res = resObj.res;

  // if (res && res.searchLocationCoords)
  //   center = res.searchLocationCoords;

  return (
    <Box
      sx={{
        width: '100%',
        height: '95vh',
      }}
    >
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
        <SearchBar updateRes={updateResFromSearchbar} mapMargin={mapMargin} fitBoundsTrigger={resObj.fitBoundsTrigger} />
      </Container>

      <SearchResults
        focus={focusItem}
        updateFocus={updateFocusFromChild}
        searchResults = {state}
        results={(resObj.res && resObj.res.error == '') ? resObj.res.results : []}
        sx={{
          height: '75vh',
          mt: '-15vh',
          ml: '3%',
          zIndex: 98,
          position: 'sticky',
          pointerEvents: 'none',
        }}
      />

    </Box>
  );
}

export default SearchPage;

