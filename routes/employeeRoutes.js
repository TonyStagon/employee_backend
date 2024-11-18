// employeeRoutes.js

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController'); // Ensure this path is correct

// Add a new employee
router.post('/add', (req, res) => {
    try {
        employeeController.addEmployee(req, res);
    } catch (err) {
        console.error('Error in addEmployee:', err);
        res.status(500).json({ message: 'Failed to add employee', error: err.message });
    }
});

// Get the list of employees
router.get('/list', (req, res) => {
    try {
        employeeController.getEmployees(req, res);
    } catch (err) {
        console.error('Error in getEmployees:', err);
        res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
    }
});

// Update an employee by ID
router.put('/update/:id', (req, res) => {
    try {
        employeeController.updateEmployee(req, res);
    } catch (err) {
        console.error('Error in updateEmployee:', err);
        res.status(500).json({ message: 'Failed to update employee', error: err.message });
    }
});

// Delete an employee by ID
router.delete('/remove/:id', (req, res) => {
    try {
        employeeController.deleteEmployee(req, res);
    } catch (err) {
        console.error('Error in deleteEmployee:', err);
        res.status(500).json({ message: 'Failed to delete employee', error: err.message });
    }
});

module.exports = router;