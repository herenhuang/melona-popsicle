import React, { useState, useRef, useEffect } from 'react';
import { Camera, Info, Smile, Send } from 'lucide-react';
import helenAvatar from '../images/helen-avatar.jpg';
import { useNavigate } from 'react-router-dom';

export function ChatBox() {
  const [messages, setMessages] = useState<Array<{
    text?: string;  // Made optional since URL messages won't have text
    isUser: boolean;
    isUrl?: boolean;
    urlPreview?: {
      title: string;
      url: string;
      image: string;
    };
  }>>([
    {
      text: "howdy howdy, wanna chat? just type below in the chatbox, and press tab to autocomplete.",
      isUser: false
    },
    {
      text: "though if you want to just glean my background, just go to",
      isUser: false
    },
    {
      isUser: false,
      isUrl: true,
      urlPreview: {
        title: "Helen Huang | Background",
        url: "helenhuang.io/boring",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=300&auto=format&fit=crop"
      }
    }
  ]);
  const [typedLength, setTypedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Add ref for the chat area
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]); // Scroll on new messages or when loading state changes

  const questions = [
    "Oh cool... well what's up? What's new?",
    "Oh interesting! What led you to doing that?",
    "And what were you doing before that?"
  ];

  const responseChunks = [
    // Chunk 1 - will be sent as two separate messages
    [
      "well i am currently doing an adult gap year/sabbatical right now, or funemployed, whatever you want to call it.",
      "spending time on projects like this, catching up with friends, dancing a lot more..."
    ],
    // Chunk 2
    [
      "well ever since i read the 4-hour workweek by Tim Ferris a few years ago, i've really loved the concept of mini-retirements. figured this was as good as year as any to experience my own."
    ],
    // Chunk 3
    [
      "so about half a year ago i stepped back from the day to day of running co.lab (the experimental education/tech company i started with sefunmi back in 2021). after that i worked on a few different projects (fintech, crypto) in a fractional/advisory capacity."
    ]
  ];

  const handleAskMore = async () => {
    if (currentStep >= responseChunks.length) return;
    
    setIsLoading(true);
    setMessages(prev => [...prev, { 
      text: questions[currentStep], 
      isUser: true 
    }]);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setMessages(prev => [...prev, { 
      text: responseChunks[currentStep][0], 
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
      
      setIsLoading(true);
      
      // Get current chunk of responses
      const currentChunk = responseChunks[currentStep];
      
      // Send each message in the chunk with a small delay between them
      for (const response of currentChunk) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      }
      
      setIsLoading(false);
      setCurrentStep(prev => prev + 1);
    }
  };

  const currentQuestion = questions[currentStep] || '';
  const typedPart = currentQuestion.slice(0, typedLength);
  const remainingPart = currentQuestion.slice(typedLength);

  const handleUrlClick = (url: string) => {
    navigate(url);
  };

  return (
    <div className="max-w-4xl mx-auto my-24 bg-white rounded-2xl shadow-2xl overflow-hidden w-full">
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

      {/* Chat Area - added ref and custom scrollbar styling */}
      <div 
        ref={chatBoxRef}
        className="h-[600px] overflow-y-auto p-6 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        <div className="space-y-6">
          {/* Initial Helen messages with reduced spacing */}
          <div className="space-y-2">
            {messages.slice(0, 3).map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} w-full`}
              >
                <div
                  className={`${
                    message.isUser
                      ? 'bg-[#007AFF] text-white'
                      : 'bg-[#E9E9EB] text-black'
                  } rounded-2xl overflow-hidden max-w-[60%] w-fit ${!message.text && message.isUrl ? 'p-0' : 'px-4 py-2'}`}
                >
                  {message.text && (
                    <div>{message.text}</div>
                  )}
                  
                  {message.isUrl && message.urlPreview && (
                    <div 
                      onClick={() => handleUrlClick(`https://www.${message.urlPreview?.url}`)}
                      className="bg-white overflow-hidden cursor-pointer transition-opacity hover:opacity-90 active:opacity-75 rounded-2xl"
                    >
                      <img 
                        src={message.urlPreview.image} 
                        alt="Link preview"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3 border border-gray-200 border-t-0 rounded-b-2xl">
                        <h3 className="font-medium text-gray-800">{message.urlPreview.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{message.urlPreview.url}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Remaining messages with normal spacing */}
          {messages.slice(3).map((message, index) => (
            <div
              key={index + 3}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div
                className={`${
                  message.isUser
                    ? 'bg-[#007AFF] text-white'
                    : 'bg-[#E9E9EB] text-black'
                } rounded-2xl overflow-hidden max-w-[60%] w-fit ${!message.text && message.isUrl ? 'p-0' : 'px-4 py-2'}`}
              >
                {message.text && (
                  <div>{message.text}</div>
                )}
                
                {message.isUrl && message.urlPreview && (
                  <div 
                    onClick={() => handleUrlClick(`https://www.${message.urlPreview?.url}`)}
                    className="bg-white overflow-hidden cursor-pointer transition-opacity hover:opacity-90 active:opacity-75 rounded-2xl"
                  >
                    <img 
                      src={message.urlPreview.image} 
                      alt="Link preview"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3 border border-gray-200 border-t-0 rounded-b-2xl">
                      <h3 className="font-medium text-gray-800">{message.urlPreview.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{message.urlPreview.url}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
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