import React, { useEffect } from 'react'
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING"
  
function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  useEffect(() => {
    console.log('mode: ', mode)
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode ]);

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview, () => transition(SHOW))
  };

  function deleteApp() {
    console.log('delete App')
    transition(DELETING)
    props.cancelInterview(props.id, () => transition(EMPTY));

  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}      
      {mode === SHOW && (
        <Show 
          student={props.interview && props.interview.student} 
          interviewer={props.interview && props.interview.interviewer}
          confirmDelete={() => transition(CONFIRM)}
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
      {mode === SAVING && (
        <Status />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={deleteApp}/>
      )}
      {mode === DELETING && (
        <Status />
      )}
      
    </article>
  )
  
}
  
export default Appointment