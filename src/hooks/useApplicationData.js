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

    const stateDayObject = state.days.find(day => day.name === state.day);
    const index = state.days.indexOf(stateDayObject)

    const dayCopy = {
      ...stateDayObject
    }
    const updatedDay = {
      ...dayCopy, 
      spots: dayCopy.spots -1
    }

    const daysCopy = [...state.days]
    console.log('equal: ?',daysCopy === state.days)

    daysCopy[index] = updatedDay

    console.log('state.days ',state.days )
    console.log('daysCopy ',daysCopy )
    
     return axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
      .then(response => {
        if (response.status === 204) {
          setState(prev => ({...prev, appointments}))
          setState(prev => ({...prev, daysCopy}))
        }
        return response;
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
        }
        return response;
      })
  };

  return { state, setDay, bookInterview, cancelInterview }

}