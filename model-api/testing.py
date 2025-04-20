import pandas as pd
import joblib
import shap
import numpy as np

# Load trained artifacts
model = joblib.load("model-api/employee_retention_model.pkl")
scaler = joblib.load("model-api/scaler.pkl")
ohe = joblib.load("model-api/ohe.pkl")
columns = joblib.load("model-api/feature_names.pkl")
feature_map = joblib.load("model-api/feature_map.pkl")

cat_cols = ['OverTime', 'Gender', 'Department', 'MaritalStatus', 'JobRole']

query = {
    "Age": 95,
    "Education": 3,
    "EnvironmentSatisfaction": 4,
    "JobInvolvement": 3,
    "JobLevel": 2,
    "JobSatisfaction": 4,
    "MonthlyIncome": 5000,
    "PercentSalaryHike": 12,
    "PerformanceRating": 3,
    "StockOptionLevel": 1,
    "WorkLifeBalance": 2,
    "YearsAtCompany": 5,
    "YearsSinceLastPromotion": 1,
    "OverTime": "Yes",
    "Gender": "Female",
    "Department": "Research & Development",
    "MaritalStatus": "Married",
    "JobRole": "Research Scientist"
}

# Step 1: Create DataFrame
df = pd.DataFrame([query])

# Step 2: One-hot encode
encoded = ohe.transform(df[cat_cols])
df_encoded = pd.DataFrame(encoded.toarray(), columns=ohe.get_feature_names_out(cat_cols))

# Step 3: Combine
df.drop(columns=cat_cols, inplace=True)
df = pd.concat([df, df_encoded], axis=1)

# Step 4: Add missing columns
for col in columns:
    if col not in df.columns:
        df[col] = 0
df = df[columns]

# Save unscaled df for explanation
df_unscaled = df.copy()

# Step 5: Scale
df_scaled = scaler.transform(df)

# Step 6: Prediction
# prob = model.predict(df_scaled)[0]
prob = np.clip(model.predict(df_scaled)[0], 0, 1)

if prob <= 0.4:
    risk = "low_risk"
elif prob <= 0.7:
    risk = "medium_risk"
else:
    risk = "high_risk"

# Step 7: SHAP
explainer = shap.Explainer(model)
shap_values = explainer(df_scaled)

# Step 8: Explanation
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
        direction = "high_" if actual_value < median else "low"
        reasons.append(f"{direction} {feature}")
        count += 1
        if count >= top_n:
            break

    return reasons

explanation = explain_employee_summary(
    emp_id=0,
    X_unscaled=df_unscaled,
    shap_values=shap_values,
    feature_map=feature_map,
    top_n=3
)

# Final Output
print("Attrition Probability:", round(prob, 3))
print("Risk Classification:", risk)
print("Top Contributing Factors:", explanation)
