import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;

      setTime(`${hours}.${minutes}${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span style={{ fontSize: 13, color: "var(--gray11)", marginTop: "8px", display: "block" }}>
        My local time: {time}
      </span>
    </>
  )
}
