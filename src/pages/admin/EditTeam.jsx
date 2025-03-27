import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Pointlist from "../../components/Pointlist";
import Modal from "../../layouts/Modal/Modal";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import background from "../../assets/background5.jpg";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import img from "../../glb/Blank Profile pic.png";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { ToastContext } from "../../context/ToastProvider";

const EditTeam = () => {
  const [players, setPlayers] = useState([]);
  const { openModal, closeModal } = useContext(ModalContext);
  const [playerEdit, setPlayerEdit] = useState(false);
  const [playerCreate, setPlayerCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const toast = useContext(ToastContext);

  const [image, setImage] = useState(img || ""); // Default to provided image
  const [formData, setFormData] = useState({
    courses: [],
    domain_name: "",
    name: "",
    emp_id: null, // Keep it null for consistency
    gender: "",
    image: img,
    pre_score: 0,
    role: "",
    severity_count: { blocker: 0, critical: 0, major: 0, normal: 0, minor: 0 },
    total_issues: 0,
    total_score: 0,
  });

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/v1/players/get-all-players"
      );

      console.log("API Response:", response.data);

      // ✅ Check if response status is OK
      if (response.status !== 200) {
        throw new Error("Couldn't fetch players");
      }

      // ✅ Ensure we get an array
      const fetchedPlayers = response.data.data;
      console.log("fetchedPlayers", fetchedPlayers);

      setPlayers(fetchedPlayers); // ✅ Update state with an array

      console.log("Updated Players State:", fetchedPlayers);
    } catch (error) {
      toast.showToast(`${error.response.data.message}`,"error");
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  console.log("formData", formData);

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

    setFormData((prevData) => ({
      ...prevData,
      image: file, // ✅ Store file in formData
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // ✅ Store Base64 for preview
        convertBase64ToFile(reader.result, file.name); // ✅ Convert and set in formData
      };
      reader.readAsDataURL(file);

      setFormData((prevData) => ({
        ...prevData,
        image: file, // ✅ Store file for submission
      }));
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
  console.log("image", image);

  const createPlayer = async (e) => {
    e.preventDefault();

    try {
      const playerData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "severity_count") {
          playerData.append(key, JSON.stringify(formData[key]));
        } else if (key === "image") {
          if (formData.image) {
            playerData.append("image", formData.image);
          }
        } else if (key === "emp_id") {
          // ✅ Ensure emp_id is a number or empty string (not "null")
          if (formData.emp_id !== null && formData.emp_id !== "") {
            playerData.append("emp_id", Number(formData.emp_id)); // Convert to number
          }
        } else {
          playerData.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:5500/api/v1/players/add-player",
        playerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.status) {
        closeModal();
        toast.showToast("Player added successfully!");
        setImage(null);
        setPlayerCreate(false);
        setFormData({
          courses: [],
          domain_name: "",
          name: "",
          emp_id: null, // Reset correctly
          gender: "",
          image: img,
          pre_score: 0,
          role: "",
          severity_count: {
            blocker: 0,
            critical: 0,
            major: 0,
            normal: 0,
            minor: 0,
          },
          total_issues: 0,
          total_score: 0,
        });
      } else {
        toast.showToast(`Error: ${response.statusText}`,"error");
      }
    } catch (error) {
      console.error("Error adding player:", error);
      toast.showToast(`${error.response.data.message}`,"error");
    } finally {
      fetchPlayers();
    }
  };

  const updateDetails = async (e) => {
    e.preventDefault();

    try {
      const id = formData._id;
      const playerData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "severity_count") {
          playerData.append(key, JSON.stringify(formData[key]));
        } else if (key === "image") {
          if (formData.image) {
            playerData.append("image", formData.image);
          }
        } else if (key === "emp_id") {
          // ✅ Ensure emp_id is a number or empty string (not "null")
          if (formData.emp_id !== null && formData.emp_id !== "") {
            playerData.append("emp_id", Number(formData.emp_id));
          }
        } else {
          playerData.append(key, formData[key]);
        }
      });

      const response = await axios.put(
        `http://localhost:5500/api/v1/players/update-player/${id}`,
        playerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        toast.showToast("Player updated successfully!");
        closeModal();
        setImage(null);
        setPlayerEdit(false);
        setIsEditing(false);
        setFormData({
          courses: [],
          domain_name: "",
          name: "",
          emp_id: null, // Reset correctly
          gender: "",
          image: img,
          pre_score: 0,
          role: "",
          severity_count: {
            blocker: 0,
            critical: 0,
            major: 0,
            normal: 0,
            minor: 0,
          },
          total_issues: 0,
          total_score: 0,
        });
      } else {
        toast.showToast(`Error: ${response.statusText}`,"error");
      }
    } catch (error) {
      toast.showToast(`${error.response.data.message}`,"error");
    } finally {
      fetchPlayers();
    }
  };

  const deleteTournament = async () => {
    try {
      const id = formData._id;
      console.log(id);

      const response = await fetch(
        `http://localhost:5500/api/v1/players/delete-player/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.showToast("Player deleted successfully!");
      } else {
        toast.showToast(`Error: ${response.statusText}`,"error");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      toast.showToast(`${error.response.data.message}`,error);
    } finally {
      closeModal();
      setPlayerEdit(false);
      setIsEditing(false)
      setFormData({
        courses: [],
        domain_name: "",
        name: "",
        emp_id: null,
        gender: "",
        image: img,
        pre_score: 0,
        role: "",
        severity_count: {
          blocker: 0,
          critical: 0,
          major: 0,
          normal: 0,
          minor: 0,
        },
        total_issues: 0,
        total_score: 0,
      });
      fetchPlayers();
    }
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
              setFormData({
                courses: [],
                domain_name: "",
                name: "",
                emp_id: null,
                gender: "",
                image: img,
                pre_score: 0,
                role: "",
                severity_count: {
                  blocker: 0,
                  critical: 0,
                  major: 0,
                  normal: 0,
                  minor: 0,
                },
                total_issues: 0,
                total_score: 0,
              });
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
                courses: item.courses[0]
                  .split(",")
                  .map((course) => course.trim()),
              });
              // calculateTotalIssues(formData)
              setPlayerEdit(true);
            }}
          >
            <Pointlist item={item} index={index} />
          </div>
        ))}
      </motion.div>
      {playerEdit && (
        <Modal
          className="h-[84vh] text-md"
          afterClosing={() => {
            setIsEditing(false);
            setPlayerEdit(false);
            setFormData({
              courses: [],
              domain_name: "",
              name: "",
              emp_id: null,
              gender: "",
              image: img,
              pre_score: 0,
              role: "",
              severity_count: {
                blocker: 0,
                critical: 0,
                major: 0,
                normal: 0,
                minor: 0,
              },
              total_issues: 0,
              total_score: 0,
            });
          }}
        >
          <ModalHead className="w-1/3 ">
            <div className="w-full flex px-4 justify-between text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
              {formData.name ? (
                <span>{formData.name}</span>
              ) : (
                <span>Domain Name</span>
              )}
              {formData.total_issues ? (
                <span className="font-bold ">
                  Score: {formData.total_score}
                </span>
              ) : (
                "Score : 0"
              )}
            </div>
          </ModalHead>
          <ModalBody>
            <div className="p-2 items-center">
              <form onSubmit={updateDetails} className="space-y-6 ">
                {/* Profile Image and Name Input */}
                <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-1 ">
                  <div className="flex flex-col w-full space-y-3 ">
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
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`ml-9 mr-5 mx-5 w-full p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="flex items-center w-full ml-2">
                      <div className="flex items-center w-1/2">
                        <label htmlFor="domain_name" className="font-medium">
                          Domain Name
                        </label>
                        <input
                          id="domain_name"
                          placeholder="Enter Domain name"
                          type="text"
                          value={formData.domain_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              domain_name: e.target.value,
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
                          className="mx-5 w-full p-2 rounded-3xl transition-all duration-200 bg-gray-100 cursor-not-allowed appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                          value={formData.role || "player"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              role: e.target.value.toLowerCase(),
                            })
                          }
                          className={`mx-5 w-full p-2 rounded-3xl transition-all duration-200 ${
                            isEditing
                              ? "border focus:outline-blue-500"
                              : "bg-gray-100 cursor-default"
                          }`}
                          disabled={!isEditing}
                        >
                          <option value="">Select Role</option>
                          <option value="captain">Captain</option>
                          <option value="player">Player</option>
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
                                  ? formData?.pre_score ?? 0
                                  : formData?.severity_count?.[key] ?? 0
                              }
                              onChange={(e) => {
                                const newValue = Number(e.target.value) || 0;

                                setFormData((prev) => {
                                  // Update severity count or pre_score
                                  const updatedData = {
                                    ...prev,
                                    pre_score:
                                      key === "pre_score"
                                        ? newValue
                                        : prev.pre_score,
                                    severity_count:
                                      key !== "pre_score"
                                        ? {
                                            ...prev.severity_count,
                                            [key]: newValue,
                                          }
                                        : prev.severity_count,
                                  };

                                  // Calculate total_issues
                                  const totalIssues =
                                    updatedData.severity_count.blocker +
                                    updatedData.severity_count.critical +
                                    updatedData.severity_count.major +
                                    updatedData.severity_count.normal +
                                    updatedData.severity_count.minor;

                                  // Calculate total_score (EXCLUDES `pre_score` from weightings)
                                  const totalScore =
                                    updatedData.severity_count.blocker * 10 +
                                    updatedData.severity_count.critical * 8 +
                                    updatedData.severity_count.major * 5 +
                                    updatedData.severity_count.normal * 3 +
                                    updatedData.severity_count.minor * 1;

                                  return {
                                    ...updatedData,
                                    total_issues: totalIssues,
                                    total_score: totalScore,
                                  };
                                });
                              }}
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
                          {isEditing && ( // ✅ Show Add button only if isEditing is true
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
                        {formData?.total_issues}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center h-[55vh] w-1/3">
                    {/* Display the existing or uploaded image */}
                    <img
                      src={formData.image || img} // Fallback image
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
                      className="px-4 py-2   bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer 
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
                    className={`px-4 py-2  text-white rounded-lg shadow-md  ${
                      !isEditing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 hover:cursor-pointer"
                    }`}
                    disabled={!isEditing}
                  >
                    Save
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className={`px-3 py-2 text-white rounded-lg shadow-md ${
                        formData && formData.name === null
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={deleteTournament}
                      disabled={formData && formData.name === null}
                    >
                      <BsTrash3 />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      )}
      {playerCreate && (
        <Modal
          className="h-[84vh] text-md "
          afterClosing={() => {
            setPlayerCreate(false);
            setFormData({
              courses: [],
              domain_name: "",
              name: "",
              emp_id: null,
              gender: "",
              image: img,
              pre_score: 0,
              role: "",
              severity_count: {
                blocker: 0,
                critical: 0,
                major: 0,
                normal: 0,
                minor: 0,
              },
              total_issues: 0,
              total_score: 0,
            });
          }}
        >
          <ModalHead className="w-1/3 ">
            <div className="w-full flex px-4 justify-between text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
              {formData.name ? (
                <span>{formData.name}</span>
              ) : (
                <span>Domain Name</span>
              )}
              {formData.total_issues ? (
                <span className="font-bold ">
                  Score: {formData.total_score}
                </span>
              ) : (
                <span className="font-bold ">Score: 0</span>
              )}
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
                        <label htmlFor="domain_name" className="font-medium">
                          Domain Name
                        </label>
                        <input
                          id="domain_name"
                          placeholder="Enter Domain Name"
                          type="text"
                          value={formData.domain_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              domain_name: e.target.value,
                            })
                          }
                          className="mx-5 w-full p-2 rounded-3xl border focus:outline-blue-500 transition-all duration-200"
                        />
                      </div>
                      <div className="flex items-center w-1/2">
                        <label htmlFor="emp_id" className="font-medium">
                          Employee Id
                        </label>
                        <input
                          id="emp_id"
                          type="number"
                          placeholder="Enter Employee Id"
                          value={formData.emp_id}
                          onChange={(e) =>
                            setFormData({ ...formData, emp_id: e.target.value })
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
                          <option value="captain">Captain</option>
                          <option value="player">Player</option>
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
                          const key = label.toLowerCase().replace(" ", "_"); // Convert label to object key

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
                                value={
                                  key === "pre_score"
                                    ? formData?.pre_score ?? 0
                                    : formData?.severity_count?.[key] ?? 0
                                }
                                onChange={(e) => {
                                  const newValue = Number(e.target.value) || 0;

                                  setFormData((prevData) => {
                                    // Update severity count or pre_score
                                    const updatedData = {
                                      ...prevData,
                                      pre_score:
                                        key === "pre_score"
                                          ? newValue
                                          : prevData.pre_score,
                                      severity_count:
                                        key !== "pre_score"
                                          ? {
                                              ...prevData.severity_count,
                                              [key]: newValue,
                                            }
                                          : prevData.severity_count,
                                    };

                                    // Calculate total_issues (EXCLUDES `pre_score`)
                                    const totalIssues =
                                      updatedData.severity_count.blocker +
                                      updatedData.severity_count.critical +
                                      updatedData.severity_count.major +
                                      updatedData.severity_count.normal +
                                      updatedData.severity_count.minor;

                                    // Calculate total_score (EXCLUDES `pre_score` from weightings)
                                    const totalScore =
                                      updatedData.severity_count.blocker * 10 +
                                      updatedData.severity_count.critical * 8 +
                                      updatedData.severity_count.major * 5 +
                                      updatedData.severity_count.normal * 3 +
                                      updatedData.severity_count.minor * 1;

                                    return {
                                      ...updatedData,
                                      total_issues: totalIssues, // ✅ Excludes `pre_score`
                                      total_score: totalScore, // ✅ Excludes `pre_score`
                                    };
                                  });
                                }}
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
                        {formData?.total_issues || 0}
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
