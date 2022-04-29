import React from 'react'

import { motion } from 'framer-motion';

import { Box } from '@mui/material'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function BannerButton({onClick, text}) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        height: '50px',
        width: '200px',
        backgroundColor: '#003c80',
        color: '#fff',
        borderRadius: 3,
        cursor: 'pointer',
        border: 'none',
        fontSize: '20px',
        textAlign: 'center',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // initial={{ opacity: 0, scale: 0.5, y: 300, }}
      // whileInView={{ opacity: 1, scale: 1, y: 0, }}
      // viewport={{  }}
    >
      <Box
        sx={{
          display: 'inline',
          justifyContent: 'center',
          alignContent: 'center',
          // flexDirection: 'column',
        }}
      >
        {text}
      </Box>
        {/* <ArrowForwardIosIcon/> */}
    </motion.button>
  )
}
