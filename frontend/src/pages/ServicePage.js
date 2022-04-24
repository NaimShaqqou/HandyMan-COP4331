import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import '../styles.css';
import {
  Paper, Divider, Button, Stack, TextField, Typography,
  Container, Box, Grid, ImageList, ImageListItem,
  IconButton, Alert, Collapse
} from '@mui/material';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

var bp = require("../components/Path.js");

export default function ServicePage() {
    const { state } = useLocation();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [msg, setMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    const user = useSelector((state) => state.user);
    const service = state.service;

    const dispatch = useDispatch();

    const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

    if (!service) {
      return <></>
    }

    async function doBook(event) {
      event.preventDefault();
      if (startDate === null || endDate === null) return;
      calculatePrice();
      let obj = {
        requesterId: user.userId,
        serviceId: service._id,
        price: calculatePrice(),
        dates: [format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")],
        description: msg,
        jwtToken: user.jwtToken
      };
      let js = JSON.stringify(obj);
  
      try {
        const response = await fetch(bp.buildPath("api/request-service"), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        var res = JSON.parse(await response.text());
        let refreshedToken = res.refreshedToken
        updateCurrentUser({...user, jwtToken: refreshedToken})
        console.log(res);

  
        if (res.error == "") {
          setSuccessMsg(true);
        } else {
          
        }
      } catch (e) {
        console.log(e.toString());
        return; 
      }
    }

    function convertAvailableDaysToNumbers() {
      let days = service.DaysAvailable;
      let array = [0, 1, 2, 3, 4, 5, 6]

      days.forEach((date) => {
        let index;
        if (date === "Monday") {
          index = array.indexOf(1)
          if (index >= 0) array.splice(index, 1)

        } else if (date === "Tuesday") {
          index = array.indexOf(2)
          if (index >= 0) array.splice(index, 1)

        } else if (date === "Wednesday") {
          index = array.indexOf(3)
          if (index >= 0) array.splice(index, 1)
          
        } else if (date === "Thursday") {
          index = array.indexOf(4)
          if (index >= 0) array.splice(index, 1)
          
        } else if (date === "Friday") {
          index = array.indexOf(5)
          if (index >= 0) array.splice(index, 1)
          
        } else if (date === "Saturday") {
          index = array.indexOf(6)
          if (index >= 0) array.splice(index, 1)
          
        } else if (date === "Sunday") {
          index = array.indexOf(0)
          if (index >= 0) array.splice(index, 1)
        }

      })

      return array
    }

    function disableDates(date) {
      let disableDates = convertAvailableDaysToNumbers()

      return disableDates.includes(date.getDay()) 
    }

    function calculatePrice() {
      let Difference_In_Time = endDate.getTime() - startDate.getTime();
  
      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      let numberOfWorkingDays = 1
      let disabledDays = convertAvailableDaysToNumbers()
      let newDate = new Date(startDate)

      for (let i = 1; i < Difference_In_Days; i++) {
        newDate.setDate(newDate.getDate() + 1)

        if (!disabledDays.includes(newDate.getDay())) {
          numberOfWorkingDays++
        }
      }
      let price = parseInt(service.Price) * numberOfWorkingDays
      return price;
    }
    
    console.log(service);
    
    return (
        <div>
            {/* <ResponsiveAppBar /> */}
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
                          <Typography  variant='h5'>
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
                          <TextField
                            value={msg}
                            onChange={(event) => { setMsg(event.target.value); }}
                            placeholder="Message to Handler"
                            multiline
                            maxRows={4}
                            sx={{ width: '100%' }}
                          />

                          <Box m={3} />

                          <Grid container>
                            <Grid item xs={8}>
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                  label="Start Date"
                                  value={startDate}
                                  shouldDisableDate={disableDates}
                                  onChange={(newValue) => { setStartDate(newValue);}}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>     
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                  label="End Date"
                                  value={endDate}
                                  shouldDisableDate={disableDates}
                                  minDate={startDate}
                                  onChange={(newValue) => { setEndDate(newValue);}}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>   

                            </Grid>
                            
                            <Grid item xs={4} >
                              <Box textAlign='center' sx={{ height: '100%' }}>
                                  <Button
                                    align="center"
                                    color="primary"
                                    // size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={doBook}
                                    sx={{ height: '100%' }}
                                  >
                                    Book!
                                  </Button>
                              </Box>

                            </Grid>

                          </Grid>


                          <Box m={3} />

                          <Box sx={{ width: '100%' }}>
                            <Collapse in={successMsg}>
                              <Alert
                                action={
                                  <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      setSuccessMsg(false);
                                    }}
                                  >
                                    <CloseIcon fontSize="inherit" />
                                  </IconButton>
                                }
                                sx={{ mb: 2 }}
                              >
                                Appointment successfully booked!
                              </Alert>
                            </Collapse>
                          </Box>

                        </Paper>
                    </Grid>   
                </Grid>  

        </Container>
        </div>
    )
    

   
}