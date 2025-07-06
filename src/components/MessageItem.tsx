import React from 'react';

interface Props {
  message: {
    id: string;
    sender: string;
    timestamp: string;
    content: string;
  };
}

const MessageItem = ({ message }: Props) => (
  <div className="message-item">
    <div className="meta">
      <strong>{message.sender}</strong> • <span>{message.timestamp}</span>
    </div>
    <div className="content">{message.content}</div>
  </div>
);

export default MessageItem;
