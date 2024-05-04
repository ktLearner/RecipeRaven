import { useCallback, useEffect, useState } from "react"
import { FaCheck, FaPause, FaPlay } from "react-icons/fa";
import { RiTimerLine } from "react-icons/ri";

export default function Timer(props) {
  const [time, setTime] = useState(props.time || 0);
  const [state, setState] = useState("counting"); // counting, paused, finished
  let interval = null;

  const btnMap = {
    "counting" : "btn-accent",
    "paused" : "btn-error",
    "finished" : "btn-success",
  };

  const iconMap = {
    "counting" : <FaPause />,
    "paused" : <FaPlay />,
    "finished" : <FaCheck />,
  }

  const min = convert(time).m.toString().padStart(2, "0");
  const sec = convert(time).s.toString().padStart(2, "0");

  function convert(time) {
    return {m: ~~(time / 60), s: (time % 60)}
  }

  const tick = () => {    
    if (state === "paused") return;

    setTime(time => {
      if (time <= 1) {
        clearInterval(interval);
        setState("finished");
        props.onComplete();
      }

      return time - 1;
    });
  };

  function changeState() {
    if (state === "finished") return;
    else if (state === "paused") setState("counting");
    else setState("paused");
  }

  useEffect(() => {
    if (state === "finished") return;
    if (state === "counting") interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [state]);

  return <button onClick={changeState} className={`btn ${btnMap[state]} rounded-lg inline-flex items-center gap-2`}>
    {iconMap[state]}
    {min}:{sec}
    <RiTimerLine />
  </button>
}