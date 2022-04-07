import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import {
  IconButton,
  TextField,
  Autocomplete,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";

// TODO: enter to select a dropdown option
// TODO: location dropdown is different from the other two dropdowns
// TODO: when searching from homepage, contents of search bar should carry on to search page.

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function SearchBar(props) {
  console.log('Rendering SearchBar.js');
  const [predictions, setPredictions] = useState(new Array());
  const [search, setSearch] = useState({
    keyword: '',
    location: '',
    distance: '',
    category: '',
  });
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  let location = useLocation();
  let navigate = useNavigate();

  let bp = require("./Path");
  const maxDistance = ["1 mile", "5 miles", "10 miles", "15 miles"];
  const categories = ["Baking", "Teaching", "Fixing"];
  const window = useWindowSize();

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

      if (res.error == '')
        return res.location;
      else
        return 'Orlando, FL';
    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  const getLocation = () => {
    let loc = null;
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        console.log(loc);
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
    console.log(loc);
    return loc;
  }

  async function findPredictions() {
    await axios
      .post(bp.buildPath("api/autocomplete-place"), { input: search.location })
      .then((response) => {
        setPredictions(response.data.predictions);
      })
      .catch((error) => console.log(error));
  }


  const user = useSelector((state) => state.user);

  const doSearch = async (e) => {
    e.preventDefault();

    // Convert "15 miles" to 15
    let maxDist = parseInt(search.distance.split(' ')[0]);

    var obj = {
      search: search.keyword,
      category: search.category,
      location: search.location,
      maxDist: maxDist,
      jwtToken: user.jwtToken,
    };

    let js = JSON.stringify(obj);
    console.log('search input:');
    console.log(obj);
  
    if (obj.location == '') {
      obj.location = 'Orlando, FL';
      let loc = getLocation();

      console.log(loc);
      
      if (loc) {
        console.log(loc);

        // obj.location = reverseGeocode();
      }
    }

    if (isNaN(obj.maxDist))
      obj.maxDist = 15;

    if (obj.jwtToken == '')
      obj.jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YzRkMzlhMDUwYTM2NTU1YTY5NDIiLCJmaXJzdE5hbWUiOiJFc3RlYmFuIiwibGFzdE5hbWUiOiJCcnVnYWwiLCJpYXQiOjE2NDc4MDk1NTB9.dxsK_ZU4KdvHjLzcZACYXwL1NjTZXIgoHK2SG5e1UkI';

    js = JSON.stringify(obj);
    // console.log('sending:');
    // console.log(obj);

    try {
      const response = await fetch(bp.buildPath("api/search-services"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      navigate("/search", { replace: true, state: { obj: search, res: res} });

    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const handleChange = (prop) => async (event) => {
    setSearch({ ...search, [prop]: event.target.value });
  };
  
  const handleChangeLocationDropdown = async (event) => {
    // console.log(event);
    setSearch({ ...search, location: (('innerHTML' in event.target && event.target.innerHTML.charAt(0) != '<') ? event.target.innerHTML : '') });
    await findPredictions();
  };

  const handleChangeLocationText = async (event) => {
    setSearch({ ...search, location: event.target.value });
    await findPredictions();
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: 5,
        paddingLeft: 20,
        backgroundColor: "white",
        width: "100%",
        textAlign: "center",
      }}
    >
    
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack
          direction="row"
          divider={window.width < 900 ? (<div></div>) : (<Divider orientation="vertical" flexItem />)}
          spacing={2}
        >
          <form onSubmit={(event) => doSearch(event)}>
            <TextField
              label="Service"
              variant="standard"
              // temporary solution, does not work well with navbar:
              // style={window.width < 900 ? ({ width: 350 }) : ({ width: 170 })}
              sx={{ width: { xs: '280px', sm: '360px', md: '170px'}}}
              value={search.keyword}
              onChange={handleChange('keyword')}
            />
          </form>
          <Stack direction="row" spacing={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Autocomplete
              options={predictions.map((prediction) => prediction)}
              onChange={handleChangeLocationDropdown}
              renderInput={(params) => (
                <form onSubmit={(event) => doSearch(event)}>
                  <TextField
                    {...params}
                    label="Location"
                    variant="standard"
                    style={{ width: 250 }}
                    value={search.location}
                    onChange={handleChangeLocationText}
                    placeholder="Search Services"
                  />
                </form>
              )}
            />
            <TextField
              id="distance"
              select
              label="Distance"
              variant="standard"
              value={search.distance}
              style={{ width: 150 }}
              onChange={handleChange('distance')}
            >
              {maxDistance.map((distance) => (
                <MenuItem key={distance} value={distance}>
                  {distance}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <TextField
            id="category"
            select
            label="Category"
            variant="standard"
            style={{ width: 150 }}
            value={search.category}
            onChange={handleChange('category')}
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <IconButton onClick={(event) => doSearch(event)} color='primary' style={{color: 'white', backgroundColor: '#2196f3'}}>
          <SearchIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default SearchBar;
