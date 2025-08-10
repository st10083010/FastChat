from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, Query
from backend.schemas.messages import MsgIn, MsgOut
from backend.database.rdbms.dependency import get_table
from backend.database.rdbms.tbl_chat_content import Tbl_ChatContent
from backend.handlers.hd_cores import HD_Cores

chat = APIRouter(prefix="/chat", tags=["Chat CRUD"])

# 儲存所有聊天室連線
room_connections: dict[str, list[WebSocket]] = {}

@chat.get("/msg/{room_id}/{user_id}", response_model=list[MsgOut])
def get_msgs(room_id: int, user_id: int, table=Depends(get_table(Tbl_ChatContent))):
    # 取得訊息
    result = table.find_chat_content_by_room_id(room_id, user_id)
    # user_id僅在必要時做權限驗證，不參與聊天訊息查詢
    # print("GET MSG: ", result)

    return result

@chat.post("/msg/{room_id}")
def post_msg(room_id: int, msg: MsgIn, table=Depends(get_table(Tbl_ChatContent))):
    # 新增訊息
    result = {
        "state": "success"
    }

    table.insert_chat_content(room_id, msg.sender_id, msg.content, msg.client_id)
    return result

@chat.websocket("/ws/{room_id}")
async def ws_endpoint(websocket: WebSocket, room_id: str, token: str = Query(None)):
    # token 與身分驗證
    await websocket.accept() # 先接受連線，身分權限不合格再關閉

    # 檢查token
    if not token:
        await websocket.close(code=4401, reason="missing_token")
        return

    # 嘗試解碼
    try:
        payload = HD_Cores.decode_access_token(token)
        if payload is None:
            # 沒通過身份驗證
            await websocket.close(code=1008)
            return

    except Exception as e:
        # print(f"Error: {e}")
        await websocket.close(code=4401)  # 自訂：token_expired / invalid
        return

    # 將此用戶加入對應房間的連線清單
    if room_id not in room_connections:
        room_connections[room_id] = []
    room_connections[room_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_json()

            # 發送給該聊天室所有人
            for conn in room_connections[room_id]:
                await conn.send_json(data)

    except WebSocketDisconnect:
        # 使用者中斷連線時，從房間移除該 socket
        room_connections[room_id].remove(websocket)
        if not room_connections[room_id]:
            del room_connections[room_id]