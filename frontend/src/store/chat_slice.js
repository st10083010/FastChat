import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../configs/config';

// 定義初始狀態
const initState = {
    curRoomId: '1',
    msgByRoom: {}
};

// 抓取聊天室資料，並讓 Redux 統一管理
export const fetchMsgs = createAsyncThunk(
    'chat/fetchMsgs',
    async (roomId) => {
        const res = await fetch(`${baseUrl}chat/msg/${roomId}`);
        const data = await res.json();
        return { roomId, msgs: data };
    }
);

// 定義可執行的操作
const chatSlice = createSlice({
    name: 'chat',
    initialState: initState,
    reducers: {
        switchRoom(state, action) {
            state.curRoomId = action.payload;
        },
        addMsg(state, action) {
            const { roomId, msg } = action.payload;
            state.msgByRoom[roomId] = state.msgByRoom[roomId] || [];
            state.msgByRoom[roomId].push(msg);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMsgs.fulfilled, (state, action) => {
            const { roomId, msgs } = action.payload;
            state.msgByRoom[roomId] = msgs;
        })
    }
})

export const { switchRoom, addMsg } = chatSlice.actions;
export default chatSlice;