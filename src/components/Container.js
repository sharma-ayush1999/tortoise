import React, { useState } from "react";
import Alphabet from "./Alphabet";
import InputBox from "./InputBox";
import Timer from "./Timer";
import { alphabetsList } from "../utils/constants";

const Container = () => {
  const [letter, setLetter] = useState("");

  const generateRandomLetter = () => {
    setLetter(
      alphabetsList[Math.floor(Math.random() * 10) % alphabetsList.length]
    );
  };
  return (
    <div id="container">
      <h3>Type the Alphabet</h3>
      <p>
        Typing game to see how fast you type. Timer <br />
        starts when you do :{")"}
      </p>
      <Alphabet alphabet={letter} />
      <Timer />
      <InputBox letterCallback={generateRandomLetter} />
    </div>
  );
};

export default Container;
