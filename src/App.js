import React from 'react';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendars from './components/Calendar';
import Statistics from './components/Statistics';
import './App.css';

import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from './components/Nav';



export default function App() {

return (

  <div className="App">
    <ResponsiveAppBar />
    <Routes>
     <Route path="/customers" element={<Customers />} />
     <Route path="trainings" element={<Trainings />} />
     <Route path="calendars" element={<Calendars />} />
     <Route path="statistics" element={<Statistics />} />
    </Routes>

  </div>
  );

  }


