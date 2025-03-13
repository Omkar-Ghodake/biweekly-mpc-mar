import React, { useContext } from "react";
import { motion } from "framer-motion";
import Pointlist from "../../components/Pointlist";
import Modal from "../../layouts/Modal/Modal";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import ball from "../../assets/ball.jpg";
import background from "../../assets/background.jpg";
import { IoMdAdd } from "react-icons/io";

const EditTeam = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const { openModal } = useContext(ModalContext);

  const updateDetails = () => {};

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
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
          <div
            className="text-3xl font-bold px-6 py-3 text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-lg shadow-md w-1/5 text-center ml-24"
          >
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
      <Modal>
        <ModalHead>players profile</ModalHead>
        <ModalBody>
          <div>
            <form action="" onSubmit={updateDetails}>
              <div className="flex flex-row items-center space-x-5">
                <img src={ball} alt="" className="w-36 h-36 rounded-full" />
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value="Name"
                  className="border rounded-3xl w-1/2 p-2"
                />
              </div>
              <label htmlFor="">Name</label>
              <input type="text" value="" />
              <label htmlFor="">Name</label>
              <input type="text" value="" />
              <label htmlFor="">Name</label>
              <input type="text" value="" />
              <label htmlFor="">Name</label>
              <input type="text" value="" />
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditTeam;
