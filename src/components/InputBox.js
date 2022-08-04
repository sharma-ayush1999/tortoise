import React, { useEffect, useRef, useState } from "react";

const InputBox = ({ userInputCallback, resetCallback }) => {
  const [userInput, setUserInput] = useState("");
  const [isReset, setIsReset] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    if (isReset) {
      ref.current.focus();
    }
  }, [isReset]);

  const FreezeUserInput = (e) => {
    setUserInput(e.target.value.toUpperCase());
    if (e.key === "Backspace") {
      return e.preventDefault();
    }
    userInputCallback(e.keyCode);
  };

  const handleReset = () => {
    setUserInput("");
    resetCallback();
    setIsReset(true);
  };

  return (
    <div id="inputBox">
      <input
        ref={ref}
        onChange={FreezeUserInput}
        onKeyDown={FreezeUserInput}
        type="text"
        value={userInput}
        placeholder="Type Here"
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default InputBox;
