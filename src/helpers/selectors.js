export function getAppointmentsForDay(state, day) {
  let appIDArray = []
  const matchingDays = state.days.filter(weekDay => weekDay.name === day)
  if (matchingDays.length !== 0) {
    appIDArray = matchingDays[0].appointments
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