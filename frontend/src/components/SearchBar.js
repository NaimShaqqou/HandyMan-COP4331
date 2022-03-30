import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";

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
  const [searchInput, setSearchInput] = useState("");
  const [distance, setDistance] = useState("");
  const [category, setCategory] = useState("");
  const bp = require("./Path");
  const maxDistance = ["1 mile", "5 miles", "10 miles", "15 miles"]
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
      .post(bp.buildPath("api/autocomplete-place"), { input: searchInput })
      .then((response) => {
        setPredictions(response.data.predictions);
      })
      .catch((error) => console.log(error));
  }


  return (
    <Paper elevation={3} style={{padding: 10, backgroundColor: "white", width: "100%", textAlign: "center"}}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <TextField label="Service" variant="standard"></TextField>
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
                  type: "search"
                }}
                onChange={async (e) => {
                  setSearchInput(e.target.value);
                  await findPredictions();
                }}
                placeholder="Search Services"
              />
            )}
          />
          <TextField
          id="distance"
          select
          label="Select"
          variant="standard"
          value={distance}
          style={{width: 150}}
          onChange={(e) => setDistance(e.target.value)}
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
          label="Select"
          variant="standard"
          style={{width: 150}}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
