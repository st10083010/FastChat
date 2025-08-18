from fastapi import APIRouter, Depends, HTTPException, Query
from backend.handlers.hd_cores import HD_Cores
from backend.database.rdbms.tbl_users import Tbl_Users
from backend.database.rdbms.tbl_dm_rooms import Tbl_DMRooms
from pprint import pprint

dm = APIRouter(prefix="/chat/dm", tags=["Direct Message"])

def make_dm_room_id(u1: int, u2: int) -> str:
    """產生固定的 DM room_id"""
    a, b = sorted([u1, u2])
    return f"dm_{a}-{b}"

@dm.post("/open")
def open_dm(target_id: int, me=Depends(HD_Cores.get_cur_user_by_req)):
    """
    建立或取得 1 對 1 聊天室的 room_id
    """
    if target_id == me["id"]:
        raise HTTPException(status_code=400, detail="不能與自己建立私訊")

    # 確認對方存在
    is_target_exist = Tbl_Users().find_an_user_by_id(target_id)
    if not is_target_exist:
        raise HTTPException(status_code=404, detail="使用者不存在")

    result = Tbl_DMRooms().create_dm_room_and_return_room_info(me['id'], target_id)
    # pprint(result, sort_dicts=False)
    if result is None:
        raise HTTPException(status_code=404, detail="私訊不存在")

    return {"room_id": result['id']}

@dm.get("/recent")
def recent_dm(limit: int = Query(15, ge=1, le=50), me=Depends(HD_Cores.get_cur_user_by_req)):
    """近期15筆的 DM"""
    rows = Tbl_DMRooms().find_recent_rooms_for_user(me["id"], limit=limit)

    result = []

    if len(rows) > 0:
        for r in rows:
            item = {
                "room_id": r["room_id"],
                "last_at": r["last_at"],
                "peer_id": r["peer_id"],
                "peer_username": r["peer_username"]
            }
            result.append(item)

    return result
