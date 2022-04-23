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
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function AddReviewDialog(props) {
    const {open, setOpen, onConfirm, rating, setRating, review, setReview } = props;

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Let the service owner know how your experience was!</DialogTitle>
      <DialogContent>
          <TextField variant="standard" type="number" value={rating} InputProps={{ inputProps: { min: 0, max: 5 } }} onChange={(e) => setRating(e.target.value)}/>
          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Review"
            type="text"
            fullWidth
            value={review}
            multiline
            rows={4}
            error={review === ""}
            helperText={
                review === "" ? "Review can't be empty!" : " "
            }
            variant="standard"
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContent>
      <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => {
              onConfirm()
          }} autoFocus>
            Add Review
          </Button>
        </DialogActions>
    </Dialog>
  );
}