import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat_slice';
import userSlice from './user_slice';

// 將reducer加入全域store
export const store = configureStore({
    reducer: {
        chat: chatSlice.reducer,
        user: userSlice.reducer
    }
});