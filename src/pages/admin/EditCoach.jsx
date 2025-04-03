import React, { useState, useContext, useEffect } from "react";
import background from "../../assets/background5.jpg";
import imgPlaceholder from "../../glb/Blank Profile pic.png";
import { CoachContext } from "../../context/CoachProvider";
import { useNavigate } from "react-router";

export default function CoachForm() {
  const coach = useContext(CoachContext);
  const coachData = coach.coach;
  console.log(coach);

  const { isCoachAuthenticated } = useContext(CoachContext);

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

  const navigate = useNavigate()

  useEffect(() => {
    if (coachData) {
      setFormData(coachData);
      setImage(coachData.image || "");
    }
  }, [coachData]);
  console.log(coachData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with API call
  };

  if (!isCoachAuthenticated) return navigate("/login");

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center transition-all delay-200"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <div className="w-full flex px-4 justify-between text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
          <h2 className="text-xl font-bold">Coach Registration</h2>
        </div>
        <div className="flex">
          <div className="flex flex-col justify-center items-center h-[55vh] w-1/3">
            <img
              src={image || imgPlaceholder}
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
          <div className="w-2/3 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Domain Name", name: "domain_name", type: "text" },
                { label: "Employee ID", name: "emp_id", type: "number" },
              ].map((field) => (
                <div key={field.name} className="flex items-center w-full">
                  <label htmlFor={field.name} className="font-medium w-1/3">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`ml-5 w-full p-2 rounded-3xl transition-all duration-200 ${
                      isEditing
                        ? "border focus:outline-blue-500"
                        : "bg-gray-100 cursor-default"
                    }`}
                    readOnly={!isEditing}
                  />
                </div>
              ))}
              <div className="flex items-center w-full">
                <label htmlFor="description" className="font-medium w-1/3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="ml-5 w-full p-2 rounded-3xl border focus:outline-blue-500"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex items-center w-full">
                <label htmlFor="gender" className="font-medium w-1/3">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="ml-5 w-full p-2 rounded-3xl border focus:outline-blue-500"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
