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
  const { players, fetchPlayers } = useContext(PlayersContext);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen);
    setIsProjectOpen(false);
  };
  const toggleProjects = () => {
    setIsProjectOpen(!isProjectOpen);
    setIsCoursesOpen(false);
  };
  // const players = [
  //   {
  //     id: 1,
  //     name: "Vishnu Menon",
  //     image: "src/glb/Members_Photos_Final/Vishnu.png",
  //     role: "Captain",
  //     currentScore: 31,
  //     previousScore: 0,
  //     courses: ["C++", "Java", "Backend with Database and springboot"],
  //   },
  //   {
  //     id: 2,
  //     name: "Anagha Shinde",
  //     image: "src/glb/Members_Photos_Final/Anagha.png",
  //     role: "Captain",
  //     currentScore: 18,
  //     previousScore: 0,
  //     courses: ["Python", "JavaScript"],
  //   },
  //   {
  //     id: 3,
  //     name: "Anshree Shukla",
  //     image: "src/glb/Members_Photos_Final/Anushree.png",
  //     currentScore: 13,
  //     previousScore: 0,
  //     courses: ["React", "Node.js"],
  //   },
  //   {
  //     id: 4,
  //     name: "Avinash Gupta",
  //     image: "src/glb/Members_Photos_Final/Avinash.png",
  //     currentScore: 3,
  //     previousScore: 0,
  //     courses: ["C#", "ASP.NET"],
  //   },
  //   {
  //     id: 5,
  //     name: "Bhavya Momaya",
  //     image: "src/glb/Members_Photos_Final/Bhavya.png",
  //     currentScore: 10,
  //     previousScore: 0,
  //     courses: ["Data Science", "Machine Learning"],
  //   },
  //   {
  //     id: 6,
  //     name: "Devraj Singh",
  //     image: "src/glb/Members_Photos_Final/Devraj.png",
  //     currentScore: 5,
  //     previousScore: 0,
  //     courses: ["Cybersecurity", "Blockchain"],
  //   },
  //   {
  //     id: 7,
  //     name: "Dhiraj Kunder",
  //     image: "src/glb/Members_Photos_Final/Dhiraj.png",
  //     currentScore: 6,
  //     previousScore: 0,
  //     courses: ["Swift", "iOS Development"],
  //   },
  //   {
  //     id: 8,
  //     name: "Jaypal Koli",
  //     image: "src/glb/Members_Photos_Final/Jaipal.png",
  //     currentScore: 3,
  //     previousScore: 0,
  //     courses: ["Kotlin", "Android Development"],
  //   },
  //   {
  //     id: 9,
  //     name: "Manoj Inbarajan",
  //     image: "src/glb/Members_Photos_Final/Manoj.png",
  //     currentScore: 6,
  //     previousScore: 0,
  //     courses: ["PHP", "Laravel"],
  //   },
  //   {
  //     id: 10,
  //     name: "Mridual Upadhya",
  //     image: "src/glb/Members_Photos_Final/Mridul.png",
  //     currentScore: 3,
  //     previousScore: 0,
  //     courses: ["Go", "Rust"],
  //   },
  //   {
  //     id: 11,
  //     name: "Nikita Sonawane",
  //     image: "src/glb/Members_Photos_Final/Nikita_Sonawane.png",
  //     currentScore: 4,
  //     previousScore: 0,
  //     courses: ["UI/UX", "Graphic Design"],
  //   },
  //   {
  //     id: 12,
  //     name: "Nikita Suhane",
  //     image: "src/glb/Members_Photos_Final/Nikita_Suhane.png",
  //     currentScore: 5,
  //     previousScore: 0,
  //     courses: ["AWS", "Cloud Computing"],
  //   },
  //   {
  //     id: 13,
  //     name: "Omkar Ghodake",
  //     image: "src/glb/Members_Photos_Final/Omkar.png",
  //     currentScore: 8,
  //     previousScore: 0,
  //     courses: ["SQL", "Database Management"],
  //   },
  //   {
  //     id: 14,
  //     name: "Prithwikumar Selukar",
  //     image: "src/glb/Members_Photos_Final/Prithwi.png",
  //     currentScore: 0,
  //     previousScore: 0,
  //     courses: ["Ethical Hacking", "Cybersecurity"],
  //   },
  //   {
  //     id: 15,
  //     name: "Rishabh Kanojiya",
  //     image: "src/glb/Members_Photos_Final/Rishabh.png",
  //     currentScore: 8,
  //     previousScore: 0,
  //     courses: ["Python", "AI"],
  //   },
  //   {
  //     id: 16,
  //     name: "Sakshi Rai",
  //     image: "src/glb/Members_Photos_Final/Sakshi.png",
  //     currentScore: 14,
  //     previousScore: 0,
  //     courses: ["JavaScript", "TypeScript"],
  //   },
  //   {
  //     id: 17,
  //     name: "Sanjeev Prajapati",
  //     image: "src/glb/Members_Photos_Final/Sanjeev.png",
  //     currentScore: 4,
  //     previousScore: 0,
  //     courses: ["C", "Embedded Systems"],
  //   },
  //   {
  //     id: 18,
  //     name: "Shubham Joshi",
  //     image: "src/glb/Members_Photos_Final/Shubham.png",
  //     currentScore: 8,
  //     previousScore: 0,
  //     courses: ["C++", "Java"],
  //   },
  //   {
  //     id: 19,
  //     name: "Umakant Patil",
  //     image: "src/glb/Members_Photos_Final/Umakant.png",
  //     currentScore: 9,
  //     previousScore: 0,
  //     courses: ["Big Data", "Hadoop"],
  //   },
  // ];

  const handleCardClick = (player) => {
    setSelectedPlayer(player);
    openModal();
  };

  const sortedPlayers = players.sort((a, b) => b.currentScore - a.currentScore);
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
              <div className="grid grid-cols-4 md:grid-cols-4 gap-14 my-5 p-5  ">
                {sortedPlayers.map((player, index) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={gridItemVariants}
                    custom={index}
                    key={index}
                    onClick={() => handleCardClick(player)}
                    class="relative w-56 h-56   rounded-t-lg  flex justify-center items-end mx-auto my-4 rounded-b-lg"
                  >
                    <div class="absolute inset-0 bg-gray-300 rounded-t-lg opacity-90 "></div>
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
                      <div class=" absolute -top-10 left-18 transform -translate-x-1/2 flex items-center space-x-0">
                        <img src={player.image} class="w-auto h-36" />

                        <span class="text-black font-bold text-lg items-start uppercase ">
                          {player.role ? player.role : "Player"}
                        </span>
                      </div>
                      {/* <!-- Diagonal Line Below Image --> */}
                      <div class="absolute top-21.5 z-1 left-28 rounded-lg transform -translate-x-1/2 w-[227px]  h-1 bg-white -rotate-10"></div>
                    </div>
                    {/* Bottom Triangle */}
                    <div class="absolute bottom-[-40px] w-0 h-0 border-l-[112px] border-r-[112px] border-t-[40px] border-l-transparent border-r-transparent border-t-[#1E4788] cursor-pointer"></div>
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
        </div>
      </div>
      {selectedPlayer && (
        <Modal className="bg-transparent ">
          <div className="absolute w-[750px] h-[600px] flex  justify-center items-end mx-auto">
            {/* Player Rank (Top-Right Corner) */}
            <div
              className="absolute -top-1 z-10 text-4xl   text-white font-bold rounded-bl-lg rounded-tr-lg"
              style={{
                left:
                  (
                    sortedPlayers.findIndex(
                      (player) => player.id === selectedPlayer.id
                    ) + 1
                  ).toString().length === 1
                    ? "560px"
                    : "552px",
              }}
            >
              {sortedPlayers.findIndex(
                (player) => player.id === selectedPlayer.id
              ) + 1}
            </div>

            {/* Player Image and Name */}
            <div className="absolute z-10 -top-[5px] right-0 transform -translate-x-40 flex items-center justify-between w-full max-w-[420px]">
              {/* Player Info (Left Side) */}
              <div className="flex flex-col text-left">
                {/* Player Role (Top) */}
                <span className="text-black font-bold uppercase text-3xl italic  top-3 my-3">
                  {selectedPlayer.role ? selectedPlayer.role : "Player"}
                </span>

                {/* Player Details Container */}
                <div className="flex flex-col ">
                  <span className="font-bold text-2xl">
                    {selectedPlayer.name}
                  </span>

                  <span className="font-bold text-sm">Team MPC</span>
                </div>
              </div>
              <div className="absolute z-1 top-[5px] left-85 transform -translate-x-40 flex items-center justify-between w-full max-w-[420px]">
                {/* Player Image (Right Side) */}
                <img
                  src={selectedPlayer.image}
                  className="w-auto h-56
                     rounded-b-4xl"
                />
              </div>
            </div>

            {/* Background Shapes */}
            <div className="w-[450px] h-[405px] -top-50  relative">
              {/* Top-Left Dark Gray Section */}

              {/* Top-Right Square Section */}
              <div className="absolute top-0 right-0 w-15 h-13 z-1 bg-[#05214e] opacity-70 rounded-bl-2xl rounded-tr-2xl"></div>

              {/* Main Background (Light Gray) */}
              <div
                className="absolute inset-0 bg-slate-200 opacity-65  rounded-tl-2xl rounded-tr-2xl rounded-2xl "
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
              <div className="relative grid grid-cols-1 md:grid-cols-3 py-72 p-7 gap-4">
                {/* Left Side: Scores & Issues */}
                <div className="col-span-2 w-3/4 flex flex-col gap-4">
                  {/* Current Score */}
                  <div className="p-2  rounded-lg bg-gray-900/50 backdrop-blur-md">
                    <span className="text-md font-bold">Current Score: </span>
                    {selectedPlayer.currentScore || "N/A"}
                  </div>

                  {/* Previous Score */}
                  <div className="bg-gray-900/50 p-2 rounded-lg">
                    <span className="text-md font-bold">Previous Score: </span>
                    {selectedPlayer.previousScore || "N/A"}
                  </div>

                  {/* Total Issue Count */}
                  <div className="bg-gray-900/50 p-2 rounded-lg">
                    <span className="text-md font-bold">Total Issues: </span>
                    {selectedPlayer.totalIssues || "N/A"}
                  </div>
                </div>

                {/* Right Side: Number of Courses */}
                <div className="col-span-1 flex flex-col gap-4 w-full md:w-44 -mx-13">
                  <div className="bg-gray-900/50 p-2 rounded-lg flex flex-col w-full">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={toggleCourses}
                    >
                      <span className="text-lg font-bold">Courses</span>
                      {isCoursesOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {isCoursesOpen && (
                      <ul className="list-disc pl-5 max-h-23 my-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                        {selectedPlayer.courses &&
                        Array.isArray(selectedPlayer.courses) ? (
                          selectedPlayer.courses.map((course, index) => (
                            <li key={index}>{course}</li>
                          ))
                        ) : (
                          <li>N/A</li>
                        )}
                      </ul>
                    )}
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded-lg flex flex-col w-full">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={toggleProjects}
                    >
                      <span className="text-lg font-bold">Projects</span>
                      {isProjectOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {isProjectOpen && (
                      <ul className="list-disc pl-5 max-h-23 my-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                        {selectedPlayer.courses &&
                        Array.isArray(selectedPlayer.courses) ? (
                          selectedPlayer.courses.flatMap((course, index) =>
                            course
                              .split(";")
                              .map((subCourse, subIndex) => (
                                <li key={`${index}-${subIndex}`}>
                                  {subCourse.trim()}
                                </li>
                              ))
                          )
                        ) : (
                          <li>N/A</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Triangle */}
            <div className="absolute  border-l-[224px] border-r-[224px] border-t-[90px] top-110 border-l-transparent border-r-transparent border-t-[#1E4788] "></div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Scores;
