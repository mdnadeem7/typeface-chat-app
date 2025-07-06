import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { createChat, deleteChat, setActiveChat } from '../redux/chatSlice';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import CreateGroupModal from './CreateGroupModal';

const ChatList = () => {
  const dispatch = useDispatch();
  const { chats, activeChatId } = useSelector((state: RootState) => state.chat);
  const toast = useRef<Toast>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleDelete = (event: React.MouseEvent, chatId: string, chatName: string) => {
    confirmPopup({
      target: event.currentTarget as HTMLElement,
      message: 'Are you sure you want to delete this chat?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptClassName: 'p-button-danger',
      accept: () => {
        dispatch(deleteChat(chatId));
        toast.current?.show({ severity: 'info', summary: 'Deleted', detail: `${chatName} deleted` });
      },
    });
  };

  return (
    <div className="chat-list">
      <Toast ref={toast} />
      <ConfirmPopup />

      <div className="list-header">
        <h3>Chats</h3>
        <div className="chat-actions">
          <Button
            label="New Chat"
            icon="pi pi-user"
            className="p-button-sm p-button-info"
            onClick={() => dispatch(createChat({ isGroup: false }))}
          />
          <Button
            label="New Group"
            icon="pi pi-users"
            className="p-button-sm  ml-1"
            onClick={() => setShowGroupModal(true)}
          />

          <CreateGroupModal visible={showGroupModal} onClose={() => setShowGroupModal(false)} />
        </div>
      </div>

      <ul>
        {chats.toReversed().map(chat => (
          <li
            key={chat.id}
            className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
            onClick={() => dispatch(setActiveChat(chat.id))}
          >
            {chat.name}
            <Button
              icon="pi pi-trash"
              className="p-button-text p-button-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(e, chat.id, chat.name);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
