import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Button,
  Fade,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  createTheme,
  ThemeProvider
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { motion, AnimatePresence, LayoutGroup, AnimateSharedLayout } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SearchResultCard({listitem: service, focus, updateFocus}) {
  let navigate = useNavigate();

  const clickOpen = (item) => async (event) => {
    navigate("/service", { state: { service: item } });
  };

  const clickItem = (item) => async (event) => {
    updateFocus(item);
  };

  function checkImage(url) {
    try {
      url = new URL(url);

      if (!(url.protocol === "http:" || url.protocol === "https:")) return false;

      return true;
    } catch (_) {
      return false;  
    }
  }

  const getImage = (item) => {
    if (item.Images.length > 0 && checkImage(item.Images[0])) return item.Images[0];
    // return breadurl;
    return require('../images/no-image-icon.png');
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: '#cce6ff' }}
      animate={{
        backgroundColor: focus != null && focus._id === service._id ? '#b0d7ff' : '#fff',
        // maxHeight: focus != null && focus._id === service._id ? '100px' : '70px'
      }}
      style={{
        // backgroundColor: 'green',
        marginTop: '5px',
        marginBottom: '5px',
        // height: '100%'
        cursor: 'pointer',
      }}
      onClick={clickItem(service)}
    >
      
      {/* <Box sx={{ height: '100%', width: '100px', bgcolor: 'green' }}>

      </Box> */}
      <Grid container sx={{ 
          // maxHeight: '100%',
          // height: '100%',
          // bgcolor: 'green',
          // overflow: 'clip'
          // display: 'flex'
        }}
      >
        <Grid item xs={3} sx={{ 
            marginRight: '10px', 
            // bgcolor: 'green' 
          }} 
        >
          <img
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              ml: 0,
              // margin: 'auto',
              display: 'block',
            }}
            src={getImage(service)}
          />
        </Grid>

        <Grid item xs >
          <Collapse in={focus != null && focus._id === service._id} collapsedSize='100px'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6' sx={{ display: 'inline' }}>
                {service.Title}
              </Typography>
              
              <Typography variant='h6' sx={{ display: 'inline' }} color='#ababab'>
                ${service.Price}
              </Typography>
            </Box>

            <Typography>
              {service.Description}
            </Typography>
          </Collapse>
        </Grid>

        <Grid 
          item xs={2} 
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            // bgcolor: 'green'
          }}
          >
          {focus != null && focus._id === service._id &&
            <div
              style={{display:'flex', flexDirection:'row-reverse'}}
            >
                <Tooltip title="Go to Service">
                  <IconButton
                    onClick={clickOpen(service)}
                    sx={{
                      color: 'white',
                      bgcolor: 'steelblue',
                      "&:hover": {
                        bgcolor: "DarkTurquoise"
                      }
                    }}
                  >
                    <ArrowForwardIcon
                      // sx={{ width: 17}}
                      fontSize='medium'
                      aria-label="This is aria label"
                    />
                  </IconButton>
                </Tooltip>
            </div>
          }
        </Grid>
      </Grid>
    </motion.div>
  )
}
