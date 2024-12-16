import React, { useState, useEffect } from "react";
import "./AnalogHandsUsingNumbers.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles for hands
  const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  // Generate repeated numbers for hands
  const createHandText = (value: string | number, repeatCount: number) =>
    Array(repeatCount).fill(value).join(" ");

  return (
    <div className="clock">
      {/* Hour hand */}
      <div
        className="hand hour"
        style={{
          transform: `rotate(${hourAngle - 90}deg)`,
        }}
      >
        <span>{createHandText(hours % 12 || 12, 3)}</span>
      </div>

      {/* Minute hand */}
      <div
        className="hand minute"
        style={{
          transform: `rotate(${minuteAngle - 90}deg)`,
        }}
      >
        <span>{createHandText(minutes.toString().padStart(2, "0"), 5)}</span>
      </div>

      {/* Second hand */}
      <div
        className="hand second"
        style={{
          transform: `rotate(${secondAngle - 90}deg)`,
        }}
      >
        <span>{createHandText(seconds.toString().padStart(2, "0"), 6)}</span>
      </div>
    </div>
  );
};

export default Clock;
