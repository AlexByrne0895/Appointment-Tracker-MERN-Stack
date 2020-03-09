import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Byrne Medical</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Appointments</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Appointment</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/patient" className="nav-link">Create Patient</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}