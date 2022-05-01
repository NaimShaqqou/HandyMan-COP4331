import React, {useState, useEffect } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import SearchIcon from "@mui/icons-material/Search"
import SearchBar from "./SearchBar"
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "./BackButton"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import '../Title.css';
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
  createTheme,
  ThemeProvider,
  Grid
} from '@mui/material'

import { motion, AnimatePresence } from 'framer-motion';

const pages = [];
const loggedInSettings = ['Home', 'Search', 'Profile', 'Services', 'Bookings', 'Logout'];

const ResponsiveAppBar = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logoutUser, updateCurrentUser } = bindActionCreators(actionCreators, dispatch);
  let location = useLocation()
  const bp = require("./Path");

  const pathname = window.location.pathname;
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleSettingClick = (setting) => async (e) => {
    const mappings = {
      'Login': "../login",
      'Profile': "../profile",
      'Home': "../",
      'Search': "../search",
      'Services': "../services",
      'Logout': "../login",
      'Bookings': "../user-requested-services",
    }

    if (user.jwtToken === "" && (setting === "Search" || setting === "Home")) {
      navigate(mappings[setting]);
    } else if (setting === "Logout") {
      logoutUser();
      navigate(mappings[setting]);
    } else {
      axios.post(bp.buildPath("api/refresh-token"), { jwtToken: user.jwtToken }).then((response) => {
        if (response.data.refreshedToken === "") {
          logoutUser();
          navigate(mappings["Logout"]);
        } else {
          updateCurrentUser({ ...user, jwtToken: response.data.refreshedToken })
          navigate(mappings[setting]);
        }
      }).catch((error) => {
        console.log(error.message)
      })
    }
  };

  let userObj = {
    username: "guest",
    fullName: "Guest",
    profilePicture: "",
  }

  if (user.userId != '') {
    userObj.username = user.username;
    userObj.fullName = user.firstName + " " + user.lastName;
    userObj.profilePicture = user.profilePicture != "" ? user.profilePicture : "/static/images/avatar/2.jpg";
  }

  useEffect(() => {
    console.log('mounting NavBar.js');
  }, []);

  const titlestyle = {
    fontFamily: 'Comfortaa',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '48px',
    lineHeight: '54px',
    textDecoration:'none',
    color:'white',
    backgroundColor:'transparent',
    border:'none',
    fontSize:'30px',
    cursor:'pointer'
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        s900: 900,
        md: 1300,
        lg: 1300,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: [
        'Comfortaa',
        'Roboto',
        '"Helvetica"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: '#003c80', 
          height: '64px' 
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {
              location.pathname !== "/" && location.pathname !== "/login" ? <BackButton/> : ""
            } 
          
            <a href='/'>
              <img
                src={require('../logo2_500.png')}
                style={{
                  height: 40,
                  width: 40,
                  cursor:'pointer'
                }}
              />
            </a>

            <Box m={1}/>

            <Typography
              href='/'
              variant="h6"
              noWrap
              component="a"
              sx={{ ...titlestyle, display: { xs: 'none', sm: 'flex' } }}
            >
              handler
            </Typography>

            <Box m={1}/>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            </Box>

            <Typography
              href='/'
              variant="h6"
              noWrap
              component="a"
              sx={{ ...titlestyle, display: { xs: 'flex', sm: 'none' }, textDecoration: 'none', flexGrow: 1 }}
            >
              handler
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>

            <Box
              sx={{
                flexGrow: 0,
                width: (userObj.username && userObj.username.length > 6 ? (150 + (userObj.username.length - 6) * 20) : 150).toString() + 'px',
                height: '45px',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 5,
              }}
              direction="column"
            >
              <Grid container sx={{pt: 0.4}}>
                <Grid item xs={3} sx={{ pl: 0.7 }} >
                  <Tooltip  title="View Menu">
                    <IconButton 
                      onClick={(e) => setAnchorElUser(e.currentTarget)} 
                      sx={{ p: 0 }}
                    >
                      <Avatar 
                        alt={userObj.fullName} 
                        src={userObj.profilePicture}
                        sx={{ 
                          // border: '2px solid #fff' 
                          objectFit: 'cover',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>

                <Grid item xs={9} sx={{ textAlign: 'center', pt: 0.2, pl: 1 }}>
                  <Typography variant='h6' sx={{paddingRight: 2}}>
                    {userObj.username}
                  </Typography>
                </Grid>
              </Grid>

              <Menu
                sx={{ mt: '50px', ml: 11 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {user.userId !== "" && loggedInSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleSettingClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                
                {user.userId === "" &&
                  <MenuItem key="Home" onClick={handleSettingClick('Home')}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>}

                {user.userId === "" &&
                  <MenuItem key="Login" onClick={handleSettingClick('Login')}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>}
              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
