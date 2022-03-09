  import React from 'react';
  import 'components/InterviewerListItem.scss';
  import classNames from 'classnames';
  
  function InterviewerListItem({selected, setInterviewer, avatar, name}) {

    const interviewerClass = classNames({
      'interviewers__item': true,
      'interviewers__item--selected': selected,
    })

    return (
      <li 
        className={interviewerClass}
        onClick={setInterviewer}
        selected={selected}
      >
        <img
          className="interviewers__item-image"
          src={avatar}
          alt={name}
          
        />
        {selected === true && <p>{name}</p>}
      </li>
    )
  }
  
  export default InterviewerListItem