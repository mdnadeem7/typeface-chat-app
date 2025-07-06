import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ChatHeader = () => {
    const { chats, activeChatId } = useSelector((state: RootState) => state.chat);
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return null;

    return (
        <div>
            <h2  className="chat-header">{chat.name}</h2>
            {chat.type === 'group' && (
                <p className="chat-subtitle">
                    {chat.participants?.join(', ') || 'No participants'}
                </p>
            )}
        </div>
    );
};

export default ChatHeader;
