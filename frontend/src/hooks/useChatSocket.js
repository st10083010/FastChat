import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMsg } from '../store/chat_slice';
import { baseUrl, headers, wsBaseHost } from '../configs/config';

export const useChatSocket = (roomId) => {
    const socketRef = useRef(null); // 記住 socket 實例
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.userInfo?.username); // 當前使用者名稱
    const userId = useSelector(state => state.user.userInfo?.id); // 使用者ID
    const token = useSelector(state => state.user.access_token);

    useEffect(() => {
        if (!roomId) return;

        const socket = new WebSocket(`${wsBaseHost}chat/ws/${roomId}?token=${token}`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            dispatch(addMsg({ roomId, msg }));
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            socket.close(); // 清除連線
        };
    }, [roomId, dispatch, token]);

    const sendMsg = async (content) => {
        // 發送訊息
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

        // 廣播給所有人
        socketRef.current.send(
            JSON.stringify({ sender: username, content })
        );

        // 傳遞到後端資料庫
        try {
            const res = await fetch(`${baseUrl}chat/msg/${roomId}`, {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({
                    sender_id: userId,
                    content
                })
            })

            if (!res.ok) {
                // TODO: 寫入失敗處理
                console.log("訊息寫入失敗");
            }
        } catch (err) {
            // TODO: 例外處理
            console.log("Err: ", err);
        }
    };

    return { sendMsg };
};
