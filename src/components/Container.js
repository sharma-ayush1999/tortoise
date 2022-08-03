import React, { useEffect, useState } from "react";
import Alphabet from "./Alphabet";
import InputBox from "./InputBox";
import Timer from "./Timer";
import { alphabetsList } from "../utils/constants";
import moment from "moment";

const Container = () => {
  const [startTime, setStartTime] = useState(moment());
  const [letter, setLetter] = useState("");
  const [timerStartStop, setTimerStartStop] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("best_time")
      ? convertToSeconds(localStorage.getItem("best_time"))
      : 0
  );

  useEffect(() => {
    if (timerStartStop) {
      var timerId = setInterval(refreshClock, 100);
    }
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [timerStartStop]);

  const refreshClock = () => {
    setCounter(moment().diff(startTime, "miliseconds"));
  };

  const generateRandomLetter = () => {
    setLetter(
      alphabetsList[Math.floor(Math.random() * 10) % alphabetsList.length]
    );
  };

  const userInputCallback = (userInput, firstUserInput) => {
    if (firstUserInput) {
      setStartTime(moment());
    }
    setTimerStartStop(true);
    if (userInput && String.fromCharCode(userInput) !== letter.toUpperCase()) {
      setPenaltyTime((prev) => prev + 500);
    }
  };

  const showMessage = (message) => {
    setLetter(message);
  };

  const handleReset = () => {
    setTimerStartStop(false);
    setCounter(0);
    setPenaltyTime(0);
    setBestTime(bestTime);
  };

  const stopTimerWhenGameEnds = () => {
    setTimerStartStop(false);
    if (
      !localStorage.getItem("best_time") ||
      localStorage.getItem("best_time") >= counter + penaltyTime
    ) {
      showMessage("Success!");
      setBestTime(convertToSeconds(counter + penaltyTime));
      localStorage.setItem("best_time", counter + penaltyTime);
    } else {
      showMessage("Better Luck Next Time!");
    }
  };

  function convertToSeconds(ms) {
    return (ms / 1000).toFixed(3);
  }

  return (
    <div id="container">
      <h3>Type the Alphabet</h3>
      <p>
        Typing game to see how fast you type. Timer <br />
        starts when you do :{")"}
      </p>
      <Alphabet alphabet={letter} />
      <Timer
        timer={convertToSeconds(counter + penaltyTime)}
        bestTime={Number(bestTime).toFixed(2)}
      />
      <InputBox
        letterCallback={generateRandomLetter}
        userInputCallback={userInputCallback}
        resetCallback={handleReset}
        stopTimerCallback={stopTimerWhenGameEnds}
      />
    </div>
  );
};

export default Container;
