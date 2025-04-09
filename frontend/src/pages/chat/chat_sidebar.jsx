import { Menu } from 'antd';

const ChatSidebar = () => {
    const items = [
        {
            label: '聊天室 A',
            key: 'chat_a'
        },
        {
            label: '聊天室 B',
            key: 'chat_b'
        },
    ];

    return (
        <Menu items={items} onClick={(e) => {console.log("Clicked: ", e)}}/>
    )
}

export default ChatSidebar;