const admin = require('firebase-admin');
const serviceAccount = require('../node-employee-backend/employee-node-app-9065a-firebase-adminsdk-rn7jr-dcefb62252.json'); // Change path accordingly

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Removed the storageBucket line since you don't need it
});

console.log('Firebase has been initialized successfully.');

const db = admin.firestore(); // Initialize Firestore without storage

module.exports = { db }; // Export only Firestore
