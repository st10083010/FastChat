# 即時聊天系統
本專案為一個模仿 Discord 概念的全端聊天室系統，具備登入驗證、聊天室 UI、即時訊息傳送與儲存功能。

此為個人開發專案，用以展示全端開發能力。專案仍持續開發中，並將逐步補上前後端優化與測試機制。

## 功能概覽
- [X] 使用者註冊 / 登入
- [X] 單機聊天室
- [X] 訊息儲存與聊天室紀錄讀取


## TODOs
 - [ ] 一對一聊天功能
 - [ ] 群聊功能
 - [ ] 前端畫面優化、聊天室排序

## 預覽畫面
https://www.youtube.com/watch?v=srZYuM2vlUk

## 快速啟動
前端
```shell
cd frontend
npm run dev
```

後端
```shell
uvicorn main:app --reload
```

API文件  
**Swagger UI**  
http://127.0.0.1:8000/docs

**ReDoc API**  
http://127.0.0.1:8000/redoc

## Tech Stack
- 後端：Python, FastAPI
- 前端：React, Redux, Ant Design
- 資料庫：MySQL