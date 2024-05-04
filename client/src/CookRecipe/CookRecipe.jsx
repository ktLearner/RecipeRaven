import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Timer from "./Timer";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { server } from "../../helpers/server";
import { imgToObjectURL } from "../../helpers/utils";
import Timeline from "./Timeline";
import InstructionText from "./InstructionText";

function Loader() {
  return <div className="text-center">
    <span className="py-8 loading loading-spinner" />
  </div>
}

export default function CookRecipe() {
  const [params] = useSearchParams();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [finishedStepCount, setFinishedStepCount] = useState(0);
  const [currStepCount, setCurrStepCount] = useState(0);

  const timer = parseFloat(data[currStepCount]?.time) * 60;

  useEffect(() => {
    const controller = new AbortController;
    setStatus("loading");

    server.get(`/recipe?${params.toString()}`, {
      signal: controller.signal
    })
      .then(res => {
        const { data: { instructions } } = res;
        setData(instructions);
        setStatus("success");
      })
      .catch(err => {
        console.log(err);
        setStatus("error");
      });

    return () => {
      controller.abort();
    }
  }, []);

  function finishedStep() {
    setFinishedStepCount(count => count+1);
  }

  function skipStep() {
    finishedStep();
  }

  function next() {
    if (currStepCount >= data.length - 1) return; 
    setCurrStepCount(count => count+1);
  }
  
  if (status === "loading") return <Loader />;

  if (status === "error") return <div className="text-error p-4">
    Some error occured while fetching the recipe!
  </div>

  return <section className="p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <Timeline finished={finishedStepCount} total={data.length} />
      <Timer time={timer} onComplete={finishedStep} />
    </div>

    <InstructionText text={data[currStepCount].instructionText} />

    <div className="flex gap-2 items-center">
      <button onClick={skipStep} className="btn btn-warning">Skip</button>
      {finishedStepCount > currStepCount && <button className="btn btn-accent" onClick={next}>{finishedStepCount >= data.length ? "Finished" : "Next"}</button>}
    </div>
  </section>
}