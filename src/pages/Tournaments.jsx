import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";
import { FaTrophy } from "react-icons/fa";

const tournaments = [
  { id: 1, name: "MPC", logo: "/Tournaments/MPCTournamentLogo.png" },
  { id: 2, name: "Namo AI", logo: "/Tournaments/NamoAILogo.png" },
  { id: 3, name: "NM APP Revamp", logo: "/Tournaments/AppRevamp3.png" },
  {
    id: 4,
    name: "Test case Regression",
    logo: "/Tournaments/TestCaseLogo.png",
  },
  {
    id: 5,
    name: "Personal Project",
    logo: "/Tournaments/PersonalProjects.png",
  },
];

const Tournaments = () => {
  const { openModal } = useContext(ModalContext);
  const [isEditing, setIsEditing] = useState(true);
  const [id, setId] = useState(1);

  return (
    <div className="h-screen w-full overflow-auto bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col items-center py-10 px-6">
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg flex items-center mb-10 tracking-wide">
        Tournaments
      </h1>

      {/* Tournament Cards */}
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-7xl">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            onClick={() => {
              openModal();
              setId(tournament.id);
            }}
            className="cursor-pointer relative bg-white/10 border border-white/30 backdrop-blur-lg px-6 rounded-2xl shadow-xl flex flex-col items-center w-[280px] transition duration-300 transform hover:scale-110 hover:shadow-2xl hover:border-green-400 hover:bg-white/20 object-cover"
          >
            <img
              src={tournament.logo}
              alt={tournament.name}
              className="w-full h-[220px] object-fill rounded-xl transition duration-300 hover:opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Modal Section */}
      <Modal className="bg-transparent">
        {/* <div className="relative w-full h- left-[201px] top-[175px] drop-shadow-lg"> */}
        {/* Modal Container */}
        <div className="absolute left-[0.99%]  right-[6.27%] top-[9.56%] bottom-[3.24%] bg-[#03104A] rounded-[40px] ">
          {/* White Background Layer */}
          <div className="absolute inset-0 bottom-6 right-3 bg-white rounded-[40px]"></div>

          {/* Inner Light Gray Box */}
          <div className="absolute left-[6.18%] right-[19.53%] top-[23.38%] bottom-[29.52%] bg-[#F2F2F2] rounded-[20px]"></div>

          {/* Bottom Blue Rectangle with V-Cut Corners */}
          <div
            className="absolute top-[95.40%] -bottom-0 bg-[#1E4788]  left-[18.82%] right-[26.7%]"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 90% 100%,10% 100%)",
            }}
          ></div>

          {/* Rounded Top Blue Section */}
          <div className="absolute left-[23.12%] right-[30.29%] top-[85.67%]  bottom-0 bg-[#03104A] rounded-t-[40px]"></div>

          {/* Group 12 - Inner Section */}
          <div className="absolute left-[22.13%] right-[30.11%] top-0 bottom-[83.28%]">
            {/* Blue Box */}
            <div className="absolute left-[0.75%] right-0 top-0 bottom-0 bg-[#03104A] rounded-[20px]"></div>
            {/* White Box */}
            <div className="absolute left-0 right-[2.44%] top-[14.29%] bottom-0 bg-white rounded-[20px]"></div>
          </div>

          {/* Group 13 - Circular Element with Shadow */}
          <div className="absolute left-[70.49%] -right-8 top-[13.48%] bottom-[23.38%] drop-shadow-lg">
            {/* Outer Dark Blue Circle */}
            <div className="absolute inset-0 bg-[#03104A] rounded-full"></div>
            {/* Inner White Circle */}
            <div className="absolute left-[4.91%] right-[3.91%] top-[4.24%]  bottom-[4.24%] bg-white rounded-full"></div>
          </div>

          {/* Small Black Vector */}
          <div className="absolute left-[8.96%] right-[88.17%] top-[28.67%] bottom-[66.21%] bg-black"></div>

          {/* Close Button (mdi:cross-circle-outline) */}
          <div className="absolute h-[43px] left-[96.15%] right-0 top-[-21px]"></div>

          {/* Vector Overlay */}
          <div className="absolute left-[8.33%] z right-[8.33%] top-[8.33%] bottom-[8.33%] bg-transparent"></div>
        </div>
        {/* </div> */}
      </Modal>
    </div>
  );
};

export default Tournaments;
