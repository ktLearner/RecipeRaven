import { FaCheckCircle } from "react-icons/fa";

function TimelineLi(props) {
  return (
    <li>
      <hr className={props.idx < props.finished ? "bg-success" : null} />
      <div
        className={`timeline-start px-8 ${props.idx < props.finished && "text-success"}`}
      >
        Step {props.idx + 1}
      </div>
      <FaCheckCircle
        className={`timeline-middle ${props.idx < props.finished && "text-success"}`}
      />
      {props.idx !== props.total - 1 && (
        <hr className={props.idx < props.finished - 1 ? "bg-success" : null} />
      )}
    </li>
  );
}

export default function Timeline(props) {
  return (
    <ul className="timeline flex-grow overflow-auto no-scrollbar">
      {Array(props.total)
        .fill(null)
        .map((_, i) => (
          <TimelineLi
            key={i}
            idx={i}
            finished={props.finished}
            total={props.total}
          />
        ))}
    </ul>
  );
}
