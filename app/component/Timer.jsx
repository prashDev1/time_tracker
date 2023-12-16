import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import TasksList from "./TasksList";
import Button from "./Button";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    startTimer();
    setIsPaused(false);
  };

  const openSaveModal = () => {
    setIsSaveModalOpen(true);
    pauseTimer();
  };

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
    setIsRunning(false);
    setIsPaused(false);
  };
  const resetTimer = () => {
    setTime(0);
  };

  const saveTask = (task) => {
    const newTask = { ...task, time, id: Date.now() };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    closeSaveModal();
    setTime(0);
    console.log("Task saved:", newTask);
  };

  return (
    <>
      <div className="bg-gray-200 flex justify-center items-center flex-col  p-4 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold font-mono py-2 capitalize">
          Time Tracker for task
        </h1>
        <div className="text-4xl font-bold mb-4">
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </div>
        <div>
          <Button
            onClick={startTimer}
            disabled={isRunning || isPaused}
            color="blue"
            text="Start"
          />

          {console.log(isPaused)}
          {isPaused ? (
            <Button
              onClick={resumeTimer}
              disabled={!isPaused}
              color="green"
              text="Resume"
            />
          ) : (
            <Button
              onClick={pauseTimer}
              disabled={!isRunning || isPaused}
              color="red"
              text="Pause"
            />
          )}
          <Button
            onClick={openSaveModal}
            disabled={!isRunning}
            color="green"
            text="Save"
          />
        </div>

        {/* Save Modal */}
        <TaskModal
          isOpen={isSaveModalOpen}
          onClose={closeSaveModal}
          onSave={saveTask}
          time={time}
          resetTimer={resetTimer}
        />
      </div>
      {/* Display TasksList component with the list of tasks */}
      <div className=" mt-4 flex justify-center items-center">
        <TasksList tasks={tasks} />
      </div>
    </>
  );
};

export default Timer;
