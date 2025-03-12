import React from "react";
import { motion } from "framer-motion";
import Pointlist from "../../components/Pointlist";

const EditTeam = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="h-screen flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-col space-y-3 w-3/4 max-h-40 min-h-5/6 bg-sky-400 p-4 rounded-xl overflow-y-scroll [&::-webkit-scrollbar]:hidden"
      >
        {/* Header Row */}
        <div className="w-10/12 mx-auto p-2 bg-slate-100 font-bold rounded-3xl grid grid-cols-6 text-center items-center ">
          <span className="p-1 col-span-1 border-r border-gray-400">
            Sr. no.
          </span>
          <span className="p-1 col-span-3 border-r border-gray-400 text-left ml-2">Name</span>
          <span className="p-1 col-span-1 border-r border-gray-400">
            Issue Count
          </span>
          <span className="p-1 col-span-1">Score</span>
        </div>

        {/* Animated Pointlist Items */}
        <div className="list flex flex-col space-y-3">
          {arr.map((item, index) => (
            <Pointlist item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EditTeam;
