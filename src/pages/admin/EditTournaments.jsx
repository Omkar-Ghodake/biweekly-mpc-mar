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
  // Context for opening and closing the modal
  const { openModal, closeModal } = useContext(ModalContext);

  // State to store the list of tournaments
  const [tournaments, setTournaments] = useState([]);

  // State to track if the form is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to store the currently selected tournament
  const [currentTournament, setCurrentTournament] = useState(null);

  // Reference for the file input field
  const fileInputRef = useRef(null);

  // Fetch tournaments data on component mount
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // Mock data for tournaments
        const mockData = [
          {
            id: 1,
            name: "Tournament 1",
            description: "Description 1",
            image: ball,
            totalScore: 100,
            issueCount: 2,
          },
          {
            id: 2,
            name: "Tournament 2",
            description: "Description 2",
            image: ball,
            totalScore: 150,
            issueCount: 1,
          },
          {
            id: 3,
            name: "Tournament 3",
            description: "Description 3",
            image: ball,
            totalScore: 200,
            issueCount: 0,
          },
        ];
        setTournaments(mockData);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  // Handle input changes for the tournament form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTournament({ ...currentTournament, [name]: value });
  };

  // Handle image upload for the tournament
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
      // Add a new tournament
      setTournaments([
        ...tournaments,
        { ...currentTournament, id: Date.now() },
      ]);
      alert("Tournament details added successfully!");
    } else {
      // Update an existing tournament
      setTournaments((prevTournaments) => {
        const updatedTournaments = prevTournaments.map((tournament) =>
          tournament.id === currentTournament.id
            ? currentTournament
            : tournament
        );
        return updatedTournaments;
      });
      alert("Tournament details updated successfully!");
    }
    setCurrentTournament(null);
    closeModal();
  };

  // Start editing a tournament
  const startEditing = (tournament) => {
    setCurrentTournament(tournament);
    setIsEditing(tournament.id === null);
    openModal();
  };

  return (
    <>
      {/* Background container */}
      <div
        className="h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Main content container */}
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
            {/* Header section */}
            <div className="flex flex-row justify-between">
              <div className="text-3xl font-bold ml-3 px-6 py-3 bg-gradient-to-b from-sky-600 to-sky-800 text-white bg-sky-700 rounded-lg shadow-md w-1/4 text-center">
                Tournaments
              </div>
              {/* Add tournament button */}
              <button
                className="text-xl font-bold px-4 py-1 text-white bg-sky-700 rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-102 mr-6"
                onClick={() =>
                  startEditing({
                    id: null,
                    name: "",
                    description: "",
                    image: "",
                    totalScore: 0,
                    issueCount: 0,
                  })
                }
              >
                <div className="flex justify-center items-center">
                  <IoMdAdd />
                  Add a tournament
                </div>
              </button>
            </div>
            {/* Tournament cards */}
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
      {/* Modal for editing or adding tournaments */}
      {currentTournament && (
        <Modal afterClosing={() => {}}>
          <ModalHead className="w-1/3">
            <div className="w-full text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3 flex justify-between items-center">
              <span>{currentTournament.name || "New Tournament"}</span>
              {isEditing ? (
                <input
                  id="totalScore"
                  name="totalScore"
                  type="number"
                  value={currentTournament.totalScore}
                  onChange={handleInputChange}
                  className="text-sm bg-white text-sky-800 px-3 py-1 rounded-full shadow-md border focus:outline-blue-500"
                  required
                />
              ) : (
                <span className="text-sm bg-white text-sky-800 px-3 py-1 rounded-full shadow-md">
                  Total Score: {currentTournament.totalScore}
                </span>
              )}
            </div>
          </ModalHead>
          <ModalBody>
            <div className="p-2 flex flex-row items-start">
              {/* Form for editing tournament details */}
              <div className="w-2/3">
                <form onSubmit={updateDetails} className="space-y-6">
                  <div className="flex flex-col space-y-4">
                    {/* Tournament Name */}
                    <div className="flex items-center">
                      <label htmlFor="name" className="font-medium w-1/3 text-left pr-4">
                        Tournament Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={currentTournament.name}
                        onChange={handleInputChange}
                        className={`w-2/3 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                        required
                      />
                    </div>
                    {/* Tournament Description */}
                    <div className="flex items-center">
                      <label htmlFor="description" className="font-medium w-1/3 text-left pr-4">
                        Tournament Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={currentTournament.description}
                        onChange={handleInputChange}
                        className={`w-2/3 p-2 rounded-3xl transition-all duration-200 resize-none ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                        style={{ height: "150px" }}
                        required
                      />
                    </div>
                    {/* Total Score */}
                    {isEditing && (
                      <div className="flex items-center">
                        <label htmlFor="totalScore" className="font-medium w-1/3 text-left pr-4">
                          Total Score
                        </label>
                        <input
                          id="totalScore"
                          name="totalScore"
                          type="number"
                          value={currentTournament.totalScore}
                          onChange={handleInputChange}
                          className="w-2/3 p-2 rounded-3xl border focus:outline-blue-500"
                          required
                        />
                      </div>
                    )}
                    {/* Issue Count */}
                    <div className="flex items-center">
                      <label htmlFor="issueCount" className="font-medium w-1/3 text-left pr-4">
                        Issue Count
                      </label>
                      <input
                        id="issueCount"
                        name="issueCount"
                        type="number"
                        value={currentTournament.issueCount}
                        onChange={handleInputChange}
                        className={`w-2/3 p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                        required
                      />
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="w-full p-4 bg-white border-t flex justify-center space-x-4 rounded-b-2xl">
                    <button
                      type="button"
                      className={`px-4 py-2 text-white rounded-lg shadow-md ${
                        isEditing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
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
                        currentTournament && currentTournament.id === null
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={deleteTournament}
                      disabled={
                        currentTournament && currentTournament.id === null
                      }
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
              {/* Image and Upload Button */}
              <div className="w-1/3 flex flex-col items-center space-y-4">
                <img
                  src={currentTournament.image || ball}
                  alt="Tournament"
                  className="w-52 h-52 rounded-full object-cover"
                />
                <button
                  type="button"
                  className={`px-4 py-2 text-white rounded-lg shadow-md ${
                    isEditing
                      ? "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => fileInputRef.current.click()}
                  disabled={!isEditing}
                >
                  Upload
                </button>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default EditTournaments;