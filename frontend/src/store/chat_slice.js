import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../configs/config';
import { msgKey } from '../utils/msg_key';

// 定義初始狀態
const initState = {
    currentView: 'home', // 當前顯示畫面控制: home | chat | game
    curRoomId: '0',
    msgByRoom: {}
};

// 抓取聊天室資料，並讓 Redux 統一管理
export const fetchMsgs = createAsyncThunk(
    'chat/fetchMsgs',
    async ({ roomId, userId }) => {
        const res = await fetch(`${baseUrl}chat/msg/${roomId}/${userId}`);
        const data = await res.json();
        return { roomId, msgs: data };
    }
);

// 定義可執行的操作
const chatSlice = createSlice({
    name: 'chat',
    initialState: initState,
    reducers: {
        switchView(state, action) {
            state.currentView = action.payload;
        },
        switchRoom(state, action) {
            state.curRoomId = String(action.payload);
            state.currentView = 'chat';
        },
        addMsg(state, action) {
            const { roomId, msg } = action.payload;
            let strRoomId = String(roomId);
            if (!state.msgByRoom[strRoomId]) {
                state.msgByRoom[strRoomId] = []
            }
            
            const arr = state.msgByRoom[strRoomId];
            if (msg?.client_id) {
                const i = arr.findIndex(m => m?.client_id && m.client_id === msg.client_id);
                if (i !== -1) {
                    // 找到那一筆並補上 id、時間等欄位
                    arr[i] = { ...arr[i], ...msg };
                    return;
                }
            }

            // 沒 client_id 或找不到，檢查是否已存在，避免 WS 或歷史重覆
            const mid = msgKey(msg);
            const exists = arr.some(m => msgKey(m) === mid);
            if (!exists) arr.push(msg);
        },
        resetChat(state) {
            state.curRoomId = null;
            state.msgByRoom = {};
            state.currentView = 'chat';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMsgs.fulfilled, (state, action) => {
            const { roomId, msgs } = action.payload;
            state.msgByRoom[String(roomId)] = msgs;
        })
    }
})

export const { switchRoom, addMsg, resetChat, switchView } = chatSlice.actions;
export default chatSlice;