import joblib
import shap
from flask import Flask, request, jsonify
from shap_explainer import explain_employee_summary
from preprocessing import preprocess

# Load saved artifacts
model = joblib.load("./models/employee_retention_model_classification.pkl")
feature_map=joblib.load("./models/feature_map.pkl")
ohe = joblib.load("./models/ohe.pkl")
columns = joblib.load("./models/feature_names.pkl")
scaler = joblib.load("./models/scaler.pkl")

app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome to the Employee Attrition Prediction API!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON input
        data = request.get_json(force=True)
        print(data)
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        df_final = preprocess(
            data=data,
            columns=columns,
            scaler=scaler,
            ohe=ohe
        )

        prob = model.predict_proba(df_final)[0][1]
        
        explainer = shap.Explainer(model)
        shap_values = explainer(df_final)
        explanation = explain_employee_summary(
            feature_names=columns,
            emp_id=0,
            shap_values=shap_values,
            feature_map=feature_map,
            top_n=3
        )

        if prob <= 0.1:
            attrition_class="low_risk"
        elif prob <= 0.4:
            attrition_class="medium_risk"
        else:
            attrition_class="high_risk"

        return jsonify({
            "attrition_probability": round(float(prob), 2),
            "attrition_class": attrition_class,
            "reasons": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)