import numpy as np

# Define the thresholds for scoring (these thresholds are hypothetical and should be adjusted based on real data)
THRESHOLDS = {
    "owner_followers": [100, 500, 1000, 2000],
    "owner_following": [10, 50, 100, 200],
    "repo_watchers": [20, 50, 100, 300],
    "repo_forks": [500, 1000, 2000, 5000],
    "repo_open_issues": [100, 500, 1000, 2000],
    "total_commits": [500, 3000, 7500, 15000],
    "commit_frequency": [3, 8, 25, 40]
}

# Define the points for each threshold
POINTS = {
    "owner_followers": [2, 6, 10, 20],
    "owner_following": [1, 3, 5, 10],
    "repo_watchers": [2, 5, 8, 10],
    "repo_forks": [4, 8, 10, 15],
    "repo_open_issues": [10, 8, 5, 2],  # Inverse scoring for open issues
    "total_commits": [5, 10, 15, 20],
    "commit_frequency": [3, 5, 8, 15]
}

def score_metric(value, thresholds, points):
    """Score a metric based on predefined thresholds and points."""
    for i, threshold in enumerate(thresholds):
        if value <= threshold:
            return points[i]
    return points[-1]

def calculate_tech_score(owner_followers, owner_following, repo_watchers, repo_forks, repo_open_issues, total_commits, commit_frequency):
    """
    Calculate the tech score for a GitHub repository and its owner based on various metrics.

    Parameters:
    - owner_followers (int): The number of followers the owner has.
    - owner_following (int): The number of users the owner is following.
    - repo_watchers (int): The number of users watching the repository.
    - repo_forks (int): The number of forks of the repository.
    - repo_open_issues (int): The number of open issues in the repository.
    - total_commits (int): The total number of commits in the repository.
    - commit_frequency (float): The average frequency of commits in the repository.

    Returns:
    - float: The calculated tech score.
    """
    
    
    #Print all parameters
    # print("owner_followers: ", owner_followers)
    # print("owner_following: ", owner_following)
    # print("repo_watchers: ", repo_watchers)
    # print("repo_forks: ", repo_forks)
    # print("repo_open_issues: ", repo_open_issues)
    # print("total_commits: ", total_commits)
    # print("commit_frequency: ", commit_frequency)

    # Score each metric based on predefined thresholds and points
    scores = {
        "owner_followers": score_metric(owner_followers, THRESHOLDS["owner_followers"], POINTS["owner_followers"]),
        "owner_following": score_metric(owner_following, THRESHOLDS["owner_following"], POINTS["owner_following"]),
        "repo_watchers": score_metric(repo_watchers, THRESHOLDS["repo_watchers"], POINTS["repo_watchers"]),
        "repo_forks": score_metric(repo_forks, THRESHOLDS["repo_forks"], POINTS["repo_forks"]),
        "repo_open_issues": score_metric(repo_open_issues, THRESHOLDS["repo_open_issues"], POINTS["repo_open_issues"]),
        "total_commits": score_metric(total_commits, THRESHOLDS["total_commits"], POINTS["total_commits"]),
        "commit_frequency": score_metric(commit_frequency, THRESHOLDS["commit_frequency"], POINTS["commit_frequency"])
    }
    
    # print(scores)
    # Calculate the sum of scores
    total = sum(scores.values())
    # print("TOTAL: ", total)

    # Ensure the score is between 0 and 100
    tech_score = min(max(total, 0), 100)
    
    return tech_score