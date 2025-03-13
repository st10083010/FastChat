from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.auth import auth

app = FastAPI()

# Routes
app.include_router(auth)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # 允許前端
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Hello": "World"}