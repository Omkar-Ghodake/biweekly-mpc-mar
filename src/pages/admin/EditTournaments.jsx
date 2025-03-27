import React, { useContext, useState, useEffect, useRef } from "react";
import TournamentCard from "../../components/TournamentCard";
import { motion } from "framer-motion";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import Modal from "../../layouts/Modal/Modal";
import background from "../../assets/background5.jpg";
import { IoMdAdd } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";

import logo_default from "../../assets/logo_default.png";
import Button from "../../components/Button";
import { TournamentsContext } from "../../context/TournamentsProvider";
import axios from "axios";
import { ToastContext } from "../../context/ToastProvider";


const EditTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const { openModal, closeModal } = useContext(ModalContext);
  const tournamentsContext = useContext(TournamentsContext);
  const toast = useContext(ToastContext);
  const tournamentsArray = tournamentsContext.tournaments;
  const [image, setImage] = useState(logo_default || ""); // Default to provided image

  // State to track if the form is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentTournament, setCurrentTournament] = useState({
    id: null,
    title: "",
    description: "",
    totalScore: 0,
    issueCount: 0,
    logo: "",
  });
  const [createNew, setCreateNew] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setTournaments(tournamentsArray);
  }, [tournamentsArray]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTournament({ ...currentTournament, [name]: value });
  };

  const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    let bstr = atob(arr[1]); // Decode Base64
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], fileName, { type: mime });

    // Update the current tournament with the file
    setCurrentTournament((prevData) => ({
      ...prevData,
      logo: file, // ✅ Store the file in the current tournament
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // ✅ Store Base64 for preview
        convertBase64ToFile(reader.result, file.name); // ✅ Convert and set in currentTournament
      };
      reader.readAsDataURL(file);

      setCurrentTournament((prevData) => ({
        ...prevData,
        logo: file || logo_default, // ✅ Store file for submission
      }));
    }
  };

  const addTournament = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (
      !currentTournament.title ||
      !currentTournament.description ||
      !currentTournament.totalScore ||
      !currentTournament.issueCount
    ) {
      toast.showToast("Please fill in all required fields","error");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", currentTournament.title);
    formData.append("description", currentTournament.description);
    formData.append("totalScore", currentTournament.totalScore);
    formData.append("issueCount", currentTournament.issueCount);
  
    // Append logo if it's a valid File object
    if (currentTournament.logo instanceof File) {
      formData.append("logo", currentTournament.logo);
    } else {
      console.warn("Logo is not a valid File object");
    }
  
    // Debugging: Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/tournaments/add-tournament",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status !== 201) {
        toast.showToast("Failed to add tournament. Please try again.","error");
        return;
      }
      toast.showToast("Tournament added successfully!");

      // Refresh tournament list
      tournamentsContext.fetchTournaments();

      // Close modal and reset state
      closeModal();
      setIsEditing(false)
      setCurrentTournament(null);
      setCreateNew(false);
      setImage(null);
    } catch (error) {
      toast.showToast(error.response?.data?.message, error);
      
    }
  };

  const deleteTournament = async () => {
    const id = currentTournament._id;
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v1/tournaments/delete-tournament/${id}`
      );
      if (response.status === 201) {
        toast.showToast("Tournament deleted successfully","error");
      }
    } catch (error) {
      console.error("Error deleting tournament:", error.response?.data || error);
      toast.showToast(
        error.response?.data?.message || "An error occurred. Please try again.","error"
      );
    }
    setCurrentTournament(null);
    closeModal();
    setIsEditing(false);
    tournamentsContext.fetchTournaments();
  };

  // Handle form submission to add or update tournament details
  const updateDetails = async (e) => {
    e.preventDefault();
    console.log("Updating");

    const id = currentTournament._id;
    try {
      const response = await axios.patch(
        `http://localhost:5500/api/v1/tournaments/update-tournament/${id}`,
        currentTournament,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        toast.showToast("Tournament updated successfully");
        setIsEditing(false);
        tournamentsContext.fetchTournaments();
      }
    } catch (error) {
      toast.showToast(error.response.message,"error");
    }
  };

  // Start editing a tournament
  const startEditing = (tournament) => {
    setCurrentTournament(tournament);
    openModal();
  };

  const startCreating = (e) => {
    e.preventDefault();
    setCurrentTournament({
      id: null,
      title: "",
      description: "",
      totalScore: 0,
      issueCount: 0,
      logo: "",
    });

    setIsEditing(true);
    setCreateNew(true);
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
                onClick={startCreating} // ✅ Use `startCreating` instead of `openModal()`
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
                  key={tournament._id}
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
        <Modal
          afterClosing={() => {
            setIsEditing(false);
            setCurrentTournament(null);
            setCreateNew(false);
          }}
        >
          <ModalHead className="w-1/3">
            <div className="w-full text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3 flex justify-between items-center">
              <span>{currentTournament.title || "New Tournament"}</span>
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
              <div className="w-2/3">
                <form
                  onSubmit={createNew ? addTournament : updateDetails}
                  className="space-y-6"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <label
                        htmlFor="title"
                        className="font-medium w-1/3 text-left pr-4"
                      >
                        Tournament Name
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={currentTournament.title}
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
                    <div className="flex items-center">
                      <label
                        htmlFor="description"
                        className="font-medium w-1/3 text-left pr-4"
                      >
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
                    {isEditing && (
                      <div className="flex items-center">
                        <label
                          htmlFor="totalScore"
                          className="font-medium w-1/3 text-left pr-4"
                        >
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
                    <div className="flex items-center">
                      <label
                        htmlFor="issueCount"
                        className="font-medium w-1/3 text-left pr-4"
                      >
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
                  <div className="w-full p-4 bg-white border-t flex justify-center space-x-4 rounded-b-2xl">
                    {!createNew && (
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
                    )}
                    <button
                      type="submit"
                      className={`px-4 py-2  text-white rounded-lg shadow-md ${
                        !isEditing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 hover:cursor-pointer"
                      } `}
                    >
                      Save
                    </button>

                    {isEditing && !createNew && (
                      <button
                        type="button"
                        className={`px-3 py-2 text-white rounded-lg shadow-md ${
                          currentTournament && currentTournament.id === null
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        onClick={deleteTournament}
                        disabled={
                          currentTournament && currentTournament.id === null
                        }
                      >
                        <BsTrash3 />
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className="w-1/3 flex flex-col items-center space-y-4">
                <img
                  src={image || logo_default}
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
