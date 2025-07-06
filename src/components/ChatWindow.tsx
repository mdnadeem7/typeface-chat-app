import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import ChatHeader from './ChatHeader';

const ChatWindow = () => {
  const { chats, activeChatId } = useSelector((state: RootState) => state.chat);
  const chat = chats.find(c => c.id === activeChatId);

  if (!chat) {
    return <div className="chat-window empty">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
     <ChatHeader/>
      <div className="message-list">
        {chat.messages.map(msg => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
      <MessageInput chatId={chat.id} />
    </div>
  );
};

export default ChatWindow;
