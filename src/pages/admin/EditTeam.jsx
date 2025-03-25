import React, { useContext, useState } from "react";
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
import img from "../../glb/Members_Photos_Final/Jaipal.png";
import Button from "../../components/Button";

const EditTeam = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const { openModal } = useContext(ModalContext);

  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    empId: null,
    blocker: 0,
    critical: 0,
    major: 0,
    normal: 0,
    minor: 0,
    previous_score: 0,
    courses: [], // Start with one empty course field
  });

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

  const updateDetails = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated Data:", formData);
  };

  // Calculate Total Issues & Score
  const totalIssues =
    formData.blocker +
    formData.critical +
    formData.major +
    formData.normal +
    formData.minor;
  const totalScore =
    formData.blocker * 10 +
    formData.critical * 8 +
    formData.major * 5 +
    formData.normal * 3 +
    formData.minor * 1;
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
            onClick={openModal}
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
            Sr. no.
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

        {arr.map((item, index) => (
          <div
            className="list flex flex-col space-y-3 cursor-pointer"
            onClick={openModal}
          >
            <Pointlist item={item} index={index} />
          </div>
        ))}
      </motion.div>
      <Modal
        className="h-[84vh] text-md "
        afterClosing={() => setIsEditing(false)}
      >
        <ModalHead className="w-1/3 ">
          <div className="w-full text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
            {formData.name ? <span>{formData.name}</span> : "Domain Name"}
          </div>
        </ModalHead>
        <ModalBody>
          <div className="p-2 items-center">
            <form onSubmit={updateDetails} className="space-y-6 ">
              {/* Profile Image and Name Input */}
              <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-1 ">
                <div className="flex flex-col w-full space-y-4 ">
                  {/* Name Input Field */}
                  <div className="flex items-center w-full ">
                    <div className="flex items-center">
                      <label htmlFor="name" className="font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`mx-5 w-full p-2 rounded-3xl transition-all duration-200 ${
                          isEditing
                            ? "border focus:outline-blue-500"
                            : "bg-gray-100 cursor-default"
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div>
                      <label htmlFor="empId" className="font-medium">
                        Employee Id
                      </label>
                      <input
                        id="empId"
                        type="Number"
                        value={formData.empId}
                        onChange={(e) =>
                          setFormData({ ...formData, empId: e.target.value })
                        }
                        className={`mx-5 p-2 w-1/2 rounded-3xl transition-all duration-200 [&::-webkit-inner-spin-button]:appearance-none 
         [&::-webkit-outer-spin-button]:appearance-none ${
           isEditing
             ? "border focus:outline-blue-500"
             : "bg-gray-100 cursor-default"
         }`}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  {/* Number Inputs Section */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        <div key={key} className="flex items-center space-x-3">
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
                            className={`p-2 rounded-3xl w-3/4 transition-all duration-200 appearance-none 
                                [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                                ${
                                  isEditing
                                    ? "border focus:outline-blue-500"
                                    : "bg-gray-100 cursor-default"
                                }`}
                            readOnly={!isEditing}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Total Issues & Score */}
                  <div className="flex space-x-3 items-center">
                    <span className="font-medium">Total Issues</span>
                    <span className="bg-gray-200 px-16 rounded-3xl py-2 ">
                      {totalIssues}
                    </span>
                    <span className="font-medium">Total Score</span>
                    <span className="bg-gray-200 px-16 rounded-3xl py-2">
                      {totalScore}
                    </span>
                  </div>

                  <div className="flex items-center ">
                    <label className="font-medium">Courses</label>
                    {/* Add Button (Only if Editing) */}
                    {isEditing && (
                      <button
                        onClick={addCourseField}
                        className="ml-[7.3rem] px-2 py-1  bg-sky-700 text-white rounded-md hover:bg-sky-600 transition w-fit"
                      >
                        <IoMdAdd className="text-2xl font-bold" />
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-200 w-[17.5rem] p-2 rounded-lg">
                    {formData.courses && (
                      <div className="space-y-1 space-x-3 items-center max-h-28 h-28 w-fit overflow-y-scroll [&::-webkit-scrollbar]:hidden ">
                        {formData.courses.map((course, index) => (
                          <div
                            key={`course-${index}`}
                            className="flex items-center space-x-3"
                          >
                            {/* Numbering the input fields */}
                            <span className="font-medium text-gray-700">
                              {index + 1}.
                            </span>

                            <input
                              type="text"
                              value={course}
                              onChange={(e) =>
                                handleCourseChange(index, e.target.value)
                              }
                              className={`p-1 rounded-md transition-all duration-200 ${
                                isEditing
                                  ? "border focus:outline-blue-500"
                                  : "bg-gray-100 cursor-default"
                              }`}
                              readOnly={!isEditing}
                            />

                            {isEditing && (
                              <button
                                onClick={() => removeCourseField(index)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                              >
                                <MdDeleteOutline />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center h-[55vh] w-1/3">
                  <img
                    src={img}
                    alt="Profile"
                    className="fixd w-auto h-72 object-contain"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 mt-3 bg-sky-700 text-white rounded-lg shadow-md w-fit cursor-pointer 
                      hover:bg-sky-800 hover:shadow-xl hover:scale-105 transition-transform duration-200"
                  >
                    Change
                  </button>
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
    </div>
  );
};

export default EditTeam;
