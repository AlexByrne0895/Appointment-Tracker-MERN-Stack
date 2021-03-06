const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const patientname = req.body.patientname;
    const doctor = req.body.doctor;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newAppointment = new Appointment({
        patientname,
        doctor,
        duration,
        date,
    });

    newAppointment.save()
        .then(() => res.json('Appointment added!!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Appointment Deleted!!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => {
            appointment.patientname = req.body.patientname;
            appointment.doctor = req.body.doctor;
            appointment.duration = Number(req.body.duration);
            appointment.date = Date.parse(req.body.date);

            appointment.save()
                .then(() => res.json('Appointment Updated!!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
            .catch(err => res.status(400).json('Error: ' + err));      
});

module.exports = router;