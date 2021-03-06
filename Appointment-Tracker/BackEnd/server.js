const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const appointmentsRouter = require('./routes/appointments');
const patientsRouter = require('./routes/patients');

app.use('/appointments', appointmentsRouter);
app.use('/patients', patientsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});