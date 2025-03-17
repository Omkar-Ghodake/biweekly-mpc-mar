import React, { useContext } from "react";
import img from "../glb/dhoni1.png";
import { motion } from "framer-motion";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";
import ModalHead from "../layouts/Modal/ModalHead";
import ModalBody from "../layouts/Modal/ModalBody";

const Scores = () => {
  const gridItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };
  const { openModal } = useContext(ModalContext);

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
    { name: "Yuzvendra Chahal", image: img },
    { name: "Mohammed Shami", image: img },
    { name: "Yuzvendra Chahal", image: img },
    { name: "Mohammed Shami", image: img },
    { name: "Yuzvendra Chahal", image: img },
    { name: "Mohammed Shami", image: img },
  ];

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center ">
      {/* Header Section */}
      <div className="w-auto max-h-[950px] min-h-2/3 justify-center items-center  flex flex-col bg-gradient-to-t from-blue-600 to-blue-200 opacity-90 p-1 rounded-tl-3xl rounded-br-3xl border-2 ">
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
                onClick={openModal}
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
      <Modal>
        <ModalHead>
          <div className="flex flex-col w-full h-auto font-bold rounded-lg p-3 uppercase bg-amber-200 relative">
            <span className="text-2xl">Umakant Patil</span>
            <h4 className="text-lg">MPC</h4>
          </div>
        </ModalHead>

        <ModalBody>
          <div className="flex flex-row items-center space-x-5 p-5 relative">
            <div className="flex flex-col w-2/3 h-96 rounded-lg bg-gray-200 space-y-3 p-5">
              <div className="flex flex-row items-center w-auto h-auto justify-center rounded-lg bg-amber-200 space-x-5 text-2xl font-bold uppercase">
                MPC Career
              </div>

              <div className="relative grid grid-cols-2 md:grid-rows-2 justify-evenly gap-10 p-2 mx-3 font-bold text-xl">
                {/* Vertical Line */}
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400"></div>

                <div className="flex flex-col items-center">
                  <span>Current Score</span>
                  <span className="text-xl font-bold">23</span>
                </div>

                <div className="flex flex-col items-center">
                  <span>Previous Score</span>
                  <span className="text-xl font-bold">20</span>
                </div>

                <div className="flex flex-col items-center">
                  <span>Issue Count</span>
                  <span className="text-xl font-bold">20</span>
                </div>

                <div className="flex flex-col items-center">
                  <span>No. Of Courses</span>
                  <span className="text-xl font-bold">20</span>
                </div>
              </div>

              <div className="flex flex-row items-center w-auto h-full my-auto justify-center rounded-lg bg-amber-200 space-x-5 text-2xl font-bold uppercase">
                1st Ranking
              </div>
            </div>

            <div className="w-1/3 flex items-center justify-center relative">
              <img
                src={img}
                alt="Placeholder Image"
                className=" w-auto h-[620px] absolute -top-100 right-auto z-10"
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Scores;
