import * as React from 'react';
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
      layout
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
      }}
      transition={{
        duration: 0.2
      }}
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
          <motion.img
            layout
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              ml: 0,
              // margin: 'auto',
              display: 'block',
            }}
            src={getImage(service)}
          />
        </Grid>

        <Grid item xs >
          <ListItemText
            onClick={clickItem(service)}
            primary={service.Title}
            secondary={
              <React.Fragment>
                {/* {focus != null && focus._id === service._id && */}
                  {/* <motion.div
                    layout
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
                      }
                    }}
                  >
                    {service.Address}
                  </motion.div> */}

                <Collapse in={focus != null && focus._id === service._id} collapsedSize={0}>
                  <motion.div
                    layout
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
                      }
                    }}
                  >
                    {service.Address}
                  </motion.div>
                </Collapse>
                
                <React.Fragment>
                  {service.Description}
                </React.Fragment>
              </React.Fragment>
            }
            sx={{ cursor: 'pointer' }}
          />

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
                }
              }}
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
            </motion.div>
          }
        </Grid>
      </Grid>
    </motion.div>
  )
}
