import React from 'react'
import useVisualMode from "../../hooks/useVisualMode"

import  Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Empty from "./Empty"
import Status from "./Status"
import Confirm from "./Confirm"
// import Error from "./Error"
import "./styles.scss"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
  
export default function Appointment (props){

const{ mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => console.log(error))
    
  }

  const deleteInt = () => {
    console.log("deleteInt")
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => console.log(error))
  }

  const showDelete = () => {
    transition(CONFIRM)
  }

  return (
    
<article className="appointment">
  <Header time={props.time} />
  
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={showDelete}
      
    />
   
  )}
  {mode === CREATE && (
    <Form 
    interviewers={props.interviewers}
    onCancel={() => back(EMPTY)}
    onSave={save}
    
  />
  )}

  {mode === SAVING && (
    <Status saveMessage = {SAVING} />
  )}

  {mode === DELETING && (
    <Status deleteMessage = {DELETING} />
  )}

  {mode === CONFIRM && (
    <Confirm
    onConfirm={deleteInt}
    onCancel={() => back(SHOW)}
    message={"Are you sure you want to delete"}
    />
  )
  
  }

  </article>
);
 }