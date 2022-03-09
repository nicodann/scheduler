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
  
function Appointment({ interview, 
                      interviewers, 
                      student, 
                      id, 
                      bookInterview, 
                      cancelInterview, 
                      time }) {
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
    );

  useEffect(() => {
    console.log('mode: ', mode)
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode ]);

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    bookInterview(id, interview, () => transition(SHOW))
  };

  function deleteApp() {
    console.log('delete App')
    transition(DELETING)
    cancelInterview(id, () => transition(EMPTY));

  }

  const renderHeader = (
    <Header time={time}/>
  )

  const renderEmpty = (
    <Empty onAdd={() => transition(CREATE)}/>
  )

  const renderShow = (
    <Show 
      student={interview && interview.student} 
      interviewer={interview && interview.interviewer}
      confirmDelete={() => transition(CONFIRM)}
    />
  )

  const renderForm =  (
    <Form
      student={student}
      interviewers={interviewers}
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