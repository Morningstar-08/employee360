import pandas as pd
import numpy as np

cat_cols = ['OverTime', 'Gender', 'Department', 'MaritalStatus', 'JobRole']

def preprocess(data, columns, scaler, ohe):
    """
    Preprocess the input data for prediction.   
    """
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

    return df_final

