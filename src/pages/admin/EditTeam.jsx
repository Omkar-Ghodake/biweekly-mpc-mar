import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Pointlist from "../../components/Pointlist";
import Modal from "../../layouts/Modal/Modal";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import background from "../../assets/background5.jpg";
import { IoMdAdd } from "react-icons/io";
import img from "../../glb/Blank Profile pic.png";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { ToastContext } from "../../context/ToastProvider";
import { PlayersContext } from "../../context/PlayersProvider";
import Input from "../../components/form/Input";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditTeam = () => {
  const [players, setPlayers] = useState([]);
  const { openModal, closeModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({});
  const playersData = useContext(PlayersContext);
  const [image, setImage] = useState(img || ""); // Default to provided image
  const toast = useContext(ToastContext);

  const [isEditing, setIsEditing] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const emptyForm = {
    severity_count: {
      blocker: 0,
      critical: 0,
      major: 0,
      normal: 0,
      minor: 0,
    },
    domain_name: "",
    emp_id: "",
    pre_score: "",
    total_score: 0,
    total_issues: 0,
    courses: [],
    projects: [],
    role: "",
    image: img,
  };

  useEffect(() => {
    setPlayers(playersData.players);
  }, [playersData.players]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "emp_id") {
      if (value.length > 8) return; // Limit to 8 characters
      setFormData((prev) => ({
        ...prev,
        emp_id: value,
      }));
      return;
    }

    const numValue = Number(value);

    if (["blocker", "critical", "major", "normal", "minor"].includes(id)) {
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          severity_count: {
            ...prev.severity_count,
            [id]: numValue,
          },
        };
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
          total_issues: Number(totalIssues),
          total_score: totalScore,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
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

    setFormData((prevData) => ({
      ...prevData,
      image: file, // ✅ Store file in formData
    }));
  };

  const handleCourseChange = (index, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = value;
    setFormData({ ...formData, courses: updatedCourses });
  };

  const addCourseField = () => {
    setFormData({ ...formData, courses: [...formData.courses, ""] });
  };

  const removeCourseField = (index) => {
    const updatedCourses = formData.courses.filter((_, i) => i !== index);
    setFormData({ ...formData, courses: updatedCourses });
  };

  const removeProjectField = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleProjectsChange = (index, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProjectField = () => {
    setFormData({ ...formData, projects: [...formData.projects, ""] });
  };

  const createPlayer = async (e) => {
    e.preventDefault();
    const cleanedFormData = {
      ...formData,
      courses: formData.courses.every((course) => course.trim() === "")
        ? []
        : formData.courses,
      projects: formData.projects.every((project) => project.trim() === "")
        ? []
        : formData.projects,
    };

    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/players/add-player",
        cleanedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setImage(null);
        setFormData(emptyForm);
        setCreateNew(false);
        setIsEditing(false);
        toast.showToast("Player added successfully!");
        closeModal();
      } else {
        toast.showToast(`Error: ${response.statusText}`, "error");
      }
    } catch (error) {
      console.error("Error adding player:", error);
      toast.showToast(`${error.response?.data?.message || "An error occurred."}`, "error");
    } finally {
      playersData.updateData();
    }
  };

  const updatePlayer = async (e) => {
    e.preventDefault();
    const cleanedFormData = {
      ...formData,
      courses: formData.courses.every((course) => course.trim() === "")
        ? []
        : formData.courses,
      projects: formData.projects.every((project) => project.trim() === "")
        ? []
        : formData.projects,
    };

    try {
      const id = formData._id;

      const response = await axios.put(
        `http://localhost:5500/api/v1/players/update-player/${id}`,
        cleanedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.showToast("Player updated successfully!");
        setIsEditing(false);
      } else {
        toast.showToast(`Error: ${response.statusText}`, "error");
      }
    } catch (error) {
      toast.showToast(`${error.response?.data?.message || "An error occurred."}`, "error");
    } finally {
      playersData.updateData();
    }
  };

  const deletePlayer = async (e) => {
    e.preventDefault();
    try {
      const id = formData._id;

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
        toast.showToast(`Error: ${response.statusText}`, "error");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      toast.showToast(`${error.response?.data?.message || "An error occurred."}`, "error");
    } finally {
      closeModal();
      setIsEditing(false);
      setFormData(emptyForm);
      playersData.updateData();
    }
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
            className="text-xl font-bold px-4 py-1 bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-102 mr-24"
            onClick={(e) => {
              e.preventDefault();
              openModal();
              setIsEditing(true);
              setCreateNew(true);
              setFormData(emptyForm);
              setImage(null);
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
            key={item._id} // ✅ Add a unique key
            className="list flex flex-col space-y-3 cursor-pointer"
            onClick={() => {
              openModal();
              setFormData(item);
              setImage(item.image);
            }}
          >
            <Pointlist item={item} index={index} />
          </div>
        ))}
      </motion.div>
      <Modal
        className="h-[911px] text-md  tracking-wide"
        afterClosing={() => {
          setIsEditing(false);
          setCreateNew(false);
          setFormData(emptyForm);
        }}
      >
        <ModalHead className="w-1/3 ">
          <div className="w-full flex px-4 justify-between text-center text-white bg-[#1E4788] rounded-xl shadow-md p-2">
            {formData.domain_name ? (
              <span>{formData.domain_name}</span>
            ) : (
              <span>Domain Name</span>
            )}
            {formData.total_issues ? (
              <span className="font-bold ">Score: {formData.total_score}</span>
            ) : (
              "Score : 0"
            )}
          </div>
        </ModalHead>
        <ModalBody>
          <form
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onSubmit={createNew ? createPlayer : updatePlayer}
          >
            <div className="flex flex-col text-[#1E4788]">
              <div className=" w-full h-[470px] flex flex-row">
                <div className="w-1/2 flex flex-col ml-3">
                  <div className="h-[28.33%]">
                    <Input
                      isLabel={true}
                      label={"Domain Name"}
                      id={"domain_name"}
                      value={formData.domain_name}
                      onChange={handleInputChange}
                      isEditing={isEditing}
                      required={true}
                    ></Input>
                    <Input
                      type={"number"}
                      placeholder={"Enter Employee ID"}
                      isLabel={true}
                      label={"Employee ID"}
                      id={"emp_id"}
                      value={formData.emp_id}
                      onChange={handleInputChange}
                      isEditing={isEditing}
                      required={true}
                    ></Input>
                    <Input
                      type={"select"}
                      options={["Captain", "Player"]}
                      isLabel={true}
                      label={"Member Role"}
                      id={"role"}
                      value={formData.role}
                      onChange={handleInputChange}
                      isEditing={isEditing}
                      required={true}
                    ></Input>
                  </div>

                  <div className="h-[38.67%]">
                    <div className="font-medium  text-lg  mb-1">
                      Issue Tracker
                    </div>
                    <div className="grid grid-cols-3 gap-y-3 text-sm">
                      {["blocker", "critical", "major", "normal", "minor"].map(
                        (key) => (
                          <div className="bg-[#e6e1fd] p-1.5 flex justify-between items-center space-x-0.5 rounded-sm w-[120px]">
                            <label htmlFor={key} className="font-medium ">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                              key={key}
                              label={key.charAt(0).toUpperCase() + key.slice(1)}
                              id={key}
                              type="number"
                              value={formData?.severity_count?.[key] ?? 0}
                              onChange={handleInputChange}
                              isEditing={isEditing}
                              className={`bg-[#BFB4FF] py-1.5 w-2/5 text-center rounded-sm transition-all duration-200 appearance-none
                                [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none  ${
                                  isEditing
                                    ? "border focus:outline-blue-500"
                                    : "bg-[#D1C9FF] cursor-default"
                                }`}
                              readOnly={!isEditing}
                            />
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex space-x-4 mt-2 text-white font-medium  text-center tracking-wider">
                      {[
                        { label: "Issue Count", value: formData?.total_issues },
                        { label: "Score", value: formData?.total_score },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex space-x-1 items-center justify-center"
                        >
                          <span className="font-medium  bg-[#1E4788] p-1.5 w-32 rounded-sm">
                            {label}
                          </span>
                          <span className="bg-[#1E4788] rounded-sm p-1.5 px-4">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-1/3 flex flex-col">
                    {/* Heading & Add Button */}
                    <div className="flex items-center justify-between w-3/4">
                      <label className="font-medium text-lg my-1">
                        Courses
                      </label>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={addCourseField} // Add new field on click
                          className="px-2 py-1 bg-[#FAFAFA] text-[#1E4788] rounded-sm hover:bg-[#F1F1F1] transition"
                        >
                          <IoMdAdd className="text-xl font-bold" />
                        </button>
                      )}
                    </div>

                    {/* Dynamic Input Fields with Scrollable Container */}
                    <div
                      className="w-3/4 max-h-[70%] overflow-y-auto p-2
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400"
                    >
                      {formData.courses?.length ? (
                        formData?.courses?.map((course, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 my-1"
                          >
                            <span className="font-medium text-gray-700 w-3">
                              {index + 1}.
                            </span>
                            <input
                              type="text"
                              value={course}
                              onChange={(e) =>
                                handleCourseChange(index, e.target.value)
                              }
                              className="w-full bg-white border border-[#F1F1F1] shadow-md shadow-black/15 rounded-lg px-2 py-1"
                              placeholder={`Course ${index + 1}`}
                            />
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => removeCourseField(index)}
                                className="hover:scale-110 transition"
                              >
                                <BsTrash3 className="text-xs text-black hover:text-red-600" />
                              </button>
                            )}
                          </div>
                        ))
                      ) : createNew ? (
                        <span>Add a Course</span>
                      ) : (
                        <span>No courses added</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="h-2/3 flex justify-center items-center">
                    <div className="flex justify-center bg-white items-center h-[90%] w-[65%] rounded-2xl drop-shadow-2xl relative group">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex justify-center "
                      >
                        <img
                          src={image || img}
                          alt="Profile"
                          className="h-[60%] w-auto"
                        />
                        <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#1E4788] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Upload an Image
                        </span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />

                      {/* <FaRegEdit className="w-6 h-6 absolute bottom-6 right-2"/> */}
                    </div>
                  </div>
                  <div className="h-1/3 flex flex-col">
                    {/* Heading & Add Button */}
                    <div className="flex items-center justify-between w-3/4">
                      <label className="font-medium text-lg my-1">
                        Projects
                      </label>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={addProjectField} // Add new field on click
                          className="px-2 py-1 bg-[#FAFAFA] text-[#1E4788] rounded-sm hover:bg-[#F1F1F1] transition"
                        >
                          <IoMdAdd className="text-xl font-bold" />
                        </button>
                      )}
                    </div>

                    {/* Dynamic Input Fields with Scrollable Container */}
                    <div
                      className="w-[80%] max-h-[70%] overflow-y-auto p-2
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400"
                    >
                      {formData?.projects?.length ? (
                        formData?.projects?.map((course, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 my-1"
                          >
                            <span className="font-medium text-gray-700 w-3">
                              {index + 1}.
                            </span>
                            <input
                              type="text"
                              value={course}
                              onChange={(e) =>
                                handleProjectsChange(index, e.target.value)
                              }
                              className="w-full bg-white border border-[#F1F1F1] shadow-md shadow-black/15 rounded-lg px-2 py-1"
                              placeholder={`Project ${index + 1}`}
                            />
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => removeProjectField(index)}
                                className="hover:scale-110 "
                              >
                                <BsTrash3 className="text-xs text-black hover:text-red-600" />
                              </button>
                            )}
                          </div>
                        ))
                      ) : createNew ? (
                        <span>Add a Project</span>
                      ) : (
                        <span>No projects added</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full p-2 flex justify-center space-x-5 rounded-b-2xl">
                {/* Edit Button */}
                {!createNew && (
                  <button
                    type="button"
                    className={`w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md hover:cursor-pointer ${
                      isEditing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
                    }`}
                    disabled={isEditing}
                    onClick={() => setIsEditing(true)}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <FaRegEdit />
                      <span>Edit</span>
                    </div>
                  </button>
                )}

                {/* Save/Update Button */}
                <button
                  type="submit"
                  className={`w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md  ${
                    !isEditing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#68AA45] hover:bg-green-700 hover:cursor-pointer"
                  }`}
                  disabled={!isEditing}
                >
                  Save
                </button>

                {/* Delete Button */}
                {!createNew && isEditing && (
                  <button
                    type="button"
                    className={`w-[120px] h-[40px] px-3 py-2 text-white rounded-xl shadow-md ${
                      !isEditing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#950202] hover:bg-red-700 hover:cursor-pointer"
                    }`}
                    disabled={!isEditing}
                    onClick={deletePlayer}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <RiDeleteBin6Line />
                      <span>Delete</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditTeam;
