const Employee = require("../models/employeeModel");
const axios = require("axios");

// Create a new employee
const addEmployee = async (req, res) => {
  try {
    const { email } = req.body;
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("Creating new employee:", req.body);
    const employee = new Employee(req.body);
    const response = await axios.post(
      "http://localhost:6000/predict",
      employee
    );
    console.log("Response from Flask API:", response.data);

    // Extract the response fields
    const { attrition_probability, attrition_class, reasons } = response.data;

    // Update employee document
    employee.attritionProbability = attrition_probability;
    employee.attritionRiskLevel = attrition_class;
    employee.shapExplanations = reasons;
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing employee
const editEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee
// const removeEmployee = async (req, res) => {
//     try {
//         const removed = await Employee.findByIdAndDelete(req.params.id);
//         if (!removed) {
//             return res.status(404).json({ message: "Employee not found" });
//         }
//         res.json({ message: "Employee removed successfully" });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const removeEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { attrition: "Yes" },
      { leavingMonth: req.body.leavingMonth },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee attrition status updated to 'Yes'",
      employee: updated,
    });
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

const getAllCurrentEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ attrition: "No" });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttritionEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ attrition: "Yes" });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific employee
const getEmployeeById = async (req, res) => {
  try {
    console.log("Fetching employee with ID:", req.params.id);
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//employees by Department
const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    if (!department) {
      return res
        .status(400)
        .json({ message: "Department query parameter is required" });
    }
    console.log("Fetching employees for department:", department);
    // Find all employees where the 'department' field matches
    const employees = await Employee.find({ Department: department });
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found in this department" });
    }
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Predict attrition using ML API
const predictAttrition = async (req, res) => {
  try {
    console.log(req.params.id);
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    employee.shapExplanations = "";
    // Send data to Flask ML API
    const response = await axios.post(
      "http://localhost:6000/predict",
      employee
    );
    console.log("Response from Flask API:", response.data);

    // Extract the response fields
    const { attrition_probability, attrition_class, reasons } = response.data;

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
  getAllCurrentEmployees,
  getAttritionEmployees,
  getEmployeesByDepartment,
};
