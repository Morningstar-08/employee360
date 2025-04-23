import joblib
import numpy as np
import pandas as pd

def explain_employee_summary(emp_id, feature_names, shap_values, feature_map, top_n=3):

    shap_row = shap_values[emp_id].values
    # print(f"Feature names: {feature_names}")
    abs_values = np.abs(shap_row)
    sorted_indices = abs_values.argsort()[::-1]

    reasons = []
    count = 0
    for idx in sorted_indices:
        feature = feature_names[idx]
        if feature in feature_map:
            continue  # skip excluded features
        reasons.append(f"{feature}")
        count += 1
        if count >= top_n:
            break

    return reasons
