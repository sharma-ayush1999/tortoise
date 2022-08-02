import React, { useEffect, useState } from "react";
import Alphabet from "./Alphabet";
import InputBox from "./InputBox";
import Timer from "./Timer";
import { alphabetsList } from "../utils/constants";
import moment from "moment";

const Container = () => {
  const [letter, setLetter] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [penaltyTime, setPenaltyTime] = useState(0);

  const generateRandomLetter = (len) => {
    if (len < 20) {
      setLetter(
        alphabetsList[Math.floor(Math.random() * 10) % alphabetsList.length]
      );
    } else {
      console.log(penaltyTime);
      setLetter("Success!");
    }
  };

  const startTimer = () => {
    setStartTime(moment());
  };

  const stopTimer = () => {
    setStartTime(0);
  };

  const calculateTotalTime = (time) => {
    setTotalTime(time);
  };

  const userInputCallback = (userInput) => {
    if (String.fromCharCode(userInput) !== letter.toUpperCase()) {
      setPenaltyTime((prev) => prev + 500);
    }
  };

  return (
    <div id="container">
      <h3>Type the Alphabet</h3>
      <p>
        Typing game to see how fast you type. Timer <br />
        starts when you do :{")"}
      </p>
      <Alphabet alphabet={letter} />
      {startTime ? (
        <Timer startTime={startTime} totalTimeCallback={calculateTotalTime} />
      ) : (
        "0.000"
      )}
      <InputBox
        letterCallback={generateRandomLetter}
        startTimerCallback={startTimer}
        stopTimerCallback={stopTimer}
        totalTime={totalTime}
        userInputCallback={userInputCallback}
      />
    </div>
  );
};

export default Container;
