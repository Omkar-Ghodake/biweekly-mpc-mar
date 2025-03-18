import React, { useContext, useState } from "react";

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
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = [
    {
      id: 1,
      name: "Vishnu Menon",
      image: "src/glb/Members_Photos_Final/Vishnu.png",
    },
    {
      id: 2,
      name: "Anagha Shinde",
      image: "src/glb/Members_Photos_Final/Anagha.png",
    },
    {
      id: 3,
      name: "Anshree Shukla",
      image: "src/glb/Members_Photos_Final/Anushree.png",
    },
    {
      id: 4,
      name: "Avinash Gupta",
      image: "src/glb/Members_Photos_Final/Avinash.png",
    },
    {
      id: 5,
      name: "Bhavya Momaya",
      image: "src/glb/Members_Photos_Final/Bhavya.png",
    },
    {
      id: 6,
      name: "Devraj Singh",
      image: "src/glb/Members_Photos_Final/Devraj.png",
    },
    {
      id: 7,
      name: "Dhiraj Kunder",
      image: "src/glb/Members_Photos_Final/Dhiraj.png",
    },
    {
      id: 8,
      name: "Jaypal Koli",
      image: "src/glb/Members_Photos_Final/Jaipal.png",
    },
    { id: 9, name: "Manoj", image: "src/glb/Members_Photos_Final/Manoj.png" },
    {
      id: 10,
      name: "Mridual ",
      image: "src/glb/Members_Photos_Final/Mridul.png",
    },
    {
      id: 12,
      name: "Nikita_Sonawane",
      image: "src/glb/Members_Photos_Final/Nikita_Sonawane.png",
    },
    {
      id: 13,
      name: "Nikita_Suhane",
      image: "src/glb/Members_Photos_Final/Nikita_Suhane.png",
    },
    { id: 14, name: "Omkar", image: "src/glb/Members_Photos_Final/Omkar.png" },
    {
      id: 15,
      name: "Prithwi",
      image: "src/glb/Members_Photos_Final/Prithwi.png",
    },
    {
      id: 16,
      name: "Rishabh",
      image: "src/glb/Members_Photos_Final/Rishabh.png",
    },
    {
      id: 17,
      name: "Sakshi",
      image: "src/glb/Members_Photos_Final/Sakshi.png",
    },
    {
      id: 18,
      name: "Sanjeev",
      image: "src/glb/Members_Photos_Final/Sanjeev.png",
    },
    {
      id: 18,
      name: "Shubham",
      image: "src/glb/Members_Photos_Final/Shubham.png",
    },
    {
      id: 18,
      name: "Umakant",
      image: "src/glb/Members_Photos_Final/Umakant.png",
    },

    // { id:19,name: "Mohammed Shami", image: img },
    // { id:1,name: "Yuzvendra Chahal", image: img },
    // { id:1,name: "Mohammed Shami", image: img },
    // { id:1,name: "Yuzvendra Chahal", image: img },
    // { id:1,name: "Mohammed Shami", image: img },
    // { id:1,name: "Yuzvendra Chahal", image: img },
    // { id:1,name: "Mohammed Shami", image: img },
  ];

  const handleCardClick = (player) => {
    setSelectedPlayer(player);
    openModal();
  };

  return (
    <div className="bg-black w-full max-h-screen flex flex-col items-center justify-center ">
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
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 my-3 p-2 ">
            {players.map((player, index) => (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={gridItemVariants}
                custom={index}
                key={index}
                onClick={() => handleCardClick(player)}
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
      {selectedPlayer && (
        <Modal className="bg-transparent ">
          <ModalHead>
            <div className="flex flex-col h-auto font-bold uppercase w-full text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3 relative">
              <span className="text-2xl">{selectedPlayer.name}</span>
              <h4 className="text-lg">MPC</h4>
            </div>
          </ModalHead>

          <ModalBody>
            <div className="flex flex-row flex-wrap items-center p-5 relative w-full">
              <div className="flex flex-col w-3/5 h-96 rounded-lg bg-gray-200 space-y-3 p-0">
                <div className="flex flex-row items-center w-auto h-auto justify-center rounded-t-lg bg-amber-200 space-x-5 text-2xl  uppercase py-3 font-bold  text-center text-white bg-gradient-to-b from-sky-600 to-sky-800  shadow-md p-3">
                  MPC Career
                </div>

                <div className="relative grid grid-cols-2 md:grid-rows-2 justify-evenly gap-6  my-5 mx-3 font-bold text-xl">
                  {/* Vertical Line */}
                  {/* <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400"></div> */}

                  <div className="flex flex-col items-center  bg-gray-300 p-3 rounded-lg">
                    <span>Current Score</span>
                    <span className="text-xl font-bold">23</span>
                  </div>

                  <div className="flex flex-col items-center  bg-gray-300 p-3 rounded-lg">
                    <span>Previous Score</span>
                    <span className="text-xl font-bold">20</span>
                  </div>

                  <div className="flex flex-col items-center  bg-gray-300 p-3 rounded-lg">
                    <span>Issue Count</span>
                    <span className="text-xl font-bold">20</span>
                  </div>

                  <div className="flex flex-col items-center  bg-gray-300 p-3 rounded-lg">
                    <span>No. Of Courses</span>
                    <span className="text-xl font-bold">20</span>
                  </div>
                </div>

                <div className="flex flex-row items-center w-auto h-full my-auto justify-center rounded-b-lg bg-amber-200 space-x-5  text-2xl font-bold uppercase text-white bg-gradient-to-b from-sky-600 to-sky-800  ">
                  1st Ranking
                </div>
              </div>

              <div className=" w-[350px] flex items-center relative">
                <img
                  src={selectedPlayer.image}
                  alt="Placeholder Image"
                  className=" w-full  h-[537px]  brightness-110 absolute -top-135 -right-120 z-10"
                />
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default Scores;
