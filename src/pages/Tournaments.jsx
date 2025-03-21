import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import Modal from "../layouts/Modal/Modal";

const tournaments = [
  { id: 1, name: "IPL", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 2, name: "Big Bash League", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 3, name: "CPL", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 4, name: "T20 World Cup", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 5, name: "The Hundred", logo: "/Tournaments/tournamentdemo.jpg" },
];

const Tournaments = () => {
  const { openModal } = useContext(ModalContext);
  const [setIsEditing] = useState(true);
  const [id, setId] = useState(1);

  return (
    <div className="h-screen w-full overflow-auto bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col items-center py-10 px-6">
      
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg flex items-center mb-10 tracking-wide">
        🏏 Tournaments
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
            className="cursor-pointer relative bg-white/10 border border-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-3 flex flex-col items-center w-[280px] transition duration-300 transform hover:scale-110 hover:shadow-2xl hover:border-green-400 hover:bg-white/20"
          >
            <img
              src={tournament.logo}
              alt={tournament.name}
              className="w-full h-[220px] object-cover rounded-xl shadow-md transition duration-300 hover:opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Modal Section */}
      <Modal setIsEditing={setIsEditing}>
        {/* Header */}
        <div
          key={tournaments[id - 1].id}
          className="bg-[#0A2847] text-white text-center rounded-t-xl py-5 text-3xl font-extrabold tracking-wide shadow-lg"
        >
          {tournaments[id - 1].name}
        </div>

      </Modal>
    </div>
  );
};

export default Tournaments;
