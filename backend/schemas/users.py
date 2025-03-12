from pydantic import BaseModel, EmailStr, Field, field_validator

class Users(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    password: str = Field(..., min_length=8, max_length=20)

class Register(Users):
    email: EmailStr
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def double_check(cls, confirm_password, values):
        if confirm_password != values.data['password']:
            raise ValueError("密碼與確認密碼不相符")
        return confirm_password