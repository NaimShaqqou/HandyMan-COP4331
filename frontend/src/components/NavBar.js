import React, {useState} from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import SearchIcon from "@mui/icons-material/Search"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
  ThemeProvider
} from '@mui/material'
import axios from 'axios';

const pages = [];
const loggedInSettings = ['Home','Profile', 'Services', 'Bookings', 'Logout'];

const ResponsiveAppBar = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logoutUser } = bindActionCreators(actionCreators, dispatch);

  const pathname = window.location.pathname;
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.innerHTML === "Login") {
      navigate("../login", { replace: true });
    } else if (e.target.innerHTML === "Profile") {
      navigate("../profile", { replace: true });
    } else if (e.target.innerHTML === "Home") {
      navigate("../", { replace: true });
    } else if (e.target.innerHTML === "Services") {
      navigate("../services", { replace: true });
    } else if (e.target.innerHTML === "Logout") {
      // call the redux function
      logoutUser();
      navigate("../login", { replace: true });
    } else if (e.target.innerHTML === "Bookings") {
      navigate("../user-requested-services", { replace: true });
    } 
    setAnchorElUser(null);
  };

  // Set this to the user's full name
  // let avatarAlt = "User Name";
  let userObj = {
    fullName: "User Name",
    profilePicture: "/static/images/avatar/2.jpg",
  }

  if (user.userId != '') {
    userObj.fullName = user.firstName + " " + user.lastName;
    userObj.profilePicture = user.profilePicture;
  }

  const routeChange = () =>{ 
    navigate("../", { replace:true });
  };

  const titlestyle = {
    fontFamily: 'Philosopher',
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
        md: 1200,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <a onClick={(event) => routeChange(event)}>
              <img
                src={require('../logo2_500.png')}
                style={{
                  height: 30,
                  width: 30,
                  cursor:'pointer'
                }}
              />
            </a>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={routeChange}
              sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }}
            >
              <button style={titlestyle} onClick={(event) => routeChange(event)}>Handler</button>
            </Typography>

            {pathname !== "/" && 
            <Container sx={{ maxWidth: { xs: '380px', sm: '480px', lg: '910px'} }}>
              <SearchBar search={props.search}/>
            </Container>}

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={routeChange}
              sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
            >
              <button style={titlestyle} onClick={(event) => routeChange(event)}>Handler</button>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="View Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userObj.fullName} src={userObj.profilePicture} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
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
                onClose={handleCloseUserMenu}
              >
                {user.userId !== "" && loggedInSettings.map((setting) => (
                  <MenuItem key={setting} onClick={(event) => handleCloseUserMenu(event)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                {user.userId === "" && <MenuItem key="Login" onClick={(event) => handleCloseUserMenu(event)}>
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
