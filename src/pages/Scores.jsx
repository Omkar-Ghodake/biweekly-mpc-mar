import React from "react";
import img from "../glb/dhoni.png";
import pitch from "../glb/pitch.webp";

const Scores = () => {
  // const playerData = {
  //   captains: [
  //     { name: "Vishnu Menon", score: "9 Cr", image: img },
  //     { name: "Anagha Shinde", score: "8 Cr", image: img },
  //   ],
  //   players: [
  //     { name: "E Perry", score: "9 Cr", image: img },
  //     { name: "S Mandhana", score: "9 Cr", image: img },
  //     { name: "H Deol", score: "7.5 Cr", image: img },
  //     { name: "D Dottin", score: "8.5 Cr", image: img },
  //     { name: "G Wareham", score: "8 Cr", image: img },
  //     { name: "A Gardner", score: "9 Cr", image: img },
  //     { name: "K Garth", score: "7.5 Cr", image: img },
  //     { name: "R Singh", score: "8 Cr", image: img },
  //     { name: "K Gautam", score: "7 Cr", image: img },
  //     { name: "Player 10", score: "7 Cr", image: img },
  //     { name: "Player 11", score: "7 Cr", image: img },
  //     { name: "Player 12", score: "7 Cr", image: img },
  //     { name: "Player 13", score: "7 Cr", image: img },
  //     { name: "Player 14", score: "7 Cr", image: img },
  //     { name: "Player 15", score: "7 Cr", image: img },
  //   ],
  // };

  // return (
  //   <div className="bg-black text-black font-bold min-h-screen flex items-center justify-center p-4 overflow-y-auto ">
  //     <div
  //       className="bg-transparent bg-opacity-80 rounded-xl p-10 w-[650px]  "
  //       style={{
  //         backgroundImage: `url(${pitch})`,
  //         backgroundSize: "cover",
  //         backgroundPosition: "center",
  //         filter: "brightness(0.75)", // Adjust brightness here - Lightened
  //       }}
  //     >
  //       {/* Captains Section */}
  //       <h2 className="text-3xl font-bold text-center mb-6">Captains</h2>
  //       <div className="grid grid-cols-2 gap-4 mb-8 align-center ">
  //         {playerData.captains.map((captain, index) => (
  //           <div key={index} className="text-center">
  //             <img
  //               src={captain.image}
  //               alt={captain.name}
  //               className="w-24 h-28 object-coverl  mb-2 mx-auto " // Increased image size
  //             />
  //             <p className=" text-xl text-black font-bold">{captain.name}</p>{" "}
  //             {/* Increased name size */}
  //             <p className="text-lg text-black">{captain.score}</p>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Players Section */}
  //       <h2 className="text-3xl font-bold text-center mb-8 mt-16">Players</h2>
  //       <div className="grid grid-cols-3 gap-5">
  //         {playerData.players.map((player, index) => (
  //           <div key={index} className="text-center">
  //             <img
  //               src={player.image}
  //               alt={player.name}
  //               className="w-24 h-28 object-coverl  mb-2 mx-auto " // Increased image size
  //             />
  //             <p className="font-bold text-xl text-black">{player.name}</p>{" "}
  //             {/* Increased name size */}
  //             <p className="text-lg text-black">{player.score}</p>
  //           </div>
  //         ))}
  //       </div>

  //       {/* VC and C Section */}
  //       <div className="flex justify-center mt-8">
  //         <div className="text-center">
  //           <p className="text-xs text-gray-400">VC</p>
  //         </div>
  //         <div className="text-center mx-12">
  //           <p className="text-xs text-gray-400">C</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
  ];
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center">
      <div className="w-auto h-auto bg-gradient-to-t from-blue-600 to-blue-200 opacity-90 rounded-lg p-1">
        <div className="flex flex-col bg-gradient-to-t from-blue-600 to-blue-200 opacity-90 text-4xl items-start font-bold font-serif h-20 w-full justify-center">
          <div className="flex  items-center gap-4">
            <img src=""></img>
            <span>MPC BUG HUNTERS</span>
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6 my-3 p-2">
          {players.map((player, index) => (
            <div
              key={index}
              // bg-gradient-to-t from-blue-600 to-blue-300
              className="bg-transparent  p-4 shadow-lg flex flex-col items-center rounded-tl-3xl rounded-br-3xl border-2 solid border-amber-700"
            >
              <img
                src={player.image}
                alt={player.name}
                className="w-28 h-28 "
              />
              <p className="mt-2 font-bold text-lg">{player.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
