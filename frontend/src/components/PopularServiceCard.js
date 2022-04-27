import React, { useState, useEffect } from 'react'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

export default function PopularServiceCard({service}) {
  return (
    <Box>
      <Typography>
        {service.Title}
      </Typography>
      
    </Box>
  )
}
