from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # Corrected API Key retrieval

if not GEMINI_API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY is missing! Check your .env file.")

# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# FastAPI app
app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update based on frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models for API request bodies
class SymptomInput(BaseModel):
    symptoms: str

class DrugInput(BaseModel):
    drug_name: str

class DiseaseInput(BaseModel):
    disease_name: str

# API Endpoints
@app.post("/diagnose")
def diagnose_disease(input_data: SymptomInput):
    """Takes symptoms as input and returns possible diseases using AI."""
    try:
        prompt = f"Based on the symptoms: {input_data.symptoms}, what possible diseases could this indicate?"
        response = model.generate_content(prompt)  # ✅ Fixed Gemini AI call
        return {"possible_diseases": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/drug-info")
def get_drug_info(input_data: DrugInput):
    """Fetches drug information, including usage, dosage, and alternatives."""
    try:
        prompt = f"What is the use, dosage, and alternative drugs for {input_data.drug_name}?"
        response = model.generate_content(prompt)  # ✅ Fixed Gemini AI call
        return {"drug_info": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/disease-info")
def get_disease_info(input_data: DiseaseInput):
    """Fetches disease-related details like symptoms, medications, precautions, and diet."""
    try:
        prompt = f"Give details about {input_data.disease_name}, including symptoms, medications, precautions, and diet."
        response = model.generate_content(prompt)  # ✅ Fixed Gemini AI call
        return {"disease_info": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)


