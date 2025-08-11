import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { switchRoom, fetchMsgs, switchView, fetchRecentDMs } from '../../store/chat_slice';

const ChatSidebar = () => {
    const dispatch = useDispatch();
    const curRoomId = useSelector((state) => state.chat.curRoomId); // 從 store 中取得資料
    const userId = useSelector(state => state.user.userInfo?.id);

    const dmListRecent = useSelector(state => state.chat.dmListRecent);

    useEffect(() => {
        dispatch(fetchRecentDMs())
    }, [dispatch]);

    const onRoomClick = ({ key }) => {
        // 聊天室被點擊時
        const roomId = key;
        // dispatch(switchRoom(roomId)); // 使用 dispatch 發出 action 並切換 room id

        // console.log(roomId)
        if ( roomId === '0') {
            dispatch(switchView('home'));
        } else if ( roomId === '-1' ) {
            dispatch(switchView('game'));
        } else {
            // 切換成聊天室模式
            dispatch(switchRoom(roomId));
            dispatch(fetchMsgs({ roomId, userId }));
        }
    }

    const items = [
        { label: '首頁', key: '0' },
        { label: 'Game', key: '-1' },
        { type: 'divider' },
        { ...Array.isArray(dmListRecent) ?
            dmListRecent.map((d, idx) => ({
                label: d.peer.peer_username,
                key: `${idx}-${d.peer.peer_id}`
        })) : []
     }
    ];

    return (
        <>
            <div style={{ height: '100px', color: 'white' }}>Logo</div>
            <Menu items={items} onClick={onRoomClick} selectedKeys={[String(curRoomId)]} />
        </>
    )
}

export default ChatSidebar;