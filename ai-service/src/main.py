from fastapi import FastAPI
from pydantic import BaseModel
import openai
import json

app = FastAPI()

class LogRequest(BaseModel):
    log: str

# Fake knowledge base
with open("kb.json") as f:
    KB = json.load(f)

def simple_rag(log):
    for item in KB:
        if item["keyword"].lower() in log.lower():
            return item["issue"], item["fix"]
    return "No similar issue found", "Try checking logs manually"

@app.post("/analyze")
def analyze(req: LogRequest):
    log = req.log

    # 🔹 Simple summary (you can replace with OpenAI)
    summary = log[:200]

    similar, fix = simple_rag(log)

    return {
        "summary": summary,
        "similar": similar,
        "fix": fix
    }