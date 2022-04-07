import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import Navbar from '../components/NavBar';
import SearchResults from "../components/SearchResults";
import Map from '../components/Map';
import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Grid
} from "@mui/material";

const SearchPage = () =>
{
  const { state } = useLocation();

  // console.log({
  //   lat: '28.602',
  //   lng: '-81.200'
  // });
  // console.log(state.res.results.searchLocationCoords);

  console.log(state);

  let center = state ? state.res.searchLocationCoords : {
    lat: 28.602,
    lng: -81.200,
  };

  // const [center, setCenter] = useState(stateCoords);
  // let [center, setCenter] = useState({
  //     lat: '28.602',
  //     lng: '-81.200'
  //   });
    
    
  console.log('in search page');
  console.log(center);

  let items = [];

  // add dummy services
  for (let i = 0; i < 20; i++) {
    items.push({
      _id: i.toString(),
      UserId: "6234c4d39a050a36555a6942",
      Title: "Bakery" + i,
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
    })
  }

  let [results, setResults] = useState(items);

  const sendToParent = (state) => {
    if (state.error === '') {
      setResults(state.results.filteredServices);
    }
  };

  // const centerChange = (prop) => (event) => {
  //   setCenter({ ...center, [prop]: event.target.value });
  // };
  

  let res = (state ? state.res : null);
  let srch = (state ? state.obj : null);


  return(
    <div>
      <Navbar search={srch} sendToParent={sendToParent}/>
      <br />

      <Grid container>
        <Grid item xs={3}>
          <SearchResults results={(res && res.error == '') ? res.results : results}></SearchResults>
        </Grid>
        <Grid item xs={9}>
          <Map results={(res && res.error == '') ? res.results : results} center={center}/>
        </Grid>
      </Grid>

      {/* <span>change lat-lng and to re-center map.</span>
      <input id="tempInput1" type="text" placeholder='lat' value={center.lat} onChange={centerChange('lat')}/>
      <input id="tempInput2" type="text" placeholder='lng' value={center.lng} onChange={centerChange('lng')}/> */}
    </div>
  );
}

export default SearchPage;