import React, { useState, useContext, useEffect } from "react";
import background from "../../assets/background5.jpg";
import imgPlaceholder from "../../glb/Blank Profile pic.png";
import { CoachContext } from "../../context/CoachProvider";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import axios from "axios";
import { ToastContext } from "../../context/ToastProvider";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";

export default function CoachForm() {
  const coach = useContext(CoachContext);
  const coachData = coach.coach;
  console.log(coachData);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    domain_name: "",
    emp_id: "",
    image: "",
    description: "",
    gender: "",
  });
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const { isCoachAuthenticated } = useContext(CoachContext);

  useEffect(() => {
    if (coachData) {
      setFormData((prev) => ({ ...prev, ...coachData }));
      setImage(coachData.image || "");
    }
  }, [coachData, isCoachAuthenticated]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value, // Ensure numbers are stored correctly
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:5500/api/v1/coach/update-coach",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.showToast("Coach Updated Successfully");
      }
    } catch (error) {
      toast.showToast("Couldn't Update coach", "error");
    } finally {
      coachData.checkForSession;
      setFormData(coachData);
    }
  };
  console.log(formData); // Replace with API call

  if (!isCoachAuthenticated) return navigate("/login");

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center transition-all delay-200  tracking-wide text-[#1E4788]"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute left-6 top-6">
        <BackButton onClick={() => navigate("/admin/dashboard")} />
      </div>
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-6 flex flex-col">
        {/* Header Section */}
        <div className="w-full flex px-4 justify-between text-white bg-[#1E4788] rounded-xl shadow-md p-3">
          <h2 className="text-xl font-bold">Coach Profile</h2>
        </div>

        <div className="flex h-full">
          {/* Image Upload Section */}
          <div className="flex flex-col justify-center items-center h-[30rem] w-1/3">
            <div className="flex justify-center items-center bg-white h-[55%] w-[90%] rounded-2xl drop-shadow-xl relative group mt-5 py-5">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex justify-center "
              >
                <img
                  src={image || imgPlaceholder}
                  alt="Profile"
                  className="w-[80%] h-auto object-contain"
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
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="w-2/3 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Domain Name", name: "domain_name", type: "text" },
                {
                  label: "Employee ID",
                  name: "emp_id",
                  type: "number",
                  maxLength: 8,
                },
              ].map((field) => (
                <div key={field.name} className="flex items-center w-full">
                  <label
                    htmlFor={field.name}
                    className="font-medium w-1/3 text-[#1E4788]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required
                    maxLength={field.maxLength}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`ml-5 w-full p-2 rounded-xl transition-all duration-200 border shadow-md ${
                      isEditing
                        ? "focus:outline-[#1E4788]"
                        : "bg-gray-100 cursor-default"
                    }`}
                    readOnly={!isEditing}
                  />
                </div>
              ))}

              {/* Description Field */}
              <div className="flex items-center w-full">
                <label
                  htmlFor="description"
                  className="font-medium w-1/3 text-[#1E4788]"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="ml-5 w-full max-h-32 min-h-32 p-2 rounded-xl border shadow-md focus:outline-[#1E4788]"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Gender Selection */}
              <div className="flex items-center w-full">
                <label
                  htmlFor="gender"
                  className="font-medium w-1/3 text-[#1E4788]"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="ml-5 w-full p-2 rounded-xl border shadow-md focus:outline-[#1E4788]"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="w-full  p-2 flex justify-center space-x-5 rounded-b-2xl">
                {/* Edit Button */}
                {/* <button
                  type="button"
                  className="w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="flex items-center justify-center gap-4">
                    <FaRegEdit />
                    <span>Edit</span>
                  </div>
                </button> */}

                {/* Save/Update Button */}
                <button
                  type="submit"
                  className="flex items-center gap-4 w-[120px] h-[40px] px-4 py-2 text-white rounded-xl shadow-md bg-[#68AA45] hover:bg-green-700 hover:cursor-pointer"
                >
                  <FaRegSave />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
