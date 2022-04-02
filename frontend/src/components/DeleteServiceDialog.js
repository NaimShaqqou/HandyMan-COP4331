import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function DeleteServiceDialog(props) {
    const { service, open, setOpen, onConfirm } = props;

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Delete {service.Title}?</DialogTitle>
      <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => {
              setOpen(false)
              onConfirm()
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
    </Dialog>
  );
}

