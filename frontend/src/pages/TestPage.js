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
  Stack,
  Avatar
} from "@mui/material";

import Map2 from '../components/GoogleMapReactComponent';

const MyApp = (status) => {

  return (
    <Box 
      sx={{ 
        bgcolor: 'green',
        height: '100px',
        width: '100px',
      }}
    >
      <Avatar 
        alt="Remy Sharp" 
        src="https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650429195/images/cvqjeiixca3jr1qe8efv.jpg" 
        sx={{
          height: '100%',
          width: '100%',
        }}
      />
    </Box>
  )
};

export default MyApp;