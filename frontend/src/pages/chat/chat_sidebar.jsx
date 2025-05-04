import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { switchRoom, fetchMsgs } from '../../store/chat_slice';

const ChatSidebar = () => {
    const dispatch = useDispatch();
    const curRoomId = useSelector((state) => state.chat.curRoomId); // 從 store 中取得資料
    const userId = useSelector(state => state.user.userInfo?.id);

    const onRoomClick = ({ key }) => {
        // 聊天室被點擊時
        const roomId = parseInt(key);
        dispatch(switchRoom(roomId)); // 使用 dispatch 發出 action 並切換 room id

        if (roomId > 0) {
            // 首頁時不抓資料，避免後端出錯
            dispatch(fetchMsgs({ roomId, userId }));
        }        
    }

    const items = [
        {
            label: '首頁',
            key: '0'
        },
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
        <>
            <div style={{ height: '100px', color: 'white' }}>Logo</div>
            <Menu items={items} onClick={onRoomClick} selectedKeys={[curRoomId]} />
        </>
    )
}

export default ChatSidebar;