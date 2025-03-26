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
      <Modal
        setIsEditing={setIsEditing}
        className=" bg-white rounded-[40px] shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
      >
        {/* Main Content */}
        <div className="relative w-full h-full">
          {/* Top-right decorative border (Group 12) */}
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[86px] h-[53px] flex justify-center items-center">
            <div className="absolute w-[286px] h-[53px] bg-[#03104A] rounded-tr-[40px] rounded-bl-[20px]"></div>
            <h1 className="absolute w-[286px] h-[53px] flex items-center justify-center text-xl font-bold z-10">
              {tournaments[id - 1]?.name || "Tournament"}
            </h1>
            <div className="absolute w-[279px] h-[45px] top-[8px] bg-white rounded-tr-[45px] rounded-bl-[20px]"></div>
          </div>

          {/* Trophy Icon (Vector) */}

          <div className="absolute w-[645px] h-[248px] top-[74px] left-[37px] bg-[#F2F2F2] rounded-2xl shadow-md p-2">
            <div className="">
              <FaTrophy className="text-[#03104A] text-[16px] inline mr-5" />
              <span>Demo Description</span>
            </div>
          </div>

          {/* Circular Placeholder (Group 13) */}
          <div className="absolute top-16 right-[-60px] ">
            {/* Outer Dark Blue Circle */}
            <div className="w-[250px] h-[250px] bg-[#03104A] rounded-full flex items-center justify-center">
              {/* Inner White Circle with Image */}
              <div className="w-[230px] h-[230px] bg-white rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/Tournaments/MPCTournamentLogo.png"
                  alt="Tournament Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tournaments;
