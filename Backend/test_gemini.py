import google.generativeai as genai
try:
    genai.configure(api_key="AIzaSyCDh1T0fCdKk2Uhk36gUvhZ3fVFOcZRJJk")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Hello")
    print("SUCCESS")
    print(response.text)
except Exception as e:
    print("FAILED")
    print("Error:", e)
    import traceback
    traceback.print_exc()
