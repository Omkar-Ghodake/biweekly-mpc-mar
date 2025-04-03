import React, { useContext, useEffect, useState } from "react";
// import background from "../assets/background.jpg";
// import background from "../assets/background1.avif";
import { motion } from "framer-motion";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";
import ModalHead from "../layouts/Modal/ModalHead";
import ModalBody from "../layouts/Modal/ModalBody";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import StadiumBack from "./StadiumBack";
import { PlayersContext } from "../context/PlayersProvider";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import Button from "../components/Button";

const Scores = () => {
  const gridItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };
  const { openModal, closeModal } = useContext(ModalContext);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { players, updateData } = useContext(PlayersContext);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("courses"); // Default to Courses
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(undefined);

  // useEffect(() => {
  //   fetchPlayers()
  // }, [])

  useEffect(() => {
    if (closeModal) {
      setActiveSection("courses");
    }
  }, [closeModal]);

  // console.log(selectedPlayer.project);

  // const { data, error, loading } = useAxios(
  //   'http://localhost:5500/api/v1/players/get-all-players'
  // )

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen);
    setIsProjectOpen(false);
  };
  const toggleProjects = () => {
    setIsProjectOpen(!isProjectOpen);
    setIsCoursesOpen(false);
  };

  const handleCardClick = (player, index) => {
    setSelectedPlayer(player);
    setSelectedPlayerIndex(index);
    openModal();
  };

  const sortedPlayers = players.sort((a, b) => b.total_score - a.total_score);
  return (
    <>
      {/* <Button onClick={updateData}>click to re fetch</Button> */}

      <div className="relative w-screen h-screen">
        {/* Background Component */}
        <div className="absolute inset-0 ">
          <StadiumBack enableMouse={true} />
        </div>

        {/* Foreground Content */}
        <div className="relative flex flex-col items-center justify-center h-full">
          {/* Header Section */}
          <div className="w-auto max-h-[950px] min-h-2/3 justify-center items-center  flex flex-col  p-1 rounded-3xl ">
            <div className=" text-white bg-gradient-to-b from-[#1E4788] to-sky-800 shadow-2xl w-full rounded-xl p-4 mt-2 cursor-pointer">
              <div className="flex items-center justify-center text-3xl font-bold font-serif h-10 uppercase ">
                <span>Team members</span>
              </div>
            </div>

            <div className="w-full flex-1  overflow-y-scroll [&::-webkit-scrollbar]:hidden opacity-90 rounded-lg backdrop-blur-sm    flex-wrap justify-center items-center">
              <div className="grid grid-cols-4 md:grid-cols-4 gap-14 my-5 p-5 ">
                {sortedPlayers.map((player, index) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={gridItemVariants}
                    custom={index}
                    key={index}
                    onClick={() => handleCardClick(player, index)}
                    className={`relative  w-56 h-56 rounded-t-lg flex justify-center items-end  mx-auto my-4 rounded-b-lg cursor-pointer ${
                      index > sortedPlayers.length - 3
                        ? "col-span-1  left-70 items-center justify-self-center"
                        : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gray-300 rounded-t-lg opacity-90 "></div>
                    <div className="cursor-pointer">
                      {/* Dark Gray Background (Below Diagonal) */}
                      <div
                        className="absolute inset-0  z-1 bg-[#1E4788] "
                        style={{
                          clipPath:
                            "polygon(0% 49%, 100% 30%, 100% 100%, 0% 100%)",
                        }}
                      ></div>
                      <div
                        className={`absolute -top-8 text-6xl text-white bg-transparent font-bold px-1 py-0 rounded-r-lg ${
                          (index + 1).toString().length === 1
                            ? "right-45"
                            : "right-43"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {/* <!-- Player Image and Name --> */}
                      <div className=" absolute -top-10 left-18 transform -translate-x-1/2 flex items-center space-x-0">
                        <img src={player.image} className="w-auto h-36" />

                        <span className="text-black font-bold text-lg items-start uppercase ">
                          {player.role ? player.role : "Player"}
                        </span>
                      </div>
                      {/* <!-- Diagonal Line Below Image --> */}
                      <div className="absolute top-21.5 z-1 left-28 rounded-lg transform -translate-x-1/2 w-[227px]  h-1 bg-white -rotate-10"></div>
                    </div>
                    {/* Bottom Triangle */}
                    <div className="absolute bottom-[-40px] w-0 h-0 border-l-[112px] border-r-[112px] border-t-[40px] border-l-transparent border-r-transparent border-t-[#1E4788] cursor-pointer"></div>
                    <span className="absolute bottom-15 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl text-center w-full z-1">
                      {player.domain_name}
                    </span>
                    <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm text-center w-full z-1">
                      Team MPC
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedPlayer && (
        <Modal className="bg-transparent max-w-1/3 flex items-start justify-center">
          <div className="absolute h-[600px] flex w-fit justify-center items-end mx-auto">
            {/* Player Rank (Top-Right Corner) */}
            <div
              className="absolute right-0 -top-2 z-10 text-4xl w-15 h-13 flex justify-center items-center text-white font-bold rounded-bl-lg rounded-tr-lg"
              // style={{
              //   left:
              //     (
              //       sortedPlayers.findIndex(
              //         (player) => player.id === selectedPlayer.id
              //       ) + 1
              //     ).toString().length === 1
              //       ? '560px'
              //       : '552px',
              // }}
            >
              {/* {sortedPlayers.findIndex(
                (player) => player.id === selectedPlayer.id
                ) + 1} */}
              {selectedPlayerIndex + 1}
            </div>

            {/* Player Image and Name */}
            <div className="absolute z-10 -top-[5px] right-0 transform flex items-center justify-between w-full px-5">
              {/* Player Info (Left Side) */}
              <div className="flex flex-col text-left">
                {/* Player Role (Top) */}
                <span className="text-black font-bold uppercase text-3xl italic  top-3 my-3">
                  {selectedPlayer.role ? selectedPlayer.role : "Player"}
                </span>

                {/* Player Details Container */}
                <div className="flex flex-col ">
                  <span className="font-bold text-2xl">
                    {selectedPlayer.domain_name}
                  </span>

                  <span className="font-bold text-sm">Team MPC</span>
                </div>
              </div>
              <div className="absolute z-1 top-[5px] right-0 w-fit flex items-center justify-between">
                {/* Player Image (Right Side) */}
                <img
                  src={selectedPlayer.image}
                  className="w-auto h-56
                     rounded-b-4xl"
                />
              </div>
            </div>

            {/* Background Shapes */}
            <div className="w-[450px] h-[405px] -top-50 relative">
              {/* Top-Left Dark Gray Section */}

              {/* Top-Right Square Section */}
              <div className="absolute top-0 right-0 w-15 h-13 z-1 bg-[#05214e] opacity-70 rounded-bl-2xl rounded-tr-2xl"></div>

              {/* Main Background (Light Gray) */}
              <div
                className="absolute inset-0 bg-slate-200 opacity-65 rounded-tl-2xl rounded-tr-2xl rounded-2xl "
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 0% 70%)",
                }}
              ></div>
            </div>

            {/* Square with Grid Layout */}
            <div
              className="w-[450px] h-[450px] -top-2 bg-[#1E4788] absolute  rounded-b-md text-white"
              style={{
                clipPath: "polygon(0% 65%, 100% 20%, 100% 100%, 0% 100%)",
              }}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-3 py-72 p-3 gap-4">
                {/* Left Side: Scores & Issues */}
                <div className="col-span-2 w-3/4 flex flex-col gap-4">
                  {/* Current Score */}
                  <div className="p-2  rounded-lg bg-gray-900/50 backdrop-blur-md">
                    <span className="text-md font-bold">Current Score: </span>
                    {selectedPlayer.total_score || "N/A"}
                  </div>

                  {/* Previous Score */}
                  <div className="bg-gray-900/50 p-2 rounded-lg">
                    <span className="text-md font-bold">Previous Score: </span>
                    {selectedPlayer.pre_score || "N/A"}
                  </div>

                  {/* Total Issue Count */}
                  <div className="bg-gray-900/50 p-2 rounded-lg">
                    <span className="text-md font-bold">Total Issues: </span>
                    {selectedPlayer.total_issues || "N/A"}
                  </div>
                </div>

                {/* Switch Imple. */}

                <div className="col-span-1 flex flex-col w-full  md:w-49 -mx-16">
                  <div className="flex justify-center my-0 ">
                    <div className="relative w-full h-10 bg-gray-900/50 rounded-lg flex items-center p-1 shadow-md ">
                      <button
                        className={`w-1/2 h-full flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                          activeSection === "courses"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300"
                        }`}
                        onClick={() => setActiveSection("courses")}
                      >
                        Courses
                      </button>

                      <button
                        className={`w-1/2 h-full flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                          activeSection === "projects"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300"
                        }`}
                        onClick={() => setActiveSection("projects")}
                      >
                        Projects
                      </button>
                    </div>
                  </div>

                  {/* Content Below Switch */}
                  <div className="bg-gray-900/50 p-2 rounded-lg mt-1">
                    {activeSection === "courses" && (
                      <ul
                        className="list-disc pl-5 max-h-19 h-19 my-2 overflow-y-auto
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400"
                      >
                        {selectedPlayer.courses &&
                        Array.isArray(selectedPlayer.courses) &&
                        selectedPlayer.courses.length > 0 ? (
                          selectedPlayer.courses.flatMap((course, index) =>
                            course.split(",").map((subCourse, subIndex) => (
                              <li key={`${index}-${subIndex}`}>
                                {subCourse.trim()}
                                {console.log(selectedPlayer.courses)}
                              </li>
                            ))
                          )
                        ) : (
                          <h2 className="flex mr-7  items-center justify-center">
                            No Courses Found
                          </h2>
                        )}
                      </ul>
                    )}

                    {activeSection === "projects" && (
                      <ul
                        className="list-disc pl-5 max-h-19 h-19 my-2 overflow-y-auto 
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400"
                      >
                        {selectedPlayer.projects &&
                        Array.isArray(selectedPlayer.projects) &&
                        selectedPlayer.projects.length > 0 ? (
                          selectedPlayer.projects.flatMap((project, index) =>
                            project.split(",").map((subProject, subIndex) => (
                              <li key={`${index}-${subIndex}`}>
                                {subProject.trim()}
                                {console.log(selectedPlayer.projects)}
                              </li>
                            ))
                          )
                        ) : (
                          <h2 className="flex mr-7  items-center justify-center">
                            No Project Found
                          </h2>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Triangle */}
            <div className="absolute   border-l-[224px] border-r-[224px] border-t-[90px] top-110 border-l-transparent border-r-transparent border-t-[#1E4788] "></div>
          </div>
          {/* <div className="absolute w-[553px] h-[598px] left-[1237px] top-[741px] bg-white bg-opacity-70 rounded-b-md "></div>

          
          <div className="absolute -right-[430px] top-[591px] border-l-[327px] border-r-[327px] border-b-[151px] border-l-transparent border-r-transparent border-b-[#1E4788]"></div>

          <div className="absolute -right-[430px] bottom-[90px]  border-l-[327px] border-r-[327px] border-t-[151px] border-l-transparent border-r-transparent border-t-[#1E4788] "></div> */}
        </Modal>
      )}
    </>
  );
};

export default Scores;
