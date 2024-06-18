import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Timer from "./Timer";
import { server } from "../../helpers/server";
import { imgToObjectURL } from "../../helpers/utils";
import Timeline from "./Timeline";
import InstructionText from "./InstructionText";

function Loader() {
  return (
    <div className="text-center">
      <span className="loading loading-spinner py-8" />
    </div>
  );
}

export default function CookRecipe() {
  const [params] = useSearchParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [finishedStepCount, setFinishedStepCount] = useState(0);
  const [currStepCount, setCurrStepCount] = useState(0);
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    server
      .get(`/recipe?${params.toString()}`, {
        signal: controller.signal,
      })
      .then((res) => {
        const {
          data: { instructions },
        } = res;
        setData(instructions);
        setTitle(res.data.title);
        setStatus("success");
        instructions.forEach((ins) =>
          setTimers((timers) => [
            ...timers,
            <Timer
              key={ins._id}
              time={parseFloat(ins.time) * 60}
              onComplete={finishedStep}
            />,
          ]),
        );
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });

    return () => {
      controller.abort();
      setTimers([]);
    };
  }, []);

  function finishedStep() {
    setFinishedStepCount((count) => count + 1);
  }

  function skipStep() {
    finishedStep();
    next();
  }

  function next() {
    if (currStepCount >= data.length - 1) return;
    setCurrStepCount((count) => count + 1);
  }

  if (status === "loading") return <Loader />;

  if (status === "error")
    return (
      <div className="p-4 text-error">
        Some error occured while fetching the recipe!
      </div>
    );

  return (
    <section className="flex flex-col gap-2 p-4">
      <div className="text-xl text-primary">{title}</div>
      <div className="flex items-center justify-between py-4">
        <Timeline finished={finishedStepCount} total={data.length} />
        {timers[currStepCount]}
      </div>

      <InstructionText text={data[currStepCount].instructionText} />

      <div className="flex items-center gap-2">
        {finishedStepCount < data.length && (
          <button onClick={skipStep} className="btn btn-warning">
            Skip
          </button>
        )}
        {finishedStepCount > currStepCount && (
          <button className="btn btn-accent" onClick={next}>
            {finishedStepCount >= data.length ? "Finished" : "Next"}
          </button>
        )}
        {finishedStepCount >= data.length && (
          <Link
            className="btn btn-link"
            to={`/recipe?rid=${params.get("rid")}#review-section`}
          >
            Leave a review!
          </Link>
        )}
      </div>
    </section>
  );
}
