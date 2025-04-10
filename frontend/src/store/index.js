import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat_slice';

export const store = configureStore({
    reducer: {
        chat: chatSlice.reducer
    }
});