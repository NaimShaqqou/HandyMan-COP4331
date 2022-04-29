import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import {
  Paper, Typography, Box
} from '@mui/material'

import BannerButton from './BannerButton'

export default function RequestServiceBanner() {
  let navigate = useNavigate();

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
          Request Services
        </Typography>

        <Typography
          variant='subtitle1' 
          sx={{
            textAlign: 'left',
          }}
        >
          Countless professionals, enthusiasts, 
          hobbyists, and entrepreneurs are out there 
          waiting and willing to lend a hand to the 
          world. Handler can help you connect with them.
        </Typography>
          
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          right: 0
          }}
        >
          <BannerButton text="Find Services" onClick={() => navigate("/search")}/>
        </Box>

      </Box>


    </Paper>
  )
}
