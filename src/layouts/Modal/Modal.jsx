import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { ModalContext } from "../../context/ModalProvider";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const Modal = ({ children, className, afterClosing }) => {
  const { isModalOpen, closeModal } = useContext(ModalContext);

  return (
    isModalOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen h-screen p-10 absolute inset-0 bg-black/10 backdrop-blur-sm z-50 flex justify-center items-center"
      >
        <div
          className={twMerge(
            "w-3/5 m-auto bg-white min-h-[70vh] max-h-[90vh] rounded-md p-5 relative",
            className
          )}
        >
          {children}

          <RxCross2
            onClick={() => {
              closeModal();
              afterClosing && afterClosing();
            }}
            className="cursor-pointer absolute -right-10 border border-white  text-white p-1 font-bold rounded-full -top-5 text-2xl hover:text-white/50 hover:bg-blue-900 duration-150"
          />
        </div>
      </motion.div>
    )
  );
};

export default Modal;
