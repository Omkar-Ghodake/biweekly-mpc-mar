const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/employee'); // Assuming you have a User model
const { SECRET_KEY } = require('../config'); // Replace with your secret key

const AuthController = {
    authenticateUser: async (req, res) => {
        const { employeeId, password } = req.body;

        try {
            // Find user by employee ID
            const user = await User.findOne({ employeeId });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id, employeeId: user.employeeId }, SECRET_KEY, {
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