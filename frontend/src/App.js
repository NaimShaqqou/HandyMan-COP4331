import React, { useState } from "react";

import {
  Route,
  Routes,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import "./App.css";

import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material';

import ResponsiveAppBar from './components/NavBar';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import TestImagePage from "./pages/TestImagePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ServicesPage from "./pages/ServicesPage";
import ServicePage from "./pages/ServicePage";
import AddServicesPage from "./pages/AddServicesPage";
import EditServicePage from "./pages/EditServicePage";
import UserRequestedServicesPage from "./pages/UserRequestedServicesPage";
import RequestedServicesPage from "./pages/RequestedServicesPage";

import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const location = useLocation();

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
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

  const animations = {
    initial: { opacity: 0,  y: -100},
    animate: { opacity: 1,  y: 0},
    exit: { opacity: 0, y: 100},
  }
  
  const AnimatedPage = ({children}) => {

    return (
      <motion.div 
        variants={animations} 
        initial='initial' 
        animate='animate' 
        exit='exit' 
        transition={{duration: 0.3}}
      >
        {children}
      </motion.div>
    )
  }

  const Potato = () => {
    return <h2>potato</h2>
  }

  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route 
            path="/" 
            element={
              <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 100,
                }}
              >

                <ResponsiveAppBar />
                <Outlet />
              </Box>
            }
          >
            {/* <Route path="potato" element={<Potato />} /> */}

            <Route path="" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
            <Route path="test" element={<AnimatedPage><TestPage /></AnimatedPage>} />
            <Route path="profile" element={ <AnimatedPage><ProfilePage /></AnimatedPage>} />
            <Route path="service" element={<AnimatedPage><ServicePage /></AnimatedPage>} />
            <Route path="services" element={<AnimatedPage><ServicesPage /></AnimatedPage>} />
            <Route path="add-service" element={<AnimatedPage><AddServicesPage /></AnimatedPage>} />
            <Route path="search" element={<AnimatedPage><SearchPage /></AnimatedPage>} />
            <Route path="edit-service" element={<AnimatedPage><EditServicePage /></AnimatedPage>} />
            <Route path="user-requested-services" element={<AnimatedPage><UserRequestedServicesPage /></AnimatedPage>} />
            <Route path="requested-services" element={<AnimatedPage><RequestedServicesPage /></AnimatedPage>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
