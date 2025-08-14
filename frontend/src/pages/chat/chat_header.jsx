import { Button, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, cleanUser } from '../../store/user_slice';
import { resetChat } from '../../store/chat_slice';

const ChatHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roomId = useSelector((state) => 
        state.chat.curRoomId
    );

    const onLogOut = () => {
        dispatch(logout());
        dispatch(cleanUser());
        dispatch(resetChat());
        localStorage.removeItem('access_token');
        navigate("/");
    }

    return (
        <Flex justify={'space-between'}>
            <h3 style={{ color: "white" }}>目前聊天室：{roomId}</h3>
            <Button htmlType='button' style={{ marginTop: '16px' }} onClick={onLogOut}>Log Out</Button>
        </Flex>
        
    );
}

export default ChatHeader;