import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults"
import MapComponent from '../components/Map';

import {
  Paper,
} from "@mui/material";

import {
  Container
} from "@mui/material";

const SearchPage = () =>
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

  let results = [
    {
      _id: "623a99227131da5da110fa58",
      UserId: "6234c4d39a050a36555a6942",
      Title: "Bakery1",
      Images: [
        "image1",
        "image2"
      ],
      Address: "14330 Alafaya Oak Bend",
      Longitude: "-81.1705685",
      Latitude: "28.510048",
      Description: "My Bakery is so cool",
      Price: "5",
      DaysAvailable: [
        "Monday"
      ],
      Category: "Baking",
      __v: 0
    },
    {
      _id: "623a99227131da5da110fa59",
      UserId: "6234c4d39a050a36555a6942",
      Title: "Cakery2",
      Images: [
        "image1",
        "image2"
      ],
      Address: "14330 Alafaya Oak Bend",
      Longitude: "-81.1705685",
      Latitude: "28.510048",
      Description: "My Bakery is so cool",
      Price: "5",
      DaysAvailable: [
        "Monday"
      ],
      Category: "Baking",
      __v: 0
    },
    {
      _id: "623a99227131da5da110fa60",
      UserId: "6234c4d39a050a36555a6942",
      Title: "Bakery3",
      Images: [
        "image1",
        "image2"
      ],
      Address: "14330 Alafaya Oak Bend",
      Longitude: "-81.1705685",
      Latitude: "28.510048",
      Description: "My Bakery is so cool",
      Price: "5",
      DaysAvailable: [
        "Monday"
      ],
      Category: "Baking",
      __v: 0
    }
  ];

  return(
    <div>
      <ResponsiveAppBar />
      <div>
        <Container maxWidth="xl">
          <MapComponent center={{lat: parseFloat(center.lat), lng: parseFloat(center.lng)}}/>
        </Container>
      </div>

      <span>change lat-lng and to re-center map.</span>
      <input id="tempInput1" type="text" placeholder='lat' value={center.lat} onChange={centerChange('lat')}/>
      <input id="tempInput2" type="text" placeholder='lng' value={center.lng} onChange={centerChange('lng')}/>

      <br /><br />

      <SearchResults results={results}></SearchResults>

    </div>
    
  );
}

export default SearchPage;