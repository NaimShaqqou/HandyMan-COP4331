import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from '@mui/icons-material/MyLocation';
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
  Box,
  InputAdornment,
  Tooltip
} from "@mui/material";
import axios from "axios";

// TODO: location dropdown is different from the other two dropdowns
// TODO: when searching from homepage, contents of search bar should carry on to search page.

const emptySearch = {
  keyword: '',
  location: '',
  distance: '',
  category: '',
};

function SearchBar(props) {
  const [predictions, setPredictions] = useState(new Array());
  const [search, setSearch] = useState(emptySearch);
  const [userLocation, setUserLocation] = useState(null);

  // Get user location on first time render
  useEffect(() => {
    updateCurLocation();

    // Clearing the state fixes error.
    return () => {
      setPredictions(new Array());
      setSearch(emptySearch)
    }
  }, []);

  useEffect(async () => {
    let res = await marginSearchAPI({
      marginBounds: props.mapMargin,
      search: search.keyword,
      category: search.category
    });

    if (window.location.pathname == '/search') {
      props.updateRes({
        res: res, 
        fitBoundsTrigger: props.fitBoundsTrigger
      });
    } else {
      navigate("/search", { state: { res: res} });
    }
  }, [props.searchTrigger]);

  let navigate = useNavigate();

  let bp = require("./Path");
  const maxDistance = ["1 mile", "5 miles", "10 miles", "15 miles"];
  const categories = ["Baking", "Teaching", "Fixing"];

  const reverseGeocode = async (latt, lngg) => {
    var obj = { lat: latt, lng: lngg };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(bp.buildPath("api/reverse-geocode"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      // console.log(res.location);
      // setSearch({ ...search, location: res.location });
      return res.location;
    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  const updateCurLocation = () => {
    if (!navigator.geolocation) {
      // setStatus('Geolocation is not supported by your browser');
    } else {
      // setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        // setStatus(null);
        // setLat(position.coords.latitude);
        // setLng(position.coords.longitude);
        reverseGeocode(position.coords.latitude, position.coords.longitude)
        .then( result => setUserLocation(result));
      }, () => {
        // setStatus('Unable to retrieve your location');
      });
    }
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

  const locationButtonPress = () => {
    updateCurLocation();
    setSearch({...search, location: userLocation});
  }

  const marginSearchAPI = async (body) => {
    let res = null;
    let js = JSON.stringify(body);
    // console.log('sending:');
    // console.log(obj);

    try {
      const response = await fetch(bp.buildPath("api/search-on-map-change"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      res = JSON.parse(await response.text());
    } catch (e) {
      console.log(e.toString());
    }
    return res;
  }

  const regularSearchAPI = async (body) => {
    let res = null;
    let js = JSON.stringify(body);
    // console.log('sending:');
    // console.log(obj);

    try {
      const response = await fetch(bp.buildPath("api/search-services"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      res = JSON.parse(await response.text());
    } catch (e) {
      console.log(e.toString());
    }
    return res;
  }

  const doSearch = async (e) => {
    e.preventDefault();

    // Convert "15 miles" to 15
    let maxDist = parseInt(search.distance.split(' ')[0]);

    let body = {
      search: search.keyword,
      category: search.category,
      location: search.location,
      maxDist: maxDist,
    };

    if (isNaN(body.maxDist))
      body.maxDist = 15;

    let res = null;

    // Initialize to current fitBoundsTrigger.
    // Changing to a different value will trigger fitBounds.
    let fitBoundsTrigger = props.fitBoundsTrigger;

    if (window.location.pathname == '/search' && body.location == '') {
      res = await marginSearchAPI({
        marginBounds: props.mapMargin,
        search: search.keyword,
        category: search.category
      });
    } else {
      if (body.location == '')
        body.location = userLocation ? userLocation : 'Orlando, FL';

      fitBoundsTrigger = Math.random();
      res = await regularSearchAPI(body);
    }

    if (window.location.pathname == '/search') {
      props.updateRes({res: res, fitBoundsTrigger: fitBoundsTrigger});
    } else {
      navigate("/search", { state: { res: res} });
    }
  };

  const handleChange = (prop) => async (event) => {
    setSearch({ ...search, [prop]: event.target.value });
  };

  const handleChangeLocationDropdown = async (event, value) => {
    if (value == null)
      value = '';
    setSearch({ ...search, location: value });
    await findPredictions();
  };

  const handleChangeLocationText = async (event) => {
    console.log(event.target.value);
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
        pointerEvents: 'auto',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack
          direction="row"
          divider={(<Divider orientation="vertical" flexItem />)}
          spacing={1}
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
              placeholder='Bakery'
            />
          </form>

          {<Stack direction="row" spacing={1} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box mt={1.5}>
              <Tooltip  title="Use my location">
                <IconButton onClick={locationButtonPress}>
                  <MyLocationIcon
                    // sx={{ width: 17}}
                    fontSize='small'
                  />
                </IconButton>

              </Tooltip>
            </Box>

            <Autocomplete
              options={predictions.map((prediction) => prediction)}
              value={search.location}
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
                    placeholder="Orlando, FL"
                    // InputProps={{
                    //   endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    // }}
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
          </Stack>}

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

        <Tooltip  title="Search">
          <IconButton
            onClick={(event) => {
              doSearch(event);
            }}
            color='primary'
            style={{color: 'white', backgroundColor: '#003c80'}}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}

export default SearchBar;
