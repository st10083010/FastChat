import { useSelector } from 'react-redux';

const ChatMsg = () => {
    const { curRoomId, msgByRoom } = useSelector((state) => state.chat);
    const msgs = msgByRoom[curRoomId] || [];
    
    return (
        <div>
            {msgs.map((msg) => (
                <p key={msg.id}>
                    <strong>{msg.sender_id}: </strong> {msg.content}
                </p>
            ))}
        </div>
      );
}

export default ChatMsg;