import React, { useState } from 'react';
import { Camera, Info, Smile, Send } from 'lucide-react';
import helenAvatar from '../images/helen-avatar.jpg';

interface Message {
  text: string;
  isUser: boolean;
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi Helen... what are you up to nowadays?", 
      isUser: true 
    },
    { 
      text: "I'm currently on an adult gap year, swapping hustle-heavy schedules for creative hobbies and long midday naps.", 
      isUser: false 
    }
  ]);
  const [typedLength, setTypedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const questions = [
    "Hi Helen... what are you up to nowadays?",
    "And what about before that?",
    "Wow! And what were you doing before the startup days?",
    "So how did you end up in tech in the first place?"
  ];

  const responses = [
    "I'm currently on an adult gap year, swapping hustle-heavy schedules for creative hobbies and long midday naps.",
    "For a few years, I was running an education startup in Toronto—though \"home base\" was pretty flexible because I was either off exploring new places solo or teaming up with my co-founder. We ended up collecting stamps from over 20 countries, soaking in everything from bustling street markets in Asia to cozy cafés in Europe.",
    "I was at Microsoft in Seattle, diving into product management and finding my groove in developer advocacy. That's also when I caught the travel bug, though I had no idea I'd take it to such extremes.",
    ""
  ];

  const handleAskMore = async () => {
    if (currentStep >= responses.length) return;
    
    setIsLoading(true);
    setMessages(prev => [...prev, { 
      text: questions[currentStep], 
      isUser: true 
    }]);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setMessages(prev => [...prev, { 
      text: responses[currentStep], 
      isUser: false 
    }]);
    
    setCurrentStep(prev => prev + 1);
    setIsLoading(false);
  };

  const renderMessageWithLinks = (text: string) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTyping && !isLoading) {
      setIsTyping(true);
    }
    const newLength = e.target.value.length;
    setTypedLength(newLength);
    
    if (newLength === questions[currentStep].length) {
      setTimeout(() => {
        handleSendMessage(questions[currentStep]);
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && isTyping && !isLoading) {
      e.preventDefault();
      handleSendMessage(questions[currentStep]);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (messageText.trim() && !isLoading) {
      setMessages([...messages, { text: messageText, isUser: true }]);
      setTypedLength(0);
      setIsTyping(false);
      
      // Start Helen's response
      setIsLoading(true);
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show Helen's response
      setMessages(prev => [...prev, { text: responses[currentStep], isUser: false }]);
      setIsLoading(false);
      
      // Move to next question
      setCurrentStep(prev => prev + 1);
    }
  };

  const currentQuestion = questions[currentStep] || '';
  const typedPart = currentQuestion.slice(0, typedLength);
  const remainingPart = currentQuestion.slice(typedLength);

  return (
    <div className="max-w-4xl mx-auto my-24 bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Top Nav - increased padding and text size */}
      <div className="bg-[#f1f1f1] px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">To:</span>
          <img 
            src={helenAvatar} 
            alt="Helen"
            className="w-8 h-8 rounded-full object-cover" // Increased avatar size
          />
          <span className="text-gray-800 font-medium text-lg">Helen Huang</span>
        </div>
        <div className="flex items-center gap-5"> {/* Increased gap between icons */}
          <Camera className="w-6 h-6 text-[#007AFF] cursor-pointer" /> {/* Increased icon size */}
          <Info className="w-6 h-6 text-[#007AFF] cursor-pointer" />
        </div>
      </div>

      {/* Chat Area - increased height from 500px to 600px */}
      <div className="h-[600px] overflow-y-auto p-6 space-y-6 bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${
                message.isUser
                  ? 'bg-[#007AFF] text-white'
                  : 'bg-[#E9E9EB] text-black max-w-[60%]'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#E9E9EB] rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input - updated send button opacity */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-[#007AFF] hover:text-[#0069DB] transition-colors"
          >
            <Smile className="w-6 h-6" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={typedPart}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type anything, and press tab to autocomplete"
              className="w-full bg-[#f1f1f1] px-4 py-2 rounded-full border-none outline-none text-gray-800 placeholder-gray-400"
              disabled={isLoading}
            />
            {isTyping && !isLoading && (
              <div className="absolute inset-0 pointer-events-none px-4 py-2 flex">
                <span className="text-gray-800">{typedPart}</span>
                <span className="text-gray-400">{remainingPart}</span>
              </div>
            )}
          </div>
          <button 
            className="p-2 text-[#007AFF] hover:text-[#0069DB] transition-colors disabled:opacity-100" // Changed to 100%
            onClick={() => handleSendMessage(currentQuestion)}
            disabled={!isTyping || isLoading}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 