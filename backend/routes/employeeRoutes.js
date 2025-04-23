const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/addEmployee", employeeController.addEmployee);

router.put("/editEmployee/:id", employeeController.editEmployee);

router.patch("/removeEmployee/:id", employeeController.removeEmployee);

router.get("/getAllEmployees", employeeController.getAllEmployees);

router.get(
    "/getAllCurrentEmployees",
    employeeController.getAllCurrentEmployees
);

router.get("/getAttritionEmployees", employeeController.getAttritionEmployees);

router.get("/getEmployeeById/:id", employeeController.getEmployeeById);

router.post(
    "/employeeAttrition/:id/predict",
    employeeController.predictAttrition
);

module.exports = router;
