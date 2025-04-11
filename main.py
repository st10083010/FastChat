from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.r_auth import auth
from backend.routers.r_info import info
from backend.routers.r_chat import chat

app = FastAPI()

# Routes
app.include_router(auth)
app.include_router(info)
app.include_router(chat)

# CORS
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # 允許前端
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Hello": "World"}