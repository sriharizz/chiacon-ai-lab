import os
import json
import time
import re
import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types

from schemas import ConsultantResponse, GenerateRequest
from prompt import SYSTEM_PROMPT

load_dotenv()

app = FastAPI(title="Chiacon AI Pocket Consultant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY not set!")
client = genai.Client(api_key=api_key)

# Model cascade: try Pro first, fallback to Flash
MODELS = ["gemini-2.5-pro", "gemini-2.5-flash"]


def call_gemini(model_name: str, problem: str) -> ConsultantResponse:
    """Call Gemini with a specific model. Raises on failure."""
    response = client.models.generate_content(
        model=model_name,
        contents=f"Analyze this business problem and provide a strategic AI implementation assessment:\n\n{problem}",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            response_schema=ConsultantResponse,
            temperature=0.7,
        ),
    )
    result = json.loads(response.text)
    return ConsultantResponse(**result)


@app.get("/health")
async def health_check():
    return {"status": "ok", "api_key_set": bool(api_key)}


@app.post("/api/generate", response_model=ConsultantResponse)
async def generate_analysis(request: GenerateRequest):
    problem = request.business_problem.strip()
    if not problem:
        raise HTTPException(status_code=400, detail="Business problem cannot be empty")
    if len(problem.split()) < 4:
        raise HTTPException(status_code=400, detail="Please describe your business problem in more detail (at least 5 words).")

    # Guardrail: Intercept conversational inputs instantly
    problem_lower = problem.lower()
    conversational_starts = [
        "hi", "hello", "hey", "how are you", "who are you", "tell me", "what is", "test", "testing",
        "what's up", "whats up", "good morning", "good afternoon", "good evening", "greetings", 
        "yo ", "sup", "are you there", "can you", "do you", "i want to", "help me", "write a", "ignore all"
    ]
    if any(problem_lower.startswith(x) for x in conversational_starts) and len(problem.split()) < 15:
        return ConsultantResponse(
            executive_synthesis="Your input appears to be conversational or a test. Please provide a specific business challenge, process, or operational bottleneck for analysis. (e.g., 'Spending 200 hours a month on manual invoicing').",
            strategic_roadmap=[
                {"phase": "Invalid Input", "title": "Awaiting Business Problem", "description": "Please enter a valid business problem above to generate a strategic roadmap. We need a specific operational challenge.", "key_technologies": ["N/A", "N/A", "N/A"]},
                {"phase": "Invalid Input", "title": "Awaiting Business Problem", "description": "Please enter a valid business problem above to generate a strategic roadmap. We need a specific operational challenge.", "key_technologies": ["N/A", "N/A", "N/A"]},
                {"phase": "Invalid Input", "title": "Awaiting Business Problem", "description": "Please enter a valid business problem above to generate a strategic roadmap. We need a specific operational challenge.", "key_technologies": ["N/A", "N/A", "N/A"]}
            ],
            business_impact={
                "roi_metrics": ["Awaiting Input", "Awaiting Input", "Awaiting Input"],
                "cost_of_inaction": ["Awaiting Input", "Awaiting Input", "Awaiting Input"]
            }
        )

    last_error = None

    for model in MODELS:
        try:
            print(f"[{model}] Calling Gemini...")
            result = call_gemini(model, problem)
            print(f"[{model}] SUCCESS")
            return result

        except Exception as e:
            error_str = str(e)
            last_error = error_str
            print(f"[{model}] FAILED: {error_str[:200]}")

            # If rate limited, try the next model immediately
            if any(x in error_str for x in ["429", "RESOURCE_EXHAUSTED", "RetryInfo", "503"]):
                print(f"[{model}] Rate limited, falling back to next model...")
                continue
            else:
                # Non-rate-limit error: still try next model
                print(f"[{model}] Non-rate-limit error, trying fallback...")
                continue

    # All models failed — try Flash one more time with a short wait
    try:
        print("[LAST RESORT] Waiting 5s then retrying Flash...")
        time.sleep(5)
        result = call_gemini("gemini-2.5-flash", problem)
        print("[LAST RESORT] SUCCESS")
        return result
    except Exception as e:
        print(f"[LAST RESORT] FAILED: {str(e)[:200]}")

    raise HTTPException(
        status_code=500,
        detail="AI service is temporarily overloaded. Please try again in 30 seconds.",
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
