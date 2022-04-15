import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

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
  Button
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SearchResults(props) {
  let navigate = useNavigate();

  const clickItem = (item) => async (event) => {
    // setFocusItem(item._id);
    props.updateFocus(item._id);
  };

  const clickOpen = (item) => async (event) => {
    navigate("/service", { replace: true, state: { service: item } });
  };

  function checkImage(url) {
    try {
      url = new URL(url);

      if (!(url.protocol === "http:" || url.protocol === "https:")) return false;
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      let status = false;
      request.onload = function() {
        status = (request.status == 200);
      }
      console.log(status);
      return status;
    } catch (_) {
      return false;  
    }
    // console.log('image: ' + url);
  }
  // console.log(props.results);

  let breadurl = "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg";

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'white',
        overflow: 'auto', // scroll bar
        height: '100%',
        border: 3,
        '& ul': {
          padding: 0,
          // bgcolor: 'black',
        },
        }}
    >
      <List
      >
        { (props.results && props.results.length > 0) ? props.results.map(listitem => (
            <div key={listitem._id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  width: '99%', // so the hover color doesn't overlap the map border
                  "&:hover": {
                    bgcolor: "#c9e8ff"
                  },
                  bgcolor: (props.focus === listitem._id ? "#aacce6" : "white")
                }}
                divider={true}
              >
                <ListItemAvatar onClick={clickItem(listitem)} sx={{ cursor: 'pointer' }}>
                  <Avatar alt={listitem.Title} src={breadurl} />
                </ListItemAvatar>
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
                {props.focus === listitem._id && <Button onClick={clickOpen(listitem)}>Open</Button>}
              </ListItem>
              {/* <Divider variant="inset" component="li" /> */}
            </div>
        ))
        :
        <div>
          <Typography
            variant='h4'
            style={{textAlign: 'center'}}
          >
            No results found
          </Typography>
        </div>}
      </List>
    </Box>
  );
}