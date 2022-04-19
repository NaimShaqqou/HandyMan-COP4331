import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar.js"
import { useSelector } from "react-redux";

import {
  Box,
  Stack,
  Typography,
  Container
} from "@mui/material";

const HomePage = () =>
{
  let user = useSelector((state) => state.user);
  let msg = 'Welcome, Guest!';
  console.log('Rendering Homepage: ');

  if (user.userId != '') {
    msg = 'Hello, ' + user.firstName + " " + user.lastName;
  }

  return(
    <div>
      <ResponsiveAppBar />
      <Box sx={{ m: 15 }} />

      <Stack spacing={7}>
        <Typography
          variant='h2'
          sx={{
            textAlign: 'center',
            color: '#003c80',
            // fontFamily: 'Comfortaa',
          }}
        >
          {msg}
        </Typography>

        <div>
          <Container sx={{ maxWidth: { xs: '380px', sm: '480px', md: '910px'} }}>
            <SearchBar/>
          </Container>
        </div>
      </Stack>
    </div>

  );
}

export default HomePage;