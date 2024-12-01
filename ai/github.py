from urllib.parse import urlparse

def analyze_github_repo(github_link):
    parsed_url = urlparse(github_link)
    path_parts = parsed_url.path.strip('/').split('/')
    
    if len(path_parts) < 2:
        return {"error": "Invalid GitHub link"}
    
    owner = path_parts[0]
    repo = path_parts[1]
    
    # Placeholder for actual analysis logic
    return {"owner": owner, "repo": repo, "tech_score": 85}