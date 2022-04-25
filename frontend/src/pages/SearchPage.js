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

// TODO: fix how marker titles look
// TODO: show service image (replace bread image with actual)
// TODO: customize marker info popup
// TODO: adjust zoom level to fit all markers

const SearchPage = () => {
  const { state } = useLocation();
  let [showResults, setShowResults] = useState(true);
  let [focusItem, setFocusItem] = useState(null);
  let [res, setRes] = useState(state && state.res ? state.res : []);

  const updateFocusFromChild = (newFocus) => {
    setFocusItem(newFocus);
  };
  
  const updateResFromSearchbar = (newRes) => {
    setRes(newRes);
  };

  console.log(state);

  let center = {
    lat: 28.602,
    lng: -81.200,
  };
  
  if (res && res.searchLocationCoords)
    center = res.searchLocationCoords;

  // console.log('in search page');
  console.log(center);

  // let res = (state ? state.res : null);

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
          sx={{ height: '100%' }}
          focus={focusItem}
          updateFocus={updateFocusFromChild}
          results={(res && res.error == '') ? res.results : []}
          center={center}
        />

        {/* <Map2
          sx={{
            width: '100%',
            height: '100%',
          }}
          focus={focusItem}
          updateFocus={updateFocusFromChild}
          results={(res && res.error == '') ? res.results : []}
          center={center}
        /> */}
      </Box>

      {/* <motion.div
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={{
          hidden: {
            y: -100,
            opacity: 0
          },
          visible: {
            y: 0,
            opacity: 1,
          },
          exit: {
            y: -100,
            opacity: 0
          }
        }}
        transition={{
          duration: 0.5
        }}
      >
      </motion.div> */}
      <Container sx={{ 
          // display: { xs: 'none', sm: 'none', s900: 'flex' }, 
          maxWidth: { xs: '380px', sm: '480px', lg: '910px'},
          // width: '500px',
          height: '300px',
          mt: '-90vh',
          ml: '50vh',
          // bgcolor: 'green',
          position: 'sticky',
          pointerEvents: 'none',
        }}
      >
        <SearchBar updateRes={updateResFromSearchbar}/>
      </Container>

      <Box
        // elevation={5}
        maxWidth='100%'
        sx={{
          height: '80vh',
          mt: '-20vh',
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
            // bgcolor: 'blue',
            height: '100%'
          }}
        >
          <AnimatePresence
            // intial={false}
            // exitBeforeEnter={true}
          // onExitComplete={() => null}
          >
            {showResults &&
              <motion.div
                key='results'
                layout
                initial={{
                  x: -100,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: -300,
                  opacity: 0
                }}
                transition={{
                  duration: 0.2
                }}
              >
                <Box
                  sx={{
                    width: '30vh',
                    height: '100%',
                    bgcolor: '#fff',
                    pointerEvents: 'auto',
                  }}
                >
                  <SearchResults
                    focus={focusItem}
                    updateFocus={updateFocusFromChild}
                    searchResults = {state}
                    results={(res && res.error == '') ? res.results : []}
                  />
                </Box>
              </motion.div>}
              

            <motion.div
              key='button'
              layout
              // initial={false}
              // animate={false}
              // exit={false}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: '5px',
              }}
            >

              <motion.button
                whileHover={{
                  scale: 1.05,
                  // height: '90%',
                  backgroundColor: '#429bff',
                }}
                // initial={{
                //   // x: -100,
                //   opacity: 1
                // }}
                // animate={{
                //   // x: 0,
                //   opacity: 1,
                // }}
                // exit={{
                //   // x: -100,
                //   opacity: 1
                // }}
                drag
                dragConstraints={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                // onHoverStart={e => {}}
                // onHoverEnd={e => {}}
                style={{
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#fff',
                  // backgroundColor: '#005cc4',
                  color: 'black',
                  cursor: 'pointer',
                  width: '40px',
                  height: '20%',
                  bgcolor: '#fff',
                  pointerEvents: 'auto',
                  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                }}
                onClick={() => {
                  setShowResults(prevState => {
                    console.log(prevState);
                    return !prevState;
                  });
                }}
              >
                {showResults ? 
                <ArrowBackIosIcon sx={{ color: '#003c80'}} /> 
                : 
                <ArrowForwardIosIcon sx={{ color: '#003c80'}}/>}
                
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </Stack>
      </Box>

    </Box>
  );
}

export default SearchPage;

