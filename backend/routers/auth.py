from fastapi import APIRouter
from backend.schemas.users import Register

auth = APIRouter(prefix="/auth", tags=["Authentication"])

@auth.post("/register")
async def register_user(register_user: Register):
    print(register_user)
    return {"status": 1}

@auth.post("/login")
async def login_user():
    return {}