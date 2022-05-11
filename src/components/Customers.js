import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Addtraining from './Addtraining';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Customers() {
    const gridRef = useRef();
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        fetchCustomers();
     }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, { method: 'DELETE' })
            .then(response => {
               if (!response.ok){
                  alert('Something went wrong in deletion');
               } else {
                   setOpen(true);
                   fetchCustomers();
                }
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
            }
            else{
                alert('Something went wrong when adding car');
            }
        })
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            if(response.ok) {
                fetch('https://customerrest.herokuapp.com/api/trainings')
            }
            else{
                alert('Something went wrong when adding training');
            }
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer) 
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
            }
            else{
                alert('Something went wrong when editing');
            }
        })
        .catch(err => console.error(err))
    }

    const [columns] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 130},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 120},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => <Addtraining params = {params.value} addTraining = {addTraining} />
          },
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => <Editcustomer params = {params} updateCustomer = {updateCustomer} />
          },
          {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => 
            <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
          }
    ]);

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);

    
    return(
        <>
          <Stack 
            direction="row" 
            spacing={2} 
            m={2} 
            display="flex" 
            justifyContent="flex-end" 
            alignItems="flex-end">
                <Addcustomer addCustomer={addCustomer} />
                <Button 
                    variant="outlined" 
                    style = {{marginTop: 10}} 
                    onClick={onBtnExport}>
                        Export file
                </Button>
          </Stack>
          <div className="ag-theme-material" style={{height: 700, width: '100%'}}>
          <AgGridReact
                columnDefs={columns}
                rowData={customers}
                pagination={true}
                paginationPageSize={12}
                suppressCellFocus={true}
                ref={gridRef}
                suppressExcelExport={true}
                />
          </div>

          <Snackbar 
             open={open}
             autoHideDuration={3000}
             onClose={() => setOpen(false)}
             message="Customer was deleted successfully"
          />
            
        </>
    );





}
export default Customers;