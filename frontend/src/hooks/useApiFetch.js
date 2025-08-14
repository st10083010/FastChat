import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAccessToken, logout } from '../store/user_slice';
import { baseUrl } from '../configs/config';

export const useApiFetch = () => {
    // 處理 token, 自動攜帶 Authorization, 遇到 401 先 refresh, 再重放原請求
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refreshingRef = useRef(null); // 確保同時間只有一個 refresh 在跑

    const refreshAccess = useCallback(async () => {
        // 刷新 access token
        if (!refreshingRef.current) {
            refreshingRef.current = (async () => {
                const res = await fetch(`${baseUrl}auth/refresh`, {
                    method: 'POST',
                    credentials: 'include' // 送 refresh cookie
                });
                if (!res.ok) throw new Error('refresh failed');

                const data = await res.json().catch(() => ({}));
                const newToken = data?.access_token;
                if (!newToken) throw new Error('no access_token in refresh response');

                localStorage.setItem("access_token", newToken);
                dispatch(setAccessToken(newToken));
                return newToken;
            })().finally(() => {
                // 下一個 event loop 才把鎖清掉
                setTimeout(() => { refreshingRef.current = null; }, 0);
            });
        }
        return refreshingRef.current;
    }, [dispatch]);


    const apiFetch = useCallback(async (url, init = {}) => {
        // 發起攜帶 token 的 HTTP 請求
        const access = localStorage.getItem("access_token");
        const headers = new Headers(init.headers || {});
        // console.log("access: ", access);
        // console.log("headers: ", headers);
        if (access && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${access}`);
        }

        let res = await fetch(url, {
            ...init,
            headers,
            credentials: 'include' // 讓 cookie（含 refresh）一直在
        });
        if (res.status !== 401) return res;

        // 如果 401 則嘗試刷新 tooken 一次並且對原先的 API 重新請求
        try {
            const newToken = await refreshAccess();
            const headers2 = new Headers(init.headers || {});
            headers2.set('Authorization', `Bearer ${newToken}`);
            // console.log("401 refresh");
            res = await fetch(url, {
                ...init,
                headers: headers2,
                credentials: 'include'
            });
            return res;
        } catch (e) {
            // refresh 失敗視為登入失效
            console.log(" useApiFetch Error", e);
            try {
                dispatch(logout());
                navigate('/'); // TODO: 導回首頁重新登入，可能需要提示訊息
            } catch {
                // 
            }
            // return res; // 把原本 401 回去，讓呼叫端決定是否導到登入
        }
    }, [refreshAccess, dispatch, navigate]);

    return { apiFetch };
};
