import { useState, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserInfo {
  name: string;
  email: string;
  whatsapp?: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '' });

  const addMessage = useCallback((text: string, isUser: boolean) => {
    const message: Message = {
      id: Date.now().toString() + (isUser ? '-user' : '-bot'),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const updateUserInfo = useCallback((info: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...info }));
  }, []);

  return {
    messages,
    isLoading,
    userInfo,
    setIsLoading,
    addMessage,
    clearMessages,
    updateUserInfo,
    setMessages
  };
};