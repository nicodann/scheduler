import { useState } from 'react';

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);


  const transition = (newMode, replace = false) => {
    setMode(newMode);
    (replace && history.pop())
    setHistory(prev => ([...prev, newMode]))
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      history.splice( - 1, 1)
      setHistory(history)
    }
  };
  return { mode, transition, back };
}
