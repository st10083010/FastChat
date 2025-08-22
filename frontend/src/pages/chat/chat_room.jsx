import { useEffect } from 'react';
import { Flex } from 'antd';
import ChatMsg from './chat_msg';
import ChatInput from './chat_input';
import { useSelector, useDispatch } from 'react-redux';
import { useApiFetch } from '../../hooks/useApiFetch';
import { baseUrl } from '../../configs/config';
import { addMsg } from '../../store/chat_slice';

const ChatRoom = () => {
    const dispatch = useDispatch();
    const { apiFetch } = useApiFetch();

    const curView = useSelector(state => state.chat.currentView);
    const curRoomId = useSelector(state => state.chat.curRoomId);
    const userId = useSelector(state => state.user.userInfo?.id);
    const msgByRoom = useSelector(state => state.chat.msgByRoom);

    
    useEffect(() => {
        if (curView !== 'chat' || !curRoomId || !userId) return;

        // 已經載過就不要重撈, 避免切來切去重複打後端
        const loaded = Array.isArray(msgByRoom?.[String(curRoomId)]) && msgByRoom[String(curRoomId)].length > 0;
        if (loaded) return;

        (async () => {
            // 用 useApiFetch 來打受保護端點
            const res = await apiFetch(`${baseUrl}chat/msg/${curRoomId}/${userId}`, { method: 'GET' });
            if (!res.ok) return;

            const list = await res.json();
            list.forEach(m => dispatch(addMsg({ roomId: curRoomId, msg: m })));
            
        })();
    }, [curView, curRoomId, userId, msgByRoom, apiFetch, dispatch]);

    return (
        <Flex vertical={true} style={{ flex: 1 }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                <ChatMsg />
            </div>

            <div style={{ borderTop: '1px solid #ddd', padding: '8px' }}>
                <ChatInput />
            </div>
        </Flex>
    )
}

export default ChatRoom;