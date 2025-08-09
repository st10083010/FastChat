from dotenv import load_dotenv
import os
from pathlib import Path

# 根據環境變數 ENV 選擇載入哪個檔案
env_name = os.getenv("ENV", "dev")  # 預設開發環境

BASE_DIR = Path(__file__).resolve().parent.parent.parent
env_file = BASE_DIR / f".env.{env_name}"

if not env_file.exists():
    raise FileNotFoundError(f"Environment file not found: {env_file}")

# 載入對應的環境檔
load_dotenv(env_file)

def get_env_debug(key: str, default: bool = False) -> bool:
    value = os.getenv(key)
    if value is None:
        return default

    if value.strip().lower() in ("1", "true", "yes", "y", "on"):
        return True
    return default

ACCESS_TOKEN_TTL_SECONDS = int(os.getenv("ACCESS_TOKEN_TTL_SECONDS", "900"))
REFRESH_TOKEN_TTL_SECONDS = int(os.getenv("REFRESH_TOKEN_TTL_SECONDS", "604800"))
DEBUG = get_env_debug("DEBUG", False)