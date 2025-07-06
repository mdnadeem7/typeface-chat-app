import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { createChat } from '../redux/chatSlice';

const userList = [
  { label: 'Nadeem', value: 'nadeem' },
  { label: 'Agam', value: 'agam' },
  { label: 'XYZ', value: 'xyz' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

const CreateGroupModal = ({ visible, onClose }: Props) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleCreateGroup = () => {
    if (!groupName || selectedUsers.length === 0) return;
    dispatch(
      createChat({
        isGroup: true,
        name: groupName,
        participants: selectedUsers,
      })
    );
    setGroupName('');
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Dialog header="Create Group" visible={visible} onHide={onClose}>
      <div className="p-fluid">
        <span className="p-float-label" style={{ marginBottom: '1rem' }}>
          <InputText id="groupname" value={groupName} onChange={e => setGroupName(e.target.value)} />
          <label htmlFor="groupname">Group Name</label>
        </span>

        <MultiSelect
          value={selectedUsers}
          options={userList}
          onChange={e => setSelectedUsers(e.value)}
          placeholder="Choose members"
          display="chip"
          className="w-full"
        />

        <Button
          label="Create Group"
          className="mt-3"
          onClick={handleCreateGroup}
          disabled={!groupName || selectedUsers.length === 0}
        />
      </div>
    </Dialog>
  );
};

export default CreateGroupModal;
