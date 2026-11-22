from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/ping")
def check_connection():
    return {"message": "pong"}

class EchoRequest(BaseModel):
    text : str

@app.post("/echo")
def get_echo(echo_request:EchoRequest):
    return {"text": echo_request.text}