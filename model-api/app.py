import joblib
import pandas as pd
import shap
import numpy as np
from flask import Flask, request, jsonify

# Load saved artifacts
model = joblib.load("model-api/models/employee_retention_model_classification.pkl")
scaler = joblib.load("model-api/models/scaler.pkl")
ohe = joblib.load("model-api/models/ohe.pkl")
columns = joblib.load("model-api/models/feature_names.pkl")
feature_map=joblib.load("model-api/models/feature_map.pkl")

cat_cols = ['OverTime', 'Gender', 'Department', 'MaritalStatus', 'JobRole']

app = Flask(__name__)

def explain_employee_summary(emp_id, X_unscaled, shap_values, feature_map, top_n=3):
    shap_row = shap_values[emp_id].values
    feature_names = X_unscaled.columns
    row = X_unscaled.iloc[emp_id]

    abs_values = np.abs(shap_row)
    sorted_indices = abs_values.argsort()[::-1]

    reasons = []
    count = 0
    for idx in sorted_indices:
        feature = feature_names[idx]
        if feature.startswith("Department_") or feature in feature_map:
            continue  # skip excluded features
        actual_value = row[feature]
        median = X_unscaled[feature].median()
        reasons.append(f"{feature}")
        count += 1
        if count >= top_n:
            break

    return reasons

@app.route("/")
def home():
    return "Welcome to the Employee Attrition Prediction API!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON input
        data = request.get_json(force=True)
        df = pd.DataFrame(data,  index=[0])
        encoded = ohe.transform(df[cat_cols]).toarray()
        df_encoded = pd.DataFrame(encoded, columns=ohe.get_feature_names_out(),index=df.index)
        df = pd.concat([df, df_encoded], axis=1)
        df = df.drop(columns=cat_cols)

        # Add missing columns and re-order to match training
        for col in columns:
            if col not in df.columns:
                df[col] = 0
        df = df[columns]
        
        #scaling after ohe 
        df_final = scaler.transform(df)
        

        prob = model.predict_proba(df_final)[0][1]

        if prob <= 0.2:
            attrition_class="low_risk"
        elif prob <= 0.5:
            attrition_class="medium_risk"
        else:
            attrition_class="high_risk"

        explainer = shap.Explainer(model)
        shap_values = explainer(df_final)

        explanation = explain_employee_summary(
            emp_id=0,
            X_unscaled=df,
            shap_values=shap_values,
            feature_map=feature_map,
            top_n=3
        )

        return jsonify({
            "attrition_probability": round(float(prob), 2),
            "attrition_class": attrition_class,
            "Reasons": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)