import React, { useState } from 'react';
import { Loader2, Paperclip, Mic, Send } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    "And what about before that?",
    "Wow! And what were you doing before the startup days?",
    "So how did you end up in tech in the first place?",
    "Oh wow... that's super interesting. Wait, so what's next?!",
    "That's interesting, never really thought about it that way.",
    "Hm, yeah for sure.",
    "I don't know... what am I supposed to do?",
    "Ahhhhhh, ok, ok.",
    "Why wouldn't it??",
    "Oh, I see! That's pretty cool, coding with AI?!"
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

  return (
    <section className="w-full max-w-4xl mx-auto my-24 bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-b from-white to-[#f8f8f7] border-b border-gray-200 p-8 text-gray-800 shadow-sm">
        <h2 className="font-sora text-3xl font-bold text-[#ff6b35]">Chat with Helen</h2>
        <p className="text-[#ff6b35] mt-2 font-inter font-medium text-lg">Ask me about my journey</p>
      </div>
      
      <div className="min-h-[500px] overflow-y-auto p-8 space-y-6 bg-[#fafaf9]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-4 ${message.isUser ? 'justify-end' : ''}`}
          >
            {!message.isUser && (
              <img
                src={helenAvatar}
                alt="Helen's avatar"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div
              className={`max-w-[75%] rounded-xl p-4 ${
                message.isUser
                  ? 'bg-[#76bb5d]/80 text-gray-700'
                  : 'bg-white shadow-md text-gray-700'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <img src={helenAvatar} alt="Helen's avatar" className="w-10 h-10 rounded-full mr-3 flex-shrink-0 object-cover" />            <div className="bg-white shadow-md border border-gray-100 rounded-2xl px-6 py-3">
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-gray-100 bg-gradient-to-t from-white to-[#f8f8f7]">
        {currentStep < responses.length ? (
          <button
            onClick={handleAskMore}
            disabled={isLoading}
            className={`w-full px-6 py-4 text-black text-lg rounded-xl hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium bg-[#76bb5d]/80`}
          >
            {questions[currentStep]}
          </button>
        ) : (
          <div className="flex items-center gap-3 border-2 rounded-xl p-4 text-gray-400">
            <Paperclip className="w-6 h-6" />
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 outline-none text-lg"
              disabled
            />
            <Mic className="w-6 h-6" />
            <Send className="w-6 h-6" />
          </div>
        )}
      </div>
    </section>
  );
} 