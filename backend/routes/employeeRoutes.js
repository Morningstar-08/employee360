const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/", employeeController.addEmployee);
router.put("/:id", employeeController.editEmployee);
router.delete("/:id", employeeController.removeEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/:id/predict", employeeController.predictAttrition);

module.exports = router;