from flask import Flask, request, jsonify, render_template, g
import requests
import json
from ai.twitter import analyze_twitter_profile
from ai.github import analyze_github_repo
from drivers import Sqlite3Driver
from contextlib import closing

app = Flask(__name__)
from drivers.integCheck import checkAppInteg, installApp

# Database configuration
def get_db():
    if 'db' not in g:
        g.db = Sqlite3Driver('script.move').connect()
    return g.db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'db'):
        g.db.close()

# Initialize database
with app.app_context():
    db = get_db()
    if checkAppInteg(db) is False:
        installApp(db)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nft', methods=['POST'])
def newPost():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    
    sql = """INSERT INTO nft (
        title, stats, github_url, twitter_url, 
        contract_address, owner_address, tech_score, social_score
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"""
    
    cursor.execute(sql, (
        data.get('title'),
        data.get('stats'),
        data.get('github_url'),
        data.get('twitter_url'),
        data.get('contract_address'),
        data.get('owner_address'),
        data.get('tech_score'),
        data.get('social_score')
    ))
    db.commit()
    return jsonify({"status": 200, "message": "Project added successfully!"}), 200

@app.route('/get-nft', methods=['POST'])
def getPosts():
    data = request.form
    owner_address = data.get('owner_address')
    if not owner_address:
        return jsonify({"status": 400, "message": "Owner address is required"}), 400
        
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM nft WHERE owner_address = ?", (owner_address,))
    posts = cursor.fetchall()
    return jsonify(posts)

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