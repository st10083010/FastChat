const ChatMsg = () => {
    const messages = [
        { id: 1, sender: 'Alice', content: '嗨嗨！' },
        { id: 2, sender: 'Bob', content: '你好！' },
    ];
    
    return (
        <div>
            {messages.map(msg => (
                <p key={msg.id}><strong>{msg.sender}：</strong>{msg.content}</p>
            ))}
        </div>
      );
}

export default ChatMsg;