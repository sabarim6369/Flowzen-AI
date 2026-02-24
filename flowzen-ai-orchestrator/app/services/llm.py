from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from app.schemas.ticket import TicketClassification
from app.core.config import GROQ_API_KEY

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="llama-3.1-8b-instant",
    temperature=0
)

parser = PydanticOutputParser(pydantic_object=TicketClassification)

prompt = PromptTemplate(
    template="""
You are an AI support ticket classifier.

Analyze the ticket and return structured JSON.

{format_instructions}

Ticket:
{ticket}
""",
    input_variables=["ticket"],
    partial_variables={
        "format_instructions": parser.get_format_instructions()
    }
)

def classify_ticket(ticket_text: str) -> TicketClassification:
    chain = prompt | llm | parser
    return chain.invoke({"ticket": ticket_text})