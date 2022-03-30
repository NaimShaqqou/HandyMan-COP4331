import React from 'react';

import PageTitle from '../components/PageTitle';
import AppBarSearch from '../components/TestAppBarWithSearch';
import '../LoginPage.css';

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader } from '@googlemaps/js-api-loader';

const MyApp = (status) => {
  return (
    <div>
      <AppBarSearch></AppBarSearch>
    </div>
  )
};

export default MyApp;