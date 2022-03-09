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

  const renderHeader = (
    <Header time={props.time}/>
  )

  const renderEmpty = (
    <Empty onAdd={() => transition(CREATE)}/>
  )

  const renderShow = (
    <Show 
      student={props.interview && props.interview.student} 
      interviewer={props.interview && props.interview.interviewer}
      confirmDelete={() => transition(CONFIRM)}
    />
  )

  const renderForm =  (
    <Form
      student={props.student}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={() => back()}
    />
  )

  const renderConfirm = (
    <Confirm onCancel={back} onConfirm={deleteApp}/>
  )

  const renderStatus = (<Status/>)
  return (
    <article className="appointment">
      {renderHeader}
      {mode === EMPTY && renderEmpty}      
      {mode === SHOW && renderShow}
      {mode === CREATE && renderForm}
      {mode === CONFIRM && renderConfirm}
      {(mode === SAVING || mode === DELETING) && renderStatus}
    </article>
  )
  
}
  
export default Appointment