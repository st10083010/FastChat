import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMsg } from '../store/chat_slice';
import { wsBaseHost } from '../configs/config';

export const useChatSocket = (roomId) => {
    const socketRef = useRef(null); // 記住 socket 實例
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.userInfo?.username); // 當前使用者名稱

    useEffect(() => {
        if (!roomId) return;

        const socket = new WebSocket(`${wsBaseHost}chat/ws/${roomId}`);
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
    }, [roomId, dispatch]);

    const sendMsg = (content) => {
        // 發送訊息到後端
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

        socketRef.current.send(
            JSON.stringify({ sender: username, content })
        );
    };

    return { sendMsg };
};
