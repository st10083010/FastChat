from fastapi import APIRouter, status, Response, HTTPException, Request
from fastapi.responses import JSONResponse
from backend.schemas.users import Register, Users
from argon2 import PasswordHasher
from backend.database.rdbms.tbl_users import Tbl_Users
from backend.handlers.hd_cores import HD_Cores

auth = APIRouter(prefix="/auth", tags=["Authentication"])

@auth.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(register_user: Register, response: Response):
    # TODO: 錯誤處理、重複註冊、回傳結果整合
    result = {
        "code": 1,
        "msg": "Create Successful."
    }

    # Hash處理
    ph = PasswordHasher()
    hashed_pw = ph.hash(register_user.password)
    user_info = [register_user.username, hashed_pw, register_user.email]
    Tbl_Users().create_new_user(user_info=user_info)

    response.status_code = status.HTTP_201_CREATED

    return result

@auth.post("/login")
async def login_user(login_user: Users):
    # TODO: 錯誤處理
    result = {
        "code": 0,
        "msg": "login failed.",
        "access_token": "",
        "user_info": {
            "id": 0,
            "username": "",
            "email": ""
        }
    }

    plain_text_pw = login_user.password
    tbl_users = Tbl_Users()

    # 查詢使用者
    user_info = tbl_users.find_an_user_by_email(login_user.email)
    if user_info is None:
        raise HTTPException(status_code=404, detail="User not found")
    # print(user_info)

    # 驗證密碼
    ph = PasswordHasher()
    is_correct = ph.verify(user_info['password'], plain_text_pw)

    # TODO: 密碼錯誤會直接引發 argon2.exceptions.VerifyMismatchError 
    # 要另外處理

    # 更新 hash 值
    if ph.check_needs_rehash(user_info['password']):
        new_hashed_pw = ph.hash(plain_text_pw)
        tbl_users.update_user_password_hash_value(new_hashed_pw=new_hashed_pw, user_id=user_info['id'])

    payload = {"sub": str(user_info['id'])}
    access = HD_Cores.create_access_token(payload) # 15 mins
    refresh = HD_Cores.create_refresh_token(payload) # 7 days

    result["code"] = 1
    result['msg'] = "login Successful."
    result['access_token'] = access
    result['user_info']['id'] = user_info['id']
    result['user_info']['username'] = user_info['username']
    result['user_info']['email'] = user_info['email']

    res = JSONResponse(content=result)

    res.set_cookie("refresh_token", refresh, httponly=True, samesite="lax", secure=False, path="/auth")
    return res

@auth.post("/logout")
async def logout_user(response: Response):
    # 登出使用者
    response.delete_cookie("refresh_token", path="/auth")
    # print(response.body)

    result = {
        "code": 1,
        "msg": "Logged out"
    }

    return result

@auth.post("/refresh")
async def refresh_token(request: Request, response: Response):
    rt = request.cookies.get("refresh_token")
    if not rt:
        raise HTTPException(status_code=401, detail="no_refresh")
    try:
        payload = HD_Cores.decode_refresh_token(rt)
    except Exception:
        raise HTTPException(status_code=401, detail="refresh_invalid")

    new_access = HD_Cores.create_access_token({"sub": payload["sub"]})
    new_refresh = HD_Cores.create_refresh_token({"sub": payload["sub"]})
    response.set_cookie("refresh_token", new_refresh, httponly=True, samesite="lax", secure=False, path="/auth")
    return {"access_token": new_access, "token_type": "bearer", "expires_in": 900}