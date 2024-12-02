import json
import os
from urllib.parse import urlparse
import requests
from .project_health import calculate_commit_frequency, calculate_issue_resolution_time
from .anomaly_detection import detect_anomalies
from .sentiment_analysis import analyze_commit_sentiments
from .tech_score import calculate_tech_score

def analyze_github_repo(github_link):
    parsed_url = urlparse(github_link)
    path_parts = parsed_url.path.strip('/').split('/')
    
    if len(path_parts) < 2:
        return {"error": "Invalid GitHub link"}
    
    owner = path_parts[0]
    repo = path_parts[1]
    
    # Fetch owner details from GitHub API
    owner_details = fetch_github_user_details(owner)
    if "error" in owner_details:
        return owner_details
    
    # Fetch repository details from GitHub API
    repo_details = fetch_github_repo_details(owner, repo)
    if "error" in repo_details:
        return repo_details
    
    # Fetch total counts
    total_commits = fetch_total_count(owner, repo, "commits")
    total_issues = fetch_total_count(owner, repo, "issues")
    total_pull_requests = fetch_total_count(owner, repo, "pulls")
    
    # Fetch recent data
    commits = fetch_recent_commits(owner, repo, 5)
    issues = fetch_recent_issues(owner, repo, 5)
    pull_requests = fetch_recent_pull_requests(owner, repo, 5)
    topics = fetch_github_repo_topics(owner, repo)
    
    result = {
        "owner": {
            "name": owner_details.get("name"),
            "username": owner_details.get("login"),
            "followers": owner_details.get("followers"),
            "following": owner_details.get("following")
        },
        "repo": {
            "name": repo_details.get("name"),
            "watchers": repo_details.get("watchers_count"),
            "forks": repo_details.get("forks_count"),
            "open_issues": repo_details.get("open_issues_count"),
            "total_commits": total_commits,
            "total_pull_requests": total_pull_requests
        },
        "commits": [
            {
                "message": commit["commit"]["message"],
                "committer": commit["commit"]["committer"]["name"],
                "committed_at": commit["commit"]["committer"]["date"]
            } for commit in commits
        ],
        "issues": [
            {
                "title": issue["title"],
                "body": issue["body"],
                "raised_by": issue["user"]["login"],
                "state": issue["state"],
                "created_at": issue["created_at"],
                "closed_at": issue.get("closed_at")
            } for issue in issues
        ],
        "pull_requests": [
            {
                "title": pr["title"],
                "body": pr["body"],
                "raised_by": pr["user"]["login"],
                "state": pr["state"],
                "created_at": pr["created_at"],
                "closed_at": pr.get("closed_at"),
                "merged_at": pr.get("merged_at")
            } for pr in pull_requests
        ],
        "topics": topics.get("names", [])
    }
    
    # Calculate Project Health
    commit_frequency = calculate_commit_frequency(result["commits"])
    # issue_resolution_time = calculate_issue_resolution_time(result["issues"])
    
    # Anomaly Detection
    # anomalies = detect_anomalies(result["commits"])
    
    # Sentiment Analysis
    # commit_sentiments = analyze_commit_sentiments(result["commits"])
    
    # Calculate Tech Score
    tech_score = calculate_tech_score(
        owner_followers=owner_details.get("followers", 0),
        owner_following=owner_details.get("following", 0),
        repo_watchers=repo_details.get("watchers_count", 0),
        repo_forks=repo_details.get("forks_count", 0),
        repo_open_issues=repo_details.get("open_issues_count", 0),
        total_commits=total_commits,
        commit_frequency=commit_frequency
    )
    
    result["commit_frequency"] = commit_frequency
    # result["issue_resolution_time"] = issue_resolution_time
    # result["anomalies"] = anomalies.tolist()
    # result["commit_sentiments"] = commit_sentiments
    result["tech_score"] = tech_score
    
    # Write the result to temp.json
    # with open('temp.json', 'w') as f:
    #     json.dump(result, f, indent=4)
    
    return result

def fetch_github_user_details(username):
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch user details"}
    
    return response.json()

def fetch_github_repo_details(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch repository details"}
    
    return response.json()

def fetch_total_count(owner, repo, endpoint):
    url = f"https://api.github.com/repos/{owner}/{repo}/{endpoint}?per_page=1"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": f"Failed to fetch {endpoint} count"}
    
    if 'Link' in response.headers:
        links = response.headers['Link']
        last_page_url = [link for link in links.split(',') if 'rel="last"' in link]
        if last_page_url:
            last_page_url = last_page_url[0].split(';')[0].strip('<> ')
            last_page_response = requests.get(last_page_url)
            if last_page_response.status_code == 200:
                last_page_data = last_page_response.json()
                page_num = int(last_page_url.split('page=')[-1])
                return (page_num - 1) * 1 + len(last_page_data)
    
    return len(response.json())

def fetch_recent_commits(owner, repo, count):
    url = f"https://api.github.com/repos/{owner}/{repo}/commits?per_page={count}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch commits"}
    
    return response.json()

def fetch_recent_issues(owner, repo, count):
    url = f"https://api.github.com/repos/{owner}/{repo}/issues?per_page={count}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch issues"}
    
    return response.json()

def fetch_recent_pull_requests(owner, repo, count):
    url = f"https://api.github.com/repos/{owner}/{repo}/pulls?per_page={count}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch pull requests"}
    
    return response.json()

def fetch_github_repo_topics(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}/topics"
    headers = {"Accept": "application/vnd.github.mercy-preview+json"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch topics"}
    
    return response.json()

# Example usage
# if __name__ == "__main__":
#     github_link = "https://github.com/calcom/cal.com"
#     result = analyze_github_repo(github_link)