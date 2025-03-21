const Employee = require('../models/employee'); // Adjust the path if necessary

const AuthController = {
    login: async (req, res) => {
        try {
            const { employeeId } = req.body;

            if (!employeeId) {
                return res.status(400).json({ message: 'Employee ID is required' });
            }

            // Find employee by ID
            const employee = await Employee.findOne({ employeeId });

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            // Authentication successful
            return res.status(200).json({ message: 'Login successful', employee });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = AuthController;