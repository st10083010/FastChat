import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMsg } from '../store/chat_slice';
import { v4 as uuidv4 } from 'uuid';
import { wsBaseHost, baseUrl, headers } from '../configs/config';
import { useApiFetch } from './useApiFetch';

export const useChatSocket = (roomId) => {
    // 處理 WS 的連線、斷開、廣播、發送訊息到資料庫與異常處理
    const dispatch = useDispatch();
    const { apiFetch } = useApiFetch();

    const accessToken = useSelector(s => s.user.access_token);
    const userId = useSelector(s => s.user.userInfo?.id);
    const username = useSelector(s => s.user.userInfo?.username);
    const curView = useSelector(s => s.chat.currentView);

    // 判斷是否連線的條件
    const isAuthed = Boolean(accessToken && userId);
    // 處理切頁等UI操作的 WS 斷開與否，但不即時更新，只在渲染時會是新值，受閉包影響
    const shouldConnect = Boolean(isAuthed && curView === 'chat' && roomId);

    const socketRef = useRef(null); // 當前 WS 連線物件
    const reconnectTimerRef = useRef(null); // 存放 setTimerout ID, 可以取消重新連接
    const shouldConnectRef = useRef(false); // 給 WS 事件 callback 即時讀取最新布林值的物件且不受閉包影響

    const clearTimer = useCallback(() => {
        // 清除 timer
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
        }
    }, []);

    const hardClose = useCallback(() => {
        // 強制斷開
        try {
            if (socketRef.current) {
                socketRef.current.onopen = null;
                socketRef.current.onmessage = null;
                socketRef.current.onclose = null;
                socketRef.current.onerror = null;
                socketRef.current.close();
            }
        } catch (e) {
            console.log(`hardClose error: ${e}`);
        }

        socketRef.current = null;
        clearTimer();
    }, [clearTimer]);

    const connect = useCallback(() => {
        // 建立連線
        if (!shouldConnectRef.current) return;

        const url = `${wsBaseHost}chat/ws/${roomId}?token=${accessToken}`;
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                dispatch(addMsg({ roomId, msg: data })); // 廣播訊息
            } catch (e) {
                console.log(`ws.onmessage error: ${e}`);
            }
        };

        ws.onclose = () => {
            if (!shouldConnectRef.current) return;
            reconnectTimerRef.current = setTimeout(connect, 1500);
        };
    }, [roomId, accessToken, dispatch]);

    useEffect(() => {
        shouldConnectRef.current = shouldConnect;

        if (!shouldConnect) {
            hardClose();
            return () => hardClose();
        }
        hardClose();
        connect();
        return () => hardClose();
    }, [shouldConnect, connect, hardClose]);

    const sendMsg = useCallback(async (content) => {
        const ws = socketRef.current;
        if (!roomId || !userId || !username) return;

        const clientId = uuidv4();
        const local = {
            id: undefined,
            client_id: clientId,
            room_id: roomId,
            sender_id: userId,
            username,
            content,
            local_ts: Date.now()
        };

        dispatch(addMsg({ roomId, msg: local })); // 不等待後端回應後廣播，而是即時廣播，減少延遲感

        try {
            const h = new Headers(headers || {});
            h.set('Content-Type', 'application/json');
            // Authorization 由 useApiFetch 內部自動補，不要在這裡手動塞 token
            const res = await apiFetch(
                `${baseUrl}chat/msg/${roomId}`,
                { method: 'POST', headers: h, body: JSON.stringify({
                    client_id: clientId,
                    sender_id: userId,
                    content
                })}
            );

            console.log('res:');
            console.log(res);
            // 不用在這裡更新畫面；等後端（或自己）透過 WS 廣播回來，再由 reducer 以 client_id 對齊更新為正式
        } catch (e) {
            // 失敗：你可以在這裡做 retry 或標記失敗狀態（可選）
            console.log('REST 入庫失敗：', e);
        }

        // WS 廣播給其他客戶端；自己這端 reducer 會用 client_id 去重複/更新
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(local));
        }
    }, [apiFetch, roomId, userId, username, dispatch]);

    return { sendMsg };
};
