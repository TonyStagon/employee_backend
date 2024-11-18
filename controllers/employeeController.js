const validateEmployee = ({ name, surname, age, role, id }) => {
    if (!name || !surname || !age || !role || !id) {
        return { error: 'All fields are required' };
    }
    return null;
};

exports.addEmployee = async(req, res) => {
    const { name, surname, age, role, id } = req.body;
    const validationError = validateEmployee({ name, surname, age, role, id });
    if (validationError) return res.status(400).json(validationError);

    const docRef = db.collection('employees').doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return res.status(409).json({ error: 'Employee with this ID already exists' });
    }

    await docRef.set({ name, surname, age, role, id });
    res.status(201).json({ message: 'Employee added successfully' });
};