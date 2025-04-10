import { useSelector } from 'react-redux';

const ChatHeader = () => {
    const roomId = useSelector((state) => 
        state.chat.curRoomId
    )

    return (
        <h3 style={{ color: "white" }}>目前聊天室：{roomId}</h3>
    );
}

export default ChatHeader;