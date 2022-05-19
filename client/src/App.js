import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:5000')
function App() {
  const [value, setValue] = useState('');
  const [room, setRoom] = useState('')
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', {message: value, room})
    setMessageReceived(value);
  }

  const joinRoom = () => {
    if (room !== '') socket.emit('join_room', room)
  }

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data.message)
    })
  }, [socket])
  return (
    <div className="App">
      <input 
        placeholder="Room"
        value={room}
        onChange={e => {
          setRoom(e.target.value)
        }}
      />
      <button onClick={joinRoom}>Send</button>
      <input 
        placeholder="Message"
        value={value}
        onChange={e => {
          setValue(e.target.value)
          console.log(value)
        }}
      />
      <button onClick={sendMessage}>Send</button>
      {messageReceived}
    </div>
  );
}

export default App;
