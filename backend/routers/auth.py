from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register_user():
    return {}

@router.post("/login")
async def login_user():
    return {}
