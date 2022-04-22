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
const loggedInSettings = ['Home','Profile', 'Services', 'Bookings', 'Logout'];

const ResponsiveAppBar = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logoutUser } = bindActionCreators(actionCreators, dispatch);
  let location = useLocation()

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
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#003c80' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {
              location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/service" ? <BackButton/> : ""
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

            <AnimatePresence exitBeforeEnter>
              {pathname !== "/" && 
              <motion.div
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={{
                  hidden: {
                    y: -100,
                    opacity: 0
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                  },
                  exit: {
                    y: -100,
                    opacity: 0
                  }
                }}
                transition={{
                  duration: 0.5
                }}
              >
                <Container sx={{ display: { xs: 'none', sm: 'none', s900: 'flex' }, maxWidth: { xs: '380px', sm: '480px', lg: '910px'} }}>
                  <SearchBar/>
                </Container>
              </motion.div>}
            </AnimatePresence>

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

            <Box
              sx={{
                flexGrow: 0,
                width: (userObj.username && userObj.username.length > 6 ? (150 + (userObj.username.length - 6) * 20) : 150).toString() + 'px',
                height: '45px',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                // bgcolor: 'green',
                borderRadius: 5,
                // pt: 0.2
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center"
              }}
              direction="column"
            >
              <Grid container sx={{pt: 0.4}}>
                <Grid item xs={3} sx={{ pl: 0.7 }} >
                  <Tooltip  title="View Menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={userObj.fullName} src={userObj.profilePicture} />
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
                onClose={handleCloseUserMenu}
              >
                {user.userId !== "" && loggedInSettings.map((setting) => (
                  <MenuItem key={setting} onClick={(event) => handleCloseUserMenu(event)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                
                {user.userId === "" &&
                  <MenuItem key="Login" onClick={(event) => handleCloseUserMenu(event)}>
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
