import { Layout } from 'antd';
import ChatSidebar from './chat_sidebar';
import ChatHeader from './chat_header';
import ChatMsg from './chat_msg';
import ChatInput from './chat_input';
import { useSelector } from 'react-redux';
import ChatHome from './chat_home';
import GameCanvas from './../game/game_canvas';

const { Header, Sider, Content } = Layout;

const ChatRoom = () => {
    // const curRoomId = useSelector(state => state.chat.curRoomId);
    const curView = useSelector(state => state.chat.currentView);

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