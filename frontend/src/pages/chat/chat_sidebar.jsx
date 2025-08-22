import { Menu, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { switchRoom, fetchRecentDMs } from '../../store/chat_slice';
import { useNavigate } from "react-router";

const ChatSidebar = () => {
    // 聊天室側邊欄
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curRoomId = useSelector((state) => state.chat.curRoomId); // 從 store 中取得資料
    // const userId = useSelector(state => state.user.userInfo?.id);

    const dmListRecent = useSelector(state => state.chat.dmListRecent);

    useEffect(() => {
        dispatch(fetchRecentDMs())
    }, [dispatch]);

    const onRoomClick = ({ key }) => {
        // 聊天室被點擊時
        const roomId = key;

        // console.log(roomId)
        if ( roomId === '0') {
            navigate('/chat/home');
        } else if ( roomId === '-1' ) {
            navigate('/chat/game');
        } else {
            // 切換成聊天室模式
            navigate(`/chat/${roomId}`);
            dispatch(switchRoom(roomId));
            // dispatch(fetchMsgs({ roomId, userId }));
        }
    };

    const items = [
        { label: '首頁', key: '0' },
        { label: 'Game', key: '-1' },
        { type: 'divider' },
        ...dmListRecent.map((d) => ({
            label: `${d.peer_username}`,
            key: `${d.room_id}`
        }))
    ];

    return (
        <>
            <Flex justify={'center'} align={'center'}>
                <p style={{ height: '100px', color: 'white' }}>開發中版本</p>
            </Flex>
            <Menu items={items} onClick={onRoomClick} selectedKeys={[String(curRoomId)]} />
        </>
    )
}

export default ChatSidebar;