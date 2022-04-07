import React from 'react';

import AppBarSearch from '../components/TestAppBarWithSearch';
import '../LoginPage.css';

import {
  Grid,
  Typography,
} from "@mui/material";

const MyApp = (status) => {
  return (
    <div>
      <AppBarSearch></AppBarSearch>
    </div>
  )
};

export default MyApp;