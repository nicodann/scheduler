import { useState } from 'react';

export default function useVisualMode(initialMode) {
  console.log('USEVISUALMODE')
  console.log('initalMode: ', initialMode)

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);


  const transition = (newMode, replace = false) => {
    setMode(newMode);
    (replace && history.pop())
    setHistory(prev => ([...prev, newMode]))
    console.log('transitioned to ', newMode)
    console.log('historyINtransition: ', history)
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      history.splice( - 1, 1)
      setHistory(history)
    }
  };
  console.log('history: ', history)
  return { mode, transition, back };
}
