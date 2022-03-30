import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar.js"
import MapComponent from '../components/gmaps';

import {
  Container
} from "@mui/material";

const HomePage = () =>
{
  let [center, setCenter] = useState({
    lat: '28.602',
    lng: '-81.200'
  });

  const centerChange = (prop) => (event) => {
    setCenter({ ...center, [prop]: event.target.value });
  };

  var storage = require("../tokenStorage.js");

  let id = storage.retrieveToken();

  if (id == null) {
    id = 'null';
  } else {
    id = JSON.stringify(jwt_decode(id));
  }

  return(
    <div>
      <ResponsiveAppBar />
      <h1>Handler</h1>
      <h2>Hello userId: {id}</h2>

      <Container maxWidth="md">
          <SearchBar />
      </Container>

      <span>change lat-lng and to re-center map.</span>
      <input id="tempInput1" type="text" placeholder='lat' value={center.lat} onChange={centerChange('lat')}/>
      <input id="tempInput2" type="text" placeholder='lng' value={center.lng} onChange={centerChange('lng')}/>

      <br /><br />
      <div className='mapsize'>
      <MapComponent center={{lat: parseFloat(center.lat), lng: parseFloat(center.lng)}}/>
      </div>
    </div>
    
  );
}

const classes = {
  box: {
    width: 500,
    // padding: 20,
    // textAlign: "center",
    // justifyContent: "center",
    // backgroundColor: "blue",
    // color: "black"
  }
};

export default HomePage;