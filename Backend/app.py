from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# 🔐 Gemini API setup
genai.configure(api_key="AIzaSyCDh1T0fCdKk2Uhk36gUvhZ3fVFOcZRJJk")
model = genai.GenerativeModel("gemini-1.5-flash")

import sqlite3

DATABASE = 'app.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date TEXT,
            time TEXT,
            description TEXT,
            email TEXT,
            contact TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

import requests

# -------------------------
# Chatbot API (Free AI LLM)
# -------------------------
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"reply": "Please say something."})

    url = "https://text.pollinations.ai/openai"
    payload = {
        "messages": [
            {"role": "system", "content": "You are Nova, a compassionate mental wellness companion. You give short, empathetic, and truly helpful advice."},
            {"role": "user", "content": user_message}
        ],
        "model": "openai"
    }

    try:
        req = requests.post(url, json=payload, headers={'Content-Type': 'application/json'})
        if req.status_code == 200:
            reply = req.json()["choices"][0]["message"]["content"]
        else:
            reply = "I'm here for you, but my AI circuits are slightly overwhelmed right now."
    except Exception as e:
        print("AI Error:", e)
        reply = "Sorry, I'm having trouble connecting to my AI brain."
    
    return jsonify({"reply": reply})

# -------------------------
# Auth APIs
# -------------------------
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    role = data.get('role') # 'therapist' or 'patient'
    
    if not email or not password or not name or not role:
        return jsonify({"message": "Missing fields"}), 400
        
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    if user:
        conn.close()
        return jsonify({"message": "User already exists"}), 400
        
    conn.execute('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
                 (email, password, name, role))
    conn.commit()
    conn.close()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()
    
    if user and user['password'] == password:
        return jsonify({
            "message": "Login successful",
            "profile_name": user["name"],
            "email": email,
            "role": user["role"]
        }), 200
    
    return jsonify({"message": "Invalid email or password"}), 401

# -------------------------
# Appointment APIs
# -------------------------
@app.route('/api/appointments/add', methods=['POST'])
def add_appointment():
    data = request.json
    conn = get_db_connection()
    conn.execute('''
        INSERT INTO appointments (name, date, time, description, email, contact)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data.get('name'), data.get('date'), data.get('time'), data.get('description'), data.get('email'), data.get('contact')))
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "data": data}), 200

@app.route('/api/appointments', methods=['GET'])
def get_appointments_by_date():
    date = request.args.get('date')
    email = request.args.get('email') # For filtering to patient
    
    conn = get_db_connection()
    query = 'SELECT * FROM appointments WHERE 1=1'
    params = []
    
    if date:
        query += ' AND date = ?'
        params.append(date)
    if email:
        query += ' AND email = ?'
        params.append(email)
        
    appointments = conn.execute(query, tuple(params)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in appointments])

@app.route('/api/appointments/month', methods=['GET'])
def get_appointments_by_month():
    month = request.args.get('month').zfill(2)
    year = request.args.get('year')
    email = request.args.get('email') # For filtering to patient
    
    year_month = f"{year}-{month}%"
    
    conn = get_db_connection()
    query = 'SELECT * FROM appointments WHERE date LIKE ?'
    params = [year_month]
    
    if email:
        query += ' AND email = ?'
        params.append(email)
        
    appointments = conn.execute(query, tuple(params)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in appointments])

@app.route('/api/appointments/reset', methods=['POST'])
def reset_appointments():
    conn = get_db_connection()
    conn.execute('DELETE FROM appointments')
    conn.commit()
    conn.close()
    return jsonify({"message": "All appointments cleared."})

@app.route('/api/appointments/update', methods=['POST'])
def update_appointment():
    data = request.json
    date = data.get('date')
    name = data.get('name')
    new_time = data.get('time')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE appointments SET time = ? WHERE name = ? AND date = ?', (new_time, name, date))
    conn.commit()
    updated = cursor.rowcount > 0
    conn.close()

    if updated:
        return jsonify({"message": "Appointment updated"}), 200
    else:
        return jsonify({"message": "Appointment not found"}), 404

# -------------------------
# Root route (for testing)
# -------------------------
@app.route('/')
def home():
    return "Backend is running 🚀"

# -------------------------
# Run server (IMPORTANT)
# -------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)