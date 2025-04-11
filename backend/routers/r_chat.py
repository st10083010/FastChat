from fastapi import APIRouter
from backend.schemas.messages import MsgIn, MsgOut

chat = APIRouter(prefix="/chat", tags=["Chat CRUD"])

@chat.get("/msg/{room_id}", response_model=list[MsgOut])
def get_msgs(room_id: int):
    ...

@chat.post("/msg/{room_id}", response_model=dict)
def add_msg(room_id: int):
    ...