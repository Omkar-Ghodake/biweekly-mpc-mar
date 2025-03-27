import React from "react";
import { RiRobot2Line } from "react-icons/ri";

const ChatBotButton = ({ setIsChatBoxOpen }) => {
  return (
    <div
      className="fixed bottom-6 right-6 p-2 bg-blue-600 w-14 h-14 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
      onClick={() => setIsChatBoxOpen(true)}
    >
      {<RiRobot2Line className="text-white text-2xl" />}
    </div>
  );
};

export default ChatBotButton;
