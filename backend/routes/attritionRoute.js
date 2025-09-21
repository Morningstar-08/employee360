const router = require("express").Router();
const axios = require("axios");

router.post("/attrition", async (req, res) => {
  try {
    console.log("Received attrition data:", req.body);
    const response = await axios.post(
      "http://localhost:6000/predict",
      req.body
    );

    // Extract the response fields
    const { attrition_probability, attrition_class, reasons } = response.data;

    // Update employee document
    attrition_probability;
    attrition_class;
    reasons;

    res.json({
      probability: attrition_probability,
      classification: attrition_class,
      reasons: reasons,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
