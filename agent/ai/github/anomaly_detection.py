import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_anomalies(commits):
    commit_dates = [commit['committed_at'] for commit in commits]
    commit_dates = pd.to_datetime(commit_dates)
    commit_counts = commit_dates.value_counts().sort_index()
    commit_counts = commit_counts.resample('D').sum().fillna(0)
    
    model = IsolationForest(contamination=0.1)
    commit_counts = commit_counts.values.reshape(-1, 1)
    model.fit(commit_counts)
    anomalies = model.predict(commit_counts)
    
    anomaly_dates = commit_counts[anomalies == -1]
    return anomaly_dates