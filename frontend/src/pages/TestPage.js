import React from 'react';

import MyComponent from '../components/gmaps';

import PageTitle from '../components/PageTitle';
import Title from '../components/Title';
import LoginBox from '../components/LoginBox';
import RegisterBox from '../components/RegisterBox';
import ResponsiveAppBar from '../components/NavBar';
import '../LoginPage.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader } from '@googlemaps/js-api-loader';

const MyApp = (status) => {
  return (
    <MyComponent/>
  )
};

export default MyApp;