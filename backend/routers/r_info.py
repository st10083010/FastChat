from fastapi import Depends, APIRouter, Request, HTTPException, Query
from backend.handlers.hd_cores import HD_Cores
from backend.database.rdbms.tbl_users import Tbl_Users
from backend.schemas.users import UserQuery, UserQueryResult
from pprint import pprint

info = APIRouter(prefix="/info", tags=["Personal Information"])

@info.get("/me")
def read_me(cur_user=Depends(HD_Cores.get_cur_user_by_req)):
    # 個人頁面
    return cur_user

@info.get("/who_am_i")
def who_am_i(req: Request):
    """取得使用者資訊"""
    token = req.cookies.get("access_token") # TODO: cookie已經不放access_token
    if token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = HD_Cores.decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid user_id")
    
    user = Tbl_Users().find_an_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    result = {
        "id": user["id"],
        "username": user["username"],
        "email": user['email']
    }

    return result

@info.get("/find", response_model=list[UserQueryResult])
def find_a_user(req: Request, query: UserQuery = Depends()):
    """尋找特定用戶並取得該用戶資訊"""
    exclude_id = None
    if query.exclude_self:
        try:
            me = HD_Cores.get_cur_user_by_req(req)
            exclude_id = me.get("id") if me else None
        except Exception:
            pass

    rows = Tbl_Users().find_a_user_by_username(username=query.username.strip(), limit=query.limit, exclude_id=exclude_id)
    # pprint(rows, sort_dicts=False)

    return rows