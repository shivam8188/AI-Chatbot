import { useState } from 'react';
import './App.css'
import Chat from './Component/Chat.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div>
      <Chat />
    </div>
    </>
  );
}

export default App;
