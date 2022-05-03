import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Paper, Typography, Box
} from '@mui/material'

import BannerButton from './BannerButton'

export default function ListServiceBanner() {
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);

  return (
    <Paper
      sx={{
        height: '400px',
        width: '500px',
        display: 'inline-block',
        p: 3,
      }}
    >
      <Box sx={{ height: '100%', width: '100%', position: 'relative'}}>
        <Typography variant='h4' sx={{
          textAlign: 'left',
        }}>
          List Services
        </Typography>

        <Typography
          variant='subtitle1' 
          sx={{
            textAlign: 'left',
          }}
        >
          Think you could be of service to the world?
          Add your services now!
        </Typography>

        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            right: 0 
          }}
        >
          <BannerButton 
            text="List Service" 
            onClick={() => {
              // if (user.jwtToken === '')
              //   navigate('/login');
              // else
                navigate("/services");
            }}
          />
        </Box>

      </Box>

    </Paper>
  )
}
