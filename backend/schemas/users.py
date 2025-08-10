from pydantic import BaseModel, EmailStr, Field, field_validator

class Users(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=20)

class Register(Users):
    username: str = Field(..., min_length=3, max_length=20)
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def double_check(cls, confirm_password, values):
        if confirm_password != values.data['password']:
            raise ValueError("密碼與確認密碼不相符")
        return confirm_password
    
class UserQuery(BaseModel):
    # 查詢使用者
    username: str = Field(..., description="username 關鍵字")
    limit: int = Field(15, ge=1, le=50, description="回傳筆數上限")
    exclude_self: bool = Field(True, description="是否排除自己")

class UserQueryResult(BaseModel):
    # 查詢後的結果
    id: int
    username: str
    email: EmailStr