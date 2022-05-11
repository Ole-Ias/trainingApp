import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip, 
    Legend
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';
import _ from 'lodash'


 
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip, 
    Legend
  );

function Statistics () {
   
    const [chartTrainings, setChartTrainings] = useState({
        labels:[],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: ''
          }
        ]
      });

    
    useEffect(() => { 
        fetchData(); 
    }, [])
    
    
    const fetchData = () => {
        const activity = []
        const duration = [];
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => {
            for (const data of responseData) {
                duration.push(data.duration); 
                activity.push(data.activity); 
            }
            setChartTrainings({
                labels:activity,
                datasets: [
                  {
                    label: 'Duration',
                    data: duration,
                    backgroundColor: '#2E3B55'
                  }
                ]
              })
        }
        )
        .catch(err => console.error(err))
    }


    
    const options = {
        indexAxis: 'x',
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Duration of training activities',
          },
        },
      };
    
    return(
        <div style={{width:'80%', height:'50%', margin: 100}}>
            <Bar data={chartTrainings} options={options}/>
         </div>)
}

export default Statistics;