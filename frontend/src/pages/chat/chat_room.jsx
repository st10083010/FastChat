import { useEffect } from 'react';
import { Layout } from 'antd';
import ChatSidebar from './chat_sidebar';
import ChatHeader from './chat_header';
import ChatMsg from './chat_msg';
import ChatInput from './chat_input';
import { useSelector, useDispatch } from 'react-redux';
import ChatHome from './chat_home';
import GameCanvas from './../game/game_canvas';
import { useApiFetch } from '../../hooks/useApiFetch';
import { baseUrl } from '../../configs/config';
import { addMsg } from '../../store/chat_slice';

const { Header, Sider, Content } = Layout;

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

    // 操控顯示畫面
    let content;
    if (curView === 'chat') {
        content = (
            <>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <ChatMsg />
                </div>
                <ChatInput />
            </>
        );
    } else if (curView === 'game') {
        content = <GameCanvas />
    } else {
        content = <ChatHome />
    }

    return (
        <Layout style={{ height: '100vh', display: 'flex' }}>
            <Sider width={200}>
                <ChatSidebar />
            </Sider>

            <Layout style={{ width: "100%" }}>
                <Header style={{ padding: '0 16px' }}>
                    <ChatHeader />
                </Header>
                <Content style={{ padding: '16px', display: "flex", flexDirection: 'column', flex: 1 }}>
                    {content}
                </Content>
            </Layout>
        </Layout>
    )
}

export default ChatRoom;