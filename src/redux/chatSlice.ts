import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    id: string;
    sender: string;
    timestamp: string;
    content: string;
}

interface Chat {
    id: string;
    name: string;
    messages: Message[];
    type: 'private' | 'group';
}

interface ChatState {
    chats: Chat[];
    activeChatId: string | null;
}

const initialState: ChatState = {
    chats: [],
    activeChatId: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createChat(state, action: PayloadAction<{ isGroup?: boolean }>) {
            const id = Date.now().toString();
            const isGroup = action.payload?.isGroup || false;
            state.chats.push({
                id,
                name: isGroup ? `Group ${state.chats.length + 1}` : `Chat ${state.chats.length + 1}`,
                messages: [],
                type: isGroup ? 'group' : 'private',
            });
            state.activeChatId = id;
        },
        deleteChat(state, action: PayloadAction<string>) {
            state.chats = state.chats.filter(chat => chat.id !== action.payload);
            if (state.activeChatId === action.payload) state.activeChatId = null;
        },
        setActiveChat(state, action: PayloadAction<string>) {
            state.activeChatId = action.payload;
        },
        sendMessage: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
            const { chatId, message } = action.payload;
            const chat = state.chats.find(c => c.id === chatId);
            if (chat) {
                chat.messages.push(message);

                // 👇 Add auto-reply from Nadeem
                chat.messages.push({
                    id: Date.now().toString() + '-nadeem',
                    sender: 'Nadeem',
                    timestamp: new Date().toLocaleTimeString(),
                    content: `There is no backend. I'm here this side, Nadeem. Please do not get irritated with my same message.`
                });
            }
        }

    },
});

export const { createChat, deleteChat, setActiveChat, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
