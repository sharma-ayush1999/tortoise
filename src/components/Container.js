import React, { useEffect, useState } from "react";
import Alphabet from "./Alphabet";
import InputBox from "./InputBox";
import Timer from "./Timer";
import { alphabetsList } from "../utils/constants";
import moment from "moment";

const Container = () => {
  const [startTime, setStartTime] = useState(moment());
  const [letter, setLetter] = useState({ alpha: "", count: 0 });
  const [timerStartStop, setTimerStartStop] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("best_time")
      ? convertToSeconds(localStorage.getItem("best_time"))
      : 0
  );

  useEffect(() => {
    generateRandomLetter();
  }, []);

  useEffect(() => {
    if (userInput && letter.alpha) {
      if (userInput === letter.alpha && letter.count < 21) {
        setTimerStartStop(true);
        generateRandomLetter();
        if (letter.count === 1) {
          setStartTime(moment());
        }
      } else {
        setPenaltyTime(penaltyTime + 500);
      }
    }
  }, [userInput]);

  useEffect(() => {
    if (timerStartStop) {
      var timerId = setInterval(refreshClock, 100);
    }
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [timerStartStop]);

  useEffect(() => {
    if (letter.count === 21) {
      setLetter({ alpha: "", count: 0 });
      stopTimerWhenGameEnds();
    }
  }, [letter.alpha]);

  const refreshClock = () => {
    setCounter(moment().diff(startTime, "miliseconds"));
  };

  const generateRandomLetter = () => {
    setLetter({
      alpha:
        alphabetsList[Math.floor(Math.random() * 10) % alphabetsList.length],
      count: letter.count + 1,
    });
  };

  const userInputCallback = (userInput) => {
    setUserInput(String.fromCharCode(userInput));
  };

  const handleReset = () => {
    setTimerStartStop(false);
    setCounter(0);
    setPenaltyTime(0);
    setBestTime(bestTime);
    generateRandomLetter();
  };

  const stopTimerWhenGameEnds = () => {
    setTimerStartStop(false);
    if (
      !localStorage.getItem("best_time") ||
      localStorage.getItem("best_time") >= counter + penaltyTime
    ) {
      setLetter({ alpha: "Success!", count: 0 });
      localStorage.setItem("best_time", counter + penaltyTime);
      setBestTime(convertToSeconds(counter + penaltyTime));
    } else {
      setLetter({ alpha: "Better Luck Next time!", count: 0 });
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
      <Alphabet alphabet={letter.alpha} />
      <Timer
        timer={convertToSeconds(counter + penaltyTime)}
        bestTime={Number(bestTime).toFixed(2)}
      />
      <InputBox
        userInputCallback={userInputCallback}
        resetCallback={handleReset}
      />
    </div>
  );
};

export default Container;
