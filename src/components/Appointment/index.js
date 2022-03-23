import React, { useEffect } from 'react'
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import ErrorMissingInfo from './ErrorMissingInfo';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING"
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE_MISSINGINFO = "ERROR_SAVE_MISSINGINFO"
  
function Appointment({
  interview, 
  interviewers, 
  id, 
  bookInterview, 
  cancelInterview, 
  time 
  }) {

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

      
  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode ]);

  //SAVE APPOINTMENT FUNCTION
  function save(name, interviewer) {
    // INTERVIEWER MISSING ERROR: REMOVED FOR TESTING ASSIGNMENTS
    // if (!interviewer) {
    //   transition(ERROR_SAVE_MISSINGINFO);
    //   return;
    // }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  //DELETE APPOINTMENT FUNCTION
  function deleteApp() {
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  //COMPONENT VARIABLES
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
      onEdit={() => transition(EDIT)}
    />
  )

  const renderForm =  (
    <Form
      studentName={interview && interview.student}
      interviewers={interviewers}
      interviewerID={interview && interview.interviewer && interview.interviewer.id}
      onSave={save}
      onCancel={() => back()}
    />
  )

  const renderConfirm = (
    <Confirm onCancel={back} onConfirm={deleteApp}/>
  )

  const renderStatus = (<Status />)

  const renderError = (<Error onClose={back} />)

  const renderErrorMissingInfo = (<ErrorMissingInfo onClose={back}/>)

  return (
    <article className="appointment" data-testid="appointment">
      {renderHeader}
      {mode === EMPTY && renderEmpty}      
      {mode === SHOW && renderShow}
      {mode === CREATE && renderForm}
      {mode === CONFIRM && renderConfirm}
      {(mode === SAVING || mode === DELETING) && renderStatus}
      {mode === EDIT && renderForm}
      {(mode === ERROR_SAVE || mode === ERROR_DELETE) && renderError}
      {mode === ERROR_SAVE_MISSINGINFO && renderErrorMissingInfo}
    </article>
  )
  
  
}
  
export default Appointment