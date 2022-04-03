import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  Menu,
  Container,
  Autocomplete,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
  Paper,
  styled,
} from "@mui/material";
import axios from "axios";

function SearchBar() {
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
        // setSearch({ ...search, location: response.data.predictions });
        setPredictions(response.data.predictions);
      })
      .catch((error) => console.log(error));
  }

  const user = useSelector((state) => state.user);

  const doSearch = async (e) => {
    e.preventDefault();
    console.log(search);
    console.log(jwt_decode(user.jwtToken));
    

    var obj = {
      search: search.keyword,
      location: search.location,
      maxDist: search.distance,
      jwtToken: user.jwtToken,
    };

    var js = JSON.stringify(obj);

    // // alert('click');

    try {
      const response = await fetch(bp.buildPath("api/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
  
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

  return (
    <Paper
      elevation={3}
      style={{
        padding: 5,
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  variant="standard"
                  style={{ width: 200 }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={async (e) => {
                    // handleChange('location');
                    setSearch({ ...search, location: e.target.value });
                    await findPredictions();
                  }}
                  placeholder="Search Services"
                />
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
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default SearchBar;
