import React from 'react';
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

export default function ServiceCard(props) {
    const service = props.service;
    const navigate = useNavigate()

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
      <IconButton>
              <EditIcon onClick={() => navigate('../edit-service', {state: service})}/>
      </IconButton>
    </Card>
    </Container>
    
  );
}