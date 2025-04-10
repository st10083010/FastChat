import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { switchRoom } from '../../store/chat_slice';

const ChatSidebar = () => {
    const dispatch = useDispatch();
    const curRoomId = useSelector((state) => state.chat.curRoomId);

    const onRoomClick = ({ key }) => {
        // 聊天室被點擊時
        dispatch(switchRoom(key));
    }

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
        <Menu items={items} onClick={onRoomClick} selectedKeys={[curRoomId]} />
    )
}

export default ChatSidebar;