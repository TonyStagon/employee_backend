const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes'); // Ensure this path is correct

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api/employee', employeeRoutes); // Using a different route structure

// Server setup
const PORT = 5006;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});