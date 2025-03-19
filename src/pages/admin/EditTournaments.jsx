import React, { useContext, useState, useEffect } from "react";
import TournamentCard from "../../components/TournamentCard";
import { motion } from "framer-motion";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import Modal from "../../layouts/Modal/Modal";
import background from "../../assets/background.jpg";
import { IoMdAdd } from "react-icons/io";
import ball from "../../assets/ball.jpg";

const EditTournaments = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [tournaments, setTournaments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTournament, setCurrentTournament] = useState(null);

  useEffect(() => {
    // Fetch the tournaments data from an API or backend service
    const fetchTournaments = async () => {
      try {
        const response = await fetch("/api/tournaments"); // Replace with your API endpoint
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTournament({ ...currentTournament, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentTournament({ ...currentTournament, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDetails = (e) => {
    e.preventDefault();
    if (currentTournament.id === null) {
      // Add new tournament
      setTournaments([...tournaments, { ...currentTournament, id: Date.now() }]);
    } else {
      // Update existing tournament
      setTournaments((prevTournaments) =>
        prevTournaments.map((tournament) =>
          tournament.id === currentTournament.id ? currentTournament : tournament
        )
      );
    }
    setIsEditing(false);
    setCurrentTournament(null);
    closeModal();
    console.log("Updated Data:", currentTournament);
    // Add your backend API call here to save the data
  };

  const startEditing = (tournament) => {
    setCurrentTournament(tournament);
    setIsEditing(true);
    openModal();
  };

  return (
    <>
      <div
        className="h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="justify-start  w-3/4 max-h-40 min-h-5/6 py-3 px-3 backdrop-blur-md  rounded-lg overflow-y-scroll [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between">
              <div className="text-3xl font-bold ml-3 px-6 py-3  bg-gradient-to-b from-sky-600 to-sky-800  text-white bg-sky-700 rounded-lg shadow-md w-1/4 text-center">
                Tournaments
              </div>
              <button
                className="text-xl font-bold px-4 py-1 text-white bg-sky-700 rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-102 mr-6"
                onClick={() => startEditing({ id: null, name: "", description: "", image: "" })}
              >
                <div className="flex justify-center items-center ">
                  <IoMdAdd />
                  Add a tournament
                </div>
              </button>
            </div>
            <div className="flex flex-row flex-wrap space-x-5  space-y-7 mt-5 ml-3">
              {tournaments.map((tournament) => (
                <div key={tournament.id} onClick={() => startEditing(tournament)}>
                  <TournamentCard item={tournament} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      {currentTournament && (
        <Modal>
          <ModalHead className="w-1/3">
            <div className="w-full text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
              <span>{currentTournament.name || "New Tournament"}</span>
            </div>
          </ModalHead>
          <ModalBody>
            <div className="p-2 flex flex-row items-center">
              <div className="w-2/3">
                <form onSubmit={updateDetails} className="space-y-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <label htmlFor="name" className="font-medium">
                        Tournament Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={currentTournament.name}
                        onChange={handleInputChange}
                        className={`mx-5 w-1/2 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="description" className="font-medium">
                        Tournament Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={currentTournament.description}
                        onChange={handleInputChange}
                        className={`mx-5 w-1/2 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="image" className="font-medium">
                        Tournament Image
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={`mx-5 w-1/2 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        disabled={!isEditing}
                      />
                      <button 
                        type="button" onChange={handleImageUpload}
                        className="px-4 py-2 mt-3 bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer 
                          hover:bg-sky-800 hover:shadow-xl hover:scale-105 transition-transform duration-200"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="w-full p-4 bg-white border-t flex justify-center space-x-4 rounded-b-2xl">
                    <button
                      type="button"
                      className="px-4 py-2 bg-sky-700 text-white rounded-lg shadow-md hover:bg-sky-800"
                      onClick={() => setIsEditing((prev) => !prev)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-1/3 flex justify-center">
                <img src={currentTournament.image || ball} alt="Tournament" className="w-52 h-52 rounded-full object-cover " />
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default EditTournaments;