import React, { useState } from 'react';
import './chat.css';
function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    
    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error contacting AI.' }]);
    }
  };

  return (
    <div>
      <div id='res' >
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '0.3rem 0', color: msg.sender === 'user' ? 'blue' : 'green' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input id="inputBox" type="text" value={input} placeholder="Type a message..." onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        
      />
      <button onClick={sendMessage} style={{ marginLeft: '0.5rem' }}>Send</button>
    </div>
  );
}

export default Chat;