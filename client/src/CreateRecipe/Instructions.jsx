import { useEffect, useId, useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa";

function Instruction(props) {
  const id = useId();

  return <div className="flex flex-col gap-2">
    <span className="font-bold">Step {props.dynamicIdx + 1}</span>
    <div className="grid grid-cols-4 grid-rows-2 gap-2">
      <textarea name={"instruction" + id} id={"text-" + id} placeholder="Add instruction" className="input col-span-3 row-span-2 h-full resize-none"></textarea>
      <input name={"time" + id} id={"time-" + id} className="input" placeholder="Time (in min)"></input>
      <button className="btn btn-error" type="button" onClick={props.onDelete}><FaTrash /></button>
    </div>
  </div>
}

export default function Instructions() {
  const [instructions, setInstructions] = useState([]);

  function addInstruction() {
    const idx = instructions.length;

    function onDelete(idx) {
      return () => setInstructions(prev => prev.filter(ins => ins.idx !== idx));
    }

    setInstructions(prev => [...prev, { idx, onDelete: onDelete(idx) }]);
  }

  return <div className="flex flex-col gap-4">
    {instructions.map((instruction, i) => <Instruction key={instruction.idx} dynamicIdx={i} {...instruction } />)}
    <button onClick={addInstruction} type="button" className="btn btn-primary">Add new step <FaPlus /></button>
  </div>
}