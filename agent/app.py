from flask import Flask, request, jsonify, render_template
import requests
import json
from ai.twitter import analyze_twitter_profile
from ai.github import analyze_github_repo

app = Flask(__name__)

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

    if "error" in github_analysis:
        return jsonify(github_analysis), 400

    response = {
        "social_metrics": twitter_analysis,
        "tech_metrics": github_analysis,
    }
    
    with open('temp.json', 'w') as f:
        json.dump(response, f, indent=4)

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)