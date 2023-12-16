import React, { useState, useEffect } from "react";
import Button from "./Button";

const TaskModal = ({ isOpen, onClose, onSave, time, resetTimer }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  useEffect(() => {
    // Add an event listener to close the modal on outside click
    const handleOutsideClick = (e) => {
      if (isOpen && e.target.classList.contains("overlay")) {
        // Close the modal
        handleCancel();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handleSave = () => {
    // Validate input fields
    if (!title.trim()) {
      setIsTitleValid(false);
      return;
    }

    if (!description.trim()) {
      setIsDescriptionValid(false);
      return;
    }

    // If validation passes, save the task
    onSave({ title, description, time });
    setTitle("");
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    // Reset the timer and close the modal
    resetTimer();
    onClose();
  };

  // Check if time is a valid number
  const isValidTime = !isNaN(time) && isFinite(time);

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50 overlay"
        onClick={handleCancel}
      ></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 rounded-md shadow-md w-96 relative">
          <h2 className="text-2xl font-bold mb-4 text-center">Add a Task</h2>
          <form>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsTitleValid(true);
                }}
                className={`p-2 border rounded-md w-full ${
                  isTitleValid ? "" : "border-red-500"
                }`}
                required
              />
              {!isTitleValid && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>
            <div className="mb-2">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsDescriptionValid(true);
                }}
                className={`p-2 border rounded-md w-full ${
                  isDescriptionValid ? "" : "border-red-500"
                }`}
                required
              />
              {!isDescriptionValid && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>
            {isValidTime && (
              <div className="text-center mb-2">
                {`Time within: ${new Date(time * 1000)
                  .toISOString()
                  .substr(11, 8)} (HH:MM:SS)`}
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleSave} color="green" text="Save" />
              <Button onClick={handleCancel} color="gray" text="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
