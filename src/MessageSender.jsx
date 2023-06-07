import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const MessageSender = ({isLogin}) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const currentUser = firebase.auth().currentUser;
    const messagesRef = firebase.database().ref('messages');

    const newMessage = {
      senderId: currentUser.uid,
      content: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      name: currentUser.displayName,
      photoUrl: currentUser.photoURL,
      email: currentUser.email
    };

    messagesRef.push(newMessage)
      .then(() => {
        setMessage('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <footer className="bg-gray-200 py-4 px-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={e=> setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={sendMessage}>Send</button>
        </div>
      </footer>
  );
};

export default MessageSender;
