import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePatients extends Component {
    constructor(props) {
        super(props);

        this.onChangePatientname = this.onChangePatientname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        

        this.state = {
            patientname: '',
        }
    }

    onChangePatientname(e) {
        this.setState({
            patientname: e.target.value
        });  
    }

    onSubmit(e) {
        e.preventDefault();

        const patient = {
            patientname: this.state.patientname,
        }

        console.log(patient);

        axios.post(process.env.REACT_APP_API +'/patients/add', patient)
          .then(res => console.log(res.data));

        this.setState({
            patientname: ''
        })   
    }


    render() {
        return (
          <div>
            <h3>Create New Patient</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Patient Name: </label>
                <input  type="text"
                    required className="form-control"
                    value={this.state.patientname}
                    onChange={this.onChangePatientname}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Create Patient" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
    }