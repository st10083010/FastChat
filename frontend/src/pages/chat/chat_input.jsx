import { Input, Button } from 'antd';
import { useState } from 'react';

const ChatInput = () => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            console.log('送出訊息：', text);
            setText('');
        }
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