import React, { useEffect, useState } from "react";
import Alphabet from "./Alphabet";
import InputBox from "./InputBox";
import Timer from "./Timer";
import { alphabetsList } from "../utils/constants";
import moment from "moment";

const Container = () => {
  const [letter, setLetter] = useState("");
  const [timerStartStop, setTimerStartStop] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("best_time")
      ? convertToSeconds(localStorage.getItem("best_time"))
      : 0
  );
  const [startTime, setStartTime] = useState(moment());

  useEffect(() => {
    if (timerStartStop) {
      var timerId = setInterval(refreshClock, 100);
    }
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [timerStartStop]);

  useEffect(() => {
    if (
      userInput &&
      letter &&
      String.fromCharCode(userInput) !== letter.toUpperCase()
    ) {
      setPenaltyTime((prev) => prev + 500);
    }
  }, [userInput]);

  const refreshClock = () => {
    setCounter(moment().diff(startTime, "miliseconds"));
  };

  const generateRandomLetter = () => {
    setLetter(
      alphabetsList[Math.floor(Math.random() * 10) % alphabetsList.length]
    );
  };

  const userInputCallback = (userInput) => {
    setTimerStartStop(true);
    setUserInput(userInput);
  };

  const showSuccessMessage = () => {
    setLetter("Success!");
  };

  const handleReset = () => {
    setTimerStartStop(false);
    setCounter(0);
    setPenaltyTime(0);
    setStartTime(moment());
    calculateBestTime();
  };

  const stopTimerWhenGameEnds = () => {
    handleReset();
    if (!bestTime || bestTime < counter + penaltyTime) {
      showSuccessMessage();
      setBestTime(convertToSeconds(counter + penaltyTime));
      localStorage.setItem("best_time", counter + penaltyTime);
    }
  };

  const calculateBestTime = () => {
    setBestTime(bestTime);
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
      <Timer timer={convertToSeconds(counter)} bestTime={bestTime} />
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
