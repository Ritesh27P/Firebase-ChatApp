import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import App from './App';
import "./index.css"

const firebaseConfig = {
  apiKey: "AIzaSyCKfbCtpaVvbxgRJiJ6YXL83zbCNpHhC5Y",
  authDomain: "chat-v1-a47c0.firebaseapp.com",
  databaseURL: "https://chat-v1-a47c0-default-rtdb.firebaseio.com",
  projectId: "chat-v1-a47c0",
  storageBucket: "chat-v1-a47c0.appspot.com",
  messagingSenderId: "869570905188",
  appId: "1:869570905188:web:c26c6f46d732e685fe0b71"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

