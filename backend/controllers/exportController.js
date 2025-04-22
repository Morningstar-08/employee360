const excelJs = require("exceljs");
const Employee = require("../models/employeeModel");

const exportEmployeeData = async (req, res) => {
    try {
        const employees = await Employee.find().lean();

        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Employees");

        // Define columns
        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 25 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "Address", key: "address", width: 30 },
            { header: "Age", key: "age", width: 10 },
            { header: "Department", key: "department", width: 25 },
            { header: "Education", key: "education", width: 10 },
            {
                header: "Environment Satisfaction",
                key: "environmentSatisfaction",
                width: 25,
            },
            { header: "Gender", key: "gender", width: 10 },
            { header: "Job Involvement", key: "jobInvolvement", width: 20 },
            { header: "Job Level", key: "jobLevel", width: 10 },
            { header: "Job Role", key: "jobRole", width: 20 },
            { header: "Job Satisfaction", key: "jobSatisfaction", width: 20 },
            { header: "Marital Status", key: "maritalStatus", width: 15 },
            { header: "Monthly Income", key: "monthlyIncome", width: 15 },
            { header: "OverTime", key: "overTime", width: 10 },
            {
                header: "Percent Salary Hike",
                key: "percentSalaryHike",
                width: 20,
            },
            {
                header: "Performance Rating",
                key: "performanceRating",
                width: 20,
            },
            { header: "Work-Life Balance", key: "workLifeBalance", width: 20 },
            { header: "Years At Company", key: "yearsAtCompany", width: 15 },
            {
                header: "Years Since Last Promotion",
                key: "yearsSinceLastPromotion",
                width: 25,
            },
            { header: "Attrition", key: "attrition", width: 10 },
            {
                header: "Attrition Probability",
                key: "attritionProbability",
                width: 20,
            },
            {
                header: "Attrition Risk Level",
                key: "attritionRiskLevel",
                width: 20,
            },
            { header: "SHAP Explanations", key: "shapExplanations", width: 40 },
        ];

        // Add rows
        worksheet.addRows(employees);

        // Set response headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=employees.xlsx"
        );

        // Write to response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            message: "Error fetching employees",
            error: error.message,
        });
    }
};

module.exports = { exportEmployeeData };
