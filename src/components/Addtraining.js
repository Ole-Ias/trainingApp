import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';


function Addtraining({ addTraining, params }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });


    const handleClickOpen = () => {
        setOpen(true);
        setTraining({...training, customer: params});
        console.log(params);
      };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        addTraining(training);
		setOpen(false);
      };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

  
    return (
      <div>
         <IconButton variant="outlined" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training </DialogTitle>
          <DialogContent>
        
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker 
                        margin="dense"
                        name = "date"
                        label="Date"
                        onChange={newValue => {
                            setTraining({...training, date: newValue});
                        }}
                        renderInput = {(params) => <TextField variant='standard' {...params} />}
                        value={training.date}
                        fullWidth
                        />
                        
                </LocalizationProvider>
            <TextField
              margin="dense"
              name = "duration"
              value = {training.duration}
              onChange = {inputChanged}
              label="Duration"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "activity"
              value = {training.activity}
              onChange = {inputChanged}
              label="Activity"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Addtraining;

  /*<TextField
              margin="dense"
              name = "date"
              value = {training.date}
              onChange = {inputChanged}
              label="Date"
              fullWidth
              variant="standard"
            />*/