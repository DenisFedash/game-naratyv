"use client";

import { createContext, useState, useEffect, useContext } from "react";

export const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const initialTime = 5;
  // const initialTime = 1 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  
  // const socket = io('http://');

  useEffect(() => {
    if (isActive && time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [time, isActive]);

  // socket.on('start', () => {
  //   setTime(initialTime);
  //   setIsActive(true);
  // });

  return (
    <TimerContext.Provider 
    value={{ 
      time, 
      setTime,
      // start: () => socket.emit("start") 
       }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerStore = () => useContext(TimerContext);