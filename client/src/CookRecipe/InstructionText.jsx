import { FaVolumeUp } from "react-icons/fa";
import { speak } from "../../helpers/textToSpeech";

export default function InstructionText(props) {
  return <div className="flex gap-2">
    <textarea readOnly className="input input-bordered resize-none flex-grow" value={props.text} />
    {window.speechSynthesis && <button onClick={() => speak(props.text)} className="btn btn-primary self-start"><FaVolumeUp></FaVolumeUp></button>}
  </div>
}