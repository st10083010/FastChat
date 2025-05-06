import { Layout } from 'antd';
import ChatSidebar from './chat_sidebar';
import ChatHeader from './chat_header';
import ChatMsg from './chat_msg';
import ChatInput from './chat_input';
import { useSelector } from 'react-redux';
import ChatHome from './chat_home';

const { Header, Sider, Content } = Layout;

const ChatRoom = () => {
    const curRoomId = useSelector(state => state.chat.curRoomId);

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
                    { parseInt(curRoomId) > 0 ? (
                        <>
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                                <ChatMsg />
                            </div>
                            <ChatInput />
                        </>
                    ) : (
                        <ChatHome />
                    )}
                </Content>
            </Layout>
        </Layout>
    )
}

export default ChatRoom;