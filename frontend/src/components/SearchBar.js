import React, {useState} from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search"

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
  MenuItem
} from '@mui/material'
import axios from 'axios';


function SearchBar() {
    const [predictions, setPredictions] = useState(new Array())
    const [searchInput, setSearchInput] = useState("")
    const bp = require("./Path")

    async function findPredictions() {
        await axios.post(bp.buildPath("api/autocomplete-place"), {input: searchInput}).then((response) => {
          setPredictions(response.data.predictions)
        }).catch(error => console.log(error)) 
      }



    return (
        <Autocomplete
            options={predictions.map((prediction) => prediction)}
            renderInput={(params) => <TextField {...params} label="Location" 
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={async (e) => {
              setSearchInput(e.target.value)
              await findPredictions()
            }}
            placeholder="Search Services"
            variant="outlined"/>
            }
        />
    )
}

export default SearchBar;