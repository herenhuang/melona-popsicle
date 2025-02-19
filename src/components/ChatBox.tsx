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
    "And what were you doing before that?",
    "That... makes a lot of sense.",
    "I wonder if a lot of Forbes listers end up doing this...",
    "Wait, so what IS next?!",
    "That's interesting...",
    "Hm, yeah for sure.",
    "I don't know... what am I supposed to do?",
    "Ahhhhhh, ok, ok.",
    "Wait, why not?",
    "Wait what? You're telling me I've had no control over any of this?"
  ];

  const responseChunks = [
    [
      "well i am currently doing an adult gap year/sabbatical right now, or funemployed, whatever you want to call it.",
      "spending time going to dance class, catching up with friends",
      "learning AI (so that I can even make this site)"
    ],
    [
      "well ever since i read the 4-hour workweek by Tim Ferris a few years ago, i've really loved the concept of mini-retirements. figured this was as good as year as any to experience my own."
    ],
    [
      "so about half a year ago i stepped back from the day to day of running co.lab (the experimental education/tech company i started with sefunmi back in 2021). after that i worked on a few different projects (fintech, crypto) in a fractional/advisory capacity.",
      "then at the beginning of this year i realized that even though there's so much uncertainty (economically, politically, technologically with the rise of ai) - i just wanted to chill out. stop trying to figure out and optimize my next steps. just enjoy (for a little bit)."
    ],
    [
      "yeah! i'm super grateful that i'm in a position where i can actually do this though :) am privileged for sure.",
      "again i'm not sure exactly how long this will last, probably won't be a full gap year if i'm being super honest, but that's my plan for now!"
    ],
    [
      "LOL 🤡 probably? i dont see why not",
      "ive def had a lot of twists in my life, studying earth science at waterloo (to chase a boy) to moving to seattle and working as a faang PM to quitting that and starting a company and then digital nomading... its been a fun time.",
      "so we'll see what happens next i guess 🤷🏻‍♀️"
    ],
    [
      "i have no clue tbh.",
      "i'm just trying to remind myself that the adventure is in the unknown. tho i'd say it's harder than i anticipated - holding myself accountable (and productive), not having a clear goal or \"mission\". it's weird and goes against all of the KPI and results-oriented metrics that i've lived this past decade."
    ],
    [
      "i'm sure you get what i mean :) still excited tho! <3"
    ],
    [
      "wait",
      "lol why are you still around talking to me?"
    ],
    [
      "You do whatever you want to do :^)",
      "pave your own path!",
      "i appreciate you for learning a bit about mine though.",
      "you can check out my /now page?",
      {
        isUrl: true,
        urlPreview: {
          title: "Helen Huang | Now",
          url: "helenhuang.io/now",
          image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=300&auto=format&fit=crop"  // Make sure this image exists in your public folder
        }
      }
    ],
    [
      "ok bye now! shoo!",
      "but srsly though, this convo isn't going to last forever."
    ],
    [
      "i scripted out this entire thing..."
    ],
    [
      "YES BUT PLEASE LEAVE T_T (and check out the rest of the site)",
      "SO I CAN STOP SCRIPTING THIS OK.",
      "but also take care of yourself, you're doing great if you made it this far kek. <3",
      "maybe msg me elsewhere so I know, cause it's sorta jokes you stuck around this whole time."
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
        
        // Check if response is a URL preview object or a text message
        if (typeof response === 'string') {
          setMessages(prev => [...prev, { text: response, isUser: false }]);
        } else {
          setMessages(prev => [...prev, { ...response, isUser: false }]);
        }
      }
      
      setIsLoading(false);
      setCurrentStep(prev => prev + 1);
    }
  };

  const currentQuestion = questions[currentStep] || '';
  const typedPart = currentQuestion.slice(0, typedLength);
  const remainingPart = currentQuestion.slice(typedLength);

  const handleUrlClick = (url: string) => {
    // Remove https://www. if present
    const cleanUrl = url.replace('https://www.', '');
    
    // If it's an internal route (starts with helenhuang.io)
    if (cleanUrl.startsWith('helenhuang.io/')) {
      const route = '/' + cleanUrl.split('/').slice(1).join('/');
      navigate(route);
    } else {
      // External URL
      window.open('https://www.' + cleanUrl, '_blank');
    }
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
          <div className="space-y-1">
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
                  } rounded-2xl overflow-hidden w-fit max-w-[75%] ${!message.text && message.isUrl ? 'p-0' : 'px-4 py-[0.6rem]'}`}
                >
                  {message.text && (
                    <div className="whitespace-pre-wrap break-words leading-normal">{message.text}</div>
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

          {/* Remaining messages with chunk-aware spacing */}
          {messages.slice(3).reduce((groups, message, index) => {
            const isFirstInChunk = index === 0 || message.isUser;
            
            if (isFirstInChunk) {
              groups.push([message]);
            } else {
              groups[groups.length - 1].push(message);
            }
            
            return groups;
          }, [] as Array<typeof messages>).map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-1 mb-4">
              {group.map((message, messageIndex) => (
                <div
                  key={messageIndex}
                  className={`flex ${message.isUser ? 'justify-end my-6' : 'justify-start'} w-full`}
                >
                  <div
                    className={`${
                      message.isUser
                        ? 'bg-[#007AFF] text-white'
                        : 'bg-[#E9E9EB] text-black'
                    } rounded-2xl overflow-hidden w-fit max-w-[75%] ${!message.text && message.isUrl ? 'p-0' : 'px-4 py-[0.6rem]'}`}
                  >
                    {message.text && (
                      <div className="whitespace-pre-wrap break-words leading-normal">{message.text}</div>
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