// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chats" />} />
        <Route path="/chats" element={<ChatPage />} />
        {/* Future: Add /groups, /settings, etc. */}
      </Routes>
    </Router>
  );
};

export default App;
