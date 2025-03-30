import React, { useContext, useState, useEffect, useRef } from "react";
import TournamentCard from "../../components/TournamentCard";
import { motion } from "framer-motion";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import Modal from "../../layouts/Modal/Modal";
import background from "../../assets/background5.jpg";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import logo_default from "../../assets/logo_default.png";
import Button from "../../components/Button";
import { TournamentsContext } from "../../context/TournamentsProvider";
import axios from "axios";
import { ToastContext } from "../../context/ToastProvider";

const EditTournaments = () => {
  const [tournaments, setTournaments] = useState([]); // State to store tournaments
  const { openModal, closeModal } = useContext(ModalContext);
  const tournamentsContext = useContext(TournamentsContext);
  const toast = useContext(ToastContext);
  const tournamentsArray = tournamentsContext.tournaments; // Fetch tournaments from context
  const [image, setImage] = useState(logo_default || ""); // Default image for preview

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

  // Sync tournaments from context to local state
  useEffect(() => {
    setTournaments(tournamentsArray);
  }, [tournamentsArray]);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTournament({ ...currentTournament, [name]: value });
  };

  // Convert Base64 string to a File object
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
      logo: file, // Store the file in the current tournament
    }));
  };

  // Handle image upload and update state
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Convert file to Base64 for preview
        setImage(base64Image); // Update image preview
      };
      reader.readAsDataURL(file); // Read the file as a Base64 string

      // Store the file directly for FormData
      setCurrentTournament((prevData) => ({
        ...prevData,
        logo: file,
      }));
    } else {
      // Reset to default image if no file is selected
      setImage(logo_default);
      setCurrentTournament((prevData) => ({
        ...prevData,
        logo: null, // Reset logo to null
      }));
    }
  };
  // Add a new tournament
  const addTournament = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !currentTournament.title ||
      !currentTournament.description ||
      !currentTournament.totalScore ||
      !currentTournament.issueCount
    ) {
      toast.showToast("Please fill in all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", currentTournament.title);
    formData.append("description", currentTournament.description);
    formData.append("totalScore", currentTournament.totalScore);
    formData.append("issueCount", currentTournament.issueCount);

    // Append logo if it exists
    if (currentTournament.logo) {
      formData.append("logo", currentTournament.logo); // Append the file directly
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
        toast.showToast("Failed to add tournament. Please try again.", "error");
        return;
      }
      toast.showToast("Tournament added successfully!");

      // Refresh tournament list
      await tournamentsContext.fetchTournaments();

      // Close modal and reset state
      closeModal();
      setIsEditing(false);
      setCurrentTournament(null);
      setCreateNew(false);
      setImage(null);
    } catch (error) {
      console.error("Error creating tournament:", error);
      toast.showToast(
        error.response?.data?.message || "Internal server error",
        "error"
      );
    }
  };

  // Update an existing tournament
  const updateDetails = async (e) => {
    e.preventDefault();

    const id = currentTournament._id;
    const formData = new FormData();
    formData.append("title", currentTournament.title);
    formData.append("description", currentTournament.description);
    formData.append("totalScore", currentTournament.totalScore);
    formData.append("issueCount", currentTournament.issueCount);

    // Append logo if it's a valid Base64 string
    if (currentTournament.logo) {
      formData.append("logo", currentTournament.logo);
    }

    try {
      const response = await axios.patch(
        `http://localhost:5500/api/v1/tournaments/update-tournament/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.showToast("Tournament updated successfully");

        // Refresh tournament list
        await tournamentsContext.fetchTournaments();

        setIsEditing(false);
      }
    } catch (error) {
      toast.showToast(
        error.response?.data?.message || "An error occurred.",
        "error"
      );
    }
  };

  // Delete a tournament
  const deleteTournament = async () => {
    const id = currentTournament._id;
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v1/tournaments/delete-tournament/${id}`
      );
      if (response.status === 201) {
        toast.showToast("Tournament deleted successfully", "error");
      }
    } catch (error) {
      toast.showToast(
        error.response?.data?.message || "An error occurred. Please try again.",
        "error"
      );
    }
    setCurrentTournament(null);
    closeModal();
    setIsEditing(false);
    tournamentsContext.fetchTournaments();
  };

  // Start editing a tournament
  const startEditing = (tournament) => {
    setCurrentTournament(tournament);
    setImage(tournament.logo || logo_default); // Set image for preview
    openModal();
  };

  // Start creating a new tournament
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
    setImage(logo_default); // Reset image to default
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
                onClick={startCreating}
              >
                <div className="flex justify-center items-center">
                  <IoMdAdd />
                  Add a tournament
                </div>
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-7 mt-5 ml-3">
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
          className="bg-[rgba(255,255,255,0.60)]"
        >
          <ModalHead className="w-1/3">
            <div className="w-full text-center text-white bg-[#1E4788] rounded-xl shadow-md p-3 flex justify-between items-center">
              <span>{currentTournament.title || "New Tournament"}</span>
              <span className="text-sm bg-white text-sky-800 px-3 py-1 rounded-xl shadow-md">
                Total Score: {currentTournament.totalScore || 0}
              </span>
            </div>
          </ModalHead>
          <ModalBody>
            <div className="p-2 flex flex-row items-start">
              <div className="w-2/3">
                <form className="space-y-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <label
                        htmlFor="title"
                        className="font-medium w-1/3 text-left pr-4"
                        style={{ color: "#1E4788" }}
                      >
                        Tournament Name
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter Tournament Name"
                        value={currentTournament.title}
                        onChange={handleInputChange}
                        className={`w-2/4 p-2 shadow-2xl rounded-xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500 bg-gray-100 border-gray-400"
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
                        style={{ color: "#1E4788" }}
                      >
                        Tournament Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter Tournament Description"
                        value={currentTournament.description}
                        onChange={handleInputChange}
                        maxLength={200}
                        className={`w-2/4 p-2 shadow-2xl rounded-xl transition-all duration-200 resize-none border-gray-400 ${
                          isEditing
                            ? "border focus:outline-blue-500 bg-gray-100 border-gray-400"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                        style={{ height: "150px" }}
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="issueCount"
                        className="font-medium w-1/3 text-left pr-4"
                        style={{ color: "#1E4788" }}
                      >
                        Tournament Issue Count
                      </label>
                      <input
                        id="issueCount"
                        name="issueCount"
                        type="number"
                        value={currentTournament.issueCount}
                        onChange={handleInputChange}
                        className={`w-2/4 p-2 shadow-2xl rounded-xl transition-all duration-200 resize-none border-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                          isEditing
                            ? "border focus:outline-blue-500 bg-gray-100"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                        required
                      />
                    </div>
                    {isEditing && (
                      <div className="flex items-center">
                        <label
                          htmlFor="totalScore"
                          className="font-medium w-1/3 text-left pr-4"
                          style={{ color: "#1E4788" }}
                        >
                          Tournament Total Score
                        </label>
                        <input
                          id="totalScore"
                          name="totalScore"
                          type="number"
                          value={currentTournament.totalScore}
                          onChange={handleInputChange}
                          className={`w-2/4 p-2 shadow-2xl rounded-xl transition-all duration-200 resize-none border-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                            isEditing
                              ? "border focus:outline-blue-500 bg-gray-100"
                              : "bg-gray-100 cursor-default"
                          }`}
                          readOnly={!isEditing}
                          required
                        />
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="w-1/3 flex flex-col items-center space-y-4">
                <img
                  src={image || logo_default}
                  alt="Tournament"
                  className={`w-72 h-72 object-cover shadow-2xl rounded-xl ${
                    image === logo_default
                      ? "border-1 border-sky-700"
                      : "w-72 h-72 object-cover shadow-2xl rounded-xl"
                  }`}
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
                  {createNew && isEditing ? "Upload" : "Update"}
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
            {/* Buttons Outside the Form */}
            <div className="w-full p-4 bg-transparent  flex justify-center space-x-5 rounded-b-2xl">
              {!createNew && (
                <button
                  type="button"
                  className={`w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md ${
                    isEditing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
                  }`}
                  onClick={() => setIsEditing((prev) => !prev)}
                  disabled={isEditing}
                >
                  <div className="flex items-center justify-center gap-4">
                    <FaRegEdit />
                    <span>Edit</span>
                  </div>
                </button>
              )}
              <button
                type="button"
                className={`w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md ${
                  !isEditing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#68AA45] hover:bg-green-700 hover:cursor-pointer"
                }`}
                onClick={createNew ? addTournament : updateDetails}
              >
                {/* {isEditing ? "Update" : "Save"} */}
                {createNew && isEditing ? "Save" : "Update"}
              </button>
              {!createNew && (
                <button
                  type="button"
                  className={`w-[120px] h-[40px] px-3 py-2  text-white rounded-xl shadow-md ${
                    isEditing ||
                    (currentTournament && currentTournament.id === null)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#950202] hover:bg-red-700"
                  }`}
                  onClick={deleteTournament}
                  disabled={
                    isEditing ||
                    (currentTournament && currentTournament.id === null)
                  }
                >
                  <div className="flex items-center justify-center gap-4">
                    <RiDeleteBin6Line />
                    <span>Delete</span>
                  </div>
                </button>
              )}
            </div>
          </ModalBody>
        </Modal>
      )}
    </> 
  );
};

export default EditTournaments;
