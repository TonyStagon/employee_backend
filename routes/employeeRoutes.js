const express = require('express');
const { db } = require('../config/firebaseConfig'); // Assuming firebaseConfig is configured separately in your project
const router = express.Router();

// Add a new employee
router.post('/add', async(req, res) => {
    const { firstName, lastName, age, idNumber, jobTitle, image } = req.body;

    try {
        const newEmployee = await db.collection('employees').add({
            firstName,
            lastName,
            age,
            idNumber,
            jobTitle,
            image, // Store image data if provided
        });

        res.status(201).json({
            message: 'Employee added successfully!',
            id: newEmployee.id,
        });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({
            message: 'Error adding employee',
            error: error.message,
        });
    }
});

// Update an employee's details
router.put('/update/:employeeId', async(req, res) => {
    const { employeeId } = req.params;
    const { firstName, lastName, age, idNumber, jobTitle, image } = req.body;

    try {
        await db.collection('employees').doc(employeeId).update({
            firstName,
            lastName,
            age,
            idNumber,
            jobTitle,
            image,
        });

        res.status(200).json({
            message: 'Employee details updated successfully',
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({
            message: 'Failed to update employee details',
            error: error.message,
        });
    }
});

// Delete an employee
router.delete('/remove/:employeeId', async(req, res) => {
    const { employeeId } = req.params;

    try {
        await db.collection('employees').doc(employeeId).delete();
        res.status(200).json({
            message: 'Employee deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({
            message: 'Failed to delete employee',
            error: error.message,
        });
    }
});

module.exports = router;