import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar.js"
import MapComponent from '../components/Map';
import { useSelector } from "react-redux";

import {
  Container
} from "@mui/material";

const HomePage = () =>
{
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  let user = useSelector((state) => state.user);
  let msg = 'Welcome, Guest!';
  console.log('Rendering Homepage: ');
  console.log(user);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  if (user.userId != '') {
    msg = 'Hello, ' + user.firstName + " " + user.lastName;
  }

  // let navigator = window.navigator;
  // console.log(navigator.geolocation);

  // console.log(navigator.getCurrentPosition());

  return(
    <div>
      <ResponsiveAppBar />
      <h1>Handler</h1>
      <h2 style={{textAlign: 'center'}}>{msg}</h2>

      <Container sx={{ maxWidth: { xs: '500px', md: 'md'} }}>
        <SearchBar/>
      </Container>

      <div className="App">
        <button onClick={getLocation}>Get Location</button>
        <h1>Coordinates</h1>
        <p>{status}</p>
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>}
      </div>
    </div>

  );
}

export default HomePage;