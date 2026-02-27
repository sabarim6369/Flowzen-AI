from pydantic import BaseModel, Field

class TicketInput(BaseModel):
    text: str

class TicketClassification(BaseModel):
    category: str = Field(description="Ticket category")
    priority: str = Field(description="Low, Medium, High, Critical")
    department: str = Field(description="Responsible department")
    confidence: float = Field(description="0 to 1 confidence score")

class TicketClassificationResponse(BaseModel):
    description: str
    category: str
    priority: str
    department: str