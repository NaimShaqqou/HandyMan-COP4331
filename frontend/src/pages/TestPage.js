import React from 'react';

import {
  Select,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Container,
  Stack
} from "@mui/material";

import Map2 from '../components/GoogleMapReactComponent';

const MyApp = (status) => {

  return (
    <Box
      // maxWidth={false}
      // direction='row'
      // sx={{
      //   // bgcolor: 'green',
      //   width: '50vh',
      //   height: '50vh',
      // }}
    >
      <Map2
        sx={{
          width: '100%',
          height: '700px',
        }}
        // focus={focusItem}
        // updateFocus={updateFromChild}
        // results={(res && res.error == '') ? res.results : []}
        // center={center}
      />

    </Box>
  )
};

export default MyApp;