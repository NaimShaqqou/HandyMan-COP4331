import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Divider,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Stack,
  Paper,Button
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import SearchResultCard from './SearchResultCard';
import SearchResultsList from './SearchResultsList';
import SortMenu from './SortMenu';

import { motion, AnimatePresence } from 'framer-motion';

export default function SearchResults(props) {
  let mutableRes = props.results ? props.results : [];
  let navigate = useNavigate();
  const [sort, setSort] = useState('title');
  const [results, setResults] = useState(mutableRes);

  let titleres = [...mutableRes];
  titleres.sort((a, b) => (b.Title.localeCompare(a.Title) == -1 ? 1 : -1));

  let priceincres = [...mutableRes];
  priceincres.sort((a, b) => (parseInt(b.Price) < parseInt(a.Price) ? 1 : -1));

  let pricedecres = [...mutableRes];
  pricedecres.sort((a, b) => (parseInt(b.Price) > parseInt(a.Price) ? 1 : -1));

  const setSortFromChild = (newSort) => {
    setSort(newSort);
  }

  let [showResults, setShowResults] = useState(true);

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
                  pb: 8.5,
                  borderRadius: 3
                }}
              >
                <SortMenu value={sort} onChange={setSortFromChild}/>
                {sort === 'title' && <SearchResultsList results={titleres} focus={props.focus} updateFocus={props.updateFocus}/>}
                {sort === 'priceinc' && <SearchResultsList results={priceincres} focus={props.focus} updateFocus={props.updateFocus}/>}
                {sort === 'pricedec' && <SearchResultsList results={pricedecres} focus={props.focus} updateFocus={props.updateFocus}/>}
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