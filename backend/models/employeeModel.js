const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    default: "",
  },

  // ML-Relevant Fields
  Age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  Department: {
    type: String,
    enum: ["Sales", "Research & Development", "Human Resources"],
    required: true,
  },
  Education: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // 1 = Below College ... 5 = Doctor
    required: true,
  },
  EnvironmentSatisfaction: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  Gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  JobInvolvement: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  JobLevel: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  JobRole: {
    type: String,
    enum: [
      "Sales Executive",
      "Research Scientist",
      "Laboratory Technician",
      "Manufacturing Director",
      "Healthcare Representative",
      "Manager",
      "Sales Representative",
      "Research Director",
      "Human Resources",
    ],
    required: true,
  },
  JobSatisfaction: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  MaritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced"],
    required: true,
  },
  MonthlyIncome: {
    type: Number,
    required: true,
    min: 1000,
    max: 20000,
  },
  OverTime: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  PercentSalaryHike: {
    type: Number,
    required: true,
    min: 10,
    max: 25,
  },
  PerformanceRating: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  WorkLifeBalance: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  YearsAtCompany: {
    type: Number,
    required: true,
    min: 0,
    max: 40,
  },
  YearsSinceLastPromotion: {
    type: Number,
    required: true,
    min: 0,
    max: 15,
  },
  attrition: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },

  // ML Output (To be updated after prediction)
  attritionProbability: {
    type: Number, // Optional: ML model can return probability [0-1]
    default: "",
  },
  attritionRiskLevel: {
    type: String,
    enum: ["low_risk", "medium_risk", "high_risk", ""],
    default: "",
  },
  shapExplanations: {
    type: Array,
    default: "",
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
