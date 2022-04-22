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
  Paper,
  Stack,
  Button
} from "@mui/material";

import { motion, AnimatePresence, LayoutGroup, AnimateSharedLayout } from 'framer-motion';

// TODO: fix how marker titles look
// TODO: show service image (replace bread image with actual)
// TODO: customize marker info popup
// TODO: adjust zoom level to fit all markers

const SearchPage = () =>
{
  const { state } = useLocation();
  let [showResults, setShowResults] = useState(true);
  let [focusItem, setFocusItem] = useState(null);

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

  const mapStyle = {
    // border: 3,
    // borderColor: 'steelBlue',
    // borderRadius: 3,
    height: '100%',
  };

  return (
    <Box 
      sx={{
        width: '100%',
        height: '95vh',
      }}
    >
      {/* <Paper
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
            </Paper> */}



      <Box
        sx={{
          ...mapStyle,
        }}
      >
        <Map
          sx={mapStyle}
          focus={focusItem}
          updateFocus={updateFromChild}
          results={(res && res.error == '') ? res.results : []}
          center={center}
        />
      </Box>

      <Box
        // elevation={5}
        maxWidth='100%'
        sx={{ 
          height: '80vh',
          mt: '-50%',
          ml: '3%',
          zIndex: 98,
          // bgcolor: 'green',
          position: 'sticky',
          // borderRadius: 5
          pointerEvents: 'none',
        }}
      >
        <Stack direction='row'
          maxWidth='100%'
          sx={{
            // bgcolor: 'green',
            height: '100%'
          }}
        >
          {/* <LayoutGroup> */}
            {/* <AnimatePresence
              intial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            > */}
              {showResults &&
              <motion.div
                layout
                initial='hidden' 
                animate='visible'
                exit='exit'
                variants={{
                  hidden: {
                    x: -100,
                    opacity: 0
                  },
                  visible: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: {
                    x: -100,
                    opacity: 0
                  }
                }}
              >
                <Box
                  sx={{ 
                    width: '30vh',
                    height: '100%',
                    bgcolor: 'white',
                    pointerEvents: 'auto',
                  }}
                >
                  <SearchResults
                    focus={focusItem}
                    updateFocus={updateFromChild}
                    results={(res && res.error == '') ? res.results : []}
                  />
                </Box>
              </motion.div>}
            {/* </AnimatePresence> */}

            <motion.div layout>
              <Button
                sx={{
                  width: '30px',
                  height: '100%',
                  bgcolor: 'white',
                  pointerEvents: 'auto',
                }}
                onClick={() => {
                  setShowResults(prevState => {
                    console.log(prevState);
                    return !prevState;
                  });
                }}
              >
                Go
              </Button>
            </motion.div>
          {/* </LayoutGroup> */}
        </Stack>
      </Box>

    </Box>
  );
}

export default SearchPage;

