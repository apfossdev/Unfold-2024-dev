from textblob import TextBlob

def analyze_commit_sentiments(commits):
    sentiments = []
    for commit in commits:
        message = commit.get('message', '')
        if message:
            sentiment = TextBlob(message).sentiment.polarity
            sentiments.append(sentiment)
    avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
    return avg_sentiment