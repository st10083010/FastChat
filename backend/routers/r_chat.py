from fastapi import APIRouter, Depends
from backend.schemas.messages import MsgIn, MsgOut
from backend.database.rdbms.dependency import get_table
from backend.database.rdbms.tbl_chat_content import Tbl_ChatContent

chat = APIRouter(prefix="/chat", tags=["Chat CRUD"])

@chat.get("/msg/{room_id}", response_model=list[MsgOut])
def get_msgs(room_id: int, table=Depends(get_table(Tbl_ChatContent))):
    # 取得訊息
    result = table.find_chat_content_by_room_id(room_id)

    return result

@chat.post("/msg/{room_id}")
def post_msg(room_id: int, msg: MsgIn, table=Depends(get_table(Tbl_ChatContent))):
    # 新增訊息
    result = {
        "state": "success"
    }

    table.insert_chat_content(room_id, msg.sender_id, msg.content)
    return result