# Define the thresholds for scoring (these thresholds are hypothetical and should be adjusted based on real data)
THRESHOLDS = {
    "avg_likes": [5, 10, 50, 200],
    "avg_reposts": [3, 8, 25, 100],
    "avg_replies": [3, 8, 25, 100],
    "avg_bookmarks": [1, 5, 10, 50],
    "avg_views": [500, 1000, 5000, 10000]
}

# Define the points for each threshold
POINTS = {
    "avg_likes": [2, 6, 10, 20],
    "avg_reposts": [2, 6, 10, 20],
    "avg_replies": [2, 6, 10, 20],
    "avg_bookmarks": [2, 6, 10, 20],
    "avg_views": [2, 6, 10, 20]
}

def score_metric(value, thresholds, points):
    """Score a metric based on predefined thresholds and points."""
    for i, threshold in enumerate(thresholds):
        if value <= threshold:
            return points[i]
    return points[-1]

def calculate_social_score(avg_likes, avg_reposts, avg_replies, avg_bookmarks, avg_views):
    """
    Calculate the social score for a user based on various metrics.

    Parameters:
    - avg_likes (float): The average number of likes.
    - avg_reposts (float): The average number of reposts.
    - avg_replies (float): The average number of replies.
    - avg_bookmarks (float): The average number of bookmarks.
    - avg_views (float): The average number of views.

    Returns:
    - float: The calculated social score.
    """
    
    # Score each metric based on predefined thresholds and points
    scores = {
        "avg_likes": score_metric(avg_likes, THRESHOLDS["avg_likes"], POINTS["avg_likes"]),
        "avg_reposts": score_metric(avg_reposts, THRESHOLDS["avg_reposts"], POINTS["avg_reposts"]),
        "avg_replies": score_metric(avg_replies, THRESHOLDS["avg_replies"], POINTS["avg_replies"]),
        "avg_bookmarks": score_metric(avg_bookmarks, THRESHOLDS["avg_bookmarks"], POINTS["avg_bookmarks"]),
        "avg_views": score_metric(avg_views, THRESHOLDS["avg_views"], POINTS["avg_views"])
    }

    # Calculate the sum of scores
    total = sum(scores.values())

    # Ensure the score is between 0 and 100
    social_score = min(max(total, 0), 100)
    
    if social_score<40:
        social_score *= 1.5
    
    return social_score