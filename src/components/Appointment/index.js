import React from 'react'
import useVisualMode from "../../hooks/useVisualMode"

import  Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Empty from "./Empty"
import "./styles.scss"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
  
export default function Appointment (props){

const{ mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("inter", interview)
    
    props.bookInterview(props.id, interview)
    transition(SHOW);
  }
 
   
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
    onSave={save}
  />


  )}
  </article>
);
 }