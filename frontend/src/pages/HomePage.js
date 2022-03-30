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
  var storage = require("../tokenStorage.js");

  let id = storage.retrieveToken();

  if (id == null) {
    id = 'null';
  } else {
    id = JSON.stringify(jwt_decode(id));
  }

  // const getCoordinates = async (event) => {
  //   event.preventDefault();

  //   let path = "http://api.positionstack.com/v1/forward?access_key=2bdf5eb2a856e6ff7e7eab5fd9ff57b8&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC";
    
  //   var obj = { login: values.username, password: values.password };
  //   var js = JSON.stringify(obj);

  //   // alert('click');

  //   try {
  //     const response = await fetch(bp.buildPath("api/login"), {
  //       method: "POST",
  //       body: js,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     var res = JSON.parse(await response.text());

  //     if (res.error == "") {
  //       setMessage("Logged in");
  //       var storage = require("../tokenStorage.js");
  //       storage.storeToken(res["jwtToken"]);
  //       updateCurrentUser({userId: res.userId, firstName: res.firstName, lastName: res.lastName, profileDescription: res.profileDescription, profilePicture: res.profilePicture, jwtToken: res.jwtToken})
  //       loginServices(res.services)
  //       navigate("../", { replace: true });
  //     } else {
  //       setMessage(res.error);
  //     }
  //   } catch (e) {
  //     console.log(e.toString());
  //     return; 
  //   }
  // };

  return(
    
    <div>
      <ResponsiveAppBar />
      <h1>Handler</h1>
      {/* <h2>Hello userId: {((storage.retrieveToken() == null) ? 'null' : JSON.stringify(jwt_decode(storage.retrieveToken())))}</h2> */}
      <h2>Hello userId: {id}</h2>
      {/* <h2>Hello userId: {jwt_decode(retrieveToken())}</h2> */}

      <Container maxWidth="sm">
          <SearchBar />
      </Container>

      <input id="tempInput" type="text" />
      <button id="tempButton">go</button>

      <br /><br />
      <div className='mapsize'>
      <MapComponent/>
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