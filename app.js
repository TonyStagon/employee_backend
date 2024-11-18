// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/employee', employeeRoutes);

// Server setup
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});