import React, { useEffect } from 'react';
import { useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';



function Form({ studentName, interviewerID, interviewers, onCancel, onSave }) {

  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerID || null);
  const [error, setError] = useState("");

  
  function validate(name) {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    onSave(name, interviewer);
  }

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
            name="student"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          stateInterviewerID={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate(student)}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form