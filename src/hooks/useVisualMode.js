import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const[history, setHistory] = useState([initialMode]);
  const transition = (newMode) => {
    setMode(newMode);
    setHistory([...history, newMode])
  };
  const back = () => {
    const lastIndex = history.length - 2;
    if (history.length > 1) {
      setMode(history[lastIndex])
      history.splice( - 1, 1)
      setHistory(history)
    }
  };
  return { mode, transition, back };
}
