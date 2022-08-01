import React, { useState } from "react";

const InputBox = ({ letterCallback, calculateTime }) => {
  const [userInput, setUserInput] = useState("");
  const FreezeUserInput = (e) => {
    if (e.key === "Backspace" || userInput.length === 20) {
      return e.preventDefault();
    }
    letterCallback();
    setUserInput(e.target.value.toUpperCase());
  };

  const handleReset = () => {
    setUserInput("");
    letterCallback();
  };
  return (
    <div id="inputBox">
      <input
        onChange={FreezeUserInput}
        onKeyDown={FreezeUserInput}
        type="text"
        value={userInput}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default InputBox;
