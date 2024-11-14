// employeeController.js

// employeeController.js

const admin = require('firebase-admin');
const db = admin.firestore(); // Use the initialized Firebase instance from server.js

// Employee functions remain the same as in your provided code

// Import Firebase credentials (Replace 'path/to/your-service-account-file.json' with your actual path)
const serviceAccount = require('../employee-node-app-9065a-firebase-adminsdk-rn7jr-dcefb62252.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



// Function to add an employee
exports.addEmployee = async(req, res) => {
    const { name, surname, age, role, id } = req.body;

    // Input validation
    if (!name || !surname || !age || !role || !id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const docRef = db.collection('employees').doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return res.status(409).json({ error: 'Employee with this ID already exists' });
    }

    await docRef.set({ name, surname, age, role, id });
    res.status(201).json({ message: 'Employee added successfully' });
};

// Function to get all employees
exports.getEmployees = async(req, res) => {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map(doc => doc.data());
    res.status(200).json(employees);
};

// Function to update an employee by ID
exports.updateEmployee = async(req, res) => {
    const { id } = req.params;
    const { name, surname, age, role } = req.body;

    const docRef = db.collection('employees').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    await docRef.update({ name, surname, age, role });
    res.status(200).json({ message: 'Employee updated successfully' });
};

// Function to delete an employee by ID
exports.deleteEmployee = async(req, res) => {
    const { id } = req.params;

    const docRef = db.collection('employees').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    await docRef.delete();
    res.status(200).json({ message: 'Employee deleted successfully' });
};