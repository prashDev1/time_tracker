import React from "react";

const TasksList = ({ tasks }) => {
  return (
    <div className=" lg:min-w-[500px] min-w-full">
      {tasks.length === 0 ? (
        <p className="capitalize p-6 bg-slate-100 rounded-lg">
          Start timer to add task And stop for save
        </p>
      ) : (
        <>
          <div className="bg-slate-50 lg:min-w-[500px] py-2 ">
            <h2 className="text-2xl capitalize font-bold mb-2 text-center">
              Tasks List
            </h2>
            <ul className="list-disc  px-7 py-1 rounded-lg shadow-sm">
              {tasks.map((task) => (
                <li key={task.id} className="mb-2 shadow-sm p-2 ">
                  <span className="font-bold capitalize ">{task.title}</span>{" "}
                  {`-
                  within:
                  ${new Date(task.time * 1000).toISOString().substr(11, 8)} `}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksList;
