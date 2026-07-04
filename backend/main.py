from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Nexus AI Backend Running 🚀"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        reader = PdfReader(file.file)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text

        if len(text.strip()) == 0:
            return {
                "error": "No readable text found in the PDF."
            }

        prompt = f"""
You are Nexus AI.

Analyze the following PDF.

You are Nexus AI.

Analyze the uploaded PDF professionally.

Return Markdown in this format:

# 📄 Executive Summary

Explain the document in 5-8 lines.

# 🔑 Key Insights

• Important point 1

• Important point 2

• Important point 3

• Important point 4

# ⚠ Risks / Issues

Mention risks if any, otherwise write "No major risks found."

# ✅ Action Items

Provide 5 practical action items.

# ⭐ Final Verdict

Give an overall conclusion in 2-3 lines.

Document:

{text[:30000]}
"""

        response = model.generate_content(prompt)

        return {
            "filename": file.filename,
            "characters": len(text),
            "summary": response.text
        }

    except Exception as e:
        return {
            "error": str(e)
        }