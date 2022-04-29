import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import Navbar from '../components/NavBar';
import SearchResults from "../components/SearchResults";
import Map from '../components/Map';
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar"

import Map2 from '../components/GoogleMapReactComponent';

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
  let [res, setRes] = useState(state && state.res ? state.res : []);

  const updateFocusFromChild = (newFocus) => {
    setFocusItem(newFocus);
  };
  
  const updateResFromSearchbar = (newRes) => {
    setRes(newRes);
  };

  // console.log(state);

  let center = {
    lat: 28.602,
    lng: -81.200,
  };
  
  if (res && res.searchLocationCoords)
    center = res.searchLocationCoords;

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
        <Map2
          sx={{
            width: '100%',
            height: '100%',
          }}
          focus={focusItem}
          updateFocus={updateFocusFromChild}
          results={(res && res.error == '') ? res.results : []}
          center={center}
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
        <SearchBar updateRes={updateResFromSearchbar}/>
      </Container>

      <SearchResults
        focus={focusItem}
        updateFocus={updateFocusFromChild}
        searchResults = {state}
        results={(res && res.error == '') ? res.results : []}
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

