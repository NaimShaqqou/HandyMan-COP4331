import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteServiceDialog from './DeleteServiceDialog'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from 'axios';


export default function ServiceCard(props) {
    const [openDialog, setOpenDialog] = useState(false)
    const service = props.service;
    const navigate = useNavigate()
    let user = useSelector((state) => state.user);
    let bp = require("./Path.js");
    const dispatch = useDispatch();
    const { deleteService, updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

    const styles = {
        media: {
            width: "80%",
            justifyContent: "start",
            display: "inline-block",
            maxWidth:230,
            maxHeight:95,
            width: "auto",
            height: "auto",
            marginRight: 10,
        }
    }

    function openService() {
        navigate('../service', {state: service})
    }

    async function destroyService() {
        await axios.post(bp.buildPath("api/delete-service"), {
          serviceId: service._id,
          jwtToken: user.jwtToken
      }).then((response) => {
          let refreshedToken = response.data.refreshedToken
          updateCurrentUser({...user, jwtToken: refreshedToken})
          if (response.data.error === "") {
              deleteService(service)
          } else {
              console.log(response.data.error)
          }
      }).catch((error) => {
          console.log(error.message)
      })
    }
    
  return (
    <Container>
      <Card sx={{ width: '60%' }}>
      <CardActionArea onClick={() => openService()}>
        <CardMedia
          component="img"
          image={service.Images[0]}
          alt="photo for service"
          style={styles.media}
        />
        <Box sx={{ float: "none", overflow: "hidden", display: "inline-block", }}> 
            <CardHeader
                title={service.Title}
                sx={{ display: "inline-block" }}
            />
        </Box>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${service.Price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {service.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton onClick={() => navigate('../edit-service', {state: service})}>
              <EditIcon />
      </IconButton>
      <IconButton onClick={() => setOpenDialog(true)}>
              <DeleteIcon/>
      </IconButton>
    </Card>
    <DeleteServiceDialog open={openDialog} setOpen={setOpenDialog} service={service} onConfirm={destroyService}/>
    </Container>
    
  );
}