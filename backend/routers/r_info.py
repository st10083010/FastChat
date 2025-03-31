from fastapi import Depends, APIRouter
from backend.handlers.hd_cores import HD_Cores

info = APIRouter(prefix="/info", tags=["Information"])

@info.get("/me")
def read_me(cur_user=Depends(HD_Cores.get_cur_user_by_req)):
    # TODO: 測試登入
    return {"username": cur_user.username}