import React from 'react'
import emptyBookings from "../images/empty.png"
import { Grid, Paper, Typography, Box } from "@mui/material";

export default function EmptyBoxArt() {
  return (
    <Paper
      elevation= {5}
      sx={{
        maxWidth: '1200px',
        height: '80vh',
        margin: "auto",
        p: 10,
        textAlign: 'center', 
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "white",
      }}
    >
      <Typography variant="h2" >
        You don't have any bookings
      </Typography>
      {/* <Box m={10} sx={{ bgcolor: 'green' }}/> */}
      <Box sx={{
          mt: 10,
          mb: 10,
          ml: 'auto',
          mr: 'auto',
          width: '80%',
          height: '80%',
          // bgcolor: 'green'
        }}
      >
        <img
          src={emptyBookings} 
          style={{
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
            // aspectRatio: 863/645
          }} 
          alt="People looking into empty box" 
        />
      </Box>
    </Paper>
  )
}
