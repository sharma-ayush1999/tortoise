import React, { useEffect, useRef, useState } from "react";

const InputBox = ({
  letterCallback,
  userInputCallback,
  resetCallback,
  stopTimerCallback,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isReset, setIsReset] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
    letterCallback();
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
    if (userInput.length < 19) {
      userInputCallback(e.keyCode, userInput.length === 0);
      letterCallback();
    } else {
      setIsReset(false);
      stopTimerCallback();
    }
  };

  const handleReset = () => {
    setUserInput("");
    letterCallback();
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
        disabled={userInput.length > 19}
        placeholder="Type Here"
      />
      <button disabled={userInput === ""} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default InputBox;
