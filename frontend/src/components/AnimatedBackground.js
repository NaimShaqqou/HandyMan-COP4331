import React, { useState } from 'react';

import { motion, useViewportScroll  } from 'framer-motion';

import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

export default function AnimatedBackground(props) {
  const originalHeight = 2560.0;
  const originalWidth = 1605.0;
  const ratio = originalHeight / originalWidth;

  const height = props.height;
  const width = height / ratio;

  return (
    <motion.div
      animate={{ 
        rotate: props.startAngle+props.angleDelta,
        x: props.startX == 'right' ? '-130vw' : '130vw',
        y: props.startY + props.yDelta,
      }}
      transition={{ repeat: Infinity, duration: props.duration, ease: 'linear' }}
      style={{
        rotate: props.startAngle,
        x: props.startX == 'right' ? '100vw' : -width,
        y: props.startY,
        display: 'inline-block',
      }}
    >
      <img
        src={require('../images/handler-logo-black.png')}
        // src={require('../images/handler-logo-2560x2560.png')}
        style={{
          width: width + 'px',
          height: height + 'px',
          opacity: 0.15,
          color: 'blue',
          filter: 'blur(0px) invert(17%) sepia(94%) saturate(1438%) hue-rotate(193deg) brightness(95%) contrast(107%)',
        }}
      />
    </motion.div>
  )
}
