// 使用Redux做全域管理
import { createSlice } from '@reduxjs/toolkit';

const initState = {
    curRoomId: 'room1',
    msgByRoom: {
        room1: [
            { id: 1, sender: 'Alice', content: '哈囉 Room 1！' },
            { id: 2, sender: 'Bob', content: '歡迎來到 Room 1' },
        ],
        room2: [
            { id: 1, sender: 'Carol', content: '這裡是 Room 2！' }
        ]
    }
};

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
    }
})

export const { switchRoom, addMsg } = chatSlice.actions;
export default chatSlice;