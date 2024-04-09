import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";

export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false);

  return <div className="flex join">
    <input type={visible ? "text" : "password"} className="input join-item grow input-bordered input-ghost" {...props}></input>
    <button className={`btn btn-square join-item btn-outline btn-primary btn-ghost`} type="button" onClick={() => setVisible(prev => !prev)}>{
      visible ? <FaEye /> : <FaEyeSlash />
    }</button>
  </div>
}