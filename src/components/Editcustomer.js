import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Editcustomer( {params, updateCustomer} ) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '', 
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
      setCustomer({
          firstname: params.data.firstname,
          lastname: params.data.lastname,
          streetaddress: params.data.streetaddress,
          postcode: params.data.postcode,
          city: params.data.city,
          email:params.data.email,
          phone:params.data.phone
      })
      console.log(params)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        updateCustomer(customer, params.value);
        setOpen(false);
      };

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }
  
    return (
      <div>
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name = "firstname"
              value = {customer.firstname}
              onChange = {inputChanged}
              label="First Name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "lastname"
              value = {customer.lastname}
              onChange = {inputChanged}
              label="Last Name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "streetaddress"
              value = {customer.streetaddress}
              onChange = {inputChanged}
              label="Street Address"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "postcode"
              value = {customer.postcode}
              onChange = {inputChanged}
              label="Postcode"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "city"
              value = {customer.city}
              onChange = {inputChanged}
              label="City"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "email"
              value = {customer.email}
              onChange = {inputChanged}
              label="Email"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "phone"
              value = {customer.phone}
              onChange = {inputChanged}
              label="Phone"
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

export default Editcustomer;