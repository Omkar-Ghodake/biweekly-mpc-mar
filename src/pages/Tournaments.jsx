import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import ModalHead from "../layouts/Modal/ModalHead";
import ModalBody from "../layouts/Modal/ModalBody";
import Modal from "../layouts/Modal/Modal";

const tournaments = [
  { id: 1, name: "IPL", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 2, name: "Big Bash League", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 3, name: "CPL", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 4, name: "T20 World Cup", logo: "/Tournaments/tournamentdemo.jpg" },
  { id: 5, name: "The Hundred", logo: "/Tournaments/tournamentdemo.jpg" },
];

//hi testing commit

const Tournaments = () => {
  const { openModal } = useContext(ModalContext);

  return (
    
    <div className="h-screen w-full overflow-auto bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col items-center py-10 px-4">
      
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg flex items-center mb-8">
        🏏 Tournaments
      </h1>

      {/* Tournament Cards using Flexbox */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id} onClick={openModal}
            className="relative bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-lg p-5 flex flex-col items-center w-[280px] transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={tournament.logo}
              alt={tournament.name}
              className="w-full h-56 object-cover rounded-lg shadow-md"
            />
            {/* <p className="mt-4 text-lg font-semibold text-white bg-green-700 px-4 py-2 rounded-lg shadow-md w-full text-center">
              {tournament.name}
            </p> */}
          </div>
        ))}
        
      </div>
      <Modal >
        <ModalHead >
            
        </ModalHead>
        <ModalBody>
       
        </ModalBody>
      </Modal>
    </div>
    
  );
};

export default Tournaments;
