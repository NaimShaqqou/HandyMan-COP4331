import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

var bp = require("../components/Path.js");

export default function BookService({service}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    severity: 'success',
    msg: '',
  });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(actionCreators, dispatch);

  async function doBook(event) {
    event.preventDefault();

    if (user.userId === service.UserId) {
      setAlert({
        show: true,
        severity: 'error',
        msg: 'This is your own service, fam. 🤔',
      })
      return;
    }

    if (user.jwtToken === '') {
      setAlert({
        show: true,
        severity: 'error',
        msg: 'Please log in first.',
      })
      return;
    }
    
    if (msg === '') {
      setAlert({
        show: true,
        severity: 'error',
        msg: 'Please provide a description.',
      })
      return;
    }

    if (startDate === null || endDate === null) {
      setAlert({
        show: true,
        severity: 'error',
        msg: 'Please select a start/end date.',
      })
      return;
    }

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
      if (res.jwtToken === "") {
        logoutUser()
        logoutServices()
        navigate("../login")
      } else {
        let refreshedToken = res.refreshedToken
        updateCurrentUser({ ...user, jwtToken: refreshedToken })
        console.log(res);

        if (res.error == "") {
          setAlert({
            show: true,
            severity: 'success',
            msg: 'Appointment successfully booked!',
          });
        } else {
          console.log(res.error);
          setAlert({
            show: true,
            severity: 'error',
            msg: res.error,
          });
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
    
    // Fixes bug when endDate is set to startDate on error
    if (Difference_In_Days % 1 === 0) {
      Difference_In_Days = Difference_In_Days + 0.001
    }

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
    return price
  }

  return (
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
              minDate={new Date()}
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
              onError={(error) => setEndDate(startDate)}
              onChange={(newValue) => { 
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

        </Grid>

        <Grid item>
          <Typography>Estimated Price: ${startDate !== null && endDate !== null && endDate >= startDate ? calculatePrice() : 0}</Typography>
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
              Book
            </Button>
          </Box>

        </Grid>

      </Grid>


      <Box m={3} />

      <Box sx={{ width: '100%' }}>
        <Collapse in={alert.show}>
          <Alert
            severity={alert.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(prev => ({ ...prev, show: false}));
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert.msg}
          </Alert>
        </Collapse>
      </Box>

    </Paper>
  )
}
