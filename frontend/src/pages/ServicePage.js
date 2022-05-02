import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import '../styles.css';
import {
  Paper, Divider, Button, Stack, TextField, Typography,
  Container, Box, Grid, ImageList, ImageListItem,
  IconButton, Alert, Collapse, List, ListItem
} from '@mui/material';
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import Review from '../components/Review';
import BookService from '../components/BookService';
import axios from 'axios';
import NoReview from '../images/no_review.png'

var bp = require("../components/Path.js");

export default function ServicePage() {
  const { state } = useLocation();
  const [reviews, setReviews] = useState([]);
  const [fetchedData, setFetchedData] = useState(false)
  const service = state ? state.service : null;

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
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{ color: '#0041ab', display: 'inline' }} variant='h6'>
                  {service.Address}
                </Typography>
                <Typography sx={{ color: '#0041ab', display: 'inline' }} variant='h5'>
                  ${service.Price} per day
                </Typography>
              </Box>
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
                  <Typography sx={{ pb: 1 }} variant='h6'>
                    {service.Description}
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
            {service && <BookService service={service}/>}
          </Grid>
        </Grid>

      </Container>
    </Box>
  )
}