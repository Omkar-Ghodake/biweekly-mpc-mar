import React from "react";
import { RiRobot2Line } from "react-icons/ri";
import { motion } from "framer-motion";

const ChatBotButton = ({ setScreen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-2 bg-blue-600 w-14 h-14 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
      onClick={() => setScreen("greeting")}
    >
      <RiRobot2Line size={28} className="text-white" />
    </motion.div>
  );
};

export default ChatBotButton;
