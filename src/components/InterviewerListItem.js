import React from "react";
import classnames from "classnames"
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
 
 const interviewerClass = classnames("interviewers__item", {
 "interviewers__item--selected": props.selected
  })
  
  const formatSelected = () =>
  (props.selected ? props.name : "")

  return (
 <li
className={interviewerClass}
onClick={props.setInterviewer}
 >
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {formatSelected()}
   {/* {props.selected && props.name} could also do this instead of ternary operator */}
</li>
  )
}