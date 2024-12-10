import React, { useState, useEffect } from 'react';
import * as ChatService from '../services/ChatService';
import '../styles/Chat.css';
const ChatInterface = ({ matchId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [matchId]);

  const loadMessages = async () => {
    try {
      const response = await ChatService.getMessages(matchId);
      setMessages(response);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await ChatService.sendMessage({
        matchId,
        senderId: currentUserId,
        content: newMessage
      });
      setNewMessage('');
      loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.messageId}
            className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {message.content}
              <div className="message-time">
                Expires in {Math.floor((new Date(message.expiresAt) - new Date()) / 3600000)}h
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;