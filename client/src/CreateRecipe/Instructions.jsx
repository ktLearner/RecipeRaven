import { useEffect, useId, useRef, useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa";

function Instruction(props) {
  const id = useId();
  const thisRef = useRef();

  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => thisRef.current.focus?.(), []);

  function handleBlur() {
    if (text === "" && time === "") props.onDelete();
  }

  return <div className="flex flex-col gap-2">
    <span className="font-bold">Step {props.dynamicIdx + 1}</span>
    <div className="grid grid-cols-4 grid-rows-2 gap-2">
      <textarea onInput={e => setText(e.target.value)} onBlur={handleBlur} ref={thisRef} name={"instruction-text" + id} id={"instruction-text" + id} placeholder="Add instruction" className="input col-span-3 row-span-2 h-full resize-none"></textarea>
      <input onInput={e => setTime(e.target.time)} name={"instruction-time" + id} id={"instruction-time" + id} className="input" type="number" placeholder="Time (in min)"></input>
      <button className="btn btn-error" type="button" onClick={props.onDelete}><FaTrash /></button>
    </div>
  </div>
}

export default function Instructions(props) {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    props.isInstructionsEmpty(!instructions.length);
  }, [instructions]);

  function addInstruction() {
    const idx = instructions.length;

    function onDelete(idx) {
      return () => setInstructions(prev => prev.filter(ins => ins.idx !== idx));
    }

    setInstructions(prev => [...prev, { idx, onDelete: onDelete(idx) }]);
  }

  return <div className="flex flex-col gap-4">
    {instructions.length ? instructions.map((instruction, i) => <Instruction key={instruction.idx} dynamicIdx={i} {...instruction } />) : <span className="p-4 text-warning">No instructions Added! (add atleast 1)</span>}
    <button onClick={addInstruction} type="button" className="btn btn-neutral">Add new step <FaPlus /></button>
  </div>
}