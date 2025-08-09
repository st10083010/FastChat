import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../configs/config';

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
            state.msgByRoom[strRoomId] = state.msgByRoom[strRoomId] || [];
            state.msgByRoom[strRoomId].push(msg);
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