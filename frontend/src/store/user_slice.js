import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../configs/config';

// 取得使用者資訊，並讓 redux 管理
export const checkLogin = createAsyncThunk(
    'user/checkLogin',
    async () => {
        const res = await fetch(`${baseUrl}info/who_am_i`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('未登入或登入失效');
        }

        const data = await res.json();

        return data;
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const res = await fetch(`${baseUrl}auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })

        if (!res.ok) {
            throw new Error('登出失敗');
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        isLoggedIn: false,
        status: 'idle',
        error: null,
        access_token: null
    },
    reducers: {
        cleanUser(state) {
            state.userInfo = null;
            state.isLoggedIn = false;
        },
        setAccessToken(state, action) {
            state.access_token = action.payload;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(checkLogin.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(checkLogin.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        })
        .addCase(checkLogin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.userInfo = null;
            state.isLoggedIn = false;
        })
        .addCase(logout.fulfilled, (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
            state.status = 'idle';
        });
    }
});

export const { cleanUser, setAccessToken, setUserInfo } = userSlice.actions;
export default userSlice;