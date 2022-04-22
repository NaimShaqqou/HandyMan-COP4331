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

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

var bp = require("../components/Path.js");

export default function ServicePage() {
    const { state } = useLocation();
    const [value, setValue] = useState(null);
    const [msg, setMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    const user = useSelector((state) => state.user);
    const service = state.service;

    if (!service) {
      return <></>
    }

    async function doBook(event) {
      event.preventDefault();
  
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
  
        if (res.error == "") {
          setSuccessMsg(true);
        } else {
          
        }
      } catch (e) {
        console.log(e.toString());
        return; 
      }
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
                                <DateTimePicker
                                  label="Schedule Appointment"
                                  value={value}
                                  onChange={(newValue) => { setValue(newValue);}}
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