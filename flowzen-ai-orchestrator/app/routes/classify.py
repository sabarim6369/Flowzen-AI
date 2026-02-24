from fastapi import APIRouter
from app.schemas.ticket import TicketInput
from app.services.llm import classify_ticket

router = APIRouter()

@router.post("/classify-ticket")
def classify(req: TicketInput):
    result = classify_ticket(req.text)
    return result