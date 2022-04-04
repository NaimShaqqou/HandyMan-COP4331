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
  let [results, setResults] = useState([{
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
  }]);
  let user = useSelector((state) => state.user);
  let msg = 'Welcome, you are not logged in.';
  console.log('in homepage: ');
  console.log(user);

  const sendToParent = (index) => {
    setResults(index);
  };

  if (user.userId != '') {
    msg = 'Hello, ' + user.firstName + " " + user.lastName;
  }

  console.log(results);

  return(
    <div>
      <ResponsiveAppBar />
      <h1>Handler</h1>
      <h2 style={{textAlign: 'center'}}>{msg}</h2>

      <Container maxWidth="md">
        <SearchBar sendToParent={sendToParent}/>
      </Container>
    </div>
    
  );
}

export default HomePage;