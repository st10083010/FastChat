from fastapi import APIRouter, status, Response
from backend.schemas.users import Register, Users
from argon2 import PasswordHasher
from backend.database.rdbms.tbl_users import Tbl_Users

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
    # TODO: 錯誤處理、JWT登入處理
    result = {
        "code": 1,
        "msg": "login Successful."
    }

    plain_text_pw = login_user.password
    tbl_users = Tbl_Users()

    # 查詢使用者
    user_info = tbl_users.find_an_user_by_email(login_user.email)

    # 驗證密碼
    ph = PasswordHasher()
    is_correct = ph.verify(user_info['password'], plain_text_pw)

    # TODO: 密碼錯誤會直接引發 argon2.exceptions.VerifyMismatchError 
    # 要另外處理

    # 更新 hash 值
    if ph.check_needs_rehash(user_info['password']):
        new_hashed_pw = ph.hash(plain_text_pw)
        tbl_users.update_user_password_hash_value(new_hashed_pw=new_hashed_pw, user_id=user_info['id'])

    return result