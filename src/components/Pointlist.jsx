import React from "react";
import { motion } from "framer-motion";

const Pointlist = ({ item, index, onClick }) => {
  const employeeId = item.emp_id?.toString();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.09 * index }}
      className="w-10/12 mx-auto p-2 bg-slate-200 transition-all duration-300 ease-in-out hover:bg-slate-300 hover:scale-102 hover:shadow-lg rounded-3xl grid grid-cols-6 text-center items-center shadow-md cursor-pointer"
      onClick={onClick}
    >
      <span className="p-1 col-span-1  border-r-1 border-gray-400">
        {employeeId}
      </span>
      <span className="p-1 col-span-3  border-r-1 border-gray-400 text-left ml-2">
        {item.domain_name}
      </span>
      <span className="p-1 col-span-1  border-r-1 border-gray-400">
        {item.total_issues}
      </span>
      <span className="p-1 col-span-1">{item.total_score}</span>
    </motion.div>
  );
};

export default Pointlist;
