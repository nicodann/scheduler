import { useState } from 'react';

export default function useVisualMode(initialMode) {
  // console.log('IN useVisual... initial mode: ', initialMode)

  const [mode, setMode] = useState(initialMode);
  // console.log('IN useVisual... mode after useState: ', mode)
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    (replace === true && history.pop())
    setHistory([...history, newMode])
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
