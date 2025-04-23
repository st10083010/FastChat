import { Input, Button } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useChatSocket } from '../../hooks/useChatSocket';

const ChatInput = () => {
    const [text, setText] = useState('');
    const curRoomId = useSelector(state => state.chat.curRoomId);
    const { sendMsg } = useChatSocket(curRoomId);

    const handleSend = () => {
        // 處理送出
        const trimText = text.trim();
        if (!trimText) return;
        sendMsg(trimText);
        setText(""); // 清空訊息
    };

  return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <Input.TextArea rows={1} value={text} onChange={e => setText(e.target.value)} onPressEnter={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
            />
            <Button type="primary" onClick={handleSend}>送出</Button>
        </div>
  );
};

export default ChatInput;