import { useState } from 'react';
import './App.css'
// import React, { useState } from 'react';
import Chat from './Component/Chat.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Mini Chatbot</h2>
      <Chat />
    </div>
    </>
  );
}

export default App;
