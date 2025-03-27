import React from "react";
import background from "../../assets/background5.jpg";


const EditTeam = () => {
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
              setFormData(item
              //   {
              //   ...item,
              //   courses: item.courses[0]
              //     .split(",")
              //     .map((course) => course.trim()),
              // }
            );
              // calculateTotalIssues(formData)
              setPlayerEdit(true);
            }}
          >
            <Pointlist item={item} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default EditTeam;
