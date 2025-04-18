import joblib
import pandas as pd
from flask import Flask, request, jsonify

# Load saved artifacts
model = joblib.load("employee_retention_model.pkl")
scaler = joblib.load("scaler.pkl")
ohe = joblib.load("ohe.pkl")
columns = joblib.load("feature_names.pkl")

cat_cols = ['OverTime', 'Gender', 'BusinessTravel', 'Department',
                    'MaritalStatus', 'EducationField', 'JobRole']

app = Flask(__name__)

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
        

        prob = model.predict(df_final)

        if prob <= 0.4:
            attrition_class="low_risk"
        elif prob <= 0.7:
            attrition_class="medium_risk"
        else:
            attrition_class="high_risk"

        return jsonify({
            "attrition_probability": round(float(prob), 2),
            "attrition_class": attrition_class,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)