import { useState, useEffect } from "react";
import moment from "moment";

const Timer = ({ startTime }) => {
  const [counter, setCounter] = useState(0);

  const refreshClock = () => {
    setCounter(moment().diff(startTime, "miliseconds"));
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 100);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const convertToTimeFormat = (count) => {
    return (count / 1000).toFixed(3);
  };

  return <span>{convertToTimeFormat(counter)}</span>;
};
export default Timer;
