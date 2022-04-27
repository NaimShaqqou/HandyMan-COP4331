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

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SearchResults(props) {
  let navigate = useNavigate();

  const clickItem = (item) => async (event) => {
    props.updateFocus(item);
  };

  const clickOpen = (item) => async (event) => {
    navigate("/service", { state: { service: item } });
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

  const breadurl = "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg";

  const getImage = (item) => {
    if (item.Images.length > 0 && checkImage(item.Images[0])) return item.Images[0];
    // return breadurl;
    return require('../images/no-image-icon.png');
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        // 'Comfortaa',
        'Roboto',
        '"Helvetica"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          // ...props.sx,
          // width: '100%',
          // bgcolor: 'white',
          overflow: 'auto', // scroll bar
          height: '100%',
          // '& ul': {
          //   padding: 0,
          // },
        }}
      >
        <List
        >
          { (props.results && props.results.length > 0) ? props.results.map(listitem => (
              <div key={listitem._id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    width: '99%', // so the hover color doesn't overlap the map border, nice number
                    "&:hover": {
                      bgcolor: "#c9e8ff"
                    },
                    bgcolor: (props.focus != null && props.focus._id === listitem._id ? "#e6efff" : "white"),
                    fontFamily: 'Helvetica'
                  }}
                  divider={true}
                >
                  <Collapse in={props.focus != null && props.focus._id === listitem._id} collapsedSize={100} sx={{width: '100%'}}>
                    <Grid container >
                      <Grid item xs={3} >
                        <ListItemAvatar onClick={clickItem(listitem)} sx={{ cursor: 'pointer' }}>
                          <Avatar alt={listitem.Title} src={getImage(listitem)} />
                        </ListItemAvatar>
                      </Grid>

                      <Grid item xs={9} >
                        <ListItemText
                          onClick={clickItem(listitem)}
                          primary={listitem.Title}
                          secondary={
                            <React.Fragment>
                              <React.Fragment>
                                {listitem.Address}
                              </React.Fragment>
                              <br />
                              <React.Fragment>
                                {listitem.Description}
                              </React.Fragment>
                            </React.Fragment>
                          }
                          sx={{ cursor: 'pointer' }}
                        />

                      </Grid>
                    </Grid>
                    {/* ArrowForwardIcon */}

                    <Box sx={{display:'flex', flexDirection:'row-reverse'}}>
                      <Fade in={props.focus != null && props.focus._id === listitem._id}>
                        {/* <Button onClick={clickOpen(listitem)}>Open</Button> */}
                        <Tooltip title="Go to Service">
                          <IconButton
                            onClick={clickOpen(listitem)}
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
                              fontSize='large'
                              aria-label="This is aria label"
                            />
                          </IconButton>
                        </Tooltip>
                      </Fade>
                    </Box>
                    
                  </Collapse>
                </ListItem>
                {/* <Divider variant="inset" component="li" /> */}
              </div>
          )) : (
          <div>
            <Typography
              variant='h4'
              sx={{
                textAlign: 'center',
                paddingTop: 5,
              }}
            >
              No results found
            </Typography>
          </div>
          )}
        </List>
      </Box>
    </ThemeProvider>
  );
}