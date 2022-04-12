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
  Box
} from '@mui/material';

export default function SearchResults(props) {

  let navigate = useNavigate();

  const clickItem = (item) => async (event) => {
    // alert('clicked ' + item.Title);
    navigate("/service", { replace: true, state: { service: item } });
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'white',
        overflow: 'auto', // scroll bar
        height: 850,
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
            <div key ={listitem._id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  width: '99%', // so the hover color doesn't overlap the map border
                  "&:hover": {
                    bgcolor: "#c9e8ff"
                  }
                }}
                divider={true}
              >
                <ListItemAvatar onClick={clickItem(listitem)} sx={{ cursor: 'pointer' }}>
                  <Avatar alt={listitem.Title} src="https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg" />
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