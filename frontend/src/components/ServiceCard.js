import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteServiceDialog from './DeleteServiceDialog'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { 
  Paper, 
  Collapse,
  Grid
} from '@mui/material';

export default function ServiceCard(props) {
  const [openDialog, setOpenDialog] = useState(false)
  const service = props.service;
  const navigate = useNavigate()
  let user = useSelector((state) => state.user);
  let bp = require("./Path.js");
  const dispatch = useDispatch();
  const { deleteService, updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(actionCreators, dispatch);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  async function destroyService() {
    await axios.post(bp.buildPath("api/delete-service"), {
      serviceId: service._id,
      jwtToken: user.jwtToken
    }).then((response) => {
      if (response.data.jwtToken === "") {
        logoutUser()
        logoutServices()
        navigate("../login")
      } else {
        let refreshedToken = response.data.refreshedToken
        updateCurrentUser({ ...user, jwtToken: refreshedToken })
        if (response.data.error === "") {
          deleteService(service)
        } else {
          console.log(response.data.error)
        }
      }

    }).catch((error) => {
      console.log(error.message)
    })
  }

  console.log(service)

  return (
    <Container sx={{ mb: 5 }}>
      <Paper
        elevation={5}
        sx={{
          margin: 'auto',
          maxWidth: 800,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : 'white',
        }}
      >
        <Grid container spacing={2} sx={{minHeight: 250}}>
          <Grid item xs={4} sx={{ display:"flex", justifyContent: "center", p: 2, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#2074d4' }}>
            <Img
              sx={{
                width: '256px',
                height: "256px",
                objectFit: 'cover',
                // marginBottom: 15
              }}
              alt="complex"
              src={service.Images && service.Images != null && service.Images.length > 0 ? service.Images[0] : ''}
            />
          </Grid>
          <Grid item xs={8} sx={{ p: 2 }}>
            <Stack direction="column" sx={{ width: '100%', height: '100%' }}>

              <Box sx={{ pr: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }} component="div">
                      {service.Title}
                    </Typography>
                <Typography variant="h6" component="div">
                  ${service.Price}
                </Typography>
              </Box>

              <Box>
                {/* <Collapse in={props.focus != null && props.focus._id === service._id} collapsedSize='150px'> */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ minHeight: 150, wordWrap: "break-word"}} 
                    component="div"
                    onClick={() => props.updateFocus(service)}
                  >
                    {service.Description} 
                  </Typography>
                {/* </Collapse> */}
              </Box>

              <Box sx={{ height: '100%', display: 'flex', flexDirection:'column-reverse' }}>
                <Box>
                  <IconButton onClick={() => navigate('../edit-service', {state: service})}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setOpenDialog(true)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => navigate('../requested-services', {state: service})}>
                    <WorkHistoryIcon />
                  </IconButton>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <DeleteServiceDialog open={openDialog} setOpen={setOpenDialog} service={service} onConfirm={destroyService} />
    </Container>

  );
}