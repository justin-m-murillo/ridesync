import { useState, useEffect } from 'react'

const usePhaseOfDay = () => {
  const [phase, setPhase] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setPhase('Good morning, ');
    }
    else if (hours < 17) {
      setPhase('Good afternoon, ');
    } else {
      setPhase('Good evening, ');
    }
  }, []);
  
  return phase;
}

export default usePhaseOfDay