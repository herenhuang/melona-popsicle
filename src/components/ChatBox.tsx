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
    "For a few years, I was running an education startup in Toronto—though \"home base\" was pretty flexible because I was either off exploring new places solo or teaming up with my co-founder. We ended up collecting stamps from over 20 countries, soaking in everything from bustling street markets in Asia to cozy cafés in Europe.",
    "I was at Microsoft in Seattle, diving into product management and finding my groove in developer advocacy. That's also when I caught the travel bug, though I had no idea I'd take it to such extremes.",
    "It's a bit of a winding road. I was born in China, immigrated to Canada as a kid, and studied Earth Science at the University of Waterloo—only to realize I had a knack for product after doing internships at CIBC, Scotiabank, and Zynga. If you'd like to read my full work history though, refresh and check out the Regular Site, it's laid out a lot more clearer!", 
    "I'll be honest... I have no clue. I'm reminding myself that the adventure is in the unknown, and obviously I'm super privileged to be able to take time off and just explore. But it's actually much harder than I anticipated - holding myself accountable, not having a clear end goal or just general... \"mission\". No externally-enforced routine? It's weird.",
    "Oh well, it is what it is! Still definitely excited and grateful everyday. <3",
    "Wait why are you still around and clicking this button talking to me?",
    "You do whatever you want to do :^), you pave your own path! Thanks for learning about mine though.",
    "Have a great day! But seriously though... I coded this all with AI so this conversation isn't going to last forever...",
    "Well I mean this is literally a script I wrote. When I say AI I don't mean... LLMs, haha. I mean using Cursor and whatnot (cause I'm not technical)...",
    "YES BUT PLEASE LEAVE T_T SO I CAN STOP SCRIPTING THIS OK. THANK YOU SO MUCH GOODBYE. But also take care of yourself, you're doing great if you made it this far hehehehehehehehe. <3"
  ];

  const buttonColors = [
    '#ffa5ab',
    '#92dce5',
    '#d81159',
    '#00a878',
    '#ffbc42',
    '#8ac926'
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
    if (!isTyping) {
      setIsTyping(true);
    }
    const newLength = e.target.value.length;
    setTypedLength(newLength);
    
    if (newLength === questions[currentStep].length) {
      setTimeout(() => {
        handleSendMessage(questions[currentStep]);
        setTypedLength(0);
        setIsTyping(false);
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && isTyping) {
      e.preventDefault();
      handleSendMessage(questions[currentStep]);
      setTypedLength(0);
      setIsTyping(false);
    }
  };

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim()) {
      setMessages([...messages, { text: messageText, isUser: true }]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const currentQuestion = questions[currentStep] || '';
  const typedPart = currentQuestion.slice(0, typedLength);
  const remainingPart = currentQuestion.slice(typedLength);

  return (
    <div className="max-w-4xl mx-auto my-24 bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Top Nav */}
      <div className="bg-[#f1f1f1] px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">To:</span>
          <img 
            src={helenAvatar} 
            alt="Helen"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-gray-800 font-medium">Helen Huang</span>
        </div>
        <div className="flex items-center gap-4">
          <Camera className="w-5 h-5 text-[#007AFF] cursor-pointer" />
          <Info className="w-5 h-5 text-[#007AFF] cursor-pointer" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end pr-4' : 'justify-start pl-4'}`}
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
          <div className="flex justify-start pl-4">
            <div className="bg-[#E9E9EB] rounded-2xl px-4 py-2 max-w-[60%]">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
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
            />
            {isTyping && (
              <div className="absolute inset-0 pointer-events-none px-4 py-2 flex">
                <span className="text-gray-800">{typedPart}</span>
                <span className="text-gray-400">{remainingPart}</span>
              </div>
            )}
          </div>
          <button 
            className="p-2 text-[#007AFF] hover:text-[#0069DB] transition-colors disabled:opacity-50"
            onClick={() => handleSendMessage(currentQuestion)}
            disabled={!isTyping}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 