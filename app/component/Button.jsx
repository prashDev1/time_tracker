import React from "react";

const Button = ({ onClick, disabled, color, text }) => (
  <button
    onClick={onClick}
    disabled={disabled ?? false}
    className={`text-white bg-slate-950 px-4 py-1 rounded-md mr-2 capitalize hover:bg-slate-600 ${
      disabled
        ? `bg-${color}-400 cursor-not-allowed`
        : `bg-${color}-500 hover:bg-${color}-600`
    }`}
  >
    {text}
  </button>
);

export default Button;
