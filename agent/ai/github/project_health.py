import pandas as pd

def calculate_commit_frequency(commits):
    if not commits:
        return 0
    commit_dates = [commit['committed_at'] for commit in commits if commit.get('committed_at')]
    if not commit_dates:
        return 0
    commit_dates = pd.to_datetime(commit_dates)
    commit_frequency = commit_dates.value_counts().mean()
    return commit_frequency

def calculate_issue_resolution_time(issues):
    resolution_times = []
    for issue in issues:
        if issue.get('closed_at') and issue.get('created_at'):
            created_at = pd.to_datetime(issue['created_at'])
            closed_at = pd.to_datetime(issue['closed_at'])
            resolution_time = (closed_at - created_at).days
            resolution_times.append(resolution_time)
    if resolution_times:
        avg_resolution_time = sum(resolution_times) / len(resolution_times)
    else:
        avg_resolution_time = 0
    return avg_resolution_time