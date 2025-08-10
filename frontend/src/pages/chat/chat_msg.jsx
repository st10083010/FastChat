import { useSelector } from 'react-redux';
import { msgKey } from '../../utils/msg_key';

const ChatMsg = () => {
    // 對話顯示框
    const { curRoomId, msgByRoom } = useSelector((state) => state.chat);
    const msgs = msgByRoom[String(curRoomId)] || [];

    return (
        <div>
            {msgs.map((msg, idx) => (
                <p key={msgKey(msg, idx)}>
                    <strong>{msg.username}：</strong> {msg.content}
                </p>
            ))}
        </div>
      );
}

export default ChatMsg;