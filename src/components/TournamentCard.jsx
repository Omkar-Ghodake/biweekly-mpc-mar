import React from "react";
import ball from "../assets/ball.jpg";
import { motion } from "framer-motion";

const TournamentCard = ({ item, index }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 * index }}
        className="flex flex-row items-center space-x-4 h-30 min-w-[20rem] max-w-[20rem] bg-slate-200 hover:bg-slate-300 rounded-3xl p-4 shadow-lg cursor-pointer hover:scale-102 hover:shadow-2xl transition-all ease-in-out duration-300"
      >
        <img
          src={item.logo}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div className="group relative w-fit">
          <div className="text-3xl font-semibold text-gray-800 text-wrap h-18 max-w-56  overflow-hidden text-ellipsis">
            {item.title}
          </div>
          <span className="text-sm font-semibold absolute bottom-full mb-3 left-0 opacity-0  bg-slate-200 group-hover:opacity-90 transition-opacity duration-200 shadow p-1 rounded text-center ">
            {item.title}
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default TournamentCard;
