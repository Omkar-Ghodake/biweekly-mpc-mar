import React, { useContext } from "react";
import TournamentCard from "../../components/TournamentCard";
import { motion } from "framer-motion";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import Modal from "../../layouts/Modal/Modal";
import background from "../../assets/background.jpg";
import { IoMdAdd } from "react-icons/io";
import ball from "../../assets/ball.jpg";

const EditActivites = () => {
  const arr = [1, 2, 3, 4];
  const { openModal } = useContext(ModalContext);
  return (
    <>
      {/* <img src={background} alt="" className="z-10" /> */}
      <div
        className="h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="justify-start  w-3/4 max-h-40 min-h-5/6 py-3 px-3 backdrop-blur-md  rounded-lg overflow-y-scroll [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between">
              <div className="text-3xl font-bold ml-3 px-6 py-3  bg-gradient-to-b from-sky-600 to-sky-800  text-white bg-sky-700 rounded-lg shadow-md w-1/4 text-center">
                Tournaments
              </div>
              <button
                className="text-xl font-bold px-4 py-1 text-white bg-sky-700 rounded-lg shadow-md w-fit cursor-pointer hover:bg-sky-800 hover:shadow-xl hover:scale-102 mr-6"
                onClick={openModal}
              >
                <div className="flex justify-center items-center ">
                  <IoMdAdd />
                  Add a tournament
                </div>
              </button>
            </div>
            <div className="flex flex-row flex-wrap space-x-5  space-y-7 mt-5 ml-3">
              {arr.map((item, index) => (
                <div onClick={openModal}>
                  <TournamentCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Modal>
        <ModalHead className="w-1/3">
          <div className="w-full text-center text-white bg-gradient-to-b from-sky-600 to-sky-800 rounded-xl shadow-md p-3">
            <span>Namo AI</span>
          </div>
        </ModalHead>
        <ModalBody>
          <div className="p-2 flex flex-row items-center">
            <div className="w-2/3 border-2 bg-red-300">
              <form onSubmit={""} className="space-y-6  ">
                <div>
                  <label htmlFor="">Tournament name</label><input type="text" />
                </div>
              </form>
            </div>
            <div className="w-1/3">
              <img src={ball} alt="" />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditActivites;
