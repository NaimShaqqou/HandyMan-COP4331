import React, { useState } from 'react'

import { motion, useViewportScroll  } from 'framer-motion';
import { useSelector } from "react-redux";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

export default function WelcomeMsg() {
  const { scrollYProgress } = useViewportScroll();
  const [msgGap, setMsgGap] = useState(1.5);
  let user = useSelector((state) => state.user);

  let msg1 = 'Welcome,';
  let msg2 = 'Guest!';
  let msg3 = '';

  if (user.userId != '') {
    msg1 = 'Hello,';
    msg2 = user.firstName;
    msg3 = user.lastName;
  }

  const initialMsgStyle = {
    textAlign: 'center',
    color: '#003c80',
    fontSize: '75px',
    mt: 0,
    opacity: 1,
    textOverflow: 'clip',
  };

  const [msgStyle, setMsgStyle] = useState(initialMsgStyle);

  useScrollPosition(({ currPos }) => {
    const progress = -currPos.y / window.innerHeight

    const newFontSize = 75 + progress * 100;
    const newOpacity = 1 - progress * 6;

    const newMsgStyle = {
      ...initialMsgStyle,
      fontSize: `${newFontSize}px`,
      opacity: newOpacity,
    }

    if (JSON.stringify(newMsgStyle) !== JSON.stringify(msgStyle))
      setMsgStyle(newMsgStyle);

    setMsgGap(1.5 + progress * 50);
  }, [msgStyle])

  return (
    <motion.div 
      initial='hidden' 
      animate='visible' 
      variants={{
        hidden: {
          scale: .8,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: .4
          }
        }
      }}
    >
      <Typography
        component={'div'}
        sx={{
          ...msgStyle,
          marginLeft: 'auto'
        }}
        noWrap
      >
        <Box
          align = "center" justify = "center" alignItems = "center"
        >
          {msg1}
          <Box m={msgGap} sx={{ display: 'inline' }}/>
          {msg2}
          {msg3 != '' && <Box m={msgGap} sx={{ display: 'inline' }}/>}
          {msg3}
        </Box>
      </Typography>
    </motion.div>
  )
}
