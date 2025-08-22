import { Outlet } from "react-router";
import ChatSidebar from "../chat/chat_sidebar";
import { Flex, Layout } from "antd";
import ChatHeader from "../chat/chat_header";

const { Header, Sider, Content, Footer } = Layout;

const style_content = {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 64px)' // 64px 是 Antd Header的預設高度
}

const ChatLayout = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <ChatHeader />
            </Header>


            <Layout>
                <Sider style={{ width: 250, background: '#001529' }}>
                    <ChatSidebar />
                </Sider>

                <Layout>
                    <Content style={style_content}>
                        <Outlet />
                    </Content>

                    <Footer>
                        <p>Footer</p>
                    </Footer>
                </Layout>

            </Layout>
        </Layout>
    );
};

export default ChatLayout;
