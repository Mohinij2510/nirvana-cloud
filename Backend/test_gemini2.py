import google.generativeai as genai
try:
    genai.configure(api_key="AIzaSyCDh1T0fCdKk2Uhk36gUvhZ3fVFOcZRJJk")
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content("Hello")
    print("SUCCESS")
    print(response.text)
except Exception as e:
    print("FAILED")
    print("Error:", e)
