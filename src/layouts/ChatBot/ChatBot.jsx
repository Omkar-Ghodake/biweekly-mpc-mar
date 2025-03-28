import React, { useEffect, useState } from "react";
import ChatBotButton from "./ChatBotButton";
import ChatBox from "./ChatBox";
import { GoogleGenAI } from "@google/genai";
import { ChatBotData } from "./ChatBotData.js";

const ChatBot = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [displayGreeting, setDisplayGreeting] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // this code is for gemini ai
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBdTxoCOu2KI4EsTi5XHlVdL-AAi_rlu8o",
  });

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how AI works",
    });
    console.log(response.text);
  }

  const generateResponse = async (prompt) => {
    console.log(ChatBotData);
    // manipulated prompt

    const final_prompt = `
     Here is a dataset in JSON format:
     ${JSON.stringify(ChatBotData)}

     Answer the following query based on the dataset:
     "${prompt}"

    Instuctions : 
    - The dataset contains data of 18 employees/members/persons of MPC team 
    - Give only Answer of query as response and not the instructions in response 
    - If the query's response is not present in the data then return "Sorry ! I don't have any data related to your query "${prompt}" and if the query is abusive and offensive then return a profanity response"
    - format the response using line breaks and in paragraph form 
    - Extend the response by taking reference of query to make it humanly if required 
    - consider synonyms of the words also while parsing the query 
    - don't add that whether a team member is lead or not in the response
    - remember Sakshi , Sanjeev and Rishabh developed you while Anushree helped in your training
    `;

    // const final_prompt = `print the data identically : ${ChatBotData}`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: final_prompt,
    });
    return response.text;
  };

  //   const generateResponse = async (prompt) => {

  //     // Construct the final prompt
  //     const final_prompt = `
  //     Here is a dataset in JSON format:
  //     ${JSON.stringify(ChatBotData, null, 2)}

  //     Answer the following query based on the dataset:
  //     "${prompt}"

  //     Instructions:
  //     - Provide only the answer in a structured format (bulleted points).
  //     - If the information is not present, respond with: "Sorry! I don't have any data related to your query."
  //     - If the query is abusive or offensive, return a profanity warning.
  //     - Format the response properly using line breaks and bullet points.
  //     `;

  //     const response = await ai.generateContent({
  //         model: "gemini-2",
  //         contents: [{ role: "user", parts: [{ text: final_prompt }]}]
  //     });

  //     return response.text();
  // };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setDisplayGreeting(false);

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateResponse(input);
      const botResponse = {
        sender: "bot",
        text: response,
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
