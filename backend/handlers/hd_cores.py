from datetime import datetime, timedelta, timezone
from typing import Union
import jwt
from backend.token import SECRET_KEY, ALGORITHM
from fastapi import Request, HTTPException
from backend.database.rdbms.tbl_users import Tbl_Users

class HD_Cores():
    @staticmethod
    def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def decode_access_token(hashed_token: str) -> dict:
        # TODO: 處理解析失敗
        payload = jwt.decode(hashed_token, SECRET_KEY, algorithms=ALGORITHM)
        return payload
    
    @staticmethod
    def get_cur_user_by_req(req: Request) -> dict:
        token = req.cookies.get("access_token")
        if token is None:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        payload = HD_Cores.decode_access_token(token)
        if payload is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user_id = payload.get("sub")
        user_info = Tbl_Users().find_an_user_by_id(user_id=user_id)

        if not user_info:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user_info