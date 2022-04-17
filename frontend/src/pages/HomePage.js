import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar.js"
import MapComponent from '../components/Map';
import { useSelector } from "react-redux";

import {
  Box,
  Stack,
  Typography,
  Container
} from "@mui/material";

const HomePage = () =>
{
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [region, setRegion] = useState(null);
  const [status, setStatus] = useState(null);
  let user = useSelector((state) => state.user);
  let msg = 'Welcome, Guest!';
  console.log('Rendering Homepage: ');
  // console.log(user);

  let bp = require("../components/Path");

  const reverseGeocode = async (latt, lngg) => {
    var obj = { lat: latt, lng: lngg };
    var js = JSON.stringify(obj);

    console.log(obj);

    try {
      const response = await fetch(bp.buildPath("api/reverse-geocode"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      setRegion(res.location);
      console.log(res.location);

    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }


  if (user.userId != '') {
    msg = 'Hello, ' + user.firstName + " " + user.lastName;
  }

  return(
    <div>
      <ResponsiveAppBar />
      <Box sx={{ m: 15 }} />

      <Stack spacing={7}>
        <Typography
          variant='h2'
          style={{textAlign: 'center'}}
        >
          {msg}
        </Typography>

        <div>
          <Container sx={{ maxWidth: { xs: '400px', sm: '500px', md: '960px'} }}>
            <SearchBar/>
          </Container>
        </div>

        <div className="App">
          <button onClick={getLocation}>Get Location</button>
          <h1>Coordinates</h1>
          <p>{status}</p>
          {region && <p>Region: {region}</p>}
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
        </div>
      </Stack>
    </div>

  );
}

export default HomePage;