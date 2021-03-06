import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateAppointments extends Component {
    constructor(props) {
        super(props);

        this.onChangePatientname = this.onChangePatientname.bind(this);
        this.onChangeDoctor = this.onChangeDoctor.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        

        this.state = {
            patientname: '',
            doctor: '',
            duration: 0,
            date: new Date(),
            patients: []
        }
    }

       componentDidMount() {
         axios.get(process.env.REACT_APP_API +'/patients/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                patients: response.data.map(patient => patient.patientname),
                patientname: response.data[0].patientname
              })
            }
          })
       }
    

    onChangePatientname(e) {
        this.setState({
            patientname: e.target.value
        });  
    }

    onChangeDoctor(e) {
        this.setState({
            doctor: e.target.value
        });  
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });  
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });  
    }

    onSubmit(e) {
        e.preventDefault();

        const appointment = {
            patientname: this.state.patientname,
            doctor: this.state.doctor,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(appointment);

        axios.post(process.env.REACT_APP_API +'/appointments/add', appointment)
          .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
        <div>
          <h3>Create New Appointment</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Patient Name: </label>
              <select ref="userInput"
                  required className="form-control"
                  value={this.state.patientname}
                  onChange={this.onChangePatientname}>
                  {
                    this.state.patients.map(function(patient) {
                      return <option 
                        key={patient}
                        value={patient}>{patient}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Doctor: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.doctor}
                  onChange={this.onChangeDoctor}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create Appointment" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
    }


