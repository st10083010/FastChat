import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken } from '../store/user_slice';

export const useApiFetch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const access = useSelector((s) => s.user.accessToken);

    const apiFetch = useCallback(async (input, init = {}) => {
        const headers = new Headers(init.headers || {});
        if (access) {
            headers.set('Authorization', `Bearer ${access}`);
        }

        const res = await fetch(input, {
            ...init,
            headers,
            credentials: 'include'   // 為了帶 refresh cookie
        });

        if (res.status !== 401) return res;

        // 401 嘗試刷新兩種token
        const r = await fetch('/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        if (!r.ok) {
            navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
            return res;
        }

        // 設定新的access token
        const data = await r.json();
        if (data?.access_token) {
            dispatch(setAccessToken(data.access_token));
        }

        const headers2 = new Headers(init.headers || {});
        headers2.set('Authorization', `Bearer ${data.access_token}`);

        return fetch(input, {
            ...init,
            headers: headers2,
            credentials: 'include'
        });
    }, [access, navigate, dispatch]);

    return { apiFetch };
};
