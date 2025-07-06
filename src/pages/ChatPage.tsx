import React from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  return (
    <div className="app-layout">
      <ChatList />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
