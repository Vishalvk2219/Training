import React, { useState} from 'react';
import { Input, Space, Select } from 'antd';
import axios from 'axios';
import { marked } from 'marked';
import parse from 'html-react-parser';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState('gemini');
  const [loading, setLoading] = useState(false);


  const cleanText = text => {
  return marked(text)
  }

  const handleSend = async () => {
    if (!userInput.trim() || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    const input = userInput;
    setUserInput('');
    setLoading(true);

    try {
      const inputMod = `You are a blog assistant ai for the website name BlogWeb and your task is to give accurate and concise response to the user query.Below is the user query: ${input}`
      const { data } = await axios.post(
        `http://localhost:8080/api/chat/${model}`,
        { message: inputMod },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const reply = cleanText(data.reply ?? data.error ?? 'No response');
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Chatbot error:', err.response?.data || err.message);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Always visible chat icon button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-5 right-5 z-40"
      >
        <img
          src="/chatboticon.jpg"
          alt="chat"
          className="w-14 h-14 cursor-pointer shadow-lg rounded-full border-2 border-emerald-500 transition-transform hover:scale-110"
        />
      </button>

      {/* Chatbot panel with smooth animation */}
      <div
        className={`fixed bottom-24 right-5 w-[95%] md:w-[30%] h-[70%] max-h-[80vh] text-white rounded-2xl flex flex-col shadow-2xl border border-emerald-500 overflow-hidden transition-transform transition-opacity duration-300 z-50
        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: '#1f2937' }}
      >
        {/* Header */}
        <div className="bg-emerald-500 w-full p-3 flex items-center justify-between font-semibold text-white shadow-md">
          <span className="text-lg md:text-xl font-bold">Chatbot</span>
          <div className="flex items-center gap-2">
            <Select
              value={model}
              onChange={setModel}
              size="small"
              className="w-[130px]"
              options={[
                { value: 'chatgpt', label: 'ChatGPT' },
                { value: 'gemini', label: 'Gemini' }
              ]}
            />
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 p-1 rounded-full transition-transform hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] break-words transition-colors ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-white self-end ml-auto shadow-md'
                  : 'bg-gray-700 text-white shadow-inner'
              }`}
            >
                {parse(msg.text)}
            </div>
          ))}
          {loading && (
            <div className="p-2 rounded-lg bg-gray-600 text-gray-300 animate-pulse">
              Typing...
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-gray-600 flex">
          <Space.Compact className="w-full">
            <Input
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-l-lg border-none focus:ring-2 focus:ring-emerald-500"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className={`px-4 flex items-center justify-center rounded-r-lg transition-transform ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              <img
                src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3507350/send-icon-icon-md.png"
                alt="send"
                className="w-5 h-5"
              />
            </button>
          </Space.Compact>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
