import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Divider,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Stack,
  Paper
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import SearchResultCard from './SearchResultCard';

import { motion, AnimatePresence } from 'framer-motion';

export default function SearchResults(props) {
  let navigate = useNavigate();

  // Sort by title
  if (props.results)
    props.results.sort((a, b) => (b.Title.localeCompare(a.Title) == -1 ? 1 : -1));

  let [showResults, setShowResults] = useState(true);

  const theme = createTheme({
    typography: {
      fontFamily: [
        // 'Comfortaa',
        'Roboto',
        '"Helvetica"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  return (
    <Box
      sx={{
        ...props.sx,
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
              <Paper
                elevation={10}
                sx={{
                  width: {md: '400px'},
                  height: '100%',
                  bgcolor: '#fff',
                  pointerEvents: 'auto',
                  pt: 1,
                  pb: 3.5,
                  borderRadius: 3
                }}
              >
                <ThemeProvider theme={theme}>
                  <ul
                    style={{
                      overflow: 'auto', // scroll bar
                      height: '100%',
                      // backgroundColor: 'green',
                      paddingLeft: 5
                    }}
                  >
                    { (props.results && props.results.length > 0) ? props.results.map(listitem => (
                      <li
                        key={listitem._id} 
                        style={{  }}
                      >
                        <SearchResultCard
                          listitem={listitem} 
                          focus={props.focus} 
                          updateFocus={props.updateFocus}
                        />
                        <Divider />
                      </li>
                    )) : (
                    <div>
                      <Typography
                        variant='h4'
                        sx={{
                          textAlign: 'center',
                          paddingTop: 5,
                        }}
                      >
                        No results found
                      </Typography>
                    </div>
                    )}
                  </ul>
                </ThemeProvider>
              </Paper>
            </motion.div>}
            

          <motion.div
            key='button'
            layout
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
    
  );
}