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
  let user = useSelector((state) => state.user);
  let msg = 'Welcome, you are not logged in.';
  console.log(user);

  if (user.userId != '') {
    msg = 'Hello, ' + user.firstName + " " + user.lastName;
  }

  return(
    <div>
      <ResponsiveAppBar />
      <h1>Handler</h1>
      <h2 style={{textAlign: 'center'}}>{msg}</h2>

      <Container maxWidth="md">
        <SearchBar />
      </Container>
    </div>
    
  );
}

export default HomePage;