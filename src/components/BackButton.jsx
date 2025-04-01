import { MdArrowBackIosNew } from "react-icons/md";
const BackButton = ({onClick}) => {

  return (
    <button 
      onClick={onClick} 
      className="px-4 py-2  bg-gradient-to-b from-[#3b7adf] to-[#1E4788]  text-white rounded-lg h-12 z-0 text-nowrap cursor-pointer"
    >
      <MdArrowBackIosNew />
    </button>
  );
};

export default BackButton;
