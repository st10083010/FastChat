import { useSelector } from 'react-redux';

const ChatMsg = () => {
    const { curRoomId, msgByRoom } = useSelector((state) => state.chat);
    const msgs = msgByRoom[curRoomId] || [];
    
    return (
        <div>
            {msgs.map((msg, index) => (
                <p key={index}>
                    <strong>{msg.sender}: </strong> {msg.content}
                </p>
            ))}
        </div>
      );
}

export default ChatMsg;