import { useSelector } from 'react-redux';

const ChatMsg = () => {
    const { curRoomId, msgByRoom } = useSelector((state) => state.chat);
    const msgs = msgByRoom[String(curRoomId)] || [];

    return (
        <div>
            {msgs.map((msg) => (
                <p key={msg.id}>
                    <strong>{msg.username ?? msg.sender_id}: </strong> {msg.content}
                </p>
            ))}
        </div>
      );
}

export default ChatMsg;