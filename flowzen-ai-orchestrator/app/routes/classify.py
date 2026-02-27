from fastapi import APIRouter
from app.schemas.ticket import TicketInput, TicketClassificationResponse
from app.services.llm import classify_ticket

router = APIRouter()

@router.post("/classify-ticket", response_model=TicketClassificationResponse)
def classify(req: TicketInput):
    result = classify_ticket(req.text)
    return {
        "description": req.text,
        "category": result.category,
        "priority": result.priority,
        "department": result.department
    }