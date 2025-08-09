import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addMsg } from '../store/chat_slice';
import { setAccessToken } from '../store/user_slice';
import { baseUrl, headers, wsBaseHost } from '../configs/config';

export const useChatSocket = (roomId) => {
    const socketRef = useRef(null); // 保存當前ws連線物件
    const retryRef = useRef(0); // 記錄斷線後重連的次數
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = useSelector((s) => s.user.userInfo?.username);
    const userId = useSelector((s) => s.user.userInfo?.id);
    const accessToken = useSelector((s) => s.user.access_token);   // 依你的 slice 命名

    // 刷新 access token
    const refreshAccess = useCallback(async () => {
        const r = await fetch('/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        if (!r.ok) {
            navigate('/login');
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

        const ws = new WebSocket(`${wsBaseHost}chat/ws/${roomId}?token=${accessToken}`);
        socketRef.current = ws;

        // 連線成功，重連次數歸零
        ws.onopen = () => {
            retryRef.current = 0;
        };

        // 處理收到的訊息
        ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                dispatch(addMsg({ roomId, msg: data }));
            } catch {
                // 格式不正確就不傳送到後端並忽略
            }
        };

        // 關閉連線
        ws.onclose = async (ev) => {
            if (ev.code === 4001) {
                // token 過期
                try {
                    await refreshAccess();
                    setTimeout(connect, 0); // 用新 access 立刻重連
                    return;
                } catch {
                    return; // 已在 refreshAccess 內導回登入
                }
            }
            // 其它原因導致斷線，計算重連次數，避免對後端瘋狂請求
            retryRef.current = Math.min(retryRef.current + 1, 5);
            const delay = Math.pow(2, retryRef.current) * 250; // 計算指數回退重連
            setTimeout(connect, delay);
        };

        // 錯誤處理
        ws.onerror = () => {
            try {
                ws.close(); 
            } catch {
                // 某些狀況下, WS已關閉或狀態錯誤，會丟出異常，使用try catch捕獲該錯誤
            }
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

        try {
            // 嘗試取得header的access token
            const h = new Headers(headers || {});
            if (accessToken) {
                h.set('Authorization', `Bearer ${accessToken}`);
            }

            // 訊息寫入資料庫
            const res = await fetch(`${baseUrl}chat/msg/${roomId}`, {
                method: 'POST',
                headers: h,
                credentials: 'include',
                body: JSON.stringify({ sender_id: userId, content })
            });

            // 處理 access token 過期的狀況
            if (res.status === 401) {
                const newAccess = await refreshAccess();
                const h2 = new Headers(headers || {});
                h2.set('Authorization', `Bearer ${newAccess}`);
                const res2 = await fetch(`${baseUrl}chat/msg/${roomId}`, {
                    method: 'POST',
                    headers: h2,
                    credentials: 'include',
                    body: JSON.stringify({ sender_id: userId, content })
                });

                if (!res2.ok) {
                    // TODO: 訊息寫入失敗，要想一下要做什麼處理
                    console.log('訊息寫入失敗（重試後）');
                }
            } else if (!res.ok) {
                console.log('訊息寫入失敗');
            }
        } catch (err) {
            console.log('Err: ', err);
        }

        // WS 即時廣播訊息
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                id: Date.now(),
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
