import React, { useEffect, useRef, useState } from "react";

const InputBox = ({
  letterCallback,
  userInputCallback,
  resetCallback,
  stopTimerCallback,
}) => {
  const [userInput, setUserInput] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
    letterCallback();
  }, []);

  const FreezeUserInput = (e) => {
    setUserInput(e.target.value.toUpperCase());
    if (e.key === "Backspace") {
      return e.preventDefault();
    }
    if (userInput.length < 19) {
      userInputCallback(e.keyCode);
      letterCallback();
    } else {
      stopTimerCallback();
    }
  };

  const handleReset = () => {
    setUserInput("");
    letterCallback();
    resetCallback();
  };

  return (
    <div id="inputBox">
      <input
        ref={ref}
        onChange={FreezeUserInput}
        onKeyDown={FreezeUserInput}
        type="text"
        value={userInput}
        disabled={userInput.length > 19}
        placeholder="Type Here"
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default InputBox;
