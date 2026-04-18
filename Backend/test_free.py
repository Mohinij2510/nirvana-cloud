import requests
import json

url = "https://text.pollinations.ai/openai"
payload = {
    "messages": [
        {"role": "system", "content": "You are a mental wellness companion named Nova."},
        {"role": "user", "content": "I feel stressed"}
    ],
    "model": "openai"
}

try:
    response = requests.post(url, json=payload)
    print(response.status_code)
    print(response.json()["choices"][0]["message"]["content"])
except Exception as e:
    print(e)
