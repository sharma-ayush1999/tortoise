const Timer = ({ timer, bestTime }) => {
  return (
    <div id="timer">
      <p>Time: {timer}s</p>
      {bestTime ? <p>my best time: {bestTime}s!</p> : ""}
    </div>
  );
};
export default Timer;
