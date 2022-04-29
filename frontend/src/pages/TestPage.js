import React, { useState } from 'react';

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

import Switch from '../components/Switch';
import { ClassNames } from '@emotion/react';

const MyApp = (status) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  console.log(isOn);

  return (
    <Box 
      sx={{ 
        // bgcolor: 'green',
        // height: '100px',
        // width: '100px',
      }}
    >
      <Switch value={isOn} onClick={toggleSwitch} />
    </Box>
  )
};

export default MyApp;