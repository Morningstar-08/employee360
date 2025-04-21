const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
    {
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
            required: true,
        },
        address: {
            type: String,
            default: "",
        },

        // ML-Relevant Fields
        age: {
            type: Number,
            required: true,
            min: 18,
            max: 65,
        },
        department: {
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
        education: {
            type: Number,
            enum: [1, 2, 3, 4, 5], // 1 = Below College ... 5 = Doctor
            required: true,
        },
        environmentSatisfaction: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        jobInvolvement: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
        },
        jobLevel: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
        },
        jobRole: {
            type: String,
            required: true,
        },
        jobSatisfaction: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
        },
        maritalStatus: {
            type: String,
            enum: ["Single", "Married", "Divorced"],
            required: true,
        },
        monthlyIncome: {
            type: Number,
            required: true,
            min: 1000,
            max: 20000,
        },
        overTime: {
            type: String,
            enum: ["Yes", "No"],
            required: true,
        },
        percentSalaryHike: {
            type: Number,
            required: true,
            min: 10,
            max: 25,
        },
        performanceRating: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
        },
        workLifeBalance: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
        },
        yearsAtCompany: {
            type: Number,
            required: true,
            min: 0,
            max: 40,
        },
        yearsSinceLastPromotion: {
            type: Number,
            required: true,
            min: 0,
            max: 15,
        },

        // ML Output (To be updated after prediction)
        attritionProbability: {
            type: Number, // Optional: ML model can return probability [0-1]
            default: null,
        },
        attritionRiskLevel: {
            type: String, // Optional: "Low", "Medium", "High"
            enum: ["Low", "Medium", "High"],
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
