import React, { useEffect } from 'react'
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Show from './Show';
import Empty from './Empty';
import Form from './Form'
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
// const SAVING = "SAVING";
// const CONFIRM = "CONFIRM";
// const DELETING = "DELETING"
  
function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(transition(SHOW))
  };
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}      
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
        />
      )}
      {mode === CREATE && (
        <Form
          student={props.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      
    </article>
  )
  
}
  
export default Appointment