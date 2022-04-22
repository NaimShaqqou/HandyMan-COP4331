import React from 'react';

import AppBarSearch from '../components/TestAppBarWithSearch';
import AntTabs from '../components/AntTabs';
import TestDragNDrop from '../components/TestDragNDrop';
import '../LoginPage.css';

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

const MyApp = (status) => {
  
  return (
    <Stack
      // maxWidth={false}
      direction='row'
      sx={{
        bgcolor: 'green',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          bgcolor: 'blue'
        }}
      >
        hello
      </Box>

    </Stack>
  )
};

export default MyApp;