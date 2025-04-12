import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { switchRoom, fetchMsgs } from '../../store/chat_slice';

const ChatSidebar = () => {
    const dispatch = useDispatch();
    const curRoomId = useSelector((state) => state.chat.curRoomId); // 從 store 中取得資料

    const onRoomClick = ({ key }) => {
        // 聊天室被點擊時
        dispatch(switchRoom(key)); // 使用 dispatch 發出 action 並執行定義好的操作
        dispatch(fetchMsgs(key))
    }

    const items = [
        {
            label: '聊天室 A',
            key: '1'
        },
        {
            label: '聊天室 B',
            key: '2'
        },
    ];

    return (
        <Menu items={items} onClick={onRoomClick} selectedKeys={[curRoomId]} />
    )
}

export default ChatSidebar;