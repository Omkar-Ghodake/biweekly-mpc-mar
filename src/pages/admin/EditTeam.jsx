import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Pointlist from "../../components/Pointlist";
import Modal from "../../layouts/Modal/Modal";
import { ModalContext } from "../../context/ModalProvider";
import ModalHead from "../../layouts/Modal/ModalHead";
import ModalBody from "../../layouts/Modal/ModalBody";
import background from "../../assets/background5.jpg";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import img from "../../glb/Blank Profile pic.png";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { ToastContext } from "../../context/ToastProvider";
import { PlayersContext } from "../../context/PlayersProvider";
import Input from "../../components/form/Input";

const EditTeam = () => {
  const [players, setPlayers] = useState([]);
  const { openModal, closeModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({});
  const playersData = useContext(PlayersContext);

  useEffect(() => {
    setPlayers(playersData.players);
  }, [playersData]);

  console.log(formData);

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
            onClick={() => {
              openModal();
              setPlayerCreate(true);
              setFormData();
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
            key={item.id} // ✅ Add a unique key
            className="list flex flex-col space-y-3 cursor-pointer"
            onClick={() => {
              openModal();
              setFormData(
                item
                //   {
                //   ...item,
                //   courses: item.courses[0]
                //     .split(",")
                //     .map((course) => course.trim()),
                // }
              );
              // calculateTotalIssues(formData)
              // setPlayerEdit(true);
            }}
          >
            <Pointlist item={item} index={index} />
          </div>
        ))}
      </motion.div>
      <Modal
        className="h-[911px] text-md  tracking-wide"
        afterClosing={() => {}}
      >
        <ModalHead className="w-1/3 ">
          <div className="w-full flex px-4 justify-between text-center text-white bg-[#1E4788] rounded-xl shadow-md p-2">
            {formData.name ? (
              <span>{formData.name}</span>
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
          <div className="flex flex-col text-[#1E4788]">
            <div className=" w-full h-[470px] flex flex-row">
              <div className="w-1/2 flex flex-col ml-3">
                <div className="h-[28.33%]">
                  <Input
                    isLabel={true}
                    label={"Domain Name"}
                    id={"domain_name"}
                    value={formData.domain_name}
                    onChange={onchange}
                    isEditing={false}
                  ></Input>
                  <Input
                    isLabel={true}
                    label={"Employee ID"}
                    id={"emp_id"}
                    value={formData.emp_id}
                    onChange={onchange}
                    isEditing={false}
                  ></Input>
                  <Input
                    type={"select"}
                    options={["Captain", "Player"]}
                    isLabel={true}
                    label={"Member Role"}
                    id={"role"}
                    value={formData.role}
                    onChange={onchange}
                    isEditing={false}
                  ></Input>
                </div>

                <div className="h-[38.67%]">
                  <div className="font-medium mb-1">Issue Tracker</div>
                  <div className="grid grid-cols-3 gap-y-3 text-sm">
                    {["blocker", "critical", "major", "normal", "minor"].map(
                      (key) => (
                        <div className="bg-[#D1C9FF] p-1.5 flex justify-between items-center space-x-0.5 rounded-sm w-[120px]">
                          <label htmlFor={key} className="font-medium ">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          <input
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            id={key}
                            type="number"
                            value={formData?.severity_count?.[key] ?? 0}
                            onChange={onchange}
                            isEditing={true}
                            className={`bg-[#BFB4FF] py-1.5 w-2/5 text-center rounded-sm transition-all duration-200 appearance-none
                              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                              
                              `}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex space-x-4 mt-2 text-white font-medium text-center  tracking-wider">
                    <div className="flex space-x-1 items-center justify-center ">
                      <span className="font-medium bg-[#1E4788] p-1.5 w-32 rounded-sm  ">
                        Issue Count
                      </span>
                      <span className=" bg-[#1E4788] rounded-sm p-1.5 px-4 ">
                        {formData?.total_issues}
                      </span>
                    </div>
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="font-medium bg-[#1E4788] p-1.5 w-32 rounded-sm  ">
                        Score
                      </span>
                      <span className=" bg-[#1E4788] rounded-sm p-1.5 px-4 ">
                        {formData?.total_score}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-300 h-1/3"></div>
              </div>
              <div className="w-1/2">
                <div className="bg-yellow-300 h-2/3"></div>
                <div className="bg-yellow-400 h-1/3"></div>
              </div>
            </div>
            <div className=" bg-green-500 w-full h-[55px]">hello</div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditTeam;
