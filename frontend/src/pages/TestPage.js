import React from 'react';

import AppBarSearch from '../components/TestAppBarWithSearch';
import '../LoginPage.css';

import {
  Select,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

const MyApp = (status) => {
  
  return (
    <div>
      <AppBarSearch></AppBarSearch>

      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel>Numbers</InputLabel>
        <Select>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          <MenuItem value={40}>Forty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
};

export default MyApp;