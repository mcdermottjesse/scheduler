import { useState } from 'react';
//review this
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);


  function transition(newMode, replace = false) {
    setMode(newMode)
    setHistory(previous => {
    if(replace) {
     (previous.pop())
    } 
    return [ ...previous, newMode ]
    
  })
}
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history.slice(-1)[0])  
  } else {
  setMode(history[0])
  
  }
  }

  return {mode, transition, back}
}