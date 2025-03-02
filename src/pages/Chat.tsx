import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Share, User, Users, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  senderName: string;
}

interface UserData {
  id: string;
  username: string;
  isActive: boolean;
}

const Chat = () => {
  // UI states
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'system',
      text: 'Welcome to WatcherMy! Start chatting or share your screen.',
      timestamp: Date.now(),
      senderName: 'System'
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // Mock user data
  const currentUser: UserData = {
    id: 'user-1',
    username: 'You',
    isActive: true
  };
  
  const mockUsers: UserData[] = [
    { id: 'user-2', username: 'Alice', isActive: true },
    { id: 'user-3', username: 'Bob', isActive: true },
    { id: 'user-4', username: 'Carol', isActive: false }
  ];
  
  // Send message handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        text: messageInput,
        timestamp: Date.now(),
        senderName: currentUser.username
      };
      
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };
  
  // Toggle screen sharing
  const handleToggleScreenShare = () => {
    if (isScreenSharing) {
      setIsScreenSharing(false);
      // In a real implementation, you would stop screen sharing here
    } else {
      setIsScreenSharing(true);
      // In a real implementation, you would start screen sharing with WebRTC here
      
      // Add a mock system message about screen sharing
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'system',
        text: 'You started sharing your screen.',
        timestamp: Date.now(),
        senderName: 'System'
      };
      
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col pt-20 px-0">
        <div className="flex-grow flex">
          {/* Sidebar */}
          <aside className="w-72 hidden md:flex flex-col bg-secondary/50 border-r border-border/50">
            <div className="p-4 border-b border-border/50">
              <h2 className="font-semibold">Participants</h2>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4">
              <div className="space-y-1">
                {[currentUser, ...mockUsers].map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center p-2 rounded-md hover:bg-secondary/80"
                  >
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">
                        {user.username}
                        {user.id === currentUser.id && " (You)"}
                      </p>
                    </div>
                    {user.id !== currentUser.id && (
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user.isActive ? "bg-green-500" : "bg-gray-300"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Main Chat Area */}
          <div className="flex-grow flex flex-col overflow-hidden">
            {/* Screen Share Area (conditionally displayed) */}
            {isScreenSharing && (
              <div className="relative h-1/2 bg-black/90 flex items-center justify-center border-b border-border/50">
                <button 
                  onClick={handleToggleScreenShare}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="text-center text-white">
                  <Share className="h-10 w-10 mx-auto mb-3" />
                  <p>You are sharing your screen</p>
                  <p className="text-sm text-gray-400 mt-2">
                    (In a real implementation, your screen would be visible here)
                  </p>
                </div>
              </div>
            )}
            
            {/* Messages Area */}
            <div className={cn(
              "flex-grow overflow-y-auto p-4 space-y-4",
              isScreenSharing ? "h-1/2" : "h-full"
            )}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "max-w-[75%] rounded-xl p-3 animate-fade-in",
                    message.senderId === currentUser.id 
                      ? "bg-primary text-primary-foreground ml-auto" 
                      : message.senderId === 'system'
                        ? "bg-secondary/70 mx-auto text-center"
                        : "bg-secondary/70"
                  )}
                >
                  {message.senderId !== 'system' && message.senderId !== currentUser.id && (
                    <p className="text-xs font-medium mb-1">{message.senderName}</p>
                  )}
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 text-right mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-border/50">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow px-4 py-2 rounded-full bg-secondary/70 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={handleToggleScreenShare}
                  className={cn(
                    "p-2 rounded-full transition-all",
                    isScreenSharing 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  <Share className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  className="p-2 rounded-full bg-primary text-primary-foreground transition-all hover:shadow-md"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
