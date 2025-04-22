const Employee = require("../models/employeeModel");
const axios = require("axios");

// Create a new employee
const addEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing employee
const editEmployee = async (req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an employee
const removeEmployee = async (req, res) => {
    try {
        const removed = await Employee.findByIdAndDelete(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee removed successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific employee
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Predict attrition using ML API
const predictAttrition = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Send data to Flask ML API
        const response = await axios.post(
            "http://localhost:5000/predict",
            employee
        );

        // Extract the response fields
        const { attrition_probability, attrition_class, reasons } =
            response.data;

        // Update employee document
        employee.attritionProbability = attrition_probability;
        employee.attritionRiskLevel = attrition_class;
        employee.shapExplanations = reasons;
        await employee.save();

        res.json({
            probability: attrition_probability,
            classification: attrition_class,
            reasons: reasons,
        });
    } catch (error) {
        console.error("Prediction error:", error.message);
        res.status(500).json({
            error: "Prediction failed or Flask API unreachable.",
        });
    }
};

module.exports = {
    addEmployee,
    editEmployee,
    removeEmployee,
    getAllEmployees,
    getEmployeeById,
    predictAttrition,
};
