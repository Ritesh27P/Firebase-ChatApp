import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');
    // Set up a listener for real-time updates
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      messagesRef.off('value');
    };
  }, []);

  const sendMessage = () => {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.push().set({
      text: newMessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    setNewMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.timestamp}>{message.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
