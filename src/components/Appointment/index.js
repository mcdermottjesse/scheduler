import React from 'react'
import useVisualMode from "../../hooks/useVisualMode"

import  Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Empty from "./Empty"
import "./styles.scss"



export default function Appointment (props){

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
  
const{ mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  
   return (
     
<article className="appointment">
  <Header time={props.time} />
  
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
  )}
  {mode === CREATE && (
    <Form 
    interviewers={props.interviewers}
    onCancel={back}
  />


  )}
  </article>
);
 }