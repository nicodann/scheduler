export function getAppointmentsForDay(state, day) {
  let appIDArray = []
  const matchingDays = state.days.filter(weekDay => weekDay.name === day)
  if (matchingDays.length !== 0) {
    appIDArray = matchingDays[0].appointments
  }
  
  const appDetailsArray = appIDArray.map(id => state.appointments[id])
  
  return appDetailsArray;
}