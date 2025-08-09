import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMsg } from '../store/chat_slice';
import { setAccessToken } from '../store/user_slice';
import { baseUrl, headers, wsBaseHost } from '../configs/config';

export const useChatSocket = (roomId) => {
    const socketRef = useRef(null);
    const retryRef = useRef(0); // 指數回退用
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = useSelector((s) => s.user.userInfo?.username);
    const userId = useSelector((s) => s.user.userInfo?.id);

    // 注意：如果 slice 是 access_token（底線），改成 s.user.access_token
    const accessToken = useSelector((s) => s.user.accessToken);

    const refreshAccess = useCallback(async () => {
        const r = await fetch('/auth/refresh', {
            method: 'POST',
            credentials: 'include' // 讓瀏覽器自動帶上 HttpOnly refresh cookie
        });
        if (!r.ok) {
            navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
            throw new Error('refresh_failed');
        }
        const data = await r.json();
        if (data?.access_token) {
            dispatch(setAccessToken(data.access_token));
        }
        return data.access_token;
    }, [dispatch, navigate]);

    const connect = useCallback(async () => {
        if (!roomId || !accessToken) return;

        // 建立連線
        const ws = new WebSocket(
            `${wsBaseHost}chat/ws/${roomId}?token=${accessToken}`
        );
        socketRef.current = ws;

        ws.onopen = () => {
            retryRef.value = 0;
        };

        ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                // 後端 WS 目前是原樣轉發，這裡直接丟進 chat store
                dispatch(addMsg({ roomId, msg: data }));
            } catch {
                // ignore parse error
            }
        };

        ws.onclose = async (ev) => {
            // Token 過期或無效 → 先刷新、再重連
            if (ev.code === 4001) {
                try {
                    await refreshAccess();
                    // 立刻重連
                    setTimeout(connect, 0);
                    return;
                } catch {
                    // refreshAccess 內已處理導頁
                    return;
                }
            }

            // 其它斷線：指數回退重連
            const attempt = Math.min(retryRef.current + 1, 5);
            retryRef.current = attempt;
            const delay = Math.pow(2, attempt) * 250; // 500ms, 1s, 2s, 4s, 5s+
            setTimeout(connect, delay);
        };

        ws.onerror = () => {
            try { ws.close(); } catch {}
        };
    }, [roomId, accessToken, dispatch, refreshAccess]);

    useEffect(() => {
        connect();
        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [connect]);

    const sendMsg = useCallback(async (content) => {
        if (!roomId || !userId || !username) return;

        // 1) 先經 REST 入庫（Header 帶 Access）
        try {
            const h = new Headers(headers || {});
            if (accessToken) {
                h.set('Authorization', `Bearer ${accessToken}`);
            }

            const res = await fetch(`${baseUrl}chat/msg/${roomId}`, {
                method: 'POST',
                headers: h,
                credentials: 'include', // 帶 cookie 以便將來需要
                body: JSON.stringify({
                    sender_id: userId,
                    content
                })
            });

            // 401 → 嘗試刷新後重放一次
            if (res.status === 401) {
                const newAccess = await refreshAccess();
                const h2 = new Headers(headers || {});
                h2.set('Authorization', `Bearer ${newAccess}`);
                const res2 = await fetch(`${baseUrl}chat/msg/${roomId}`, {
                    method: 'POST',
                    headers: h2,
                    credentials: 'include',
                    body: JSON.stringify({
                        sender_id: userId,
                        content
                    })
                });
                if (!res2.ok) {
                    console.log('訊息寫入失敗（重試後）');
                }
            } else if (!res.ok) {
                console.log('訊息寫入失敗');
            }
        } catch (err) {
            console.log('Err: ', err);
        }

        // 2) 用 WS 廣播給線上其他人（沿用你原本後端的「原樣轉發」）
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                id: Date.now(),          // 前端臨時 id，等 REST 撈回真 id 再對齊
                room_id: roomId,
                sender_id: userId,
                username,
                content,
                send_datetime: new Date().toISOString()
            }));
        }
    }, [roomId, userId, username, accessToken, refreshAccess]);

    return { sendMsg };
};
