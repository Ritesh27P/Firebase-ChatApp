import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const MessageReceiver = ({user}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');

    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
      
    });

    return () => {
      messagesRef.off('value');
    };
  }, []);

  console.log(user);

  return (
    <div>
        {messages.map(message => {
            return message?.email === user 
                ? <div key={message?.uid} className="flex justify-end gap-2">
                        <div className="flex-auto bg-blue-500 rounded-xl p-4 max-w-3/4">
                            <p className='text-black w-3/4'>{message.content}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-300"><img className='rounded' src={message.photoUrl} alt='' /></div>
                    </div>
                : <div key={message?.uid} className="flex gap-2 mb-8">
                        <div className="w-8 h-8 rounded-full bg-gray-300"> <img className='rounded' src={message.photoUrl} alt='' /> </div>
                        <div className="flex-auto my-auto bg-gray-100 rounded-xl p-4 max-w-3/4">
                            <p className='text-gray-40 font-bold'>{message.name}</p>
                            <p className="text-gray-800 w-1/2">{message.content}</p>
                        </div>
                    </div>
                
        })}
    </div>
  )
};

export default MessageReceiver;
