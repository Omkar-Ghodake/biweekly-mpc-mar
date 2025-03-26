import React, { useState } from "react";
import ChatBotButton from "./ChatBotButton";
import ChatBox from "./ChatBox";

const ChatBot = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [displayGreeting, setDisplayGreeting] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setDisplayGreeting(false);

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text:
          input.toLowerCase() === "what is mpc?"
            ? "Based on the provided test, the full form of MPC is **Members of Parliament Corner**."
            : "I'm sorry, I don't have an answer for that.",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-fit w-fit fixed right-6 bottom-6">
      {isChatBoxOpen ? (
        <ChatBox
          messages={messages}
          isTyping={isTyping}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          displayGreeting={displayGreeting}
          setIsChatBoxOpen={setIsChatBoxOpen}
        />
      ) : (
        <ChatBotButton setIsChatBoxOpen={setIsChatBoxOpen} />
      )}
    </div>
  );
};

export default ChatBot;
