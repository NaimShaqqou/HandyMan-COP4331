import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import '../styles.css';
import {
  Paper, Divider, Button, Stack, TextField, Typography,
  Container, Box, Grid, ImageList, ImageListItem,
  IconButton, Alert, Collapse, List, ListItem
} from '@mui/material';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Review from '../components/Review';
import axios from 'axios';
import NoReview from '../images/no_review.png'

var bp = require("../components/Path.js");

export default function ServicePage() {
  const { state } = useLocation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [msg, setMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [failMsg, setFailMsg] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [fetchedData, setFetchedData] = useState(false)
  const user = useSelector((state) => state.user);
  const service = state ? state.service : null;
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log("IN SERVICE PAGE USE EFFECT")
    let mounted = true;
    axios
      .post(bp.buildPath("api/get-reviews"), {
        serviceId: service._id
      })
      .then((response) => {
        if (mounted) {
          setFetchedData(true)
          setReviews(response.data.reviews);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => mounted = false;
  }, []);

  if (!service) {
    return <></>
  }



  async function doBook(event) {
    event.preventDefault();
    if (user.jwtToken === "") {
      setFailMsg(true)
      return
    }
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
      if (res.refreshedToken === "") {
        logoutUser()
        logoutServices()
        navigate("../login")
      } else {
        let refreshedToken = res.refreshedToken
        updateCurrentUser({ ...user, jwtToken: refreshedToken })
        console.log(res);


        if (res.error == "") {
          setSuccessMsg(true);
        } else {

        }
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

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  let imageItems = service.Images.map(img => ({
    img: img,
    cols: 1,
    rows: 1,
  }));

  // Duplicate first image for testing
  // let imageItems = service.Images.length > 0 ? [
  //   {
  //     img: service.Images[0],
  //     cols: 2,
  //     rows: 2,
  //   }
  // ] : [];

  if (imageItems.length >= 1) {
    imageItems[0].rows = 2
    imageItems[0].cols = 2
  }

  return (
    <Box>
      <Container maxWidth="xl">
        <Box m={5}/>
        <Grid container direction="row" spacing={5}>
          <Grid item xs={8.5}>
            <Paper
              elevation={5}
              sx={{
                margin: "auto",
                p: 5,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "white",
              }}
            >
              <Typography variant='h2'>
                {service.Title}
              </Typography>
              <Stack
                direction="column"
                divider={window.width < 900 ? (<div></div>) : (<Divider orientation="horizontal" flexItem />)}
                spacing={2}
              >
                <ImageList
                  sx={{ 
                    width: '100%',
                    maxHeight: '360px',
                  }}
                  variant="quilted"
                  cols={4}
                  rowHeight={180}
                >
                  {imageItems.map((item, idx) => (
                    <ImageListItem key={idx} cols={item.cols || 1} rows={item.rows || 1}>
                      <img
                        {...srcset(item.img, 120, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <Box>
                  <Typography variant="h5" sx={{ pb: 2 }} fontWeight="bold">
                    Description:
                  </Typography>
                  <Typography sx={{ pb: 2 }} variant='h5'>
                    {service.Description}
                  </Typography>
                  <Typography sx={{ pb: 2 }} variant="h5" fontWeight="bold">
                    Price:
                  </Typography>
                  <Typography variant='h5'>
                    ${service.Price}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ pb: 2 }} variant="h5" fontWeight="bold">
                    Reviews:
                  </Typography>
                  <Box>
                    {reviews.length === 0 && fetchedData ?
                      <Box sx={{ height: "100%", pt: 3, display: "flex", justifyContent: "center" }} >
                        <img src={NoReview} style={{ width: "30%", height: "30%", aspectRatio: 802 / 537 }} alt="Review Section" />
                      </Box>
                      : <List sx={{ overflow: 'auto', maxHeight: 600 }}>
                        {reviews.map((review, index) =>
                          <ListItem key={index}>
                            <Review review={review} key={index} />
                          </ListItem>
                        )}
                      </List>
                    }
                  </Box>
                </Box>
              </Stack>
            </ Paper>
          </Grid>

            <Grid item xs={3.5}>
              <Paper
                elevation={5}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : 'white', alignItems: "center"
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

                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        shouldDisableDate={disableDates}
                        onChange={(newValue) => { setStartDate(newValue); }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>

                  </Grid>

                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        shouldDisableDate={disableDates}
                        minDate={startDate}
                        onChange={(newValue) => { setEndDate(newValue); }}
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

                <Box sx={{ width: '100%' }}>
                  <Collapse in={failMsg}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setFailMsg(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      Must be logged in to book!
                    </Alert>
                  </Collapse>
                </Box>

              </Paper>
            </Grid>
        </Grid>

      </Container>
    </Box>
  )
}