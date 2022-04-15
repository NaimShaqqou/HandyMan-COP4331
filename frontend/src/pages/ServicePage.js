import { Grid, ImageList, ImageListItem } from '@mui/material';
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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Paper } from '@mui/material';
import { Divider } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

export default function ServicePage() {
    const { state } = useLocation();
    const [value, onChange] = useState(new Date());
    function booked() {
        alert("Booked an appointment!");
    }
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
      
    function disableDates(activeStartDate,date,view)
    {
        console.log(date.getDay());
    }
    
    let service = state.service;
    console.log(service);
    let d = new Array(new Date(2022,4,15));
    console.log(d);
    return (
        <div>
            <ResponsiveAppBar />
            <Container>
                <Box sx={{pt:5}}></Box>
                <Typography  variant='h2'>
                            {service.Title}
                </Typography>
                <Grid container direction="row" spacing={5}>
                    <Grid item xs="7.5">
                    <Stack
                        direction="column"
                        divider={window.width < 900 ? (<div></div>) : (<Divider orientation="horizontal" flexItem />)}
                        spacing={2}
                        >
                        <ImageList
                            sx={{ width: 500, height: 150 }}
                            variant="quilted"
                            cols={4}
                            rowHeight={121}
                            >
                            {service.Images.map((url) => (
                            <ImageListItem key={url}>
                                <img
                                    src={url}
                                    loading="lazy"
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                        <Typography  variant='h3'>
                            {service.Description}
                        </Typography>
                        <Typography  variant='h3'>
                            {service.Description}
                        </Typography>
                    </Stack>
                    </Grid>
                    <Grid item xs="4.5">
                        <Paper sx={{p:3,backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#F2F1F0', alignItems:"center"}}>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            disableDates={d}
                        />
                        <Box textAlign='center' sx={{pt:3}}>
                            <Button align="center"color="primary" size="large" type="submit" variant="contained" onClick={booked}>Book!</Button>
                        </Box>
                        </Paper>
                    </Grid>   
                </Grid>       
        </Container>
        </div>
    )
    

   
}