import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component";
import AppointmentsList from "./components/appointments-list.component";
import EditAppointment from "./components/edit-appointment.component";
import CreateAppointment from "./components/create-appointments.component";
import CreatePatient from "./components/create-patient.component";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
      
        <br/>
          <Route path="/" exact component={AppointmentsList} />
          <Route path="/edit/:id" component={EditAppointment} />
          <Route path="/create" component={CreateAppointment} />
          <Route path="/patient" component={CreatePatient} />
      </div>  
    </Router>
  );
}

export default App;
