import json
from urllib.parse import urlparse
from .tweets_analysis import calculate_average_metrics
from .social_score import calculate_social_score

def extract_twitter_username(twitter_link):
    parsed_url = urlparse(twitter_link)
    path_parts = parsed_url.path.strip('/').split('/')
    
    if len(path_parts) < 1:
        return {"error": "Invalid Twitter link"}
    
    username = path_parts[0]
    return username

def analyze_twitter_profile(twitter_link):
    username = extract_twitter_username(twitter_link)
    if "error" in username:
        return username
    
    with open('./ai/twitter/tweets.json', 'r') as f:
        tweets_data = json.load(f)
        
    if username not in tweets_data.keys():
        return {"error": "No tweets found for the user"}
    
    results = analyze_profile(tweets_data[username])
    # print(json.dumps(results, indent=4))
    
    return {"username": username, "twitter_metrics": results["average_metrics"], "social_score": results["social_score"]}

def analyze_profile(tweets):
    
    avg_metrics = calculate_average_metrics(tweets)
    social_score = calculate_social_score(
        avg_likes=avg_metrics["avg_likes"],
        avg_reposts=avg_metrics["avg_reposts"],
        avg_replies=avg_metrics["avg_replies"],
        avg_bookmarks=avg_metrics["avg_bookmarks"],
        avg_views=avg_metrics["avg_views"]
    )
    
    results = {
        "average_metrics": avg_metrics,
        "social_score": social_score
    }
    
    return results

# Example usage
# if __name__ == "__main__":
#     twitter_link = "https://twitter.com/jeyasuryaur"
#     profile_result = analyze_twitter_profile(twitter_link)
    
    