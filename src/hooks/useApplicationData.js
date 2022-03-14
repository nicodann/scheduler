import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day:'Monday',
    days:[],
    appointments:{},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));

  const setDays = days => setState(prev => ({...prev, days}));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));
  
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)

    ]).then(all => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    })
    .catch(err => console.log(err))
  }, []);  

  const createDaysWithUpdatedSpots = (appointments) => {
    let appIDArray = []
    const matchingDay = state.days.filter(weekDay => weekDay.name === state.day)
    if (matchingDay.length !== 0) {
      appIDArray = matchingDay[0].appointments
    }
    
    const appDetailsArray = appIDArray.map(id => appointments[id])

    const newSpots = appDetailsArray.filter(app => app.interview === null).length

    const stateDayObj = state.days.find(day => day.name === state.day);
    const index = state.days.indexOf(stateDayObj)
    const dayCopy = {
      ...stateDayObj
    }

    const updatedDay = {
      ...dayCopy, 
      spots: newSpots
    }

    const days = [...state.days]

    days[index] = updatedDay

    return days;
  }

  //CREATE APPOINTMENT
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
    .then(response => {
      if (response.status === 204) {
        setState(prev => ({...prev, appointments}))
        const days = createDaysWithUpdatedSpots(appointments)
        setState(prev => ({...prev, days}))
        return response;
      }
    })
  };

  //DELETE APPOINTMENT
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
     return axios.delete(`http://localhost:8001/api/appointments/${id}`)
     .then(response => {
       if (response.status === 204) {
         setState(prev => ({...prev, appointments}))
         const days = createDaysWithUpdatedSpots(appointments)
         setState(prev => ({...prev, days}))
         return response;
        }
      })
  };

  return { state, setDay, bookInterview, cancelInterview }
}