from flask import Flask, jsonify
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

@app.route('/')
def health_check():
    return jsonify({'status': 'ok'})

@app.route('/auth/spotify')
def auth_spotify():
    return jsonify({'message': 'Spotify OAuth start (placeholder)'})

@app.route('/callback/spotify')
def callback_spotify():
    return jsonify({'message': 'Spotify OAuth callback (placeholder)'})

@app.route('/playlist')
def get_playlist():
    return jsonify({'message': 'Get playlist (placeholder)'})

@app.route('/analyze')
def analyze_playlist():
    return jsonify({'message': 'Analyze playlist (placeholder)'})

@app.route('/journal')
def generate_journal():
    return jsonify({'message': 'Generate journal prompt (placeholder)'})

if __name__ == '__main__':
    app.run(debug=True) 