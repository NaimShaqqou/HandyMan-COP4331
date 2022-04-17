import React from 'react';

import AppBarSearch from '../components/TestAppBarWithSearch';
import AntTabs from '../components/AntTabs';
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
      
      <AntTabs></AntTabs>

    </div>
  )
};

export default MyApp;