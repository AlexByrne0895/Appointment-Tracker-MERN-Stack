import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = props => (
    <tr>
        <td>{props.appointment.patientname}</td>
        <td>{props.appointment.doctor}</td>
        <td>{props.appointment.duration}</td>
        <td>{props.appointment.date.substring(0, 10)}</td>

        <td>
            <Link to={"/edit/"+ props.appointment._id}>edit</Link> {'||'} <a href='#' onClick={() => { props.deleteAppointment(props.appointment._id) }}>delete</a>
        </td>
    </tr>
)

export default class AppointmentsList extends Component {
    constructor(props) {
        super(props);

        this.deleteAppointment = this.deleteAppointment.bind(this)

        this.state = {appointments: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/appointments/')
            .then(response => {
                this.setState({ appointments: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAppointment(id) {
        axios.delete('http://localhost:5000/appointments/'+id)
            .then(response => { console.log(response.data)});

        this.setState({
            appointments: this.state.appointments.filter(al => al._id !== id)
        })    
    }

    appointmentsList() {
        return this.state.appointments.map(currentappointment => {
            return <Appointment appointment={currentappointment}
            deleteAppointment={this.deleteAppointment} 
            key={currentappointment._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Appointments</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor</th>
                            <th>Duration (Minutes)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.appointmentsList() }
                    </tbody>
                </table>
            </div>
        )    
    }
}