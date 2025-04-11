from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class MsgIn(BaseModel):
    sender_id: int = Field(..., description="發送者的使用者 ID")
    content: str = Field(..., max_length=1000, description="訊息內容")

class MsgOut(BaseModel):
    id: int
    room_id: int
    sender_id: int
    content: Optional[str]  # 若未來支援收回訊息可為 None
    send_datetime: datetime
    is_delete: int
