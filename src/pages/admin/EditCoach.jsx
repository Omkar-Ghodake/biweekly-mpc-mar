import React, { useState } from "react";
import background from "../../assets/background5.jpg";
import imgPlaceholder from "../../glb/Blank Profile pic.png";

export default function CoachForm() {
  const [formData, setFormData] = useState({
    name: "",
    domain_name: "",
    emp_id: "",
    password: "",
    image: "",
    description: "",
    gender: "",
  });
  const [image, setImage] = useState("");

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

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center transition-all delay-200"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex items-center">
        
        <div className="w-2/3 p-6">
          <h2 className="text-xl font-bold mb-4">Coach Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="domain_name"
              placeholder="Domain Name"
              required
              className="w-full p-2 border rounded"
              value={formData.domain_name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="emp_id"
              placeholder="Employee ID"
              required
              className="w-full p-2 border rounded"
              value={formData.emp_id}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <select
              name="gender"
              required
              className="w-full p-2 border rounded"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center h-[55vh] w-1/3">
          <img
            src={image || imgPlaceholder}
            alt="Profile"
            className="w-auto h-64 object-contain border"
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
    </div>
  );
}
