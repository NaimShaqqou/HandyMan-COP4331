import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function SearchResults(props) {

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.results.map(listitem => (
            <div key ={listitem._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={listitem.Title} src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1649000519~hmac=eb9d2f000a439ae396e19b1f74c28e8f" />
                </ListItemAvatar>
                <ListItemText
                  primary={listitem.Title}
                  secondary={
                    <React.Fragment>
                      {/* <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography> */}
                      {listitem.Description}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
        ))}

        {/* <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" /> */}
      </List>
    </div>
  );
}