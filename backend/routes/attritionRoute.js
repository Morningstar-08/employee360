const router = require("express").Router();
const axios = require("axios");

router.post("/attrition", async (req, res) => {
    try {
        const { attritionData } = req.body;
        const response = await axios.post(
            "http://localhost:5000/predict",
            attritionData
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
        console.error("Error in /attrition route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
