from fastapi import FastAPI
from app.routes.classify import router as classify_router

app = FastAPI(title="Flowzen AI Orchestrator")

app.include_router(classify_router)

@app.get("/")
def health():
    return {"status": "Flowzen AI running"}