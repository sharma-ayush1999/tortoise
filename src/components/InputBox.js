import React, { useEffect, useState } from "react";
import moment from "moment";

const InputBox = ({
  letterCallback,
  startTimerCallback,
  stopTimerCallback,
  totalTime,
  userInputCallback,
}) => {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    letterCallback(1);
  }, []);

  const FreezeUserInput = (e) => {
    userInputCallback(e.keyCode);
    letterCallback(userInput.length);
    if (e.key === "Backspace") {
      return e.preventDefault();
    }
    if (userInput.length < 20) {
      startTimerCallback();
      setUserInput(e.target.value.toUpperCase());
      return;
    } else {
      stopTimerCallback();
      localStorage.setItem("best_time", totalTime);
    }
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
        disabled={userInput.length > 20}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default InputBox;
