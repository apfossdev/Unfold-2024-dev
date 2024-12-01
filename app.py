from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

def analyze_twitter_profile(twitter_link):
    # Placeholder function to analyze Twitter profile
    # Implement your analysis logic here
    return {"social_score": 75}

def analyze_github_repo(github_link):
    # Placeholder function to analyze GitHub repo
    # Implement your analysis logic here
    return {"tech_score": 85}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    twitter_link = data.get('twitter_link')
    github_link = data.get('github_link')

    if not twitter_link or not github_link:
        return jsonify({"error": "Both Twitter and GitHub links are required"}), 400

    twitter_analysis = analyze_twitter_profile(twitter_link)
    github_analysis = analyze_github_repo(github_link)

    response = {
        "social_score": twitter_analysis["social_score"],
        "tech_score": github_analysis["tech_score"]
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)