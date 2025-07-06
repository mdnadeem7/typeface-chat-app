import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../redux/chatSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { v4 as uuid } from 'uuid';

interface Props {
  chatId: string;
}

const MessageInput = ({ chatId }: Props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch(
      sendMessage({
        chatId,
        message: {
          id: uuid(),
          sender: 'You',
          timestamp: new Date().toLocaleTimeString(),
          content: text.trim(),
        },
      })
    );
    setText('');
  };

  return (
   <div className="message-input">
  <InputText
    value={text}
    onChange={e => setText(e.target.value)}
    placeholder="Type your message"
    onKeyDown={e => e.key === 'Enter' && handleSend()}
    className="p-inputtext-sm grow-input"
  />
  <Button label="Send" icon="pi pi-send" onClick={handleSend} />
</div>

  );
};

export default MessageInput;
