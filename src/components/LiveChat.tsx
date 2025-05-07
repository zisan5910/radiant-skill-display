import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MessageCircleMore, X } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hi there! 👋 How can I help you today?', isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: newMessage, isUser: true }]);
    setNewMessage('');

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'll get back to you soon.",
        "I appreciate your message. I'll respond as soon as possible.",
        "Thanks for contacting me! I'll review your message and reply shortly.",
        "I've received your message and will respond soon. Thank you!",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200"
        >
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Chat with Ridoan</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'mb-3 max-w-[80%] p-3 rounded-lg',
                  msg.isUser
                    ? 'bg-blue-500 text-white ml-auto rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircleMore size={24} />
        </motion.button>
      )}
    </>
  );
};

export default LiveChat;
