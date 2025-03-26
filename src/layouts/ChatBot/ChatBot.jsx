import React, { useState } from "react";
import ChatBotButton from "./ChatBotButton";
import ChatBox from "./ChatBox";
import { GoogleGenAI } from "@google/genai";


const ChatBot = () => {

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [displayGreeting, setDisplayGreeting] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);



  // this code is for gemini ai 
  const ai = new GoogleGenAI({ apiKey: "AIzaSyBdTxoCOu2KI4EsTi5XHlVdL-AAi_rlu8o" });
  
  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how AI works",
    });
    console.log(response.text);
  }
  

  const generateResponse =async (prompt)=>{
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  }



  

  const sendMessage = async() => {
    if (!input.trim()) return;

    setDisplayGreeting(false);

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // setTimeout(() => {
    //   const botResponse = {
    //     sender: "bot",
    //     text:
    //       input.toLowerCase() === "what is mpc?"
    //         ? "Based on the provided test, the full form of MPC is **Members of Parliament Corner**."
    //         : "I'm sorry, I don't have an answer for that.",
    //   };
    //   setMessages((prev) => [...prev, botResponse]);
    //   setIsTyping(false);
    // }, 1000);

    try {
      const response = await generateResponse(input);
      const botResponse ={
        sender : "bot",
        text: response
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error) {
      sendMessage();
    }


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
