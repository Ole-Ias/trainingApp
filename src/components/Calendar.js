import React,  { useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";



function Calendars() {
    const [data, setData] = useState([]);
    const localizer = momentLocalizer(moment)


    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(trainings => {
            return setData(
            trainings.map((training, index) => ({
            id: index,
            title: training.activity + ", " + training.customer.firstname + training.customer.lastname,
            start: moment(training.date)._d,
            end: moment(training.date).add(training.duration, 'minutes')._d  

            }))
            )
          
              })
              .catch(function (error) {
                console.log(error);
              });
          }

    useEffect(() => {
        getTrainings();
    }, [])

    return (
        <div  style = {{ width: '95%', margin: "auto", marginTop: 20}}>
        <Calendar
        events={data}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        style={{height: "750px"}}/>
        </div>
    )
}

export default Calendars;