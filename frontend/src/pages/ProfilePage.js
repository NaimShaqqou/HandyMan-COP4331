import React from 'react';
import { useState } from 'react';
import Profile from '../components/Profile';
import Container from "@mui/material/Container";
import ResponsiveAppBar from '../components/NavBar';
import Box from "@mui/material/Box";

const ProfilePage = () =>
{

    return(
        <div>
            <ResponsiveAppBar />
            <Box  sx={{ p: 5 }}> 
                <Profile />
            </Box>
        </div>
    );
};

export default ProfilePage;