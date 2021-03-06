import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteServiceDialog from "./DeleteServiceDialog";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import AddReviewDialog from "./AddReviewDialog";

export default function UserRequestedService(props) {
  const [requestedService, setRequestedService] = useState(props.requestedService);
  let user = useSelector((state) => state.user);
  const [service, setService] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  let bp = require("./Path.js");
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log("IN USER REQUEST CARD USE EFFECT")
    let mounted = true;
    axios
      .post(bp.buildPath("api/get-service"), {
        serviceId: requestedService.ServiceId,
      })
      .then((response) => {
        if (mounted) {
          setService(response.data.service);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => mounted = false;
  }, [requestedService]);

  async function addReview() {
    let flag = false;
    if (review === "") {
      return;
    } else {
      await axios.post(bp.buildPath("api/add-review"), {
        serviceId: requestedService.ServiceId,
        userId: user.userId,
        reviewerProfilePic: user.profilePicture,
        reviewText: review,
        rating: rating,
        jwtToken: user.jwtToken
      }).then((response) => {
        if (response.data.jwtToken === "") {
          flag = true
          logoutUser()
          logoutServices()
          navigate("../login")
        } else {
          if (response.data.error === "") {
            console.log("Added review")
            // updateCurrentUser({...user, jwtToken: response.data.refreshedToken })
          } else {
            console.log(response.data.error)
          }
        }
      }).catch((error) => {
        console.log(error.message)
      })

      setOpenDialog(false)

      if (flag) {
        return;
      } else {
        await axios
          .post(bp.buildPath("api/reviewed-request"), {
            requestedServiceId: requestedService._id,
            jwtToken: user.jwtToken
          })
          .then((response) => {
            setRequestedService({ ...requestedService, Reviewed: true })
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    service &&
    <Container sx={{ mb: 5 }}>
      <Paper
        elevation={5}
        sx={{
          margin: "auto",
          maxWidth: 1000,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "white",
        }}
      >
        <Grid container spacing={2} >
          <Grid item xs={3.5} sx={{ p: 2, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#2074d4' }}>
            <Img sx={{ width: 256, height: "100%", objectFit: 'cover' }} alt="complex" src={service.Images === null ? '' : service.Images[0]} />
          </Grid>
          <Grid item xs={8.5} sx={{ p: 2 }}>
            <Stack direction="column" sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ pr: 3, display: 'flex', flexDirection: 'row-reverse' }}>
                <Box>
                  {requestedService.Accepted ? requestedService.Completion ? <Button variant="outlined" sx={{ pointerEvents: "none", cursor: "default" }} color="success">Complete</Button> : <Button variant="outlined" sx={{ pointerEvents: "none", cursor: "default" }}>In Progress</Button>
                    : <Button variant="outlined" sx={{ pointerEvents: "none", cursor: "default" }} color="error">Hasn't Been Accepted</Button>}
                </Box>
                {requestedService.Reviewed ?
                  <Box sx={{ pr: 2 }}>
                    <Button variant="contained" color="success" sx={{ pointerEvents: "none", cursor: "default" }} >Reviewed</Button>
                  </Box> : requestedService.Completion ? <Box sx={{ pr: 2 }}> <Button variant="outlined" color="success" onClick={() => setOpenDialog(true)}>Add Review</Button> </Box> : ""
                }
              </Box>

              <Box m={1} />

              <Box sx={{ display: 'flex', justifyContent: "center", width: "100%" }}>
                <Stack direction="column" sx={{ textAlign: 'center', width: "95%" }} spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
                  <Grid item xs sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold" }}
                      component="div"
                    >
                      {service.Title}
                    </Typography>
                  </Grid>

                  <Grid item xs >
                    <Typography variant="body1" sx={{ textAlign: "left", wordWrap: "break-word" }} component="div">
                      Service Description: {service.Description}
                    </Typography>
                  </Grid>
                  <Grid item container direction="row" xs>
                    <Grid item xs={4} sx={{ borderRight: "1px solid #e0e0e0", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                      <Typography
                        variant="h5"
                      >
                        {new Date(requestedService.Dates[0]).toLocaleDateString("en-US")} - {new Date(requestedService.Dates[1]).toLocaleDateString("en-US")}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ borderRight: "1px solid #e0e0e0", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                      <Typography variant="h5">
                        ${requestedService.Price}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                      <Typography variant="h5" >
                        {service.Address}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    Your request: {requestedService.DescriptionFromRequester}
                  </Grid>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <AddReviewDialog open={openDialog} setOpen={setOpenDialog} rating={rating} setRating={setRating} review={review} setReview={setReview} onConfirm={addReview} />
    </Container >
  );
}
