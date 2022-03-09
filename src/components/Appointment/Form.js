import React, { useEffect } from 'react';
import { useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';



function Form({ studentName, interviewerID, interviewers, onCancel, onSave }) {

  console.log('student: ', studentName)
  console.log('selectedInterviewer: ', interviewerID)

  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerID || null);

  useEffect(() => {
    console.log('stateInterviewer: ', interviewer)
    console.log('statStudent: ', student)
    
  })

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    onCancel();
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          stateInterviewerID={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form