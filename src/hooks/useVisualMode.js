import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((previous) => {
        return [...previous.slice(0, previous.length - 1), newMode];
      });
    } else {
      setHistory((previous) => {
        return [...previous, newMode];
      });
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length -2]);
      setHistory((previous) => { 
        return [...previous.slice(0, previous.length - 1)];
      })
    } else {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };
}
