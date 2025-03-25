import React, { useContext, useState } from "react";
// import background from "../assets/background.jpg";
// import background from "../assets/background1.avif";
import { motion } from "framer-motion";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";
import ModalHead from "../layouts/Modal/ModalHead";
import ModalBody from "../layouts/Modal/ModalBody";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import StadiumBack from "./StadiumBack";

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
      role: "Captain",
    },
    {
      id: 2,
      name: "Anagha Shinde",
      image: "src/glb/Members_Photos_Final/Anagha.png",
      role: "Captain",
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
    {
      id: 9,
      name: "Manoj Inbarajan",
      image: "src/glb/Members_Photos_Final/Manoj.png",
    },
    {
      id: 10,
      name: "Mridual Upadhya ",
      image: "src/glb/Members_Photos_Final/Mridul.png",
    },
    {
      id: 11,
      name: "Nikita_Sonawane",
      image: "src/glb/Members_Photos_Final/Nikita_Sonawane.png",
    },
    {
      id: 12,
      name: "Nikita_Suhane",
      image: "src/glb/Members_Photos_Final/Nikita_Suhane.png",
    },
    {
      id: 13,
      name: "Omkar Ghodake",
      image: "src/glb/Members_Photos_Final/Omkar.png",
    },
    {
      id: 14,
      name: "Prithwikumar Selukar",
      image: "src/glb/Members_Photos_Final/Prithwi.png",
    },
    {
      id: 15,
      name: "Rishabh Kanojiya",
      image: "src/glb/Members_Photos_Final/Rishabh.png",
    },
    {
      id: 16,
      name: "Sakshi Rai",
      image: "src/glb/Members_Photos_Final/Sakshi.png",
    },
    {
      id: 17,
      name: "Sanjeev Prajapati",
      image: "src/glb/Members_Photos_Final/Sanjeev.png",
    },
    {
      id: 18,
      name: "Shubham Joshi",
      image: "src/glb/Members_Photos_Final/Shubham.png",
    },
    {
      id: 19,
      name: "Umakant Patil",
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
    <>
      <div className="relative w-screen h-screen">
        {/* Background Component */}
        <div className="absolute inset-0 ">
          <StadiumBack enableMouse={true} />
        </div>

        {/* Foreground Content */}
        <div className="relative flex flex-col items-center justify-center h-full ">
          {/* Header Section */}
          <div className="w-auto max-h-[950px] min-h-2/3 justify-center items-center  flex flex-col  p-1 rounded-3xl ">
            <div className=" text-white bg-gradient-to-b from-[#1E4788] to-sky-800 shadow-2xl w-full rounded-xl p-4 mt-2 ">
              <div className="flex items-center justify-center text-3xl font-bold font-serif h-10 uppercase ">
                {/* Optional logo */}
                {/* <img src="logo.png" alt="Logo" className="w-12 h-12 mr-4" /> */}
                <span>Team members</span>
              </div>
            </div>

            <div className="w-full flex-1  overflow-y-scroll [&::-webkit-scrollbar]:hidden opacity-90 rounded-lg backdrop-blur-sm">
              {/* Old Implementation */}
              {/* {players.map((player, index) => (
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
            ))} */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-14 my-5 p-5 ">
                {players.map((player, index) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={gridItemVariants}
                    custom={index}
                    key={index}
                    onClick={() => handleCardClick(player)}
                    class="relative w-56 h-56   rounded-t-lg  flex justify-center items-end mx-auto my-4 rounded-b-lg"
                  >
                    <div class="absolute inset-0 bg-gray-300 rounded-t-lg opacity-90"></div>

                    {/* Dark Gray Background (Below Diagonal) */}
                    <div
                      className="absolute inset-0  z-1 bg-[#1E4788] "
                      style={{
                        clipPath:
                          "polygon(0% 49%, 100% 30%, 100% 100%, 0% 100%)",
                      }}
                    ></div>
                    <div class="absolute -top-8 right-42 text-6xl text-white  bg-transparent font-bold  px-1 py-0 rounded-r-lg ">
                      {player.id}
                    </div>
                    {/* <!-- Player Image and Name --> */}
                    <div class=" absolute -top-10 left-18 transform -translate-x-1/2 flex items-center space-x-0">
                      <img src={player.image} class="w-auto h-36" />

                      <span class="text-black font-bold text-lg items-start uppercase ">
                        {player.role ? player.role : "Player"}
                      </span>
                    </div>
                    {/* <!-- Diagonal Line Below Image --> */}
                    <div class="absolute top-21.5 z-1 left-28 rounded-lg transform -translate-x-1/2 w-[227px]  h-1 bg-white -rotate-10"></div>
                    {/* Bottom Triangle */}
                    <div class="absolute bottom-[-40px] w-0 h-0 border-l-[112px] border-r-[112px] border-t-[40px] border-l-transparent border-r-transparent border-t-[#1E4788] "></div>
                    <span class="absolute bottom-15 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl text-center w-full z-1">
                      {player.name}
                    </span>
                    <span class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm text-center w-full z-1">
                      Team MPC
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {selectedPlayer && (
            <Modal className="bg-transparent ">
              <div className="absolute w-[750px] h-[600px] flex justify-center items-end mx-auto">
                {/* Player Rank (Top-Right Corner) */}
                {/* <div className="absolute -top-1 right-0 bg-gray-800 opacity-70 text-white font-bold px-4 py-2 rounded-bl-lg rounded-tr-lg text-2xl">
                  {selectedPlayer.id ? ` ${selectedPlayer.id}` : "Unranked"}
                </div> */}

                {/* Player Image and Name */}
                <div className="absolute z-10 -top-[0px] right-0 transform -translate-x-40 flex items-center justify-between w-full max-w-[420px]">
                  {/* Player Info (Left Side) */}
                  <div className="flex flex-col text-left">
                    {/* Player Role (Top) */}
                    <span className="text-black font-bold uppercase text-3xl italic">
                      {selectedPlayer.role ? selectedPlayer.role : "Player"}
                    </span>

                    {/* Player Details Container */}
                    <div className="flex flex-col space-y-2 mt-1">
                      {/* Player Name */}
                      <span className="font-bold text-2xl">
                        {selectedPlayer.name}
                      </span>

                      {/* Team Name */}
                      <span className="font-bold text-md">Team MPC</span>
                    </div>
                  </div>

                  {/* Player Image (Right Side) */}
                  <img
                    src={selectedPlayer.image}
                    className="w-auto h-56
                     rounded-b-4xl"
                  />
                </div>

                {/* Background Shapes */}
                <div
                  className="w-[450px] h-[405px] -top-50 rounded-2xl rounded-b-2xl bg-gray-300 opacity-50 relative"
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 0% 70%)",
                  }}
                ></div>

                {/* Square with Grid Layout */}
                <div
                  className="w-[450px] h-[450px] -top-2 bg-gray-900 absolute  text-white"
                  style={{
                    clipPath: "polygon(0% 65%, 100% 20%, 100% 100%, 0% 100%)",
                  }}
                >
                  <div className=" relative  grid grid-cols-2 md:grid-cols-2 py-72 p-7 gap-4 ">
                    {/* Current Score */}
                    <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
                      <span className="text-md font-bold">Current Score</span>
                      <span className="text-md">
                        {selectedPlayer.currentScore || "N/A"}
                      </span>
                    </div>

                    {/* Previous Score */}
                    <div className="bg-gray-600 p-3 rounded-lg flex flex-col items-center">
                      <span className="text-md font-bold">Previous Score</span>
                      <span className="text-md">
                        {selectedPlayer.previousScore || "N/A"}
                      </span>
                    </div>

                    {/* Total Issue Count */}
                    <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
                      <span className="text-md font-bold">Total Issues</span>
                      <span className="text-md">
                        {selectedPlayer.totalIssues || "N/A"}
                      </span>
                    </div>

                    {/* Number of Courses */}
                    <div className="bg-gray-600 p-3 rounded-lg flex flex-col items-center">
                      <span className="text-md font-bold">No. of Courses</span>
                      <span className="text-md">
                        {selectedPlayer.numCourses || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Triangle */}
                <div className="absolute bottom-[150px] h-0 border-l-[226.5px] border-r-[226.5px] border-t-[70px] top-109 mt-1  border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Scores;
