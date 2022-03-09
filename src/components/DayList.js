import React from 'react'
import DayListItem from './DayListItem'

function DayList({days, onChange, value}) {
  const Days = days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === value}
        setDay={() => onChange(day.name)}  
      />)
  });

  return (
    <ul>
      {Days}
    </ul>
  );
}

export default DayList