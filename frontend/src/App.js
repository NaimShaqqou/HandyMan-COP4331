import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import {
  Box,
  Container,
  createTheme,
  ThemeProvider
} from '@mui/material';

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

function App() {
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
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/image" element={<TestImagePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/add-service" element={<AddServicesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/edit-service" element={<EditServicePage />} />
          <Route path="/user-requested-services" element={<UserRequestedServicesPage />} />
          <Route path="/requested-services" element={<RequestedServicesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
