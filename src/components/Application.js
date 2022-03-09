import React, { useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application() {
  console.log(`--RENDER--`)
  
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
  
  let dailyAppointments = [];
  let interviewersForDay = [];
  if (Object.keys(state.appointments).length !== 0) {
    dailyAppointments = getAppointmentsForDay(state, state.day);
    interviewersForDay = getInterviewersForDay(state, state.day);
  }
  
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
  }, [])

  // useEffect(() => {
  //   console.log('state: ',state)
  // }, [state])

  function bookInterview(id, interview, cb) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
      .then(response => {
        if (response.status === 204) {
          setState(prev => ({...prev, appointments}))
        }
      })
      .then(() => {
        console.log('the API has been updated')
        cb()
      })
      .catch(err => console.log(err));
  }

  function cancelInterview(id, cb) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    console.log('cancel Interview');
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        console.log('status: ',response.status)
        if (response.status === 204) {
          setState(prev => ({...prev, appointments}))
          console.log('the appointment has been deleted')
        }
      })
      .then(() => cb())
      
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          value={state.day}
          onChange={setDay}
          days={state.days}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment, index) => {
          const interview = getInterview(state, appointment.interview)

          return (
            <Appointment 
              {...appointment}
              key={index}
              interview={interview}
              interviewers={interviewersForDay}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
        <Appointment key="last" time= "5pm" />

      </section>
    </main>
  );
}