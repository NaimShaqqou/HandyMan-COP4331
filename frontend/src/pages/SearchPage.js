import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import Navbar from '../components/NavBar';
import SearchResults from "../components/SearchResults";
import Map from '../components/Map';
import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Grid,
  Box,
  Paper
} from "@mui/material";

// TODO: fix how marker titles look
// TODO: show service image (replace bread image with actual)
// TODO: customize marker info popup
// TODO: adjust zoom level to fit all markers

const SearchPage = () =>
{
  const { state } = useLocation();
  let [focusItem, setFocusItem] = React.useState(null);

  const updateFromChild = (newFocus) => {
    setFocusItem(newFocus);
  };

  console.log(state);

  let center = state && state.res ? state.res.searchLocationCoords : {
    lat: 28.602,
    lng: -81.200,
  };
    
  // console.log('in search page');
  // console.log(center);

  let res = (state ? state.res : null);
  let srch = (state ? state.obj : null);

  const resultsMapStyle = {
    border: 3,
    borderColor: 'steelBlue',
    // borderRadius: 3
  };

  return (
    <Box>
      {/* <Navbar search={srch}/> */}
      <br />

      <Container maxWidth={false} sx={{
          width: { xl: '80%'},
          height: '1000px'
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Grid container sx={{height: '100%'}}>
            <Grid item xs={3} sx={{height: '100%'}}>
              <SearchResults
                sx={resultsMapStyle}
                focus={focusItem}
                updateFocus={updateFromChild}
                results={(res && res.error == '') ? res.results : []}
              />
            </Grid>
            <Grid item xs={9} sx={{height: '100%'}}>
              <Map
                sx={resultsMapStyle}
                focus={focusItem}
                updateFocus={updateFromChild}
                results={(res && res.error == '') ? res.results : []}
                center={center}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default SearchPage;

