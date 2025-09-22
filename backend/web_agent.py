import os
from openai import OpenAI
from dotenv import load_dotenv
import asyncio
load_dotenv()

import sys
sys.path.append(r"d:\AI workspace\Agentic_demo\openai_agent_sdk_env\Lib\site-packages")

import asyncio
from dataclasses import dataclass
from agents import Agent, Runner, WebSearchTool
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Web Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = Agent(
    name="WebAgent",
    instructions="Use web search to answer questions.",
    tools=[WebSearchTool()]
)

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

@app.post("/search", response_model=QueryResponse)
async def search_endpoint(request: QueryRequest):
    result = await Runner.run(agent, request.question)
    return QueryResponse(answer=result.final_output)

@app.get("/")
async def root():
    return {"message": "Web Agent API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)