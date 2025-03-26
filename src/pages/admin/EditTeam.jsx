import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Pointlist from "../../components/Pointlist";
import Modal from "../../layouts/Modal/Modal";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import ball from "../../assets/ball.jpg";
import background from "../../assets/background5.jpg";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import img from "../../glb/Blank Profile pic.png";
import Button from "../../components/Button";

const EditTeam = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const [players, setPlayers] = useState([]);
  const { openModal, closeModal } = useContext(ModalContext);
  const [playerEdit, setPlayerEdit] = useState(false);
  const [playerCreate, setPlayerCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    domainId: null,
    empId: null,
    blocker: 0,
    critical: 0,
    major: 0,
    normal: 0,
    minor: 0,
    previous_score: 0,
    image: img,
    courses: [], // Start with one empty course field
  });
  const [image, setImage] = useState(formData.image || "");

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5500/api/v1/players/get-all-players",
        {
          method: "GET",
          credentials: "include", // Ensures authentication cookies are sent
        }
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch players");
      }

      const data = await response.json(); // Extract JSON data
      const fetchedPlayers = data.data; // Assuming response has { data: [...] }

      setPlayers(fetchedPlayers); // ✅ Correct way to update state with an array

      // ✅ Log the updated state after React updates it
    } catch (error) {
      console.error("Error fetching players:", error);
      alert("Failed to fetch players. Please try again.");
    }
  };

  console.log("formData", formData);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData({ ...formData, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCourseChange = (index, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = value;
    setFormData({ ...formData, courses: updatedCourses });
  };

  const addCourseField = (e) => {
    e.preventDefault(); // Prevent any unintended form submission
    setFormData((prevData) => ({
      ...prevData,
      courses: [...prevData.courses, ""],
    }));
  };

  const removeCourseField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      courses: prevData.courses.filter((_, i) => i !== index), // Creates a new array safely
    }));
  };

  const createPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5500/api/v1/players/add-player",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      console.log(response);

      if (response.ok) {
        alert("Player added successfully!");
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    } finally {
      closeModal();
      setPlayerCreate(false);
      setFormData({
        name: "",
        domainId: "",
        empId: null,
        blocker: 0,
        critical: 0,
        major: 0,
        normal: 0,
        minor: 0,
        previous_score: 0,
        image: null,
        courses: [], // Start with one empty course field
      });
    }
  };
  const updateDetails = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated Data:", formData);
  };

  // Calculate Total Issues & Score

  const calculateTotalIssues = (formData) => {
    return (
      formData.severity_count.blocker +
      formData.severity_count.critical +
      formData.severity_count.major +
      formData.severity_count.normal +
      formData.severity_count.minor
    );
  };

  // Function to calculate total score
  const calculateTotalScore = (formData) => {
    return (
      (formData.severity_count.blocker || 0) * 10 +
      (formData.severity_count.critical || 0) * 8 +
      (formData.severity_count.major || 0) * 5 +
      (formData.severity_count.normal || 0) * 3 +
      (formData.severity_count.minor || 0) * 1
    );
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center transition-all delay-200 "
      style={{ backgroundImage: `url(${background})` }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-col space-y-3 w-3/4 max-h-40 backdrop-blur-md min-h-5/6 px-4 py-3 rounded-xl overflow-y-scroll [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex flex-row justify-between ">
          <div className="text-3xl font-bold px-6 py-3 text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-lg shadow-md w-1/5 text-center ml-24">
            Players
          </div>

          <button
            className="text-xl font-bold px-4 py-1 <IoMdAdd />
 bg-sky-700  text-white rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-102 mr-24"
            onClick={() => {
              openModal();
              setPlayerCreate(true);
            }}
          >
            <div className="flex justify-center items-center ">
              <IoMdAdd />
              Add a player
            </div>
          </button>
        </div>

        {/* Header Row */}
        <div className="w-10/12 mx-auto p-2 bg-slate-300 font-bold rounded-3xl grid grid-cols-6 text-center items-center ">
          <span className="p-1 col-span-1 border-r border-gray-400">
            Employee Id
          </span>
          <span className="p-1 col-span-3 border-r border-gray-400 text-left ml-2">
            Name
          </span>
          <span className="p-1 col-span-1 border-r border-gray-400">
            Issue Count
          </span>
          <span className="p-1 col-span-1">Score</span>
        </div>

        {/* Animated Pointlist Items */}

        {players?.map((item, index) => (
          <div
            key={item.id} // ✅ Add a unique key
            className="list flex flex-col space-y-3 cursor-pointer"
            onClick={() => {
              openModal();
              setFormData({
                ...item,
                courses: Array.isArray(item.courses)
                  ? item.courses
                  : item.courses.replace(/\[|\]/g, "").split(","), // Convert string to array
              });
              setTotalIssues(calculateTotalIssues(formData));
              setTotalScore(calculateTotalScore(formData));
              setPlayerEdit(true);
            }}
          >
            <Pointlist item={item} issueCount={totalIssues} index={index} />
          </div>
        ))}
      </motion.div>
      {playerEdit && (
        <Modal
          className="h-[84vh] text-md "
          afterClosing={() => setIsEditing(false)}
        >
          <ModalHead className="w-1/3 ">
            <div className="w-full flex px-4 justify-between text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
              {formData.domain_name ? (
                <span>{formData.domain_name}</span>
              ) : (
                "Domain Name"
              )}
              {formData ? (
                <span className="font-bold ">Score: {totalScore}</span>
              ) : (
                "Score"
              )}
            </div>
          </ModalHead>
          <ModalBody>
            <div className="p-2 items-center">
              <form onSubmit={updateDetails} className="space-y-6 ">
                {/* Profile Image and Name Input */}
                <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-1 ">
                  <div className="flex flex-col w-full space-y-4 ">
                    {/* Name Input Field */}
                    <div className="flex items-center w-full ml-2">
                      <label htmlFor="name" className="font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={formData.domain_name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="ml-9 mr-5 w-full p-2 rounded-3xl border focus:outline-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div className="flex items-center w-full ml-2">
                      <div className="flex items-center w-1/2">
                        <label htmlFor="domainId" className="font-medium">
                          Domain Id
                        </label>
                        <input
                          id="domainId"
                          placeholder="Enter Domain Id"
                          type="text"
                          value={formData.domain_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              domainId: e.target.value,
                            })
                          }
                          className={`mx-5 w-full p-2 rounded-3xl transition-all duration-200 ${
                            isEditing
                              ? "border focus:outline-blue-500"
                              : "bg-gray-100 cursor-default"
                          }`}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="flex items-center w-1/2">
                        <label htmlFor="empId" className="font-medium">
                          Employee Id
                        </label>
                        <input
                          id="empId"
                          type="Number"
                          value={formData.emp_id}
                          onChange={(e) =>
                            setFormData({ ...formData, empId: e.target.value })
                          }
                          className={`mx-5 p-2 w-full rounded-3xl transition-all duration-200 [&::-webkit-inner-spin-button]:appearance-none 
         [&::-webkit-outer-spin-button]:appearance-none ${
           isEditing
             ? "border focus:outline-blue-500"
             : "bg-gray-100 cursor-default"
         }`}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-start ml-2">
                      <div className="flex items-center w-1/2">
                        <label htmlFor="gender" className="font-medium">
                          Gender
                        </label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className={`mx-5 p-2 w-full rounded-3xl transition-all duration-200 ${
                            isEditing
                              ? "border focus:outline-blue-500"
                              : "bg-gray-100 cursor-default"
                          }`}
                          disabled={!isEditing}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center w-1/2">
                        <label htmlFor="role" className="font-medium">
                          Role
                        </label>
                        <select
                          id="role"
                          value={
                            formData.role
                              ? formData.role.charAt(0).toUpperCase() +
                                formData.role.slice(1).toLowerCase()
                              : ""
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className={`mx-5 w-full p-2 rounded-3xl transition-all duration-200 ${
                            isEditing
                              ? "border focus:outline-blue-500"
                              : "bg-gray-100 cursor-default"
                          }`}
                          disabled={!isEditing}
                        >
                          <option value="">Select Role</option>
                          <option value="Captain">Captain</option>
                          <option value="Player">Player</option>
                        </select>
                      </div>
                    </div>
                    {/* Number Inputs Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Left Side: Severity & Previous Score */}
                      <div className="grid grid-cols-2">
                        {[
                          { label: "Blocker", key: "blocker" },
                          { label: "Critical", key: "critical" },
                          { label: "Major", key: "major" },
                          { label: "Normal", key: "normal" },
                          { label: "Minor", key: "minor" },
                          { label: "Previous Score", key: "pre_score" },
                        ].map(({ label, key }) => (
                          <div
                            key={key}
                            className="flex items-center space-x-2 p-2 rounded-lg"
                          >
                            <label htmlFor={key} className="font-medium">
                              {label}
                            </label>
                            <input
                              id={key}
                              type="number"
                              value={
                                key === "pre_score"
                                  ? formData.pre_score
                                  : formData.severity_count[key] || 0
                              }
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [key === "pre_score"
                                    ? "pre_score"
                                    : "severity_count"]: {
                                    ...formData.severity_count,
                                    [key]: Number(e.target.value) || 0,
                                  },
                                })
                              }
                              className={`p-2 rounded-3xl w-full transition-all duration-200 appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
          ${
            isEditing
              ? "border focus:outline-blue-500"
              : "bg-gray-100 cursor-default"
          }`}
                              readOnly={!isEditing}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Right Side: Courses Section */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="font-medium">Courses</label>
                          {isEditing && (
                            <button
                              onClick={addCourseField}
                              className="mr-5 px-2 py-1 bg-sky-700 text-white rounded-md hover:bg-sky-600 transition w-fit"
                            >
                              <IoMdAdd className="text-2xl font-bold" />
                            </button>
                          )}
                        </div>

                        <div className="bg-gray-200 w-[17.5rem] p-2 rounded-lg mt-3">
                          {formData.courses && (
                            <div className="space-y-1 space-x-3 items-center max-h-32 h-32 w-fit overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                              {Array.isArray(formData.courses)
                                ? formData.courses.map((course, index) => (
                                    <div
                                      key={`course-${index}`}
                                      className="flex items-center space-x-3"
                                    >
                                      {/* Course Number */}
                                      <span className="font-medium text-gray-700">
                                        {index + 1}.
                                      </span>

                                      {/* Course Input */}
                                      <input
                                        type="text"
                                        value={course}
                                        onChange={(e) =>
                                          handleCourseChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                        className={`p-1 rounded-md transition-all duration-200 ${
                                          isEditing
                                            ? "border focus:outline-blue-500"
                                            : "bg-gray-100 cursor-default"
                                        }`}
                                        readOnly={!isEditing}
                                      />

                                      {/* Delete Button */}
                                      {isEditing && (
                                        <button
                                          onClick={() =>
                                            removeCourseField(index)
                                          }
                                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                        >
                                          <MdDeleteOutline />
                                        </button>
                                      )}
                                    </div>
                                  ))
                                : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Total Issues & Score */}
                    <div className="flex space-x-3 items-center justify-center w-1/2">
                      <span className="font-medium">Total Issues</span>
                      <span className="bg-gray-200 px-16 rounded-3xl py-2 ">
                        {totalIssues}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center h-[55vh] w-1/3">
                    {/* Display the existing or uploaded image */}
                    <img
                      src={image || formData.image || "/default-avatar.png"} // Fallback image
                      alt="Profile"
                      className="w-auto h-72 object-contain"
                    />

                    {/* Hidden file input for selecting an image */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />

                    {/* Upload Button */}
                    <label
                      htmlFor="imageUpload"
                      className="px-4 py-2 mt-3 bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer 
    hover:bg-sky-800 hover:shadow-xl hover:scale-105 transition-transform duration-200"
                    >
                      Change
                    </label>
                  </div>
                </div>

                {/* Buttons Fixed at Bottom */}
                <div className="w-full p-4 bg-white border-t flex justify-center space-x-4 rounded-b-2xl absolute bottom-0 left-0">
                  <button
                    type="button"
                    className={`px-4 py-2  text-white rounded-lg shadow-md ${
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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      )}
      {playerCreate && (
        <Modal className="h-[84vh] text-md ">
          <ModalHead className="w-1/3 ">
            <div className="w-full flex px-4 justify-between text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
              {formData.name ? <span>{formData.name}</span> : "Domain Name"}
              <span className="font-bold">Score: {totalScore}</span>
            </div>
          </ModalHead>
          <ModalBody>
            <div className="p-2 items-center">
              <form
                ref={formRef}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                onSubmit={createPlayer}
                className="space-y-6"
              >
                {/* Profile Image and Name Input */}
                <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-1">
                  <div className="flex flex-col w-full space-y-4">
                    {/* Name Input */}
                    <div className="flex items-center w-full ml-2">
                      <label htmlFor="name" className="font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="ml-9 mr-5 w-full p-2 rounded-3xl border focus:outline-blue-500 transition-all duration-200"
                      />
                    </div>

                    {/* Domain & Employee ID */}
                    <div className="flex items-center w-full ml-2">
                      <div className="flex items-center w-1/2">
                        <label htmlFor="domainId" className="font-medium">
                          Domain Id
                        </label>
                        <input
                          id="domainId"
                          placeholder="Enter Domain Id"
                          type="text"
                          value={formData.domainId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              domainId: e.target.value,
                            })
                          }
                          className="mx-5 w-full p-2 rounded-3xl border focus:outline-blue-500 transition-all duration-200"
                        />
                      </div>
                      <div className="flex items-center w-1/2">
                        <label htmlFor="empId" className="font-medium">
                          Employee Id
                        </label>
                        <input
                          id="empId"
                          type="number"
                          placeholder="Enter Employee Id"
                          value={formData.empId}
                          onChange={(e) =>
                            setFormData({ ...formData, empId: e.target.value })
                          }
                          className="mx-5 p-2 w-full rounded-3xl border focus:outline-blue-500 transition-all duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Gender & Role Selection */}
                    <div className="flex items-center w-full justify-start ml-2">
                      <div className="flex items-center w-1/2">
                        <label htmlFor="gender" className="font-medium">
                          Gender
                        </label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="mx-5 p-2 w-full rounded-3xl border focus:outline-blue-500 transition-all duration-200"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center w-1/2">
                        <label htmlFor="role" className="font-medium">
                          Role
                        </label>
                        <select
                          id="role"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="mx-5 w-full p-2 rounded-3xl border focus:outline-blue-500 transition-all duration-200"
                        >
                          <option value="">Select Role</option>
                          <option value="Captain">Captain</option>
                          <option value="Player">Player</option>
                        </select>
                      </div>
                    </div>

                    {/* Number Inputs Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Left Side: Severity & Previous Score */}
                      <div className="grid grid-cols-2">
                        {[
                          "Blocker",
                          "Critical",
                          "Major",
                          "Normal",
                          "Minor",
                          "Previous Score",
                        ].map((label) => {
                          const key = label.toLowerCase().replace(" ", "_");
                          return (
                            <div
                              key={key}
                              className="flex items-center space-x-2 p-2 rounded-lg"
                            >
                              <label htmlFor={key} className="font-medium">
                                {label}
                              </label>
                              <input
                                id={key}
                                type="number"
                                value={formData[key]}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    [key]: Number(e.target.value) || 0,
                                  })
                                }
                                className="p-2 rounded-3xl w-full border focus:outline-blue-500 transition-all duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Side: Courses Section */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="font-medium">Courses</label>
                          <button
                            onClick={addCourseField}
                            className="mr-5 px-2 py-1 bg-sky-700 text-white rounded-md hover:bg-sky-600 transition w-fit"
                          >
                            <IoMdAdd className="text-2xl font-bold" />
                          </button>
                        </div>

                        <div className="bg-gray-200 w-[17.5rem] p-2 rounded-lg mt-3">
                          {formData.courses && (
                            <div className="space-y-1 space-x-3 items-center max-h-32 h-32 w-fit overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                              {formData.courses.map((course, index) => (
                                <div
                                  key={`course-${index}`}
                                  className="flex items-center space-x-3"
                                >
                                  <span className="font-medium text-gray-700">
                                    {index + 1}.
                                  </span>
                                  <input
                                    type="text"
                                    value={course}
                                    onChange={(e) =>
                                      handleCourseChange(index, e.target.value)
                                    }
                                    className="p-1 rounded-md border focus:outline-blue-500 transition-all duration-200"
                                  />
                                  <button
                                    onClick={() => removeCourseField(index)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                  >
                                    <MdDeleteOutline />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Total Issues & Score */}
                    <div className="flex space-x-3 items-center justify-center w-1/2">
                      <span className="font-medium">Total Issues</span>
                      <span className="bg-gray-200 px-16 rounded-3xl py-2">
                        {totalIssues}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center h-[55vh] w-1/3">
                    <img
                      src={image || img}
                      alt="Profile"
                      className="w-auto h-72 object-contain"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="px-4 py-2 mt-3 bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-105 transition-transform duration-200"
                    >
                      Upload
                    </label>
                  </div>
                </div>

                {/* Buttons Fixed at Bottom */}
                <div className="w-full p-3 bg-white border-t flex justify-center rounded-b-2xl absolute bottom-0 left-0">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default EditTeam;
