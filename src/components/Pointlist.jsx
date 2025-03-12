import React from "react";
import { motion } from "framer-motion";

const Pointlist = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{delay: 0.09 * index}}
      className="w-10/12 mx-auto p-2 bg-slate-200 rounded-3xl grid grid-cols-6 text-center items-center shadow-md"
    >
      <span className="p-1 col-span-1  border-r-1 border-gray-400">{item}</span>
      <span className="p-1 col-span-3  border-r-1 border-gray-400 text-left ml-2">
        Name
      </span>
      <span className="p-1 col-span-1  border-r-1 border-gray-400">
        Issue Count
      </span>
      <span className="p-1 col-span-1">Score</span>
    </motion.div>
  );
};

export default Pointlist;
