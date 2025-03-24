import React, { useContext, useState, useEffect, useRef } from "react";
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
  const fileInputRef = useRef(null);

  // Fetch tournaments data on component mount
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // Mock data for temporary display
        const mockData = [
          { id: 1, name: "Tournament 1", description: "Description 1", image: ball },
          { id: 2, name: "Tournament 2", description: "Description 2", image: ball },
          { id: 3, name: "Tournament 3", description: "Description 3", image: ball },
        ];
        setTournaments(mockData);

        // Uncomment the following lines to fetch data from an API
        // const response = await fetch("/api/tournaments"); // Replace with your API endpoint
        // const data = await response.json();
        // setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  // Handle input changes for tournament form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTournament({ ...currentTournament, [name]: value });
  };

  // Handle image upload for tournament
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

  // Handle tournament deletion
const deleteTournament = () => {
  setTournaments((prevTournaments) => {
    const updatedTournaments = prevTournaments.filter(
      (tournament) => tournament.id !== currentTournament.id
    );
    return updatedTournaments;
  });
  alert("Tournament deleted successfully!");
  setCurrentTournament(null);
  closeModal();
};


  // Handle form submission to add or update tournament details
  const updateDetails = (e) => {
    e.preventDefault();
    if (currentTournament.id === null) {
      // Add new tournament
      setTournaments([
        ...tournaments,
        { ...currentTournament, id: Date.now() },
      ]);
      alert("Tournament details added successfully!");
    } else {
      // Update existing tournament
<<<<<<< HEAD
      setTournaments((prevTournaments) =>
        prevTournaments.map((tournament) =>
          tournament.id === currentTournament.id
            ? currentTournament
            : tournament
        )
      );
=======
      setTournaments((prevTournaments) => {
        const updatedTournaments = prevTournaments.map((tournament) =>
          tournament.id === currentTournament.id ? currentTournament : tournament
        );
        return updatedTournaments;
      });
>>>>>>> b2925241e912b54c908700e299c69df0aa0b0250
      alert("Tournament details updated successfully!");
    }
    !isEditing && setCurrentTournament(null);
    console.log("Updated Data:", currentTournament);
    // Add backend API call here to save the data

    // Close the modal after saving
    //closeModal();
    
  };

  // Start editing a tournament
  const startEditing = (tournament) => {
    setCurrentTournament(tournament);
    setIsEditing(tournament.id === null);
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
          className="justify-start w-3/4 max-h-40 min-h-5/6 py-3 px-3 backdrop-blur-md rounded-lg overflow-y-scroll [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="text-3xl font-bold ml-3 px-6 py-3 bg-gradient-to-b from-sky-600 to-sky-800 text-white bg-sky-700 rounded-lg shadow-md w-1/4 text-center">
                Tournaments
              </div>
              <button
                className="text-xl font-bold px-4 py-1 text-white bg-sky-700 rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-102 mr-6"
                onClick={() =>
                  startEditing({
                    id: null,
                    name: "",
                    description: "",
                    image: "",
                  })
                }
              >
                <div className="flex justify-center items-center">
                  <IoMdAdd />
                  Add a tournament
                </div>
              </button>
            </div>
            <div className="flex flex-row flex-wrap space-x-5 space-y-7 mt-5 ml-3">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  onClick={() => startEditing(tournament)}
                >
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
                    <div className="flex items-center ">
                      <label htmlFor="name" className="font-medium">
                        Tournament Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={currentTournament.name}
                        onChange={handleInputChange}
<<<<<<< HEAD
                        className={`mx-auto w-1/2 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
=======
                        className={`mx-5 w-1/2 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing ? "border focus:outline-blue-500" : "bg-gray-100 cursor-default"
>>>>>>> b2925241e912b54c908700e299c69df0aa0b0250
                        }`}
                        readOnly={!isEditing}
                        required
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
<<<<<<< HEAD
                        className={`mx-auto w-1/2 p-2 rounded-3xl transition-all duration-200 resize-none ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
=======
                        className={`mx-5 w-1/2 p-2 rounded-3xl transition-all duration-200 resize-none ${
                          isEditing ? "border focus:outline-blue-500" : "bg-gray-100 cursor-default"
>>>>>>> b2925241e912b54c908700e299c69df0aa0b0250
                        }`}
                        readOnly={!isEditing}
                        style={{ height: "150px", width: "300px" }}
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className={`mx-5 w-1/2 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing ? "border focus:outline-blue-500" : "bg-gray-100 cursor-default"
                        }`}
                        disabled={!isEditing}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button"
                        className="px-4 py-2 mt-7 bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer 
                          hover:bg-sky-800 hover:shadow-xl hover:scale-105 transition-transform duration-200 absolute top-80 right-30"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="w-full p-4 bg-white border-t flex justify-center space-x-4 rounded-b-2xl absolute bottom-0 left-0">
                    <button
                      type="button"
<<<<<<< HEAD
                      className={`px-4 py-2  text-white rounded-lg shadow-md ${
                        isEditing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
=======
                      className={`px-4 py-2 text-white rounded-lg shadow-md ${
                        isEditing ? "bg-gray-400 cursor-not-allowed" : "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
>>>>>>> b2925241e912b54c908700e299c69df0aa0b0250
                      }`}
                      onClick={() => setIsEditing((prev) => !prev)}
                      disabled={isEditing}
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 text-white rounded-lg shadow-md ${
                      currentTournament && currentTournament.id === null ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={deleteTournament}
                      disabled={currentTournament && currentTournament.id === null}
                      >
                       Delete
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-1/3 flex justify-center">
<<<<<<< HEAD
                <img
                  src={currentTournament.image || ball}
                  alt="Tournament"
                  className="w-52 h-52 rounded-full object-cover "
                />
=======
                <img src={currentTournament.image || ball} alt="Tournament" className="w-52 h-52 rounded-full object-cover" />
>>>>>>> b2925241e912b54c908700e299c69df0aa0b0250
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default EditTournaments;
