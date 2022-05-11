import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Trainings() {
    const gridRef = useRef();
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTrainings();
     }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE' })
            .then(response => {
               if (!response.ok){
                  alert('Something went wrong in deletion');
               } else {
                   setOpen(true);
                   fetchTrainings()
                }
            })
            .catch(err => console.error(err))
        }
    }


    const [columns] = useState([
        {field: 'date', sortable: true, filter: true,  valueFormatter: (params) => moment(params.value).format("DD.MM.YYYY hh.mm a")},
        {field: 'duration', sortable: true, filter: true, width: 120},
        {field: 'activity', sortable: true, filter: true},
        {
          headerName: 'Customer',
          width: 130,
          sortable: true, 
          filter: true,
          field: 'customer.firstname'
        },
        {
            headerName: '',
            width: 130,
            sortable: true, 
            filter: true,
            field: 'customer.lastname'
          },
        {
            headerName: '',
            width: 100,
            field: 'id',
            cellRenderer: params => 
            <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
            </IconButton>
          }
        
    ])

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);
    
    return(
        <>
        <Stack direction="row" spacing={2} m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button variant="outlined" style = {{marginTop: 10}} onClick={onBtnExport}>Export file</Button>
        </Stack>
          <div className="ag-theme-material" style={{height: 700, width: '100%'}}>
          <AgGridReact
                ref={gridRef}
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={12}
                suppressCellFocus={true}
                suppressExcelExport={true}
               />
              
          </div>

          <Snackbar 
             open={open}
             autoHideDuration={3000}
             onClose={() => setOpen(false)}
             message="Training was deleted successfully"
          />
            
        </>
    );





}
export default Trainings;

