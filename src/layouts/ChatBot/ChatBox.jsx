import React from "react";
import { LuSend } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const ChatBox = ({
  messages,
  isTyping,
  input,
  setInput,
  sendMessage,
  displayGreeting,
  setIsChatBoxOpen,
}) => {
  return (
    <div className="w-[30vw] h-[85vh] bg-gradient-to-b from-blue-900 to-blue-950 rounded-xl p-4 text-white shadow-lg flex flex-col relative">
      <RxCross2
        className="absolute top-5 right-5 cursor-pointer text-xl"
        onClick={() => {
          setIsChatBoxOpen(false);
        }}
      />

      {displayGreeting ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center space-y-1">
          <div className="text-4xl">🤖MPC Chatbot</div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold">Hello!</p>
            <p className="text-lg font-semibold">
              How can I assist you today?
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="text-center text-lg font-semibold pb-2 border-b border-gray-600 flex flex-col items-center">
            <div className="text-2xl">🤖</div>
            <div className="text-2xl">M</div>
          </div>
          <div className="flex-1 space-y-2 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] text-white relative ${
                    msg.sender === "user"
                      ? "bg-[#2A1A7E] bg-opacity-80 pr-12"
                      : "bg-[#2A1A7E] bg-opacity-80 pl-10"
                  }`}
                >
                  <span>{msg.text}</span>
                  {msg.sender === "user" && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-white text-black flex items-center justify-center rounded-md text-xs">
                      👤
                    </div>
                  )}
                  {msg.sender === "bot" && (
                    <div className="absolute bottom-1 left-1 w-5 h-5 bg-white text-black flex items-center justify-center rounded-md text-xs">
                      🤖
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-[#2A1A7E] bg-opacity-80 text-white text-sm flex space-x-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-150">.</span>
                  <span className="animate-bounce delay-300">.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* {display === "greeting" ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center space-y-1">
          <div className="text-4xl">🤖MPC Chatbot</div>
          <p className="text-lg font-semibold">Hello!</p>
          <p className="text-lg font-semibold">How can I assist you today?</p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="text-center text-lg font-semibold pb-2 border-b border-gray-600 flex flex-col items-center">
            <div className="text-2xl">🤖</div>
            {console.log(display)}
          </div>
          <div className="flex-1 space-y-2 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] text-white relative ${
                    msg.sender === "user"
                      ? "bg-[#2A1A7E] bg-opacity-80 pr-12"
                      : "bg-[#2A1A7E] bg-opacity-80 pl-10"
                  }`}
                >
                  <span>{msg.text}</span>
                  {msg.sender === "user" && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-white text-black flex items-center justify-center rounded-md text-xs">
                      👤
                    </div>
                  )}
                  {msg.sender === "bot" && (
                    <div className="absolute bottom-1 left-1 w-5 h-5 bg-white text-black flex items-center justify-center rounded-md text-xs">
                      🤖
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-[#2A1A7E] bg-opacity-80 text-white text-sm flex space-x-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-150">.</span>
                  <span className="animate-bounce delay-300">.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )} */}
      <div className="absolute bottom-0 left-0 w-full px-4 pb-4 bg-transparent">
        <div className="w-full h-px bg-white bg-opacity-20 mb-2"></div>
        <div className="flex items-center space-x-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message"
            className="flex-1 bg-[#1E3A8A] bg-opacity-20 text-white px-4 py-2 outline-none placeholder-white w-[80%] h-10 rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-white p-2 w-10 h-10 flex justify-center items-center shadow-md rounded-lg cursor-pointer"
          >
            <LuSend className="text-blue-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
