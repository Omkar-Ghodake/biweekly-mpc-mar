import React from "react";
import img from "../glb/dhoni1.png";
import { motion } from "framer-motion";

const Scores = () => {
  const gridItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const players = [
    { name: "Virat Kohli", image: img },
    { name: "Rohit Sharma", image: img },
    { name: "MS Dhoni", image: img },
    { name: "Jasprit Bumrah", image: img },
    { name: "Ravindra Jadeja", image: img },
    { name: "KL Rahul", image: img },
    { name: "Hardik Pandya", image: img },
    { name: "Rishabh Pant", image: img },
    { name: "Shubman Gill", image: img },
    { name: "Mohammed Shami", image: img },
    { name: "Yuzvendra Chahal", image: img },
    { name: "Shubman Gill", image: img },
    { name: "Mohammed Shami", image: img },
    { name: "Yuzvendra Chahal", image: img },
    { name: "Mohammed Shami", image: img },
    { name: "Yuzvendra Chahal", image: img },
    { name: "Yuzvendra Chahal", image: img },
    { name: "Mohammed Shami", image: img },
  ];

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center ">
      {/* Header Section */}
      <div className="w-auto h-auto justify-center items-center  flex flex-col bg-gradient-to-t from-blue-600 to-blue-200 opacity-90 p-1 rounded-tl-3xl rounded-br-3xl border-2 ">
        <div className="w-full bg-gradient-to-t from-blue-600 to-blue-200 opacity-90 rounded-tl-3xl rounded-br-3xl border-2 p-4">
          <div className="flex items-center text-3xl font-bold font-serif h-15">
            {/* Optional logo */}
            {/* <img src="logo.png" alt="Logo" className="w-12 h-12 mr-4" /> */}
            <span>MPC BUG HUNTERS</span>
          </div>
        </div>

        <div className="w-full flex-1  overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 my-3 p-2">
            {players.map((player, index) => (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={gridItemVariants}
                custom={index}
                key={index}
                className="bg-gradient-to-t from-blue-500 to-blue-200 p-4 shadow-lg flex flex-col items-center rounded-tl-3xl rounded-br-3xl border-2 border-blue-900"
              >
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-auto h-28 contrast-125 brightness-110"
                />
                <p className="mt-1 font-bold text-xl">{player.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scores;
