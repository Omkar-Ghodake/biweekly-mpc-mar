const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Coach = require('../models/coach'); 
const { SECRET_KEY } = require('../config'); // Ensure you have a valid SECRET_KEY

const AuthController = {
    authenticateUser: async (req, res) => {
        const { emp_id, password } = req.body; 

        try {
            // Find user by emp_id
            const coach = await Coach.findOne({ emp_id });
            if (!coach) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, coach.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: coach._id, emp_id: coach.emp_id }, SECRET_KEY, {
                expiresIn: '1h',
            });

            res.status(200).json({ message: 'Authentication successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = AuthController;
