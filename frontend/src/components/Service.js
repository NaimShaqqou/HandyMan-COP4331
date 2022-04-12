import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Box } from '@mui/material';


export default function Service(props) {
    const service = props.service;

    return (
      <div>
        <h1>Service Page</h1> 
        <h2>Service: {service.Title}</h2>
      </div>
    );
}