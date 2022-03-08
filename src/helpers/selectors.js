export function getAppointmentsForDay(state, day) {
  let appIDArray = []
  const matchingDay = state.days.filter(weekDay => weekDay.name === day)
  if (matchingDay.length !== 0) {
    appIDArray = matchingDay[0].appointments
  }
  
  const appDetailsArray = appIDArray.map(id => state.appointments[id])
  
  return appDetailsArray;
}

export function getInterview(state, interview) {
  const interviewObj = {};
  if (interview !== null && (Object.keys(state.interviewers).length !== 0)) {
    interviewObj.student = interview.student;
    const interviewerID = interview.interviewer;
    interviewObj.interviewer = state.interviewers[interviewerID];
    return interviewObj;
  }
  
  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewerIDArray = []
  const matchingDay = state.days.filter(weekDay => weekDay.name === day)
  if (matchingDay.length !== 0) {
    interviewerIDArray = matchingDay[0].interviewers
  }
  
  const interviewersArray = interviewerIDArray.map(id => state.interviewers[id])
  
  return interviewersArray;
}