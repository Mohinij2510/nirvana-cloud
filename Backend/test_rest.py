import requests

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCDh1T0fCdKk2Uhk36gUvhZ3fVFOcZRJJk"

payload = {
  "contents": [{
    "parts":[{"text": "Explain how AI works"}]
    }]
   }

response = requests.post(url, json=payload, headers={'Content-Type': 'application/json'})

print("Status:", response.status_code)
print(response.json())
