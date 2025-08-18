# 即時聊天系統
本專案為一個模仿 Discord 概念的全端聊天室系統，具備登入驗證、聊天室 UI、即時訊息傳送與儲存功能。
同時有一個小遊戲，可以多人互動與聊天

此為個人開發專案，用以展示全端開發能力。專案仍持續開發中，並將逐步補上前後端優化與測試機制。

## 系統概覽
1. 前端（React + Redux）
 - Redux Store：管理使用者狀態、聊天室狀態
 - useApiFetch：API 請求封裝，處理 access token / refresh token
 - useChatSocket：WebSocket 封裝，負責即時訊息傳遞與重連
 - UI：搜尋使用者、私訊清單、聊天室訊息、輸入框

2. 後端（FastAPI）
 - Auth 模組：登入/註冊，簽發與驗證 JWT（access + refresh）
 - Chat 模組：私訊房間 API + WebSocket
 - Info 模組：搜尋使用者、查詢個人資訊

## 預覽畫面
https://www.youtube.com/watch?v=srZYuM2vlUk

## 快速啟動
前端
```shell
cd frontend
npm run dev
```

後端 linux
```shell
# 開發
ENV=dev uvicorn main:app --reload
# 測試
ENV=test uvicorn main:app --reload
# 正式
ENV=prod uvicorn main:app
```

後端 windows
```powershell
# 開發
$env:ENV="dev"; uvicorn main:app --reload
```

API文件  
**Swagger UI**  
http://127.0.0.1:8000/docs

**ReDoc API**  
http://127.0.0.1:8000/redoc

## Tech Stack
- 遊戲開發：Phaser.js
- 後端：Python, FastAPI
- 前端：React, Redux, Ant Design
- 資料庫：MySQL