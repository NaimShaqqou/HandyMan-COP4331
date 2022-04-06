import * as React from 'react';

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Typography
} from '@mui/material';

export default function SearchResults(props) {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 800,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        { props.results ? props.results.map(listitem => (
            <div key ={listitem._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={listitem.Title} src="https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg" />
                </ListItemAvatar>
                <ListItemText
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
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
        )) : <div></div>}
      </List>
    </div>
    // <div>
    //   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    //     {props.results.map(listitem => (
    //         <div key ={listitem._id}>
    //           <ListItem alignItems="flex-start">
    //             <ListItemAvatar>
    //               <Avatar alt={listitem.Title} src="https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg" />
    //             </ListItemAvatar>
    //             <ListItemText
    //               primary={listitem.Title}
    //               secondary={
    //                 <React.Fragment>
    //                   {listitem.Description}
    //                 </React.Fragment>
    //               }
    //             />
    //           </ListItem>
    //           <Divider variant="inset" component="li" />
    //         </div>
    //     ))}
    //   </List>
    // </div>
  );
}