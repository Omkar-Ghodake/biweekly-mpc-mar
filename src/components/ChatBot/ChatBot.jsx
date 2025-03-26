import React, { useState } from "react";
import ChatBotButton from "./ChatBotButton";
import ChatBox from "./Chatbox";

const ChatBot = () => {
  const [screen, setScreen] = useState("floatingIcon");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (screen === "greeting") {
      setScreen("chat");
    }

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
    <div className="h-fit w-fit fixed left-6 bottom-6">
      {screen === "floatingIcon" && <ChatBotButton setScreen={setScreen} />}

      {screen !== "floatingIcon" && (
        <ChatBox
          messages={messages}
          isTyping={isTyping}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          setScreen={setScreen}
        />
      )}
    </div>
  );
};

export default ChatBot;
