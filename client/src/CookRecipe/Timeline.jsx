import { FaCheckCircle } from "react-icons/fa"

function TimelineLi(props) {
  return <li>
    <hr className={props.idx < props.finished ? "bg-primary" : null} />
    <div className={`timeline-start px-8 ${props.idx < props.finished && "text-primary"}`}>Step {props.idx + 1}</div>
    <FaCheckCircle className={`timeline-middle ${props.idx < props.finished && "text-primary"}`} />
    <hr className={props.idx < props.finished - 1 ? "bg-primary" : null} />
  </li>
}

export default function Timeline(props) {
  return <ul className="timeline">
    {Array(props.total).fill(null).map((_, i) => <TimelineLi key={i} idx={i} finished={props.finished} />)}
  </ul>
}