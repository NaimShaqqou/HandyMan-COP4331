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
import { Paper } from '@mui/material';
import { Divider } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

var bp = require("../components/Path.js");

export default function ServicePage() {
    const { state } = useLocation();
    const [value, setValue] = useState(null);
    const [msg, setMsg] = useState('');
    let user = useSelector((state) => state.user);
    let service = state.service;

    console.log(value);
    if (value)
      console.log(format(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
    async function doBook(event) {
      event.preventDefault();
      alert("Booked an appointment!");
      // console.log()
  
      let obj = {
        requesterId: user.userId,
        serviceId: service._id,
        price: service.Price,
        date: format(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        description: msg,
        jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YzRkMzlhMDUwYTM2NTU1YTY5NDIiLCJmaXJzdE5hbWUiOiJFc3RlYmFuIiwibGFzdE5hbWUiOiJCcnVnYWwiLCJpYXQiOjE2NDc4MDk1NTB9.dxsK_ZU4KdvHjLzcZACYXwL1NjTZXIgoHK2SG5e1UkI"
      };
      let js = JSON.stringify(obj);
  
      try {
        const response = await fetch(bp.buildPath("api/request-service"), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        var res = JSON.parse(await response.text());

        console.log(res);
  
        // if (res.error == "") {
          
        // } else {
          
        // }
      } catch (e) {
        console.log(e.toString());
        return; 
      }
    }

    // const [date, setDate] = useState([
    //     {
    //       startDate: new Date(),
    //       endDate: null,
    //       key: 'selection'
    //     }
    //   ]);
      
    // function disableDates(activeStartDate,date,view)
    // {
    //     console.log(date.getDay());
    // }
    
    console.log(service);
    
    return (
        <div>
            <ResponsiveAppBar />
            <Container>
                <Box sx={{pt:5}}></Box>
                <Typography variant='h2'>
                  {service.Title}
                </Typography>
                <Grid container direction="row" spacing={5}>
                    <Grid item xs={7.5}>
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
                          {/* <Typography  variant='h3'>
                              {service.Description}
                          </Typography> */}
                      </Stack>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                            p: 3,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#F2F1F0', alignItems:"center"
                          }}
                        >
                        {/* <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            disableDates={d}
                        /> */}
                        <TextField
                            value={msg}
                            onChange={(event) => { setMsg(event.target.value); }}
                            placeholder="Message to Handler"
                            multiline
                            maxRows={4}
                          />

                        <Box m={3} />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            label="Schedule Appointment"
                            value={value}
                            onChange={(newValue) => { setValue(newValue);}}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>     
                        <Box textAlign='center' sx={{pt:3}}>
                            <Button align="center"color="primary" size="large" type="submit" variant="contained" onClick={doBook}>Book!</Button>
                        </Box>
                        </Paper>
                    </Grid>   
                </Grid>  

        </Container>
        </div>
    )
    

   
}