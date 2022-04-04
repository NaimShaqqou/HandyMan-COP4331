import React, { useState } from "react";

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

function SearchBar(props) {
  const [predictions, setPredictions] = useState(new Array());
  // const [searchInput, setSearchInput] = useState("");
  // const [distance, setDistance] = useState("");
  // const [category, setCategory] = useState("");
  const [search, setSearch] = useState({
    keyword: '',
    location: '',
    distance: '',
    category: '',
  });
  let location = useLocation();
  let navigate = useNavigate();

  let bp = require("./Path");
  const maxDistance = ["1 mile", "5 miles", "10 miles", "15 miles"];
  const categories = ["Baking", "Teaching", "Fixing"];

  // const Oval = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "white",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   width: "100%",
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

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

    // Navigate to search page when searching on homepage
    // if (location.pathname !== '/search')
    //   navigate("../search", { replace: true });

    // Convert "15 miles" to 15
    let maxDist = parseInt(search.distance.split(' ')[0]);

    var obj = {
      search: search.keyword,
      location: search.location,
      maxDist: maxDist,
      jwtToken: user.jwtToken,
    };

    let js = JSON.stringify(obj);
    console.log('search input:');
    console.log(obj);
  
    if (obj.location == '')
      obj.location = 'Orlando, FL';

    if (isNaN(obj.maxDist))
      obj['maxDist'] = 15;

    if (obj.jwtToken == '')
      obj['jwtToken'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YzRkMzlhMDUwYTM2NTU1YTY5NDIiLCJmaXJzdE5hbWUiOiJFc3RlYmFuIiwibGFzdE5hbWUiOiJCcnVnYWwiLCJpYXQiOjE2NDc4MDk1NTB9.dxsK_ZU4KdvHjLzcZACYXwL1NjTZXIgoHK2SG5e1UkI';

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

      console.log(jwt_decode(obj.jwtToken));

      
      props.sendToParent(res);

      if (res.error === "") {
        console.log(res.results);
        // setMessage("Account Created Successfully! Please check your email to verify.");
      } else {
        console.log(res.error);
        // setMessage(res.error);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const handleChange = (prop) => async (event) => {
    setSearch({ ...search, [prop]: event.target.value });
  };
  
  const handleChangeLocationDropdown = async (event) => {
    // console.log(typeof(event.target.innerHTML));
    // console.log(event.target.innerHTML);
    setSearch({ ...search, location: event.target.innerHTML });
    await findPredictions();
  };

  const handleChangeLocationText = async (event) => {
    setSearch({ ...search, location: event.target.value });
    await findPredictions();
  };

  // TODO: enter to select a dropdown option
  // TODO: the location dropdown is different from the other two dropdowns

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
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <form onSubmit={(event) => doSearch(event)}>
            <TextField label="Service" variant="standard" value={search.keyword} onChange={handleChange('keyword')}></TextField>
          </form>
          <Stack direction="row" spacing={2}>
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
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <IconButton onClick={(event) => doSearch(event)}>
          <SearchIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default SearchBar;
