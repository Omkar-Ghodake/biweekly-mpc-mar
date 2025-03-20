import React from 'react'

const tournaments = [
  { id: 1, name: "IPL", logo: "./assets/png.png" },
  { id: 2, name: "Big Bash League", logo: "./assets/png.png" },
  { id: 3, name: "CPL", logo: "./assets/png.png" },
  { id: 4, name: "T20 World Cup", logo: "./assets/png.png" },
  { id: 5, name: "The Hundred", logo: "./assets/png.png" },
];

//hi testing commit

const Tournaments = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[url('./assets/stadiumbg.jfif')] bg-cover bg-center p-6">
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      {/* Content container */}
      <div className="relative w-2/3 text-center bg-white/50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Tournaments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="flex flex-col items-center p-4 transition-transform transform hover:scale-105"
            >
              <img
                src={tournament.logo}
                alt={tournament.name}
                className="w-24 h-24 object-cover mb-2"
              />
              <p className="text-lg font-semibold text-green-700">{tournament.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tournaments
