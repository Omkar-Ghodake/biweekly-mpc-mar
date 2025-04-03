import React from "react";

const Input = ({ 
  label, 
  id, 
  value, 
  onChange, 
  isEditing, 
  isLabel = true, 
  type = "text", 
  options = [] ,
  placeholder = "",
  width = "w-1/2", // Default width
  required
}) => {
  return (
    <div className="flex items-center w-full my-2">
      {isLabel && (
        <label htmlFor={id} className="font-medium w-1/3 text-[#1E4788]">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={id}
          value={value || ""}
          onChange={onChange}
          required = {required}
          className={`mx-3 ${width} text-center px-2 py-1 rounded-xl transition-all duration-200 
            ${isEditing ? "border focus:outline-blue-500" : "bg-[#D1C9FF] cursor-default appearance-none"}`}
          disabled={!isEditing}
          style={{ backgroundImage: "none", WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          placeholder={type === "text" ? `Enter ${label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}` : placeholder}
          maxLength={type === "text" ? 20 : 3}
          value={value}
          onChange={onChange}
          className={`mx-3 ${width} text-center px-2 py-1 rounded-xl transition-all duration-200 appearance-none
            [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
            ${isEditing ? "border focus:outline-blue-500" : "bg-[#D1C9FF] cursor-default"}`}
          readOnly={!isEditing}
        />
      )}
    </div>
  );
};

export default Input;
