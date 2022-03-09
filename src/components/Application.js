import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  console.log(`--RENDER--`)
  
  

  let dailyAppointments = [];
  let interviewersForDay = [];
  if (Object.keys(state.appointments).length !== 0) {
    dailyAppointments = getAppointmentsForDay(state, state.day);
    interviewersForDay = getInterviewersForDay(state, state.day);
  }


  const renderAppointments = dailyAppointments.map(
    (appointment, index) => {
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
    }
  )


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
        {renderAppointments}
        <Appointment key="last" time= "5pm" />

      </section>
    </main>
  );
}