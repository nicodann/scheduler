  import React from 'react';
  import 'components/InterviewerListItem.scss';
  import classNames from 'classnames';
  
  function InterviewerListItem(props) {

    const interviewerClass = classNames({
      'interviewers__item': true,
      'interviewers__item--selected': props.selected,
    })

    return (
      <li 
        className={interviewerClass}
        onClick={props.setInterviewer}
        selected={props.selected}
      >
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
          
        />
        {props.selected === true && <p>{props.name}</p>}
      </li>
    )
  }
  
  export default InterviewerListItem