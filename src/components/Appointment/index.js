import React from 'react'
import useVisualMode from "../../hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Empty from "./Empty"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
// import Error from "./Error"
import "./styles.scss"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
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
      .catch((error) => transition(ERROR_SAVE, true))

  }

  const deleteInt = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }
const showAdd = () => {
  transition(CREATE)
}
  const showDelete = () => {
    transition(CONFIRM)
  }

  const showEdit = () => {
    transition(EDIT)
  }

  return (

    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={showAdd} />}
      {mode === SAVING && <Status saveMessage={SAVING} />}
      {mode === DELETING && <Status deleteMessage={DELETING} />}
      {mode === ERROR_SAVE && <Error message="There was a problem saving your appointment" onClose={() => back(CREATE)}/> }
      {mode === ERROR_DELETE &&  <Error message="There was a problem deleting your appointment" onClose={() => back()}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={showDelete}
          onEdit={showEdit}
        />

      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}

        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteInt}
          onCancel={() => back(SHOW)}
          message={"Are you sure you want to delete"}
        />
      )
      }

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}

    </article>
  );
}