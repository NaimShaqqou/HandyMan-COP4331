import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard'
import { Container } from "@mui/material";
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from "../components/NavBar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles.css';


export default function ServicePage() {
    const { state } = useLocation();
    function booked() {
        alert("Booked an appointment!");
    }
    return (
        <div>
            <ResponsiveAppBar />
            <Container>
            
            
                

                
                <Box textAlign='center'>
                    <Button align="center"color="primary" size="large" type="submit" variant="contained" onClick={booked}>Book an appointment!</Button>
                </Box>
        </Container>
        </div>
    )
    

   
}