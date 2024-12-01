import json

def calculate_average_metrics(tweets):
    total_likes = sum(tweet['likes'] for tweet in tweets)
    total_reposts = sum(tweet['repost'] for tweet in tweets)
    total_replies = sum(tweet['replies'] for tweet in tweets)
    total_bookmarks = sum(tweet['bookmarks'] for tweet in tweets)
    total_views = sum(tweet['views'] for tweet in tweets)
    
    count = len(tweets)
    
    avg_likes = total_likes / count if count else 0
    avg_reposts = total_reposts / count if count else 0
    avg_replies = total_replies / count if count else 0
    avg_bookmarks = total_bookmarks / count if count else 0
    avg_views = total_views / count if count else 0
    
    return {
        "avg_likes": avg_likes,
        "avg_reposts": avg_reposts,
        "avg_replies": avg_replies,
        "avg_bookmarks": avg_bookmarks,
        "avg_views": avg_views
    }