import React, { useState } from 'react';
import Login from './Login';
import MessageSender from './MessageSender';
import MessageReceiver from './MessageReceiver';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('')
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between">
        <h1 className="text-2xl font-bold">Chat App</h1>
        {isLogin ? user : <Login setIsLogin={setIsLogin} setUser={setUser} />}
      </header>
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div className="flex flex-col gap-2 p-4">
          <MessageReceiver user={user} />
        </div>
      </div>
      {isLogin && <MessageSender />}
    </div>
  );
};

export default App;
